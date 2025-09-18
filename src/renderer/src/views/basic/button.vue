<template>
  <main>
    <p>基础用法</p>
    <div class="flex col" style="gap: 1.2rem 0">
      <div class="flex" style="gap: 0 1.2rem">
        <button role="button">default</button>
        <button role="button" class="color-primary">primary</button>
        <button role="button" class="color-success">success</button>
        <button role="button" class="color-info">info</button>
        <button role="button" class="color-warning">warning</button>
        <button role="button" class="color-error">error</button>
      </div>
      <div class="flex" style="gap: 0 1.2rem">
        <button role="button" class="is-plain">default</button>
        <button role="button" class="color-primary is-plain">primary</button>
        <button role="button" class="color-success is-plain">success</button>
        <button role="button" class="color-info is-plain">info</button>
        <button role="button" class="color-warning is-plain">warning</button>
        <button role="button" class="color-error is-plain">error</button>
      </div>
      <div class="flex" style="gap: 0 1.2rem">
        <button role="button" class="is-round">default</button>
        <button role="button" class="color-primary is-round">primary</button>
        <button role="button" class="color-success is-round">success</button>
        <button role="button" class="color-info is-round">info</button>
        <button role="button" class="color-warning is-round">warning</button>
        <button role="button" class="color-error is-round">error</button>
      </div>
      <div class="flex" style="gap: 0 1.2rem">
        <button role="button icon" class="f7_search"></button>
        <button role="button icon" class="color-primary f7_square_pencil"></button>
        <button role="button icon" class="color-success f7_checkmark"></button>
        <button role="button icon" class="color-info f7_envelope"></button>
        <button role="button icon" class="color-warning f7_star"></button>
        <button role="button icon" class="color-error f7_trash"></button>
      </div>
    </div>
    <p>禁用状态</p>
    <div class="flex col" style="gap: 1.2rem 0">
      <div class="flex" style="gap: 0 1.2rem">
        <button role="button" disabled>default</button>
        <button role="button" class="color-primary" disabled>primary</button>
        <button role="button" class="color-success" disabled>success</button>
        <button role="button" class="color-info" disabled>info</button>
        <button role="button" class="color-warning" disabled>warning</button>
        <button role="button" class="color-error" disabled>error</button>
      </div>
      <div class="flex" style="gap: 0 1.2rem">
        <button role="button" class="is-plain" disabled>default</button>
        <button role="button" class="color-primary is-plain" disabled>primary</button>
        <button role="button" class="color-success is-plain" disabled>success</button>
        <button role="button" class="color-info is-plain" disabled>info</button>
        <button role="button" class="color-warning is-plain" disabled>warning</button>
        <button role="button" class="color-error is-plain" disabled>error</button>
      </div>
      <p>链接按钮</p>
      <div>
        <p style="margin-top: 0">Basic link button</p>
        <div class="flex" style="gap: 0 1.2rem">
          <button role="button" class="is-link">plain</button>
          <button role="button" class="color-primary is-link">primary</button>
          <button role="button" class="color-success is-link">success</button>
          <button role="button" class="color-info is-link">info</button>
          <button role="button" class="color-warning is-link">warning</button>
          <button role="button" class="color-error is-link">error</button>
        </div>
        <p>Disabled link button</p>
        <div class="flex" style="gap: 0 1.2rem">
          <button role="button" class="is-link" disabled>plain</button>
          <button role="button" class="color-primary is-link" disabled>primary</button>
          <button role="button" class="color-success is-link" disabled>success</button>
          <button role="button" class="color-info is-link" disabled>info</button>
          <button role="button" class="color-warning is-link" disabled>warning</button>
          <button role="button" class="color-error is-link" disabled>error</button>
        </div>
      </div>
      <p>文字按钮</p>
      <div>
        <p style="margin-top: 0">Basic text button</p>
        <div class="flex" style="gap: 0 1.2rem">
          <button role="button" class="is-text">plain</button>
          <button role="button" class="color-primary is-text">primary</button>
          <button role="button" class="color-success is-text">success</button>
          <button role="button" class="color-info is-text">info</button>
          <button role="button" class="color-warning is-text">warning</button>
          <button role="button" class="color-error is-text">error</button>
        </div>
        <p>Background color always on</p>
        <div class="flex" style="gap: 0 1.2rem">
          <button role="button" class="is-text is-bg">plain</button>
          <button role="button" class="color-primary is-text is-bg">primary</button>
          <button role="button" class="color-success is-text is-bg">success</button>
          <button role="button" class="color-info is-text is-bg">info</button>
          <button role="button" class="color-warning is-text is-bg">warning</button>
          <button role="button" class="color-error is-text is-bg">error</button>
        </div>
        <p>Disabled text button</p>
        <div class="flex" style="gap: 0 1.2rem">
          <button role="button" class="is-text" disabled>plain</button>
          <button role="button" class="color-primary is-text" disabled>primary</button>
          <button role="button" class="color-success is-text" disabled>success</button>
          <button role="button" class="color-info is-text" disabled>info</button>
          <button role="button" class="color-warning is-text" disabled>warning</button>
          <button role="button" class="color-error is-text" disabled>error</button>
        </div>
      </div>
      <p>图标按钮</p>
      <div class="flex c-center" style="gap: 0 1.2rem">
        <button role="button icon" class="color-primary f7_square_pencil"></button>
        <button role="button icon" class="color-primary f7_square_arrow_up"></button>
        <button role="button icon" class="color-primary f7_trash"></button>
        <button role="button icon" class="color-primary f7_search">Search</button>
        <button role="button" class="color-primary">Upload<i role="icon" class="f7_arrow_up_to_line_alt" style="margin-left: 0.8rem"></i></button>
      </div>
      <p>按钮组</p>
      <div class="flex" style="gap: 0 1.2rem">
        <div class="button-group">
          <button role="button icon" class="color-primary f7_chevron_left">Previous Page</button>
          <button role="button" class="color-primary">Next Page<i role="icon" class="f7_chevron_right" style="margin-left: 0.8rem"></i></button>
        </div>
        <div class="button-group">
          <button role="button icon" class="color-primary f7_square_pencil"></button>
          <button role="button icon" class="color-primary f7_square_arrow_up"></button>
          <button role="button icon" class="color-primary f7_trash"></button>
        </div>
      </div>
      <p>加载状态按钮</p>
      <div class="flex" style="gap: 0 1.2rem">
        <button role="button" class="color-primary" disabled>
          <svg role="icon" class="is-loading" style="margin-right: 0.8rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
            <path fill="currentColor" d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"></path>
          </svg>
          Loading
        </button>
        <button role="button" class="color-primary" disabled>
          <svg role="icon" class="is-loading" style="margin-right: 0.8rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
            <path
              fill="currentColor"
              d="M300.032 188.8c174.72-113.28 408-63.36 522.24 109.44 5.76 10.56 11.52 20.16 17.28 30.72v.96a22.4 22.4 0 0 1-7.68 26.88l-352.32 228.48c-9.6 6.72-22.08 3.84-28.8-5.76l-18.24-27.84a54.336 54.336 0 0 1 16.32-74.88l225.6-146.88c9.6-6.72 12.48-19.2 5.76-28.8-.96-1.92-1.92-3.84-3.84-4.8a267.84 267.84 0 0 0-315.84-17.28c-123.84 81.6-159.36 247.68-78.72 371.52a268.096 268.096 0 0 0 370.56 78.72 54.336 54.336 0 0 1 74.88 16.32l17.28 26.88c5.76 9.6 3.84 21.12-4.8 27.84-8.64 7.68-18.24 14.4-28.8 21.12a377.92 377.92 0 0 1-522.24-110.4c-113.28-174.72-63.36-408 111.36-522.24zm526.08 305.28a22.336 22.336 0 0 1 28.8 5.76l23.04 35.52a63.232 63.232 0 0 1-18.24 87.36l-35.52 23.04c-9.6 6.72-22.08 3.84-28.8-5.76l-46.08-71.04c-6.72-9.6-3.84-22.08 5.76-28.8l71.04-46.08z"
            ></path>
          </svg>
          Loading
        </button>
        <button role="button" class="color-primary" disabled>
          <svg role="icon" style="margin-right: 0.8rem" class="circular is-loading" viewBox="-10, -10, 50, 50">
            <path
              class="path"
              d="
            M 30 15
            L 28 17
            M 25.61 25.61
            A 15 15, 0, 0, 1, 15 30
            A 15 15, 0, 1, 1, 27.99 7.5
            L 15 15
          "
              style="stroke-width: 4px; fill: rgba(0, 0, 0, 0); stroke: #fff; stroke-linecap: round; animation: 1.5s ease-in-out 0s infinite normal none running loading-dash"
            ></path>
          </svg>
          Loading
        </button>
      </div>
      <p>调整尺寸</p>
      <div class="flex align-items-end" style="gap: 0 1.2rem">
        <button role="button">Default</button>
        <button role="button icon" class="f7_search">Default</button>
        <button role="button icon" class="is-circle f7_search"></button>
        <button role="button" size="mini">Default</button>
        <button role="button icon" size="mini" class="f7_search">Default</button>
        <button role="button icon" size="mini" class="is-circle f7_search"></button>
      </div>
      <p>自定义颜色</p>
      <div class="flex c-center" style="gap: 0 1.2rem">
        <button role="button" class="color-custom" style="--color-base: #626aef">Default</button>
        <button role="button" class="color-custom is-plain" style="--color-base: #626aef">Plain</button>
        <button role="button" class="color-custom" disabled style="--color-base: #626aef">Disabled</button>
        <button role="button" class="color-custom is-plain" disabled style="--color-base: #626aef">Disabled Plain</button>
      </div>
    </div>
  </main>
</template>
<script setup>
import { hexToHsl } from '@src/web_components/utils'
let colors = {
  '--indigo-900': '#151357',
  '--indigo-800': '#2a278f',
  '--indigo-700': '#3734a3',
  '--indigo-600': '#4945c4',
  '--indigo-500': '#5e5adb',
  '--indigo-400': '#807cea',
  '--indigo-300': '#9e9bf5',
  '--indigo-200': '#b9b6fa',
  '--indigo-100': '#d0cffc',
  '--indigo-50': '#dfdefc',
  '--indigo-0': '#ededfc'
}
for (const colorsKey in colors) {
  colors[colorsKey] = hexToHsl(colors[colorsKey])
}
</script>
<style scoped lang="scss">
button::first-letter {
  text-transform: uppercase;
}
</style>
