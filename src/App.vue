<template>
  <div>
    <!-- 路由占位符 -->
    <keep-alive>
      　　<router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>

    <!-- 不需要缓存 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- 顶部tab -->
    <div class="bottomTabs" style="z-index: 999">
      <ul class="border nav border_t">
        <li
          class="ac f16"
          style="font-size: 10px"
          v-for="(item, index) in tabsData"
          :key="index"
        >
          <div class="link tabCheck" @click="tabClick(index)"></div>
          <div v-html="item.isCheck ? item.icon : item.icon1"></div>
          <div :class="{ color: item.isCheck }">
            {{ item.name }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      indexPageName: 'home', //首页路径
      activeIndex: 0, //当前激活的index tab
      beforeIndex: 0,//之前激活的index tab
      // tab顶部标签数据栏
      /*
        isCheck是否点击
        icon被选中icon
        icon1 未被选中icon
        url 跳转路由名称
        name 路由名称
      */
      tabsData: [{
        isCheck: false,
        icon: '<svg class="icons color" aria-hidden="true"><use xlink:href="#icon-shouye"></use></svg>',
        icon1: '<svg class="icons " aria-hidden="true"><use xlink:href="#icon-shouye-copy"></use></svg>',
        url: 'home',
        name: '主页'
      },
      {
        isCheck: false,
        icon: '<svg class="icons color" aria-hidden="true"><use xlink:href="#icon-gongsi"></use></svg>',
        icon1: '<svg class="icons" aria-hidden="true"><use xlink:href="#icon-gongsi1-copy"></use></svg>',
        url: 'company',
        name: '公司'
      },
      {
        isCheck: false,
        icon: '<svg class="icons color" aria-hidden="true"><use xlink:href="#icon-chanpinguanli1-copy"></use></svg>',
        icon1: '<svg class="icons" aria-hidden="true"><use xlink:href="#icon-chanpinguanli1"></use></svg>',
        url: 'goods',
        name: '产品'
      },
      {
        isCheck: false,
        icon: '<svg class="icons color" aria-hidden="true"><use xlink:href="#icon-jisuan"></use></svg>',
        icon1: '<svg class="icons" aria-hidden="true"><use xlink:href="#icon-jisuan-copy"></use></svg>',
        url: 'computed',
        name: '计算'
      },
      {
        isCheck: false,
        icon: '<svg class="icons color" aria-hidden="true"><use xlink:href="#icon-communication"></use></svg>',
        icon1: '<svg class="icons" aria-hidden="true"><use xlink:href="#icon-communication-copy"></use></svg>',
        url: 'project',
        name: '项目'
      }],
    }
  },
  methods: {
    tabClick(index) {
      // 如果index与activeIndex相同 则不执行其它操作
      if (index == this.activeIndex) {
        return;
      }
      // 交换index
      this.beforeIndex = this.activeIndex;
      this.activeIndex = index;
      this.tabsData[this.beforeIndex].isCheck = false;
      this.tabsData[this.activeIndex].isCheck = true;
      this.$router.push({ path: this.tabsData[index].url });//跳转路由
    }
  },

  // 初始化界面 
  beforeMount() {
    let index = this.tabsData.findIndex(item => {
      return item.url == this.indexPageName;
    });
    this.tabsData[index].isCheck = true;
    this.activeIndex = index;
    this.$router.push({ path: this.tabsData[index].url });//跳转路由
  },
}
</script>


<style>
.bottomTabs {
  bottom: 0;
  width: 100%;
  position: fixed;
  height: 56px;
  display: flex;
}
</style>
