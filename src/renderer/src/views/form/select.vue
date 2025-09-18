<template>
  <main>
    <p>基础用法</p>
    <select role="select">
      <option value="Option1">Option1</option>
      <option value="Option2">Option2</option>
      <option value="Option3">Option3</option>
      <option value="Option4">Option4</option>
      <option value="Option5">Option5</option>
    </select>
    <p>有禁用选项</p>
    <select role="select">
      <option value="Option1">Option1</option>
      <option value="Option2" disabled>Option2</option>
      <option value="Option3">Option3</option>
      <option value="Option4">Option4</option>
      <option value="Option5">Option5</option>
    </select>
    <p>禁用状态</p>
    <select role="select" disabled>
      <option value="Option1">Option1</option>
      <option value="Option2">Option2</option>
      <option value="Option3">Option3</option>
      <option value="Option4">Option4</option>
      <option value="Option5">Option5</option>
    </select>
    <p>HTML 片段作为正文内容</p>
    <select role="select">
      <option value="">Select</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value" v-html="opt.label"></option>
    </select>
    <p>WebComponents 组件 disabled</p>
    <wc-select disabled>
      <option value="Option1">Option1</option>
      <option value="Option2">Option2</option>
      <option value="Option3">Option3</option>
      <option value="Option4">Option4</option>
      <option value="Option5">Option5</option>
    </wc-select>
    <p>WebComponents 组件在form表单中的表现，value: {{ selectedOption }}</p>
    <form style="background-color: var(--info-0); border-radius: var(--radius); padding: 1.6rem" @submit="submit">
      <p style="margin-top: 0">原生select</p>
      <select v-model="selectedOption" name="select" role="select">
        <option value="">空字符串</option>
        <option value="Option1">Option1</option>
        <option value="Option2">Option2</option>
        <option value="Option3">Option3</option>
      </select>
      <p>web-component select 必填</p>
      <wc-select v-model="selectedOption" name="wc-select" placeholder="Select" required>
        <option value="">空字符串</option>
        <option value="Option1">Option1</option>
        <option value="Option2">Option2</option>
        <option value="Option3">Option3</option>
      </wc-select>
      <p>web-component select 非必填</p>
      <wc-select v-model="selectedOption" name="wc-select-1" placeholder="Select">
        <option value="Option1">Option1</option>
        <option value="Option2" disabled>Option2</option>
        <option value="Option3" selected>Option3</option>
        <option>option: value默认值DOMString</option>
        <option value="Option5">Option5</option>
      </wc-select>
      <p></p>
      <button role="button" type="submit">提交</button>
    </form>
  </main>
</template>
<script setup>
import { ref } from 'vue'
let selectedOption = ref('Option1')

const options = [
  {
    value: 'cat',
    label: '<span class="icon" aria-hidden="true">🐱</span><span class="option-label">Cat</span>'
  },
  {
    value: 'dog',
    label: '<span class="icon" aria-hidden="true">🐶</span><span class="option-label">Dog</span>'
  },
  {
    value: 'hamster',
    label: '<span class="icon" aria-hidden="true">🐹</span><span class="option-label">Hamster</span>'
  },
  {
    value: 'chicken',
    label: '<span class="icon" aria-hidden="true">🐔</span><span class="option-label">Chicken</span>'
  },
  {
    value: 'fish',
    label: '<span class="icon" aria-hidden="true">🐟</span><span class="option-label">Fish</span>'
  },
  {
    value: 'snake',
    label: '<span class="icon" aria-hidden="true">🐍</span><span class="option-label">Snake</span>'
  }
]

const submit = (e) => {
  console.log(e.currentTarget.formData)
  e.preventDefault()
}
</script>

<style scoped lang="scss">
select,
wc-select {
  min-width: 24rem;
}
</style>
