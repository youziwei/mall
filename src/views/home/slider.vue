<template>
<!-- 在轮播图最外层添加高度 -->
  <div class="slider-wrapper">
    <me-slider
    :direction="direction"
    :loop="loop"
    :interval="interval"
    :pagination="pagination">
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
export default {
  name: 'HomeSlider',
  components: {
    MeSlider,
    swiperSlide
  },
  data() {
    return {
      direction: sliderOptions.direction,
      loop: sliderOptions.loop,
      interval: sliderOptions.interval,
      pagination: sliderOptions.pagination,
      sliders: [
        {
          linkUrl: 'https://www.imooc.com',
          // 本地图片需要require
          picUrl: require('./1.jpg')
        },
        {
          linkUrl: 'https://www.imooc.com',
          picUrl: require('./2.jpg')
        },
        {
          linkUrl: 'https://www.imooc.com',
          picUrl: require('./3.jpg')
        },
        {
          linkUrl: 'https://www.imooc.com',
          picUrl: require('./4.jpg')
        }
      ]
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
