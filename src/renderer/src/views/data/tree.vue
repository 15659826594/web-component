<template>
  <main>
    <p>基础用法</p>
    <menu role="tree">
      <li>Project name</li>
      <details :name="leave1">
        <summary>Project manager</summary>
        <menu>
          <li>All</li>
          <li>Leo Gouse</li>
          <li>Roger Vaccaro</li>
          <li>Tatiana Dias</li>
        </menu>
      </details>
      <li>Last update</li>
      <details :name="leave1">
        <summary>Resources</summary>
        <menu>
          <li>All</li>
          <li>UX/UI Design</li>
          <li>Frontend</li>
          <li>Backend</li>
          <li>Full Stack</li>
          <li>Graphic Designer</li>
          <li>Web Designer</li>
          <li>QA</li>
        </menu>
      </details>
      <li>Estimation</li>
    </menu>
  </main>
</template>
<script setup>
import { ref, useId } from 'vue'

let leave1 = ref(useId())
</script>

<style scoped lang="scss">
[role='tree'] {
  --level-padding: 0;
  display: inline-block;
  margin: 0;
  color: var(--info-700);
  user-select: none;
  padding: 0.8rem 0.6rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow-m);
  background-color: var(--color-background);
  details + details,
  details + li,
  li + details,
  summary + menu,
  summary + li,
  li + li {
    margin-top: 1px;
  }
  li,
  summary {
    min-width: 18.8rem;
    box-sizing: border-box;
    font-size: 1.4rem;
    line-height: 2rem;
    padding: 0.4rem 1rem;
    border-radius: var(--radius-300);
    &:hover {
      background-color: var(--primary-0);
    }
  }
  li,
  menu,
  summary {
    list-style: none;
  }
  summary {
    position: relative;
    cursor: pointer;
    padding-right: 3.4rem;
    &::before {
      font-family: 'data-table', serif !important;
      content: '\e738';
      position: absolute;
      color: var(--info-400);
      inset: 0.6rem 1rem 0.6rem auto;
      display: block;
      width: 1.6rem;
      height: 1.6rem;
      line-height: 1.6rem;
      text-align: center;
      transition: rotate 300ms;
    }
    & + menu {
      padding-left: var(--level-padding);
    }
  }
  details {
    & > li {
      padding-left: calc(var(--level-padding) + 1rem);
    }
    &::details-content {
      height: 0;
      display: flow-root !important;
      transition: height 200ms;
      content-visibility: visible;
      overflow: hidden;
    }
    &[open] {
      & > summary::before {
        rotate: 90deg;
      }
      &::details-content {
        height: calc-size(auto, size);
      }
    }
  }
}
</style>
