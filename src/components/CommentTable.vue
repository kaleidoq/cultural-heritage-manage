<template>
  <div>
    <el-table
      :data="data"
      style="width: 100%; margin-bottom: 20px"
      row-key="comment_id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <!-- <el-table-column sortable type="index"> </el-table-column> -->
      <el-table-column prop="article_id" label="文章id" width="170">
        <template slot-scope="scope">
          <span v-if="scope.row.parent_comment_id == 0">
            {{ scope.row.article_id }}
            <el-button size="mini" @click="showArticle(scope.row.article_id)">
              查看文章</el-button
            >
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="comment_content" label="评论内容" width="380">
      </el-table-column>
      <el-table-column prop="user_nickname" label="用户昵称"> </el-table-column>
      <el-table-column prop="comment_create_time" label="发表评论时间">
        <template slot-scope="scope">
          {{ scope.row.comment_create_time | datetimeFormat }}
        </template>
      </el-table-column>
    </el-table>
    <article-dialog ref="ArticleDialogRef"></article-dialog>
  </div>
</template>

<script>
import ArticleDialog from "@/components/ArticleDialog.vue";

export default {
  components: {
    ArticleDialog,
  },
  props: {
    data: {
      type: Array,
      showArticleDialog: false,
    },
  },
  data() {
    return {
      editDialog: true,
      path: "",
    };
  },
  created() {
    this.path = this.$route.path;
  },
  methods: {
    toUser(id) {
      this.$router.push({ name: "users/user", query: { user_id: id } });
    },
    showArticle(id) {
      //   this.showArticleDialog = true;
      console.log(id);
      //   console.log(this.showArticleDialog);
      this.$refs.ArticleDialogRef.getArticle(id);
    },
  },
};
</script>

<style>
</style>