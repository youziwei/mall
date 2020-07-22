<template>
  <div class="product">
    Product
  </div>
</template>

<script>

export default {
  name: 'Product',
  components: {
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";
// 设置子页面的层级
.product {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  z-index: $product-z-index;
  width: 100%;
  height: 100%;
  background-color: $bgc-theme;
}
</style>
