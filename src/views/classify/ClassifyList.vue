<template>
  <div>
    <el-card>
      <el-row>
        <el-button @click="add()">添加分类</el-button>
      </el-row>
      <el-row>
        <el-table :data="list" stripe border style="width: 100%">
          <el-table-column type="index"> </el-table-column>
          <el-table-column prop="class_id" label="分类id"> </el-table-column>
          <el-table-column prop="class_name" label="分类名称">
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template slot-scope="scope">
              <!-- 修改按钮 -->
              <el-button
                icon="el-icon-edit"
                size="mini"
                @click="edit(scope.row)"
              ></el-button>
              <!-- 删除按钮 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteClassify(scope.row.class_id)"
              ></el-button> </template
          ></el-table-column>
        </el-table>
      </el-row>
    </el-card>
    <el-dialog
      :title="title"
      :visible.sync="showDialog"
      @close="dialogClose"
      width="40%"
    >
      <el-form
        style="margin: 0 100px"
        :model="form"
        ref="formRef"
        label-width="70px"
      >
        <!--   :rules="formRules" -->
        <!-- <el-form-item type="index"> </el-form-item> -->
        <!-- <el-form-item prop="id" label="分类id" v-if="form.type == 'edit'">
          <el-input v-model="form.class_id" :disabled="true"></el-input>
        </el-form-item> -->
        <el-form-item label="分类名称">
          <el-input v-model="form.class_name"></el-input>
          <!-- <el-input v-model="form.title" :disabled="true"></el-input> -->
        </el-form-item>
        <!-- <el-form-item prop="cover" label="图片" width="175">
          <el-image
            style="width: 150px; height: 100px"
            fit="cover"
            :src="form.images[0]"
            :preview-src-list="form.images"
          >
          </el-image>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogClose()">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      showDialog: false,
      title: "",
      form: {
        class_id: "",
        class_name: "",
        type: "",
      },
    };
  },
  created() {
    this.getClass();
  },
  methods: {
    async getClass() {
      const { data: res } = await this.$axios.get("/getClassify");
      this.list = res;
      console.log(res);
    },
    edit(row) {
      this.title = "修改分类";
      this.showDialog = true;
      this.form.class_id = row.class_id;
      this.form.class_name = row.class_name;
      this.form.type = "edit";
      console.log(this.form);
    },
    add() {
      this.title = "添加分类";
      this.showDialog = true;
      this.form.class_name = "";
      this.form.type = "add";
      console.log(this.form);
    },
    async deleteClassify(id) {
      console.log(id);
      this.$confirm("请谨慎删除分类，请确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$axios.post(`deleteClassify`, {
            class_id: id,
          });
          //   const { data: res } = await this.$axios.post("deleteUser", user);
          console.log(res);
          this.$message.success("删除成功!");
          this.getClass();
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    async submit() {
      const loading = this.$loading({
        lock: true,
        text: "提交中",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const { data: res } = await this.$axios.post(`editClassify`, this.form);
      console.log(res);
      setTimeout(() => {
        this.showDialog = false;
        loading.close();
        // this.$message.success("成功!");
        this.getClass();
      }, 1000);
    },
    dialogClose() {
      this.showDialog = false;
    },
  },
};
</script>

<style>
</style>