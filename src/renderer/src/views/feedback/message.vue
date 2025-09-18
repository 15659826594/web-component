<template>
  <main>
    <p>基础用法</p>
    <div class="flex" style="gap: 2rem">
      <button role="button" @click="Message('This is a message.')">Show message</button>
      <button role="button" @click="openVn">VNode</button>
    </div>
    <p>不同状态</p>
    <div class="flex" style="gap: 2rem">
      <button role="button" @click="Message.primary('This is a primary message.')">Primary</button>
      <button role="button" @click="Message({ message: 'Congrats, this is a success message.', type: 'success' })">Success</button>
      <button role="button" @click="Message({ message: 'Warning, this is a warning message.', type: 'warning' })">Warning</button>
      <button role="button" @click="Message('This is a info message.')">Info</button>
      <button role="button" @click="Message.error('Oops, this is a error message.')">Error</button>
      <button role="button" @click="Message.loading('Loading...')">Loading</button>
    </div>
    <p>Plain 朴素</p>
    <div class="flex" style="gap: 2rem">
      <button role="button" @click="Message({ message: 'This is a primary message.', type: 'primary', plain: true })">Primary</button>
      <button role="button" @click="Message({ message: 'Congrats, this is a success message.', type: 'success', plain: true })">Success</button>
      <button role="button" @click="Message({ message: 'Warning, this is a warning message.', type: 'warning', plain: true })">Warning</button>
      <button role="button" @click="Message({ message: 'This is a info message.', type: 'info', plain: true })">Info</button>
      <button role="button" @click="Message({ message: 'Oops, this is a error message.', type: 'error', plain: true })">Error</button>
    </div>
    <p>可关闭的消息提示</p>
    <div class="flex" style="gap: 2rem">
      <button role="button" @click="Message({ showClose: true, message: 'This is a primary message.', type: 'primary' })">Primary</button>
      <button role="button" @click="Message({ showClose: true, message: 'Congrats, this is a success message.', type: 'success' })">Success</button>
      <button role="button" @click="Message({ showClose: true, message: 'Warning, this is a warning message.', type: 'warning' })">Warning</button>
      <button role="button" @click="Message({ showClose: true, message: 'This is a info message.' })">Info</button>
      <button role="button" @click="Message({ showClose: true, message: 'Oops, this is a error message.', type: 'error' })">Error</button>
      <button role="button" @click="Message({ showClose: true, message: 'Oops, this is a message that does not automatically close.', duration: 0 })">Won't close automatically</button>
    </div>
    <p>使用 HTML 片段作为正文内容</p>
    <div class="flex" style="gap: 2rem">
      <button role="button" @click="openHTML">Use HTML string</button>
    </div>
  </main>
</template>
<script setup>
import { h, render } from 'vue'
import { Message } from '@src/web_components/dialog'
const openVn = () => {
  let vnode = h('p', { style: 'line-height: 1; font-size: 14px' }, [h('span', null, 'Message can be '), h('i', { style: 'color: teal' }, 'VNode')]),
    node = document.createDocumentFragment()
  render(vnode, node)
  Message({
    message: node
  })
}
const openHTML = () => {
  let msg = Message({
    dangerouslyUseHTMLString: true,
    customClass: 'cursor-pointer',
    icon: (function () {
      let i = document.createElement('i')
      i.role = 'icon'
      i.classList.add('dt3_user')
      return i
    })(),
    duration: 0,
    message: '<strong>This is <i>HTML</i> string</strong>'
  })
  msg.element.onclick = () => msg.close()
}
</script>

<style scoped lang="scss"></style>
