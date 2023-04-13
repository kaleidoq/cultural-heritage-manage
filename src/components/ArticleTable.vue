<template>
  <div>
    <div class="user-card">
      <el-empty
        v-if="data.length == 0"
        description="该用户暂未发布过文章"
      ></el-empty>
      <el-table
        v-else
        :data="data"
        style="width: 100%; heith: 100%"
        border
        stripe
      >
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="content" label="内容"> </el-table-column>
        <el-table-column prop="cover_pic" label="图片" width="175">
          <template slot-scope="scope">
            <div
              v-if="scope.row.images instanceof Array && scope.row.images != ''"
            >
              <el-badge
                v-if="scope.row.images.length != 0"
                style="margin-top: 10px"
                :value="scope.row.images.length"
                class="item"
              >
                <el-image
                  v-if="scope.row.images[0]"
                  style="width: 150px; height: 100px"
                  fit="cover"
                  :src="scope.row.images[0]"
                  :preview-src-list="scope.row.images"
                >
                </el-image>
              </el-badge>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="class_name" label="分类名" width="70">
        </el-table-column>
        <el-table-column prop="tags" label="标签" width="120">
        </el-table-column>
        <el-table-column
          v-if="path == '/article/list'"
          prop="is_del"
          label="删除"
          width="50"
        >
          <template slot-scope="scope">
            {{ scope.row.is_del ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="100">
          <template slot-scope="scope">
            {{ scope.row.create_time | datetimeFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="70">
          <template slot-scope="scope">
            <div class="operation">
              <!-- 审核按钮 -->
              <el-tooltip
                class="item"
                effect="dark"
                content="审核通过"
                placement="top"
              >
                <el-button
                  v-if="path == '/article/audit'"
                  type="primary"
                  icon="el-icon-check"
                  size="mini"
                  @click="setAudit(scope.row.article_id)"
                ></el-button>
              </el-tooltip>

              <!-- 查看评论 -->
              <!-- <el-button
                type="primary"
                icon="el-icon-chat-line-square"
                size="mini"
                @click="delectUser(scope.row.user_id)"
              ></el-button> -->
              <!-- 删除按钮 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="delectArticle(scope.row.article_id)"
              ></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      path: "",
    },
  },
  created() {
    console.log(this.$route.path);
    this.path = this.$route.path;
  },
  methods: {
    // toArray(item) {
    //   if (item.images) {
    //     console.log(item.images.split(","));
    //     return item.images.split(",");
    //   } else return;
    // },
    // 审核文章通过
    async setAudit(id) {
      const { data: res } = await this.$axios.post("setAudit", {
        article_id: id,
      });
      console.log(res);
      if (res.affectedRows == 1) {
        this.$emit("getList");
      }
    },
    // 删除用户
    delectArticle(id) {
      let user = { user_id: id };
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // const { data: res } = await this.$axios.delete(`deleteUser`, {
          //   user_id: user,
          // });
          const { data: res } = await this.$axios.post("delectArticle", user);
          console.log(res);
          this.$message.success("删除成功!");
          this.getUserList();
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    toUser(id) {
      this.$router.push({ name: "users/user", query: { user_id: id } });
      // this.$router.push({ name: "users/user" });
    },
  },
};
</script>

<style lang="less" scoped>
.image {
  max-width: 200px;
  max-height: 200px;
}

.item {
  margin: 4px;
}
</style>