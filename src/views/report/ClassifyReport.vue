<template>
  <div>
    <echart1
      title="柱形图"
      :barData="barData"
      :legendName="legendName"
    ></echart1>
  </div>
</template>


<script>
import echart1 from "./BarEcharts.vue";

export default {
  components: {
    echart1,
  },
  data() {
    return {
      dateValue: "",
      pieTitle: "天湖区网点存款份额",
      legendName: [],
      barData: [],
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
      const { data: res } = await this.$axios.get("/reportClassArtDate", {
        params: { date: this.dateValue },
      });
      console.log(res);
      let list = [];
      list[0] = {
        name: "文章数量",
        type: "bar",
        stack: "总数",
        data: res.art,
      };
      list[1] = {
        name: "商品数量",
        type: "bar",
        stack: "总数",
        data: res.good,
      };
      this.legendName = res.name;
      this.barData = list;
      console.log(res);
    },
  },
};
</script>
