<template>
  <main>
    单个折叠(网格布局实现高度过渡)
    <button role="button" @click="calcSize.toggleAttribute('open')">折叠</button>
    <div ref="calcSize" class="calc-size">
      <div class="content">Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to; Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.</div>
    </div>
    单个折叠
    <details role="collapse">
      <summary>Consistency</summary>
      <main>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to; Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.</main>
    </details>
    折叠面板
    <div class="collapse-group">
      <details role="collapse">
        <summary>Consistency</summary>
        <main>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to; Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.</main>
      </details>
      <details role="collapse">
        <summary>Feedback</summary>
        <main>Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects; Visual feedback: reflect current state by updating or rearranging elements of the page.</main>
      </details>
      <details role="collapse">
        <summary>Efficiency</summary>
        <main>Simplify the process: keep operating process simple and intuitive; Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make decisions; Easy to identify: the interface should be straightforward, which helps the users to identify and frees them from memorizing and recalling.</main>
      </details>
      <details role="collapse">
        <summary>Controllability</summary>
        <main>Decision making: giving advices about operations is acceptable, but do not make decisions for the users; Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or terminating current operation.</main>
      </details>
    </div>
    手风琴效果
    <div class="collapse-group collapse-icon-position-right">
      <details role="collapse" name="collapse">
        <summary>Consistency</summary>
        <main>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to; Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.</main>
      </details>
      <details role="collapse" name="collapse">
        <summary>Feedback</summary>
        <main>Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects; Visual feedback: reflect current state by updating or rearranging elements of the page.</main>
      </details>
      <details role="collapse" name="collapse">
        <summary>Efficiency</summary>
        <main>Simplify the process: keep operating process simple and intuitive; Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make decisions; Easy to identify: the interface should be straightforward, which helps the users to identify and frees them from memorizing and recalling.</main>
      </details>
      <details role="collapse" name="collapse" disabled>
        <summary>Controllability</summary>
        <main>Decision making: giving advices about operations is acceptable, but do not make decisions for the users; Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or terminating current operation.</main>
      </details>
    </div>
  </main>
</template>
<script setup>
import { ref } from 'vue'

let calcSize = ref()
</script>
<style scoped lang="scss"></style>
