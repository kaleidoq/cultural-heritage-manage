<template>
  <div class="user">
    <!--   <el-row>
      <el-button @click="setAddress()">修改地址</el-button>
      <el-button @click="setTime()">修改时间</el-button>
    </el-row> -->
    <el-card>
      <el-row class="head">
        <el-col :span="2">
          <el-avatar :size="70" :src="this.user.head"></el-avatar>
        </el-col>
        <el-col :span="12">
          昵称： {{ this.user.nickname }}<br />
          个人介绍： {{ this.user.introduce }}
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
      <el-row style="margin-top: 20px">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="发布的文章" name="first">
            <el-empty
              v-if="articleList.length == 0"
              description="该用户暂未发布过文章"
            ></el-empty>
            <article-table v-else :data="articleList"></article-table>
          </el-tab-pane>
          <el-tab-pane label="发布的商品" name="second">
            <el-empty
              v-if="goodList.length == 0"
              description="该用户暂未发布商品"
            ></el-empty>
            <good-table v-else :data="goodList"></good-table>
          </el-tab-pane>
          <el-tab-pane label="购买的订单" name="third">
            <el-empty
              v-if="orderList.length == 0"
              description="该用户暂未下单"
            ></el-empty>
            <order-table v-else :data="orderList"></order-table>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import ArticleTable from "@/components/ArticleTable.vue";
import OrderTable from "@/components/OrderTable.vue";
import GoodTable from "@/components/GoodTable.vue";
export default {
  components: {
    ArticleTable,
    OrderTable,
    GoodTable,
  },
  data() {
    return {
      //   queryGood: "",
      goodsList: [],
      pageType: {
        query: "", //	查询参数	可以为空
        pagenum: 1, //	当前页码	不能为空
        pagesize: 10, //每页显示条数	不能为空
      },
      total: 0,
      user_id: Number,
      user: {},
      activeName: "first",
      articleList: [],
      goodList: [],
      orderList: [],
    };
  },
  created() {
    this.user_id = this.$route.query.user_id;
    this.getUser();
    this.getArticle();
    this.getOrder();
    this.getGood();
  },
  methods: {
    async setAddress() {
      console.log(this.queryInfo);
      const { data: res } = await this.$axios.post("/setAddress");
      console.log(res);
    },
    async setTime() {
      console.log(this.queryInfo);
      const { data: res } = await this.$axios.post("/setAge");
      console.log(res);
    },
    // 获取商品列表
    async getUser() {
      let user = { user_id: this.user_id };
      const { data: res } = await this.$axios.get("/getUser", {
        params: user,
      });
      this.user = res;
      // console.log(this.user);
    },
    async getArticle() {
      let user = { user_id: this.user_id };
      const { data: res } = await this.$axios.get("/getUserArticle", {
        params: user,
      });
      res.map((item) => {
        if (item.images) item.images = item.images.split(",");
        this.articleList.push(item);
      });
      // this.articleList = res;
      // console.log(this.articleList);
    },
    async getGood() {
      let user = { user_id: this.user_id };
      const { data: res } = await this.$axios.get("/getUserGood", {
        params: user,
      });
      res.map((item) => {
        if (item.images) item.images = item.images.split(",");
        this.goodList.push(item);
      });
      // console.log(this.goodList);
    },
    async getOrder() {
      let user = { user_id: this.user_id };
      const { data: res } = await this.$axios.get("/getUserOrder", {
        params: user,
      });
      res.map((item) => {
        if (item.images) item.images = item.images.split(",");
        this.articleList.push(item);
      });
      // this.articleList = res;
      // console.log(this.articleList);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style lang="less" scoped>
.user {
  .head {
    display: flex;
    align-items: center;
  }
}
.el-row {
  margin-bottom: 10px;
}
.image {
  max-width: 200px;
  max-height: 200px;
}
</style>