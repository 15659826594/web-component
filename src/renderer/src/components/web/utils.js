const MAX_VALUE = Number.MAX_VALUE

// 字符串转为template模板
function htmlToFragment(html) {
  const fragment = document.createDocumentFragment()
  const temp = document.createElement('div')
  temp.innerHTML = html.trim()
  while (temp.firstChild) {
    fragment.appendChild(temp.firstChild)
  }
  return fragment
}
// 字符串转为css样式
function styleToSheet(style, name) {
  let sheet = new CSSStyleSheet()
  sheet.replaceSync(style)
  if (name) sheet.name = name
  return sheet
}

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
  // 优先使用原生crypto API生成UUID
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // 兼容不支持crypto.randomUUID的环境
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
function random(min = 0, max = MAX_VALUE) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 拼音声母可能的首字母
const PINYIN_INITIAL_CONSONANT_LETTERS = 'ABCDEFGHJKLMNOPQRSTWXYZ'.split('')
// 拼音声母对应的边界中文
const PINYIN_BOUNDARY_CHAR = '驁簿錯鵽樲鰒餜靃攟鬠纙鞪黁漚曝裠鶸蜶籜鶩鑂韻糳'.split('')
/**
 * 获取拼音首字母（大写）, 如果不是中文，返回原字符
 */
function chinesePinyinFirstLetter(str) {
  // 空字符串直接返回
  if (!str) {
    return ''
  }
  if (str.length > 1) {
    return str.split('').map(chinesePinyinFirstLetter).join('')
  }
  // 判断字符是否为中文,不是中文返回原字符
  if (/[^\u4e00-\u9fa5]/.test(str)) {
    return str
  }
  const index = PINYIN_BOUNDARY_CHAR.findIndex((char) => {
    return char.localeCompare(str, 'zh-CN-u-co-pinyin') >= 0
  })
  return PINYIN_INITIAL_CONSONANT_LETTERS[index]
}

// 模拟通讯录数据（中英文混搭、含大小写、带拼音/英文名称）
const contactList = [
  { name: '张三', phone: '13800138000' },
  { name: 'Apple', phone: '13900139000' },
  { name: '李四', phone: '13700137000' },
  { name: 'banana', phone: '13600136000' },
  { name: '王五', phone: '13500135000' },
  { name: 'Cat', phone: '13400134000' },
  { name: '赵六', phone: '13300133000' },
  { name: 'orange', phone: '13200132000' },
  { name: '黄兴', phone: '13200132000' },
  { name: 'h王', phone: '13100131000' }
]

// 🌟 修复版：核心排序方法，按拼音首字母分组排序
const sortContacts = (list) => {
  return [...list].sort((a, b) => {
    const nameA = a.name
    const nameB = b.name

    // 获取首字符
    const firstCharA = nameA.charAt(0).toUpperCase()
    const firstCharB = nameB.charAt(0).toUpperCase()

    // 判断是否为中文字符
    const isChineseA = /^[\u4e00-\u9fa5]$/.test(nameA.charAt(0))
    const isChineseB = /^[\u4e00-\u9fa5]$/.test(nameB.charAt(0))

    // 如果都是中文，按拼音排序
    if (isChineseA && isChineseB) {
      return nameA.localeCompare(nameB, 'zh-CN', {
        sensitivity: 'base',
        numeric: true
      })
    }

    // 如果都是非中文，按字母排序
    if (!isChineseA && !isChineseB) {
      return nameA.localeCompare(nameB, 'en', {
        sensitivity: 'base',
        numeric: true
      })
    }

    // 中文和非中文混合情况，中文放在后面
    return isChineseA ? 1 : -1
  })
}

// ✨ 优化版：排序+首字母分组（A-Z/0-9/其他，中文按拼音首字母分组）
const groupContacts = (list) => {
  // 使用已有的 chinesePinyinFirstLetter 函数获取拼音首字母
  const getGroupKey = (name) => {
    const firstChar = name.charAt(0)

    // 判断是否为中文字符
    if (/^[\u4e00-\u9fa5]$/.test(firstChar)) {
      // 使用工具函数获取拼音首字母
      const pinyinLetter = chinesePinyinFirstLetter(firstChar)
      // 返回大写字母或默认为 #
      return /^[A-Z]$/.test(pinyinLetter) ? pinyinLetter : '#'
    }

    // 非中文：转大写后判断是否为字母/数字
    const upperChar = firstChar.toUpperCase()
    return /^[A-Z0-9]$/.test(upperChar) ? upperChar : '#'
  }

  // 先对联系人进行排序
  const sorted = sortContacts(list)

  // 构建分组
  const groups = {}
  sorted.forEach((item) => {
    const groupKey = getGroupKey(item.name)

    // 初始化分组并添加当前联系人
    if (!groups[groupKey]) {
      groups[groupKey] = []
    }
    groups[groupKey].push(item)
  })

  // 按组键排序：A-Z → 0-9 → #（最后）
  return Object.entries(groups).sort(([k1], [k2]) => {
    // '#' 总是在最后
    if (k1 === '#') return 1
    if (k2 === '#') return -1

    // 数字排在字母后面
    const k1IsNum = /^\d$/.test(k1)
    const k2IsNum = /^\d$/.test(k2)

    if (k1IsNum && !k2IsNum) return 1
    if (!k1IsNum && k2IsNum) return -1

    // 相同类型按字母顺序排序
    return k1.localeCompare(k2, 'zh-CN', { sensitivity: 'base' })
  })
}

// 测试：纯排序
console.table(sortContacts(contactList))
// 测试：排序+首字母分组
console.dir(groupContacts(contactList))

export { htmlToFragment, styleToSheet, parseBool, parsePixel, parseDuration, toCamelCase, hexToHsl, debounce, throttle, debounceRAF, uniqueId, UUID, random, sheet, chinesePinyinFirstLetter }
