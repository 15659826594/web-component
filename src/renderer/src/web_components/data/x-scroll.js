const style = (function () {
  let sheet = new CSSStyleSheet()
  sheet.replaceSync(/* language=CSS */ `
  :host{
    height: 100%;
    display: block;
    white-space: nowrap;
    #v-scroll{
      position: relative;
      transform-origin: left top;
      overflow: hidden scroll;
      overscroll-behavior: contain;
      &::-webkit-scrollbar{
        display: none;
      }
      #content{
        position: absolute;
        transform-origin: left top;
        transform: rotate(90deg);
      }
    }
  }`)
  return sheet
})()

class XScroll extends HTMLElement {
  #node = new Map()
  constructor() {
    super()
  }
  connectedCallback() {
    this.render()
  }
  render() {
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = /* language=HTML */ `
      <div id="v-scroll">
        <div id="content">
          <slot></slot>
        </div>
      </div>
    `
    this.#node.set('v-scroll', this.shadowRoot.querySelector('#v-scroll'))
    this.#node.set('content', this.shadowRoot.querySelector('#content'))
    this.shadowRoot.adoptedStyleSheets = [style]
    this.resizeListener = new ResizeObserver((entries) => {
      for (const entry of entries) {
        switch (entry.target) {
          case this:
            {
              let rect = entry.contentRect,
                vscroll = this.#node.get('v-scroll'),
                content = this.#node.get('content')
              vscroll.style.width = rect.height + 'px'
              vscroll.style.height = rect.width + 'px'
              vscroll.style.transform = `translateY(${rect.height}px) rotate(-90deg)`
              content.style.width = rect.width + 'px'
              content.style.height = rect.height + 'px'
              content.style.left = rect.height + 'px'
            }
            break
        }
      }
    })
    this.resizeListener.observe(this)
  }
  disconnectedCallback() {
    this.resizeListener.disconnect()
  }
}

if (!customElements.get('wc-xscroll')) {
  customElements.define('wc-xscroll', XScroll)
}
