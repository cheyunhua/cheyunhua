<template>
    <router-view>
    </router-view>
</template>
<script>
import api from '../../../api/'
 export default {
	  data() {
        return {
       }
    },
    mounted() {
       this.initLoad();
    },
    methods: {
   	initLoad:function(){
    		var code = api.getQueryString('code');
            if (!code) {
               code= this.$route.query.code;
            }
            if (code) {
                localStorage.setItem("wx.user.code", code);
            }
            var wechatCode = api.getQueryString('state');
           if (!wechatCode) {
               wechatCode = this.$route.query.state;
           }
            if(wechatCode) {
                localStorage.setItem("wx.user.wechat.code", wechatCode);
            }
    	}

    },
 
 }
</script>
