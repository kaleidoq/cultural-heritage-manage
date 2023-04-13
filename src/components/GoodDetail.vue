<template>
  <div>
    <el-dialog
      title="商品信息"
      :visible.sync="showDialog"
      @close="dialogClose"
      width="50%"
    >
      <el-form
        style="margin: 0 70px"
        :model="good"
        ref="formRef"
        label-width="70px"
      >
        <!--   :rules="formRules" -->
        <el-form-item type="index"> </el-form-item>
        <el-form-item label="商品名称"
          >{{ good.title }}
          <!-- <el-input v-model="good.title" :disabled="true"></el-input> -->
        </el-form-item>
        <el-form-item prop="content" label="商品描述"
          >{{ good.content }}
        </el-form-item>
        <el-form-item prop="price" label="商品价格"
          >{{ good.price }}
        </el-form-item>
        <el-form-item prop="class_name" label="商品分类"
          >{{ good.class_name }}
        </el-form-item>
        <el-form-item prop="tags" label="商品标签">
          {{ good.tags }}
        </el-form-item>
        <!-- <el-form-item prop="is_promote" label="商品状态">
          <div v-if="good.is_promote == 1">
            已售 <el-button size="mini">查看订单</el-button>
          </div>
          <div v-else>未售</div>
        </el-form-item> -->
        <el-form-item prop="cover" label="图片" width="175">
          <el-image
            style="width: 150px; height: 100px"
            fit="cover"
            :src="good.images[0]"
            :preview-src-list="good.images"
          >
          </el-image>
          <!-- <img class="image" :src="good.cover" alt="" /> -->
        </el-form-item>
        <el-form-item prop="address" label="发出地址">
          {{ good.address }}
        </el-form-item>
        <el-form-item prop="create_time" label="创造时间" width="100px">
          {{ good.create_time | datetimeFormat }}
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
    // good: {
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
      good: {
        address: null,
        class_id: 0,
        content: "",
        create_time: "",
        del_time: null,
        goods_id: 0,
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
  //   watch: {
  //     good: {
  //       handler() {
  //         console.log(this.good);
  //         this.getGood(this.good);
  //       },
  //     },
  //   },
  methods: {
    async getGood(id) {
      this.showDialog = true;
      console.log(id);
      const { data: res } = await this.$axios.get("/getGood", {
        params: { goods_id: id },
      });
      if (res.images) res.images = res.images.split(",");
      console.log(res);
      console.log(this.showDialog);
      this.good = res;
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