<template>
  <div >
   <div>
   <h>请关闭页面，进入人工服务</h>
   <a v-on:click="closeWindow()">点我关闭窗口</a>
   </div>
  </div>
</template>


<script type="es6">
  import { Toast,Indicator  } from 'mint-ui';
  import api from '../../api/';
  export default {
    created(){
    },
    methods:{
      closeWindow(){
        try {
        WeixinJSBridge.call("closeWindow");
        } catch (e) {
        alert(JSON.stringify(e));
        }
      }
    },
    mounted(){
    }
  }
</script>

<style scoped>

</style>
