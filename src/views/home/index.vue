<template>
  <div class="home">
    <!-- 头部搜索框 -->
    <header class="g-header-container">
      <home-header></home-header>
    </header>
    <!-- 中间内容 -->
    <me-scroll>
      <home-slider></home-slider>
      <home-nav></home-nav>
    </me-scroll>
    <!-- 底部导航 -->
    <div class="g-backtop-container"></div>
    <router-view/>
  </div>
</template>

<script>
import MeScroll from 'base/scroll' // 滚动条组件
import HomeHeader from './header'
import HomeSlider from './slider'
import HomeNav from './nav'
export default {
  name: 'Home',
  components: {
    MeScroll,
    HomeHeader,
    HomeSlider,
    HomeNav
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
