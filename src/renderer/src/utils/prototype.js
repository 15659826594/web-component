// 移除文件后缀名
String.prototype.removeExt = function () {
  return this.replace(/\.[^/.]+$/, '')
}
// 字符串转为下划线命名法
String.prototype.snakeCase = function () {
  return this.replace(/\s+/g, '_')
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase()
    .replace(/^_+|_+$/g, '')
}
// 字符串转为驼峰命名法
String.prototype.camelCase = function () {
  return this.replace(/[_\s-]+(\w)/g, (_, letter) => letter.toUpperCase()).replace(/^\w/, (word) => word.toLowerCase())
}
// 字符串转为帕斯卡命名法
String.prototype.pascalCase = function () {
  return this.camelCase().ucFirst()
}
// 移除前缀
String.prototype.trimPrefix = function (prefix) {
  if (this.startsWith(prefix)) {
    return this.slice(prefix.length)
  }
  return this
}
// 字符串某字母转为大写
String.prototype.ucFirst = function () {
  if (this !== '') {
    return this[0].toUpperCase() + this.slice(1)
  }
  return this
}
// 获取文件名(不含路径)
String.prototype.filepathBase = function () {
  const index = this.lastIndexOf('/')
  if (index !== -1) {
    return this.slice(index + 1)
  }
  return this
}
// 获取码点数量
String.prototype.pointLength = function () {
  let len = 0
  for (let i = 0; i < this.length; ) {
    len++
    let point = this.codePointAt(i)
    i += point > 0xffff ? 2 : 1
  }
  return len
}
// 获取对应下标的码点
String.prototype.pointAt = function (index) {
  let curIndex = 0
  for (let i = 0; i < this.length; ) {
    if (curIndex === index) {
      let point = this.codePointAt(i)
      return String.fromCodePoint(point)
    }
    curIndex++
    let point = this.codePointAt(i)
    i += point > 0xffff ? 2 : 1
  }
  return undefined
}
// 字符串码点截取
String.prototype.pointSlice = function (start, end) {
  let result = '',
    len = this.pointLength()
  if (!end) end = len
  for (let i = start; i < len && i < end; i++) {
    result += this.pointAt(i)
  }
  return result
}

Object.defineProperty(HTMLFormElement.prototype, 'formData', {
  get: function () {
    const formData = new FormData(this)
    const result = {}
    formData.forEach((value, key) => {
      result[key] = result[key] ? (Array.isArray(result[key]) ? [...result[key], value] : [result[key], value]) : value
    })
    return result
  },
  enumerable: true
})
