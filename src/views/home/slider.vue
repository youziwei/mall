<template>
<!-- 在轮播图最外层添加高度 -->
  <div class="slider-wrapper">
    <me-loading v-if="!sliders.length"></me-loading>
    <me-slider
    :direction="direction"
    :loop="loop"
    :interval="interval"
    :pagination="pagination"
    :data="sliders"
    v-else>
    <!-- 获取数据是异步的，所有数据的值都获取到后再渲染页面 -->
    <swiper-slide v-for="(item, index) in sliders" :key="index">
      <a :href="item.linkUrl" class="slider-link">
        <img :src="item.picUrl" alt="" class="slider-img">
      </a>
    </swiper-slide>
  </me-slider>
  </div>
</template>

<script>
import MeSlider from 'base/slider'
import { swiperSlide } from 'vue-awesome-swiper'
import { sliderOptions } from './config' // 引入配置文件
import { getHomeSlider } from '../../api/home' // 引入异步数据
import MeLoading from 'base/loading'
export default {
  name: 'HomeSlider',
  components: {
    MeSlider,
    swiperSlide,
    MeLoading
  },
  data() {
    return {
      direction: sliderOptions.direction,
      loop: sliderOptions.loop,
      interval: sliderOptions.interval,
      pagination: sliderOptions.pagination,
      // 通过线上异步获取数据，地址：http://www.imooc.com/api/home/slider
      // 本地获取数据
      // sliders: [
      //   {
      //     linkUrl: 'https://www.imooc.com',
      //     // 本地图片需要require
      //     picUrl: require('./1.jpg')
      //   },
      //   {
      //     linkUrl: 'https://www.imooc.com',
      //     picUrl: require('./2.jpg')
      //   },
      //   {
      //     linkUrl: 'https://www.imooc.com',
      //     picUrl: require('./3.jpg')
      //   },
      //   {
      //     linkUrl: 'https://www.imooc.com',
      //     picUrl: require('./4.jpg')
      //   }
      // ]
      sliders: []
    }
  },
  created() {
    this.getSliders()
  },
  methods: {
    // 更新数据,内部调用
    update() {
      return this.getSliders()
    },

    getSliders() {
      return getHomeSlider().then(data => {
        this.sliders = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.slider-wrapper {
  height: 183px;
}

// 设置图片,链接的高宽
.slider-link {
  display: block;
}

.slider-link,
.slider-img {
  width: 100%;
  height: 100%;
}
</style>
