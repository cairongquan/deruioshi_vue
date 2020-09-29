<template>
  <div class="content">
    <!-- 轮播图盒子 -->
    <div class="swipeBox">
      <van-swipe
        class="my-swipe"
        :autoplay="2000"
        indicator-color="white"
        style="height: 200px"
      >
        <van-swipe-item v-for="(item, index) in imgArr" :key="index">
          <img :src="item" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--计算器/扫码查询区域-->
    <div class="p10 bg_white">
      <!-- 搅拌设计计算器 -->
      <div
        class="flex i26 w100 ac f16 shadow color_white radius8 f16back100 relative"
        style="
          background-color: rgba(251, 189, 8, 0.6);
          height: 68px;
          line-height: 68px;
        "
      >
        <i class="iconfont icon-jisuan ml10 flex1 ac"></i>
        <span class="flex0 ac">搅拌设计计算器</span>
        <div class="flex1"></div>
        <div class="link computedBox"></div>
      </div>
      <div
        class="flex i26 mt10 eh48 w100 f16 ac lh48 shadow color_white radius8 f16 back100 relative"
        style="
          background-color: rgba(40, 77, 147.6);
          height: 68px;
          line-height: 68px;
        "
      >
        <i class="iconfont icon-saoma ml10 flex1 ac"></i>
        <span class="flex0 ac">扫码查询项目进度</span>
        <div class="flex1"></div>
        <div class="link projectBox"></div>
      </div>
    </div>
    <!--产品标题区域-->
    <div class="mt10 relative">
      <div class="box flex plr10 ptb12">
        <div class="flex1 f16 al color_gray6">产品</div>
        <div class="flex1 f16 al color_gray4 ar i22">
          <i class="phoenix_icon phoenix_icon_right"></i>
        </div>
      </div>
      <div class="link goodsShowBox"></div>
    </div>
    <!--商品展示区域-->
    <div class="p5 goodsContentBox mb5">
      <div
        class="p5 w50 relative"
        v-for="(item, index) in goodsArr"
        :key="index"
      >
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
          <div class="link" @click="toGoodsInfo(item.id)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgArr: [],//轮播图数据数组
      goodsArr: [],//产品数据数组
      imgOSS: this.$ph.imgOSS,
      config: this.$config
    }
  },
  methods: {
    async getBanner() { //请求轮播图数据
      let { data: res } = await this.$http.get('banner');
      let imgArr = [];//图片数据数组
      res.data.forEach(item => {
        imgArr.push(this.config.imgPath + item.filepaths);
      })
      this.imgArr = imgArr;
    },
    async getGoodsData() { //请求商品数据
      let { data: res } = await this.$http.get('goods');
      this.goodsArr = res.data;
    },
    toGoodsInfo(id) { //跳转至商品详情页
      let str = 'goodsInfo/' + id;
      this.$router.push({ path: str });//跳转至商品详情
    }
  },
  created() {
    this.getBanner();
    this.getGoodsData();
  },
}
</script>

<style scoped>
</style>