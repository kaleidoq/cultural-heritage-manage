<template>
  <div class="aside">
    <!-- 点击伸缩 -->
    <div class="toggle-btn" @click="toggleCollapse">|||</div>
    <el-menu
      v-for="item in menu"
      :key="item.id"
      unique-opened
      :collapse="isCollapse"
      :collapse-transition="false"
      router
      :default-active="activePath"
    >
      <!-- 一级菜单 -->
      <el-submenu :index="'' + item.id">
        <template slot="title">
          <i :class="iconsObj[item.id]"></i>
          <span>{{ item.authName }}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item
          v-for="subitem in item.children"
          :index="'/' + subitem.path"
          :key="subitem.id"
          @click="saveNavState('/' + subitem.path), saveTags(subitem)"
        >
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>
              {{ subitem.authName }}
            </span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          id: 1,
          authName: "文章",
          path: "",
          children: [
            {
              id: 101,
              authName: "全部文章列表",
              path: "article/list",
            },
            {
              id: 102,
              authName: "未审核文章列表",
              path: "article/audit",
            },
          ],
        },
        {
          id: 2,
          authName: "用户",
          path: "",
          children: [
            {
              id: 2,
              authName: "列表",
              path: "users/list",
            },
          ],
        },
        {
          id: 3,
          authName: "商品",
          path: "",
          children: [
            {
              id: 301,
              authName: "列表",
              path: "goods",
            },
          ],
        },

        {
          id: 4,
          authName: "订单",
          path: "",
          children: [
            {
              id: 401,
              authName: "列表",
              path: "orders",
            },
          ],
        },
        {
          id: 5,
          authName: "评论",
          path: "",
          children: [
            {
              id: 501,
              authName: "列表",
              path: "comment",
            },
          ],
        },
        {
          id: 6,
          authName: "分类",
          path: "",
          children: [
            {
              id: 601,
              authName: "列表",
              path: "classify",
            },
          ],
        },
        {
          id: 7,
          authName: "数据列表",
          path: "",
          children: [
            {
              id: 701,
              authName: "订单",
              path: "reports/Order",
            },
            {
              id: 702,
              authName: "文章",
              path: "reports/Article",
            },
            {
              id: 704,
              authName: "分类",
              path: "reports/Classify",
            },
            {
              id: 703,
              authName: "用户",
              path: "reports/user",
            },
          ],
        },
      ],
      iconsObj: {
        125: "iconfont icon-user",
        103: "iconfont icon-tijikongjian",
        101: "iconfont icon-shangpin",
        102: "iconfont icon-danju",
        145: "iconfont icon-baobiao",
      },
      isCollapse: false,
      activePath: "",
    };
  },
  // props: ["isCollapse"],
  created() {
    this.getMenu();
    this.activePath = sessionStorage.getItem("activePath");
  },
  methods: {
    // 获得侧边栏的菜单列表信息
    async getMenu() {
      // const { data: res } = await this.$axios.get("menus");
      // console.log(res.data);
      // if (res.meta.status != 200) return this.$message.error(res.meta.msg);
      // this.menu = res.data;
    },
    // 改变侧边栏的伸展状态，传递到main父组件中改变侧边栏大小
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
      this.$emit("getCollapse", this.isCollapse);
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      sessionStorage.setItem("activePath", activePath);
      this.activePath = sessionStorage.getItem("activePath");
    },
    // 跳转路由的同时，添加tag标签到vuex中
    saveTags(subitem) {
      const tag = {
        name: subitem.authName,
        path: "/" + subitem.path,
      };
      console.log(subitem);
      console.log(tag);
      this.$store.commit("setTag", tag);
    },
  },
};
</script>

<style lang="less" scoped>
.aside {
  el-menu {
    border-right: 0;
  }
}
.toggle-btn {
  background-color: #8bdca4af;
  line-height: 24px;
  letter-spacing: 0.1em;
  cursor: pointer;
}
.iconfont {
  margin-right: 14px;
}
</style>