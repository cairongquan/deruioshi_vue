import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import headerA from '../publicComponents/header-a.vue'

// 样式引入
import '../public/gola.css'
import '../public/phoenix.css'


Vue.config.productionTip = false
// 设置api接口
Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://deruishi.a.jinyiyun.net/api/';//默认api地址前缀
Vue.component('header-a', headerA)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
