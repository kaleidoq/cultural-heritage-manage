<template>
  <div>
    <el-row>
      <el-alert
        title="选择时间时显示当天文章的发布时间，不选择时间时显示全部文章的发布时间"
        type="info"
        :closable="false"
      >
      </el-alert>
    </el-row>
    <el-row justify="center">
      <el-col :offset="3" :span="6">选择时间查看时间段发布数量</el-col>
      <el-col :span="6">
        <el-date-picker
          v-model="dateValue"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="选择日期"
          @change="changeDate"
        >
        </el-date-picker
      ></el-col>
    </el-row>
    <el-row>
      <el-col>
        <!-- // 父组件传值，传值方式 -->
        <!-- 在HTML标签里面直接写，对应子组件props中的，此处的值写在return里面 -->
        <!-- <PieChart :title="pieTitle" :pieChartData="pieDat" /> -->
        <echart1 :title="lineTitle" :lineChartData="lineChartData"></echart1>
      </el-col>
    </el-row>
  </div>
</template>



<script>
// import PieChart from "@/views/panel/box3.vue";
// import { chartData } from "./data";
import echart1 from "./LineEcharts.vue";

export default {
  components: {
    echart1,
  },
  // vuex监听
  //   watch: {
  //     "$store.state.currentCity": "changData",
  //   },
  data() {
    return {
      dateValue: "",
      lineTitle: "文章发布时间可视化",
      lineChartData: [],
    };
  },
  created() {
    this.getValue();
  },
  methods: {
    changeDate() {
      this.getValue();
    },
    async getValue() {
      const { data: res } = await this.$axios.get("/reportArticleDate", {
        params: { date: this.dateValue },
      });
      console.log(res);
      this.lineChartData = res;
      console.log(res);
    },
  },
};
</script>
