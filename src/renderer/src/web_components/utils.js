const MAX_VALUE = Number.MAX_VALUE

// 判断属性值的是否存在 , 不存在这设置默认值
function parseBool(attr, def = false) {
  if (!attr) return def
  return attr.value !== 'false'
}
/**
 * 将输入的像素值字符串转换为有效的 CSS 像素格式。
 *
 * @param {string} value - 需要转换的像素值字符串。
 * @returns {string} 如果输入符合 CSS 支持的宽度格式，则返回原值；
 *                   否则将输入转换为数字并拼接 'px' 返回。
 * @description
 *   - 用于处理像素值输入，确保输出符合 CSS 的要求。
 *   - 若值以非数字形式提供但符合 CSS 标准（如 "auto"、"100%"），直接返回原值。
 *   - 若值仅包含数字，则默认添加 'px' 单位。
 * @example
 * parsePixel("200") // 返回 "200px"
 * parsePixel("auto") // 返回 "auto"
 */
function parsePixel(value) {
  if (CSS.supports('width', value)) {
    return value
  }
  return Number(value) + 'px'
}
/**
 * 将表示时间持续的字符串解析为以毫秒为单位的时间数值。
 *
 * @param {string} duration - 时间持续字符串，例如 "1s" 表示 1 秒，"5m" 表示 5 分钟。
 * @returns {number|null} 解析后的时间数值（以毫秒为单位），如果无法解析则返回 null。
 */
function parseDuration(duration) {
  if (!duration) {
    return 0
  } else if (duration.endsWith('ms')) {
    return parseFloat(duration)
  } else if (duration.endsWith('s')) {
    return parseFloat(duration) * 1000
  }
  let t = parseFloat(duration)
  return isNaN(t) ? 0 : t
}
/**
 * 创建一个新的 CSSStyleSheet 实例，并可选地为其同步注入 CSS 字符串。
 *
 * @param {string} [str] - 可选的 CSS 样式字符串。
 * @param {string} [name] - 给CSS 取个名称。
 * @returns {CSSStyleSheet} 返回一个新创建的 CSSStyleSheet 对象。
 *                        如果提供了样式字符串，则会通过 replaceSync 方法注入样式。
 */
function sheet(str, name) {
  let sheet = new CSSStyleSheet()
  if (str) {
    sheet.replaceSync(str)
  }
  if (name) {
    sheet.name = name
  }
  return sheet
}
/**
 * 将连字符分隔的字符串(kebab-case)转换为小驼峰命名(camelCase)
 * @param {string} str - 需要转换的字符串
 * @param {string} sep - 分割符
 * @returns {string} 转换后的驼峰命名字符串
 * @description
 *   - 仅处理包含连字符(-)的字符串
 *   - 无连字符的字符串原样返回
 *   - 首字母强制小写
 *   - 连字符后的首字母大写并移除连字符
 * @throws {TypeError} 当输入不是字符串时抛出
 */
function toCamelCase(str, sep = '-') {
  if (typeof str !== 'string' || !str) return str
  if (!str.includes(sep)) return str
  return str
    .split(sep)
    .map((word, i) => (i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()))
    .join('')
}
/**
 * 将十六进制颜色代码转换为HSL颜色模型。
 *
 * @param {string} hex - 十六进制颜色代码，可以包含或省略'#'号，也可以是简写格式。
 * @returns {Array<number>} - 包含色相（H）、饱和度（S）和亮度（L）的数组，单位分别为度、百分比和百分比。
 */
function hexToHsl(hex) {
  hex = hex.trimPrefix('#')

  // 处理3位简写格式
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('')
  }

  // 转换为RGB
  let r = parseInt(hex.substring(0, 2), 16)
  let g = parseInt(hex.substring(2, 4), 16)
  let b = parseInt(hex.substring(4, 6), 16)

  // 归一化到0-1
  r /= 255
  g /= 255
  b /= 255
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  let h,
    s,
    l = (max + min) / 2

  if (max === min) {
    h = s = 0 // 灰度
  } else {
    let d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}
/**
 * 创建一个防抖函数，该函数在被频繁调用时，只有在最后一次调用后经过指定间隔没有再次调用时才会执行。
 *
 * @param {Function} fn - 要防抖处理的原始函数。
 * @param {number} [delay=0] - 防抖等待时间（单位：毫秒）。
 * @param {boolean} [immediate=false] - 是否立即执行一次函数，默认为 false
 * @returns {Function} 返回新的防抖函数。
 */
function debounce(fn, delay, immediate = false) {
  let timer = null,
    isInvoke = false //记录立即执行是否已执行过
  return function () {
    if (timer) clearTimeout(timer)
    if (immediate && !isInvoke) {
      isInvoke = true
      fn.call(this, ...arguments)
    } else {
      timer = setTimeout(() => {
        fn.call(this, ...arguments)
      }, delay)
    }
  }
}
/**
 * 使用 requestAnimationFrame 实现的防抖函数
 * @template {Function} T
 * @param {T} fn - 需要防抖的函数
 * @returns {(...args: Parameters<T>) => void} 防抖处理后的函数
 * @description
 *   1. 使用 requestAnimationFrame 替代 setTimeout 实现更平滑的性能优化
 *   2. 如果在上一次动画帧执行前再次调用，会取消上一次的调用
 *   3. 自动保持原函数的 this 上下文和参数传递
 * @example
 * // 使用示例
 * const resizeHandler = debounceRAF(() => {
 *   console.log('Resize event handler');
 * });
 * window.addEventListener('resize', resizeHandler);
 */
function debounceRAF(fn) {
  let requestId = null

  return function () {
    if (requestId) {
      cancelAnimationFrame(requestId)
    }
    requestId = requestAnimationFrame(() => {
      requestId = null
      fn.call(this, ...arguments)
    })
  }
}
/**
 * 节流函数：在一定时间内只执行一次目标函数
 * @template {Function} T
 * @param {T} fn - 需要节流的目标函数
 * @param {number} delay - 节流时间间隔（毫秒）
 */
function throttle(fn, delay) {
  let lastTime = 0

  return function () {
    let now = Date.now()
    if (now - lastTime >= delay) {
      lastTime = now
      fn.call(this, ...arguments)
    }
  }
}

const uniqueId = (() => {
  let counter = BigInt(0)
  return (prefix = 'wc_') => `${prefix}${++counter}`
})()
/**
 * 生成符合UUID v4标准的ID
 * @returns {string} 生成的UUID
 */
function UUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
function random(min = 0, max = MAX_VALUE) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export { parseBool, parsePixel, parseDuration, toCamelCase, hexToHsl, debounce, throttle, debounceRAF, uniqueId, UUID, random, sheet }
