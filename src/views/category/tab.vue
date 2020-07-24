<template>
 <scroll>
   <ul class="tab">
     <!-- 只为当前选中的元素添加样式 -->
     <li class="tab-item"
     :class="{'tab-item-active' : item.id === curId}"
     v-for="(item, index) in items"
     :key="index"
     @click="switchTab(item.id)"
     >{{item.name}}</li>
   </ul>
 </scroll>
</template>

<script>
import Scroll from 'base/scroll'
import { categoryNames } from './config'
export default {
  name: 'CategoryTab',
  components: {
    Scroll
  },
  data() {
    return {
      curId: ''
    }
  },
  created() {
    this.init()
    // 初始化:默认让列表为第0项
    this.switchTab(this.items[0].id)
  },
  methods: {
    // 初始化数据
    init() {
      // 把数据保存到items中
      this.items = categoryNames
    },
    // 改变选项时
    switchTab(id) {
      if (this.curId === id) {
        return
      }
      this.curId = id
      this.$emit('switch-tab', id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";

// 每一个元素的大小
$tab-item-height: 46px;

.tab {
  width: 100%;

  &-item {
    height: $tab-item-height;
    background-color: #fff;
    border-right: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    color: #080808;
    font-size: $font-size-l;
    font-weight: bold;
    text-align: center;
    line-height: $tab-item-height;
    @include ellipsis();

    // 让最后一项没有下边框
    &:last-child {
      border-bottom: none;
    }
  }

   &-item-active {
      background: none;
      border-right: none;
      color: #f23030;
    }
}
</style>
