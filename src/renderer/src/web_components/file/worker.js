import { createChunk } from './index'

onmessage = async (e) => {
  const { file, CHUNK_SIZE, start, end } = e.data
  const result = []
  for (let i = start; i < end; i++) {
    const prom = createChunk(file, i, CHUNK_SIZE)
    result.push(prom)
  }
  const chunks = await Promise.all(result)
  postMessage(chunks)
}
