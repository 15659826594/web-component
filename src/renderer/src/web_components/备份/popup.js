class Popup extends HTMLElement {
  #placement = ''
  #popoverSize = { width: 0, height: 0 }
  #fallbackPlacements = []
  static allowPlacements = ['bottom', 'bottom-left', 'bottom-right', 'top', 'top-left', 'top-right', 'right', 'right-top', 'right-bottom', 'left', 'left-top', 'left-bottom', 'top-left-corner', 'left-top-corner', 'top-right-corner', 'right-top-corner', 'bottom-left-corner', 'left-bottom-corner', 'bottom-right-corner', 'right-bottom-corner']
  /**
   * 保存slot节点
   * @type {Map<string, HTMLSlotElement>}
   */
  #slots = new Map()
  /**
   * 保存节点
   * @type {Map<string, HTMLElement>}
   */
  #node = new Map()
  stylesheet = /* language=CSS */ `
    :host{
      user-select: none;
      position: relative;
      display: inline-block;
      vertical-align: bottom;
      font-weight: normal;
      slot:not([name]){
        span{
          cursor: pointer;
          display: block;
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 0.4rem;
          &::before{
            content: '';
            position: absolute;
            display: block;
            inset: 0.4rem;
            width: 1.6rem;
            height: 1.6rem;
            background-color: #868FA0;
            mask-size: 1.6rem 1.6rem;
            mask-repeat: no-repeat;
            mask-position: center center;
            mask-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBmaWxsPSJub25lIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij48ZGVmcz48Y2xpcFBhdGggaWQ9Im1hc3Rlcl9zdmcwXzBfMzg2Ij48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHJ4PSIwIi8+PC9jbGlwUGF0aD48L2RlZnM+PGcgY2xpcC1wYXRoPSJ1cmwoI21hc3Rlcl9zdmcwXzBfMzg2KSI+PGc+PHBhdGggZD0iTTkuNSwxNEM5LjUsMTQuODI4NCw4LjgyODQzLDE1LjUsOCwxNS41QzcuMTcxNTczLDE1LjUsNi41LDE0LjgyODQsNi41LDE0QzYuNSwxMy4xNzE2LDcuMTcxNTczLDEyLjUsOCwxMi41QzguODI4NDMsMTIuNSw5LjUsMTMuMTcxNiw5LjUsMTRDOS41LDE0LDkuNSwxNCw5LjUsMTRaTTkuNSwyQzkuNSwyLjgyODQzLDguODI4NDMsMy41LDgsMy41QzcuMTcxNTczLDMuNSw2LjUsMi44Mjg0Myw2LjUsMkM2LjUsMS4xNzE1NzMsNy4xNzE1NzMsMC41LDgsMC41QzguODI4NDMsMC41LDkuNSwxLjE3MTU3Myw5LjUsMkM5LjUsMiw5LjUsMiw5LjUsMlpNOS41LDhDOS41LDguODI4NDMsOC44Mjg0Myw5LjUsOCw5LjVDNy4xNzE1NzMsOS41LDYuNSw4LjgyODQzLDYuNSw4QzYuNSw3LjE3MTU3LDcuMTcxNTczLDYuNSw4LDYuNUM4LjgyODQzLDYuNSw5LjUsNy4xNzE1Nyw5LjUsOEM5LjUsOCw5LjUsOCw5LjUsOFoiIGZpbGw9IiM4NjhGQTAiIGZpbGwtb3BhY2l0eT0iMSIvPjwvZz48L2c+PC9zdmc+");
          }
          &:hover{
            background-color: #EDEDFC;
            &::before{
              background-color: #464F60;
            }
          }
        }
      }
      #select-options{
        position: absolute;
        z-index: 199410;
        overflow: hidden;
        height: 0;
        opacity: 0;
        #inner{
          padding: 0.8rem 0.6rem;
          transition-property: opacity,height;
          transition-duration: 300ms;
          border-radius: 0.6rem;
          background-color: #fff;
          box-shadow:
            0 0 0 0.1rem rgba(152, 161, 178, 0.1),
            0 1.5rem 3.5rem -0.5rem rgba(17, 24, 38, 0.15),
            0 0.5rem 1.5rem 0 rgba(0, 0, 0, 0.08);
        }
        slot[name='overlay']{
          div{
            cursor: pointer;
            padding: 0.4rem 1rem;
            font-size: 1.4rem;
            line-height: 2rem;
            border-radius: 0.4rem;
            white-space: nowrap;
            min-width: 7rem;
            color: #464F60;
            &:hover{
              background-color: #dfdefc;
            }
          }
        }
      }
      #select-options{
        &[placement^='top']{
          bottom: 100%;
          &[placement$='top']{
            left: 50%;
            transform: translateX(-50%);
          }
          &[placement$='left']{
            left: 0;
          }
          &[placement$='right']{
            right: 0;
          }
        }
        &[placement^='right']{
          left: 100%;
          &[placement$='top']{
            top: 0;
          }
          &[placement$='right']{
            top: 50%;
            transform: translateY(-50%);
          }
          &[placement$='bottom']{
            bottom: 0;
          }
        }
        &[placement^='bottom']{
          top: 100%;
          &[placement$='bottom']{
            left: 50%;
            transform: translateX(-50%);
          }
          &[placement$='left']{
            left: 0;
          }
          &[placement$='right']{
            right: 0;
          }
        }
        &[placement^='left']{
          right: 100%;
          &[placement$='top']{
            top: 0;
          }
          &[placement$='left']{
            top: 50%;
            transform: translateY(-50%);
          }
          &[placement$='bottom']{
            bottom: 0;
          }
        }
      }
    }
    :host([corner]){
      #select-options{
        &[placement^='top']{
          bottom: auto;
          top: 0;
          &[placement$='left']{
            left: 0;
          }
          &[placement$='right']{
            right: 0;
          }
        }
        &[placement^='right']{
          left: auto;
          right: 0;
          &[placement$='top']{
            top: 0;
          }
          &[placement$='bottom']{
            bottom: 0;
          }
        }
        &[placement^='bottom']{
          top: auto;
          bottom: 0;
          &[placement$='left']{
            left: 0;
          }
          &[placement$='right']{
            right: 0;
          }
        }
        &[placement^='left']{
          right: auto;
          left: 0;
          &[placement$='top']{
            top: 0;
          }
          &[placement$='bottom']{
            bottom: 0;
          }
        }
      }
    }
    :host([open]){
      #select-options{
        height: auto;
        overflow: visible;
        opacity: 1;
      }
    }
  `
  static get observedAttributes() {
    return ['placement', 'fallback-placements']
  }
  constructor() {
    super()
  }
  props(observedAttributes) {
    for (const attr of observedAttributes) {
      let attribute = this.attributes[attr]
      switch (attr) {
        case 'placement': {
          this.#placement = attribute && Popup.allowPlacements.includes(attribute.value) ? attribute.value : 'bottom'
          if (this.shadowRoot) {
            this.getElement('select-options').setAttribute('placement', this.#placement)
          }
          break
        }
        case 'fallback-placements': {
          this.#fallbackPlacements =
            attribute && attribute.value
              ? attribute.value.split(',').reduce((acc, item) => {
                  if (Popup.allowPlacements.includes(item)) {
                    acc.push(item)
                  }
                  return acc
                }, [])
              : []
          break
        }
      }
    }
  }
  getElement(name) {
    if (!this.#node.has(name)) {
      let ele = this.shadowRoot.getElementById(name)
      if (ele) this.#node.set(name, ele)
    }
    return this.#node.get(name)
  }
  connectedCallback() {
    this.tabIndex = 0
    this.props(Popup.observedAttributes)
    this.render()
    this.intersectionObserver()
    this.resizeObserver().observe(this.getElement('inner'))
    this.addEventListener('click', this.clickEvent)
  }
  render() {
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = /* language=HTML */ `
      <slot>
        <span part="slot"></span>
      </slot>
      <div id="select-options">
        <div id="inner">
          <slot name="overlay">
            <div value="Edit" style="color: #464F60">Edit</div>
            <div value="Send mail" style="color: #464F60">Send mail</div>
            <div value="Details" style="color: #464F60">Details</div>
            <div value="Archive" style="color: #AA5B00">Archive</div>
            <div value="Delete" style="color: #D1293D">Delete</div>
          </slot>
        </div>
      </div>
    `
    const sheet = new CSSStyleSheet()
    sheet.replaceSync(this.stylesheet)
    this.shadowRoot.adoptedStyleSheets = [sheet]
    for (const slot of this.shadowRoot.querySelectorAll('slot')) {
      this.#slots.set(slot.name ? slot.name : 'default', slot)
    }
  }
  clickEvent() {
    this.toggle()
  }
  toggle() {
    this.hasAttribute('open') ? this.close() : this.open()
  }
  open() {
    let placement = this.space(this.#placement, this.hasAttribute('corner'))
    this.getElement('select-options').setAttribute('placement', placement)
    this.intersectionListener.observe(this.getElement('select-options'))
    this.setAttribute('open', '')
    document.addEventListener('click', this.clickOutsideHandler)
  }
  close() {
    this.intersectionListener.unobserve(this.getElement('select-options'))
    this.removeAttribute('open')
    this.blur()
    document.removeEventListener('click', this.clickOutsideHandler)
  }
  space(placement = 'bottom', corner = false) {
    let { height: selectHeight, width: selectWidth } = this.#popoverSize,
      { top, right, bottom, left } = this.getBoundingClientRect(),
      [main, cross] = placement.split('-')

    if (!corner) {
      switch (main) {
        case 'top': {
          if (top < selectHeight) {
            main = 'bottom'
          }
          break
        }
        case 'bottom': {
          let { scrollHeight: bodyHeight } = document.body
          if (bodyHeight - (bottom + window.scrollY) < selectHeight) {
            main = 'top'
          }
          break
        }
        case 'right': {
          let { scrollWidth: bodyWidth } = document.body
          if (bodyWidth - (right + window.scrollX) < selectWidth) {
            main = 'left'
          }
          break
        }
        case 'left': {
          if (left < selectWidth) {
            main = 'right'
          }
          break
        }
      }
    } else {
      switch (main) {
        case 'top': {
          let { scrollHeight: bodyHeight } = document.body
          if (bodyHeight - (top + window.scrollY) < selectHeight) {
            main = 'bottom'
          }
          break
        }
        case 'bottom': {
          if (bottom < selectHeight) {
            main = 'top'
          }
          break
        }
        case 'right': {
          if (right < selectWidth) {
            main = 'left'
          }
          break
        }
        case 'left': {
          let { scrollWidth: bodyWidth } = document.body
          if (bodyWidth - (left + window.scrollX) < selectWidth) {
            main = 'right'
          }
          break
        }
      }
    }
    return main + (cross ? '-' + cross : '')
  }
  // 监听点击外部事件
  clickOutsideHandler = (event) => {
    if (!event.composedPath().includes(this)) {
      this.close()
    }
  }
  intersectionObserver() {
    this.intersectionListener = new IntersectionObserver(
      () => {
        let corner = this.hasAttribute('corner')
        for (let placement of this.#fallbackPlacements) {
          if (placement === this.space(placement, corner)) {
            this.getElement('select-options').setAttribute('placement', placement)
            break
          }
        }
      },
      {
        threshold: 1
      }
    )
    return this.intersectionListener
  }
  resizeObserver() {
    this.resizeListener = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        let { inlineSize: width, blockSize: height } = entry.borderBoxSize[0]
        this.#popoverSize.height = height
        this.#popoverSize.width = width
      })
    })
    return this.resizeListener
  }
  attributeChangedCallback(name) {
    if (!this.shadowRoot) return
    this.props([name])
  }
  disconnectedCallback() {
    this.removeEventListener('click', this.clickEvent)
    this.intersectionListener && this.intersectionListener.disconnect()
    this.resizeListener && this.resizeListener.disconnect()
  }
}

if (!customElements.get('wc-popup')) {
  let sheet =
    document.adoptedStyleSheets.find((sheet) => sheet.name === 'style') ||
    (function (name) {
      let sheet = new CSSStyleSheet()
      sheet.name = name
      document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet]
      return sheet
    })('style')
  sheet.insertRule(/* language=CSS */ `wc-popup [slot='overlay'] div {
      cursor: pointer;
      padding: 0.4rem 1rem;
      font-size: 1.4rem;
      line-height: 2rem;
      border-radius: 0.4rem;
      white-space: nowrap;
      min-width: 7rem;
      color: #464f60;
      &:hover {
        background-color: #dfdefc;
      }
    }`)
  customElements.define('wc-popup', Popup)
}
