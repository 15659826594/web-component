class Menubar extends HTMLElement {
  static {
    customElements.define('wc-menubar', this)
  }
  #collapse = false // inline 时菜单是否收起状态
  #mode = 'vertical' // vertical | horizontal | inline
  #uniqueID = ''
  #attributeChangedCallbackCache = []

  constructor() {
    super()
  }

  static get observedAttributes() {
    return ['mode', 'collapse', 'unique']
  }

  connectedCallback() {
    this.#uniqueID = this.id ? this.id : '--' + crypto.randomUUID()
  }

  render(items) {
    this.innerHTML = ''
    let fragment = document.createDocumentFragment()
    this.createMenu(items, fragment)
    this.append(fragment)
    this.#attributeChangedCallbackCache.forEach((args) => this.attributeChangedCallback(...args))
  }

  createMenu(items, parentNode, level = 1) {
    items.forEach((item, index) => {
      let node, menuItem
      if (item?.children && item.children.length > 0) {
        node = document.createElement('details')
        node.dataset.pagePath = item.pagePath
        node.style.setProperty('--anchor-name', `${this.#uniqueID}-${level}-${index + 1}`)
        menuItem = document.createElement('summary')
        this.renderMenuItem(menuItem, item)
        let list = document.createElement('menu')
        list.tabIndex = 0
        this.createMenu(item.children, list, level + 1)
        node.append(menuItem, list)
      } else {
        node = document.createElement('li')
        node.dataset.pagePath = item.pagePath
        menuItem = node
        this.renderMenuItem(menuItem, item)
      }
      menuItem.style.setProperty('--menu-level', level.toString())
      parentNode.append(node)
    })
  }

  renderMenuItem(node, config) {
    let div = document.createElement('div')
    div.classList.add('menu-item')
    if (config.iconfont) {
      let icon = document.createElement('i')
      if (config.iconfont.fontSize) icon.style.fontSize = config.iconfont.fontSize
      if (config.iconfont.text) icon.dataset.text = config.iconfont.text
      if (config.iconfont.selectedText) icon.dataset.selectedText = config.iconfont.selectedText
      div.append(icon)
    }
    let span = document.createElement('span')
    span.textContent = config.text
    div.append(span)
    node.append(div)
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (!this.childElementCount) {
      this.#attributeChangedCallbackCache.push(arguments)
      return
    }
    switch (name) {
      case 'mode': {
        this.#mode = ['vertical', 'inline', 'horizontal'].includes(newVal) ? newVal : 'vertical'
        break
      }
      case 'collapse': {
        this.#collapse = ![null, 'false', false].includes(newVal)
        break
      }
      case 'unique': {
        newVal = ![null, 'false', false].includes(newVal)
        this.#traversalMenus(
          this,
          (node) => node?.nodeName === 'DETAILS',
          (details, deep) => {
            details.name = newVal ? `${this.#uniqueID}-level-${deep}` : ''
          }
        )
        break
      }
    }
  }
  #traversalMenus(node, condition, callback, deep = 1) {
    Array.from(node.children).forEach((child) => {
      if (condition(child)) {
        callback(child, deep)
        this.#traversalMenus(child.lastElementChild, callback, deep + 1)
      }
    })
  }
  disconnectedCallback() {}
}

export default Menubar
