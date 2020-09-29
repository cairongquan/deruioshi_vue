<template>
  <div>
    <header-a>产品简介</header-a>
    <div style="margin-top: 68px">
      <van-tabs
        @rendered="rednerTab"
        @click="tabsClickEvent"
        title-inactive-color="#cccccc"
        title-active-color="#2c77e5"
        color="#2c77e5"
      >
        <van-tab
          v-for="(item, index) in tabData"
          :title="item.title"
          :key="index"
          :name="item.id"
        >
        </van-tab>
      </van-tabs>
      <van-loading
        color="#2c77e5"
        class="center"
        v-show="loadingShow"
        size="50px"
        type="spinner"
        style="z-index: 9999"
      />
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        pulling-text="下拉刷新产品"
        loosing-text="松开即可刷新"
        loading-text="加载中"
        style="min-height: 100vh"
      >
        <div class="p5 h100">
          <div
            class="p5 w50 relative"
            v-for="(item, index) in goodsData"
            :key="index"
          >
            <div class="link" @click="toGoodsInfo(item.id)"></div>
            <div class="relative radius shadow hidden">
              <img
                :src="imgOSS(config.imgPath + item.filepaths, 400, 400)"
                class="radius"
              />
              <div
                class="absolute bottom0 ac of eh36 color_white lh36 w100"
                style="background-color: rgba(0, 0, 0, 0.5)"
              >
                {{ item.title }}
              </div>
            </div>
          </div>
        </div>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadingShow: false,
      count: 0,
      goodsData: [],//产品数据数组
      touchObj: null,
      isLoading: false,
      tabData: [],//tabs数据
      reqParams: '',
      config: this.$config,
      imgOSS: this.$ph.imgOSS
    }
  },
  methods: {
    async creatTabs() { //创建tab栏
      let { data: res } = await this.$http.get('goods/cat');
      this.tabData = res.data;
    },
    async onRefresh() {//下拉刷新事件
      this.loadingShow = true;
      let { data: res } = await this.$http.get('goods', {
        params: {
          page: 1,
          cat_id: this.reqParams
        }
      })
      this.goodsData = res.data;
      this.isLoading = false;//清空下拉刷新
      this.loadingShow = false;
    },
    tabsClickEvent(name, title) {//tab点击事件
      this.reqParams = name;
      this.onRefresh();
    },
    rednerTab(name, title) {//标签首次被渲染触发
      this.reqParams = name;
      this.onRefresh();
    },
    toGoodsInfo(id) { //跳转至商品详情页
      let str = 'goodsInfo/' + id;
      this.$router.push({ path: str });//跳转至商品详情
    }
  },
  created() { //钩子函数 初始化页面
    this.creatTabs();
    console.log(this.$ph.imgOSS);
  }
}
</script>

<style scoped>
</style>