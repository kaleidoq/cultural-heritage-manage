<template>
  <div class="report">
    <!-- <div ref="echartDiv"></div> -->
    <div style="width: 500px; height: 400px" ref="pie_echart"></div>
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
    // legendName: {
    //   type: Array,
    //   default() {
    //     return ["A", "B", "C", "D", "E"];
    //   },
    // },
    pieChartData: {
      type: Array, // 类型：对象，
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
    },
  },
  mounted() {
    this.initEcharts();
    // mounted里面调用初始化echarts的函数，
    // 一般mounted里面初始化图表相关东西，created里面初始化页面的整体数据
  },
  created(e) {
    // console.log(e);
  },
  // 监听主要数据pieChartData的变化，
  watch: {
    pieChartData: {
      deep: true, //是否深度监听？是
      handler() {
        // 如果监听的数据发生变化，就执行下列函数
        console.log(this.pieChartData);
        const sericeData = this.pieChartData;
        let lengendName = [];
        sericeData.map((item) => {
          lengendName.push(item);
        });
        this.initEcharts(this.title, lengendName, sericeData);
      },
    },
  },
  methods: {
    // 三个参数的使用，使得echarts能够动态获取数据，调用此组件只要传此三个参数过来就能动态调用了
    initEcharts(title, legendName, pieData) {
      // 初始化echarts图表
      const chart = echarts.init(this.$refs.pie_echart);
      // 图表的配置项
      const option = {
        title: {
          text: title,
        },
        // 提示框信息
        tooltip: {
          show: true, //控制显隐
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)", // 提示框显示所占百分比
        },
        // 图例，标题下面一点点
        legend: {
          bottom: 4,
          left: "center",
          textStyle: {
            // 颜色
            color: "black",
          },
          data: legendName, //展示的内容
        },
        // 无块饼状图每部分的颜色
        color: ["#9196f6", "#f1817f", "#00a3df", "#11dfb7", "#9c1db7"],
        series: [
          {
            name: title,
            type: "pie", //类型：饼状图
            radius: ["45%", "57%"], // 控制饼状图的大小，两个radius使他变成环形图，
            center: ["50%", "55%"], // 图距离左右，上下距离的百分比
            avoidLabelOverlap: true,
            hoverAnimation: true, // 是否展示hover鼠标移入的动画效果
            // 标签
            label: {
              // color: "rgba(255, 255, 255, 1)",
              color: "rgba(0, 0, 0, 1)",
            },
            // 连接标签的线
            labelLine: {
              lineStyle: {
                // color: "rgba(255, 255, 255, 0.3)",
                color: "rgba(0, 0, 0, 0.3)",
              },
              smooth: 0.2,
              length: 10, //线的长度
              length2: 10, //线拐点的长度
            },
            // 当鼠标hover滑过时，标签的样式
            emphasis: {
              label: {
                show: true,
                fontWeight: "bold",
              },
            },
            // 数据源
            data: pieData,
          },
        ],
        /* series: [
          {
            name: "访问来源",
            type: "pie", // 设置图表类型为饼图
            radius: "55%", // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
            data: [
              // 数据数组，name 为数据项名称，value 为数据项值
              { value: 235, name: "视频广告" },
              { value: 274, name: "联盟广告" },
              { value: 310, name: "邮件营销" },
              { value: 335, name: "直接访问" },
              { value: 400, name: "搜索引擎" },
            ],
          },
        ], */
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