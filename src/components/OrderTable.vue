<template>
  <div>
    <div class="table">
      <el-table :data="data" stripe border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_id"></el-table-column>
        <el-table-column label="订单价格" prop="price"></el-table-column>
        <el-table-column label="快递单号" prop="express_id">
          <template slot-scope="scope">
            {{ scope.row.express_id }}
            <el-button size="mini">查看收货地址</el-button>
          </template>
        </el-table-column>
        <el-table-column label="是否付款" prop="is_pay">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status === '0'"
              >未付款</el-tag
            >
            <el-tag type="danger" v-else>已付款</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column label="是否发货" prop="is_send">
            <template slot-scope="scope">
              <template>
                {{ scope.row.is_send }}
              </template>
            </template>
          </el-table-column> -->
        <el-table-column label="下单时间" prop="create_time">
          <template slot-scope="scope">
            {{ scope.row.create_time | datetimeFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="showGoodBox(scope.row.goods_id)"
              >查看商品</el-button
            >
            <el-button
              size="mini"
              v-show="path != '/users/user'"
              @click="toUser(scope.row.seller_user_id)"
              >查看卖家</el-button
            >
            <el-button size="mini" @click="toUser(scope.row.buyer_user_id)"
              >查看买家</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="dialog">
      <good-detail :showDialog="showDialog" ref="GoodRef"></good-detail>
    </div>
  </div>
</template>

<script>
import GoodDetail from "./GoodDetail.vue";
export default {
  components: {
    GoodDetail,
  },
  props: {
    data: {
      type: Array,
    },
  },
  data() {
    return {
      showDialog: false,
      good_id: "",
      path: "",
    };
  },
  mounted() {
    this.path = this.$route.path;
  },
  methods: {
    showGoodBox(id) {
      this.showDialog = true;
      console.log(id);
      console.log(this.showDialog);
      this.$refs.GoodRef.getGood(id);
    },
    toUser(id) {
      this.$router.push({ name: "users/user", query: { user_id: id } });
    },
    showBox() {},
    showProgressBox() {},
  },
};
</script>

<style>
</style>