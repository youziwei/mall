<template>
  <div class="loading" :class="{'loading-inline': inline}">
    <span class="loading-indicator" v-if="indicator === 'on'">
      <slot><img src="./loading.gif" alt=""></slot>
    </span>
    <span class="loading-text" v-if="text">{{text}}</span>
  </div>
</template>

<script>

export default {
  name: 'MeLoading',
  components: {
  },
  props: {
    indicator: {
      type: String,
      default: 'on',
      validator(value) {
        return ['on', 'off'].indexOf(value) > -1
      }
    },
    text: {
      type: String,
      default: '加载中...'
    },
    // s水平还是垂直排列
    inline: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/mixins';
.loading {
  overflow: hidden;
  width: 100%;
  height: 100%;
  @include flex-center(column);

  &.loading-inline {
    flex-direction:row;

    .loading-indicator ~ .loading-text {
      margin-top: 0;
      margin-left: 6px;
    }
  }
}

.loading-indicator ~ .loading-text {
  margin-top: 6px;
}
</style>
