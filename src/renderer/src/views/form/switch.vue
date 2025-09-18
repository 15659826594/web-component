<template>
  <main style="padding: 2rem">
    <div class="flex col" style="gap: 2rem">
      <label>单选<input role="switch" type="radio" name="switch-radio" /> <input role="switch" type="radio" name="switch-radio" /></label>
      <label>自定义颜色<input role="switch" type="checkbox" style="--switch-on-color: red; --switch-off-color: green" /></label>
      <label>多选<input role="switch" type="checkbox" /></label>
      <label>未选中 禁用状态<input role="switch" type="checkbox" disabled /></label>
      <label>选中 禁用状态<input role="switch" type="checkbox" checked disabled /></label>
    </div>
  </main>
</template>
<script setup></script>
<style scoped lang="scss"></style>
