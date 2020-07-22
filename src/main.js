import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import './assets/scss/index.scss'
import 'swiper/dist/css/swiper.css'

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  preLoad: 1, // 取值0-1,含义是到多少时进行懒加载
  error: require('assets/img/error.png'), // 失败时显示图片
  loading: require('assets/img/loading.gif'), // 成功时显示图片
  attempt: 1 // 尝试加载几次
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
