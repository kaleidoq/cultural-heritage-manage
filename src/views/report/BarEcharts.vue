<template>
  <div class="report">
    <!-- <div ref="echartDiv"></div> -->
    <div style="width: 1000px; height: 400px" ref="bar_echart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
// import echarts from './echart'; //按需引入echarts

export default {
  props: {
    title: {
      type: String,
      default() {
        return "";
      },
    },
    legendName: {
      type: Array,
      default() {
        return ["A", "B", "C", "D", "E"];
      },
    },
    barData: {
      type: Array, // 类型：数组，
      default() {
        // 默认值
        return [
          // {
          //   data: [10, 22, 28, 43, 49],
          //   type: "bar",
          //   stack: "x",
          // },
          // {
          //   data: [5, 4, 3, 5, 10],
          //   type: "bar",
          //   stack: "x",
          // },
        ];
      },
    },
  },
  data() {
    return {
      chart: echarts.ECharts,
      // 图表的配置项
      option: {
        title: {
          text: "title",
        },
        // 提示框信息
        tooltip: {
          show: true, //控制显隐
          trigger: "item",
          //   formatter: "{a} <br/>{b} : {c} ({d}%)", // 提示框显示所占百分比
        },
        // 图例，标题下面一点点
        legend: {
          bottom: 4,
          left: "center",
          textStyle: {
            // 颜色
            color: "black",
          },
          //   data: legendName, //展示的内容
        },
        xAxis: {
          type: "category",
          data: ["A", "B", "C", "D", "E"],
          axisLabel: {
            rotate: 45,
          },
        },
        yAxis: {
          type: "value",
        },
        // 无块饼状图每部分的颜色
        color: ["#9196f6", "#f1817f", "#00a3df", "#11dfb7", "#9c1db7"],
        series: [],
      },
    };
  },
  mounted() {
    this.initEcharts();
    // mounted里面调用初始化echarts的函数，
    // 一般mounted里面初始化图表相关东西，created里面初始化页面的整体数据
  },
  // 监听主要数据barData的变化，
  watch: {
    barData: {
      deep: true, //是否深度监听？是
      handler() {
        // 如果监听的数据发生变化，就执行下列函数
        console.log(this.legendName);
        console.log(this.barData);

        this.changeEcharts(this.title, this.legendName, this.barData);
      },
    },
    legendName: {
      deep: true, //是否深度监听？是
      handler() {
        // 如果监听的数据发生变化，就执行下列函数
        console.log(this.legendName);
        console.log(this.barData);
        this.changeEcharts(this.title, this.legendName, this.barData);
      },
    },
  },
  methods: {
    changeEcharts(title, legendName, barData) {
      this.option.title.text = title;
      this.option.xAxis.data = legendName;
      this.option.series = barData;
      this.chart.setOption(this.option);
    },
    // 三个参数的使用，使得echarts能够动态获取数据，调用此组件只要传此三个参数过来就能动态调用了
    initEcharts() {
      // 初始化echarts图表
      this.chart = echarts.init(this.$refs.bar_echart);
      this.chart.setOption(this.option);
    },
  },
};
</script>

<style>
</style>