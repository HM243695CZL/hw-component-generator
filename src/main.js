import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueRunSfc from 'vue-run-sfc'
import './icons/iconfont/iconfont'
import 'normalize.css/normalize.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'
import Tinymce from '@/components/tinymce'
Vue.use(VueRunSfc)
Vue.use(Element)
Vue.component('tinymce', Tinymce)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
