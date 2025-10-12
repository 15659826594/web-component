<template>
  <main>
    <p>顶部导航</p>
    <wc-menubar ref="vertical" mode="vertical"></wc-menubar>
    <br />
    <wc-menubar ref="dark" mode="vertical" class="color-dark" trigger="click"></wc-menubar>
    <br />
    <wc-menubar ref="inline" mode="inline"></wc-menubar>
    <br />
    <wc-menubar ref="inline" mode="inline" unique></wc-menubar>
    <br />
    <wc-menubar ref="horizontal" mode="horizontal"></wc-menubar>
  </main>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import pages from '@src/pages.json'
const { list } = pages.tabBar
let inline = ref(null),
  vertical = ref(null),
  dark = ref(null),
  horizontal = ref(null)
onMounted(() => {
  inline.value.render(list)
  vertical.value.render(list)
  dark.value.render(list)
  horizontal.value.render(list)
})
</script>

<style></style>

<style scoped lang="scss"></style>
