<template>
  <div class="report">
    <!-- <div ref="echartDiv"></div> -->
    <div style="width: 1000px; height: 400px" ref="line_echart"></div>
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
    lineChartData: {
      type: Array, // 类型：数组，
      default() {
        // 默认值
        return [
          { value: 335, name: "A行" },
          { value: 310, name: "B行" },
          { value: 274, name: "C行" },
          { value: 235, name: "D行" },
          { value: 400, name: "E行" },
        ];
      },
      /* type: Object, // 类型：对象，
      default() {
        // 默认值
        return {
          lengendName: ["A行", "B行", "C行", "D行", "E行"],
          sericeData: [
            { value: 335, name: "A行" },
            { value: 310, name: "B行" },
            { value: 274, name: "C行" },
            { value: 235, name: "D行" },
            { value: 400, name: "E行" },
          ],
        };
      }, */
    },
  },
  mounted() {
    this.initEcharts();
    // mounted里面调用初始化echarts的函数，
    // 一般mounted里面初始化图表相关东西，created里面初始化页面的整体数据
  },
  created(e) {
    console.log(e);
  },
  // 监听主要数据lineChartData的变化，
  watch: {
    lineChartData: {
      deep: true, //是否深度监听？是
      handler() {
        // 如果监听的数据发生变化，就执行下列函数
        console.log(this.lineChartData);
        // console.log(this.dateValue);
        const sericeData = this.lineChartData;
        let lengendName = [];
        sericeData.map((item) => {
          lengendName.push(item.name);
        });
        this.initEcharts(this.title, lengendName, sericeData);
      },
    },
  },
  methods: {
    // 三个参数的使用，使得echarts能够动态获取数据，调用此组件只要传此三个参数过来就能动态调用了
    initEcharts(title, legendName, Data) {
      // 初始化echarts图表
      const chart = echarts.init(this.$refs.line_echart);
      // 图表的配置项
      const option = {
        title: {
          text: title,
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
          data: legendName,
          axisLabel: {
            rotate: 45,
            // formatter(value) {
            //   return value.split("").join("\n");
            // },
          },
        },
        yAxis: {
          type: "value",
        },
        // 无块饼状图每部分的颜色
        color: ["#9196f6", "#f1817f", "#00a3df", "#11dfb7", "#9c1db7"],
        series: [
          {
            name: legendName,
            type: "line", //类型：饼状图
            // avoidLabelOverlap: true,
            // hoverAnimation: true, // 是否展示hover鼠标移入的动画效果
            // // 标签
            // label: {
            //   // color: "rgba(255, 255, 255, 1)",
            //   color: "rgba(0, 0, 0, 1)",
            // },
            // 连接标签的线
            // labelLine: {
            //   lineStyle: {
            //     // color: "rgba(255, 255, 255, 0.3)",
            //     color: "rgba(0, 0, 0, 0.3)",
            //   },
            //   smooth: 0.2,
            //   length: 10, //线的长度
            //   length2: 10, //线拐点的长度
            // },
            // 当鼠标hover滑过时，标签的样式
            // emphasis: {
            //   label: {
            //     show: true,
            //     fontWeight: "bold",
            //   },
            // },
            // 数据源
            data: Data,
          },
        ],
      };
      console.log(option.legend.data);

      console.log(option.series[0].name);
      chart.setOption(option);
    },
  },
};
</script>

<style>
</style>