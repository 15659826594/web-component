class Menu extends HTMLElement {
  stylesheet = /* language=CSS */ `
    :host{
      cursor: pointer;
      display: block;
      text-align: left;
      border-radius: 0.4rem;
      font-size: 1.4rem;
      line-height: 2rem;
      color: #464F60;
      padding: 0.8rem 0.6rem;
      width: 20rem;
      box-sizing: border-box;
      &>div:first-child{
        &:hover{
          background-color: #EDEDFC;
        }
      }
    }
    :host([sub]){
      position: relative;
      padding: 0;
      width: calc(20rem - 1.2rem);
      &>div:first-child{
        display: block;
        text-align: left;
        padding: 0.4rem 3.4rem 0.4rem 1rem;
        border-radius: 0.4rem;
        font-size: 1.4rem;
        line-height: 2rem;
        color: #464F60;
      }
      #select-options{
        pointer-events: none;
        z-index: 199410;
        position: absolute;
        left: 100%;
        top: 0;
        transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
        height: 0;
        opacity: 0;
        &>div{
          margin-left: calc(0.6rem + 0.6rem); /*wc-menu的padding-right + 中间间隙*/
          margin-top: -0.8rem;/*padding-top一致*/
          box-sizing: border-box;
          min-width: 20rem;
          border-radius: var(--radius);
          background-color: #fff;
          padding: 0.8rem 0.6rem;
          box-shadow:
            0 0 0 0.1rem rgba(152, 161, 178, 0.1),
            0 1.5rem 3.5rem -0.5rem rgba(17, 24, 38, 0.15),
            0 0.5rem 1.5rem 0 rgba(0, 0, 0, 0.08);
        }
      }
      &::after{
        content: '';
        position: absolute;
        width: 1.6rem;
        height: 1.6rem;
        right: 1rem;
        top: 0.6rem;
        background-size: contain;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBmaWxsPSJub25lIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij48Zz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLC0xLDEsMCwtNiwxNy41KSI+PHBhdGggZD0iTTcuMDMwMzMsMTEuOTY5NjdDNi43Mzc0MzcsMTEuNjc2Nzc2OCw2LjI2MjU2MywxMS42NzY3NzY4LDUuOTY5NjcsMTEuOTY5NjdDNS42NzY3NzY4LDEyLjI2MjU2Myw1LjY3Njc3NjgsMTIuNzM3NDM3LDUuOTY5NjcsMTMuMDMwMzNDNS45Njk2NywxMy4wMzAzMyw3LjAzMDMzLDExLjk2OTY3LDcuMDMwMzMsMTEuOTY5NjdDNy4wMzAzMywxMS45Njk2Nyw3LjAzMDMzLDExLjk2OTY3LDcuMDMwMzMsMTEuOTY5NjdaTTkuNSwxNS41QzkuNSwxNS41LDguOTY5NjcsMTYuMDMwMzMsOC45Njk2NywxNi4wMzAzM0M5LjI2MjU2LDE2LjMyMzIyLDkuNzM3NDQsMTYuMzIzMjIsMTAuMDMwMzMsMTYuMDMwMzNDMTAuMDMwMzMsMTYuMDMwMzMsOS41LDE1LjUsOS41LDE1LjVDOS41LDE1LjUsOS41LDE1LjUsOS41LDE1LjVaTTEzLjAzMDMzLDEzLjAzMDMzQzEzLjMyMzIyLDEyLjczNzQzNywxMy4zMjMyMiwxMi4yNjI1NjMsMTMuMDMwMzMsMTEuOTY5NjdDMTIuNzM3NDQsMTEuNjc2Nzc2OCwxMi4yNjI1NiwxMS42NzY3NzY4LDExLjk2OTY3LDExLjk2OTY3QzExLjk2OTY3LDExLjk2OTY3LDEzLjAzMDMzLDEzLjAzMDMzLDEzLjAzMDMzLDEzLjAzMDMzQzEzLjAzMDMzLDEzLjAzMDMzLDEzLjAzMDMzLDEzLjAzMDMzLDEzLjAzMDMzLDEzLjAzMDMzWk01Ljk2OTY3LDEzLjAzMDMzQzUuOTY5NjcsMTMuMDMwMzMsOC45Njk2NywxNi4wMzAzMyw4Ljk2OTY3LDE2LjAzMDMzQzguOTY5NjcsMTYuMDMwMzMsMTAuMDMwMzMsMTQuOTY5NjcsMTAuMDMwMzMsMTQuOTY5NjdDMTAuMDMwMzMsMTQuOTY5NjcsNy4wMzAzMywxMS45Njk2Nyw3LjAzMDMzLDExLjk2OTY3QzcuMDMwMzMsMTEuOTY5NjcsNS45Njk2NywxMy4wMzAzMyw1Ljk2OTY3LDEzLjAzMDMzQzUuOTY5NjcsMTMuMDMwMzMsNS45Njk2NywxMy4wMzAzMyw1Ljk2OTY3LDEzLjAzMDMzWk0xMC4wMzAzMywxNi4wMzAzM0MxMC4wMzAzMywxNi4wMzAzMywxMy4wMzAzMywxMy4wMzAzMywxMy4wMzAzMywxMy4wMzAzM0MxMy4wMzAzMywxMy4wMzAzMywxMS45Njk2NywxMS45Njk2NywxMS45Njk2NywxMS45Njk2N0MxMS45Njk2NywxMS45Njk2Nyw4Ljk2OTY3LDE0Ljk2OTY3LDguOTY5NjcsMTQuOTY5NjdDOC45Njk2NywxNC45Njk2NywxMC4wMzAzMywxNi4wMzAzMywxMC4wMzAzMywxNi4wMzAzM0MxMC4wMzAzMywxNi4wMzAzMywxMC4wMzAzMywxNi4wMzAzMywxMC4wMzAzMywxNi4wMzAzM1oiIGZpbGw9IiM4NjhGQTAiIGZpbGwtb3BhY2l0eT0iMSIvPjwvZz48L2c+PC9zdmc+");
      }
      #safe-area-inset-bottom {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
      }
      #safe-area-inset-right {
        position: absolute;
        top: 0;
        bottom: 0;
        left: calc(100% + 0.6rem + 0.6rem);
      }
    }
    :host([sub][selected]) {
      #select-options{
        pointer-events: auto;
        opacity: 1;
        height: auto;
      }
      @supports (height: calc-size(auto, size)) {
        #select-options{
          height: calc-size(auto, size);
        }
      }
    }
    :host([placement-y='top']) {
      #select-options {
        top: auto;
        bottom: 0;
      }
    }

    :host([placement-x='left']) {
      #select-options {
        left: auto;
        right: calc(100% + 0.6rem + 0.6rem);
      }
    }
  `
  node = new Map()
  constructor() {
    super()
  }
  connectedCallback() {
    let shadow = this.render()
    this.node.options = shadow.querySelector('#select-options')
    this.node.safeAreaInsetRight = shadow.querySelector('#safe-area-inset-right')
    this.node.safeAreaInsetBottom = shadow.querySelector('#safe-area-inset-bottom')
    this.addEventListener('click', this.clickEvent)
    this.node.options && this.node.options.addEventListener('click', this.dialogHandler)

    if (this.hasAttribute('sub')) {
      this.mutationObserver()
      this.intersectionObserver()
    }
  }
  render() {
    let shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = this.hasAttribute('sub')
      ? /* language=HTML */ `
        <div>${this.getAttribute('label')}</div>
        <div id="select-options">
          <div>
            <slot></slot>
          </div>
        </div>
        <div id="safe-area-inset-bottom"></div>
        <div id="safe-area-inset-right"></div>
      `
      : /* language=HTML */ `
        <slot></slot>
      `
    const style = document.createElement('style')
    style.textContent = this.stylesheet
    shadow.appendChild(style)
    this.shadow = shadow
    return shadow
  }
  clickEvent(event) {
    this.toggle()
    // 将兄弟节点, 以及兄弟的子节点, 移除selected属性
    let target = event.target
    let sibling = target.parentNode.firstChild
    while (sibling) {
      if (sibling.nodeType === 1 && sibling.hasAttribute('sub') && sibling.hasAttribute('selected') && sibling !== target) {
        sibling.close()
      }
      sibling = sibling.nextSibling
    }
    if (this.hasAttribute('sub')) {
      event.stopPropagation()
    }
  }
  toggle() {
    this.hasAttribute('selected') ? this.close() : this.open()
  }
  open() {
    if (this.hasAttribute('sub')) {
      if (!this.node.options._clientRect) {
        let dialog = this.node.options.querySelector('div')
        this.node.options._clientRect = {
          offsetWidth: `calc(100% + 0.6rem + 0.6rem + 0.6rem * 2 + ${dialog.offsetWidth}px)`,
          offsetHeight: `calc(0.8rem * 2 + ${dialog.offsetHeight}px)`
        }
        this.node.safeAreaInsetBottom.style.top = this.node.options._clientRect.offsetHeight
        this.node.safeAreaInsetRight.style.left = this.node.options._clientRect.offsetWidth
      }
      this.intersectionObs.observe(this.node.safeAreaInsetBottom)
      this.intersectionObs.observe(this.node.safeAreaInsetRight)
    }
    this.setAttribute('selected', '')
    document.addEventListener('click', this.clickOutsideHandler)
  }
  close() {
    if (this.hasAttribute('sub')) {
      this.intersectionObs.unobserve(this.node.safeAreaInsetBottom)
      this.intersectionObs.unobserve(this.node.safeAreaInsetRight)
    }
    this.removeAttribute('selected')
    for (const siblingChild of this.querySelectorAll('[sub][selected]')) {
      siblingChild.close()
    }
    document.removeEventListener('click', this.clickOutsideHandler)
  }
  // 监听点击外部事件
  clickOutsideHandler = (event) => {
    if (!event.composedPath().includes(this)) {
      this.close()
    }
  }
  // 事件委托 , 点击弹出窗
  dialogHandler = (event) => {
    let target = event.target
    //LABEL会触发两次事件
    if (target.tagName === 'LABEL') return
    switch (target.tagName) {
      case 'WC-MENU-ITEM':
        break
      default:
        event.stopPropagation()
    }
  }
  // 监听底部安全距离
  intersectionObserver() {
    this.intersectionObs = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        switch (entry.target.id) {
          case 'safe-area-inset-bottom':
            entry.isIntersecting ? this.removeAttribute('placement-y') : this.setAttribute('placement-y', 'top')
            break
          case 'safe-area-inset-right':
            entry.isIntersecting ? this.removeAttribute('placement-x') : this.setAttribute('placement-x', 'left')
            break
        }
      }
      if (this.hasAttribute('placement-x') && this.hasAttribute('placement-y')) {
        this.removeAttribute('placement-y')
        this.removeAttribute('placement-x')
        this.close()
      }
    })
  }
  // 监听子节点的变动 , 子节点变动时 , 重新计算弹出框的宽高
  mutationObserver() {
    this.mutationObs = new MutationObserver(() => {
      delete this.node.options._clientRect
    })
    const config = { attributes: false, childList: true, subtree: false }

    this.mutationObs.observe(this, config)
  }
  disconnectedCallback() {
    this.mutationObs && this.mutationObs.disconnect()
    this.intersectionObs && this.intersectionObs.disconnect()
    this.removeEventListener('click', this.clickEvent)
    this.node.options && this.node.options.removeEventListener('click', this.dialogHandler)
    document.removeEventListener('click', this.clickOutsideHandler)
  }
}

class MenuItem extends HTMLElement {
  stylesheet = /* language=CSS */ `
    :host{
      cursor: pointer;
      display: flex;
      gap: 0 0.8rem;
      text-align: left;
      padding: 0.4rem 1rem;
      border-radius: 0.4rem;
      font-size: 1.4rem;
      line-height: 2rem;
      color: #464F60;
      align-items: center;
    }
    :host(:hover){
      background-color: #EDEDFC;
    }
    ::slotted(label){
      display: block;
      width: 100%;
      height: 100%
    }
  `
  node = new Map()
  constructor() {
    super()
  }
  connectedCallback() {
    this.render()
  }
  render() {
    let shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = /* language=HTML */ `
      <slot></slot>
    `
    const style = document.createElement('style')
    style.textContent = this.stylesheet
    shadow.appendChild(style)
    return shadow
  }
}

class Dropdown extends HTMLElement {
  #attributes = {
    trigger: 'hover'
  }
  /**
   * 保存slot节点
   * @type {Map<string, HTMLSlotElement>}
   */
  #slots = new Map()
  stylesheet = /* language=CSS */ `
    :host{
      user-select: none;
      position: relative;
      display: inline-block;
      font-weight: normal;
      #select-options{
        pointer-events: none;
        opacity: 0;
        cursor: default;
        z-index: 199410;
        position: absolute;
        top: 100%;
        left: 0;
        transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
        .outer{
          padding: 1px;
          margin: -1px;
          .inner{
            margin-top: 0.6rem;
            border-radius: 0.6rem;
            background-color: #fff;
            box-shadow:
              0 0 0 0.1rem rgba(152, 161, 178, 0.1),
              0 1.5rem 3.5rem -0.5rem rgba(17, 24, 38, 0.15),
              0 0.5rem 1.5rem 0 rgba(0, 0, 0, 0.08);
          }
        }
      }
    }
    :host([active]){
      #select-options{
        pointer-events: auto;
        opacity: 1;
      }
    }
  `
  #node = new Map()
  static get observedAttributes() {
    return ['trigger']
  }
  props(observedAttributes) {
    for (const attr of observedAttributes) {
      let attribute = this.attributes[attr]
      switch (attr) {
        case 'trigger':
          this.#attributes.trigger = attribute && ['hover', 'click', 'contextmenu'].includes(attribute.value) ? attribute.value : 'hover'
          if (this.shadowRoot) {
            this.addTriggerListener(this.#attributes.trigger)
          }
          break
      }
    }
  }
  constructor() {
    super()
  }
  connectedCallback() {
    this.tabIndex = 0
    this.props(Dropdown.observedAttributes)
    this.render()
    this.#node.dialog = this.shadowRoot.querySelector('#select-options')
    this.addTriggerListener(this.#attributes.trigger)
  }
  render() {
    let shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = /* language=HTML */ `
      <slot></slot>
      <div id="select-options">
        <div class="outer">
          <div class="inner">
            <slot name="overlay"></slot>
          </div>
        </div>
      </div>
    `
    const sheet = new CSSStyleSheet()
    sheet.replaceSync(this.stylesheet)
    this.shadowRoot.adoptedStyleSheets = [sheet]
    for (const slot of shadow.querySelectorAll('slot')) {
      this.#slots.set(slot.name ? slot.name : 'default', slot)
    }
  }
  addTriggerListener(trigger) {
    switch (trigger) {
      case 'click':
        this.addEventListener('click', this.clickEvent)
        break
      case 'hover':
        this.addEventListener('mouseenter', this.open)
        this.addEventListener('mouseleave', this.close)
        break
      case 'contextmenu':
        this.addEventListener('contextmenu', this.clickEvent)
        this.#node.dialog._contextmenuEvent = (e) => {
          e.preventDefault()
          e.stopPropagation()
        }
        this.#node.dialog.addEventListener('contextmenu', this.#node.dialog._contextmenuEvent)
        this.addEventListener('click', this.close)
        break
    }
  }
  removeTriggerListener(trigger) {
    switch (trigger) {
      case 'click':
        this.removeEventListener('click', this.clickEvent)
        break
      case 'hover':
        this.removeEventListener('mouseenter', this.open)
        this.removeEventListener('mouseleave', this.close)
        break
      case 'contextmenu':
        this.removeEventListener('contextmenu', this.clickEvent)
        this.#node.dialog.removeEventListener('contextmenu', this.#node.dialog._contextmenuEvent)
        delete this.#node.dialog._contextmenuEvent
        this.removeEventListener('click', this.close)
        break
    }
    document.removeEventListener('click', this.clickOutsideHandler)
  }
  clickEvent(event) {
    if (this.#attributes.trigger === 'contextmenu' && event.type === 'contextmenu') {
      event.preventDefault()
    }
    this.toggle()
  }
  toggle() {
    this.hasAttribute('active') ? this.close() : this.open()
  }
  open() {
    this.setAttribute('active', '')
    if (this.#attributes.trigger !== 'hover') document.addEventListener('click', this.clickOutsideHandler)
  }
  close() {
    this.removeAttribute('active')
    this.blur()
    if (this.#attributes.trigger !== 'hover') document.removeEventListener('click', this.clickOutsideHandler)
  }
  // 监听点击外部事件
  clickOutsideHandler = (event) => {
    if (!event.composedPath().includes(this)) {
      this.close()
    }
  }
  attributeChangedCallback(name, oldValue) {
    if (!this.shadowRoot) return
    if (name === 'trigger') {
      this.removeTriggerListener(oldValue)
    }
    this.props([name])
  }
  disconnectedCallback() {
    this.removeTriggerListener(this.#attributes.trigger)
  }
}

if (!customElements.get('wc-dropdown')) {
  customElements.define('wc-dropdown', Dropdown)
  customElements.define('wc-menu', Menu)
  customElements.define('wc-menu-item', MenuItem)
}
