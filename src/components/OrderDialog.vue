<template>
  <div>
    <el-dialog
      title="文章信息"
      :visible.sync="showDialog"
      @close="dialogClose"
      width="50%"
    >
      <el-form
        style="margin: 0 70px"
        :model="article"
        ref="formRef"
        label-width="70px"
      >
        <!--   :rules="formRules" -->
        <el-form-item type="index"> </el-form-item>
        <el-form-item label="文章名称"
          >{{ article.title }}
          <!-- <el-input v-model="article.title" :disabled="true"></el-input> -->
        </el-form-item>
        <el-form-item prop="content" label="文章描述"
          >{{ article.content }}
        </el-form-item>
        <el-form-item prop="class_name" label="文章分类"
          >{{ article.class_name }}
        </el-form-item>
        <el-form-item prop="tags" label="文章标签">
          {{ article.tags }}
        </el-form-item>
        <el-form-item prop="cover" label="图片" width="175">
          <el-image
            style="width: 150px; height: 100px"
            fit="cover"
            :src="article.images[0]"
            :preview-src-list="article.images"
          >
          </el-image>
          <!-- <img class="image" :src="article.cover" alt="" /> -->
        </el-form-item>
        <el-form-item prop="create_time" label="创造时间" width="100px">
          {{ article.create_time | datetimeFormat }}
        </el-form-item>
      </el-form>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    // article: {
    //   type: String,
    // },
    // showDialog: {
    //   type: Boolean,
    //   default: () => {
    //     return false;
    //   },
    // },
  },
  data() {
    return {
      article: {
        address: null,
        class_id: 0,
        content: "",
        create_time: "",
        del_time: null,
        article_id: 0,
        images: ["", ""],
        is_del: 0,
        is_postage: 0,
        is_promote: 0,
        look: 0,
        price: 0,
        sale_time: null,
        tags: null,
        title: "",
        user_id: 0,
      },
      showDialog: false,
    };
  },
  methods: {
    async getOrder(id) {
      this.showDialog = true;
      console.log(id);
      const { data: res } = await this.$axios.get("/getArticle", {
        params: { article_id: id },
      });
      if (res.images) res.images = res.images.split(",");
      console.log(res);
      console.log(this.showDialog);
      this.article = res;
    },
    dialogClose() {
      this.showDialog = false;
    },
    showBox() {},
    showProgressBox() {},
  },
};
</script>

<style>
</style>