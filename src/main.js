import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';

// 导入自定义主题颜色
import '@/assets/css/theme/index.css'

// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入axios
import axios from 'axios'
// 全局样式
import "@/assets/css/global.less"
// 导入tree-grid
import treeTable from 'vue-table-with-tree-grid'

Vue.use(ElementUI);
Vue.config.productionTip = false

// 导入mess并挂载
import { Message } from 'element-ui';
Vue.prototype.$message = Message;
import Router from 'vue-router'

// 挂载axios
Vue.prototype.$axios = axios
// 设置axios的基本路径
// axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/'
axios.defaults.baseURL = 'http://127.0.0.1/backstage'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log(config)
    const token = sessionStorage.getItem('token')
    config.headers.Authorization = token
    console.log('req.data', config)
    return config;
});

// 添加响应拦截器
axios.interceptors.response.use(
    function (res) {
        // 对响应数据进行操作
        console.log('response', res)
        let data = res.data
        if (res.status != 200) {
            switch (res.status) {
                case 401:
                    // 登录失效
                    Message.err(data.msg)
                    setTimeout(() => {
                        console.log('跳转到登录页面')
                        Router.push('/login')
                    }, 850)
                    break
                case 404:
                    console.log(data.msg)
                    Message.err(data.msg)
                    break
            }
        } else return Promise.resolve(res.data)
        return Promise.reject(data.msg);
    },
    function (error) {
        // 对响应错误进行操作
        console.log('error', error)
        let res = error.response
        let data = res.data
        if (res.status != 200) {
            switch (res.status) {
                case 401:
                    // 登录失效
                    Message.error(data.msg)
                    setTimeout(() => {
                        console.log('跳转到登录页面')
                        Router.push('/login')
                    }, 850)
                    break
                case 404:
                    console.log(data.msg)
                    Message.error('请求错误！请重试或联系管理员！')
                    break
                case 500:
                    console.log(data.msg)
                    Message.error('请求错误！请重试或联系管理员！')
                    break
            }
        } else return Promise.resolve(res.data)
        return Promise.reject(error);
    }
);


//将时间戳变为 yyyy-mm-dd hh:mm:ss 格式
Vue.filter('datetimeFormat', (orginVal) => {
    const dt = new Date(orginVal)
    const y = dt.getFullYear()
    //dt.getMonth()是从0开始计数的
    const m = (dt.getMonth() + 1 + '').padStart(2, '0') //padStart判断字符串是否够2位,不够就用0补位
    const d = (dt.getDate() + '').padStart(2, '0')
    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

//将时间戳变为 yyyy-mm-dd hh:mm:ss 格式
Vue.filter('dateFormat', (orginVal) => {
    const dt = new Date(orginVal)
    const y = dt.getFullYear()
    //dt.getMonth()是从0开始计数的
    const m = (dt.getMonth() + 1 + '').padStart(2, '0') //padStart判断字符串是否够2位,不够就用0补位
    const d = (dt.getDate() + '').padStart(2, '0')
    /*    const hh = (dt.getHours() + '').padStart(2, '0')
       const mm = (dt.getMinutes() + '').padStart(2, '0')
       const ss = (dt.getSeconds() + '').padStart(2, '0')
      */
    return `${y}-${m}-${d}`
})

Vue.component('tree-table', treeTable)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')