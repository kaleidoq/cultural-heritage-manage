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
            @chaneg="getList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getList"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <div class="user-card">
        <comment-table :data="commentList"></comment-table>
        <!-- <el-table
          :data="commentList"
          style="width: 100%; margin-bottom: 20px"
          row-key="comment_id"
          border
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
         <el-table-column prop="article_id" label="文章id" width="150">
            <template slot-scope="scope">
              {{ scope.row.article_id }}
              <el-button size="mini" @click="getArticle(scope.row.article_id)">
                查看文章</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="comment_content" label="评论内容" width="380">
          </el-table-column>
          <el-table-column prop="user_nickname" label="用户昵称">
          </el-table-column>
          <el-table-column prop="comment_create_time" label="发表评论时间">
            <template slot-scope="scope">
              {{ scope.row.comment_create_time | datetimeFormat }}
            </template>
          </el-table-column>
        </el-table> -->

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
import CommentTable from "@/components/CommentTable.vue";
export default {
  components: {
    CommentTable,
  },
  data() {
    return {
      queryInfo: {
        column: "user_nickname",
        query: "",
        pagenum: 1, //当前页码
        pagesize: 10, //每页显示条数
      },
      options: [
        {
          label: "用户昵称",
          value: "user_nickname",
        },
        {
          label: "评论内容",
          value: "comment_content",
        },
        {
          label: "文章id",
          value: "article_id",
        },
      ],
      selectColumn: "user_nickname",
      commentList: [],
      total: 100,
      // // 控制对话框打开关闭
      // addDialogVisible: false,
      // // 修改用户信息
      // editDialogVisible: false,
      // // 分配角色对话框
      // setRoleDialogVisible: false,
      // userInfo: {},
      // roleList: [],
      // selectedRoleId: "",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取用户列表
    async getList() {
      console.log(this.queryInfo);
      const { data: res } = await this.$axios.get("/getCommentList", {
        params: this.queryInfo,
      });
      // await this.$axios.post("login", submitForm);
      console.log(res);
      this.total = res.total;
      this.commentList = res.list;
      console.log(this.commentList);

      // if (res.meta.status !== 200)
      //   return this.$message.error("用户列表获取失败！");
      //   this.commentList = res.list;
      //   this.total = res.total;
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
    // 查找单个用户信息
    getUser(user) {
      this.addForm = user;
    },
    toUser(id) {
      this.$router.push({ name: "users/user", query: { user_id: id } });
      // this.$router.push({ name: "users/user" });
    },
    getArticle(id) {},
    // 关闭对话框
    addDialogClose() {
      this.$refs.addFormRef.resetFields();
    },
    // 添加用户信息
    addUser() {
      console.log(this.addForm);
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$axios.post("/users", this.addForm);
        console.log(res);
        if (res.meta.status != 201)
          return this.$message.error("用户添加失败！");
        this.$message.success("用户添加成功！");
        this.addDialogVisible = false;
        this.getList();
      });
    },
    // 修改用户信息
    editUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        const user = this.addForm;
        const { data: res } = await this.$axios.put(`users/${user.id}`, {
          email: user.email,
          mobile: user.mobile,
        });
        console.log(res);
        if (res.meta.status != 200)
          return this.$message.error("更新用户信息失败！");
        this.$message.success("更新用户信息成功！");
        this.editDialogVisible = false;
        this.getList();
      });
    },
    // 删除用户
    delectUser(id) {
      let user = { user_id: id };
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // const { data: res } = await this.$axios.delete(`deleteUser`, {
          //   user_id: user,
          // });
          const { data: res } = await this.$axios.post("deleteUser", user);
          console.log(res);
          this.$message.success("删除成功!");
          this.getList();
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 分配角色
    async setRole(user) {
      this.userInfo = user;
      this.setRoleDialogVisible = true;
      const { data: res } = await this.$axios.get("/roles");
      if (res.meta.status !== 200) return this.$message.error("请求列表失败！");
      console.log(res);
      this.roleList = res.data;
    },
    // 提交修改的角色分配
    async submitSetRole(role) {
      const { data: res } = await this.$axios.put(
        `users/${this.userInfo.id}/role`,
        { rid: this.selectedRoleId }
      );
      console.log(res);
      if (res.meta.status !== 200)
        return this.$message.error("提交角色授权失败！");
      this.$message.success("更新角色成功！");
      this.getList();
      this.setRoleDialogVisible = false;
    },
    // 关闭分配角色的对话框
    setRoleDialogClosed() {
      this.userInfo = {};
      this.selectedRoleId = "";
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
</style>