<template>
  <main>
    <p>顶部导航</p>
    <wc-menubar ref="horizontal" mode="horizontal"></wc-menubar>
    <p>内嵌菜单</p>
    <wc-menubar ref="inline" mode="inline"></wc-menubar>
    <p>缩起内嵌菜单</p>
    <button role="button icon" class="color-primary" :class="collapse === false ? 'f7_arrowtriangle_left_square' : 'f7_arrowtriangle_right_square'" style="margin-bottom: 1.6rem" @click="collapse = collapse === false ? '' : false"></button>
    <br />
    <wc-menubar ref="collapseRef" :collapse="collapse === false ? null : ''"></wc-menubar>
    <p>只展开当前父级菜单</p>
    <wc-menubar ref="unique" mode="inline" unique></wc-menubar>
    <p>子菜单是弹出的形式。</p>
    <wc-menubar ref="vertical" mode="vertical"></wc-menubar>
    <p>主题</p>
    <input role="switch" type="checkbox" :checked="theme === 'dark'" @change="theme = theme === 'dark' ? 'light' : 'dark'" />
    <br />
    <wc-menubar ref="themeRef" mode="inline" :class="'color-' + theme"></wc-menubar>
    <p>切换菜单类型</p>
    <input role="switch" type="checkbox" :checked="mode === 'vertical'" @change="mode = mode === 'vertical' ? 'inline' : 'vertical'" />
    <br />
    <wc-menubar ref="modeRef" :mode="mode"></wc-menubar>
  </main>
</template>
<script setup>
import { onMounted, ref } from 'vue'
let horizontal = ref(null),
  inline = ref(null),
  collapseRef = ref(null),
  collapse = ref(false),
  unique = ref(null),
  vertical = ref(null),
  themeRef = ref(null),
  theme = ref('dark'),
  modeRef = ref(null),
  mode = ref('inline')

let list = [
  {
    text: 'Processing Center'
  },
  {
    text: 'Workspace',
    children: [
      {
        text: 'item one'
      },
      {
        text: 'item two'
      },
      {
        text: 'item three'
      },
      {
        text: 'item four',
        children: [
          {
            text: 'item one'
          },
          {
            text: 'item two'
          },
          {
            text: 'item three'
          }
        ]
      }
    ]
  },
  {
    text: 'Workspace',
    children: [
      {
        text: 'item one'
      },
      {
        text: 'item two'
      },
      {
        text: 'item three'
      },
      {
        text: 'item four',
        children: [
          {
            text: 'item one'
          },
          {
            text: 'item two'
          },
          {
            text: 'item three'
          }
        ]
      }
    ]
  },
  {
    text: 'Info',
    disabled: true
  },
  {
    text: 'Orders'
  }
]

onMounted(() => {
  horizontal.value.render(list)
  inline.value.render(list)
  collapseRef.value.render(list)
  unique.value.render(list)
  vertical.value.render(list)
  themeRef.value.render(list)
  modeRef.value.render(list)
})
</script>

<style></style>

<style scoped lang="scss"></style>
