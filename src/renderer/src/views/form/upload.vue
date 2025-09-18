<template>
  <main>
    <p>基础用法</p>
    <input type="file" @change="upload" />
  </main>
</template>
<script setup>
import { cutFile, cutFileThread } from '@src/web_components/file'

const upload = async (e) => {
  const file = e.target.files[0]
  console.log(file.size)
  console.time('cutFile')
  const chunk = await cutFile(file)
  console.timeEnd('cutFile')
  console.log(chunk)

  console.time('cutFileThread')
  const chunks = await cutFileThread(file)
  console.timeEnd('cutFileThread')
  console.log(chunks)
}
</script>

<style scoped lang="scss"></style>
