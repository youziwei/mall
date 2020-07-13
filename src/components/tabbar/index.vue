<template>
<!-- 全局组件加g
       下导航栏 -->
  <div class="g-tabbar">
    <router-link class="g-tabbar-item" to="/home">
      <i class="iconfont icon-shouye"></i>
      <span>首页</span>
    </router-link>
    <router-link class="g-tabbar-item" to="/category">
       <i class="iconfont icon-leimupinleifenleileibie"></i>
      <span>分类页</span>
    </router-link>
    <router-link class="g-tabbar-item" to="/cart">
      <i class="iconfont icon-gouwuchezhengpin"></i>
      <span>购物车</span>
    </router-link>
    <router-link class="g-tabbar-item" to="/personal">
      <i class="iconfont icon-user"></i>
      <span>个人中心</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Tabbar'
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";
// vue为router-link选中元素添加的样式
  .router-link-active {
    color: $link-active-color;
  }
</style>
