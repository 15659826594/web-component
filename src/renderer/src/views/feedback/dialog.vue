<template>
  <main>
    <p>基础用法</p>
    <button role="button" @click="dialogVisible.showModal">Click to open the Dialog</button>
    <p>自定义内容</p>
    <div class="flex" style="gap: 2rem">
      <button role="button" @click="dialogTableVisible.showModal">Open a Table nested Dialog</button>
      <button role="button" @click="dialogFormVisible.showModal">Open a Form nested Dialog</button>
    </div>
    <p>自定义头部</p>
    <button role="button" @click="visible.showModal">Open Dialog with customized header</button>
    <p>嵌套的对话框</p>
    <button role="button" @click="outerVisible.showModal">Open the outer Dialog</button>
  </main>
  <dialog ref="dialogVisible" role="dialog" title="Tips" style="width: 50rem; margin-top: 15vh" @before-close="handleClose">
    <main>This is a message</main>
    <footer>
      <button role="button" @click="dialogVisible.close">Cancel</button>
      <button role="button" class="color-primary" @click="dialogVisible.close">Confirm</button>
    </footer>
  </dialog>
  <dialog ref="dialogTableVisible" role="dialog" title="Shipping address" style="width: 80rem; margin-top: 15vh">
    <main>
      <table v-if="gridData.length">
        <thead>
          <tr>
            <th v-for="key in Object.keys(gridData[0])" :key="key">{{ key }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(key, index) in gridData" :key="index">
            <td>{{ key.date }}</td>
            <td>{{ key.name }}</td>
            <td>{{ key.address }}</td>
          </tr>
        </tbody>
      </table>
    </main>
  </dialog>
  <dialog ref="dialogFormVisible" role="dialog" title="Shipping address" style="width: 50rem; margin-top: 15vh">
    <main>
      <form>
        <label>Promotion name <input role="input" /> </label>
        <label>Zones <input role="input" /> </label>
      </form>
    </main>
    <footer>
      <button role="button" @click="dialogFormVisible.close">Cancel</button>
      <button role="button" class="color-primary" @click="dialogFormVisible.close">Confirm</button>
    </footer>
  </dialog>
  <dialog ref="visible" role="dialog" style="width: 50rem; margin-top: 15vh">
    <header role="header">
      <h4 style="margin: 0">This is a custom header!</h4>
      <button role="close" @click="visible.close"></button>
    </header>
    <main>This is dialog content.</main>
  </dialog>
  <dialog ref="outerVisible" role="dialog" title="Outer Dialog" style="width: 80rem; margin-top: 15vh">
    <main>
      <span>This is the outer Dialog</span>
    </main>
    <footer>
      <button role="button" @click="outerVisible.close">Cancel</button>
      <button role="button" class="color-primary" @click="innerVisible.showModal">Open the inner Dialog</button>
    </footer>
  </dialog>
  <dialog ref="innerVisible" role="dialog" title="Inner Dialog" style="width: 50rem; margin-top: 15vh">
    <main>
      <span>This is the inner Dialog</span>
    </main>
  </dialog>
</template>
<script setup>
import { MessageBox } from '@src/web_components/dialog'
import { ref, reactive } from 'vue'

let dialogVisible = ref(),
  dialogTableVisible = ref(),
  dialogFormVisible = ref(),
  visible = ref(),
  outerVisible = ref(),
  innerVisible = ref()

const handleClose = (done = () => {}) => {
  MessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {})
}

const gridData = [
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
  },
  {
    date: '2016-05-03',
    name: 'John Smith',
    address: 'No.1518,  Jinshajiang Road, Putuo District'
  }
]
</script>

<style scoped lang="scss"></style>
