<template>
  <div class="goods-list">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6" class="select">
          <el-select v-model="queryInfo.column" placeholder="搜索的列名">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-input
            placeholder="请输入搜索商品名称"
            v-model="queryInfo.query"
            class="input-with-select"
            clearable
            @change="getGoods"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="toAdd()">添加商品</el-button>
        </el-col>
        <el-col :span="5">
          <classify-select
            @changeClassify="changeClassify"
            @clearClassify="clearClassify"
          ></classify-select>
        </el-col>
      </el-row>
      <el-row>
        <good-table :data="goodsList"></good-table>
      </el-row>
      <el-row>
        <!-- 分页  -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="[5, 10, 20]"
            :page-size="queryInfo.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import ClassifySelect from "@/components/ClassifySelect.vue";
import GoodTable from "@/components/GoodTable.vue";
export default {
  components: {
    GoodTable,
    ClassifySelect,
  },
  data() {
    return {
      //   queryGood: "",
      options: [
        {
          label: "标题",
          value: "title",
        },
        {
          label: "商品详情",
          value: "content",
        },
        {
          label: "标签",
          value: "tags",
        },
      ],
      queryInfo: {
        column: "",
        query: "", //	查询参数	可以为空
        pagenum: 1, //	当前页码	不能为空
        pagesize: 10, //每页显示条数	不能为空
      },
      total: 0,
      goodsList: [],
    };
  },
  created() {
    this.getGoods();
  },
  methods: {
    // 获取商品列表
    async getGoods() {
      const { data: res } = await this.$axios.get("/getGoodsList", {
        params: this.queryInfo,
      });
      // if (res.meta.status != 200) return this.$message.error("获取列表错误!");
      console.log(res);
      this.total = res.total;
      console.log(this.total);
      this.goodsList = res.list.map((item) => {
        let imgs = item.images.split(",");
        item.images = imgs;
        item.cover = imgs[0];
        return item;
      });
      // this.goodsList = res;
      // this.total = res.data.total;
      console.log(this.goodsList);
    },
    //   改变页码大小
    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize;
      this.getGoods();
    },
    // 当前页码改变
    handleCurrentChange(page) {
      this.queryInfo.pagenum = page;
      this.getGoods();
    },
    toAdd() {
      this.$router.push({ name: "goods/addGoods" });
    },
    changeClassify(e) {
      this.queryInfo.query = e.class_id;
      this.queryInfo.column = "class_id";
      this.getGoods();
      console.log(e);
    },
    clearClassify() {
      this.queryInfo.query = "";
      this.getGoods();
    },
  },
};
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 10px;
}
.image {
  max-width: 200px;
  max-height: 200px;
}
</style>