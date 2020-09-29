<template>
  <div>
    <header-b>产品详情</header-b>
    <div class="content">
      <img :src="goodsImg" />
      <div class="p10">
        <!-- 标题 -->
        <div class="f18 color_gray6">
          {{ title }}
        </div>
        <div class="mt10" v-html="content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      goodsImg: '',
      title: '',
      content: ''
    }
  },
  methods: {
    async getGoodsInfo() { //获取商品详情
      let { data: res } = await this.$http.get('goods', {
        params: {
          id: this.id
        }
      })
      //   渲染页面
      this.goodsImg = !res.data.filepaths ? '../../../images/noImg.jpg' : this.$config.imgPath + res.data.filepaths;
      this.title = res.data.title;
      this.content = res.data.content;
    }
  },
  created() {
    this.getGoodsInfo();
  },
}
</script>

<style scoped>
</style>