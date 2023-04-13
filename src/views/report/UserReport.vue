<template>
  <div>
    <el-row>
      <el-col :span="12">
        <echart1 title="用户性别数据" :pieChartData="userSexData"></echart1>
      </el-col>
      <el-col :span="12">
        <echart1 title="用户年龄数据" :pieChartData="userAgeData"></echart1>
      </el-col>
    </el-row>
    <barEchart
      title="用户地址省份总和"
      :barData="barUserAddress"
      :legendName="barLegendName"
    ></barEchart>
  </div>
</template>


<script>
import echart1 from "./PieEcharts.vue";
import barEchart from "./BarEcharts.vue";

export default {
  components: {
    echart1,
    barEchart,
  },
  data() {
    return {
      dateValue: "",
      // pieTitle: "天湖区网点存款份额",
      userSexName: [],
      userSexData: [],
      userAgeData: [],
      barUserAddress: [],
      barLegendName: [],
    };
  },
  created() {
    this.getSex();
    this.getAge();
    this.getAddress();
  },
  methods: {
    async getSex() {
      const { data: res } = await this.$axios.get("/reportUserSex");
      console.log(res);
      let list = [];
      res.map((item) => {
        let name = "";
        if (item.sex == 1) name = "男";
        else if (item.sex == 0) name = "女";
        else name = "无";
        let el = {
          name: name,
          value: item.value,
        };
        list.push(el);
      });
      console.log(list);
      this.userSexData = list;
    },
    async getAge() {
      const { data: res } = await this.$axios.get("/reportUserAge");
      console.log(res);
      let list = [];
      // res.map((item) => {
      //   let name = "";
      //   if (item.sex == 1) name = "男";
      //   else if (item.sex == 0) name = "女";
      //   else name = "无";
      //   let el = {
      //     name: name,
      //     value: item.value,
      //   };
      //   list.push(el);
      // });
      console.log(list);
      this.userAgeData = res;
    },
    async getAddress() {
      const { data: res } = await this.$axios.get("/reportUserAddress");
      let data = [];
      let name = [];
      res.map((item) => {
        data.push(item.count);
        name.push(item.province);
      });
      this.barLegendName = name;
      this.barUserAddress = [
        {
          data: data,
          type: "bar",
          stack: "省份",
        },
      ];
      console.log(this.barLegendName);
      console.log(this.barUserAddress);
    },
  },
};
</script>
