<template>
  <div class="nav">
    <ul class="nav-list">
      <li class="nav-item" v-for="(item, index) in navs" :key="index">
        <a :href="item.linkUrl" class="nav-link">
          <img :src="item.picUrl" class="nav-pic">
          <span>{{item.text}}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { navItems } from './config'
export default {
  name: 'HomeNav',
  components: {
  },
  // 数据一般不需要放在data里面，
  // 因为所有放在data里的数据都会被添加setter和getters监听数据的变化
  // 数据发生变化后就会立刻响应到视图中
  // 对于只加载一次的数据就是一种浪费
  // 可以把数据放到create里面
  created() {
    this.navs = navItems
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";

.nav {
  width: 100%;
  padding-top: 15px;
  background-color: #fff;

  &-list {
    // flex-wrap: wrap;超出折行
    display: flex;
    flex-wrap: wrap;
  }

  // 一行排五个
  &-item {
    width: 20%;
    margin-bottom: 15px;
  }

  // 让图片文字垂直水平居中
  &-link {
    @include flex-center(column)
  }

  // 图片样式
  &-pic {
    width: 60%;
    margin-bottom: 8px;
  }
}
</style>
