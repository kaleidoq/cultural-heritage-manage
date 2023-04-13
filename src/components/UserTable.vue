<template>
  <div>
    <div class="user-card">
      <el-table :data="data" style="width: 100%; heith: 100%" border stripe>
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="nickname" label="用户名"> </el-table-column>
        <el-table-column prop="introduce" label="个人介绍"> </el-table-column>
        <el-table-column prop="phone" label="电话"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="birthday" label="生日">
          <template slot-scope="scope">
            <div v-if="scope.row.birthday">
              {{ scope.row.birthday | dateFormat }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <div v-if="scope.row.sex == 1">男</div>
            <div v-else>女</div>
          </template>
        </el-table-column>
        <el-table-column prop="head" label="头像">
          <template slot-scope="scope">
            <el-avatar :size="70" fit="cover" :src="scope.row.head"></el-avatar>
            <!-- <img :src="scope.row" alt="" /> -->
          </template>
        </el-table-column>
        <!-- <el-table-column prop="mg_state" label="状态" width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="userStateChange(scope.row)"
              >
              </el-switch> </template
          ></el-table-column> -->
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              icon="el-icon-more"
              size="mini"
              @click="toUser(scope.row.user_id)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="delectUser(scope.row.user_id)"
            ></el-button>
            <!-- 分配角色按钮 -->
            <!-- <el-tooltip
                effect="dark"
                content="分配角色"
                placement="top"
                :enterable="false"
              >
                <el-button
                  type="warning"
                  icon="el-icon-setting"
                  size="mini"
                  @click="setRole(scope.row)"
                ></el-button
              ></el-tooltip> -->
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
    },
  },
  methods: {
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

<style>
</style>