<template>
  <div class="recommend">
    <h3 class="recommend-title">热卖推荐</h3>
    <div class="loading-container" v-if="!recommends.length">
       <me-loading inline></me-loading>
    </div>
    <ul class="recommend-list" v-else>
      <li class="recommend-item" v-for="(item, index) in recommends" :key="index">
        <router-link
        class="recommend-link"
        :to="{name: 'home-product', params: {id: item.baseinfo.itemId}}">

          <p class="recommend-pic">
            <img class="recommend-img" v-lazy="item.baseinfo.picUrl" alt="">
          </p>
          <p class="recommend-name">{{item.name.shortName}}</p>
          <p class="recommend-origPrice">
            <del>￥{{item.price.origPrice}}</del>
          </p>
          <p class="recommend-info">
            <span class="recommend-price">
              ￥<strong class="recommend-price-num">{{item.price.actPrice}}</strong>
            </span>
            <span class="recommend-count">{{item.remind.soldCount}}件已售</span>
          </p>

        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { getHomeRecommend } from 'api/home'
import MeLoading from 'base/loading'
export default {
  name: 'HomeRecommend',
  components: {
    MeLoading
  },
  data() {
    return {
      recommends: [],
      curPage: 1, // 当前页
      totalPage: 1 // 总页数
    }
  },
  created() {
    this.getRecommend()
  },
  methods: {
    // API
    update() {
      return this.getRecommend()
    },

    getRecommend() {
      // 当前页大于总页数时返回
      if (this.curPage > this.totalPage) {
        return Promise.reject(new Error('没有更多了'))
      }
      // 调用时直接返回promise对象
      return getHomeRecommend(this.curPage).then(data => {
        // 里面需要通过promise返回
        // 因为里面有一个条件判断，当data有值，才能执行resolve,后面的then才会被执行到
        // 如果不加promise，那么data不管有没有值，都会返回一个undefined，都会向下执行
        return new Promise(resolve => {
          if (data) {
            // console.log(data)
            this.curPage++
            this.totalPage = data.totalPage
            // 每次获取数据与之前的数据进行合并
            this.recommends = this.recommends.concat(data.itemList)
            // 数据更新完成，向外触发一个方法
            this.$emit('loaded', this.recommends)
            resolve()
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";
.recommend {
  // 标题
  &-title {
    position: relative;
    width: 100%;
    padding: 10px 0;
    font-size: $font-size-l;
    text-align: center;

    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      width: 40%;
      height: 1px;
      background-color: #ddd;
    }
    &:before {
      left: 0;
    }
    &:after {
      right: 0;
    }
  }

  // 列表
  &-list {
    @include flex-between();
    flex-wrap: wrap;
  }

  &-item {
    width: 49%;
    background-color: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .12);
    margin-bottom: 8px;
  }

  &-link {
    display: block;
  }

  &-pic {
    position: relative;
    // padding-top和margin-top的百分比都是相对于宽的
    width: 100%;
    padding-top: 100%;
    margin-bottom: 5px;
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
    padding: 0 5px;
    margin-bottom: 8px;
    line-height: 1.5;
    // 两行超出显示省略号
    @include multiline-ellipsis();
  }

  &-origPrice {
    padding: 0 5px;
    margin-bottom: 8px;
    color: #ccc;
  }

  &-info {
    @include flex-between();
    padding: 0 5px;
    margin-bottom: 8px;
  }

  &-price {
    color: #e61414;
  }

  &-price-num {
    font-size: 20px;
  }

  &-count {
    color: #999;
  }
}

.loading-container {
  padding-top: 100px;
}
</style>
