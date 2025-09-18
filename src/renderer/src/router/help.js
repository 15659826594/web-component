function assign(target, source) {
  for (const targetRaw of target) {
    for (const sourceRaw of source) {
      if (targetRaw.path === sourceRaw.path) {
        if (typeof sourceRaw.alias === 'string') {
          sourceRaw.path = sourceRaw.alias
        }
        if (sourceRaw.children && targetRaw.children) {
          if (!targetRaw.children) {
            targetRaw.children = []
          }
          targetRaw.children = assign(targetRaw.children, sourceRaw.children)
        }
        delete sourceRaw.alias
        delete sourceRaw.children
        Object.assign(targetRaw, sourceRaw)
        break
      }
    }
  }
  return target
}

function register() {
  const views = import.meta.glob('../views/**/*.vue')
  let keys = Object.keys(views)
  keys.sort((a, b) => {
    return a.split('/').length - b.split('/').length
  })
  let routes = []
  keys.forEach((key) => {
    let value = views[key]
    const page = {
      path: key.removeExt().trimPrefix('../views').camelCase(),
      component: value
    }
    routes = iterate(page, routes)
  })
  return routes
}

function iterate(page, arr) {
  const level = page.path.split('/')
  if (level.length > 2) {
    for (const parent of arr) {
      if (parent.path === '/' + level[1]) {
        if (!parent.children) {
          parent.children = []
        }
        level.splice(1, 1)
        page.path = level.filter((item) => item).join('/')
        parent.children = iterate(page, parent.children)
        return arr
      }
    }
  }
  arr.push(page)
  return arr
}

export { assign }

export default register
