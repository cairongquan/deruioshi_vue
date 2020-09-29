import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../components/home.vue'//主页
import company from '../components/company/company.vue';//公司
import goodsA from '../components/goods/goodsA.vue';//产品简介首页
import goodsB from '../components/goods/goodsInfo.vue';//产品详细页
import project from '../components/project/project.vue';//项目首页
import proInfo from '../components/project/projectInfo.vue';//项目详情
import proProgress from '../components/project/projectProgress.vue';//项目进度

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

// 首页路径
const routes = [
  // 主页路由
  {
    path: '/home', //主页
    component: home,
    meta: {
      keepAlive: true,//缓存页面
      type: 1,
      index: 0
    }
  },
  // 公司路由
  {
    path: '/company', //公司
    component: company,
    meta: {
      keepAlive: true, //缓存页面
      type: 1,
      index: 0
    }
  },
  {
    path: '/goods', //产品
    component: goodsA,
    meta: {
      keepAlive: true,//缓存页面
      type: 1,
      index: 0
    },
  },
  {
    path: '/goodsInfo/:id', //产品详情页面
    component: goodsB,
    props: true,
    meta: {
      type: 0,
      index: 1
    }
  },
  {
    path: '/project', //项目首页
    component: project,
    meta: {
      type: 1
    }
  },
  {
    path: '/proInfo/:num', //项目详情页
    component: proInfo,
    props: true,
    meta: {
      type: 0
    }
  },
  {
    path: '/proInfo/proProgress/:id', //项目进度页
    component: proProgress,
    props: true,
    meta: {
      type: 0
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
