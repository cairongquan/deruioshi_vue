import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import '../plugin/vans' //引入vant组件库

import headerA from '../publicComponents/header-a.vue'//公共组件(A类头部标签)
import headerB from '../publicComponents/header-b.vue'//公共组件(B类头部标签)


import phoenix from '../public/phoenix' //导入phoenix插件库


// 样式引入
import '../public/gola.css'
import '../public/phoenix.css'

Vue.prototype.$ph = phoenix; //使用phoenix插件库

Vue.config.productionTip = false;
// 设置api接口
Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://deruishi.a.jinyiyun.net/api/';//默认api地址前缀



// 全局默认数据
const config = {
  imgPath: 'https://deruishi.oss-cn-shanghai.aliyuncs.com/'//默认图片路径
}
Vue.prototype.$config = config;



const plugins = { //公共组件注册区域
  install(Vue) {
    Vue.component('header-a', headerA);
    Vue.component('header-b', headerB);
  }
}
Vue.use(plugins);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
