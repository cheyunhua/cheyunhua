<template>
  <div id="app">


    <keep-alive>
      <router-view></router-view>
    </keep-alive>

  </div>
</template>
<script type="es6">
export default {
  name: 'app'
};
</script>
<style scoped>
	#app{
		height: 100%; 
	}
</style>
