<template>
  <main>
    <form style="gap: 2rem 0" @submit="submit">
      <div class="flex flex-wrap c-start" style="gap: 0 2rem">
        <wc-select name="wc-select-multiple" placeholder="请选择" style="width: 23rem; --max-tag-width: 3rem" size="2" multiple required>
          <option v-for="(item, index) in items" :key="index" :value="item.value" :selected="itemCurrents.includes(item.value)" @click="itemCurrents.includes(item.value) ? itemCurrents.splice(itemCurrents.indexOf(item.value), 1) : itemCurrents.push(item.value)">
            {{ item.name }}
          </option>
          <option>Custom</option>
        </wc-select>
        <wc-select name="wc-select-one" required placeholder="请选择">
          <option v-for="(item, index) in items" :key="index" :value="item.value" :selected="itemCurrent === item.value" @click="itemCurrent = itemCurrent === item.value ? '' : item.value">
            {{ item.name }}
          </option>
          <option>Custom</option>
        </wc-select>
        <wc-picker mode="time"></wc-picker>
        <wc-picker name="wc-picker-date" mode="date" value="2026/07/09"></wc-picker>
      </div>
      <div class="components flex" style="gap: 0 1.6rem">
        <wc-select placeholder="Options">
          <option v-for="i in array" :key="i" :value="i">{{ i }}</option>
        </wc-select>
        <wc-select placeholder="Options" disabled>
          <option v-for="i in array" :key="i" :value="i">{{ i }}</option>
        </wc-select>
        <wc-select placeholder="Select..." arrow="up-down">
          <option v-for="i in array" :key="i" :value="i" :selected="i === '3 months'">{{ i }}</option>
        </wc-select>
        <wc-select placeholder="Select..." arrow="up-down" disabled>
          <option v-for="i in array" :key="i" :value="i" :selected="i === '3 months'">{{ i }}</option>
        </wc-select>
      </div>
      <button role="button" type="submit">提交</button>
    </form>
    {{ socketStore.readyState }}
    <textarea v-model="text" placeholder="Write here..." role="textarea"></textarea>
<!--    <textarea v-model="text" placeholder="Write here..." disabled role="textarea"></textarea>-->
    <button @click="socketStore.emit('hello', 'world')">发送</button>
  </main>
  <footer class="fixed">
    <span>Alvish Baldha</span>
    <span>© 2022 | All Rights Reserved</span>
  </footer>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useSocketIO } from '@src/store'

let socketStore = useSocketIO(),
  text = ref('')

let itemCurrent = ref('FRA'),
  itemCurrents = ref(['CHN', 'BRA']),
  items = [
    {
      value: 'CHN',
      name: '中国'
    },
    {
      value: 'USA',
      name: '美国'
    },
    {
      value: 'BRA',
      name: '巴西'
    },
    {
      value: 'JPN',
      name: '日本'
    },
    {
      value: 'ENG',
      name: '英国'
    },
    {
      value: 'FRA',
      name: '法国'
    }
  ],
  array = reactive(['15 days', '1 month', '1-2 months', '3 months', '4-6 months', '1 year'])

function openWin() {
  window.electron.ipcRenderer.send('modal', {
    path: '/project/add',
    width: 440,
    height: 644,
    autoHideMenuBar: true,
    frame: false,
    resizable: false,
    modal: true
  })
}

function submit(event) {
  event.stopPropagation()
  event.preventDefault()
  if (event.submitter.getAttribute('type') !== 'submit') return
  let result = event.target.formData
  console.log(result)
  // alert(JSON.stringify(result))
}
</script>

<style lang="scss" scoped></style>
