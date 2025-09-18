const style = (function () {
  let sheet = new CSSStyleSheet()
  sheet.replaceSync(/* language=CSS */ `:host {
    position: relative;
    gap: 0.5em;
    display: inline-flex;
    box-sizing: border-box;
    user-select: none;
    :first-child:empty::before{
      color: rgba(0, 0, 0, 0.5);
      content: attr(placeholder);
    }
    :focus-visible{
      outline: -webkit-focus-ring-color auto 1px;
    }
    [part='select'] {
      margin: 0;
      inset: auto;
      box-sizing: border-box;
      /*width: anchor-size(width);*/
      min-inline-size: anchor-size(self-inline);
      min-block-size: -internal-auto-base(0, 1lh);
      max-block-size: stretch;
      position-try-order: most-block-size;
      position-area: block-end span-inline-end;
      position-try-fallbacks: block-start span-inline-end, block-end span-inline-start, block-start span-inline-start;
    }
  }`)
  return sheet
})()

class Select extends HTMLElement {
  static formAssociated = true
  /**
   * @type { ElementInternals }
   */
  #internals = null
  /**
   * @type { HTMLOptionElement|null }
   */
  #option = null
  /**
   * @type { HTMLOptionElement|null }
   */
  #modelValue = null
  static get observedAttributes() {
    return ['disabled', 'placeholder', 'required']
  }
  set label(str) {
    this.shadowRoot.firstElementChild.innerHTML = str
  }
  set open(flag) {
    flag ? this.#internals.states.add('open') : this.#internals.states.delete('open')
  }
  get disabled() {
    return this.#internals?.states.has('disabled')
  }
  set disabled(flag) {
    flag ? this.#internals?.states.add('disabled') : this.#internals?.states.delete('disabled')
  }
  get value() {
    return this.#option?.value
  }
  /**
   * 设置value属性，接受string或DOM节点
   * @param {HTMLOptionElement|string} opt - 要设置的值
   */
  set value(opt) {
    // string to HTMLOptionElement
    if (typeof opt === 'string') {
      opt = Array.from(this.querySelectorAll('option')).find((t) => t.value === opt) || null
    }
    if (!this.shadowRoot) {
      this.#modelValue = opt
      return
    }
    if (opt instanceof HTMLOptionElement || opt === null) {
      if (this.#option === opt) return
      if (this.#option) {
        this.#option.selected = false
        this.#option.removeAttribute('selected')
      }
      this.#option = opt
      if (opt) {
        opt.selected = true
        opt.setAttribute('selected', '')
        this.label = opt.label
        this.#internals.setFormValue(opt.value)
      } else {
        this.label = ''
        this.#internals.setFormValue(undefined)
      }
      this.attributeChangedCallback('required')
      this.dispatchEvent(new Event('input'))
    }
  }
  constructor() {
    super()
  }
  connectedCallback() {
    // An invalid form control with name='xx' is not focusable
    this.tabIndex = 0
    this.attachShadow({ mode: 'open' })
    this.#internals = this.attachInternals()
    this.render()
  }
  render() {
    this.shadowRoot.innerHTML = /* language=HTML */ `
      <div aria-hidden="true"></div>
      <slot id="select-button" name="select-button"></slot>
      <div part="picker-icon" style="margin-inline-start: auto"></div>
    `
    this.addEventListener('click', this._onClick)
    this.shadowRoot.adoptedStyleSheets = [style]
    // value值相等的option => 选中的option => 如果没有占位符,第一个option => 占位符
    let opt = this.#modelValue || this.querySelector('option:checked') || (!this.hasAttribute('placeholder') && this.querySelector('option'))
    if (opt) this.value = opt
    Select.observedAttributes.forEach((attr) => this.attributeChangedCallback(attr))
  }
  get pickerSelect() {
    let el = this.shadowRoot.getElementById('picker-select')
    if (el) return el
    let anchorName = `--select-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      fragment = document.createDocumentFragment(),
      anchor = document.createElement('div')
    anchor.style.cssText = `anchor-name: ${anchorName}; position: absolute;inset: 0; pointer-events: none`
    el = document.createElement('div')
    el.id = 'picker-select'
    el.part.add('select')
    el.popover = 'auto'
    el.style.positionAnchor = anchorName
    el.append(document.createElement('slot'))
    el.ontoggle = (event) => (this.open = event.newState === 'open')
    // 事件委托, 监听 option 点击
    el.onclick = (event) => {
      let opt = event.composedPath().find((t) => t.tagName === 'OPTION' || t === el)
      if (opt instanceof HTMLOptionElement) {
        this.value = opt
        setTimeout(() => el.hidePopover(), 0)
      }
    }
    fragment.append(anchor, el)
    this.shadowRoot.getElementById('select-button').after(fragment)
    return el
  }
  _onClick() {
    if (this.disabled) return
    this.pickerSelect.showPopover()
  }
  attributeChangedCallback(name) {
    if (this.shadowRoot) {
      switch (name) {
        case 'disabled':
          this.disabled = this.hasAttribute('disabled')
          break
        case 'placeholder':
          if (this.hasAttribute('placeholder')) {
            this.shadowRoot.firstElementChild.setAttribute('placeholder', this.getAttribute('placeholder'))
          } else {
            this.shadowRoot.firstElementChild.removeAttribute('placeholder')
          }
          break
        case 'required':
          if (this.hasAttribute('required')) {
            this.#internals.setValidity({ valueMissing: !this.#option?.value }, '请在列表中选择一项。')
          } else {
            this.#internals.setValidity({})
          }
          break
      }
    }
  }
  disconnectedCallback() {
    this.removeEventListener('click', this._onClick)
  }
}

if (!customElements.get('wc-select')) {
  customElements.define('wc-select', Select)
}
