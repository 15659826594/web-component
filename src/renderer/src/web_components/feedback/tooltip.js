// noinspection CssUnresolvedCustomProperty

let fallbackPlacements = new Map([['top'], ['top-start', 'top span-right'], ['top-end', 'top span-left'], ['bottom'], ['bottom-start', 'bottom span-right'], ['bottom-end', 'bottom span-left'], ['left'], ['left-start', 'left span-bottom'], ['left-end', 'left span-top'], ['right'], ['right-start', 'right span-bottom'], ['right-end', 'right span-top']])
/**
 * 创建一个用于定位弹出框的 CSS 样式表
 *
 * @param {Map<string,string>} [fallbacks=[]] - 包含位置策略的二维数组
 */
function placement(fallbacks) {
  let sheet = ''
  for (const [target, popover] of fallbacks) {
    sheet += /* language=CSS */ `
      :host([placement='${target}']){
        [part='popover']{
          position-area: ${popover || target};
        }
      }
    `
  }
  return sheet
}

const style = (function () {
  let sheet = new CSSStyleSheet()
  sheet.replaceSync(/* language=CSS */ `
    :host {
      --offset: 1.2rem;
      --arrow-offset: 5px;
      display: inline-flex;
      [part='anchor']{
        anchor-name: var(--anchor);
        width: 100%;
      }
      [part='popover'] {
        position-anchor: var(--anchor);
        margin: 0;
        border: none;
        inset: auto;
        font-size: 1.4rem;
        line-height: 1.6rem;
        padding: 1.2rem 1.6rem;
        overflow: visible;
        width: fit-content;
        white-space: nowrap;
        border-radius: var(--radius-500);
        transition: opacity 300ms ease-in-out;
        @starting-style {
          opacity: 0;
        }
      }
    }
    :host(:not([trigger]):hover) [part='popover'],
    :host([trigger='hover']:hover) [part='popover'],
    :host([trigger='focus']:active) [part='popover'],
    :host([trigger='click']:focus) [part='popover'],
    :host([trigger='click']:focus-within) [part='popover']{
      display: block;
      z-index: var(--z-index-pop-up, 1060);
    }
    :host(:not([effect])) [part='popover'],
    :host([effect='dark']) [part='popover']{
      color: var(--white);
      background-color: var(--info-900);
      filter: drop-shadow(0 0 0.1rem #fff) drop-shadow(0 1.5rem 3rem #11182623) drop-shadow(0 0.5rem 1.5rem #00000014);
    }
    :host([effect='light']) [part='popover']{
      color: var(--info-700);
      background-color: var(--white);
      filter: drop-shadow(0 0 0.1rem #98a1b20a) drop-shadow(0 1.5rem 3rem #1118260f) drop-shadow(0 0.5rem 1.5rem #00000008);
    }
    :host([show-arrow]) [part='popover']::before{
      content: '';
      position: absolute;
      display: block;
      width: 2.8rem;
      height: 0.8rem;
      background: inherit;
      mask-size: 2.8rem 0.8rem;
      mask-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBmaWxsPSJub25lIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIyMCIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgMjAgOCI+PGc+PGc+PHBhdGggZD0iTTMuNDAwMjUsMS4yMTE2OUMyLjY0NzEzLDAuNDM3MDQ0LDEuNjEyNjcsMCwwLjUzMjI3MSwwQzAuNTMyMjcxLDAsMCwwLDAsMEMwLDAsMjAsMCwyMCwwQzIwLDAsMTkuNDY3NywwLDE5LjQ2NzcsMEMxOC4zODczLDAsMTcuMzUyOSwwLjQzNzA0NCwxNi41OTk4LDEuMjExNjlDMTYuNTk5OCwxLjIxMTY5LDExLjQzNCw2LjUyNTA0LDExLjQzNCw2LjUyNTA0QzEwLjY0ODYsNy4zMzI4Myw5LjM1MTM2LDcuMzMyODMsOC41NjYwMSw2LjUyNTA0QzguNTY2MDEsNi41MjUwNCwzLjQwMDI1LDEuMjExNjksMy40MDAyNSwxLjIxMTY5QzMuNDAwMjUsMS4yMTE2OSwzLjQwMDI1LDEuMjExNjksMy40MDAyNSwxLjIxMTY5WiIgZmlsbD0iIzE3MUMyNiIgZmlsbC1vcGFjaXR5PSIxIi8+PC9nPjwvZz48L3N2Zz4=');
    }
    :host([show-arrow][placement='bottom']) [part='popover']::before,
    :host([show-arrow]:not([placement])) [part='popover']::before{
      bottom: 100%;
      left: calc(50% - 1.4rem);
      transform: rotate(180deg);
    }
    :host([show-arrow][placement='top']) [part='popover']::before{
      top: 100%;
      left: calc(50% - 1.4rem);
    }
    :host([show-arrow][placement='top-start']) [part='popover']::before{
      top: 100%;
      left: var(--arrow-offset, 0px);
    }
    :host([show-arrow][placement='top-end']) [part='popover']::before{
      top: 100%;
      right: var(--arrow-offset, 0px);
    }
    :host([show-arrow][placement='right-start']) [part='popover']::before{
      left: 0;
      top: var(--arrow-offset, 0px);
      transform-origin: 0 0;
      transform: rotate(90deg);
    }
    :host([show-arrow][placement='right']) [part='popover']::before{
      left: 0;
      top: calc(50% - 1.4rem);
      transform-origin: 0 0;
      transform: rotate(90deg);
    }
    :host([show-arrow][placement='right-end']) [part='popover']::before{
      left: 0;
      bottom: calc(2rem + var(--arrow-offset, 0px));
      transform-origin: 0 0;
      transform: rotate(90deg);
    }
    :host([show-arrow][placement='bottom-start']) [part='popover']::before{
      bottom: 100%;
      left: var(--arrow-offset, 0px);
      transform: rotate(180deg);
    }
    :host([show-arrow][placement='bottom-end']) [part='popover']::before{
      bottom: 100%;
      right: var(--arrow-offset, 0px);
      transform: rotate(180deg);
    }
    :host([show-arrow][placement='left-start']) [part='popover']::before{
      right: 0;
      top: var(--arrow-offset, 0px);
      transform-origin: top right;
      transform: rotate(-90deg);
    }
    :host([show-arrow][placement='left']) [part='popover']::before{
      right: 0;
      top: calc(50% - 1.4rem);
      transform-origin: top right;
      transform: rotate(-90deg);
    }
    :host([show-arrow][placement='left-end']) [part='popover']::before{
      right: 0;
      bottom: calc(2rem + var(--arrow-offset, 0px));
      transform-origin: top right;
      transform: rotate(-90deg);
    }
    :host(:not([placement])) [part='popover']{
      position-area: bottom;
      margin-top: var(--offset);
    }
    :host([placement^='top']) [part='popover']{
      margin-bottom: var(--offset);
    }
    :host([placement^='left']) [part='popover']{
      margin-right: var(--offset);
    }
    :host([placement^='right']) [part='popover']{
      margin-left: var(--offset);
    }
    :host([placement^='bottom']) [part='popover']{
      margin-top: var(--offset);
    }
    :host([fallback-placements='']) [part='popover']{
      position-try-fallbacks: flip-block, flip-inline;
    }
    ${placement(fallbackPlacements)}
  `)
  return sheet
})()

class Tooltip extends HTMLElement {
  /**
   * 存储事件类型与对应处理函数映射的 Map
   * 用于管理 tooltip 触发事件的监听器
   * @type {Map<string, Function>}
   */
  #eventListeners = new Map()
  #timer = null
  #showAfter = 0 //在触发后多久显示内容
  #hideAfter = 200 //延迟关闭，单位毫秒
  #trigger = 'hover' //如何触发 Tooltip 'hover' | 'click' | 'focus' | 'contextmenu'
  static get observedAttributes() {
    return ['content', 'fallback-placements', 'show-after', 'hide-after', 'trigger']
  }
  constructor() {
    super()
  }
  connectedCallback() {
    this.render()
    this.#attributeChangedCallbackCache.forEach((args) => this.attributeChangedCallback(...args))
    // 初始化默认值
    if (!this.#attributeChangedCallbackCache.has('trigger')) this.attributeChangedCallback('trigger', null, this.#trigger)
    this.#attributeChangedCallbackCache.clear()
  }
  render() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' })
    let anchor = `--tooltip-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`
    this.shadowRoot.innerHTML = /* language=HTML */ `
      <div part="anchor" style="anchor-name: ${anchor}">
        <slot></slot>
      </div>
      <div id="popover" part="popover" popover="hint" style="position-anchor: ${anchor}">
        <slot name="content"></slot>
      </div>
    `
    this.shadowRoot.adoptedStyleSheets = [style]
  }
  showPopover() {
    this.#timer && clearTimeout(this.#timer)
    setTimeout(() => {
      this.shadowRoot.getElementById('popover').showPopover()
    }, this.#showAfter)
  }
  hidePopover() {
    this.#timer = setTimeout(() => {
      this.shadowRoot.getElementById('popover').hidePopover()
    }, this.#hideAfter)
  }
  #attributeChangedCallbackCache = new Map()
  attributeChangedCallback(name, oldVal, newVal) {
    if (!this.shadowRoot) {
      this.#attributeChangedCallbackCache.set(name, arguments)
      return
    }
    switch (name) {
      case 'content': {
        let content = this.shadowRoot.getElementById('popover').firstElementChild
        if (this.hasAttribute('raw-content')) {
          content.innerHTML = newVal
        } else {
          content.textContent = newVal
        }
        break
      }
      case 'fallback-placements': {
        let sheet = new CSSStyleSheet()
        sheet.name = 'fallback-placements'

        let fallbacks = []
        if (newVal) {
          newVal.split(' ').forEach((placement) => {
            if (!fallbackPlacements.has(placement)) return
            fallbacks.push(fallbackPlacements.get(placement) || placement)
          })
        }

        let index = this.shadowRoot.adoptedStyleSheets.findIndex((sheet) => sheet.name === 'fallback-placements')
        if (index > -1) this.shadowRoot.adoptedStyleSheets.splice(index, 1)

        if (fallbacks.length) {
          sheet.replaceSync(/* language=CSS */ `:host{
            [part='popover'] {
              position-try-fallbacks: ${fallbacks.join(', ')};
            }
          }`)
          this.shadowRoot.adoptedStyleSheets.push(sheet)
        }
        break
      }
      case 'show-after': {
        let num = parseInt(newVal)
        this.#showAfter = isNaN(num) ? 0 : num
        break
      }
      case 'hide-after': {
        let num = parseInt(newVal)
        this.#hideAfter = isNaN(num) ? 0 : num
        break
      }
      case 'trigger': {
        this.#trigger = ['hover', 'click', 'focus', 'contextmenu'].includes(newVal) ? newVal : 'hover'
        this.#eventListeners.forEach((listener, event) => {
          this.removeEventListener(event, listener)
        })
        this.#eventListeners.clear()
        if (this.#trigger === 'click') {
          this.tabIndex = 0
        } else {
          this.removeAttribute('tabindex')
        }
        switch (this.#trigger) {
          case 'contextmenu': {
            this.#eventListeners.set('contextmenu', this.showPopover)
            break
          }
          // 用css样式来处理
          // case 'click': {
          //   this.#eventListeners.set('click', this.showPopover)
          //   break
          // }
          // case 'hover': {
          //   this.#eventListeners.set('mouseover', this.showPopover)
          //   this.#eventListeners.set('mouseout', this.hidePopover)
          //   break
          // }
          // case 'focus': {
          //   this.#eventListeners.set('focusin', this.showPopover)
          //   this.#eventListeners.set('focusout', this.hidePopover)
          //   break
          // }
        }
        this.#eventListeners.forEach((listener, event) => {
          this.addEventListener(event, listener)
        })
        break
      }
    }
  }
  disconnectedCallback() {
    this.#eventListeners.forEach((listener, event) => {
      this.removeEventListener(event, listener)
    })
  }
}

if (!customElements.get('wc-tooltip')) {
  customElements.define('wc-tooltip', Tooltip)
}
