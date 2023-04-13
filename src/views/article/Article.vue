<template>
  <div class="users">
    <!-- 卡片内放搜索表格等 -->
    <el-card class="box-card" style="width: 100%; heith: 100%">
      <!-- 搜索添加区域 -->
      <el-row class="select-add" :gutter="20">
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
        <el-col :span="10" class="select">
          <el-input
            placeholder="请输入搜索内容"
            v-model="queryInfo.query"
            clearable
            @change="getList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getList"
            ></el-button>
          </el-input>
        </el-col>
        <!-- 添加用户 -->
        <el-col :span="6">
          <!-- <el-button class="add-btn" @click="addDialogVisible = true">
            添加用户</el-button> -->
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <div class="user-card">
        <article-table :data="tableData"></article-table>
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
      </div>
    </el-card>
  </div>
</template>

<script>
import ArticleTable from "@/components/ArticleTable.vue";
export default {
  components: { ArticleTable },
  data() {
    // 验证邮箱的规则
    /*  var checkEmail = (rule, value, cb) => {
      const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (regEmail.test(value)) return cb();
      else cb(new Error("请输入合法的邮箱"));
    };
    var checkMobile = (rule, value, cb) => {
      const regEmail =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (regEmail.test(value)) return cb();
      else cb(new Error("请输入合法的手机号"));
    }; */
    return {
      queryInfo: {
        column: "title",
        query: "",
        pagenum: 1, //当前页码
        pagesize: 10, //每页显示条数
      },
      options: [
        {
          label: "标题",
          value: "title",
        },
        {
          label: "内容",
          value: "content",
        },
        {
          label: "标签",
          value: "tags",
        },
      ],
      selectColumn: "title",
      tableData: [],
      total: 100,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取用户列表
    async getList() {
      console.log(this.queryInfo);
      const { data: res } = await this.$axios.get("/queryArticleList", {
        params: this.queryInfo,
      });
      let list = [];
      res.list.map((item) => {
        if (item.images) item.images = item.images.split(",");
        list.push(item);
      });
      // await this.$axios.post("login", submitForm);
      // console.log(res);
      // if (res.meta.status !== 200)
      //   return this.$message.error("用户列表获取失败！");
      this.tableData = list;
      this.total = res.total;
      console.log(this.tableData);
      // this.total = res.data.total;
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

<style lang="less" scoped>
.select-add {
  padding-bottom: 15px;
}
.block {
  margin-top: 15px;
}
.role-dialog {
  padding: 0 30px;
  p {
    text-align: left;
  }
}
.image {
  max-width: 200px;
  max-height: 200px;
}
</style>