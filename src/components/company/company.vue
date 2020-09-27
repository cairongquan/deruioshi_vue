<template>
  <!-- 公司主页 -->
  <div>
    <!--头部区域-->
    <header-a :title="公司简介"></header-a>
    <!--主体内容区域-->
    <div class="content">
      <div class="mt10 bg_white contnetMainBox f18 p10 lh30">
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: ''
    }
  },
  // 请求公司数据
  async created() {
    let { data: res } = await this.$http.get('company');
    this.content = res.data;
  }
}
</script>

<style scoped>
</style>