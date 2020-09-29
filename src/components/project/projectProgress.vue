<template>
  <div>
    <header-b>项目进度</header-b>
    <div class="content">
      <div class="p10 ac color_gray5">部件信息</div>
      <div
        class="flex bg_white mt10"
        v-for="(item, index) in items"
        :key="index"
      >
        <div
          class="flex1 lh48 f16 ac color_gray4 flex_middle"
          style="border-right: 0.6px solid #cfcfcf"
        >
          {{ index + 1 }}
        </div>
        <div class="flex9 p10">
          <!-- 上层设备状态 -->
          <div class="flex flex_center">
            <div class="flex0">{{ item.title }}</div>
            <div
              class="flex0 ew48 ac ml10 radius10 color_white"
              style="background-color: rgba(13, 132, 244, 0.4)"
            >
              {{ item.type == 1 ? "采购" : "生产" }}
            </div>
            <div class="flex10 ar color_gray5">
              {{
                item.type == 1
                  ? caigouArr[item.status]
                  : shangchanArr[item.status] +
                    "(" +
                    item.current_procedure_title +
                    ")"
              }}
            </div>
          </div>
          <!-- 进度条 -->
          <div
            class="eh30 mt10 w100 radius100 hidden"
            style="border: 0.5px solid #cccccc; padding: 1px"
          >
            <div>
              <div
                class="h100 radius100"
                :style="{ width: item.percentage + '%' }"
              >
                <div
                  clss="bg_blue h100"
                  :style="{ 'background-color': wColor(item.percentage) }"
                ></div>
              </div>
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
      bgc: '',
      items: [],//项目进度数据数组
      caigouArr: ['待采购', '待交货', '已交货'],//采购数组
      shangchanArr: ['待生产', '生产中', '已完成']//生产数组
    }
  },
  props: ['id'],//设备id
  async created() {
    let { data: res } = await this.$http.get('device', {
      params: {
        device_id: this.id
      }
    })
    console.log(res);
    this.items = res.data;
  },
  methods: {
    wColor(p) { //判断颜色
      console.log(p);
      if (p <= 20) {
        return '#e75622'
      }
      if (p > 20 && p <= 60) {
        return '#f38812'
      }
      if (p > 60 && p <= 80) {
        return '#f7b112'
      }
      if (p > 80) {
        return '#b9f740'
      }
    }
  }
}
</script>

<style scoped>
</style>