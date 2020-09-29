<template>
  <div>
    <header-a> 项目 </header-a>
    <div class="content">
      <div class="p10 mt10">
        <div
          class="back100 flex color_white i24 relative"
          style="
            height: 75px;
            line-height: 75px;
            background-image: url(../../public/images/saomaBg2.png);
          "
        >
          <i class="iconfont icon-saoma ml10 flex1 ac"></i>
          <div class="f16 flex0 ac">扫码查询项目进度</div>
          <div class="flex1"></div>
          <div class="link showBarcodeBox"></div>
          <div class="link" @click="toProInfo"></div>
        </div>
        <div class="mt10 ac color_gray4">扫描二维码查询项目生产进度</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toProInfo() {
      let str = '/proInfo/' + 'DRS20012'
      this.$router.push({ path: str })
    }
  }
}
</script>

<style scoped>
</style>