<template>
  <div class="top-navbar">
    <div class="top-navbar-left">
      <!-- 判断--只有这个插槽用了才会显示，没用就不会被显示出来 -->
      <!-- 问题：当左边和中间的内容不存在时，最右边的内容会跑到最左边?也许 -->
      <slot name="left" v-if="$slots.left"></slot>
    </div>
    <div class="top-navbar-center">
      <slot name="center" v-if="$slots.center"></slot>
    </div>
    <div class="top-navbar-right">
      <slot name="right" v-if="$slots.right"></slot>
    </div>
    <h1 class="top-navbar-title" v-if="title">
      <span class="top-navbar-text" v-text="title"></span>
    </h1>
  </div>
</template>

<script>
export default {
  name: 'TopNavbar',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";

.top-navbar {
  @include flex-between();
  height: 50px;
  background-color: #fff;

  &-left {
    margin-left: 10px;
  }
  &-center {
    flex: 1;
    margin: 0 10px;
  }
  &-right {
    margin-right: 10px
  }

  &-title {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 20%;
    right: 20%;
    // flex布局和ellipsis冲突，因此不会显示省略号
    // 解决方法：在里面在加一层span用于显示文字就不会冲突
    @include flex-center();
  }

  &-text {
    // 写较长的字母，如j，q时，超出部分会被隐藏(包括下面和左边)
    // 这是由于写了overflow的原因
    // 解决方法：
    //   解决下面超出隐藏：添加一个高度line-height: 1.5
    //   解决左边超出隐藏：添加width: 100%,让span撑满整个宽度
    //   但是，flex水平居中会失效，可以使用text-align: center;
    text-align: center;
    width: 100%;
    font-size: 18px;
    line-height: 1.5;
    @include ellipsis();
  }
}
</style>
