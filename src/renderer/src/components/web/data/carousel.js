const style = (function () {
  let sheet = new CSSStyleSheet()
  sheet.replaceSync(/* language=CSS */ `
  :host{
    display: flex;
    position: relative;
    overflow: hidden;
    height: fit-content;
    [part='container']{
      height: 100%;
      display: flex;
      transition: transform 300ms ease-in-out;
    }
    [part~='scroll-button']{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      &[part~='left']{
        left: 1rem;
      }
      &[part~='right']{
        right: 1rem;
      }
    }
    [part='scroll-marker-group']{
      position: absolute;
      bottom: 1.6rem;
      [part='scroll-marker']{
        color: -webkit-link;
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }`)
  return sheet
})()

class Carousel extends HTMLElement {
  static {
    customElements.define('wc-carousel', this)
  }
  #timer = null
  // 初始状态激活的幻灯片的索引，从 0 开始
  #initialIndex = 0
  // 当前幻灯片的索引
  #activeIndex = 0
  // 是否自动切换
  #autoplay = true
  // 自动切换的时间间隔，单位为毫秒
  #interval = 3000
  // 是否循环显示
  #loop = true
  // 鼠标悬浮时暂停自动切换
  #pauseOnHover = true
  /**
   * 轮播项集合（排除克隆元素）
   * @type {Element[]}
   */
  #carousels = null
  /**
   * @type {Map<Element, Element>}
   */
  #prevCloneNode = new Map()
  /**
   * @type {Map<Element, Element>}
   */
  #nextCloneNode = new Map()
  #attributeChangedCallbackCache = new Map([])

  constructor() {
    super()
  }

  static get observedAttributes() {
    return ['initial-index', 'interval', 'loop', 'autoplay', 'pause-on-hover']
  }

  connectedCallback() {
    this.render()
    this.#attributeChangedCallbackCache.forEach((args) => this.attributeChangedCallback(...args))
    // 初始化默认值
    if (!this.#attributeChangedCallbackCache.has('interval')) {
      this.attributeChangedCallback('interval', null, this.#interval)
    }
    if (!this.#attributeChangedCallbackCache.has('loop')) {
      this.attributeChangedCallback('loop', null, this.#loop)
    }
    if (!this.#attributeChangedCallbackCache.has('autoplay')) {
      this.attributeChangedCallback('autoplay', null, this.#autoplay)
    }
    if (!this.#attributeChangedCallbackCache.has('pause-on-hover')) {
      this.attributeChangedCallback('pause-on-hover', null, this.#pauseOnHover)
    }
    this.#attributeChangedCallbackCache.clear()
    document.addEventListener('visibilitychange', this.visibilitychange)
  }

  setInterval() {
    this.#timer && clearInterval(this.#timer)
    if (this.#autoplay && this.#loop) {
      this.#timer = setInterval(() => {
        this.next()
      }, this.#interval)
    }
  }

  clearInterval() {
    clearInterval(this.#timer)
    this.#timer = null
  }

  visibilitychange = () => {
    document.visibilityState === 'visible' ? this.setInterval() : this.clearInterval()
  }

  render() {
    this.attachShadow({ mode: 'open' })
    let container = document.createElement('div'),
      left = document.createElement('button'),
      right = document.createElement('button'),
      slot = document.createElement('slot')

    slot.onslotchange = () => {
      function isEqualElementArray(arr1, arr2) {
        if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false
        if (arr1.length !== arr2.length) {
          return false
        }
        for (let i = 0; i < arr1.length; i++) {
          if (arr1[i] !== arr2[i]) {
            return false
          }
        }
        return true
      }
      let carousels = Array.from(this.getElementsByClassName('carousel-item')).filter((i) => !i.classList.contains('carousel__clone'))
      if (isEqualElementArray(carousels, this.#carousels)) return
      this.#carousels = carousels
      this.renderMarkerGroup()
      this.renderLoop(this.#loop)
      this.targetCurrent()

      this.moveTo(this.#initialIndex)
    }

    container.id = 'container'
    container.part.add('container')
    container.append(slot)
    left.id = 'scroll-button-left'
    left.part.add('scroll-button', 'left')
    left.onclick = () => this.prev()
    right.id = 'scroll-button-right'
    right.part.add('scroll-button', 'right')
    right.onclick = () => this.next()

    let group = document.createElement('div')
    group.id = 'scroll-marker-group'
    group.part.add('scroll-marker-group')
    this.shadowRoot.append(container, left, right, group)
    this.shadowRoot.adoptedStyleSheets = [style]
  }

  renderMarkerGroup() {
    let group = this.shadowRoot.getElementById('scroll-marker-group')
    let fragment = document.createDocumentFragment()
    this.#carousels.forEach((carousel, i) => {
      let marker = document.createElement('span')
      marker.part.add('scroll-marker')
      marker.onclick = () => {
        if (i === this.#activeIndex) return
        this.moveTo(i, this.#activeIndex)
      }
      fragment.append(marker)
    })
    group.replaceChildren(fragment)
  }

  prev() {
    let { length } = this.#carousels
    if (this.#activeIndex === 0) {
      if (!this.#loop) return
      this.shadowRoot.getElementById('container').style.transition = 'none'
      this.shadowRoot.getElementById('container').style.transform = `translate3d(${length * -100}%, 0, 0)`
      this.offsetHeight
      this.moveTo(length - 1, 0)
    } else {
      this.moveTo(this.#activeIndex - 1, this.#activeIndex)
    }
  }

  next() {
    let { length } = this.#carousels
    if (this.#activeIndex === length - 1) {
      if (!this.#loop) return
      this.shadowRoot.getElementById('container').style.transition = 'none'
      this.shadowRoot.getElementById('container').style.transform = `translate3d(100%, 0 , 0)`
      this.offsetHeight
      this.moveTo(0, length - 1)
    } else {
      this.moveTo(this.#activeIndex + 1, this.#activeIndex)
    }
  }

  moveTo(index, oldIndex) {
    let { length } = this.#carousels
    this.#activeIndex = index
    if (!this.#loop) {
      this.shadowRoot.getElementById('scroll-button-left').part.toggle('disabled', index === 0)
      this.shadowRoot.getElementById('scroll-button-right').part.toggle('disabled', index === length - 1)
    }
    this.shadowRoot.getElementById('container').style.transform = `translate3d(${index * -100}% , 0 , 0)`
    this.shadowRoot.getElementById('container').style.removeProperty('transition')
    this.targetCurrent(oldIndex)
  }

  targetCurrent(oldIndex) {
    let group = this.shadowRoot.getElementById('scroll-marker-group')
    if (oldIndex === undefined) {
      Array.from(group.children).forEach((el, index) => el.part.toggle('target-current', index === this.#activeIndex))
    } else {
      group.children[oldIndex].part.remove('target-current')
      group.children[this.#activeIndex].part.add('target-current')
    }
  }

  renderLoop(bool) {
    function clearCloneNode(map) {
      if (!map.size) return
      map.values().forEach((node) => node.remove())
      map.clear()
    }
    if (!bool) {
      clearCloneNode(this.#prevCloneNode)
      clearCloneNode(this.#nextCloneNode)
      return
    }
    if (!this.childElementCount) return
    let list = Array.from(this.getElementsByClassName('carousel-item')).filter((i) => !i.classList.contains('carousel__clone'))
    // this.firstElementChild 和 this.lastElementChild是动态的
    let firstElementChild = list.at(0),
      lastElementChild = list.at(-1)
    // 当前克隆节点不存在或者第一个节点发生变动是，重新生成克隆节点
    if (!this.#prevCloneNode.has(firstElementChild)) {
      clearCloneNode(this.#prevCloneNode)
      let prev = firstElementChild.cloneNode(true)
      prev.classList.add('carousel__clone')
      prev.style.marginRight = '-100%'
      this.#prevCloneNode.set(firstElementChild, prev)
      this.append(prev)
    }
    if (!this.#nextCloneNode.has(lastElementChild)) {
      clearCloneNode(this.#nextCloneNode)
      let next = lastElementChild.cloneNode(true)
      next.classList.add('carousel__clone')
      next.style.marginLeft = '-100%'
      this.#nextCloneNode.set(lastElementChild, next)
      this.prepend(next)
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    switch (name) {
      case 'initial-index': {
        let index = parseInt(newVal)
        this.#initialIndex = isNaN(index) ? 0 : index
        return
      }
    }
    if (!this.shadowRoot) {
      this.#attributeChangedCallbackCache.set(name, arguments)
      return
    }
    switch (name) {
      case 'interval': {
        let time = parseInt(newVal)
        this.#interval = isNaN(time) ? 3000 : time
        this.setInterval()
        break
      }
      case 'loop': {
        this.#loop = ![null, 'false', false].includes(newVal)
        this.clearInterval()
        this.renderLoop(this.#loop)
        if (this.#loop) this.setInterval()
        break
      }
      case 'autoplay': {
        this.#autoplay = ![null, 'false', false].includes(newVal)
        this.clearInterval()
        if (this.#autoplay) this.setInterval()
        break
      }
      case 'pause-on-hover': {
        this.#pauseOnHover = ![null, 'false', false].includes(newVal)
        if (this.#pauseOnHover) {
          this.addEventListener('mouseenter', this.clearInterval)
          this.addEventListener('mouseleave', this.setInterval)
        } else {
          this.removeEventListener('mouseenter', this.clearInterval)
          this.removeEventListener('mouseleave', this.setInterval)
        }
        break
      }
    }
  }
  disconnectedCallback() {
    this.clearInterval()
    this.removeEventListener('mouseenter', this.clearInterval)
    this.removeEventListener('mouseleave', this.setInterval)
    document.removeEventListener('visibilitychange', this.visibilitychange)
  }
}

export default Carousel
