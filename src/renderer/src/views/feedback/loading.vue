<template>
  <main>
    区域加载
    <table v-loading="loading" style="width: 100%">
      <thead>
        <tr v-if="tableData.length">
          <th v-for="key in Object.keys(tableData[0])" :key="key">{{ key }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.name">
          <td v-for="(val, key) in item" :key="key">{{ val }}</td>
        </tr>
      </tbody>
    </table>
    自定义加载中组件内容
    <table v-loading="loading" loading-text="Loading..." :loading-spinner="svg" loading-svg-view-box="-10, -10, 50, 50" loading-background="rgba(122, 122, 122, 0.8)" style="width: 100%">
      <thead>
        <tr v-if="tableData.length">
          <th v-for="key in Object.keys(tableData[0])" :key="key">{{ key }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.name">
          <td v-for="(val, key) in item" :key="key">{{ val }}</td>
        </tr>
      </tbody>
    </table>
    <table v-loading="loading" loading-text="加载中..." loading-custom-class="ios-preloader-spin" :loading-svg="svg2" loading-svg-view-box="0 0 400 400" style="width: 100%">
      <thead>
        <tr v-if="tableData.length">
          <th v-for="key in Object.keys(tableData[0])" :key="key">{{ key }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in tableData" :key="item.name">
          <td v-for="(val, key) in item" :key="key">{{ val }}</td>
        </tr>
      </tbody>
    </table>
    <button role="button" class="color-primary" style="margin: 0.6rem" @click="loading = !loading">加载完成</button>
    <br />
    让加载组件铺满整个屏幕
    <div class="flex" style="gap: 0 2rem">
      <button v-loading.fullscreen.lock="fullscreenLoading" role="button" class="color-primary" @click="openFullScreen1">As a directive</button>
      <button role="button" class="color-primary" @click="openFullScreen2">As a directive</button>
    </div>
  </main>
</template>
<script setup>
import { Loading } from '@src/components/web/dialog'
import { ref } from 'vue'
let loading = ref(true),
  fullscreenLoading = ref(false)

const svg = `
  <path class="path" d="
    M 30 15
    L 28 17
    M 25.61 25.61
    A 15 15, 0, 0, 1, 15 30
    A 15 15, 0, 1, 1, 27.99 7.5
    L 15 15
  " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`
const svg2 = `<defs>
    <rect id="petal" x="44.2%" y="0"  width="11.6%" height="33.33%" rx="5.8%" ry="5.8%" fill="currentColor"/>
  </defs>
  <use href="#petal" opacity="0.27"/>
  <use href="#petal" opacity="0.35285714" transform="rotate(45, 200 ,200)"/>
  <use href="#petal" opacity="0.43571429" transform="rotate(90, 200 ,200)"/>
  <use href="#petal" opacity="0.51857143" transform="rotate(135, 200 ,200)"/>
  <use href="#petal" opacity="0.60142857" transform="rotate(180, 200 ,200)"/>
  <use href="#petal" opacity="0.68428571" transform="rotate(225, 200 ,200)"/>
  <use href="#petal" opacity="0.76714286" transform="rotate(270, 200 ,200)"/>
  <use href="#petal" opacity="0.85" transform="rotate(315, 200 ,200)"/>`
const tableData = [
  {
    date: '2016-05-02',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
  },
  {
    date: '2016-05-04',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
  },
  {
    date: '2016-05-01',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
  }
]

const openFullScreen1 = () => {
  fullscreenLoading.value = true
  setTimeout(() => {
    fullscreenLoading.value = false
  }, 2000)
}

const openFullScreen2 = () => {
  const loading = Loading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
  setTimeout(() => {
    loading.close()
  }, 2000)
}
</script>

<style scoped lang="scss">
table {
  min-height: 16rem;
  thead {
    th::first-letter {
      text-transform: uppercase;
    }
  }
}
</style>
