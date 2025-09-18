class Sheet {
  /** @type {CSSStyleSheet} */
  #CSSStyleSheet = new CSSStyleSheet()
  #selectorText = ':root'
  #selectorIndex = 0

  cssRules(selectorText) {
    selectorText = selectorText || this.#selectorText
    for (let i = 0, len = this.#CSSStyleSheet.cssRules.length; i < len; i++) {
      let cssRules = this.#CSSStyleSheet.cssRules[i]
      if (cssRules.selectorText === selectorText) {
        this.#selectorIndex = i
        return cssRules
      }
    }
    return undefined
  }
  valueOf() {
    return this.#CSSStyleSheet
  }
  /**
   * 替换内部 CSSStyleSheet 的内容
   * @param {string} text - 要设置的 CSS 字符串
   */
  set sheet(text) {
    this.#CSSStyleSheet.replaceSync(`${text}`)
  }
  /**
   * 构造 Sheet 实例
   * @param {string} [str=''] - 初始化的 CSS 字符串
   * @param {string} [selectorText=':root'] - 默认选择器
   */
  constructor(str = '', selectorText = ':root') {
    this.#selectorText = selectorText
    this.sheet = str || `${selectorText}{}`
  }

  find(filter, def = undefined, selectorText) {
    let cssRules = this.cssRules(selectorText)
    if (!cssRules) return def
    let map = this.cssTextToMap(cssRules.style.cssText)
    return map.has(filter) ? map.get(filter) : def
  }

  remove(filter, selectorText) {
    let cssRules = this.cssRules(selectorText)
    if (!cssRules) return false
    let map = this.cssTextToMap(cssRules.style.cssText)
    if (map.has(filter)) {
      map.delete(filter)
      this.#CSSStyleSheet.deleteRule(this.#selectorIndex)
      this.#CSSStyleSheet.insertRule(this.mapToString(map, selectorText || this.#selectorText))
      return true
    }
    return false
  }

  removeBatch(callback = () => false, selectorText) {
    let cssRules = this.cssRules(selectorText)
    if (!cssRules) return false
    let map = this.cssTextToMap(cssRules.style.cssText)
    let filters = []
    for (const [key, value] of map) {
      if (callback(key, value)) filters.push(key)
    }
    for (const filter of filters) {
      map.delete(filter)
    }
    this.#CSSStyleSheet.deleteRule(this.#selectorIndex)
    this.#CSSStyleSheet.insertRule(this.mapToString(map, selectorText || this.#selectorText))
  }

  add(filter, value, selectorText) {
    let cssRules = this.cssRules(selectorText)
    if (!cssRules) return false
    let map = this.cssTextToMap(cssRules.style.cssText)
    map.set(filter, value)
    this.#CSSStyleSheet.deleteRule(this.#selectorIndex)
    this.#CSSStyleSheet.insertRule(this.mapToString(map, selectorText || this.#selectorText))
  }

  mapToString(map, selectorText) {
    let string = Array.from(map)
      .map((item) => {
        return `${item[0]}: ${item[1]}`
      })
      .join(';')
    return selectorText ? `${selectorText} { ${string} }` : string
  }

  cssTextToMap(cssText) {
    let map = new Map()
    if (!cssText) return map
    cssText.split(';').forEach((item) => {
      if (item.trim()) {
        let [key, value] = item.split(':').map((i) => i.trim())
        map.set(key, value)
      }
    })
    return map
  }
  // 合并两个样式表 , 返回一个map
  assignCSSStyleSheet(target, data) {
    let tmp = this.cssTextToMap(target.style.cssText)
    for (const [key, value] of this.cssTextToMap(data.style.cssText)) {
      tmp.set(key, value)
    }
    return tmp
  }
  // 插入一个样式表
  insertCssText(cssText) {
    cssText = cssText.trim()
    if (!cssText) return
    let tmp = new CSSStyleSheet()
    tmp.replaceSync(cssText)
    for (let i = tmp.cssRules.length - 1; i >= 0; i--) {
      let cssRules = tmp.cssRules[i]
      let old = this.cssRules(cssRules.selectorText)
      if (!old) {
        this.#CSSStyleSheet.insertRule(cssRules.cssText)
      } else {
        let map = this.assignCSSStyleSheet(old, cssRules)
        this.#CSSStyleSheet.deleteRule(this.#selectorIndex)
        this.#CSSStyleSheet.insertRule(this.mapToString(map, cssRules.selectorText))
      }
    }
  }
  // 转为字符串
  toString() {
    let size = 0
    for (let i = this.#CSSStyleSheet.cssRules.length - 1; i >= 0; i--) {
      let cssRules = this.#CSSStyleSheet.cssRules[i]
      size += cssRules.styleMap.size
      if (!cssRules.styleMap.size && cssRules.selectorText !== this.#selectorText) {
        this.#CSSStyleSheet.deleteRule(i)
      }
    }
    if (!size) return ''
    return Array.from(this.#CSSStyleSheet.cssRules)
      .map((rule) => rule.cssText)
      .join('\n')
  }
  /**
   * 将当前样式表内容持久化到 localStorage
   * @param {string} key - 存储到 localStorage 的键名
   */
  persist(key) {
    if (!key) {
      throw new Error('Key is required for persisting the sheet.')
    }
    let str = this.toString().trim()
    str ? localStorage.setItem(key, str) : localStorage.removeItem(key)
  }
}

export default Sheet
