<template>
  <top-navbar class="header">
    <i class="iconfont icon-saoyisao" slot="left"></i>
    <div slot="center">搜索框</div>
    <i class="iconfont icon-xiaoxi" slot="right"></i>
  </top-navbar>
</template>

<script>
import TopNavbar from 'base/navbar'
export default {
  name: 'HomeHeader',
  components: {
    TopNavbar
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";
  .header {
    &.top-navbar {
      background-color: transparent;
      // background-color: $header-bgc-translucent;
    }

    .iconfont {
      color: $icon-color-default;
      font-size: $icon-font-size;
    }
  }
</style>
