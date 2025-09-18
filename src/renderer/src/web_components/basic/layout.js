function layout(insertRule, sheet = new CSSStyleSheet(), span = 24) {
  for (let i = 0, l = span; i <= l; i++) {
    let percent = (i / span) * 100
    insertRule(i, percent).forEach((rule) => {
      sheet.insertRule(rule, sheet.cssRules.length)
    })
  }
  return sheet
}

const layoutsheet = layout(function (i, per) {
  return [`:host([span='${i}']) { display: ${i ? 'block' : 'none'}; max-width: ${per}%; flex: 0 0 ${per}% }`, `:host([offset='${i}']){ margin-left: ${per}% }`, `:host([pull='${i}']){ position: relative; right: ${per}% }`, `:host([push='${i}']){ position: relative; left: ${per}% }`]
})

layoutsheet.insertRule(`:host(:not([span])) { display: block; max-width: 100%; flex: 0 0 100% }`)
let layoutsheets = [layoutsheet]
// 响应式布局: 参照了 Bootstrap 的 响应式设计，预设了五个响应尺寸：xs、sm、md、lg 和 xl。
const medias = new Map([
  ['xs', 'max-width: 767px'],
  ['sm', 'min-width: 768px'],
  ['md', 'min-width: 992px'],
  ['lg', 'min-width: 1200px'],
  ['xl', 'min-width: 1920px']
])
for (const [size, media] of medias) {
  let sheet = new CSSStyleSheet({ media: `(${media})` })
  layout(function (i, per) {
    return [`:host([${size}='${i}']) { display: ${i ? 'block' : 'none'}; max-width: ${per}%; flex: 0 0 ${per}% }`]
  }, sheet)
  layoutsheets.push(sheet)
}

// noinspection CssUnresolvedCustomProperty
class Row extends HTMLElement {
  #gutter = ''
  static get observedAttributes() {
    return ['gutter']
  }
  #stylesheet = /* language=CSS */ `
    :host {
      display: flex;
      flex-wrap: wrap;
      position: relative;
      box-sizing: border-box;
      margin-left: calc(var(--gutter, 0px) / -2 );
      margin-right: calc(var(--gutter, 0px) / -2);
    }
    :host([justify='start']){
      justify-content: flex-start;
    }
    :host([justify='center']){
      justify-content: center;
    }
    :host([justify='end']){
      justify-content: flex-end;
    }
    :host([justify='space-between']){
      justify-content: space-between;
    }
    :host([justify='space-around']){
      justify-content: space-around;
    }
    :host([justify='space-evenly']){
      justify-content: space-evenly;
    }
    :host([align='top']){
      align-items: start;
    }
    :host([align='middle']){
      align-items: center;
    }
    :host([align='bottom']){
      align-items: end;
    }
  `
  props(observedAttributes) {
    for (const attr of observedAttributes) {
      let attribute = this.attributes[attr]
      switch (attr) {
        case 'gutter': {
          if (attribute === undefined) {
            this.#gutter = ''
          } else {
            if (CSS.supports('padding', attribute.value)) {
              this.#gutter = attribute.value
            } else {
              let gutter = parseInt(attribute.value)
              this.#gutter = isNaN(gutter) ? '' : `${gutter}px`
            }
          }
          if (this.#gutter === '') {
            this.style.removeProperty('--gutter')
          } else {
            this.style.setProperty('--gutter', this.#gutter)
          }
          break
        }
      }
    }
  }
  constructor() {
    super()
  }
  connectedCallback() {
    this.props(Row.observedAttributes)
    this.render()
  }
  render() {
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = /* language=HTML */ `<slot></slot>`
    let sheet = new CSSStyleSheet()
    sheet.replaceSync(this.#stylesheet)
    this.shadowRoot.adoptedStyleSheets = [sheet]
  }
  attributeChangedCallback(name) {
    this.props([name])
  }
  disconnectedCallback() {}
}

// noinspection CssUnresolvedCustomProperty
class Col extends HTMLElement {
  #stylesheet = /* language=CSS */ `
    :host {
      box-sizing: border-box;
      padding-right: calc(var(--gutter, 0px) / 2);
      padding-left: calc(var(--gutter, 0px) / 2);
    }
  `
  constructor() {
    super()
  }
  connectedCallback() {
    this.render()
  }
  render() {
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = /* language=HTML */ `<slot></slot>`
    let sheet = new CSSStyleSheet()
    sheet.replaceSync(this.#stylesheet)
    this.shadowRoot.adoptedStyleSheets = [...layoutsheets, sheet]
  }
  disconnectedCallback() {}
}

function registerCSSLayout() {
  let layoutsheet = layout(function (i, per) {
    return [`[role~='col'].span-${i} { display: ${i ? 'block' : 'none'}; max-width: ${per}%; flex: 0 0 ${per}% }`, `[role~='col'].offset-${i} { margin-left: ${per}% }`, `[role~='col'].pull-${i} { position: relative; right: ${per}% }`, `[role~='col'].push-${i} { position: relative; left: ${per}% }`]
  })
  layoutsheet.name = 'layout'
  layoutsheet.insertRule(`[role~='row'] { display: flex; flex-wrap: wrap; position: relative; box-sizing: border-box; }`)
  // noinspection CssUnresolvedCustomProperty
  layoutsheet.insertRule(/* language=CSS */ `
    [role~='row'] {
      &[style*='--gutter'] {
        margin-left: calc(var(--gutter, 0px) / -2);
        margin-right: calc(var(--gutter, 0px) / -2);
        & > [role~='col'] {
          display: block;
        }
      }
      & > [role~='col'] {
        box-sizing: border-box;
        padding-right: calc(var(--gutter, 0px) / 2);
        padding-left: calc(var(--gutter, 0px) / 2);
      }
    }
  `)
  let layoutsheets = [layoutsheet]
  for (const [size, media] of medias) {
    let sheet = new CSSStyleSheet({ media: `(${media})` })
    sheet.name = `layout-${size}`
    layout(function (i, per) {
      return [`[role='col'].${size}-${i} { display: ${i ? 'block' : 'none'}; max-width: ${per}%; flex: 0 0 ${per}% }`]
    }, sheet)
    layoutsheets.push(sheet)
  }
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, ...layoutsheets]
}

if (!customElements.get('wc-row')) {
  registerCSSLayout()
  customElements.define('wc-row', Row)
  customElements.define('wc-col', Col)
}
