<template>
  <main>
    <wc-row gutter="2.4rem">
      <wc-col v-for="(icon, index) in icons.glyphs" :key="index" span="2" sm="3" xs="4">
        <div v-if="icon" class="icon-item flex center col">
          <div>
            <div role="icon" :class="`${icons.css_prefix_text}${icon.font_class}`"></div>
            <div class="icon-copy">
              <div @click="copy(icon.font_class, 'class')">复制 类名</div>
              <div @click="copy(icon.unicode, 'unicode')">复制 unicode</div>
            </div>
          </div>
        </div>
      </wc-col>
    </wc-row>
  </main>
</template>
<script setup>
import { reactive } from 'vue'
import data from '@assets/icon/framework7-icons/iconfont.json'
let glyphs = data.glyphs
data.glyphs = []
let icons = reactive(data)

let tasks = []
for (let i = 0, len = glyphs.length; i < len; i++) {
  tasks.push(() => {
    icons.glyphs[i] = glyphs[i]
  })
}

function switchShow() {
  if (icons.glyphs.length > 0 && icons.glyphs.length < glyphs.length) {
    return
  }
  if (icons.glyphs.length) {
    icons.glyphs.length = 0
  } else {
    tasks.forEach((task) => {
      runTask(task)
    })
  }
}

function runRequestIdle(task, callback) {
  requestIdleCallback((deadline) => {
    if (deadline.timeRemaining() > 0) {
      task()
      callback()
    } else {
      runRequestIdle(task, callback)
    }
  })
}

function runAnimationFrame(task, callback) {
  let starts = Date.now()
  requestAnimationFrame(() => {
    if (Date.now() - starts < 16.6) {
      task()
      callback()
    } else {
      runAnimationFrame(task, callback)
    }
  })
}

let _run = window.requestIdleCallback ? runRequestIdle : runAnimationFrame

function runTask(task) {
  return new Promise((resolve) => {
    _run(task, resolve)
  })
}

switchShow()

function copy(text, type) {
  let iconCopy = type === 'class' ? icons.css_prefix_text + text : '\\u' + text
  navigator.clipboard.writeText(iconCopy).then(() => {
    console.log('复制成功')
  })
}
</script>

<style scoped lang="scss">
.icon-item {
  position: relative;
  cursor: pointer;
  aspect-ratio: 1;
  font-size: 2.6rem;
  margin: 1.2rem 0;
  border-radius: var(--radius);
  border: 1px solid #dcdfe6;
  overflow: hidden;
  content-visibility: auto;
  contain-intrinsic-size: 100vw 100vh;

  .icon-copy {
    font-size: 1.2rem;
    color: #fff;
    display: none;
    position: absolute;
    inset: 0;
    background-color: rgba(from var(--primary-900) r g b / 0.9);
  }
  &:hover .icon-copy {
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    & > div {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        color: var(--primary-100);
        background: var(--primary-900);
      }
    }
  }
}
@supports (font-size: clamp(0.75rem, calc(100cqw / 40), 2rem)) {
  .icon-item {
    font-size: clamp(1rem, calc(100cqw / 20), 3rem);
    .icon-copy {
      font-size: clamp(0.8rem, calc(100cqw / 80), 1.2rem);
    }
  }
}
</style>
