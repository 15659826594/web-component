class Popover extends HTMLDialogElement {
  #node = new Map() //记录节点信息
  static get observedAttributes() {
    return ['title', 'duration', 'placement']
  }
  constructor() {
    super()
  }
  props(observedAttributes) {
    for (const attr of observedAttributes) {
      let attribute = this.attributes[attr]
      switch (attr) {
        case 'title':
          if (this.firstElementChild && this.firstElementChild.nodeType === 1 && this.firstElementChild.nodeName === 'HEADER') {
            this.#node.set('title', this.firstElementChild)
          } else {
            this.#node.set('title', document.createElement('header'))
          }
          if (attribute) {
            this.#node.get('title').innerHTML = attribute.value
            if (this.firstElementChild !== this.#node.get('title')) {
              this.prepend(this.#node.get('title'))
            }
          } else {
            this.removeChild(this.#node.get('title'))
          }
          break
        case 'duration':
          {
            let duration = attribute ? parseInt(attribute.value) : 300
            duration = isNaN(duration) ? 300 : duration
            this.style.transitionDuration = duration + 'ms'
          }
          break
        case 'placement':
          if (!attribute) {
            this.setAttribute('placement', 'bottom')
          } else if (this.#node.has('target')) {
            let target = this.#node.get('target').getBoundingClientRect()
            this.style.setProperty('--target-width', target.width + 'px')
            let rect = this.getBoundingClientRect()
            switch (attribute.value) {
              case 'bottom':
                this.style.transform = `translate(${target.left - (rect.width - target.width) / 2}px, ${target.top + target.height}px)`
                break
              case 'bottom-left':
                this.style.transform = `translate(calc(${target.left}px - 2rem), ${target.top + target.height}px)`
                break
              case 'bottom-right':
                this.style.transform = `translate(calc(${target.left - rect.width + target.width}px + 2rem), ${target.top + target.height}px)`
                break
              case 'top':
                this.style.transform = `translate(${target.left - (rect.width - target.width) / 2}px, calc(${target.top - rect.height}px - var(--show-arrow-height))`
                break
              case 'top-left':
                this.style.transform = `translate(calc(${target.left}px - 2rem), calc(${target.top - rect.height}px - var(--show-arrow-height))`
                break
              case 'top-right':
                this.style.transform = `translate(calc(${target.left - rect.width + target.width}px + 2rem), calc(${target.top - rect.height}px - var(--show-arrow-height))`
                break
              case 'left':
                this.style.transform = `translate(calc(${target.left - rect.width}px - var(--show-arrow-height)), ${target.top - (rect.height - target.height) / 2}px)`
                break
              case 'left-top':
                this.style.transform = `translate(calc(${target.left - rect.width}px - var(--show-arrow-height)), calc(${target.top}px - 1.6rem))`
                break
              case 'left-bottom':
                this.style.transform = `translate(calc(${target.left - rect.width}px - var(--show-arrow-height)), calc(${target.top - rect.height + target.height}px + 1.6rem))`
                break
              case 'right':
                this.style.transform = `translate(calc(${target.left + target.width}px + var(--show-arrow-height)), ${target.top - (rect.height - target.height) / 2}px)`
                break
              case 'right-top':
                this.style.transform = `translate(calc(${target.left + target.width}px + var(--show-arrow-height)), calc(${target.top}px - 1.6rem))`
                break
              case 'right-bottom':
                this.style.transform = `translate(calc(${target.left + target.width}px + var(--show-arrow-height)), calc(${target.top - rect.height + target.height}px + 1.6rem))`
                break
            }
          }
          break
      }
    }
  }
  showModal(target) {
    this.#node.set('target', target)
    super.showModal()
    this.props(Popover.observedAttributes)
  }
  close() {
    if (!this.open || this._isClosing) return
    this._isClosing = true
    this.setAttribute('closing', '')

    // 触发重排
    this.offsetHeight

    const handleTransitionEnd = (e) => {
      if (e.propertyName !== 'opacity') return
      this.removeEventListener('transitionend', handleTransitionEnd)
      this.removeAttribute('closing')
      this._isClosing = false
      super.close()
    }

    this.addEventListener('transitionend', handleTransitionEnd)
  }
  attributeChangedCallback(name) {
    this.props([name])
  }
}

if (!customElements.get('wc-popover')) {
  // let sheet = new CSSStyleSheet()
  // sheet.replaceSync(/* language=CSS */ `
  //   dialog[is='wc-popover'] {
  //     position: absolute;
  //     overflow: visible;
  //     margin: 0;
  //     padding: 1.6rem 2rem;
  //     border-radius: 1.2rem;
  //     border: none;
  //     box-shadow: 0 0 0 0.1rem rgba(152, 161, 178, 0.1), 0 1.5rem 3.5rem -0.5rem rgba(17, 24, 38, 0.2), 0 0.5rem 1.5rem 0 rgba(0, 0, 0, 0.08);
  //     opacity: 1;
  //     outline: none;
  //     transition-property: background-color, opacity;
  //     /*noinspection CssInvalidAtRule*/
  //     @starting-style {
  //       opacity: 0;
  //     }
  //
  //     &::backdrop {
  //       background-color: rgba(35, 40, 52, 0.4);
  //       transition: inherit;
  //
  //       /*noinspection CssInvalidAtRule*/
  //       @starting-style {
  //         background-color: rgba(0, 0, 0, 0);
  //       }
  //     }
  //
  //     &[closing] {
  //       opacity: 0;
  //
  //       &::backdrop {
  //         background-color: rgba(44, 19, 21, 0);
  //       }
  //     }
  //
  //     & > header {
  //       padding-bottom: 1.6rem;
  //       font-size: 1.8rem;
  //       line-height: 2.8rem;
  //       color: #171C26;
  //       font-weight: bold;
  //       margin-bottom: 1.6rem;
  //     }
  //
  //     & > footer {
  //       position: relative;
  //       padding-top: 1.6rem;
  //       margin-top: 1.6rem;
  //       display: flex;
  //       justify-content: end;
  //       gap: 0 2rem;
  //
  //       &::before {
  //         content: '';
  //         position: absolute;
  //         top: 0;
  //         left: -2rem;
  //         width: calc(100% + 4rem);
  //         border-top: 0.1rem solid #E9EDF5;
  //       }
  //     }
  //
  //     &[show-arrow] {
  //       --show-arrow-height: 0.8rem;
  //       --show-arrow-width: 2rem;
  //
  //       &::before {
  //         content: '';
  //         position: absolute;
  //         width: 2rem;
  //         height: 0.8rem;
  //         background-color: inherit;
  //         mask-size: 2rem 0.8rem;
  //         mask-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBmaWxsPSJub25lIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIyMCIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgMjAgOCI+PGc+PGc+PHBhdGggZD0iTTMuNDAwMjUsMS4yMTE2OUMyLjY0NzEzLDAuNDM3MDQ0LDEuNjEyNjcsMCwwLjUzMjI3MSwwQzAuNTMyMjcxLDAsMCwwLDAsMEMwLDAsMjAsMCwyMCwwQzIwLDAsMTkuNDY3NywwLDE5LjQ2NzcsMEMxOC4zODczLDAsMTcuMzUyOSwwLjQzNzA0NCwxNi41OTk4LDEuMjExNjlDMTYuNTk5OCwxLjIxMTY5LDExLjQzNCw2LjUyNTA0LDExLjQzNCw2LjUyNTA0QzEwLjY0ODYsNy4zMzI4Myw5LjM1MTM2LDcuMzMyODMsOC41NjYwMSw2LjUyNTA0QzguNTY2MDEsNi41MjUwNCwzLjQwMDI1LDEuMjExNjksMy40MDAyNSwxLjIxMTY5QzMuNDAwMjUsMS4yMTE2OSwzLjQwMDI1LDEuMjExNjksMy40MDAyNSwxLjIxMTY5WiIgZmlsbD0iIzE3MUMyNiIgZmlsbC1vcGFjaXR5PSIxIi8+PC9nPjwvZz48L3N2Zz4=");
  //       }
  //     }
  //
  //     &[placement^='bottom'][show-arrow] {
  //       margin-top: 0.8rem;
  //
  //       &::before {
  //         top: -0.8rem;
  //         transform: rotate(180deg);
  //       }
  //     }
  //
  //     &[placement^='top'][show-arrow] {
  //       margin-bottom: 0.8rem;
  //
  //       &::before {
  //         bottom: -0.8rem;
  //       }
  //     }
  //
  //     &[placement^='left'][show-arrow] {
  //       margin-right: 0.8rem;
  //
  //       &::before {
  //         right: 0;
  //         transform: translate(calc(50% + 0.4rem - 1px), 50%) rotate(-90deg);
  //       }
  //     }
  //
  //     &[placement^='right'][show-arrow] {
  //       margin-left: 0.8rem;
  //
  //       &::before {
  //         left: 0;
  //         transform: translate(calc(-50% - 0.4rem + 1px), 50%) rotate(90deg);
  //       }
  //     }
  //
  //     &[placement='bottom'],
  //     &[placement='top'] {
  //       &[show-arrow]::before {
  //         left: calc(50% - 1rem);
  //       }
  //     }
  //
  //     &[placement='bottom-left'],
  //     &[placement='top-left'] {
  //       &[show-arrow]::before {
  //         left: 3rem;
  //       }
  //     }
  //
  //     &[placement='bottom-right'],
  //     &[placement='top-right'] {
  //       &[show-arrow]::before {
  //         right: 3rem;
  //       }
  //     }
  //
  //     &[placement='left'],
  //     &[placement='right'] {
  //       &[show-arrow]::before {
  //         top: calc(50% - 1rem);
  //       }
  //     }
  //
  //     &[placement='left-bottom'],
  //     &[placement='right-bottom'] {
  //       &[show-arrow]::before {
  //         bottom: calc(1.6rem + var(--show-arrow-width, 0px) / 2);
  //       }
  //     }
  //   }`)
  // document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet]
  customElements.define('wc-popover', Popover, { extends: 'dialog' })
}
