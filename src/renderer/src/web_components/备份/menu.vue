<template>
  <main>
    <div style="position: relative" :style="mode === 'vertical' ? 'padding-left: 30rem' : 'padding-top: 5.6rem'">
      <menu :collapse="collapse" :mode="mode" :effect="effect" :trigger="trigger" style="--horizontal-offset: 0.8rem">
        <li v-for="tab in tabBar.list" :key="tab.pagePath">
          <details>
            <summary @click="click">
              <span>
                <i v-if="tab.iconfont">{{ tab.iconfont.text }}</i>
                <span>{{ tab.text }}</span>
              </span>
            </summary>
            <menu v-if="tab.children?.length" style="--menu-level: 1">
              <li v-for="tab1 in tab.children" :key="tab1.pagePath">
                <details>
                  <summary @click="click">
                    <span>
                      <i v-if="tab1.iconfont">{{ tab1.iconfont.text }}</i>
                      <span>{{ tab1.text }}</span>
                    </span>
                  </summary>
                  <menu v-if="tab1.children?.length" style="--menu-level: 2">
                    <li v-for="tab2 in tab1.children" :key="tab2.pagePath">
                      <details>
                        <summary @click="click">
                          <span>
                            <i v-if="tab2.iconfont">{{ tab2.iconfont.text }}</i>
                            <span>{{ tab2.text }}</span>
                          </span>
                        </summary>
                      </details>
                    </li>
                  </menu>
                </details>
              </li>
            </menu>
          </details>
        </li>
      </menu>
      <button role="button" @click="switchTrigger">菜单展开方式-{{ !trigger ? '点击' : trigger }}</button>
      <button role="button" @click="effect = effect === 'light' ? 'dark' : 'light'">{{ effect === 'light' ? '黑暗' : '明亮' }}</button>
      <button role="button" @click="switchCollapse">{{ collapse === null ? '折叠' : '展开' }}</button>
      <button role="button" @click="switchMode">{{ mode === 'vertical' ? '水平' : '垂直' }}</button>
    </div>
  </main>
</template>
<script setup>
import pageJSON from '../../pages.json'
import { ref } from 'vue'
let trigger = ref(null),
  collapse = ref(null),
  effect = ref('dark'),
  mode = ref('vertical')
let { tabBar } = pageJSON

function click(e) {
  let menuRoot = e.currentTarget.closest('menu[mode]'),
    trigger = menuRoot.getAttribute('trigger')
  // summary后面如果没有menu , 则认为是叶子节点
  let isleaf = !e.currentTarget.nextElementSibling
  // 如果是叶子节点 , 且当前菜单是打开状态 , 则阻止事件冒泡和默认行为
  if (isleaf && e.currentTarget.parentElement.open) {
    e.stopPropagation()
    e.preventDefault()
    return
  }
  if (!isleaf && trigger === 'hover') {
    e.preventDefault()
  }
  if (!isleaf) return
  let chains = []
  let paths = e.composedPath()
  for (const path of paths) {
    if (path === menuRoot) {
      break
    }
    if (path.tagName === 'DETAILS') {
      chains.push(path)
    }
  }
  menuRoot.querySelectorAll('details').forEach((item) => {
    if (!chains.includes(item) && item.open) {
      item.open = false
    }
  })
}

function switchTrigger() {
  trigger.value = trigger.value === 'hover' ? null : 'hover'
  if (!trigger.value) {
    collapse.value = null
  }
}

function switchCollapse() {
  collapse.value = collapse.value === null ? '' : null
  trigger.value = collapse.value === '' ? 'hover' : null
}

function switchMode() {
  mode.value = mode.value === 'vertical' ? 'horizontal' : 'vertical'
  trigger.value = mode.value === 'horizontal' ? 'hover' : null
}

if (mode.value === 'horizontal' || collapse.value === '') {
  trigger.value = 'hover'
}
</script>

<style></style>

<style scoped lang="scss">
button {
  margin: 0.5rem;
}
menu[mode='vertical'] {
  position: absolute;
  width: 23rem;
  left: 0;
  top: 0;
}

menu[mode='horizontal'] {
  position: absolute;
  height: 5.6rem;
  left: 0;
  right: 0;
  top: 0;
}

menu[mode],
menu[mode] menu {
  margin: 0;
  margin-block: 0;
  padding-inline: 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
}

menu[mode] {
  --menu-bg-color: #fff;
  --menu-bg-hover-color: rgba(0, 0, 0, 0.06);
  --menu-bg-active-color: #e6f4ff;
  --menu-text-color: #000000e0;
  --menu-hover-color: #1677ff;
  --menu-active-color: #1677ff;
  --menu-icon-width: 2.4rem; /* 图标大小 */
  --menu-spacing: 0.8rem; /* 图标和文字间距 */
  --base-level-padding: 0.8rem; /* 基础缩进 */
  --level-indent: 2.4rem; /* 每级缩进 */
  font-size: 1.4rem;
  box-sizing: border-box;
  color: var(--menu-text-color);
  background-color: var(--menu-bg-color);
  details {
    & > summary {
      cursor: pointer;
      user-select: none;
      position: relative;
      display: block;
      box-sizing: border-box;
      & > span {
        display: flex;
        align-items: center;
        height: 4rem;
        line-height: 4rem;
        padding: 0.8rem;
        white-space: nowrap;
        box-sizing: border-box;
        border-radius: var(--radius);
        & > i {
          font-style: normal;
          font-size: var(--menu-icon-width);
          line-height: var(--menu-icon-width);
          font-family: 'Framework7 Icons', serif;
        }
      }
    }
  }
}

menu[mode][effect='dark'] {
  --menu-bg-color: #001529;
  --menu-bg-hover-color: rgba(0, 0, 0, 0.06);
  --menu-bg-active-color: #1677ff;
  --menu-text-color: rgba(255, 255, 255, 0.65);
  --menu-hover-color: #fff;
  --menu-active-color: #fff;
}

menu[mode='vertical']:not([trigger]):not([collapse]) details > summary + menu {
  background-color: rgba(0, 0, 0, 0.02);
}

menu[mode='vertical'] {
  details {
    & > summary {
      padding: 0.5rem 0;
      & > span {
        gap: 0 var(--menu-spacing);
        padding-left: calc(var(--base-level-padding) + var(--menu-level, 0) * var(--level-indent));
        &:hover {
          color: var(--menu-hover-color);
          background-color: var(--menu-bg-hover-color);
        }
      }
    }
    &::details-content {
      height: 0;
      display: flow-root !important;
      transition: height 200ms;
      content-visibility: visible;
      overflow: hidden;
    }
    &:open {
      &::details-content {
        height: calc-size(auto, size);
      }
      & > summary > span {
        color: var(--menu-active-color);
      }
      /*叶子节点选中状态*/
      &:not(:has(> menu)) > summary > span {
        color: var(--menu-active-color);
        background-color: var(--menu-bg-active-color);
      }
    }
  }
}

menu[trigger='hover'] {
  --level-indent: 0px;
  details {
    position: relative;
    & > summary > span {
      color: var(--menu-text-color);
    }
    /*取消:open默认样式 , 有:hover决定*/
    &::details-content {
      content-visibility: hidden;
    }
    & > menu {
      /* 菜单之间的间距 */
      --menu-gutter: 0.8rem;
      position: absolute;
      box-shadow: var(--shadow);
      border-radius: var(--radius);
      background-color: var(--menu-bg-color);
      /*移向子菜单时如果中间有间隙 , :hover就失效 , 通过伪元素填补中间过渡*/
      &::before {
        content: '';
        position: absolute;
      }
    }
    &:hover::details-content {
      content-visibility: visible;
    }
    &:has(summary:hover) > summary > span {
      color: var(--menu-hover-color);
    }
    &:has(details:open) > summary > span {
      color: var(--menu-active-color);
    }
  }
  &[mode='vertical'] {
    --vertical-offset: 0px;
    details {
      & > summary > span {
        min-width: 15rem;
      }
      & > menu {
        top: 0;
        left: calc(100% + var(--menu-gutter) + var(--vertical-offset));
        &::before {
          top: 0;
          bottom: 0;
          left: 0;
          transform: translateX(-100%);
          width: calc(var(--menu-gutter) + var(--vertical-offset));
        }
      }
    }
    & > li > details:has(details:open) > summary > span {
      background-color: var(--menu-bg-active-color);
    }
  }
  &[mode='horizontal'] {
    --menu-padding: 0.5rem;
    --horizontal-offset: 0px; /* 用来调节一级展开偏移 */
    menu {
      box-sizing: border-box;
      padding: var(--menu-padding);
      gap: var(--menu-padding) 0;
    }
    /*一级节点向下展开*/
    & > li > details > menu {
      top: calc(100% + var(--menu-gutter) + var(--horizontal-offset));
      left: 50%;
      transform: translateX(-50%);
      &::before {
        left: 0;
        right: 0;
        top: 0;
        transform: translateY(-100%);
        height: calc(var(--menu-gutter) + var(--horizontal-offset));
      }
      /*二级节点向右展开*/
      menu {
        top: 0;
        left: calc(100% + var(--menu-gutter) + var(--menu-padding));
        &::before {
          top: 0;
          bottom: 0;
          left: 0;
          transform: translateX(-100%);
          width: calc(var(--menu-gutter) + var(--menu-padding));
        }
      }
    }
  }
}

menu[mode='vertical'][collapse] {
  --level-indent: 0px;
  --vertical-offset: 0.8rem;
  width: fit-content;
  & > li > details > summary > span {
    min-width: auto;
    & > span {
      display: none;
    }
  }
  /*tooltip*/
  & > li > details:not(:has(menu)) > summary {
    & > span > span {
      position: absolute;
      display: block;
      pointer-events: none;
      left: calc(100% + 0.4rem);
      top: 50%;
      opacity: 0;
      transition: opacity 300ms;
      transform: translateY(-50%);
      font-size: 1.4rem;
      line-height: 2rem;
      padding: 0.8rem 1.2rem;
      border-radius: var(--radius-500);
      color: var(--menu-active-color);
      background-color: var(--menu-bg-color);
      box-shadow: var(--shadow-tooltip);
    }
    &:hover > span > span {
      opacity: 1;
    }
  }
}

menu[mode='horizontal'] {
  flex-direction: row;
  --level-indent: 0px;
  & > li {
    display: inline-flex;
    align-items: center;
  }
  details {
    position: relative;
    & > summary {
      & > span {
        padding: 0 1.6rem;
        display: flex;
        gap: 0 var(--menu-spacing);
        align-items: center;
        white-space: nowrap;
        color: var(--menu-text-color);
        border-radius: var(--radius);
        &:hover {
          color: var(--menu-hover-color);
          background-color: var(--menu-bg-hover-color);
        }
      }
    }
    /*取消:open默认样式 , 有:hover决定*/
    &::details-content {
      content-visibility: hidden;
    }
    &:hover::details-content {
      content-visibility: visible;
    }
    &:open {
      & > summary > span {
        color: var(--menu-active-color);
      }
      /*叶子节点选中状态*/
      &:not(:has(> menu)) > summary > span {
        color: var(--menu-active-color);
        background-color: var(--menu-bg-active-color);
      }
    }
  }
}

/*设置箭头*/
menu[mode='vertical'] {
  details {
    &:has(> menu) > summary > span {
      padding-right: 4.4rem;
      &::after {
        --arrow-size: 1.2rem;
        content: '';
        position: absolute;
        width: var(--arrow-size);
        height: var(--arrow-size);
        top: calc(50% - var(--arrow-size) / 2);
        right: calc(0.8rem + var(--arrow-size) / 2);
        transform: rotate(-90deg);
        transition: transform 200ms;
        background-color: currentColor;
        mask-size: cover;
        mask-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTgzMS44NzIgMzQwLjg2NCA1MTIgNjUyLjY3MiAxOTIuMTI4IDM0MC44NjRhMzAuNTkyIDMwLjU5MiAwIDAgMC00Mi43NTIgMCAyOS4xMiAyOS4xMiAwIDAgMCAwIDQxLjZMNDg5LjY2NCA3MTQuMjRhMzIgMzIgMCAwIDAgNDQuNjcyIDBsMzQwLjI4OC0zMzEuNzEyYTI5LjEyIDI5LjEyIDAgMCAwIDAtNDEuNzI4IDMwLjU5MiAzMC41OTIgMCAwIDAtNDIuNzUyIDB6Ij48L3BhdGg+PC9zdmc+');
      }
    }
    &:open:has(> menu) > summary > span::after {
      transform: none;
    }
  }
  &[collapse] > li > details > summary > span {
    padding: 0.8rem;
    &::after {
      display: none;
    }
  }
  &[collapse],
  &[trigger='hover'] {
    details {
      &:has(> menu) > summary > span::after {
        transform: none;
      }
      &:hover > summary > span::after {
        transform: rotate(-90deg);
      }
    }
  }
}
</style>
