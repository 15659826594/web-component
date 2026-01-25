const tablestyle = (function () {
  let sheet = new CSSStyleSheet()
  sheet.replaceSync(/* language=CSS */ `:host {
    display: table;
    border-collapse: separate;
    box-sizing: border-box;
    text-indent: initial;
    unicode-bidi: isolate;
    border-spacing: 2px;
    border-color: gray;
  }`)
  return sheet
})()

class Table extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.append(document.createElement('slot'))
    this.shadowRoot.adoptedStyleSheets = [tablestyle]
  }
}

const theadstyle = (function () {
  let sheet = new CSSStyleSheet()
  sheet.replaceSync(/* language=CSS */ `:host {
    display: table-header-group;
    vertical-align: middle;
    unicode-bidi: isolate;
    border-color: inherit;
  }`)
  return sheet
})()

class Thead extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.append(document.createElement('slot'))
    this.shadowRoot.adoptedStyleSheets = [theadstyle]
  }
}

const tbodystyle = (function () {
  let sheet = new CSSStyleSheet()
  sheet.replaceSync(/* language=CSS */ `:host {
    display: table-row-group;
    vertical-align: middle;
    unicode-bidi: isolate;
    border-color: inherit;
  }`)
  return sheet
})()

class Tbody extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.append(document.createElement('slot'))
    this.shadowRoot.adoptedStyleSheets = [tbodystyle]
  }
}

const trstyle = (function () {
  let sheet = new CSSStyleSheet()
  sheet.replaceSync(/* language=CSS */ `:host {
    display: contents;
    [part='reference']{
      &> td{
        padding: 0;
        &> div{
          height: 0;
          opacity: 0;
          overflow: hidden;
          transition-duration: 300ms;
          transition-property: opacity, height;
        }
      }
      &[open] > td > div{
        opacity: 1;
        height: calc-size(auto, size);
      }
    }
  }
  ::slotted([slot='reference']) {
    display: contents;
  }`)
  return sheet
})()

class Tr extends HTMLElement {
  /**
   * @type { ElementInternals }
   */
  #internals = null
  #offset = 0
  setOffset(num) {
    this.#offset = num
  }
  constructor() {
    super()
  }
  static get observedAttributes() {
    return ['offset']
  }
  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    this.#internals = this.attachInternals()
    this.render()
    this.addEventListener('change', this.open)
  }
  render() {
    let slot = document.createElement('tr')
    slot.part.add('tr')
    slot.append(document.createElement('slot'))
    this.shadowRoot.append(slot)
    this.shadowRoot.adoptedStyleSheets = [trstyle]
  }
  get reference() {
    let tr = this.shadowRoot.getElementById('reference')
    if (tr) return tr
    tr = document.createElement('tr')

    let td = document.createElement('td'),
      div = document.createElement('div'),
      slot = document.createElement('slot')
    tr.id = 'reference'
    tr.part.add('reference')
    td.setAttribute('colspan', '100%')
    td.part.add('td')
    slot.name = 'reference'
    td.append(div)
    tr.append(td)
    div.append(slot)
    this.shadowRoot.append(tr)
    div.offsetHeight
    if (this.#offset) {
      let offset = document.createElement('td')
      offset.colSpan = this.#offset
      tr.prepend(offset)
    }
    return tr
  }
  open(e) {
    if (e && e.target.role === 'open') {
      this.reference.toggleAttribute('open', e.target.checked)
      if (e.target.checked && !this.#internals.states.has('open')) {
        this.#internals.states.add('open')
      } else if (!e.target.checked && this.#internals.states.has('open')) {
        this.#internals.states.delete('open')
      }
    }
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'offset': {
        let num = parseInt(newValue)
        this.setOffset(isNaN(num) ? 0 : num)
        break
      }
    }
  }
  disconnectedCallback() {
    this.removeEventListener('change', this.open)
  }
}

const thstyle = (function () {
  let sheet = new CSSStyleSheet()
  sheet.replaceSync(/* language=CSS */ `:host {
    display: contents;
  }`)
  return sheet
})()

class Th extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    let th = document.createElement('th')
    th.append(document.createElement('slot'))
    th.part.add('th')
    this.shadowRoot.append(th)
    this.shadowRoot.adoptedStyleSheets = [thstyle]
  }
}

const tdstyle = (function () {
  let sheet = new CSSStyleSheet()
  sheet.replaceSync(/* language=CSS */ `:host {
    display: contents;
  }`)
  return sheet
})()

class Td extends HTMLElement {
  static get observedAttributes() {
    return ['colspan', 'headers', 'rowspan']
  }
  constructor() {
    super()
  }
  connectedCallback() {
    this.render()
    this.#attributeChangedCallbackCache.forEach((args) => this.attributeChangedCallback(...args))
    this.#attributeChangedCallbackCache = []
  }
  render() {
    this.attachShadow({ mode: 'open' })
    let td = document.createElement('td')
    td.id = 'td'
    td.part.add('td')
    td.append(document.createElement('slot'))
    this.shadowRoot.append(td)
    this.shadowRoot.adoptedStyleSheets = [tdstyle]
  }
  #attributeChangedCallbackCache = []
  attributeChangedCallback(name, oldVal, newVal) {
    if (!this.shadowRoot) {
      this.#attributeChangedCallbackCache.push(arguments)
      return
    }
    switch (name) {
      case 'colspan': {
        this.shadowRoot.getElementById('td').colSpan = newVal
        break
      }
      case 'headers': {
        this.shadowRoot.getElementById('td').headers = newVal
        break
      }
      case 'rowspan': {
        this.shadowRoot.getElementById('td').rowSpan = newVal
        break
      }
    }
  }
}

if (!customElements.get('wc-table')) {
  customElements.define('wc-table', Table)
  customElements.define('wc-thead', Thead)
  customElements.define('wc-tbody', Tbody)
  customElements.define('wc-tr', Tr)
  customElements.define('wc-th', Th)
  customElements.define('wc-td', Td)
}
