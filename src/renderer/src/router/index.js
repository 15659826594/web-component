import { createRouter, createWebHashHistory } from 'vue-router'
import pages from '../pages.json'
import register, { assign } from './help'

let routes = register()

routes = assign(routes, [
  {
    path: '/project/add',
    meta: {
      _blank: true
    }
  }
])

let entryPagePath = pages.entryPagePath || pages.pages[0]?.path || pages.tabBar.list[0]?.pagePath
if (entryPagePath) {
  routes.push({
    path: '/',
    redirect: entryPagePath
  })
}
// /basic/layout             生成         /basic children:[{path : layout},{path : button}]
// ┌──────────────────┐                  ┌──────────────────┐
// │ Basic            │                  │ Basic            │
// │ ┌──────────────┐ │                  │ ┌──────────────┐ │
// │ │ Layout       │ │  ────────────>   │ │ Layout       │ │
// │ │ Button       │ │                  │ │ Button       │ │
// │ └──────────────┘ │                  │ └──────────────┘ │
// └──────────────────┘                  └──────────────────┘
// 如果没有上一级,则扁平化
// /basic/layout             生成          /basic/layout 和 /basic/button
// ┌──────────────────┐                  ┌──────────────────┐
// │ ┌──────────────┐ │                  │ ┌──────────────┐ │
// │ │ Layout       │ │  ────────────>   │ │ Layout       │ │
// │ │ Button       │ │                  │ │ Button       │ │
// │ └──────────────┘ │                  │ └──────────────┘ │
// └──────────────────┘                  └──────────────────┘

export default createRouter({
  history: createWebHashHistory(),
  routes: routes
})
