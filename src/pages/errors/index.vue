<template>
  <div>
    <div class="toptitle" ><span class="dot iconfont"></span>错误页面
    <span style="position: absolute;right: 2rem;" @click="closePage">关闭页面</span></div>
    <div class = "_error_head">
    	网络出现异常
    </div>
    <div class="_error_detail">
    	{{errorMessage}}
    </div>
    <div class="_error_bottom">
    <mt-button  @click="refreshPage"
       style="margin-right:10px;" type="primary">刷新
       </mt-button>
    </div>
  </div>
</template>

<script type="es6">
import {Toast} from 'mint-ui'
export default {
  data() {
    return {
    	errorMessage:'',
    	returnUrl:'',
    };
  },
  methods:{
  	closePage:function(){
  		WeixinJSBridge.call("closeWindow");
      // Toast("关闭页面");
  	},
  	refreshPage:function(){
  		window.location.href=this.returnUrl;
  	},
  	fetchData:function(){
  		this.errorMessage = this.$route.query.errorMessage;
  		this.returnUrl = this.$route.query.returnUrl;
  		if(this.errorMessage){
  			this.errorMessage = decodeURIComponent(this.errorMessage);
  		}
  		if(this.returnUrl){
  			this.returnUrl = decodeURIComponent(this.returnUrl);
  		}
  	}
  },
   beforeRouteEnter (to, from, next) {
          next(vm => {
              vm.fetchData();
          });
      },
};
</script>

<style scoped>
._error_head{
    width:100%;
    text-align: center;
    font-size: 3rem;
}
._error_detail{
	width:80%;
	margin:2rem auto;
	word-wrap:break-word;
}
._error_bottom{
	 text-align: center;
}
</style>
