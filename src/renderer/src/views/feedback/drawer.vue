<template>
  <main>
    <p>基础用法</p>
    <div class="flex" style="gap: 2rem">
      <form class="flex c-center" style="gap: 2rem" @change="directionChange">
        <label> <input role="radio" type="radio" name="direction" value="ltr" :checked="direction === 'ltr'" />left to right</label>
        <label> <input role="radio" type="radio" name="direction" value="rtl" :checked="direction === 'rtl'" />right to left</label>
        <label> <input role="radio" type="radio" name="direction" value="ttb" :checked="direction === 'ttb'" />top to bottom</label>
        <label> <input role="radio" type="radio" name="direction" value="btt" :checked="direction === 'btt'" />bottom to top</label>
      </form>
      <button role="button" class="color-primary" @click="drawer.showModal()">open</button>
      <button role="button" class="color-primary" @click="drawer2.showModal()">with footer</button>
    </div>
    <p>不添加 Title</p>
    <button role="button" class="color-primary" @click="drawer3.showModal()">open</button>
    <p>自定义内容</p>
    <div class="flex c-center" style="gap: 2rem">
      <button role="button" @click="drawer4.showModal()">Open Drawer with nested table</button>
      <button role="button" @click="drawer5.showModal()">Open Drawer with nested form</button>
    </div>
    <p>自定义头部</p>
    <button role="button" @click="drawer6.showModal()">Open Drawer with customized header</button>
    <p>嵌套抽屉</p>
    <button role="button" class="color-primary" @click="drawer7.showModal()">open</button>
  </main>
  <dialog ref="drawer" role="drawer" title="I am the title" :direction="direction">
    <main>
      <span>Hi, there!</span>
    </main>
  </dialog>
  <dialog ref="drawer2" role="drawer" title="I am the title" :direction="direction">
    <main>
      <span>Hi, there!</span>
    </main>
    <footer>
      <button role="button" @click="cancelClick">cancel</button>
      <button role="button" class="color-primary" @click="confirmClick">confirm</button>
    </footer>
  </dialog>
  <dialog ref="drawer3" role="drawer" title="I am the title" with-header="false">
    <main><span>Hi there!</span></main>
  </dialog>
  <dialog ref="drawer4" role="drawer" title="I have a nested table inside!" style="width: 50%">
    <main>
      <table v-if="gridData.length">
        <thead>
          <tr>
            <td v-for="(_, key) in gridData[0]" :key="key">{{ key }}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in gridData" :key="index">
            <td v-for="(val, key) in row" :key="key">{{ val }}</td>
          </tr>
        </tbody>
      </table>
    </main>
  </dialog>
  <dialog ref="drawer5" role="drawer" title="I have a nested form inside!" direction="ltr">
    <main>
      <form>
        <label> <input type="radio" role="radio" name="option" value="Option 1" /> Option 1 </label>
        <label> <input type="radio" role="radio" name="option" value="Option 1" /> Option 2 </label>
      </form>
    </main>
  </dialog>
  <!--  自定义头部-->
  <dialog ref="drawer6" role="drawer" show-close="false">
    <header role="header" class="flex align-items-center justify-content-space-between">
      <h4 style="margin: 0">This is a custom header!</h4>
      <button role="button icon" class="color-error dt3_error" @click="drawer6.close()">Close</button>
    </header>
    <main>This is drawer content.</main>
  </dialog>
  <!--  嵌套抽屉-->
  <dialog ref="drawer7" role="drawer" title="I'm outer Drawer" style="width: 50%">
    <main>
      <div>
        <button role="button" @click="innerDrawer.showModal()">Click me!</button>
      </div>
    </main>
  </dialog>
  <dialog ref="innerDrawer" role="drawer" title="I'm inner Drawer">
    <main><p>_(:зゝ∠)_</p></main>
  </dialog>
</template>
<script setup>
import { ref } from 'vue'

let drawer = ref(null),
  drawer2 = ref(null),
  drawer3 = ref(null),
  drawer4 = ref(null),
  drawer5 = ref(null),
  drawer6 = ref(null),
  drawer7 = ref(null),
  innerDrawer = ref(null),
  direction = ref('rtl'),
  gridData = [
    {
      date: '2016-05-02',
      name: 'Peter Parker',
      address: 'Queens, New York City'
    },
    {
      date: '2016-05-04',
      name: 'Peter Parker',
      address: 'Queens, New York City'
    },
    {
      date: '2016-05-01',
      name: 'Peter Parker',
      address: 'Queens, New York City'
    },
    {
      date: '2016-05-03',
      name: 'Peter Parker',
      address: 'Queens, New York City'
    }
  ]

function directionChange(e) {
  direction.value = e.target.value
}
function cancelClick() {
  drawer2.value.close()
}
function confirmClick() {
  drawer2.value.close()
}
</script>

<style scoped lang="scss"></style>
