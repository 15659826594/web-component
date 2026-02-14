<template>
  <main>
    <p>消息提示</p>
    <button role="button" @click="open">Click to open the Message Box</button>
    <p>确认消息</p>
    <button role="button" @click="open1">Click to open the Message Box</button>
    <p>提交内容</p>
    <button role="button" @click="open2">Click to open the Message Box</button>
    <p>使用 VNode</p>
    <div class="flex" style="gap: 2rem">
      <button role="button" @click="open3">Common VNode</button>
      <button role="button" @click="open4">Dynamic props</button>
    </div>
    <p>个性化</p>
    <button role="button" @click="open5">Click to open Message Box</button>
    <p>使用 HTML 片段</p>
    <button role="button" @click="open6">Click to open Message Box</button>
    <p>区分取消操作与关闭操作</p>
    <button role="button" @click="open7">Click to open Message Box</button>
    <p>内容居中</p>
    <button role="button" @click="open8">Click to open Message Box</button>
    <p>自定义图标</p>
    <button role="button" @click="open9">Click to open Message Box</button>
    <p>可拖放</p>
    <div class="flex" style="gap: 2rem">
      <button role="button" @click="open10">Open a draggable Message Box</button>
      <button role="button" @click="open11">Open a overflow draggable Message Box</button>
    </div>
  </main>
</template>
<script setup>
import { h, render } from 'vue'
import { MessageBox, Message } from '@src/components/web/dialog'
const open = () => {
  MessageBox.alert('This is a message', 'Title', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: 'OK',
    callback: (action) => {
      Message({
        type: 'info',
        message: `action: ${action}`
      })
    }
  })
}

const open1 = () => {
  MessageBox.confirm('proxy will permanently delete the file. Continue?', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
    .then(() => {
      Message({
        type: 'success',
        message: 'Delete completed'
      })
    })
    .catch(() => {
      Message({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}

const open2 = () => {
  MessageBox.prompt('Please input your e-mail', 'Tip', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputType: 'email',
    inputPattern: "[w!#$%&'*+/=?^_`{|}~-]+(?:.[w!#$%&'*+/=?^_`{|}~-]+)*@(?:[w](?:[w-]*[w])?.)+[w](?:[w-]*[w])?",
    inputErrorMessage: 'Invalid Email',
    closeOnClickModal: false
  })
    .then(({ value }) => {
      Message({
        type: 'success',
        message: `Your email is:${value}`
      })
    })
    .catch(() => {
      Message({
        type: 'info',
        message: 'Input canceled'
      })
    })
}

const open3 = () => {
  let vnode = h('p', null, [h('span', null, 'Message can be '), h('i', { style: 'color: teal' }, 'VNode')]),
    message = document.createDocumentFragment()
  render(vnode, message)
  MessageBox({
    title: 'Message',
    message: message
  })
}

const open4 = () => {
  MessageBox({
    title: 'Message',
    // Should pass a function if VNode contains dynamic props
    message: (function () {
      let input = document.createElement('input')
      input.type = 'checkbox'
      input.role = 'switch'
      return input
    })()
  })
}

const open5 = () => {
  let vnode = h('p', null, [h('span', null, 'Message can be '), h('i', { style: 'color: teal' }, 'VNode')]),
    message = document.createDocumentFragment()
  render(vnode, message)
  MessageBox({
    title: 'Message',
    message: message,
    showCancelButton: true,
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        instance.confirmButtonText = 'Loading...'
        setTimeout(() => {
          done()
          setTimeout(() => {
            instance.confirmButtonLoading = false
          }, 300)
        }, 3000)
      } else {
        done()
      }
    }
  }).then((action) => {
    Message({
      type: 'info',
      message: `action: ${action}`
    })
  })
}

const open6 = () => {
  MessageBox.alert('<strong>proxy is <i>HTML</i> string</strong>', 'HTML String', {
    dangerouslyUseHTMLString: true
  })
}

const open7 = () => {
  MessageBox.confirm('You have unsaved changes, save and proceed?', 'Confirm', {
    distinguishCancelAndClose: true,
    confirmButtonText: 'Save',
    cancelButtonText: 'Discard Changes'
  })
    .then(() => {
      Message({
        type: 'info',
        message: 'Changes saved. Proceeding to a new route.'
      })
    })
    .catch((action) => {
      Message({
        type: 'info',
        message: action === 'cancel' ? 'Changes discarded. Proceeding to a new route.' : 'Stay in the current route'
      })
    })
}

const open8 = () => {
  MessageBox.confirm('proxy will permanently delete the file. Continue?', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning',
    center: true
  })
    .then(() => {
      Message({
        type: 'success',
        message: 'Delete completed'
      })
    })
    .catch(() => {
      Message({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}

const open9 = () => {
  MessageBox.confirm('It will permanently delete the file. Continue?', 'Warning', {
    type: 'warning',
    icon: (function () {
      let icon = document.createElement('i')
      icon.role = 'icon'
      icon.classList.add('f7_trash')
      icon.style.verticalAlign = 'bottom'
      icon.style.fontSize = '2.4rem'
      icon.style.marginRight = '1rem'
      icon.style.color = 'var(--warning)'
      return icon
    })()
  })
}

const open10 = () => {
  MessageBox.confirm('proxy will permanently delete the file. Continue?', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning',
    draggable: true
  })
    .then(() => {
      Message({
        type: 'success',
        message: 'Delete completed'
      })
    })
    .catch(() => {
      Message({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}

const open11 = () => {
  MessageBox.confirm('proxy will permanently delete the file. Continue?', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning',
    draggable: true,
    overflow: true
  })
    .then(() => {
      Message({
        type: 'success',
        message: 'Delete completed'
      })
    })
    .catch(() => {
      Message({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}
</script>

<style scoped lang="scss"></style>
