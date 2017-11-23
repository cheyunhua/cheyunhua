<template>
  <div>
  	<overview-head v-on:changeCusId="changeCusId"></overview-head>
  </div>
</template>
<script type="es6">

import overviewHead from './overview_head'

export default {
	name:'overview',
	components: {
      overviewHead
    },
  created() {
  },
  methods:{
    changeCusId(cusId){
      this.$emit('changeCusId2', (cusId) );
    },
  },
  events:{
  }

};
</script>
<style scoped>
</style>
