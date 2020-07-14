<template>
  <swiper :options="swiperOption">
    <swiper-slide>
      <slot></slot>
    </swiper-slide>
    <!-- 是否有滚动条 -->
    <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Scroll',
  components: {
    swiper,
    swiperSlide
  },
  props: {
    scrollbar: {
      type: Boolean,
      dafault: true
    }
  },
  data() {
    return {
      swiperOption: {
        direction: 'vertical', // 垂直
        slidesPerView: 'auto', // 一页几张图片，auto为自适应
        freeMode: true, // 自由模式,幻灯片只能滚动固定的距离
        setWrapperSize: true, // 为swiper-wrapper设置高度
        scrollbar: { // 滚动条是否存在
          el: this.scrollbar ? '.swiper-scrollbar' : null,
          hide: true // 是否自动隐藏
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// swiper-container和swiper-wrapper需要单独设置
// swiper-container:将高宽设置为可视区高宽
// swiper-slide:将高度设置为auto，会根据块内容自动调节高度
.swiper-container {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.swiper-slide {
  height: auto;
}
</style>
