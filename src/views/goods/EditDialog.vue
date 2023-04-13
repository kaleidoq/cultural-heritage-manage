<template>
  <div>
    <el-dialog
      title="修改信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="addDialogClose"
    >
      <el-form
        :model="form"
        :rules="formRules"
        ref="formRef"
        label-width="70px"
      >
        <el-form-item label="商品名称" prop="goods_name">
          <el-input v-model="form.goods_name" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="商品描述" prop="email">
          <el-input v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>