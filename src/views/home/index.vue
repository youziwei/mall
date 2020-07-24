<template>
  <div class="home">
    <!-- 头部搜索框 -->
    <header class="g-header-container">
      <home-header :class="{'header-transition': isHeaderTransition}" ref="header"></home-header>
    </header>
    <!-- 中间内容 -->
    <!-- 数据更新后，滚动条不能滚动了，这是由于数据是异步获取的
       滚动条加载完了里面的数据还没有加载出来，就无法正确获取内容的高度
       解决方法：数据加载完毕，更新滚动条
       1.传参数，让滚动条自己更新
       2.滚动条组件提供一个API接口，暴露出一个方法，在外面调用滚动条的更新
     -->
    <me-scroll
    :data="recommends"
    pullDown
    pullUp
    @pull-down="pullToRefresh"
    @pull-up="pullToLoadMore"
    @scroll="scroll"
    @scroll-end="scrollEnd"
    @pull-down-transition-end="pullDownTransitionEnd"
    ref="scroll"
    >
      <home-slider ref="slider"></home-slider>
      <home-nav></home-nav>
      <home-recommend @loaded="updateScroll" ref="recommend"></home-recommend>
    </me-scroll>
    <!-- 返回顶部 -->
    <div class="g-backtop-container">
      <me-backtop :visible="isBacktopVisible" @backtop="backToTop"></me-backtop>
    </div>
    <router-view/>
  </div>
</template>

<script>
import MeScroll from 'base/scroll' // 滚动条组件
import MeBacktop from 'base/backtop' // 返回顶部组件
import HomeHeader from './header'
import HomeSlider from './slider'
import HomeNav from './nav'
import HomeRecommend from './recommend'
import { HEADER_TRANSITION_HEIGHT } from './config' // 常量
export default {
  name: 'Home',
  components: {
    MeScroll,
    HomeHeader,
    HomeSlider,
    HomeNav,
    HomeRecommend,
    MeBacktop
  },
  data() {
    return {
      recommends: [],
      isBacktopVisible: false,
      isHeaderTransition: false
    }
  },
  // created() {
  //   setTimeout(() => {
  //     this.isBacktopVisible = true
  //   }, 1000)
  // },
  methods: {
    updateScroll(recommends) {
      this.recommends = recommends
    },
    // 下拉更新数据
    pullToRefresh(end) {
      // setTimeout(() => {
      //   end()
      // }, 1000)
      this.$refs.slider.update().then(end)
    },
    pullToLoadMore(end) {
      // setTimeout(() => {
      //   end()
      // }, 1000)
      this.$refs.recommend.update().then(end).catch(err => {
        // 没有更多内容时
        if (err) {
          console.log(err)
        }
        // end()
      })
    },

    // 手拖动时触发
    scroll(translate) {
      this.changeHeaderStatus(translate)
    },
    scrollEnd(translate, scroll, pulling) {
      // 滚动过程中不要触发
      if (!pulling) {
        this.changeHeaderStatus(translate)
      }
      // 向下滚动时translate为负值
      // scroll.height:可视区高度
      this.isBacktopVisible = translate < 0 && -translate > scroll.height
    },
    pullDownTransitionEnd() {
      this.$refs.header.show()
    },
    backToTop() {
      this.$refs.scroll && this.$refs.scroll.scrollToTop()
    },
    changeHeaderStatus(translate) {
      if (translate > 0) {
        // 上拉隐藏
        this.$refs.header.hide()
        return
      }
      // 下拉
      this.$refs.header.show()
      this.isHeaderTransition = -translate > HEADER_TRANSITION_HEIGHT
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";
  .home {
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: $bgc-theme;
  }
</style>
