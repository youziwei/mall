<template>
  <swiper :options="swiperOption" ref="swiper">
    <!-- 下拉刷新 -->
    <div class="scroll-pull-down" v-if="pullDown">
      <me-loading :text="pullDownText" inline ref="pullDownLoading"></me-loading>
    </div>
    <swiper-slide>
      <slot></slot>
    </swiper-slide>
    <!-- 上拉加载更多 -->
    <div class="scroll-pull-up" v-if="pullUp">
      <me-loading :text="pullUpText" inline ref="pullUpLoading"></me-loading>
    </div>
    <!-- 是否有滚动条 -->
    <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import MeLoading from 'base/loading'
import {
  PULL_DOWN_HEIGHT,
  PULL_DOWN_TEXT_INIT,
  PULL_DOWN_TEXT_START,
  PULL_DOWN_TEXT_ING,
  PULL_DOWN_TEXT_END,
  PULL_UP_HEIGHT,
  PULL_UP_TEXT_INIT,
  PULL_UP_TEXT_START,
  PULL_UP_TEXT_ING,
  PULL_UP_TEXT_END
} from './config'
export default {
  name: 'Scroll',
  components: {
    swiper,
    swiperSlide,
    MeLoading
  },
  props: {
    scrollbar: {
      type: Boolean,
      dafault: true
    },
    data: {
      type: [Array, Object]
    },
    pullDown: {
      type: Boolean,
      dafault: false
    },
    pullUp: {
      type: Boolean,
      dafault: false
    }
  },
  data() {
    return {
    // 不需要时刻监听变化的数据移出去
    }
  },
  // watch监测data变化，更新滚动条
  // 数据没加载前data是空数组，加载后是有数据的数组
  watch: {
    data() {
      this.update()
    }
  },
  // 数据都准备完了，也可以调用init方法了
  created() {
    this.init()
  },
  methods: {
    // 供外部调用的API
    update() {
      this.$refs.swiper && this.$refs.swiper.swiper.update()
    },
    scrollToTop(speed, runCallbacks) {
      // 返回第几个幻灯片
      this.$refs.swiper && this.$refs.swiper.swiper.slideTo(0, speed, runCallbacks)
    },

    // 内部自己使用的
    init() {
      this.pilling = false // 是否正在下拉或上拉
      this.pullDownText = PULL_DOWN_TEXT_INIT
      this.pullUpText = PULL_UP_TEXT_INIT
      this.swiperOption = {
        direction: 'vertical', // 垂直
        slidesPerView: 'auto', // 一页几张图片，auto为自适应
        freeMode: true, // 自由模式,幻灯片只能滚动固定的距离
        setWrapperSize: true, // 为swiper-wrapper设置高度
        scrollbar: { // 滚动条是否存在
          el: this.scrollbar ? '.swiper-scrollbar' : null,
          hide: true // 是否自动隐藏
        },
        // 在on中触发下拉刷新上拉加载
        on: {
          sliderMove: this.scroll,
          // 松手刷新
          touchEnd: this.touchEnd,
          transitionEnd: this.scrollEnd
        }
      }
    },
    scroll() {
      // 找到swiper中的实例对象
      const swiper = this.$refs.swiper.swiper

      // 滚动时触发事件
      this.$emit('scroll', swiper.translate, this.$refs.swiper.swiper)

      // 如果正在下拉，直接返回
      if (this.pulling) {
        return
      }

      if (swiper.translate > 0) { // 下拉
      // 用户是否需要下拉
        if (!this.pullDown) {
          return
        }

        if (swiper.translate > PULL_DOWN_HEIGHT) {
          // 改变data里数据的值，重新渲染就会造成闪动
          // this.pullDownText = PULL_DOWN_TEXT_START
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START)
        } else {
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT)
        }
      } else if (swiper.isEnd) { // 上拉
        if (!this.pullUp) {
          return
        }

        // 是否达到上拉触发条件
        const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > parseInt(swiper.$wrapperEl.css('height'))

        if (isPullUp) { // 超过触发条件修改提示性文字
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_START)
        } else { // 否则返回初始值
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_INIT)
        }
      }
    },

    scrollEnd() {
      // 滑动结束后
      this.$emit('scroll-end', this.$refs.swiper.swiper.translate, this.$refs.swiper.swiper, this.pulling)
    },

    // 松手刷新
    touchEnd() {
      const swiper = this.$refs.swiper.swiper

      // 如果正在下拉，直接返回
      if (this.pulling) {
        return
      }

      if (swiper.translate > PULL_DOWN_HEIGHT) {
        if (!this.pullDown) {
          return
        }

        this.pulling = true
        swiper.allowTouchMove = false // 加载过程中禁止触摸
        swiper.setTransition(swiper.params.speed) // 设置初始速度
        swiper.setTranslate(PULL_DOWN_HEIGHT) // 拖过了回到100的位置
        swiper.params.virtualTranslate = true // 定住不给回弹
        this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING) // 变成正在刷新的文字
        // 这里是基础组件，不处理业务，因此不在这里触发页面刷新
        // 在这里写一个加载完成后需要执行的方法传出去
        this.$emit('pull-down', this.pullDownEnd)
      } else if (swiper.isEnd) { // 底部
        const totalHeight = parseInt(swiper.$wrapperEl.css('height'))
        const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > totalHeight

        if (isPullUp) { // 上拉
          if (!this.pullUp) {
            return
          }
          this.pulling = true
          swiper.allowTouchMove = false // 禁止触摸
          swiper.setTransition(swiper.params.speed)
          swiper.setTranslate(-(totalHeight + PULL_UP_HEIGHT - swiper.height))
          swiper.params.virtualTranslate = true // 定住不给回弹
          this.$refs.pullUpLoading.setText(PULL_UP_TEXT_ING)
          this.$emit('pull-up', this.pullUpEnd)
        }
      }
    },
    pullDownEnd() {
      const swiper = this.$refs.swiper.swiper

      this.pulling = false
      this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END) // 变成加载完成后的文字说明
      swiper.params.virtualTranslate = false // 可以回弹
      swiper.allowTouchMove = true // 可以触摸
      swiper.setTransition(swiper.params.speed)
      swiper.setTranslate(0) // 回到0的位置
      // 运动完成触发事件
      setTimeout(() => {
        this.$emit('pull-down-transition-end')
      }, swiper.params.speed)
    },
    // 还原初始值
    pullUpEnd() {
      const swiper = this.$refs.swiper.swiper
      this.pulling = false
      this.$refs.pullUpLoading.setText(PULL_UP_TEXT_END)
      swiper.params.virtualTranslate = false
      swiper.allowTouchMove = true
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

.scroll-pull-up,
.scroll-pull-down {
  position: absolute;
  left: 0;
  width: 100%;
}

.scroll-pull-down {
  bottom: 100%;
  height: 80px;
}

.scroll-pull-up {
  top: 100%;
  height: 30px;
}
</style>
