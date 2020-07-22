<template>
  <top-navbar class="header" v-show="visible">
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
  },
  data() {
    return {
      visible: true
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";
@import "~assets/scss/variables";
  // 为了修改基础组件的样式，可以使用header,top-navbar两个class优先级较高
  .header {
    &.top-navbar {
      background-color: transparent;
      transition: background-color 0.5s;
      // background-color: $header-bgc-translucent;
    }

    &.header-transition {
      background-color: $header-bgc-translucent;
    }

    .iconfont {
      color: $icon-color-default;
      font-size: $icon-font-size;
    }
  }
</style>
