import SparkMD5 from 'spark-md5'
import Worker from './worker.js?worker'
/**
 * 每个文件块的大小 (5MB)
 * @type {number}
 */
const CHUNK_SIZE = 1024 * 1024 * 5
/**
 * 并行处理的线程数量，默认使用硬件并发核心数或4
 * @type {number}
 */
const THREAD_COUNT = navigator.hardwareConcurrency || 4
/**
 * 将文件切割成多个块并计算每个块的MD5哈希值
 * @param {File} file - 要切割的文件对象
 * @param {number} [chunkSize=CHUNK_SIZE] - 每个块的大小，默认为5MB
 * @returns {Promise<Array>} 返回包含所有文件块信息的Promise数组
 * @example
 * const chunks = await cutFile(file, 1024 * 1024 * 2); // 按2MB切割文件
 */
async function cutFile(file, chunkSize = CHUNK_SIZE) {
  const chunkCount = Math.ceil(file.size / chunkSize)
  const result = []
  for (let i = 0; i < chunkCount; i++) {
    const prom = createChunk(file, i, chunkSize)
    result.push(prom)
  }
  return await Promise.all(result)
}
/**
 * 使用多线程将文件切割成多个块并计算每个块的MD5哈希值
 * @param {File} file - 要切割的文件对象
 * @param {number} [chunkSize=CHUNK_SIZE] - 每个块的大小，默认为5MB
 * @param {number} [threadCount=THREAD_COUNT] - 使用的线程数量，默认为硬件并发核心数或4
 * @returns {Promise<Array>} 返回包含所有文件块信息的Promise数组
 * @example
 * const chunks = await cutFileThread(file, 1024 * 1024 * 2, 8); // 按2MB切割文件，使用8个线程
 */
async function cutFileThread(file, chunkSize = CHUNK_SIZE, threadCount = THREAD_COUNT) {
  return new Promise((resolve) => {
    const chunkCount = Math.ceil(file.size / chunkSize)
    const threadChunkCount = Math.ceil(chunkCount / threadCount)
    const result = []
    let finishCount = 0
    for (let i = 0; i < threadCount; i++) {
      const worker = new Worker()
      const start = i * threadChunkCount
      let end = (i + 1) * threadChunkCount
      if (end > chunkCount) end = chunkCount
      worker.postMessage({
        file,
        start,
        end,
        CHUNK_SIZE: chunkSize
      })
      worker.onmessage = (e) => {
        result[i] = e.data
        worker.terminate()
        finishCount++
        if (finishCount === threadCount) {
          resolve(result.flat())
        }
      }
    }
  })
}
/**
 * 创建文件块并计算其MD5哈希值
 * @param {File} file - 源文件对象
 * @param {number} index - 块索引
 * @param {number} chunkSize - 块大小
 * @returns {Promise<Object>} 返回包含块信息的Promise对象
 * @example
 * const chunk = await createChunk(file, 0, 1024 * 1024); // 创建文件的第一个1MB块
 */
function createChunk(file, index, chunkSize) {
  return new Promise((resolve) => {
    const start = index * chunkSize,
      spark = new SparkMD5.ArrayBuffer(),
      fileReader = new FileReader()
    let end = start + chunkSize,
      blob = file.slice(start, end)
    fileReader.onload = (e) => {
      spark.append(e.target.result)
      if (blob.size !== chunkSize) {
        end = start + blob.size
      }
      resolve({
        start,
        end,
        index,
        hash: spark.end(),
        blob
      })
    }
    fileReader.readAsArrayBuffer(blob)
  })
}
export { cutFile, createChunk, cutFileThread }
