<template>
  <div>
    <el-select
      v-model="value"
      placeholder="请选择分类"
      clearable
      @change="change"
      @clear="clear"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      options: [],
    };
  },
  created() {
    this.getClassify();
  },
  methods: {
    async getClassify() {
      const { data: res } = await this.$axios.get("/getClassify");
      // if (res.meta.status != 200) return this.$message.error("获取列表错误!");
      console.log(res);
      res.map((item) => {
        let el = {};
        el.value = item.class_id;
        el.label = item.class_name;
        this.options.push(el);
      });

      console.log(this.options);
      //   this.options = res;
    },
    change(e) {
      this.$emit("changeClassify", { class_id: e });
    },
    clear() {
      this.$emit("clearClassify");
    },
  },
};
</script>

<style>
</style>