<template>
  <div>
    <el-table :data="data" stripe border style="width: 100%">
      <el-table-column type="index"> </el-table-column>
      <el-table-column prop="title" label="商品名称"> </el-table-column>
      <el-table-column prop="content" label="商品描述"> </el-table-column>
      <el-table-column prop="price" label="商品价格" width="80px">
      </el-table-column>
      <el-table-column prop="class_name" label="商品分类" width="80px">
      </el-table-column>
      <el-table-column prop="is_promote" label="商品状态" width="90">
        <template slot-scope="scope">
          <div v-if="scope.row.is_promote == 1">
            已售 <el-button size="mini">查看订单</el-button>
          </div>
          <div v-else>未售</div>
        </template>
      </el-table-column>
      <el-table-column prop="cover" label="图片" width="175">
        <template slot-scope="scope">
          <el-badge
            style="margin-top: 10px"
            :value="scope.row.images.length"
            class="item"
          >
            <el-image
              style="width: 150px; height: 100px"
              fit="cover"
              :src="scope.row.images[0]"
              :preview-src-list="scope.row.images"
            >
            </el-image>
          </el-badge>
          <!-- <img class="image" :src="scope.row.cover" alt="" /> -->
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创造时间" width="100px"
        ><template slot-scope="scope">
          {{ scope.row.create_time | datetimeFormat }}
        </template></el-table-column
      >
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-show="path != '/users/user'"
            @click="toUser(scope.row.user_id)"
            >查看卖家</el-button
          >
          <!-- <el-button size="mini" icon="el-icon-edit" type="primary"
            >编辑</el-button
          > -->
          <el-button size="mini" icon="el-icon-delete" type="danger"
            >删除</el-button
          >
        </template></el-table-column
      >
    </el-table>
  </div>
</template>

<script>
import GoodDetail from "./GoodDetail.vue";
export default {
  components: {
    GoodDetail,
  },
  props: {
    data: {
      type: Array,
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
  },
};
</script>

<style>
</style>