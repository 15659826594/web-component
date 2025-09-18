function CSSupports(attr, value, suffix = 'px') {
  if (CSS.supports(attr, value)) return value
  let val = parseInt(value)
  if (isNaN(val)) return ''
  return val + suffix
}

class MatchMedia extends HTMLElement {
  /**
   * @private
   * @type {HTMLSlotElement | null}
   * 存储 shadow DOM 中的 slot 元素引用
   */
  #solt = null
  /**
   * @private
   * @type {MediaQueryList | null}
   */
  #mediaQuery = null
  #minWidth = ''
  #maxWidth = ''
  #width = ''
  #minHeight = ''
  #maxHeight = ''
  #height = ''
  #orientation = ''
  #sheet = (function () {
    let sheet = new CSSStyleSheet()
    sheet.replaceSync(/* language=CSS */ `@supports (display: contents) {
      :host{
        display: contents;
      }
    }`)
    return sheet
  })()
  static get observedAttributes() {
    return ['min-width', 'max-width', 'width', 'min-height', 'max-height', 'height', 'orientation']
  }
  props(observedAttributes) {
    for (const attr of observedAttributes) {
      let attribute = this.attributes[attr]
      if (attribute === undefined) continue
      switch (attr) {
        case 'min-width': {
          this.#minWidth = CSSupports(attr, attribute.value)
          break
        }
        case 'max-width': {
          this.#maxWidth = CSSupports(attr, attribute.value)
          break
        }
        case 'min-height': {
          this.#minHeight = CSSupports(attr, attribute.value)
          break
        }
        case 'max-height': {
          this.#maxHeight = CSSupports(attr, attribute.value)
          break
        }
        case 'width': {
          this.#width = CSSupports(attr, attribute.value)
          break
        }
        case 'height': {
          this.#height = CSSupports(attr, attribute.value)
          break
        }
        case 'orientation': {
          this.#orientation = ['landscape', 'portrait'].includes(attribute.value) ? attribute.value : ''
          break
        }
      }
    }
    let query = this.createMediaQuery()
    if (query) {
      this.#mediaQuery = window.matchMedia(query)
      this.#mediaQuery.onchange = (e) => {
        e.matches ? this.show() : this.hide()
      }
    } else {
      this.#mediaQuery.onchange = null
      this.#mediaQuery = null
    }
    window.matchMedia(this.createMediaQuery())
  }
  constructor() {
    super()
  }
  connectedCallback() {
    this.props(MatchMedia.observedAttributes)
    this.render()
  }
  render() {
    this.attachShadow({ mode: 'open' })
    this.#solt = document.createElement('slot')
    this.shadowRoot.adoptedStyleSheets = [this.#sheet]

    window.matchMedia(this.createMediaQuery()).matches ? this.show() : this.hide()
  }
  // 创建媒体查询。注: orientation 是根据视口的宽高来判断的
  createMediaQuery() {
    let mediaQuery = []
    for (const observedAttr of MatchMedia.observedAttributes) {
      switch (observedAttr) {
        case 'min-width': {
          this.#minWidth && mediaQuery.push(`(${observedAttr}: ${this.#minWidth})`)
          break
        }
        case 'max-width': {
          this.#maxWidth && mediaQuery.push(`(${observedAttr}: ${this.#maxWidth})`)
          break
        }
        case 'min-height': {
          this.#minHeight && mediaQuery.push(`(${observedAttr}: ${this.#minHeight})`)
          break
        }
        case 'max-height': {
          this.#maxHeight && mediaQuery.push(`(${observedAttr}: ${this.#maxHeight})`)
          break
        }
        case 'width': {
          this.#width && mediaQuery.push(`(${observedAttr}: ${this.#width})`)
          break
        }
        case 'height': {
          this.#height && mediaQuery.push(`(${observedAttr}: ${this.#height})`)
          break
        }
        case 'orientation': {
          this.#orientation && mediaQuery.push(`(${observedAttr}: ${this.#orientation})`)
          break
        }
      }
    }
    return mediaQuery.join(' and ')
  }
  show() {
    !this.shadowRoot.firstElementChild && this.shadowRoot.appendChild(this.#solt)
    this.dispatchEvent(new CustomEvent('show'))
  }
  hide() {
    this.shadowRoot.firstElementChild && this.shadowRoot.removeChild(this.shadowRoot.firstElementChild)
    this.dispatchEvent(new CustomEvent('hide'))
  }
  attributeChangedCallback(name) {
    if (!this.shadowRoot) return
    this.props([name])
  }
  disconnectedCallback() {}
}

if (!customElements.get('wc-match-media')) {
  customElements.define('wc-match-media', MatchMedia)
}
