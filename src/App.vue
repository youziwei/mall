<template>
  <div id="app" class="g-container">
    <div class="g-view">
      <router-view/>
    </div>
    <div class='g-footer'>
      <tabbar></tabbar>
    </div>
  </div>
</template>

<script>
import Tabbar from 'components/tabbar'
export default {
  components: {
    Tabbar
  }
}
</script>

<style lang="scss">

</style>
