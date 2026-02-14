import { parseDuration } from './utils'
let { show, showModal, close } = HTMLDialogElement.prototype,
  { showPopover, hidePopover, togglePopover } = HTMLElement.prototype

/*==================== Dialog ==================== */
class Dialog {
  static topLayers = 0
  /**
   * 用于存储所有 Dialog 实例的映射表
   * @static
   * @type {Map<HTMLDialogElement, Dialog>}
   * */
  static map = new Map()
  /** @type {HTMLDialogElement|null} */
  #element = null
  #ele = new Map()
  #options = {
    title: '',
    withHeader: true,
    showClose: true,
    modal: true,
    lockScroll: true
  }
  get element() {
    return this.#element
  }
  /**
   * 表示action
   * @enum {string}
   */
  static Action = {
    CONFIRM: 'confirm',
    CLOSE: 'close',
    CANCEL: 'cancel'
  }
  constructor(HTMLDialogElement, options) {
    if (typeof options === 'object') {
      Object.assign(this.#options, options)
    }
    this.#element = HTMLDialogElement
  }
  render() {
    if (this.element.hasAttribute('title')) {
      this.#options.title = this.element.getAttribute('title')
      this.element.removeAttribute('title')
      this.element.dataset.title = this.#options.title
    } else if (this.element.dataset.title) {
      this.#options.title = this.element.dataset.title
    }
    this.#options.withHeader = !(this.element.getAttribute('with-header') === 'false')
    this.#options.showClose = !(this.element.getAttribute('show-close') === 'false')
    this.#options.lockScroll = !(this.element.getAttribute('lock-scroll') === 'false')

    if (this.#options.withHeader) {
      let header = (() => {
        let header = this.element.querySelector('[role=header]')
        if (!header) {
          header = document.createElement('header')
          header._vnode = true
          header.role = 'header'
          this.element.prepend(header)
          header.textContent = this.#options.title
        }
        this.#ele.set('header', header)
        return header
      })()
      if (this.#options.showClose) {
        let close = this.element.querySelector('[role=close]')
        if (!close) {
          close = document.createElement('i')
          close._vnode = true
          close.role = 'close'
          close.addEventListener('click', this.onClickClose)
          header.appendChild(close)
        }
        this.#ele.set('close', close)
      }
    }
  }
  show() {
    this.render()
    if (this.#options.lockScroll && this.#options.modal) this.lockScroll()
    Dialog.map.set(this.element, this)
    this.#options.modal ? showModal.call(this.element) : show.call(this.element)
    this.element.querySelector('button:last-child')?.focus()
  }
  close() {
    this.animationEnd(() => {
      close.call(this.#element)
      Dialog.map.delete(this.#element)
      if (this.#options.lockScroll && this.#options.modal) this.unlockScroll()

      if (this.#ele.has('close')) this.#ele.get('close').removeEventListener('click', this.onClickClose)
      this.element.removeEventListener('click', this.onClickModal)
      this.element.removeEventListener('keydown', this.onPressEscape)
    }, true)
  }
  done = () => {
    let done = () => this.close(Dialog.Action.CLOSE)
    // 兼容vue
    if (this.element.__vnode?.props?.onBeforeClose) {
      this.element.__vnode.props.onBeforeClose(done)
    } else {
      done()
    }
  }
  onClickClose = () => this.done()
  // closedby="any" 但是会失去关闭动画
  onClickModal = (e) => {
    if (e.target !== e.currentTarget) return
    let { top, left, width, height } = this.element.getBoundingClientRect()
    if (e.clientX < left || e.clientX > left + width || e.clientY < top || e.clientY > top + height) this.done()
  }
  onPressEscape = (e) => {
    if (e.key === 'Escape') this.done()
  }
  onHashChange = () => {
    this.close(Dialog.Action.CLOSE)
  }
  lockScroll() {
    Dialog.topLayers++
    if (!document.documentElement.classList.contains('body-scroll-lock')) {
      document.documentElement._hasScroll = window.innerWidth > document.documentElement.scrollWidth
      document.documentElement.style.overflow = 'hidden'
      if (document.documentElement._hasScroll) {
        document.documentElement.style.scrollbarGutter = 'stable'
      }
      document.documentElement.classList.add('body-scroll-lock')
    }
  }
  unlockScroll() {
    Dialog.topLayers--
    if (Dialog.topLayers < 1) {
      document.documentElement.style.removeProperty('overflow')
      if (document.documentElement._hasScroll) {
        document.documentElement.style.removeProperty('scrollbarGutter')
        delete document.documentElement._hasScroll
      }
      document.documentElement.classList.remove('body-scroll-lock')
    }
  }
  escapePreventDefault(e) {
    if (e.key === 'Escape') e.preventDefault()
  }
  animationEnd(callback, destroyOnClose = false) {
    let { transitionDuration: duration, transitionTimingFunction: easing } = getComputedStyle(this.element)

    if (this.#options.modal) {
      let { backgroundColor, transitionDuration, transitionTimingFunction } = getComputedStyle(this.element, '::backdrop')
      this.element.animate(
        {
          backgroundColor: [backgroundColor, 'transparent']
        },
        {
          easing: transitionTimingFunction,
          duration: parseInt(parseDuration(transitionDuration)),
          pseudoElement: '::backdrop'
        }
      )
    }

    this.element
      .animate(
        {
          transform: ['none', 'scale(0.9)'],
          opacity: [1, 0]
        },
        {
          easing: easing,
          duration: parseInt(parseDuration(duration))
        }
      )
      .finished.then(() => {
        if (destroyOnClose) {
          for (const [key, node] of this.#ele) {
            if (node._vnode) {
              node.remove()
              this.#ele.delete(key)
            }
          }
        }
        callback()
      })
  }
  /**
   * 实现元素的拖拽功能
   * @param {HTMLElement} target - 拖拽触发元素（通常是标题栏）
   * @param {HTMLElement} [parent=target] - 实际被拖动的父元素（默认为 target）
   * @param {boolean} [overflow=false] - 是否允许拖动超出可视区域边界
   */
  static drag(target, parent, overflow) {
    parent = parent ?? target
    target.style.cursor = 'grab'

    target.addEventListener('mousedown', function (event) {
      // 排除子节点
      if (event.target !== event.currentTarget) return
      // 最大偏移量
      let maxLeft = document.documentElement.clientWidth - parent.clientWidth,
        maxTop = document.documentElement.clientHeight - parent.clientHeight

      let oldEvent = event,
        left = event.clientX - event.offsetX,
        top = event.clientY - event.offsetY

      parent.style.margin = '0'
      parent.style.left = left + 'px'
      parent.style.top = top + 'px'
      target.style.cursor = 'grabbing'
      function moveFunc(moveEvent) {
        let offsetX = moveEvent.clientX - oldEvent.clientX,
          offsetY = moveEvent.clientY - oldEvent.clientY

        top += offsetY
        left += offsetX

        if (!overflow) {
          parent.style.top = (top < 0 ? 0 : top > maxTop ? maxTop : top) + 'px'
          parent.style.left = (left < 0 ? 0 : left > maxLeft ? maxLeft : left) + 'px'
        } else {
          parent.style.top = top + 'px'
          parent.style.left = left + 'px'
        }

        oldEvent = moveEvent
      }
      function upFunc() {
        target.style.cursor = 'grab'
        document.removeEventListener('mousemove', moveFunc)
        document.removeEventListener('mouseup', upFunc)
      }
      document.addEventListener('mousemove', moveFunc)
      document.addEventListener('mouseup', upFunc)
    })
  }
}

/*==================== MessageBox ==================== */
/**
 * @typedef {Object} MessageBoxOptions
 * @property {boolean} [autofocus=true] 打开 MessageBox 时是否自动获得焦点
 * @property {string} [title=''] MessageBox 的标题
 * @property {string|Function} [message=''] MessageBox 的正文内容
 * @property {boolean} [dangerouslyUseHTMLString=false] 是否将 message 作为 HTML 片段处理
 * @property {'','primary'|'success'|'info'|'warning'|'error'} [type=''] 消息类型，用于图标显示
 * @property {string|HTMLElement} [icon=''] 自定义图标组件，会覆盖 type 的类型
 * @property {string|HTMLElement} [closeIcon=''] 自定义关闭图标组件，默认是 Close
 * @property {string} [customClass=''] MessageBox 的自定义类名
 * @property {string} [customStyle=''] MessageBox 的自定义内联样式
 * @property {string} [modalClass=''] 遮罩的自定义类名
 * @property {Function|null} [callback=null] 若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调
 * @property {boolean} [showClose=true] MessageBox 是否显示右上角关闭按钮
 * @property {Function|null} [beforeClose=null] messageBox 关闭前的回调，会暂停消息弹出框的关闭过程。
 * @property {boolean} [distinguishCancelAndClose=false] 是否将取消（点击取消按钮）与关闭（点击关闭按钮或遮罩层、按下 Esc 键）进行区分
 * @property {boolean} [lockScroll=true] 是否在 MessageBox 出现时将 body 滚动锁定
 * @property {boolean} [showCancelButton=false] 是否显示取消按钮
 * @property {boolean} [showConfirmButton=true] 是否显示确定按钮
 * @property {string} [cancelButtonText='取消'] 取消按钮的文本内容
 * @property {string} [confirmButtonText='确定'] 确定按钮的文本内容
 * @property {boolean} [cancelButtonLoading=false] 取消按钮的加载
 * @property {boolean} [confirmButtonLoading=false] 确认按钮的加载
 * @property {string|undefined} [cancelButtonClass] 取消按钮的自定义类名
 * @property {string|undefined} [confirmButtonClass] 确定按钮的自定义类名
 * @property {boolean} [closeOnClickModal=true] 是否可通过点击遮罩层关闭 MessageBox
 * @property {boolean} [closeOnPressEscape=true] 是否可通过按下 ESC 键关闭 MessageBox
 * @property {boolean} [closeOnHashChange=true] 是否在 hash 改变时关闭 MessageBox
 * @property {boolean} [showInput=false] 是否显示输入框
 * @property {string} [inputPlaceholder=''] 输入框占位符
 * @property {'text'|'search'|'url'|'tel'|'email'|'password'} [inputType='text'] 输入框类型
 * @property {string} [inputValue=''] 输入框默认值
 * @property {string|null} [inputPattern=null] 输入框正则校验
 * @property {Function|undefined} [inputValidator] 输入框自定义校验函数
 * @property {string} [inputErrorMessage='输入的数据不合法!'] 输入校验失败时的提示
 * @property {boolean} [draggable=false] 是否居中布局
 * @property {boolean} [center=false] MessageBox 是否可拖放
 * @property {boolean} [overflow=false] MessageBox 拖动范围可以超出可视区
 * @property {boolean} [roundButton=false] 是否使用圆角按钮
 * @property {string} [buttonSize=''] 自定义确认按钮及取消按钮的大小
 */
/**
 * MessageBox 消息弹框组件函数
 * @param {MessageBoxOptions} options - 消息配置选项或直接传入消息文本
 * @returns {Promise<{action: string, value?: string}>|undefined} callback或者Promise
 */
function MessageBox(options) {
  let msgbox = new MessageBoxConstructor(options)
  msgbox.show()
  if (options.callback instanceof Promise) {
    return options.callback
  }
}
class MessageBoxConstructor extends Dialog {
  #ele = new Map()
  /** @type {MessageBoxOptions} */
  #options = {
    autofocus: true,
    title: '',
    message: '',
    dangerouslyUseHTMLString: false,
    type: '',
    icon: '',
    closeIcon: '',
    customClass: '',
    customStyle: '',
    modalClass: '',
    callback: null,
    showClose: true,
    beforeClose: null,
    distinguishCancelAndClose: false,
    lockScroll: true,
    showCancelButton: false,
    showConfirmButton: true,
    cancelButtonText: '取消',
    confirmButtonText: '确定',
    cancelButtonLoading: false,
    confirmButtonLoading: false,
    cancelButtonClass: '',
    confirmButtonClass: '',
    closeOnClickModal: true,
    closeOnPressEscape: true,
    closeOnHashChange: true,
    showInput: false,
    inputPlaceholder: '',
    inputType: 'text',
    inputValue: '',
    inputPattern: null,
    inputValidator: undefined,
    inputErrorMessage: '输入的数据不合法!',
    draggable: false,
    center: false,
    overflow: false,
    roundButton: false,
    buttonSize: ''
  }
  #resolve
  #reject
  get element() {
    return this.#ele.get('dialog')
  }
  set title(value) {
    let { header } = Object.fromEntries(this.#ele)
    header.textContent = value
  }
  set type(value) {
    let { dialog, confirm } = Object.fromEntries(this.#ele)
    if (confirm) confirm.classList.remove(`color-${this.#options.type || 'primary'}`)
    this.#options.type = value
    value ? dialog.setAttribute('type', value) : dialog.removeAttribute('type')
    if (confirm) confirm.classList.add(`color-${this.#options.type || 'primary'}`)
  }
  set message(msg) {
    let { main } = Object.fromEntries(this.#ele)
    this.#options.message = typeof msg === 'function' ? msg() : msg
    switch (typeof this.#options.message) {
      case 'string': {
        if (this.#options.dangerouslyUseHTMLString) {
          main.innerHTML = this.#options.message
        } else {
          main.textContent = this.#options.message
        }
        break
      }
      default: {
        if (this.#options.message?.nodeType) {
          main.appendChild(this.#options.message)
        }
      }
    }
  }
  set cancelButtonText(value) {
    let { cancel } = Object.fromEntries(this.#ele)
    this.#options.cancelButtonText = value
    cancel.innerHTML = value
  }
  set confirmButtonText(value) {
    let { confirm } = Object.fromEntries(this.#ele)
    this.#options.confirmButtonText = value
    confirm.innerHTML = value
  }
  set cancelButtonLoading(bool) {
    this.#options.confirmButtonLoading = bool
    let { cancel: button } = Object.fromEntries(this.#ele)
    if (!button) return
    button.toggleAttribute('loading', bool)
    button.disabled = bool
  }
  set confirmButtonLoading(bool) {
    this.#options.confirmButtonLoading = bool
    let { confirm: button } = Object.fromEntries(this.#ele)
    if (!button) return
    button.toggleAttribute('loading', bool)
    button.disabled = bool
  }
  constructor(options) {
    super()
    if (typeof options.callback !== 'function') {
      let { promise, resolve, reject } = Promise.withResolvers()
      this.#resolve = resolve
      this.#reject = reject
      options.callback = promise
    }
    Object.assign(this.#options, options)
    this.render()
    this.bindEvent()
  }
  render() {
    let dialog = document.createElement('dialog')
    this.#ele.set('dialog', dialog)
    dialog.role = 'message-box'
    this.#options.center && dialog.setAttribute('center', '')

    let header = document.createElement('header')
    this.#ele.set('header', header)
    header.textContent = this.#options.title
    let main = document.createElement('main')
    this.#ele.set('main', main)
    this.message = this.#options.message

    if (this.#options.icon?.nodeType) {
      main.classList.add('custom-icon')
      main.prepend(this.#options.icon)
    }
    let footer = document.createElement('footer')
    this.#ele.set('footer', footer)
    dialog.append(header, main, footer)

    if (this.#options.customClass) dialog.classList.add(this.#options.customClass)
    if (this.#options.customStyle) dialog.style.cssText = this.#options.customStyle
    if (this.#options.showClose) {
      let close = this.#options.closeIcon?.nodeType ? this.#options.closeIcon : document.createElement('i')
      close.role = ((close.role || '') + ' close').trim()
      header.appendChild(close)
      this.#ele.set('close', close)
    }
    let cancel
    if (this.#options.showCancelButton) {
      let button = document.createElement('button')
      cancel = button
      button.type = button.role = 'button'
      if (this.#options.cancelButtonClass) button.classList.add(this.#options.cancelButtonClass)
      if (this.#options.cancelButtonLoading) {
        button.setAttribute('loading', '')
        button.disabled = true
      }
      button.innerHTML = this.#options.cancelButtonText
      footer.appendChild(button)
      this.#ele.set('cancel', button)
    }
    let confirm
    if (this.#options.showConfirmButton) {
      let button = document.createElement('button')
      confirm = button
      button.type = button.role = 'button'
      if (this.#options.confirmButtonClass) button.classList.add(this.#options.confirmButtonClass)
      if (this.#options.confirmButtonLoading) {
        button.setAttribute('loading', '')
        button.disabled = true
      }
      button.innerHTML = this.#options.confirmButtonText
      footer.appendChild(button)
      this.#ele.set('confirm', button)
    }
    // prompt
    if (this.#options.showInput) {
      let input = document.createElement('input')
      input.type = this.#options.inputType
      if (this.#options.inputPlaceholder) input.placeholder = this.#options.inputPlaceholder
      if (this.#options.inputValue) input.defaultValue = this.#options.inputValue
      dialog.insertBefore(input, footer)
      this.#ele.set('input', input)
    }
    if (this.#options.roundButton) {
      if (confirm) confirm.style.borderRadius = '1000px'
      if (cancel) cancel.style.borderRadius = '1000px'
    }
    if (this.#options.buttonSize) {
      if (confirm) confirm.setAttribute('size', this.#options.buttonSize)
      if (cancel) cancel.setAttribute('size', this.#options.buttonSize)
    }

    this.type = this.#options.type
    document.documentElement.appendChild(dialog)
  }
  bindEvent() {
    let { dialog, header, cancel, input, confirm, close } = Object.fromEntries(this.#ele),
      { draggable, overflow } = this.#options
    if (draggable) Dialog.drag(header, dialog, overflow)

    if (input) {
      let { inputErrorMessage } = this.#options
      if (this.#options.inputPattern) {
        // 如果空字符串不满足正则表达式 , 则input为必填
        if (String('').match(this.#options.inputPattern) === null) input.setAttribute('required', '')
        input.pattern = this.#options.inputPattern
        input.oninvalid = function () {
          this.setCustomValidity(inputErrorMessage)
        }
        input.oninput = function () {
          this.setCustomValidity('')
          this.reportValidity() // form表达中submit触发oninvalid , 此处主动触发 input.oninvalid
        }
      } else if (typeof this.#options.inputValidator === 'function') {
        let inputValidator = this.#options.inputValidator
        input.oninput = function () {
          //输入框的校验函数。 应该返回一个 boolean 或者 string， 如果返回的是一个 string 类型，那么该返回值会被赋值给 inputErrorMessage 用于向用户展示错误消息。
          let ret = inputValidator(this.value)
          if (ret === true) {
            this.setCustomValidity('')
          } else if (typeof ret === 'string') {
            this.setCustomValidity(ret)
            this.reportValidity()
          }
        }
      }
    }

    if (close) close.onclick = () => this.close(Dialog.Action.CLOSE)
    if (cancel) cancel.onclick = () => this.close(Dialog.Action.CANCEL)
    if (confirm)
      confirm.onclick = () => {
        if (this.#options.showInput) {
          if (this.#options.inputPattern) {
            // 判断值是否通过正则验证
            input.setCustomValidity('')
            if (!input.reportValidity()) return
          } else if (typeof this.#options.inputValidator === 'function') {
            // 判断值是否通过方法验证
            let ret = this.#options.inputValidator(input.value)
            if (typeof ret === 'string') {
              input.setCustomValidity(ret)
              input.reportValidity()
            }
            if (ret !== true) return
          }
        }
        this.close(Dialog.Action.CONFIRM)
      }

    if (this.#options.closeOnClickModal) dialog.addEventListener('click', this.onClickModal)
    if (this.#options.closeOnPressEscape) dialog.addEventListener('keydown', this.onPressEscape)
    if (this.#options.closeOnHashChange) window.addEventListener('hashchange', this.onHashChange)
  }
  show() {
    document.addEventListener('keydown', this.escapePreventDefault, true)
    let { dialog, confirm } = Object.fromEntries(this.#ele)
    dialog.showModal()
    if (this.#options.lockScroll) this.lockScroll()
    if (this.#options.autofocus && confirm && !confirm.disabled) {
      confirm.focus()
    } else {
      dialog.focus()
    }
  }
  close(reason) {
    let done = () => {
      this.animationEnd(() => {
        if (this.#options.lockScroll) this.unlockScroll()
        if (typeof this.#options.callback === 'function') {
          this.#options.callback(reason)
        } else {
          if (reason === Dialog.Action.CONFIRM) {
            if (this.#options.showInput) {
              this.#resolve({ action: Dialog.Action.CONFIRM, value: this.#ele.get('input').value })
            } else {
              this.#resolve(Dialog.Action.CONFIRM)
            }
          } else {
            this.#reject(this.#options.distinguishCancelAndClose ? reason : Dialog.Action.CANCEL)
          }
        }

        this.element.removeEventListener('click', this.onClickModal)
        this.element.removeEventListener('keydown', this.onPressEscape)
        window.removeEventListener('hashchange', this.onHashChange)
        document.removeEventListener('keydown', this.escapePreventDefault)
        this.element.remove()
      }, false)
    }

    if (typeof this.#options.beforeClose === 'function') {
      this.#options.beforeClose(reason, this, done)
    } else {
      done()
    }
  }
  static normalize(message, title, options) {
    let opt = typeof options === 'object' ? options : typeof title === 'object' ? title : {}
    opt.message = message
    if (typeof title === 'string') {
      opt.title = title
    }
    return opt
  }
}
/**
 * 弹出自定义消息框（基础方法）
 * @param {MessageBoxOptions} options - 消息框配置项
 * @returns {Promise<{action: string, value?: string}>|undefined}
 */
MessageBox.msgbox = function (options) {
  return MessageBox(options)
}
/**
 * 弹出警告消息框（仅有确认按钮）
 * @param {string|Function} message - 消息内容，支持字符串或渲染函数
 * @param {string|MessageBoxOptions} [title] - 对话框标题或配置对象
 * @param {MessageBoxOptions} [options] - 其他消息框配置项（当第二个参数为标题时使用）
 * @returns {Promise<{action: 'confirm'}>|undefined}
 */
MessageBox.confirm = function (message, title, options) {
  let opt = Object.assign(
    {
      showCancelButton: true,
      closeOnClickModal: true
    },
    MessageBoxConstructor.normalize(message, title, options)
  )
  return MessageBox.msgbox(opt)
}
/**
 * 弹出警告消息框（仅有确认按钮）
 * @param {string|Function} message - 消息内容，支持字符串或渲染函数
 * @param {string|MessageBoxOptions} [title] - 对话框标题或配置对象
 * @param {MessageBoxOptions} [options] - 其他消息框配置项（当第二个参数为标题时使用）
 * @returns {Promise<{action: 'confirm'}>|undefined}
 */
MessageBox.prompt = function (message, title, options) {
  let opt = Object.assign(
    {
      showCancelButton: true,
      closeOnClickModal: true,
      showInput: true
    },
    MessageBoxConstructor.normalize(message, title, options)
  )
  return MessageBox.msgbox(opt)
}
/**
 * 弹出警告消息框（仅有确认按钮）
 * @param {string|Function} message - 消息内容，支持字符串或渲染函数
 * @param {string|MessageBoxOptions} [title] - 对话框标题或配置对象
 * @param {MessageBoxOptions} [options] - 其他消息框配置项（当第二个参数为标题时使用）
 * @returns {Promise<{action: 'confirm'}>|undefined}
 */
MessageBox.alert = function (message, title, options) {
  let opt = Object.assign(
    {
      closeOnClickModal: false,
      closeOnPressEscape: false
    },
    MessageBoxConstructor.normalize(message, title, options)
  )
  return MessageBox.msgbox(opt)
}

/*==================== Drawer ==================== */
/**
 * @typedef {Object} DrawerOptions
 * @property {boolean} [lockScroll=true] 是否在 Drawer 出现时将 body 滚动锁定
 * @property {boolean} [closeOnClickModal=true] 是否可以通过点击 modal 关闭 Drawer
 * @property {boolean} [closeOnPressEscape=true] 是否可以通过按下 ESC 关闭 Drawer
 * @property {number} [openDelay=0] Drawer 打开的延时时间，单位毫秒
 * @property {number} [closeDelay=0] Drawer 关闭的延时时间，单位毫秒
 * @property {boolean} [destroyOnClose=false] 控制是否在关闭 Drawer 之后将子元素全部销毁
 * @property {boolean} [modal=true] 是否需要遮罩层
 * @property {'rtl'|'ltr'|'ttb'|'btt'} [direction='rtl'] Drawer 打开的方向
 * @property {boolean} [showClose=true] 是否显示关闭按钮
 * @property {string} [title=''] Drawer 的标题
 * @property {boolean} [withHeader=true] 控制是否显示 header 栏, 默认为 true, 当此项为 false 时, title attribute 和 title slot 均不生效
 */
class Drawer extends Dialog {
  /** @type {HTMLDialogElement|null} */
  #element = null
  #ele = new Map()
  /** @type {DrawerOptions} */
  #options = {
    lockScroll: true,
    closeOnClickModal: true,
    closeOnPressEscape: true,
    openDelay: 0,
    closeDelay: 0,
    destroyOnClose: true,
    modal: true,
    direction: 'rtl',
    showClose: true,
    title: '',
    withHeader: true
  }
  get element() {
    return this.#element
  }
  constructor(HTMLDialogElement, options) {
    super()
    if (typeof options === 'object') Object.assign(this.#options, options)
    this.#element = HTMLDialogElement
    Dialog.map.set(HTMLDialogElement, this)
    this.render()
    this.bindEvent()
  }
  props(name, oldVal, newVal) {
    switch (name) {
      case 'title': {
        if (this.#ele.header) this.#ele.header.textContent = newVal
        break
      }
    }
  }
  render() {
    if (this.element.hasAttribute('title')) {
      this.#options.title = this.element.getAttribute('title')
      this.element.removeAttribute('title')
      this.element.dataset.title = this.#options.title
    } else if (this.element.dataset.title) {
      this.#options.title = this.element.dataset.title
    }
    this.#options.withHeader = !(this.element.getAttribute('with-header') === 'false')
    this.#options.showClose = !(this.element.getAttribute('show-close') === 'false')

    const observer = new MutationObserver((mutationsList) => {
      let attribute = mutationsList[0]
      this.props(attribute.attributeName, attribute.oldValue, attribute.target.getAttribute(attribute.attributeName))
    })

    observer.observe(this.element, { attributes: true })

    if (this.#options.withHeader) {
      let header = (() => {
        let header = this.element.querySelector('[role=header]')
        if (!header) {
          header = document.createElement('header')
          header._vnode = true
          header.role = 'header'
          this.element.prepend(header)
          header.textContent = this.#options.title
        }
        this.#ele.set('header', header)
        return header
      })()
      if (this.#options.showClose) {
        let close = this.element.querySelector('[role=close]')
        if (!close) {
          close = document.createElement('i')
          close._vnode = true
          close.role = 'close'
          header.appendChild(close)
        }
        this.#ele.set('close', close)
      }
    }
  }
  bindEvent() {
    let { close } = Object.fromEntries(this.#ele)
    if (this.#options.closeOnClickModal) this.element.addEventListener('click', this.onClickModal)
    if (this.#options.closeOnPressEscape) this.element.addEventListener('keydown', this.onPressEscape)
    if (close) close.addEventListener('click', this.onClickClose)
  }
  show() {
    if (this.element.hasAttribute('direction')) {
      let direction = this.element.getAttribute('direction')
      this.#options.direction = ['rtl', 'ltr', 'ttb', 'btt'].includes(direction) ? direction : 'rtl'
    }

    setTimeout(() => {
      document.addEventListener('keydown', this.escapePreventDefault)
      if (this.#options.lockScroll) this.lockScroll()
      this.#options.modal ? showModal.call(this.element) : show.call(this.element)
    }, this.#options.openDelay)
  }
  animationEnd(callback, destroyOnClose = false) {
    let dialog = this.element,
      { transitionDuration, transform } = getComputedStyle(dialog),
      { backgroundColor } = getComputedStyle(dialog, '::backdrop'),
      duration = parseInt(parseDuration(transitionDuration))
    dialog.animate(
      {
        backgroundColor: [backgroundColor, 'transparent']
      },
      {
        duration: duration,
        pseudoElement: '::backdrop'
      }
    )
    let { direction } = this.#options,
      transformTo = 'translateX(100%)'
    switch (direction) {
      case 'ltr': {
        transformTo = 'translateX(-100%)'
        break
      }
      case 'btt': {
        transformTo = 'translateY(100%)'
        break
      }
      case 'ttb': {
        transformTo = 'translateY(-100%)'
        break
      }
    }
    dialog
      .animate(
        {
          transform: [transform, transformTo]
        },
        {
          duration: duration
        }
      )
      .finished.then(() => {
        if (destroyOnClose) {
          for (const [key, node] of this.#ele) {
            if (node._vnode) {
              node.remove()
              this.#ele.delete(key)
            }
          }
        }
        callback()
      })
  }
  close() {
    setTimeout(() => {
      this.animationEnd(() => {
        close.call(this.element)
        if (this.#options.lockScroll) this.unlockScroll()
        Dialog.map.delete(this.element)

        if (this.#ele.has('close')) this.#ele.get('close').removeEventListener('click', this.onClickClose)
        this.element.removeEventListener('click', this.onClickModal)
        this.element.removeEventListener('keydown', this.onPressEscape)
        document.removeEventListener('keydown', this.escapePreventDefault)
      }, this.#options.destroyOnClose)
    }, this.#options.closeDelay)
  }
}

/*==================== Loading ==================== */
/**
 * @typedef {Object} LoadingOptions
 * @property {HTMLElement} [target=document.body] Loading 需要覆盖的 DOM 节点。 可传入一个 DOM 对象或字符串； 若传入字符串，则会将其作为参数传入 document.querySelector以获取到对应 DOM 节点
 * @property {boolean} [body=false] 同 v-loading 指令中的 body 修饰符
 * @property {boolean} [fullscreen=true] 同 v-loading 指令中的 fullscreen 修饰符
 * @property {boolean} [lock=false] 同 v-loading 指令中的 lock 修饰符
 * @property {string} [text] 显示在加载图标下方的加载文案
 * @property {string} [spinner] 自定义加载图标类名
 * @property {string} [background] 遮罩背景色
 * @property {string} [customClass] Loading 的自定义类名
 * @property {string} [svg] 自定义 SVG 元素覆盖默认加载器
 * @property {string} [svgViewBox] 设置用于加载 svg 元素的 viewBox 属性
 * @property {function} [beforeClose] Loading 关闭之前执行的函数。 如果此函数返回 false ，关闭过程将被中止。 反之，loading 将被关闭。
 * @property {function} [closed] Loading 完全关闭后触发的函数
 */
class Loading extends Dialog {
  #state = 'leave'
  // 全屏的时候是单例模式
  static instance = null
  #mask = null
  /** @type {LoadingOptions} */
  #options = {
    target: document.body,
    body: false,
    fullscreen: true,
    lock: false,
    text: '',
    spinner: '',
    background: '',
    customClass: '',
    svg: '<circle class="path" cx="25" cy="25" r="20" fill="none"></circle>',
    svgViewBox: '0 0 50 50',
    beforeClose: null,
    closed: null
  }
  get element() {
    return this.#mask
  }
  get fullscreen() {
    return this.#options.fullscreen
  }
  set text(val) {
    this.element.querySelector('.loading-text').textContent = this.#options.text = val
  }
  set svg(val) {
    this.element.querySelector('.circular').innerHTML = this.#options.svg = val
  }
  set svgViewBox(val) {
    this.#options.svgViewBox = val
    this.element.querySelector('.circular').setAttribute('viewBox', val)
  }
  set background(val) {
    this.element.style.background = this.#options.background = val
  }
  set customClass(val) {
    this.element.classList.remove(this.#options.customClass)
    this.#options.customClass = val
    this.element.classList.add(val)
  }
  constructor(options) {
    super()
    Object.assign(this.#options, options)
    if (this.#options.fullscreen) Loading.instance = this
    if (this.#options.body) this.#options.target = document.body
    this.render()
  }
  render() {
    let mask = document.createElement(this.#options.fullscreen ? 'dialog' : 'div')
    mask.classList.add('loading-mask')
    if (this.#options.fullscreen) mask.classList.add('is-fullscreen')
    if (this.#options.customClass) mask.classList.add(this.#options.customClass)
    if (this.#options.background) mask.style.background = this.#options.background
    mask.innerHTML = /* language=HTML */ `
    <div class="loading-spinner">
      <svg class="circular" viewBox="${this.#options.svgViewBox}">
        ${this.#options.svg}
        <p class="loading-text">${this.#options.text}</p>
      </svg>
    </div>`
    this.#mask = mask
    this.#options.target._loading = this
  }
  show() {
    if (this.#state !== 'leave') return
    this.#options.target.append(this.element)
    if (this.#options.lock) this.lockScroll()
    if (this.#options.fullscreen) {
      this.element.showModal()
    } else {
      this.#options.target._originalPosition = this.#options.target.style.position
      this.#options.target.style.position = 'relative'
    }
    this.#state = 'enter'
  }
  close(animation = true) {
    if (this.#state !== 'enter') return
    let done = () => {
      let callback = () => {
        if (this.#options.lock) this.unlockScroll()
        if (this.#options.fullscreen) {
          Loading.instance = null
          this.element.close()
        } else {
          if (this.#options.target._originalPosition) {
            this.#options.target.style.position = this.#options.target._originalPosition
          } else {
            this.#options.target.style.removeProperty('position')
          }
          delete this.#options.target._originalPosition
        }
        this.element.remove()
        typeof this.#options.closed === 'function' && this.#options.closed()
        this.#state = 'leave'
      }
      animation ? this.animationEnd(callback, false) : callback()
    }
    if (typeof this.#options.beforeClose === 'function') {
      if (this.#options.beforeClose()) done()
    } else {
      done()
    }
  }
  destroy() {
    this.close(false)
    delete this.#options.target._loading
  }
  animationEnd(callback, destroyOnClose = false) {
    this.#state = 'leave-to'
    this.element.ontransitionend = (e) => {
      if (e.propertyName === 'opacity' && this.element.classList.contains('fade-out')) {
        if (destroyOnClose) this.destroy()
        callback()
        this.element.classList.remove('fade-out')
      }
    }
    this.element.classList.add('fade-out')
  }
  /**
   * 静态方法，用于配置全局的 Loading 选项
   * @param {LoadingOptions} options - Loading 的配置选项
   * @returns {Loading}
   */
  static service(options) {
    if ((options.fullscreen ?? true) && Loading.instance) return Loading.instance
    let loading = new Loading(options)
    loading.show()
    return loading
  }
  /**
   * 标准化加载元素的属性配置
   * @param {HTMLElement} el - 需要标准化配置的元素
   * @returns {LoadingOptions} 返回标准化后的配置对象
   */
  static normalize(el) {
    // 兼容vue
    let opt = {
      target: el,
      body: false,
      fullscreen: false,
      lock: false
    }
    if (el.__vnode) {
      opt.beforeClose = el.__vnode.props.onBeforeClose
      opt.closed = el.__vnode.props.onClosed
    }
    if (el.hasAttribute('loading-text')) {
      opt.text = el.getAttribute('loading-text')
    }
    if (el.hasAttribute('loading-background')) {
      opt.background = el.getAttribute('loading-background')
    }
    if (el.hasAttribute('loading-custom-class')) {
      opt.customClass = el.getAttribute('loading-custom-class')
    }
    if (el.hasAttribute('loading-svg')) {
      opt.svg = el.getAttribute('loading-svg')
    } else if (el.hasAttribute('loading-spinner')) {
      opt.svg = el.getAttribute('loading-spinner')
    }
    if (el.hasAttribute('loading-svg-view-box')) {
      opt.svgViewBox = el.getAttribute('loading-svg-view-box')
    }
    return opt
  }
}

HTMLDialogElement.prototype.show = function (event) {
  let dialog
  switch (this.role) {
    case 'dialog': {
      dialog = new Dialog(this, { modal: false }, event)
      break
    }
    case 'drawer': {
      dialog = new Drawer(this, { modal: false })
      break
    }
    default: {
      show.call(this)
      return
    }
  }
  dialog.show()
}

HTMLDialogElement.prototype.showModal = function (event) {
  let dialog
  switch (this.role) {
    case 'dialog': {
      dialog = new Dialog(this, { modal: true }, event)
      break
    }
    case 'drawer': {
      dialog = new Drawer(this, { modal: true })
      break
    }
    default: {
      showModal.call(this)
      return
    }
  }
  dialog.show()
}

HTMLDialogElement.prototype.close = function () {
  let dialog = Dialog.map.get(this)
  if (!dialog) {
    console.log('这里有问题应该是toggle检测关闭')
    close.call(this)
    return
  }
  dialog.close()
}

/*==================== Popover ==================== */

HTMLElement.prototype.showPopover = function (event) {
  switch (this.role) {
    case 'tooltip': {
      if (!this.style.positionAnchor) {
        this.style.positionAnchor = '--' + crypto.randomUUID()
      }
      if (this.__anchor) {
        this.__anchor.style.removeProperty('anchor-name')
      }
      this.__anchor = event.currentTarget
      this.__anchor.style.anchorName = this.style.positionAnchor
      this.ontoggle = (event) => {
        if (event.newState === 'close' && this.__anchor) {
          this.__anchor.style.removeProperty('anchor-name')
          delete this.__anchor
        }
      }
      break
    }
  }
  showPopover.call(this, event)
}

HTMLElement.prototype.hidePopover = function (event) {
  hidePopover.call(this, event)
}

HTMLElement.prototype.togglePopover = function (force) {
  togglePopover.call(this, force)
}

/*==================== Message ==================== */
/**
 * @typedef {Object} MessageOptions
 * @property {string|HTMLElement|function} [message=''] - 消息文字
 * @property {'primary'|'success'|'warning'|'info'|'error'|'loading'} [type='info'] - 消息类型，影响显示样式和图标
 * @property {boolean} [plain=false] - 是否纯色
 * @property {string|HTMLElement|SVGSVGElement} [icon=''] - 自定义图标，该属性会覆盖 type 的图标。
 * @property {boolean} [dangerouslyUseHTMLString=false] - 是否将 message 属性作为 HTML 片段处理
 * @property {string} [customClass=''] - 自定义类名
 * @property {number} [duration=3000] - 显示时间，单位为毫秒。 设为 0 则不会自动关闭
 * @property {boolean} [showClose=false] - 是否显示关闭按钮
 * @property {Function} [onClose=undefined] - 关闭时的回调函数, 参数为被关闭的 message 实例
 * @property {number} [offset=16] - Message 距离窗口顶部的偏移量
 * @property {HTMLElement} [appendTo=document.body] - 设置 message 的根元素，默认为 document.body
 */
let contextHolder = null
/**
 * Message 消息提示组件函数
 * @param {MessageOptions|string} options - 消息配置选项或直接传入消息文本
 * @returns {MessageConstructor} Message 实例
 */
function Message(options) {
  if (!contextHolder) {
    contextHolder = document.createElement('div')
    contextHolder.setAttribute('popover', 'manual')
    contextHolder.classList.add('context-holder')
    document.body.append(contextHolder)
    contextHolder.showPopover()
  }
  options = typeof options === 'string' ? { message: options } : typeof options === 'object' ? options : {}
  return new MessageConstructor(options)
}
class MessageConstructor {
  #ele = new Map()
  /** @type {HTMLElement|null} */
  #element = null
  /**
   * @type {MessageOptions}
   */
  #options = {
    message: '',
    type: 'info',
    plain: false,
    icon: '',
    dangerouslyUseHTMLString: false,
    customClass: '',
    duration: 3000,
    showClose: false,
    onClose: undefined,
    offset: 16,
    appendTo: contextHolder
  }
  #timer = null
  get element() {
    return this.#element
  }
  static instance = null
  constructor(options) {
    Object.assign(this.#options, options)
    if (this.#options.type === 'loading') {
      let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.classList.add('circular')
      svg.setAttribute('viewBox', '0 0 50 50')
      let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.classList.add('path')
      circle.setAttribute('cx', '25')
      circle.setAttribute('cy', '25')
      circle.setAttribute('r', '20')
      circle.setAttribute('fill', 'none')
      svg.appendChild(circle)
      this.#options.icon = svg
    }
    this.render()
    this.show()
  }
  set message(msg) {
    let { textContent } = Object.fromEntries(this.#ele)
    textContent.innerHTML = ''
    this.#options.message = msg
    if (this.#options.message?.nodeType) {
      textContent.append(this.#options.message)
    } else if (this.#options.dangerouslyUseHTMLString) {
      textContent.innerHTML = this.#options.message
    } else {
      textContent.textContent = this.#options.message
    }
  }
  set type(val) {
    let { notice } = Object.fromEntries(this.#ele)
    if (this.#options.type) notice.classList.remove('color-' + this.#options.type)
    this.#options.type = val
    if (this.#options.type) notice.classList.add('color-' + val)
  }
  set plain(bool) {
    let { notice } = Object.fromEntries(this.#ele)
    this.#options.plain = !!bool
    notice.classList.toggle('is-plain', this.#options.plain)
  }
  set icon(ele) {
    let { notice } = Object.fromEntries(this.#ele)
    if (this.#options.icon?.nodeType) this.#options.icon.remove()
    if (ele?.nodeType) {
      this.#options.icon = ele
      notice.firstElementChild.prepend(ele)
      notice.classList.toggle('custom-icon', true)
    } else {
      notice.classList.toggle('custom-icon', false)
    }
  }
  set customClass(val) {
    let { notice } = Object.fromEntries(this.#ele),
      oldVal = this.#options.customClass.split(' ').filter((v) => !!v),
      newVal = val.split(' ').filter((v) => !!v)
    if (oldVal.length) notice.classList.remove(...oldVal)
    this.#options.customClass = val
    if (newVal.length) notice.classList.add(...newVal)
  }
  set duration(num) {
    if (typeof num !== 'number') throw new TypeError('duration must be a number')
    clearTimeout(this.#timer)
    this.#options.duration = num
    if (this.#options.duration > 0) {
      setTimeout(() => this.close(), this.#options.duration)
    }
  }
  set showClose(bool) {
    let { notice, close } = Object.fromEntries(this.#ele)
    if (close) close.remove()
    this.#options.showClose = !!bool
    if (this.#options.showClose) {
      let i = document.createElement('i')
      this.#ele.set('close', i)
      i.role = 'close'
      i.onclick = () => this.close()
      notice.firstElementChild.append(i)
    }
  }
  render() {
    let notice = document.createElement('div')
    this.#ele.set('notice', notice)
    notice.role = 'message'
    this.type = this.#options.type
    this.customClass = this.#options.customClass
    this.plain = this.#options.plain
    let content = document.createElement('div')
    content.classList.add('content')
    notice.append(content)
    this.icon = this.#options.icon
    let span = document.createElement('span')
    this.#ele.set('textContent', span)
    this.message = this.#options.message
    content.append(span)
    this.showClose = this.#options.showClose
    notice.style.margin = this.#options.offset / 2 + 'px'
    this.#element = document.createElement('div')
    this.#element.append(notice)
  }
  show() {
    this.#options.appendTo.append(this.element)
    if (this.#options.duration > 0) {
      this.#timer = setTimeout(() => this.close(), this.#options.duration)
    }
  }
  close() {
    clearTimeout(this.#timer)
    this.#element.ontransitionend = (e) => {
      if (e.propertyName === 'opacity' && this.#element.classList.contains('fade-out')) {
        if (!CSS.supports('height', 'calc-size(auto, size)')) this.#element.style.removeProperty('height')
        this.#element.classList.remove('fade-out')
        this.#element.remove()
        if (typeof this.#options.onClose === 'function') this.#options.onClose()
      }
    }
    // 不支持 calc-size 的 , 手动设置高度
    if (!CSS.supports('height', 'calc-size(auto, size)')) this.#element.style.height = getComputedStyle(this.#element).height
    this.#element.classList.add('fade-out')
  }
}
/**
 * 显示主要（primary）类型的消息
 * @function Message.primary
 * @param {MessageOptions|string} options - 消息配置选项
 * @returns {MessageConstructor} Message 实例
 */
Message.primary = function (options) {
  options = typeof options === 'string' ? { message: options } : typeof options === 'object' ? options : {}
  options.type = options.type ?? 'primary'
  return Message(options)
}
/**
 * 显示成功（success）类型的消息
 * @function Message.success
 * @param {MessageOptions|string} options - 消息配置选项
 * @returns {MessageConstructor} Message 实例
 */
Message.success = function (options) {
  options = typeof options === 'string' ? { message: options } : typeof options === 'object' ? options : {}
  options.type = options.type ?? 'success'
  return Message(options)
}
/**
 * 显示错误（error）类型的消息
 * @function Message.error
 * @param {MessageOptions|string} options - 消息配置选项
 * @returns {MessageConstructor} Message 实例
 */
Message.error = function (options) {
  options = typeof options === 'string' ? { message: options } : typeof options === 'object' ? options : {}
  options.type = options.type ?? 'error'
  return Message(options)
}
/**
 * 显示信息（info）类型的消息
 * @function Message.info
 * @param {MessageOptions|string} options - 消息配置选项
 * @returns {MessageConstructor} Message 实例
 */
Message.info = function (options) {
  options = typeof options === 'string' ? { message: options } : typeof options === 'object' ? options : {}
  options.type = options.type ?? 'info'
  return Message(options)
}
/**
 * 显示警告（warning）类型的消息
 * @function Message.warning
 * @param {MessageOptions|string} options - 消息配置选项
 * @returns {MessageConstructor} Message 实例
 */
Message.warning = function (options) {
  options = typeof options === 'string' ? { message: options } : typeof options === 'object' ? options : {}
  options.type = options.type ?? 'warning'
  return Message(options)
}
/**
 * 显示加载（loading）类型的消息
 * @function Message.loading
 * @param {MessageOptions|string} options - 消息配置选项
 * @returns {MessageConstructor} Message 实例
 */
Message.loading = function (options) {
  options = typeof options === 'string' ? { message: options } : typeof options === 'object' ? options : {}
  options.type = options.type ?? 'loading'
  return Message(options)
}
/**
 * 销毁所有消息
 * @function Message.destroy
 */
Message.destroy = function () {
  contextHolder.remove()
  contextHolder = null
}

export { MessageBox, Loading, Message }
