const KEYPREFIX = 'PINIA:STATE:'

export default ({store}) => {
  const KEY = KEYPREFIX + store.$id
  // 存
  // 变化时存储
  // store.$subscribe(() => {
  //   localStorage.setItem(KEY, JSON.stringify(store.$state))
  // })
  window.addEventListener('beforeunload', () => {
    localStorage.setItem(KEY, JSON.stringify(store.$state))
  })
  // 取
  if (store.$id === 'effect') {
    const local = localStorage.getItem(KEY)
    if (!local) return
    try {
      const state = JSON.parse(local)
      store.$patch(state)
    } catch (e) {
      console.log(e)
      console.log('存储格式无效')
    }
  }
}
