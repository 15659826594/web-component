<template>
  <main>
    <div class="demo flex center" style="width: 100%">
      <div id="components-a-tooltip-demo-placement" style="width: 100%; height: var(--main-inner-height)">
        <div style="grid-area: tl">
          <wc-popup placement="top-left"></wc-popup>
        </div>
        <div style="grid-area: tr">
          <wc-popup placement="top-right"></wc-popup>
        </div>
        <div style="grid-area: bl">
          <wc-popup placement="bottom-left"></wc-popup>
        </div>
        <div style="grid-area: br">
          <wc-popup placement="bottom-right"></wc-popup>
        </div>
        <div class="flex m-center space-between" style="grid-area: top">
          <wc-popup placement="top-start" @change="change">
            <div slot="reference">
              <option value="Send mail" style="color: #464f60">Send mail</option>
              <option value="Archive" style="color: #aa5b00">Archive</option>
              <option value="Delete" style="color: #d1293d">Delete</option>
            </div>
          </wc-popup>
          <wc-popup placement="top" @change="change">
            <div slot="reference">
              <option v-for="item in items" :key="item.value" :value="item.value" :style="{ color: item.color }">{{ item.name }}</option>
            </div>
          </wc-popup>
          <wc-popup placement="top-end"></wc-popup>
        </div>
        <div class="flex col space-between" style="grid-area: left; align-items: end">
          <wc-popup placement="left-start"></wc-popup>
          <wc-popup placement="left"></wc-popup>
          <wc-popup placement="left-end"></wc-popup>
        </div>
        <div class="flex col space-between" style="grid-area: right; align-items: start">
          <wc-popup placement="right-start"></wc-popup>
          <wc-popup placement="right">
            <div slot="reference">
              <option v-for="item in items" :key="item.value" :value="item.value" :style="{ color: item.color }">{{ item.name }}</option>
            </div>
          </wc-popup>
          <wc-popup placement="right-end"></wc-popup>
        </div>
        <div class="flex space-between" style="grid-area: bottom">
          <wc-popup placement="bottom-start"></wc-popup>
          <wc-popup placement="bottom" fallback-placements="top"></wc-popup>
          <wc-popup placement="bottom-end"></wc-popup>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { reactive } from 'vue'
let items = reactive([
  {
    name: 'Edit',
    value: 'Edit'
  },
  {
    name: 'Send mail',
    value: 'Send mail'
  },
  {
    name: 'Details',
    value: 'Details'
  },
  {
    name: 'Archive',
    value: 'Archive',
    color: '#aa5b00'
  },
  {
    name: 'Delete',
    value: 'Delete',
    color: '#d1293d'
  }
])

const change = (e) => {
  console.log(e.target.value)
}
</script>

<style scoped lang="scss">
#components-a-tooltip-demo-placement,
#components-a-popover-demo-placement {
  display: inline-grid;
  place-items: center;
  grid-template-columns: repeat(3, 33.3%);
  grid-template-rows: repeat(3, 33.3%);
  grid-template-areas:
    'tl top tr'
    'left center right'
    'bl bottom br';
}
</style>
