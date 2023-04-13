import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/main'
},
{
    path: '/main',
    name: 'main',
    component: () =>
        import('../views/Main.vue'),
    children: [{
        path: '/article/list',
        name: 'article/list',
        component: () =>
            import('../views/article/Article.vue'),
    }, {
        path: '/article/audit',
        name: 'article/audit',
        component: () =>
            import('../views/article/AuditArticle.vue'),
    }, {
        path: '/users/list',
        name: 'users/list',
        component: () =>
            import('../views/user/List.vue'),
    },
    {
        path: '/users/user',
        name: 'users/user',
        component: () =>
            import('../views/user/User.vue'),
    },
    {
        path: '/rights',
        name: 'rights',
        component: () =>
            import('../views/power/Rights.vue'),
    },
    {
        path: '/roles',
        name: 'roles',
        component: () =>
            import('../views/power/Roles.vue'),
    },
    {
        path: '/categories',
        name: 'categories',
        component: () =>
            import('../views/goods/Cate.vue'),
    },
    {
        path: '/params',
        name: 'params',
        component: () =>
            import('../views/goods/Params.vue'),
    },
    {
        path: '/goods',
        name: 'goods',
        component: () =>
            import('../views/goods/List.vue'),
    },
    {
        path: '/goods/addGoods',
        name: 'goods/addGoods',
        component: () =>
            import('../views/goods/Add.vue'),
    },
    {
        path: '/orders',
        name: 'orders',
        component: () =>
            import('../views/orders/Order.vue'),
    },
    {
        path: '/comment',
        name: 'comment',
        component: () =>
            import('../views/comment/CommentList.vue'),
    },
    {
        path: '/classify',
        name: 'classify',
        component: () =>
            import('../views/classify/ClassifyList.vue'),
    },
    {
        path: '/reports',
        name: 'reports',
        component: () =>
            import('../views/report/Reports.vue'),
    }, {
        path: '/reports/Order',
        name: 'reports/Order',
        component: () =>
            import('../views/report/OrderReport.vue'),
    }, {
        path: '/reports/Article',
        name: 'reports/Article',
        component: () =>
            import('../views/report/ArticleReport.vue'),
    },
    {
        path: '/reports/Classify',
        name: 'reports/Classify',
        component: () =>
            import('../views/report/ClassifyReport.vue'),
    },
    {
        path: '/reports/user',
        name: 'reports/user',
        component: () =>
            import('../views/report/UserReport.vue'),
    },
    {
        path: '/reports/test',
        name: 'reports/test',
        component: () =>
            import('../views/report/test.vue'),
    },
    ]
},
{
    path: '/home',
    name: 'home',
    component: () =>
        import('../views/Home.vue'),

},
{
    // 登录页面
    path: '/login',
    name: 'login',
    component: () =>
        import('../views/Login.vue')
}
]

const router = new VueRouter({
    routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
    // 如果去登录页，放行
    if (to.path === '/login') return next()
    const token = sessionStorage.getItem('token')
    // 查看是否存在token，不存在就跳登录
    if (!token) return next('/login')
    next()
})

// 重写这两个方法解决重复路由导向的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}

export default router