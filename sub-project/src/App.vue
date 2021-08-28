<template>
  <div id="app" :class="{'app-inner': appInner}">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      appInner: false
    }
  },
  mounted () {
    if (window.__POWERED_BY_QIANKUN__) {
      this.appInner = true
    }
  }
}
</script>

<style scoped>
.app-inner {
  height: 100%;
  width: 100%;
}
</style>
