<template>
  <main>
    <p>基础用法</p>
    <menu role="dropdown">
      <li>Project name</li>
      <details trigger="click" :style="{ '--anchor-name': '--' + useId() }">
        <summary>Project manager</summary>
        <menu tabindex="0">
          <li>All</li>
          <li>Leo Gouse</li>
          <li>Roger Vaccaro</li>
          <li>Tatiana Dias</li>
        </menu>
      </details>
      <li>Last update</li>
      <details trigger="hover" :style="{ '--anchor-name': '--' + useId() }">
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
import { useId } from 'vue'
</script>

<style scoped lang="scss">
[role='dropdown'] {
  --level-padding: 0;
  display: inline-block;
  margin: 0;
  color: var(--info-700);
  user-select: none;
  padding: 0.8rem 0.6rem;
  border-radius: var(--radius);
  box-shadow: var(--shadow-m);
  background-color: var(--color-background);
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
    & > summary {
      anchor-name: var(--anchor-name);
      &::after {
        content: '';
        position: absolute;
        inset: 0 -1.2rem;
      }
    }
    & > li {
      padding-left: calc(var(--level-padding) + 1rem);
    }
    &::details-content {
      opacity: 0;
      pointer-events: none;
      transition: opacity 300ms;
      margin: -0.8rem 1.2rem;
      position: fixed;
      z-index: var(--z-index-dropdown, 1052);
      display: flow-root !important;
      content-visibility: visible;
      background-color: var(--color-background);
      padding: 0.8rem 0.6rem;
      border-radius: var(--radius);
      box-shadow: var(--shadow-m);
      position-anchor: var(--anchor-name);
      position-area: right span-bottom;
      position-try:
        right,
        right span-top,
        left span-bottom,
        left,
        left span-top;
    }
  }
  details[trigger='hover']:hover::details-content,
  details:not([trigger]):hover::details-content {
    opacity: 1;
    pointer-events: auto;
  }
  details[trigger='click']:focus-within::details-content {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
