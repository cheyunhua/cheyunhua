<script type="es6">
	export default {
		name:'no-item',
		props:{
			showNoItem:Boolean
		},
		methods: {
		    reload(){
		      window.location.reload()
		    }
		}
	}
</script>

<template>
  <div @click="reload" v-show="showNoItem"  class="noitem">
    <img src="../assets/images/no_item.png" />
    <div @click="reload">重新加载</div>
  </div>
</template>

<style scoped>
div.noitem{
  text-align: center;
  height: 10rem;
  /* background-image: url('../assets/images/noitem.png'); */
}
</style>
