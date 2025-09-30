<template>
  <template v-if="!route.meta._blank">
    <wc-control></wc-control>
    <nav>
      <div class="navbar-left">
        <hgroup>
          <h2>{{ header }}</h2>
          <p>112</p>
        </hgroup>
      </div>
      <div class="navbar-right">
        <span class="icon bell" @click="msgbox.togglePopover"><i class="dot" :class="socketStore.readyState === 'open' ? 'primary' : 'error'"></i></span>
        <i role="icon" :class="drawer?.theme === 'light' ? 'f7_sun_max_fill' : 'f7_moon_stars_fill'" @click="drawer.switchTheme($event)"></i>
        <i role="icon" class="f7_gear_alt_fill" @click="drawer.showModal()"></i>
        <img role="avatar" src="" alt="avatar" draggable="false" style="width: 3.2rem; height: 3.2rem" />
      </div>
    </nav>

    <aside :collapse="effectStore.collapse" class="primary">
      <div class="logo">
        <img src="@assets/img/logo.png" alt="logo" draggable="false" />
      </div>
      <wc-menubar ref="menubar" mode="inline" style="--popup-offset-level-1: 2.4rem; background-color: transparent" :collapse="effectStore.collapse" unique @click="routeChange"></wc-menubar>
      <footer>
        <button role="icon" class="f7_sidebar_right" @click="effectStore.collapse = effectStore.collapse === null ? '' : null"></button>
      </footer>
    </aside>
  </template>
  <router-view></router-view>
  <setting ref="drawer"></setting>
  <!--  消息盒子-->
  <div id="msgbox" ref="msgbox" role="popover" popover fixed style="position: fixed">
    <header>15 Notifications</header>
    <main>
      <div class="item"><span role="icon" class="f7_envelope">4 new messages</span> <span>3 mins</span></div>
      <div class="item"><span role="icon" class="f7_person_3_fill">8 friend requests</span> <span>12 hours</span></div>
      <div class="item"><span role="icon" class="f7_doc_person">3 new reports</span> <span>2 days</span></div>
    </main>
    <footer @click="msgbox.togglePopover">See All Notifications</footer>
  </div>
</template>

<script setup>
import pages from '@src/pages.json'
import setting from '@src/components/setting.vue'
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useEffect, useSocketIO } from '@src/store'

let effectStore = useEffect(),
  socketStore = useSocketIO(),
  route = useRoute(),
  router = useRouter(),
  header = ref(''),
  drawer = ref(null),
  msgbox = ref(null),
  menubar = ref(null)

// socketStore.connect()
onMounted(() => {
  menubar.value.render(pages.tabBar.list)
})

// 加载字体 防止重复添加
let fontUrl = new URL('./assets/icon/framework7-icons/iconfont.woff2', import.meta.url).href
new FontFace('Framework7 Icons', `url(${fontUrl})`).load().then((font) => {
  let exist = false
  for (const f of document.fonts) {
    if (f.family === font.family) {
      exist = true
      break
    }
  }
  !exist && document.fonts.add(font)
})

function routeChange(event) {
  let path = event.composedPath(),
    pagePath = [],
    flag = false
  for (let i = 0, len = path.length; i < len; i++) {
    if (path[i].tagName === 'WC-MENUBAR') break
    if (path[i].tagName === 'LI') flag = true
    if (path[i].dataset['pagePath']) {
      pagePath.unshift(path[i].dataset['pagePath'])
    }
  }
  if (flag) {
    router.push(pagePath.join('/'))
  }
}
</script>

<style lang="scss">
body {
  padding-top: var(--safe-area-inset-top, 0px);
  padding-left: var(--safe-area-inset-left, 0px);
  padding-bottom: calc(var(--safe-area-inset-bottom, 0px) + var(--safe-area-inset-footer, 0px));
  transition: padding-left 300ms;
  &:has(> #app > nav) {
    --safe-area-inset-top: 5.6rem;
  }
  &:has(> #app > aside) {
    --safe-area-inset-left: 24rem;
  }
  &:has(> #app > aside[collapse]) {
    --safe-area-inset-left: 7.2rem;
  }
  &:has(> #app > footer.fixed) {
    --safe-area-inset-footer: 4.4rem;
  }
}

.body-scroll-lock #app > nav {
  -webkit-app-region: none !important;
}

#app {
  & > main {
    padding: 1.6rem;
    box-sizing: border-box;
    --main-height: calc(100vh - var(--safe-area-inset-top, 0px) - var(--safe-area-inset-bottom, 0px) - var(--safe-area-inset-footer, 0px));
    --main-inner-height: calc(var(--main-height) - 3.2rem);
    min-height: var(--main-height);
  }
  & > wc-control {
    z-index: calc(var(--z-index-framework) + 1);
    width: min(var(--safe-area-inset-left, 24rem), 7.2rem);
    box-sizing: border-box;
    justify-content: center;
    position: fixed;
    padding: 1.6rem 0;
    left: 0;
    top: 0;
  }
  & > nav {
    --header-bg-color: var(--info-0);
    -webkit-app-region: drag;
    user-select: none;
    position: fixed;
    z-index: var(--z-index-framework);
    top: 0;
    left: 0;
    transition-property: width margin-left;
    transition-duration: 300ms;
    width: calc(100% - var(--safe-area-inset-left, 0px));
    margin-left: var(--safe-area-inset-left, 0px);
    background-color: var(--header-bg-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.2rem 2rem;
    box-sizing: border-box;
    .navbar-left {
      display: inline-flex;
      align-items: center;
      & > * {
        -webkit-app-region: none;
        cursor: pointer;
      }
      hgroup {
        color: #222834;
        display: flex;
        align-items: center;
        font-weight: 600;
        white-space: nowrap;
        & > :not(p) {
          margin: 0;
          font-size: 2.4rem;
          line-height: 3.2rem;
          color: var(--info-900);
          font-weight: 600;
        }
        & > p {
          color: var(--primary-500);
          background-color: var(--primary-0);
          line-height: 1.8rem;
          font-size: 1.2rem;
          padding: 0.2rem 0.6rem;
          margin: 0 0 0 0.8rem;
          box-sizing: border-box;
          font-weight: normal;
          border-radius: var(--radius-1000);
        }
      }
    }
    .navbar-right {
      margin-left: auto;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 0 1.2rem;
      & > * {
        -webkit-app-region: none;
        cursor: pointer;
      }
      i[role='icon'],
      .icon {
        color: var(--info-400);
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2.4rem;
        height: 2.4rem;
        font-size: 2rem;
        .dot {
          position: absolute;
          top: 0;
          right: 0.1rem;
          z-index: 1;
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 50%;
          box-shadow:
            0 0.1rem 0.2rem 0 rgba(from var(--color) r g b / 0.25),
            0 0 0 0.2rem var(--info-0);
          &.primary {
            background-color: var(--primary-500);
          }
          &.error {
            background-color: var(--error-500);
          }
        }
      }
    }
    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
      transform-origin: bottom center;
      transform: scaleY(0.5);
      background-color: var(--border-color);
    }
  }
  & > aside {
    --bg-color: var(--info-0);
    color: var(--color);
    position: fixed;
    box-sizing: border-box;
    padding-left: 1.6rem;
    padding-right: 1.6rem;
    display: flex;
    flex-direction: column;
    z-index: var(--z-index-framework);
    left: 0;
    top: 0;
    bottom: 0;
    width: var(--safe-area-inset-left);
    transition: width 300ms;
    font-size: 1.4rem;
    line-height: 2rem;
    background-color: var(--bg-color);
    .logo {
      height: var(--safe-area-inset-top, 5.6rem);
      padding-top: 3.2rem;
      width: 100%;
      display: flex;
      margin-bottom: 1.6rem;

      img {
        width: 4rem;
        height: 4rem;
        margin: 1.5rem auto 1px;
      }
    }
    //wc-menubar {
    //  --offset: 1.6rem;
    //  --bg-color: var(--info-0);
    //  width: 100%;
    //  flex: 1;
    //  overflow: scroll;
    //  scrollbar-width: none;
    //  &[trigger='hover'] {
    //    overflow: visible;
    //  }
    //}
    //&.primary {
    //  --color: var(--info-300);
    //  --bg-color: var(--primary-900);
    //  wc-menubar {
    //    --hover-color: #fff;
    //    --selected-color: #fff;
    //    --bg-color: var(--primary-900);
    //    --bg-hover-color: #0d0b45;
    //    --bg-selected-color: #0d0b45;
    //    details {
    //      & > summary {
    //        box-sizing: border-box;
    //        border: 1px solid var(--primary-900);
    //      }
    //      &[open] > summary {
    //        border: 1px solid var(--primary-800);
    //      }
    //    }
    //    &[trigger='hover'] {
    //      details {
    //        &[index^='1-']:has(details[open]) > summary {
    //          border: 1px solid var(--primary-800);
    //        }
    //        &[disabled] > summary {
    //          background-color: var(--primary-800) !important;
    //        }
    //      }
    //    }
    //  }
    //}
    footer {
      position: relative;
      display: flex;
      width: 100%;
      justify-content: left;
      flex-wrap: wrap;
      padding: 0.8rem 0;
      button {
        cursor: pointer;
        border: none;
        outline: none;
        width: 4rem;
        height: 4rem;
        font-size: 2.2rem;
        color: var(--info-400);
        background-color: transparent;
        &:hover {
          filter: brightness(0.8);
        }
      }
    }
    &::before {
      content: '';
      position: absolute;
      background-color: var(--border-color);
      right: 0;
      top: 0;
      bottom: 0;
      width: 1px;
      transform-origin: top right;
      transform: scaleX(0.5);
    }
  }
  & > footer {
    position: relative;
    user-select: none;
    z-index: var(--z-index-framework);
    display: flex;
    box-sizing: border-box;
    background-color: var(--color-background);
    justify-content: space-between;
    padding: 1.2rem 2rem;
    font-size: 1.2rem;
    line-height: 2rem;
    color: var(--info-400);
    &.fixed {
      position: fixed;
      right: 0;
      left: var(--safe-area-inset-left, 0);
      bottom: var(--safe-area-inset-bottom, 0px);
    }
    &::before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 1px;
      transform-origin: top center;
      transform: scaleY(0.5);
      background-color: var(--border-color);
    }
  }
}

:root {
  --ep-c-bg-row: #f9fafc;
  --ep-c-bg-purple: #d3dce6;
  --ep-c-bg-purple-dark: #99a9bf;
  --ep-c-bg-purple-light: #e5e9f2;
}
.ep-bg-purple-dark {
  background: var(--ep-c-bg-purple-dark);
}
.ep-bg-purple {
  background: var(--ep-c-bg-purple);
}
.ep-bg-purple-light {
  background: var(--ep-c-bg-purple-light);
}

.tag-group [role='tag'] {
  box-sizing: border-box;
  margin-left: -1rem;
  width: calc(100% + 2rem);
}

#msgbox {
  width: 25rem;
  font-size: 1.4rem;
  line-height: 2rem;
  header,
  footer {
    display: block;
    text-align: center;
    padding: 0.8rem 1.6rem;
  }
  header {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    background-color: var(--color-background);
  }
  main {
    padding: 0;
    .item {
      cursor: pointer;
      padding: 0.8rem 1.6rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      [role='icon']::before {
        font-size: 1.6rem;
        margin-right: 0.8rem;
      }
      &:hover {
        background-color: var(--info-50);
      }
    }
  }
}
</style>
