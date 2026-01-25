// noinspection CssUnresolvedCustomProperty

const style = (function () {
  let sheet = new CSSStyleSheet()
  sheet.replaceSync(/* language=CSS */ `
    :host(:not([effect])),
    :host([effect='dark']) {
      --tooltip-color: var(--white);
      --tooltip-color-background: var(--info-900);
      --filter-shadow: drop-shadow(0 0 0.1rem #fff) drop-shadow(0 0.5rem 1.5rem #0003);
    }
    :host([effect='light']) {
      --tooltip-color: var(--black);
      --tooltip-color-background: var(--white);
      --filter-shadow: drop-shadow(0 0 0.1rem #98a1b219) drop-shadow(0 0.5rem 1.5rem #00000014);
    }
    :host([show-arrow]) [part='popover'] [part='arrow']::before{
      content: '';
    }
    :host([fallback-placements='']) [part='popover'] {
      position-try-fallbacks: flip-block flip-inline;
    }
    :host {
      --offset: 1.2rem;
      --arrow-offset: 5px;
      --arrow-width: 2.8rem;
      --arrow-height: 0.8rem;
      display: flex;
      width: fit-content;
      position: relative;
      [part='popover'] {
        inset: auto;
        overflow: visible;
        margin: 0;
        [part='arrow'] {
          position: absolute;
          width: var(--arrow-width);
          height: var(--arrow-height);
          &::before{
            position: absolute;
            display: block;
            width: var(--arrow-width);
            height: var(--arrow-height);
            left: calc(50% - var(--arrow-width) / 2);
            top: calc(50% - var(--arrow-height) / 2);
            background:  var(--tooltip-color-background);
            mask-size: var(--arrow-width) var(--arrow-height);
            mask-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBmaWxsPSJub25lIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIyMCIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgMjAgOCI+PGc+PGc+PHBhdGggZD0iTTMuNDAwMjUsMS4yMTE2OUMyLjY0NzEzLDAuNDM3MDQ0LDEuNjEyNjcsMCwwLjUzMjI3MSwwQzAuNTMyMjcxLDAsMCwwLDAsMEMwLDAsMjAsMCwyMCwwQzIwLDAsMTkuNDY3NywwLDE5LjQ2NzcsMEMxOC4zODczLDAsMTcuMzUyOSwwLjQzNzA0NCwxNi41OTk4LDEuMjExNjlDMTYuNTk5OCwxLjIxMTY5LDExLjQzNCw2LjUyNTA0LDExLjQzNCw2LjUyNTA0QzEwLjY0ODYsNy4zMzI4Myw5LjM1MTM2LDcuMzMyODMsOC41NjYwMSw2LjUyNTA0QzguNTY2MDEsNi41MjUwNCwzLjQwMDI1LDEuMjExNjksMy40MDAyNSwxLjIxMTY5QzMuNDAwMjUsMS4yMTE2OSwzLjQwMDI1LDEuMjExNjksMy40MDAyNSwxLjIxMTY5WiIgZmlsbD0iIzE3MUMyNiIgZmlsbC1vcGFjaXR5PSIxIi8+PC9nPjwvZz48L3N2Zz4=');
          }
        }
        @starting-style {
          opacity: 0;
        }
        &[placement^='top']{
          margin-bottom: var(--offset);
          [part='arrow'] {
            top: 100%;
          }
        }
        &[placement='top'] {
          position-area: top;
          [part='arrow']{
            left: calc(50% - calc(var(--arrow-width) / 2));
          }
        }
        &[placement='top-start'] {
          position-area: top span-right;
          [part='arrow'] {
            left: var(--arrow-offset);
          }
        }
        &[placement='top-end'] {
          position-area: top span-left;
          [part='arrow'] {
            right: var(--arrow-offset);
          }
        }
        &[placement^='left'] {
          margin-right: var(--offset);
          [part='arrow'] {
            left: 100%;
            height: var(--arrow-width);
            width: var(--arrow-height);
            &::before {
              transform: rotate(-90deg);
            }
          }
        }
        &[placement='left'] {
          position-area: left;
          [part='arrow']{
            top: 50%;
            transform: translateY(-50%);
          }
        }
        &[placement='left-start'] {
          position-area: left span-bottom;
          [part='arrow']{
            top: var(--arrow-offset);
          }
        }
        &[placement='left-end'] {
          position-area: left span-top;
          [part='arrow']{
            bottom: var(--arrow-offset);
          }
        }
        &[placement^='right'] {
          margin-left: var(--offset);
          [part='arrow'] {
            right: 100%;
            height: var(--arrow-width);
            width: var(--arrow-height);
            &::before {
              transform: rotate(90deg);
            }
          }
        }
        &[placement='right'] {
          position-area: right;
          [part='arrow']{
            top: 50%;
            transform: translateY(-50%);
          }
        }
        &[placement='right-start'] {
          position-area: right span-bottom;
          [part='arrow']{
            top: var(--arrow-offset);
          }
        }
        &[placement='right-end'] {
          position-area: right span-top;
          [part='arrow']{
            bottom: var(--arrow-offset);
          }
        }
        &[placement^='bottom'] {
          margin-top: var(--offset);
          [part='arrow'] {
            bottom: 100%;
            &::before {
              transform: rotate(180deg);
            }
          }
        }
        &[placement='bottom'] {
          position-area: bottom;
          [part='arrow'] {
            left: calc(50% - calc(var(--arrow-width) / 2));
          }
        }
        &[placement='bottom-start'] {
          position-area: bottom span-right;
          [part='arrow'] {
            left: var(--arrow-offset);
          }
        }
        &[placement='bottom-end'] {
          position-area: bottom span-left;
          [part='arrow'] {
            right: var(--arrow-offset);
          }
        }
      }
    }
  `)
  return sheet
})()

class Tooltip extends HTMLElement {
  /**
   * 存储事件类型与对应处理函数映射的 Map
   * 用于管理 tooltip 触发事件的监听器
   * @type {Map<string, Function>}
   */
  #eventListeners = new Map()
  #timer = null
  #attributes = {
    content: '', //显示的内容，也可被 slot#content 覆盖
    placement: 'bottom', //组件出现的位置
    fallbackPlacements: [], //Tooltip 可用的 positions
    showAfter: 0, //在触发后多久显示内容
    hideAfter: 200, //延迟关闭，单位毫秒
    enterable: true, //鼠标是否可进入到 tooltip 中
    trigger: 'hover' //如何触发 Tooltip 'hover' | 'click' | 'focus' | 'contextmenu'
  }
  static fallbackPlacements = ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']
  static get observedAttributes() {
    return ['content', 'placement', 'fallback-placements', 'show-after', 'hide-after', 'enterable', 'trigger']
  }
  set content(value) {
    this.#attributes.content = value
    if (this.shadowRoot && this.shadowRoot.getElementById('tooltip')) {
      let content = this.shadowRoot.getElementById('content')
      if (this.hasAttribute('raw-content')) {
        content.innerHTML = value
      } else {
        content.textContent = value
      }
    }
  }
  set trigger(action) {
    this.#attributes.trigger = ['hover', 'click', 'focus', 'contextmenu'].includes(action) ? action : 'hover'
    if (this.shadowRoot) {
      this.#eventListeners.forEach((listener, event) => {
        this.removeEventListener(event, listener)
      })
      switch (this.#attributes.trigger) {
        case 'hover': {
          this.#eventListeners.set('mouseover', this.showPopover)
          this.#eventListeners.set('mouseout', this.hidePopover)
          break
        }
        case 'click': {
          this.#eventListeners.set('click', this.showPopover)
          break
        }
        case 'focus': {
          this.#eventListeners.set('focusin', this.showPopover)
          this.#eventListeners.set('focusout', this.hidePopover)
          break
        }
        case 'contextmenu': {
          this.#eventListeners.set('contextmenu', this.showPopover)
        }
      }
      this.#eventListeners.forEach((listener, event) => {
        this.addEventListener(event, listener)
      })
    }
  }
  set placement(str) {
    this.#attributes.placement = Tooltip.fallbackPlacements.includes(str) ? str : 'bottom'
    if (this.shadowRoot && this.shadowRoot.getElementById('tooltip')) {
      this.shadowRoot.getElementById('tooltip').setAttribute('placement', this.#attributes.placement)
    }
  }
  set positionTryFallbacks(list) {
    this.#attributes.fallbackPlacements = [...new Set(list).intersection(new Set(Tooltip.fallbackPlacements))]
    if (this.shadowRoot) {
      if (!this.#attributes.fallbackPlacements.length) {
        this.shadowRoot.adoptedStyleSheets = [style]
        return
      }
      let positionTryFallbacks = new CSSStyleSheet()
      positionTryFallbacks.replaceSync(/* language=CSS */ `
        :host{
          [part='popover']{
            position-try-fallbacks: ${this.#attributes.fallbackPlacements.map((p) => '--fallback-' + p).join(',')};
          }
        }
      `)
      this.shadowRoot.adoptedStyleSheets = [style, positionTryFallbacks]
    }
  }
  constructor() {
    super()
  }
  connectedCallback() {
    this.render()
  }
  render() {
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.append(document.createElement('slot'))
    this.shadowRoot.adoptedStyleSheets = [style]
    this.attributeChangedCallback('trigger', null, this.#attributes.trigger)
    this.attributeChangedCallback('fallbackPlacements', null, this.#attributes.fallbackPlacements)
  }
  get popover() {
    let el = this.shadowRoot.getElementById('tooltip')
    if (el) return el
    let anchorName = '--' + crypto.randomUUID(),
      fragment = document.createDocumentFragment(),
      anchor = document.createElement('div')
    anchor.style.cssText = `anchor-name: ${anchorName}; position: absolute;inset: 0; pointer-events: none`
    el = document.createElement('div')
    el.id = 'tooltip'
    el.part.add('popover')
    el.popover = 'hint'
    el.style.positionAnchor = anchorName
    el.innerHTML = /* language=HTML */ `
      <span part="arrow"></span>
      <slot id="content" name="content"></slot>
    `
    el.append(document.createElement('slot'))
    fragment.append(anchor, el)
    this.shadowRoot.firstElementChild.after(fragment)
    this.attributeChangedCallback('content', null, this.#attributes.content)
    this.attributeChangedCallback('placement', null, this.#attributes.placement)
    return el
  }
  showPopover() {
    this.#timer && clearTimeout(this.#timer)
    setTimeout(() => {
      this.popover.showPopover()
    }, this.#attributes.showAfter)
  }
  hidePopover() {
    this.#timer = setTimeout(() => {
      this.popover.hidePopover()
    }, this.#attributes.hideAfter)
  }
  attributeChangedCallback(name, oldVal, newVal) {
    let attr = name.replace(/-([a-z])/g, function (match, char) {
      return char.toUpperCase()
    })
    switch (attr) {
      case 'content': {
        this.content = newVal
        break
      }
      case 'placement': {
        this.placement = newVal
        break
      }
      case 'fallbackPlacements': {
        this.positionTryFallbacks = Array.isArray(newVal) ? newVal : newVal.split('|')
        break
      }
      case 'showAfter':
      case 'hideAfter': {
        let i = parseInt(newVal)
        this.#attributes[attr] = isNaN(i) ? 0 : i
        break
      }
      case 'enterable': {
        this.#attributes['enterable'] = this.hasAttribute('enterable')
        break
      }
      case 'trigger': {
        this.trigger = newVal
        break
      }
    }
  }
  disconnectedCallback() {
    this.#eventListeners.forEach((listener, event) => {
      this.removeEventListener(event, listener)
    })
  }
}

if (!customElements.get('wc-tooltip')) {
  customElements.define('wc-tooltip', Tooltip)
}
