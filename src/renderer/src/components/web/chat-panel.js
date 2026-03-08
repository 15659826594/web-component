// noinspection CssUnresolvedCustomProperty

function letterAvatar(text) {
  // 计算hash值来生成颜色
  const total = hashAdler32(text)
  const hue = total % 360
  const [r, g, b] = hsv2rgb(hue / 360, 0.3, 0.9)

  const bg = `rgb(${r},${g},${b})`
  const color = '#ffffff'
  const first = text.charAt(0)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="100" width="100">
    <rect width="100" height="100" fill="${bg}" />
    <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="50" fill="${color}">${first}</text>
  </svg>`

  return `data:image/svg+xml;base64,${btoa(
    encodeURIComponent(svg).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode('0x' + p1)
    })
  )}`
}
function hashAdler32(str) {
  let a = 1
  let b = 0
  const MOD_ADLER = 65521

  for (let i = 0; i < str.length; i++) {
    a = (a + str.charCodeAt(i)) % MOD_ADLER
    b = (b + a) % MOD_ADLER
  }

  // 修复：确保返回正确的32位adler值
  return (b << 16) | a
}
function hsv2rgb(h, s, v) {
  let r, g, b

  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)

  switch (i % 6) {
    case 0:
      r = v
      g = t
      b = p
      break
    case 1:
      r = q
      g = v
      b = p
      break
    case 2:
      r = p
      g = v
      b = t
      break
    case 3:
      r = p
      g = q
      b = v
      break
    case 4:
      r = t
      g = p
      b = v
      break
    case 5:
      r = v
      g = p
      b = q
      break
  }

  return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)]
}

const style = (function () {
  let sheet = new CSSStyleSheet()
  sheet.replaceSync(/* language=CSS */ `
    :host {
      --color-primary: #27AE60;
      --color-green: #27AE60;
      --color-blue: #00AFF0;
      position: relative;
      display: block;
      /*width: 1160px;*/
      height: 705px;
      background-color: #fff;
      box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2), 0 15px 35px -5px rgba(17, 24, 38, 0.15), 0 5px 15px -3px rgba(0, 0, 0, 0.08);

      .boxicons{
        line-height: 1;
        font-style: normal;
        font-family: boxicons, serif !important;
      }

      & > aside {
        position: absolute;
        box-sizing: border-box;
        padding-left: var(--menu-width);
        inset: 0 auto 0 0;
        width: var(--aside-width);
        border-right: 1px solid #eee;

        & > menu {
          list-style: none;
          margin: 0;
          position: absolute;
          inset: 0 auto 0 0;
          padding: 12px 0 8px;
          width: var(--menu-width);
          background-color: #FAFAFA;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;

          li {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #878a92;
          }

          .logo {
            width: 44px;
            height: 44px;
            color: var(--color-primary);
            font-size: 44px;
          }

          .avatar img{
            width: 34px;
            height: 34px;
            border-radius: 50%;
          }

          hr {
            margin: 8px 0;
            width: 30px;
            border: 1px solid rgba(0, 0, 0, 0.1);
          }

          .menu-item {
            width: 40px;
            height: 40px;
            border-radius: 8px;

            i {
              font-size: 24px;
            }

            &.active {
              color: var(--color-primary);
            }
          }
        }

        & > ul {
          list-style: none;
          height: 100%;
          box-sizing: border-box;
          padding: 16px 0 0;
          margin: 0;
          width: 100%;
          display: flex;
          flex-direction: column;

          & > h1 {
            flex-shrink: 0;
            margin: 0;
            font-weight: bold;
            font-size: 20px;
            padding: 0 16px 16px;
          }

          .search-wapper {
            flex-shrink: 0;
            position: relative;
            background-color: #eee;
            border-radius: 12px;
            padding: 5px 10px 5px 40px;
            margin: 0 16px 16px;
            display: flex;
            align-items: center;
            height: 26px;

            i {
              position: absolute;
              left: 18px;
              font-size: 14px;
            }

            input {
              background-color: transparent;
              width: 100%;
              outline: none;
              border: none;
            }
          }

          .list {
            flex: 1;
            overflow-y: auto;
            list-style: none;
            padding: 0;

            & > li {
              cursor: pointer;
              display: flex;
              padding: 10px 16px;
              gap: 10px;

              .left {
                img {
                  display: block;
                  height: 45px;
                  width: 45px;
                  border-radius: 50%;
                }
              }

              hgroup {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                font-size: 16px;

                h1 {
                  color: #333;
                  margin: 4px 0 0;
                  line-height: 1;
                  font-size: inherit;
                }

                p {
                  color: rgba(0, 0, 0, 0.45);
                  line-height: 1;
                  font-size: smaller;
                  margin: 0 0 4px;
                }
              }

              .right {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                font-size: 14px;
              }

              &:hover {
                background-color: #eee4;
              }

              &.active {
                background-color: #eee;
                hgroup p{
                  color: var(--color-primary);
                }
              }
            }
          }
        }

        .tab-pane:not(.active){
          display: none;
        }
      }

      & > main {
        position: relative;
        padding-top: var(--header-height);
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        height: 100%;
        background-color: #FAFAFA;

        & > header {
          position: absolute;
          inset: 0 0 auto 0;
          background-color: #fff;
          height: var(--header-height);
          border-top-right-radius: inherit;
          border-bottom: 1px solid #eee;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px;
          box-sizing: border-box;
          .avatar{
            border-radius: 50%;
            height: 100%;
          }
          hgroup{
            flex: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: 18px;
            padding: 4px 0;
            box-sizing: border-box;

            h1 {
              color: #333;
              margin: 0;
              line-height: 1;
              font-size: inherit;
            }

            p {
              color: rgba(0, 0, 0, 0.45);
              line-height: 1;
              font-size: smaller;
              margin: 0;
            }
          }
        }

        & > #chat-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          flex: 1;
          width: 100%;
          padding: 16px;
          overflow-y: auto;
          box-sizing: border-box;
          & > hr{
            position: relative;
            border: none;
            overflow: visible;
            margin: 0;
            padding: 8px 0;
            &::before{
              content: attr(data-label);
              position: absolute;
              left: 50%;
              top: 50%;
              z-index: 1;
              padding: 0 20px;
              background-color: #FAFAFA;
              transform: translate(-50%, -50%);
              color: rgba(0, 0, 0, 0.45);
              font-size: 13px;
            }
            &::after{
              content: "";
              position: absolute;
              top: 50%;
              display: block;
              width: 100%;
              height: 1px;
              background-color: rgba(238, 238, 238, 1);
            }
          }
          .chat-item{
            display: flex;
            gap: 10px;
            .avatar{
              width: 30px;
              height: 30px;
              border-radius: 50%;
            }
            .context{
              border-radius: 0 16px 16px 16px;
              padding: 10px 16px;
              background-color: #F4F4F7;
              img{
                width: 280px;
              }
              time{
                display: block;
                font-size: smaller;
                color: rgba(0, 0, 0, 0.45);
              }
            }
          }
          .chat-item[own]{
            flex-direction: row-reverse;
            align-items: flex-end;
            .context{
              border-radius: 16px 16px 0 16px;
              time{
                text-align: right;
              }
            }
          }
        }

        .action{
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 40px;
          height: 40px;
          border-radius: 8px;
          &:hover{
            background-color: #eee;
          }
          .boxicons{
            color: rgba(0, 0, 0, 0.45);
            font-size: 24px;
          }
        }

        & > footer {
          background-color: #fff;
          flex-shrink: 0;
          min-height: 62px;
          height: fit-content;
          display: flex;
          gap: 12px;
          align-items: center;
          padding: 10px 16px;
          box-sizing: border-box;
          border-bottom-right-radius: inherit;
          textarea{
            outline: none;
            border: none;
            flex: 1;
            resize: none;
            height: 40px;
            border-radius: 8px;
            padding: 8px 16px;
            line-height: 24px;
            box-sizing: border-box;
            background-color: #FAFAFA;
          }
          button{
            cursor: pointer;
            border: none;
            outline: none;
            color: #fff;
            border-radius: 8px;
            padding: 6px 12px;
            background-color: var(--color-green);
            transition: filter 300ms;
            &:hover{
              filter: brightness(1.1);
            }
            &:active{
              filter: brightness(0.8);
            }
          }
        }
      }

      & > section {
        position: absolute;
        margin: 0;
        inset: 0 0 0 auto;
        width: var(--section-width);
      }
    }
    :host(:not([mode])){
      --aside-width: 350px;
      --menu-width: 70px;
      --header-height: 70px;
      --section-width: 0;
      min-width: 740px;
      min-height: 486px;
      overflow: auto;
      resize: both;
      box-sizing: border-box;
      padding-left: var(--aside-width);
      padding-right: var(--section-width);
      border-radius: 8px;
      & > aside {
        border-top-left-radius: inherit;
        border-bottom-left-radius: inherit;
        &>menu{
          border-top-left-radius: inherit;
          border-bottom-left-radius: inherit;
          &>.menu-item{
            &.separate{
              margin-top: auto;
            }
            &:hover {
              background-color: #eee;
            }
          }
        }
      }
      & > main{
        border-top-right-radius: inherit;
        border-bottom-right-radius: inherit;
      }
      & > section{
        border-left: 1px solid #eee;
        display: none;
      }
      &>section>button,
      &>main>header>button{
        display: none;
      }
    }
    :host(:not([mode])[sidebar]){
      --section-width: 260px;
      & > main{
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      &>section{
        display: block;
        border-top-right-radius: inherit;
        border-bottom-right-radius: inherit;
      }
    }
    :host([mode="mobile"]){
      --safe-area-inset-bottom: constant(safe-area-inset-bottom);
      --safe-area-inset-bottom: env(safe-area-inset-bottom);
      --menu-width: 0;
      --menu-height: calc(65px + var(--safe-area-inset-bottom));
      --header-height: 56px;
      --section-width: 0;
      border-radius: 4px;
      &>aside{
        width: 100%;
        padding-bottom: var(--menu-height);
        border-radius: inherit;
        &>menu{
          display: flex;
          width: inherit;
          position: absolute;
          box-sizing: border-box;
          height: var(--menu-height);
          padding-top: 8px;
          padding-bottom: calc(8px + var(--safe-area-inset-bottom));
          inset: auto 0 0 0;
          flex-direction: row;
          justify-content: space-around;
          border-top-left-radius: 0;
          border-bottom-left-radius: inherit;
          border-bottom-right-radius: inherit;
          .menu-item{
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            &::after{
              content: attr(title);
              font-size: 11px;
              white-space: nowrap;
              margin-top: 4px;
            }
          }
          hr,
          .logo,
          .avatar,
          .separate,
          .separate ~ .menu-item{
            display: none;
          }
        }
        .tab-pane{
          border-top-left-radius: inherit;
          border-top-right-radius: inherit;
        }
      }
      &>main{
        display: none;
        border-radius: inherit;
        &>header{
          border-top-left-radius: inherit;
          &>button{
            margin-right: auto;
          }
          .avatar{
            display: none;
          }
          &>hgroup{
            position: absolute;
            box-sizing: border-box;
            height: auto;
            left: 50%;
            text-align: center;
            transform: translate(-50%);
            &>h1{
              margin-bottom: 4px;
            }
          }
        }
        &>footer{
          border-bottom-left-radius: inherit;
        }
      }
      &>section{
        display: none;
        border-radius: inherit;
        &>button{
          position: absolute;
          left: 16px;
          top: 14px;
          z-index: 10;
        }
      }
      /*回退按钮*/
      &>section>button,
      &>main>header>button{
        padding-left: 0;
        cursor: pointer;
        outline: none;
        border: none;
        color: rgba(0, 0, 0, 0.45);
        font-size: 25px;
        background-color: transparent;
      }
    }
    :host([mode="mobile"][log]){
      &>main{
        display: flex;
      }
      &>aside,
      &>section{
        display: none;
      }
    }
    :host([mode="mobile"][sidebar]){
      --section-width: 100%;
      &>section{
        display: block;
      }
      &>aside,
      &>main{
        display: none;
      }
    }
  `)
  return sheet
})()

class ChatPanel extends HTMLElement {
  static {
    customElements.define('wc-chat-panel', this)
  }
  /**
   * @type {Map<string, any>}
   */
  #attributeChangedCallbackCache = new Map()

  constructor() {
    super()
  }

  static get observedAttributes() {
    return ['tab']
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    this.render()
    // textarea随内容高度自动变化, tip: rows默认值为2 , 高度设置为auto时会显示两行高度
    let textarea = this.shadowRoot.getElementById('input-textarea'),
      submit = this.shadowRoot.getElementById('submit-btn')
    function adjustHeight(target) {
      target.style.height = 'auto'
      target.style.height = target.scrollHeight + 'px'
    }
    textarea.oninput = function (e) {
      adjustHeight(e.target)
    }
    // Enter发送 , alt+Enter换行
    textarea.onkeydown = (e) => {
      if (e.key === 'Enter') {
        if (e.altKey) {
          textarea.value += '\n'
          adjustHeight(e.target)
        } else {
          e.preventDefault()
          submit.click()
        }
      }
    }
    // 发送消息
    submit.onclick = function (e) {
      if (!textarea.value) {
        e.preventDefault()
        return
      }
      textarea.value = ''
      adjustHeight(textarea)
    }
    // 菜单切换
    Array.from(this.shadowRoot.getElementById('menus').children)
      .filter((item) => item.id)
      .forEach((item) => {
        item.onclick = (e) => {
          let tab = e.currentTarget.id.replace(/^pills-(.*?)-tab$/, '$1')
          this.setAttribute('tab', tab)
        }
      })
    // 侧边信息栏打开
    this.shadowRoot.getElementById('pills-sidebar-tab').onclick = () => {
      this.toggleAttribute('sidebar')
    }
    // 打开聊天记录
    Array.from(this.shadowRoot.getElementById('pills-chat').lastElementChild.children).forEach((item) => {
      item.onclick = () => this.toggleAttribute('log')
    })
    this.shadowRoot.getElementById('main-back').onclick = () => this.toggleAttribute('log', false)
    this.shadowRoot.getElementById('sidebar-back').onclick = () => this.toggleAttribute('sidebar', false)

    this.#attributeChangedCallbackCache.forEach((args) => this.attributeChangedCallback(...args))
    if (!this.#attributeChangedCallbackCache.has('tab')) {
      this.setAttribute('tab', 'chat')
    }
    this.shadowRoot.addEventListener(
      'error',
      (e) => {
        let target = e.target
        if (target instanceof HTMLImageElement) {
          target.src = letterAvatar(target.alt)
        }
      },
      true
    )
    this.#attributeChangedCallbackCache.clear()
  }

  render() {
    this.shadowRoot.innerHTML = /* language=HTML */ `
      <aside>
        <menu id="menus">
          <li class="logo" title="logo"><i class="boxicons">&#xeea7;</i></li>
          <li class="avatar" title="头像"> <img src="/src/assets/img/avatar/6c8aec211e68e75628095b9bfd348787.png" alt="头像"> </li>
          <hr>
          <li class="menu-item" title="个人资料" id="pills-user-tab"><i class="boxicons">&#xebc1;</i></li>
          <li class="menu-item" title="聊天" id="pills-chat-tab"><i class="boxicons">&#xe9e3;</i></li>
          <li class="menu-item" title="联系人" id="pills-contacts-tab"><i class="boxicons">&#xee38;</i></li>
          <li class="menu-item" title="电话" id="pills-calls-tab"><i class="boxicons">&#xeb15;</i></li>
          <li class="menu-item" title="书签" id="pills-bookmark-tab"><i class="boxicons">&#xe951;</i></li>
          <li class="menu-item separate" title="设置" id="pills-setting-tab"><i class="boxicons">&#xe9d0;</i></li>
          <li class="menu-item" title="注销"><i class="boxicons">&#xeab2;</i></li>
        </menu>
        <ul class="tab-pane" id="pills-user">Settings</ul>
        <ul class="tab-pane" id="pills-chat">
          <h1>Messages</h1>
          <label class="search-wapper">
            <i class="boxicons">&#xeb56;</i>
            <input type="search" placeholder="搜索">
          </label>
          <ul class="list">
            <li>
              <div class="left">
                <img class="avatar" src="/src/assets/img/avatar/6c8aec211e68e75628095b9bfd348787.png" alt="John Doe">
              </div>
              <hgroup>
                <h1>John Doe</h1>
                <p>How are you doing?</p>
              </hgroup>
              <div class="right">
                <time>16:45</time>
              </div>
            </li>
            <li class="active">
              <div class="left">
                <img class="avatar" src="/src/assets/img/avatar/6c8aec211e68e756285b9bfd348787.png" alt="幻形">
              </div>
              <hgroup>
                <h1>Travis Barker</h1>
                <p>...is typing</p>
              </hgroup>
              <div class="right">
                <time>16:45</time>
              </div>
            </li>
            <li>
              <div class="left">
                <img class="avatar" src="/src/assets/img/avatar/6c8aec211e68e75628095b9bfd7.png" alt="John Doe">
              </div>
              <hgroup>
                <h1>John Doe</h1>
                <p>How are you doing?</p>
              </hgroup>
              <div class="right">
                <time>16:45</time>
              </div>
            </li>
          </ul>
        </ul>
        <ul class="tab-pane" id="pills-contacts">Contacts</ul>
        <ul class="tab-pane" id="pills-calls">Calls</ul>
        <ul class="tab-pane" id="pills-bookmark">Bookmark</ul>
        <ul class="tab-pane" id="pills-setting">Settings</ul>
      </aside>
      <main>
        <header>
          <button class="boxicons" id="main-back">&#xe9af;</button>
          <img class="avatar" src="/src/assets/img/avatar/6c8aec211e68e75628095b9bfd348787.png" alt="头像">
          <hgroup>
            <h1>John Doe</h1>
            <p>Online</p>
          </hgroup>
          <div class="action">
            <i class="boxicons" style="color: var(--color-primary)">&#xebca;</i>
          </div>
          <div class="action" id="pills-sidebar-tab">
            <i class="boxicons">&#xea29;</i>
          </div>
        </header>
        <div id="chat-container">
          <div class="chat-item">
            <img class="avatar" src="/src/assets/img/avatar/6c8aec211e68e75628095b9bfd348787.png" alt="头像">
            <div class="context">
              <div><img src="/src/assets/img/carousel/everything-you-need-to-work-from-your-bed.jpg" alt="图片"></div>
              <time>15:42</time>
            </div>
          </div>
          <div class="chat-item">
            <img class="avatar" src="/src/assets/img/avatar/6c8aec211e68e75628095b9bfd348787.png" alt="头像">
            <div class="context">
              <div><a href="https://dribbble.com/shots/17742253-ui-kit-designjam">https://dribbble.com/shots/17742253-ui-kit-designjam</a></div>
              <time>15:42</time>
            </div>
          </div>
          <div class="chat-item">
            <img class="avatar" src="/src/assets/img/avatar/6c8aec211e68e75628095b9bfd348787.png" alt="头像">
            <div class="context">
              <div>See you at office tomorrow!</div>
              <time>15:42</time>
            </div>
          </div>
          <div class="chat-item" own>
            <img class="avatar" src="/src/assets/img/avatar/6c8aec211e68e75628095b9bfd348787.png" alt="头像">
            <div class="context">
              <div>Thank you for work, see you!</div>
              <time>15:42</time>
            </div>
          </div>
          <hr data-label="Today" >
          <div class="chat-item">
            <img class="avatar" src="/src/assets/img/avatar/6c8aec211e68e75628095b9bfd348787.png" alt="头像">
            <div class="context">
              <div>Hello! Have you seen my backpack anywhere in office?</div>
              <time>15:42</time>
            </div>
          </div>
          <div class="chat-item" own>
            <img class="avatar" src="/src/assets/img/avatar/6c8aec211e68e75628095b9bfd348787.png" alt="头像">
            <div class="context">
              <div>Hi, yes, David have found it, ask our concierge 👀</div>
              <time>15:42</time>
            </div>
          </div>
        </div>
        <footer>
          <div class="action">
            <i class="boxicons">&#xea9f;</i>
          </div>
          <div class="action">
            <i class="boxicons">&#xeabb;</i>
          </div>
          <textarea id="input-textarea" rows="1" required placeholder="在此处键入您的消息..."></textarea>
          <button id="submit-btn" type="submit">发送</button>
        </footer>
      </main>
      <section id="pills-sidebar">
        <button class="boxicons" id="sidebar-back">&#xe9af;</button>
        <slot name="sidebar"></slot>
      </section>
    `
    this.shadowRoot.adoptedStyleSheets = [style]
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (!this.shadowRoot) {
      this.#attributeChangedCallbackCache.set(name, arguments)
      return
    }
    switch (name) {
      case 'tab':
        if (oldVal === newVal) return
        if (oldVal) {
          this.shadowRoot.getElementById(`pills-${oldVal}-tab`).classList.remove('active')
          this.shadowRoot.getElementById(`pills-${oldVal}`).classList.remove('active')
        }
        if (newVal) {
          this.shadowRoot.getElementById(`pills-${newVal}-tab`).classList.add('active')
          this.shadowRoot.getElementById(`pills-${newVal}`).classList.add('active')
        }
        break
    }
  }
  disconnectedCallback() {}
}

export default ChatPanel
