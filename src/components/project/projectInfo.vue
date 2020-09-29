<template>
  <div>
    <header-b>项目详情</header-b>
    <div class="content">
      <div class="p10 ac color_gray5">项目信息</div>
      <!-- 项目名称 -->
      <div class="p10 box flex">
        <div class="flex1 al color_gray5">项目名称</div>
        <div class="flex1 ar color_black">
          {{ projectInfo.title }}
        </div>
      </div>
      <!-- 项目号 -->
      <div class="p10 box flex">
        <div class="flex1 al color_gray5">项目号</div>
        <div class="flex1 ar color_black">
          {{ projectInfo.code }}
        </div>
      </div>
      <!-- 签订日期 -->
      <div class="p10 box flex">
        <div class="flex1 al color_gray5">签订日期</div>
        <div class="flex1 ar color_black">
          {{ projectInfo.sign_date }}
        </div>
      </div>
      <!-- 交货期-->
      <div class="p10 box flex">
        <div class="flex1 al color_gray5">交货期</div>
        <div class="flex1 ar color_black">
          {{ projectInfo.delivery_date }}天
        </div>
      </div>
      <!--工作令号开始-->
      <div class="p10 box flex">
        <div class="flex1 al color_gray5">工作令号开始</div>
        <div class="flex1 ar color_black">
          {{ projectInfo.work_order_start }}
        </div>
      </div>
      <div class="p10 ac color_gray5">搅拌装置</div>
      <div class="mtb10" v-for="(item, index) in devies" :key="index">
        <div class="box flex p10 flex_center color_gray6 relative">
          <div
            class="ew20 eh20 radius100 ac lh20 flex0 color_white"
            style="background-color: #42a5f5"
          >
            {{ index + 1 }}
          </div>
          <div class="flex1 ml10">
            {{ item.title }}
          </div>
          <div class="flex0 phoenix_icon phoenix_icon_right"></div>
          <div class="link" @click="toProgress(item.id)"></div>
        </div>
        <div class="p10 flex bg_white">
          <div class="flex0 color_gray5">
            <div class="mt10">重量:</div>
            <div class="mt10">数量:</div>
            <div class="mt10">工作令号:</div>
          </div>
          <div class="flex1 color_black ml10">
            <div class="mt10">{{ item.weight }}kg</div>
            <div class="mt10">{{ item.num }}</div>
            <div class="mt10">
              {{ item.work_order_start }} - {{ item.work_order_end }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      devies: [],//设备数据数组
      projectInfo: {}
    }
  },
  props: ['num'],
  methods: {
    async getData() { //获取数据
      console.log(this.num);
      let { data: res } = await this.$http.get('project', {
        params: {
          code: this.num
        }
      });
      this.projectInfo = res.data.project;
      this.devies = res.data.devices;
    },
    toProgress(id) { //跳转
      let str = '/proInfo/proProgress/' + id;
      this.$router.push(str);
    }
  },
  mounted() {
    this.getData();
  },
}
</script>

<style scoped>
</style>  