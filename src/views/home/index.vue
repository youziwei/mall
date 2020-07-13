<template>
  <div class="home">
    <!-- 头部搜索框 -->
    <header class="g-header-container">
      <home-header></home-header>
    </header>
    <!-- 中间内容 -->
    <div>
      <home-slider></home-slider>
    </div>
    <!-- 底部导航 -->
    <div class="g-backtop-container"></div>
    <router-view/>
  </div>
</template>

<script>
import HomeHeader from './header'
import HomeSlider from './slider'
export default {
  name: 'Home',
  components: {
    HomeHeader,
    HomeSlider
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
