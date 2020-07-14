<template>
  <swiper :options="swiperOption">
     <!-- 在这里写swiperSlide不易扩展，也没有数据循环，使用插槽就可以了 -->
    <slot></slot>
    <!-- 分页器 -->
    <!-- pagination是swiper的插槽 -->
    <div class="swiper-pagination" v-if="pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { swiper } from 'vue-awesome-swiper'
export default {
  name: 'MeSlider',
  components: {
    swiper
  },
  props: {
    // 水平还是垂直
    direction: {
      type: String,
      default: 'horizontal',
      // 验证
      validator(value) {
        return [
          'horizontal',
          'vertical'
        ].indexOf(value) > -1
      }
    },
    // 自动轮播
    interval: {
      type: Number,
      default: 3000,
      validator(value) {
        return value >= 0
      }
    },
    // 无缝滚动
    loop: {
      type: Boolean,
      default: true
    },
    // 分页器
    pagination: {
      type: Boolean,
      default: true
    }
  },
  // 组件的data一定要是一个函数返回一个对象，
  // 这样组件在复用的时候，不是是用的同一份数据，
  // 保持组件的独立性
  data() {
    return {
      swiperOption: {
        watchOverflow: true, // 只有一张图片禁止滑动
        direction: this.direction, // 传过来的水平垂直滑动
        autoplay: this.interval ? { // 是否开启定时器
          delay: this.interval, // 延迟
          disableOnInteraction: false // 有交互后停止轮播
        } : false,
        slidesPerView: 1, // 容器同时显示几张图片
        loop: this.loop, // 开启无缝滚动
        pagination: { // 如果有分页器，找到相应的节点
          el: this.pagination ? '.swiper-pagination' : null
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// swiper组件上的class
.swiper-container {
  width: 100%;
  height: 100%;
}
</style>
