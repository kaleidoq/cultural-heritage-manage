<template>
  <div class="report">
    <pie-echars title="订单成交价格范围" :pieChartData="pieData"></pie-echars>
    <div ref="echartDiv" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script>
import PieEchars from "./PieEcharts.vue";

// import * as echarts from "echarts";
export default {
  components: {
    PieEchars,
  },
  data() {
    return {
      //   pieData: {},
      pieData: [],
      //   option: null,
    };
  },
  //   mounted() {
  computed: {},
  created() {
    this.getValue();
  },
  methods: {
    async getValue() {
      const { data: res } = await this.$axios.get("/reportOrderPrice");
      console.log(res);
      //   let sericeData = res;
      //   let lengendName = [];
      //   res.map((item) => {
      //     lengendName.push(item.name);
      //   });
      //   this.pieData = {
      //     lengendName: lengendName,
      //     sericeData: sericeData,
      //   };
      this.pieData = res;
      console.log(res);
    },
    // drawEcharts() {
    //   // 基于准备好的dom，初始化echarts实例
    //   var myChart = echarts.init(this.$refs.echartDiv);
    //   // 指定图表的配置项和数据

    //   console.log(option.data);
    //   // 使用刚指定的配置项和数据显示图表。
    //   myChart.setOption(this.option);
    // },
  },
};
</script>

<style>
</style>