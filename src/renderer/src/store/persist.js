const KEYPREFIX = 'PINIA:STATE:'

export default (context) => {
  const { store } = context
  const KEY = KEYPREFIX + store.$id
  // 存
  window.addEventListener('beforeunload', () => {
    localStorage.setItem(KEY, JSON.stringify(store.$state))
  })
  // 取
  if (store.$id === 'effect') {
    const item = localStorage.getItem(KEY)
    if (!item) {
      return
    }
    try {
      const originState = JSON.parse(item)
      store.$patch(originState)
    } catch (e) {
      console.log(e)
      console.log('存储格式无效')
    }
  }
}
