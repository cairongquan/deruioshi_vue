import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../components/home.vue'//主页
import company from '../components/company/company.vue';//公司

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

// 首页路径
const routes = [
  // 主页路由
  {
    path: '/home',
    component: home
  },
  // 公司路由
  {
    path: '/company',
    component: company,
    meta: {
      keepAlive: true //缓存页面
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
