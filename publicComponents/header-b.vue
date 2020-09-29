
<template>
  <header class="header header_white header_back flex">
    <div class="flex2 pl10 relative" @click="goBack">
      <i class="phoenix_icon phoenix_icon_left"></i>
    </div>
    <div class="flex6 ac head_tittle">
      <!-- 标题插槽 -->
      <slot></slot>
    </div>
    <div class="flex2"></div>
  </header>
</template>


<script>
export default {
  methods: {
    goBack() {
      this.$router.back(-1);
    }
  },
  mounted() {
    //   只要是B类页面 就将Tab隐藏
    document.querySelector('.bottomTabs').style.display = 'none';
  }
}
</script>

<style scoped>
</style>