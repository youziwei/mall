<template>
 <top-navbar class="header">
   <div slot="center">搜索框</div>
   <i class="iconfont icon-xiaoxi " slot="right"></i>
 </top-navbar>
</template>

<script>
import TopNavbar from 'base/navbar'
export default {
  name: 'CategoryHeader',
  components: {
    TopNavbar
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";

// 这里使用&是在同一层级
.header {
  &.top-navbar {
    background-color: $header-bgc-translucent;
  }

  .iconfont {
    color: $icon-color-default;
    font-size: $icon-font-size;
  }
}
</style>
