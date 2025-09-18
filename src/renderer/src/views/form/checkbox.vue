<template>
  <main>
    <p>基础用法</p>
    <div class="flex" style="gap: 2rem">
      <label><input role="checkbox" type="checkbox" />Option 1</label>
      <label><input role="checkbox" type="checkbox" />Option 2</label>
    </div>
    <p>禁用状态</p>
    <div class="flex" style="gap: 2rem">
      <label><input role="checkbox" type="checkbox" disabled />Disabled</label>
      <label><input role="checkbox" type="checkbox" />Not disabled</label>
    </div>
    <p>多选框组</p>
    <div class="flex" style="gap: 2rem">
      <label><input role="checkbox" type="checkbox" value="Value A" :name="group" />Option A</label>
      <label><input role="checkbox" type="checkbox" value="Value B" :name="group" />Option B</label>
      <label><input role="checkbox" type="checkbox" value="Value C" :name="group" />Option C</label>
      <label><input role="checkbox" type="checkbox" value="Value disabled" :name="group" disabled />disabled</label>
      <label><input role="checkbox" type="checkbox" value="Value selected and disabled" :name="group" checked disabled />selected and disabled</label>
    </div>
    <p>中间状态</p>
    <div class="flex col" style="gap: 2rem">
      <label><input ref="indeterminateRef" role="checkbox" type="checkbox" :checked="checkAll" @change="handleCheckAllChange" />Check all</label>
      <div class="flex" style="gap: 2rem" @change="handleCheckedCitiesChange">
        <label v-for="city in cities" :key="city">
          <input role="checkbox" type="checkbox" :value="city" :name="group2" :checked="checkedCities.includes(city)" />
          {{ city }}
        </label>
      </div>
    </div>
    <p>按钮样式</p>
    <div class="flex" style="gap: 3rem">
      <input v-for="city in cities" :key="city" role="button" type="checkbox" :label="city" :value="city" />
      <input role="button" type="checkbox" label="disabled" value="disabled" disabled />
      <input role="button" type="checkbox" label="disabled" value="disabled" checked disabled />
    </div>
    <br />
    <div class="flex" style="gap: 3rem">
      <label v-for="city in cities" :key="city" role="button"><input type="checkbox" :value="city" />{{ city }}</label>
      <label role="button"><input type="checkbox" value="disabled" disabled />disabled</label>
      <label role="button"><input type="checkbox" value="disabled" checked disabled />disabled</label>
    </div>
  </main>
</template>
<script setup>
import { onMounted, ref, useId, watchEffect } from 'vue'

let group = 'name-' + useId(),
  group2 = 'name-' + useId()

const indeterminateRef = ref()
const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedCities = ref(['Shanghai', 'Beijing'])
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']

const handleCheckAllChange = (val) => {
  checkedCities.value = val.currentTarget.checked ? cities : []
  isIndeterminate.value = false
}

const handleCheckedCitiesChange = (value) => {
  let newVal = []
  value.currentTarget.querySelectorAll('input[type=checkbox]:checked').forEach((checkbox) => {
    newVal.push(checkbox.value)
  })
  checkedCities.value = newVal

  const checkedCount = newVal.length
  checkAll.value = checkedCount === cities.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
}

watchEffect(() => {
  if (!indeterminateRef.value) return
  indeterminateRef.value.indeterminate = isIndeterminate.value
})

onMounted(() => {
  checkAll.value = checkedCities.value.length === cities.length
})
</script>
<style scoped lang="scss"></style>
