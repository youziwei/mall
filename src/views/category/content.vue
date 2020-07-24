<template>
  <div class="content-wrapper">
    <!-- loading -->
    <div class="loading-container" v-if="isLoading">
      <div class="loading-wrapper">
        <loading></loading>
      </div>
    </div>
    <!-- 主要内容 -->
    <scroll ref="scroll">
      <div class="content">
        <div class="pic" v-if="content.banner">
          <a :href="content.banner.linkUrl" class="pic-link">
            <!-- load事件在src加载完毕后触发--更新滚动条 -->
            <img @load="updateScroll" :src="content.banner.picUrl" alt="" class="pic-img">
          </a>
        </div>

        <div class="section"
        v-for="(section, index) in content.data"
        :key="index">
        <h4 class="section-title">{{section.name}}</h4>
        <ul class="section-list">
          <li class="section-item"
              v-for="(item, i) in section.itemList"
              :key="i">
            <a href="" class="section-link">
              <p class="section-pic" v-if="item.picUrl">
                <img v-lazy="item.picUrl" alt="" class="section-img">
              </p>
              <p class="section-name">{{item.name}}</p>
            </a>
          </li>
        </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Loading from 'base/loading'
import Scroll from 'base/scroll'
import { getCategoryContent } from 'api/category'
import storage from 'assets/js/storage'
import { CATEGORY_CONTENT_KEY, CATEGORY_CONTENT_UPDATE_TIME_INTERVAL } from './config'
export default {
  name: 'CategoryContent',
  components: {
    Loading,
    Scroll
  },
  props: {
    curId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      zfc: 'woshizfc',
      content: {},
      isBacktopVisible: false,
      isLoading: false
    }
  },
  watch: {
    // 监听数据curId的变化:id为变化后的数据
    curId(id) {
      // 每次数据改变也要让滚动条恢复到最开始的位置
      this.topScroll()
      // 数据发生变化时，先激活loading
      this.isLoading = true
      // 获取数据并储存后再隐藏loading
      this.getContent(id).then(() => {
        this.isLoading = false
      })
      console.log(this.content)
    }
  },
  methods: {
    getContent(id) {
      // 获取储存的值
      const contents = storage.get(CATEGORY_CONTENT_KEY)
      let updateTime
      const curTime = new Date().getTime() // 获取当前日期毫秒数

      if (contents && contents[id]) {
        // 再次储存数据时,先获取上次储存的时间戳
        updateTime = contents[id].updateTime || 0
        // 当储存时间小于1天时
        if (curTime - updateTime <= CATEGORY_CONTENT_UPDATE_TIME_INTERVAL) {
          // 直接获取存储的数据
          return this.getContentByLocalStorage(contents[id])
        } else {
          // 存储时间大于1天时重新存储数据
          return this.getContentByHTTP(id).then(() => {
            this.updateLocalStorage(contents, id, curTime)
          })
        }
      } else {
        return this.getContentByHTTP(id).then(() => {
          // 第一次storage储存数据
          this.updateLocalStorage(contents, id, curTime)
        })
      }
    },

    // 将数据存储到localStorage
    // contents:最外层，id:每一项，curTime:时间戳
    updateLocalStorage(contents, id, curTime) {
      // 储存：将要储存的值设置为空对象
      contents = contents || {}
      // 将要储存的数据的每一项也设置为空对象
      contents[id] = {}
      // 在对象中添加data和updateTime属性
      contents[id].data = this.content // id对应的数据
      contents[id].updateTime = curTime // 对应的时间戳
      storage.set(CATEGORY_CONTENT_KEY, contents) // 储存数据
    },
    getContentByLocalStorage(content) {
      this.content = content.data
      return Promise.resolve()
    },
    // 获取数据
    getContentByHTTP(id) {
      return getCategoryContent(id).then(data => {
        // 获取到数据后让为content赋值
        return new Promise(resolve => {
          if (data) {
            this.content = data
            resolve()
          }
        })
      })
    },
    updateScroll() {
      this.$refs.scroll && this.$refs.scroll.update()
    },
    topScroll() {
      this.$refs.scroll && this.$refs.scroll.scrollToTop(0)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";

.content-wrapper {
  position: relative;
  height: 100%;
}

.loading-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: $category-popup-z-index;
  @include flex-center();
  width: 100%;
  height: 100%;
}

.loading-wrapper {
  width: 50%;
  padding: 30px 0;
  background-color: $modal-bgc;
  border-radius: 4px;
}

.content {
  padding: 10px;
}

.pic {
  margin-bottom: 12px;

  &-link {
    display: block;
  }

  &-img {
    width: 100%;
  }
}

// 每个模块底部
.section {
  margin-bottom: 12px;

// 最后一个元素底部为0
  &:last-child {
    margin-bottom: 0;
  }

  // 标题
  &-title {
    height: 28px;
    line-height: 28px;
    color: #080808;
    font-weight: bold;
  }

  // 每个元素
  &-list {
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 10px 10px 0;
  }

  &-item {
    width: (100% / 3);
  }

  &-link {
    display: block;
  }

  &-pic {
    position: relative;
    width: 80%;
    padding-bottom: 80%;
    margin: 0 auto;
  }

  &-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &-name {
    height: 36px;
    line-height: 36px;
    text-align: center;
    @include ellipsis();
  }
}

</style>
