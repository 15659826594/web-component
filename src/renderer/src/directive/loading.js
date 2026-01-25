import { Loading } from '@src/components/web/dialog'

export default {
  install(Vue) {
    Vue.directive('loading', {
      mounted(el, binding) {
        if (binding.value) Loading.service(Loading.normalize(el))
        const observerListener = new MutationObserver((mutationsList) => {
          if (!el._loading) return
          for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName.startsWith('loading-')) {
              let newVal = mutation.target.getAttribute(mutation.attributeName)
              switch (mutation.attributeName) {
                case 'loading-text':
                  el._loading.text = newVal
                  break
                case 'loading-spinner':
                case 'loading-svg':
                  el._loading.svg = newVal
                  break
                case 'loading-svg-view-box':
                  el._loading.svgViewBox = newVal
                  break
                case 'loading-background':
                  el._loading.background = newVal
                  break
                case 'loading-custom-class':
                  el._loading.customClass = newVal
                  break
              }
            }
          }
        })
        observerListener.observe(el, { attributes: true })
        el._observerListener = observerListener
      },
      updated(el, binding) {
        if (binding.oldValue === binding.value) return
        if (el._loading) {
          binding.value ? el._loading.show() : el._loading.close()
        } else {
          if (binding.value) Loading.service(Object.assign(Loading.normalize(el), binding.modifiers))
        }
      },
      unmounted(el) {
        el._loading?.destroy()
        el._observerListener?.disconnect()
        delete el._observerListener
      }
    })
  }
}
