class Picker extends HTMLElement {
  stylesheet = /* language=CSS */ `
    :host {
      display: inline-block;
      min-width: 15rem;
      cursor: pointer;
      background-color: #fff;
      user-select: none;
      position: relative;
      color: #464f60;
      box-sizing: border-box;
      height: 3.2rem;
      padding: 0.6rem 3.6rem 0.6rem 1.2rem;
      font-size: 1.4rem;
      line-height: 2rem;
      border-radius: 0.6rem;
      outline: none;
      box-shadow: 0 0.1rem 0.1rem 0 rgba(0, 0, 0, 0.1),
      0 0 0 0.1rem rgba(70, 79, 96, 0.16);

      & > :first-child:empty::before {
        content: attr(data-placeholder);
        color: #a1a9b8;
      }

      #select-options {
        cursor: default;
        z-index: 199410;
        position: absolute;
        top: calc(100% + 0.6rem);
        left: 0;
        overflow: hidden;
        height: 0;
        opacity: 0;
        transition: all 300ms cubic-bezier(0.42, 0, 0.58, 1);
        border-radius: 0.6rem;
        background-color: #fff;
        color: #687182;
        font-size: 1.4rem;
        line-height: 2rem;
        box-shadow: 0 0 0 0.1rem rgba(152, 161, 178, 0.1),
        0 1.5rem 3.5rem -0.5rem rgba(17, 24, 38, 0.15),
        0 0.5rem 1.5rem 0 rgba(0, 0, 0, 0.08);

        & > div {
          width: 31.2rem;

          #header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.6rem 1.6rem 1.2rem 1.6rem;
            color: #171C26;

            #year-month {
              cursor: pointer;
            }

            button:last-child::before {
              transform: rotate(-180deg);
            }
          }

          #thead {
            list-style: none;
            margin: 0;
            padding: 0 1.6rem 0.8rem 1.6rem;
            display: flex;
            text-align: center;
            font-size: 1.2rem;
            line-height: 1.8rem;

            li {
              display: block;
              list-style: none;
              flex: 0 0 calc(100% / 7);
            }
          }

          #tbody {
            display: flex;
            flex-wrap: wrap;
            text-align: center;
            margin: 0;
            padding: 0 1.6rem 1.6rem 1.6rem;

            li {
              cursor: pointer;
              display: block;
              height: 4rem;
              line-height: 4rem;
              list-style: none;
              flex: 0 0 calc(100% / 7);
              border-radius: var(--radius);

              &:hover {
                background-color: #EDEDFC;
              }

              &[selected] {
                background-color: #5E5ADB;
                color: #fff;
              }

              &:empty {
                background-color: transparent;
                cursor: default;
              }
            }
          }
        }
      }

      &::after {
        content: '';
        position: absolute;
        height: 1.6rem;
        width: 1.6rem;
        top: 0.8rem;
        right: 1.2rem;
        background-size: contain;
        background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBmaWxsPSJub25lIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij48ZGVmcz48Y2xpcFBhdGggaWQ9Im1hc3Rlcl9zdmcwXzBfNzA3MiI+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiByeD0iMCIvPjwvY2xpcFBhdGg+PC9kZWZzPjxnIGNsaXAtcGF0aD0idXJsKCNtYXN0ZXJfc3ZnMF8wXzcwNzIpIj48Zz48cGF0aCBkPSJNNSwxQzUuNDE0MjEsMSw1Ljc1LDEuMzM1Nzg2LDUuNzUsMS43NUM1Ljc1LDEuNzUsNS43NSwzLDUuNzUsM0M1Ljc1LDMsMTAuMjUsMywxMC4yNSwzQzEwLjI1LDMsMTAuMjUsMS43NSwxMC4yNSwxLjc1QzEwLjI1LDEuMzM1Nzg2LDEwLjU4NTc5LDEsMTEsMUMxMS40MTQyLDEsMTEuNzUsMS4zMzU3ODYsMTEuNzUsMS43NUMxMS43NSwxLjc1LDExLjc1LDMsMTEuNzUsM0MxMS43NSwzLDEzLDMsMTMsM0MxNC4xMDQ2LDMsMTUsMy44OTU0MywxNSw1QzE1LDUsMTUsMTMsMTUsMTNDMTUsMTQuMTA0NiwxNC4xMDQ2LDE1LDEzLDE1QzEzLDE1LDMsMTUsMywxNUMxLjg5NTQzLDE1LDEsMTQuMTA0NiwxLDEzQzEsMTMsMSw1LDEsNUMxLDMuODk1NDMsMS44OTU0MzA5OTk5OTk5OTk5LDMsMywzQzMsMyw0LjI1LDMsNC4yNSwzQzQuMjUsMyw0LjI1LDEuNzUsNC4yNSwxLjc1QzQuMjUsMS4zMzU3ODYsNC41ODU3ODk5OTk5OTk5OTksMSw1LDFDNSwxLDUsMSw1LDFaTTEwLjI1LDQuNUMxMC4yNSw0LjUsMTAuMjUsNS4yNSwxMC4yNSw1LjI1QzEwLjI1LDUuNjY0MjEsMTAuNTg1NzksNiwxMSw2QzExLjQxNDIsNiwxMS43NSw1LjY2NDIxLDExLjc1LDUuMjVDMTEuNzUsNS4yNSwxMS43NSw0LjUsMTEuNzUsNC41QzExLjc1LDQuNSwxMi41LDQuNSwxMi41LDQuNUMxMy4wNTIzLDQuNSwxMy41LDQuOTQ3NzIsMTMuNSw1LjVDMTMuNSw1LjUsMTMuNSw3LDEzLjUsN0MxMy41LDcuNTUyMjgsMTMuMDUyMyw4LDEyLjUsOEMxMi41LDgsMy41LDgsMy41LDhDMi45NDc3MSw4LDIuNSw3LjU1MjI4LDIuNSw3QzIuNSw3LDIuNSw1LjUsMi41LDUuNUMyLjUsNC45NDc3MiwyLjk0NzcyLDQuNSwzLjUsNC41QzMuNSw0LjUsNC4yNSw0LjUsNC4yNSw0LjVDNC4yNSw0LjUsNC4yNSw1LjI1LDQuMjUsNS4yNUM0LjI1LDUuNjY0MjEsNC41ODU3ODk5OTk5OTk5OTksNiw1LDZDNS40MTQyMSw2LDUuNzUsNS42NjQyMSw1Ljc1LDUuMjVDNS43NSw1LjI1LDUuNzUsNC41LDUuNzUsNC41QzUuNzUsNC41LDEwLjI1LDQuNSwxMC4yNSw0LjVDMTAuMjUsNC41LDEwLjI1LDQuNSwxMC4yNSw0LjVaIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbGw9IiM4NjhGQTAiIGZpbGwtb3BhY2l0eT0iMSIvPjwvZz48L2c+PC9zdmc+');
      }

      #safe-area-inset-bottom {
        --correct-height: 0px;
        position: absolute;

        top: calc(100% + 0.6rem + 29rem + var(--correct-height));
      }

      #safe-area-inset-right {
        position: absolute;
        left: 31.2rem;
      }
    }

    :host([placement-y='top']) {
      #select-options {
        top: auto;
        bottom: calc(100% + 0.6rem);
      }
    }

    :host([placement-x='left']) {
      #select-options {
        left: auto;
        right: 0;
      }
    }

    :host(:hover) {
      box-shadow: 0 0.1rem 0.1rem 0 rgba(0, 0, 0, 0.1),
      0 0 0 0.1rem rgba(70, 79, 96, 0.32);
    }

    :host(:focus), :host([active]) {
      box-shadow: 0 0.1rem 0.1rem 0 rgba(0, 0, 0, 0.1),
      0 0 0 0.1rem rgba(70, 79, 96, 0.32),
      0 0 0 0.4rem rgba(94, 90, 219, 0.4);
    }

    :host([active]) {
      #select-options {
        opacity: 1;
        height: auto;
      }
      @supports (height: calc-size(auto, size)) {
        #select-options{
          height: calc-size(auto, size);
        }
      }
    }

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
      outline: none;
      padding: 0.2rem 0.4rem;
      border-radius: var(--radius);

      &::before {
        content: '';
        display: block;
        width: 1.6rem;
        height: 1.6rem;
        background-size: contain;
        background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBmaWxsPSJub25lIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij48Zz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgwLC0xLC0xLDAsMjIsMjIpIj48cGF0aCBkPSJNMTEuNTMwMzMsMTEuOTY5NjdDMTEuMjM3NDM3LDExLjY3Njc3NjgsMTAuNzYyNTYzLDExLjY3Njc3NjgsMTAuNDY5NjcsMTEuOTY5NjdDMTAuMTc2Nzc2OCwxMi4yNjI1NjMsMTAuMTc2Nzc2OCwxMi43Mzc0MzcsMTAuNDY5NjcsMTMuMDMwMzNDMTAuNDY5NjcsMTMuMDMwMzMsMTEuNTMwMzMsMTEuOTY5NjcsMTEuNTMwMzMsMTEuOTY5NjdDMTEuNTMwMzMsMTEuOTY5NjcsMTEuNTMwMzMsMTEuOTY5NjcsMTEuNTMwMzMsMTEuOTY5NjdaTTE0LDE1LjVDMTQsMTUuNSwxMy40Njk2NywxNi4wMzAzMywxMy40Njk2NywxNi4wMzAzM0MxMy43NjI1NiwxNi4zMjMyMiwxNC4yMzc0NCwxNi4zMjMyMiwxNC41MzAzMywxNi4wMzAzM0MxNC41MzAzMywxNi4wMzAzMywxNCwxNS41LDE0LDE1LjVDMTQsMTUuNSwxNCwxNS41LDE0LDE1LjVaTTE3LjUzMDMzLDEzLjAzMDMzQzE3LjgyMzIyLDEyLjczNzQzNywxNy44MjMyMiwxMi4yNjI1NjMsMTcuNTMwMzMsMTEuOTY5NjdDMTcuMjM3NDQsMTEuNjc2Nzc2OCwxNi43NjI1NiwxMS42NzY3NzY4LDE2LjQ2OTY3LDExLjk2OTY3QzE2LjQ2OTY3LDExLjk2OTY3LDE3LjUzMDMzLDEzLjAzMDMzLDE3LjUzMDMzLDEzLjAzMDMzQzE3LjUzMDMzLDEzLjAzMDMzLDE3LjUzMDMzLDEzLjAzMDMzLDE3LjUzMDMzLDEzLjAzMDMzWk0xMC40Njk2NywxMy4wMzAzM0MxMC40Njk2NywxMy4wMzAzMywxMy40Njk2NywxNi4wMzAzMywxMy40Njk2NywxNi4wMzAzM0MxMy40Njk2NywxNi4wMzAzMywxNC41MzAzMywxNC45Njk2NywxNC41MzAzMywxNC45Njk2N0MxNC41MzAzMywxNC45Njk2NywxMS41MzAzMywxMS45Njk2NywxMS41MzAzMywxMS45Njk2N0MxMS41MzAzMywxMS45Njk2NywxMC40Njk2NywxMy4wMzAzMywxMC40Njk2NywxMy4wMzAzM0MxMC40Njk2NywxMy4wMzAzMywxMC40Njk2NywxMy4wMzAzMywxMC40Njk2NywxMy4wMzAzM1pNMTQuNTMwMzMsMTYuMDMwMzNDMTQuNTMwMzMsMTYuMDMwMzMsMTcuNTMwMzMsMTMuMDMwMzMsMTcuNTMwMzMsMTMuMDMwMzNDMTcuNTMwMzMsMTMuMDMwMzMsMTYuNDY5NjcsMTEuOTY5NjcsMTYuNDY5NjcsMTEuOTY5NjdDMTYuNDY5NjcsMTEuOTY5NjcsMTMuNDY5NjcsMTQuOTY5NjcsMTMuNDY5NjcsMTQuOTY5NjdDMTMuNDY5NjcsMTQuOTY5NjcsMTQuNTMwMzMsMTYuMDMwMzMsMTQuNTMwMzMsMTYuMDMwMzNDMTQuNTMwMzMsMTYuMDMwMzMsMTQuNTMwMzMsMTYuMDMwMzMsMTQuNTMwMzMsMTYuMDMwMzNaIiBmaWxsPSIjNDY0RjYwIiBmaWxsLW9wYWNpdHk9IjEiLz48L2c+PC9nPjwvc3ZnPg==');
      }

      box-shadow: 0 0.1rem 0.1rem 0 rgba(0, 0, 0, 0.1),
      0 0 0 0.1rem rgba(70, 79, 96, 0.16);

      &:hover {
        box-shadow: 0 0.1rem 0.1rem 0 rgba(0, 0, 0, 0.1),
        0 0 0 0.1rem rgba(70, 79, 96, 0.32);
      }

      &:focus,
      &:active {
        box-shadow: 0 0.1rem 0.1rem 0 rgba(0, 0, 0, 0.1),
        0 0 0 0.1rem rgba(70, 79, 96, 0.32),
        0 0 0 0.4rem rgba(94, 90, 219, 0.4);
      }

      &:disabled,
      &[loading] {
        background-color: #f7f9fc;
        color: #868fa0;
        box-shadow: 0 0 0 0.1rem rgba(70, 79, 96, 0.2);
      }
    }
  `
  node = new Map()
  static formAssociated = true
  locales = 'zh-cn'
  static get observedAttributes() {
    return ['value', 'mode', 'start', 'end', 'fields', 'placeholder']
  }
  get value() {
    return this.getAttribute('value')
  }
  set value(value) {
    if (value === null) {
      this.removeAttribute('value')
      return
    }
    this.setAttribute('value', value)
    this.internals.setFormValue(value)
  }
  get pickerMode() {
    return this.getAttribute('mode')
  }
  constructor() {
    super()
    this.internals = this.attachInternals()
  }
  connectedCallback() {
    this.tabIndex = 0
    if (!this.node.shadow) this.node.shadow = this.attachShadow({ mode: 'open' })
    this.render(this.node.shadow)

    this.node.text = this.node.shadow.querySelector('div')
    this.node.text.innerHTML = this.value

    this.node.text.dataset.placeholder = this.hasAttribute('placeholder') ? this.getAttribute('placeholder') : this.defaultDateTimeFormat(this.locales)
    this.node.dialog = this.node.shadow.querySelector('#select-options')
    this.node.tbody = this.node.shadow.querySelector('#tbody')
    this.node.yearMonth = this.node.shadow.querySelector('#year-month')
    this.node.prev = this.node.shadow.querySelector('#prev')
    this.node.next = this.node.shadow.querySelector('#next')
    this.node.safeAreaInsetBottom = this.node.shadow.querySelector('#safe-area-inset-bottom')
    this.node.safeAreaInsetRight = this.node.shadow.querySelector('#safe-area-inset-right')

    this.addEventListener('click', this.clickEvent)
    this.node.dialog.addEventListener('click', this.dialogHandler)

    this.intersectionObserver()
  }
  render(shadow) {
    shadow.innerHTML = /* language=HTML */ `
      <div aria-hidden="true"></div>
      <div id="select-options">
        <div>
          <div id="header"><button id="prev" tabindex="-1"></button><span id="year-month">June 2021</span><button id="next" tabindex="-1"></button></div>
          <ul id="thead">
            ${this.getLocalizedWeek(this.locales)
              .map((week) => `<li>${week}</li>`)
              .join('')}
          </ul>
          <ul id="tbody"></ul>
        </div>
      </div>
      <div id="safe-area-inset-bottom"></div>
      <div id="safe-area-inset-right"></div>
    `
    const sheet = new CSSStyleSheet()
    sheet.replaceSync(this.stylesheet)
    this.shadowRoot.adoptedStyleSheets = [sheet]
    return shadow
  }
  renderTable(date, selected) {
    let { tbody, text, yearMonth, prev, next } = this.node
    text.innerHTML = selected ? selected.toLocaleDateString(this.locales, { year: 'numeric', month: '2-digit', day: '2-digit' }) : ''
    yearMonth.innerHTML = date.toLocaleDateString(this.locales, { year: 'numeric', month: 'long' })
    // 判断当月第一天是周几
    let monthFirstWeekday = new Date(date.getFullYear(), date.getMonth(), 1).getDay() || 7
    // 判断当月多少天
    let monthDays = this.getDaysInMonth(date.getFullYear(), date.getMonth() + 1)
    tbody.innerHTML = ''
    let col = Math.ceil((monthDays + monthFirstWeekday - 1) / 7)
    this.node.safeAreaInsetBottom.style.setProperty('--correct-height', (col - 5) * 4 + 'rem')
    let list = []
    for (let i = 0; i < col * 7; i++) {
      let li = document.createElement('li')
      list.push(li)
      tbody.appendChild(li)
    }
    let prevMonth = structuredClone(date)
    prevMonth.setMonth(prevMonth.getMonth() - 1)
    prevMonth.setDate(1)
    prev.onclick = () => {
      this.renderTable(prevMonth, selected)
    }
    let nextMonth = structuredClone(date)
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    nextMonth.setDate(1)
    next.onclick = () => {
      this.renderTable(nextMonth, selected)
    }
    // 判断选中的日期是否在当前月份内
    let inmonth = selected ? date.getFullYear() === selected.getFullYear() && date.getMonth() === selected.getMonth() : false
    for (let i = monthFirstWeekday - 1, j = 1, len = monthDays + monthFirstWeekday - 1; i < len; i++, j++) {
      list[i].innerHTML = j
      list[i].dataset.year = date.getFullYear()
      list[i].dataset.month = date.getMonth() + 1 + ''
      list[i].dataset.day = j + ''
      date.setDate(j)
      if (inmonth && j === selected.getDate()) {
        list[i].setAttribute('selected', '')
      }
    }
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'value':
        if (this.node.text) {
          this.node.text.innerHTML = newValue || ''
        }
        break
      case 'mode':
        if (oldValue !== null && newValue !== oldValue) {
          this.disconnectedCallback()
          this.node = new Map()
          this.connectedCallback()
        }
        break
      case 'placeholder':
        if (this.node.text) {
          this.node.text.dataset.placeholder = newValue || this.defaultDateTimeFormat(this.locales)
        }
        break
    }
  }
  getLocalizedWeek(locales, format = 'short') {
    if (this.localizedWeekCache) {
      return this.localizedWeekCache
    }
    const days = new Array(7).fill('')
    const today = new Date()
    for (let i = 0, j = today.getDay(); i < 7; i++, j++) {
      today.setDate(today.getDate() + 1)
      days[j % 7] = new Intl.DateTimeFormat(locales, { weekday: format }).format(today)
    }
    this.localizedWeekCache = days
    return days
  }
  defaultDateTimeFormat(locales) {
    return new Intl.DateTimeFormat(locales, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
      .formatToParts(new Date())
      .filter((_, index) => index % 2 === 0)
      .map((item) => {
        switch (item.type) {
          case 'year':
            return 'YYYY'
          case 'month':
            return 'MM'
          case 'day':
            return 'DD'
        }
      })
      .join('/')
  }
  // 获取月份天数
  getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate()
  }
  clickEvent() {
    this.toggle()
  }
  toggle() {
    this.hasAttribute('active') ? this.close() : this.open()
  }
  open() {
    let selected = this.value ? new Date(this.value) : new Date()
    this.renderTable(structuredClone(selected), this.value ? structuredClone(selected) : undefined)
    this.intersectionObs.observe(this.node.safeAreaInsetBottom)
    this.intersectionObs.observe(this.node.safeAreaInsetRight)
    this.setAttribute('active', '')
    document.addEventListener('click', this.clickOutsideHandler)
  }
  close() {
    this.intersectionObs.unobserve(this.node.safeAreaInsetBottom)
    this.intersectionObs.unobserve(this.node.safeAreaInsetRight)
    this.removeAttribute('active')
    this.blur()
    document.removeEventListener('click', this.clickOutsideHandler)
  }
  // 监听点击外部事件
  clickOutsideHandler = (event) => {
    if (!event.composedPath().includes(this)) {
      this.close()
    }
  }
  // 事件委托 , 点击子项
  dialogHandler = (event) => {
    let target = event.target
    switch (target.tagName) {
      case 'LI':
        if (!target.dataset.day) {
          event.stopPropagation()
          return
        }
        if (target.hasAttribute('selected')) {
          target.removeAttribute('selected')
          this.node.text.innerHTML = ''
          this.value = undefined
        } else {
          let sibling = target.parentNode.firstChild
          while (sibling) {
            if (sibling.nodeType === 1 && sibling !== target) {
              sibling.removeAttribute('selected')
            }
            sibling = sibling.nextSibling
          }
          target.setAttribute('selected', '')
          let format = new Date(`${target.dataset.year}-${target.dataset.month}-${target.dataset.day}`).toLocaleDateString(this.locales, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          })
          this.node.text.innerHTML = format
          this.value = format
        }
        this.close()
        break
    }
    event.stopPropagation()
  }
  // 监听子节点的变动
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
    })
  }
  disconnectedCallback() {
    this.intersectionObs && this.intersectionObs.disconnect()
    this.removeEventListener('click', this.clickEvent)
    this.node.dialog.removeEventListener('click', this.dialogHandler)
    document.removeEventListener('click', this.clickOutsideHandler)
  }
}

if (!customElements.get('wc-picker')) {
  customElements.define('wc-picker', Picker)
}
