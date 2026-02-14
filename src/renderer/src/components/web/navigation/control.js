import { htmlToFragment, styleToSheet } from '../utils'

const template = htmlToFragment(/* language=HTML */ `
  <div id="close" part="close"></div>
  <div id="minimize" part="minimize"></div>
  <div id="maximize" part="maximize"></div>
`)

const style = styleToSheet(/* language=CSS */ `
:host{
  display: inline-flex;
  gap: 0 0.2rem;
    &>div{
      flex-shrink: 0;
      position: relative;
      cursor: pointer;
      width: 1.6rem;
      height: 1.6rem;
      &::before{
        content: '';
        position: absolute;
        inset: 0.2rem;
        border-radius: 50%;
      }
      &::after{
        opacity: 0;
        transition: opacity 200ms;
        content: '';
        position: absolute;
        inset: 0.2rem;
        background-color: #171c26;
        mask-position: center center;
        mask-repeat: no-repeat;
      }
      &:nth-child(1){
        &::before{
          background-color: #FF3B30;
        }
        &::after{
          background-color: #8C1A11;
          mask-size: 0.55rem 0.55rem;
          mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNS41MDYxMDQiIGhlaWdodD0iNS41MDYxMDQiIHZpZXdCb3g9IjAgMCA1LjUwNjEgNS41MDYxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KCTxkZXNjPgoJCQlDcmVhdGVkIHdpdGggUGl4c28uCgk8L2Rlc2M+Cgk8ZGVmcy8+Cgk8ZyBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6bm9ybWFsIj4KCQk8cGF0aCBpZD0iU2hhcGUiIGQ9Ik00Ljc1IDAuNzVMMC43NSA0Ljc1TTQuNzUgNC43NUwwLjc1IDAuNzUiIHN0cm9rZT0iI0ZGM0IzMCIgc3Ryb2tlLW9wYWNpdHk9IjEuMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEuNTAwMDAwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KCTwvZz4KPC9zdmc+Cg==");
        }
      }
      &:nth-child(2){
        &::before{
          background-color: #FFCC00;
        }
        &::after{
          background-color: #8F591E;
          mask-size: 0.75rem 0.15rem;
          mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNy41MDAwMDAiIGhlaWdodD0iMS41MDAwMDAiIHZpZXdCb3g9IjAgMCA3LjUgMS41IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KCTxkZXNjPgoJCQlDcmVhdGVkIHdpdGggUGl4c28uCgk8L2Rlc2M+Cgk8ZGVmcy8+Cgk8ZyBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6bm9ybWFsIj4KCQk8cGF0aCBpZD0iU2hhcGUiIGQ9Ik02Ljc1IDAuNzVMMC43NSAwLjc1IiBzdHJva2U9IiNGRkNDMDAiIHN0cm9rZS1vcGFjaXR5PSIxLjAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxLjUwMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cgk8L2c+Cjwvc3ZnPgo=")
        }
      }
      &:nth-child(3){
        &::before{
          background-color: #34C759;
        }
        &::after{
          background-color: #285F17;
          mask-size: 0.6rem 0.6rem;
          mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNi4wMDAwMDAiIGhlaWdodD0iNi4wMDAwMDAiIHZpZXdCb3g9IjAgMCA2IDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgoJPGRlc2M+CgkJCUNyZWF0ZWQgd2l0aCBQaXhzby4KCTwvZGVzYz4KCTxkZWZzLz4KCTxnIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTpub3JtYWwiPgoJCTxwYXRoIGlkPSJTaGFwZSIgZD0iTTUgMEwwIDVMMCAxQzAgMC40NCAwLjQ0IDAgMSAwTDUgMFpNMSA2TDYgMUw2IDVDNiA1LjU1IDUuNTUgNiA1IDZMMSA2WiIgZmlsbD0iIzM0Qzc1OSIgZmlsbC1vcGFjaXR5PSIxLjAwMDAwMCIgZmlsbC1ydWxlPSJldmVub2RkIi8+Cgk8L2c+Cjwvc3ZnPgo=")
        }
      }
    }
  }
  :host(:hover)>div::after{
    opacity: 1;
  }
  :host([close]),
  :host([minimize]),
  :host([maximize]){
    &>div{
      cursor: not-allowed;
      &::before{
        background-color: #F2F2F2;
      }
      &::after{
        content: none;
      }
    }
  }
  :host([close]){
    &>div:nth-child(1){
      cursor: pointer;
      &::before{
        background-color: #FF3B30;
      }
      &::after{
        content: '';
      }
    }
  }
  :host([minimize]){
    &>div:nth-child(2){
      cursor: pointer;
      &::before{
        background-color: #34C759;
      }
      &::after{
        content: '';
      }
    }
  }
  :host([maximize]){
    &>div:nth-child(2){
      cursor: pointer;
      &::before{
        background-color: #FFCC00;
      }
      &::after{
        content: '';
      }
    }
  }
`)

class Control extends HTMLElement {
  #init = false
  #ipcRenderer = window.electron.ipcRenderer
  static ACTION_MAP = new Map([
    ['close', 'quit'],
    ['minimize', 'minimize'],
    ['maximize', 'fullScreenToggle']
  ])
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.adoptedStyleSheets = [style]
  }
  connectedCallback() {
    if (!this.#init) {
      this.#render()
    }
  }
  #render() {
    this.shadowRoot.appendChild(template.cloneNode(true))
    this.shadowRoot.getElementById('close').onclick = this.closeHandler.bind(this)
    this.shadowRoot.getElementById('minimize').onclick = this.minimizeHandler.bind(this)
    this.shadowRoot.getElementById('maximize').onclick = this.maximizeHandler.bind(this)
    this.#init = true
  }
  handleAction(action) {
    const hasSpecificAttr = this.hasAttribute(action)
    const hasAnyState = ['close', 'minimize', 'maximize'].some((attr) => this.hasAttribute(attr))

    if (hasSpecificAttr || !hasAnyState) {
      this.#ipcRenderer.send(Control.ACTION_MAP.get(action))
    }
  }
  closeHandler() {
    this.handleAction('close')
  }
  minimizeHandler() {
    this.handleAction('minimize')
  }
  maximizeHandler() {
    this.handleAction('maximize')
  }
}

if (window.electron?.ipcRenderer && !customElements.get('wc-control')) {
  customElements.define('wc-control', Control)
}
