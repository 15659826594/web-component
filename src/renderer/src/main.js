import '@assets/css/base.css'
import '@src/utils/prototype'
import '@src/web_components/install'
import router from '@src/router/index'
import directive from '@src/directive/index'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from '@src/store/persist'
import App from './App.vue'

const pinia = createPinia()
pinia.use(piniaPersist)
const app = createApp(App)

app.use(pinia).use(router).use(directive).mount('#app')
