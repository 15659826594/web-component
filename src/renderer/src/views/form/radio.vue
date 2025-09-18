<template>
  <main>
    <p>基础用法</p>
    <div class="flex" style="gap: 2rem">
      <label><input role="radio" type="radio" value="1" checked :name="group" />Option 1</label>
      <label><input role="radio" type="radio" value="1" :name="group" />Option 2</label>
    </div>
    <p>禁用状态</p>
    <div class="flex" style="gap: 2rem">
      <label><input role="radio" type="radio" value="disabled" disabled />Option A</label>
      <label><input role="radio" type="radio" value="selected and disabled" checked disabled />Option B</label>
    </div>
    <p>单选框组</p>
    <div class="flex" style="gap: 2rem">
      <label><input role="radio" type="radio" value="3" checked :name="group2" />Option A</label>
      <label><input role="radio" type="radio" value="6" :name="group2" />Option B</label>
      <label><input role="radio" type="radio" value="9" :name="group2" />Option C</label>
    </div>
    <p>按钮样式</p>
    <div class="flex" style="gap: 3rem">
      <input v-for="city in cities" :key="city" role="button" type="radio" :name="group3" :label="city" :value="city" />
      <input role="button" type="radio" label="disabled" value="disabled" :name="group3" disabled />
      <input role="button" type="radio" label="disabled" value="disabled" :name="group3" checked disabled />
    </div>
    <br />
    <div class="flex" style="gap: 3rem">
      <label v-for="city in cities" :key="city" role="button"><input type="radio" :value="city" :name="group4" />{{ city }}</label>
      <label role="button"><input type="radio" value="disabled" disabled :name="group4" />disabled</label>
      <label role="button"><input type="radio" value="disabled" checked disabled :name="group4" />disabled</label>
    </div>
  </main>
</template>
<script setup>
import { useId } from 'vue'

let group = 'name-' + useId(),
  group2 = 'name-' + useId(),
  group3 = 'name-' + useId(),
  group4 = 'name-' + useId()

const cities = ['New York', 'Washington', 'Los Angeles', 'Chicago']
</script>
<style scoped lang="scss"></style>
