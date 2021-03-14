<template>
  <div id="app">
	<router-view></router-view>
   <NavBar v-show="this.$route.meta.isTab"></NavBar>
  </div>
</template>
<script>
	import NavBar from './components/NavBar.vue'
	export default{
		components:{
			NavBar
		}
	}
</script>
<style>
	/* 初始化样式 */
	@import url("./assets/css/reset.css");

</style>
