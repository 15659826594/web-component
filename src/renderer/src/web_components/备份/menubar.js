import { toCamelCase, parseBool } from '../utils'

class Menubar extends HTMLElement {
  #attributes = {
    list: [], //tab 的列表，最少2个、最多5个 tab
    collapse: false, //tabBar 是否折叠 position = left有效
    onlyIcon: false,
    uniqueOpened: false, //是否只保持一个子菜单的展开
    trigger: 'click' //子菜单打开的触发方式
  }
  #details = new Map()
  static get observedAttributes() {
    return ['items', 'collapse', 'only-icon', 'unique-opened', 'trigger']
  }
  constructor() {
    super()
  }
  props(name, oldVal, newVal) {
    let oldName = name
    name = toCamelCase(name)
    switch (name) {
      case 'trigger': {
        newVal = ['click', 'hover'].includes(newVal) ? newVal : 'click'
        break
      }
      case 'items': {
        if (!newVal) return
        name = 'list'
        newVal = JSON.parse(newVal)
        this.removeAttribute('items')
        break
      }
      case 'collapse':
      case 'onlyIcon':
      case 'uniqueOpened': {
        newVal = parseBool(this.attributes[oldName], false)
        break
      }
    }

    if (this.#details.size) {
      switch (name) {
        case 'trigger': {
          this.#details.get('list').forEach((item) => {
            if (!item.isleaf) {
              item.open = false
              if (oldVal === 'hover') item.lastElementChild.style.transform = 'none'
            }
            item.onmouseenter = newVal === 'hover' ? this.hover : null
          })
          break
        }
      }
    }

    this.#attributes[name] = newVal
  }
  connectedCallback() {
    this.role = 'menubar'
    this.render()
  }
  render() {
    let fragment = document.createDocumentFragment()
    createMenu(this.#attributes.list, fragment)
    this.append(fragment)
    this.#details.set('list', this.querySelectorAll('details'))

    this.#details.get('list').forEach((item) => {
      item.onclick = this.clickdown
      if (this.#attributes.trigger === 'hover') item.onmouseenter = this.hover
    })
    this.part
  }
  clickdown = (e) => {
    let { currentTarget } = e,
      { isleaf } = currentTarget,
      select = this.#details.get('select')
    if (select === currentTarget || currentTarget.hasAttribute('disabled')) {
      e.preventDefault()
      return
    }

    let chains = []
    let paths = e.composedPath()
    for (const path of paths) {
      if (path === menubar) break
      if (path.tagName === 'DETAILS') chains.push(path)
    }

    switch (this.#attributes.trigger) {
      case 'hover': {
        if (!isleaf) e.preventDefault()
        break
      }
      default: {
        if (this.#attributes.uniqueOpened) {
          let opened = this.#details.get('opened')
          if (opened) {
            // 叶子节点的状态由其他叶子节点的点击事件控制 。 也就是说当父节点关闭时，叶子节点不会被关闭
            opened.forEach((item) => {
              if (!chains.includes(item) && !item.isleaf) {
                item.open = false
              }
            })
          }
          this.#details.set('opened', chains)
        }
        break
      }
    }

    // 只允许一个叶子节点被选中
    if (isleaf) {
      if (select) select.open = false
      this.#details.set('select', currentTarget)
      this.dispatchEvent(
        new CustomEvent('select', {
          bubbles: true,
          detail: {
            domEvent: e,
            keyPath: chains,
            ...currentTarget.info
          }
        })
      )
    }
    e.stopPropagation()
  }
  hover = (e) => {
    let { currentTarget } = e,
      { isleaf } = currentTarget
    if (isleaf) return
    let menu = currentTarget.lastElementChild
    menu.style.transform = 'none'
    let { bottom } = menu.getBoundingClientRect()
    menu.style.transform = `translateY(-${Math.max(bottom + 8 - document.documentElement.clientHeight, 0)}px)`
  }
  attributeChangedCallback(name, oldVal, newVal) {
    this.props(name, oldVal, newVal)
  }
  disconnectedCallback() {}
}

function createMenu(children, parentElement, level = 0, url) {
  url = url ?? new URL('', 'file://')
  children.forEach((child, index) => {
    let li = document.createElement('li'),
      details = document.createElement('details'),
      summary = document.createElement('summary'),
      span = document.createElement('span'),
      text = document.createElement('span')
    if (child.disabled) details.setAttribute('disabled', '')
    details.setAttribute('index', `${level + 1}-${index + 1}`)
    span.appendChild(text)
    summary.appendChild(span)
    details.appendChild(summary)
    li.appendChild(details)
    let fullpath = new URL(child.pagePath, url + '/')
    details.info = child
    details.info['fullpath'] = fullpath.pathname
    if (child.iconfont?.text) {
      let icon = document.createElement('i')
      if (child.iconfont.fontSize) icon.style.fontSize = child.iconfont.fontSize
      if (child.iconfont.color) icon.style.setProperty('--color', child.iconfont.color)
      if (child.iconfont.selectedColor) icon.style.setProperty('--selected-color', child.iconfont.selectedColor)
      icon.dataset.text = child.iconfont.text
      icon.dataset.selectedText = child.iconfont.selectedText || child.iconfont.text
      span.insertBefore(icon, text)
    }
    if (child.children?.length) {
      let menu = document.createElement('menu')
      menu.role = 'menu'
      details.classList.add('branch')
      createMenu(child.children, menu, level + 1, fullpath)
      details.appendChild(menu)
    } else {
      details.isleaf = true
      details.classList.add('leaf')
    }
    text.textContent = child.text
    if (parentElement.nodeType !== 11) {
      parentElement?.style.setProperty('--level', level)
    }
    parentElement.appendChild(li)
  })
}

if (!customElements.get('wc-menubar')) {
  customElements.define('wc-menubar', Menubar)
}
