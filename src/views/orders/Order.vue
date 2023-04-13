<template>
  <div class="order">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入搜索商品名称"
            v-model="queryInfo.query"
            class="input-with-select"
            clearable
            @change="getList()"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <order-table :data="orderList"></order-table>
        <!-- 分页 -->
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
import OrderTable from "@/components/OrderTable.vue";
export default {
  components: { OrderTable },
  data() {
    return {
      queryInfo: {
        column: "",
        query: "", //	查询参数	可以为空
        pagenum: 1, //	当前页码	不能为空
        pagesize: 5, //每页显示条数	不能为空
      },
      total: 100,
      orderList: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const { data: res } = await this.$axios.get("/getOrderList", {
        params: this.queryInfo,
      });
      this.total = res.total;
      console.log(res);
      this.orderList = res.list;
    },
    // 对每页多少条这个数据进行监听
    handleSizeChange(newsize) {
      this.queryInfo.pagesize = newsize;
      this.getList();
    },
    // 对修改页码进行监听
    handleCurrentChange(newpage) {
      this.queryInfo.pagenum = newpage;
      this.getList();
    },
  },
};
</script>

<style>
</style>