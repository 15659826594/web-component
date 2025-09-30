let fallbackPlacements = new Map([['top'], ['top-start', 'top span-right'], ['top-end', 'top span-left'], ['bottom'], ['bottom-start', 'bottom span-right'], ['bottom-end', 'bottom span-left'], ['left'], ['left-start', 'left span-bottom'], ['left-end', 'left span-top'], ['right'], ['right-start', 'right span-bottom'], ['right-end', 'right span-top'], ['top-left', 'span-block-end span-inline-end'], ['left-top', 'span-block-end span-inline-end'], ['top-right', 'span-block-end span-inline-start'], ['right-top', 'span-block-end span-inline-start'], ['bottom-left', 'span-block-start span-inline-end'], ['left-bottom', 'span-block-start span-inline-end'], ['bottom-right', 'span-block-start span-inline-start'], ['right-bottom', 'span-block-start span-inline-start']])
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
    :host{
      [part='default']{
        width: 2.4rem;
        height: 2.4rem;
        cursor: pointer;
        text-align: center;
        line-height: 2.4rem;
        border-radius: var(--radius-300);
        color: var(--info-400);
        &::before{
          font-family: 'data-table', serif !important;
          content: '\\e733';
        }
        &:hover{
          color: var(--info-700);
          background-color: var(--primary-0);
        }
      }
      [part='popover']{
        border: none;
        padding: 0.8rem 0.6rem;
        border-radius: var(--radius-400);
        box-shadow: var(--shadow-m);
        transition: opacity 300ms;
        position-try-order: most-block-size;
        option{
          cursor: pointer;
          user-select: none;
          font-size: 1.4rem;
          line-height: 2rem;
          min-width: 7rem;
          padding: 0.4rem 1rem;
          border-radius: var(--radius-300);
          color: var(--info-700);
          text-align: left;
          &:hover{
            background-color: var(--primary-0);
          }
        }
        @starting-style {
          opacity: 0;
        }
      }
    }
    :host([fallback-placements='']) [part='popover']{
      position-try-fallbacks: flip-block, flip-inline;
    }
    ${placement(fallbackPlacements)}
  `)
  return sheet
})()

class Popup extends HTMLElement {
  static get observedAttributes() {
    return ['fallback-placements']
  }
  constructor() {
    super()
  }
  connectedCallback() {
    this.render()
    this.#attributeChangedCallbackCache.forEach((args) => this.attributeChangedCallback(...args))
    this.#attributeChangedCallbackCache = []
    this.addEventListener('click', this.showPopover)
  }
  render() {
    this.attachShadow({ mode: 'open' })
    let anchor = `--popup-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`
    this.shadowRoot.innerHTML = /* language=HTML */ `
      <div part="anchor" style="anchor-name: ${anchor}">
        <slot>
          <div part="default"></div>
        </slot>
      </div>
      <div part="popover" id="popover" pseudo="picker(select)" popover="hint" style="position-anchor: ${anchor};margin: 0;">
        <slot name="reference">
          <option value="Edit" style="color: #464F60">Edit</option>
          <option value="Send mail" style="color: #464F60">Send mail</option>
          <option value="Details" style="color: #464F60">Details</option>
          <option value="Archive" style="color: #AA5B00">Archive</option>
          <option value="Delete" style="color: #D1293D">Delete</option>
        </slot>
      </div>
    `
    let popover = this.shadowRoot.getElementById('popover')
    popover.onclick = (event) => {
      let opt = event.composedPath().find((t) => t.tagName === 'OPTION' || t === popover)
      if (opt instanceof HTMLOptionElement) {
        opt.dispatchEvent(
          new Event('change', {
            bubbles: true,
            cancelable: true
          })
        )
        setTimeout(() => popover.hidePopover(), 0)
      }
    }
    this.shadowRoot.adoptedStyleSheets = [style]
  }
  showPopover() {
    this.shadowRoot.getElementById('popover').showPopover()
  }
  #attributeChangedCallbackCache = []
  attributeChangedCallback(name, oldVal, newVal) {
    if (!this.shadowRoot) {
      this.#attributeChangedCallbackCache.push(arguments)
      return
    }
    switch (name) {
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
    }
  }
  disconnectedCallback() {
    this.removeEventListener('click', this.showPopover)
  }
}

if (!customElements.get('wc-popup')) {
  customElements.define('wc-popup', Popup)
}
