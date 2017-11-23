<template>
  <div class="page-field">
    <header>
      <div class="navTit">
              <div class="navBt">
                <i class="fa fa-angle-left"></i>支付方式<b class="fa fa-ellipsis-h"></b>
              </div>
      </div>
    </header>
    <div class="wrapper">
      <div class="row fx-white index-content">
        <div class="col-xs-2"><img src="../../assets/images/common/dt1.png" height="auto" alt=""></div>
        <div class="col-xs-8"><img src="../../assets/images/common/dt1.png" height="auto" alt=""></div>
      </div>
    </div>
    <div class="login" v-on:click="submitPay();">{{submitPayText}}</div>
  </div>
  </section>
</template>
<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js" type="text/javascript" charset="utf-8"></script>
<script>
    import config from '../../api/config';
    import api from '../../api/';
    import _track from '../../api/track';
    import { mapState } from 'vuex';
    import { Toast,Indicator  } from 'mint-ui';
    import '../../assets/css/login.css';
    const localStorage = global.localStorage;
    export default {
        data () {
            return {
                params:{
                    billId:'001b51a82ed24d7f8ee39294c30e6e61',
                    payWay:'1',
                    goodsName:'测试商品',
                    idendityCode:null
                },
                submitPayText:'立即支付',
                payType:'wx'// 支付类型 微信：wx,支付宝：zfb
            }
        },
        //通过路由的before钩子解除router-view缓存限制
        //相对于组件来说的，而且应该是在路由进入之前开始准备的
        //所以beforeRouteEnter是调用ajax的时机
        beforeRouteEnter (to, from, next) {
                next(vm => {

                });
      },
        //在组件的生命周期完成后，且旧路由即将切换走，新路由beforeEach的时机执行

        beforeRouteLeave(to, from, next){
                next();
        },
        //在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用
        beforeCreate() {
            console.log("come beforeCreate");
        },
        //mounted 是生命期钩子
        mounted(){

        },
        //computed相当于属性的一个实时计算，如果实时计算里关联了对象，那么当对象的某个值改变的时候，同事会出发实时计算
        computed: mapState({

        }),
        //监听某个值（双向绑定）的变化，一旦发生变化，就调用引号里的方法，从而达到change事件监听的效果！
        watch: {
            //Vue.set(state.login, 'success', true);
            //'$route':'initLogin',
        },
    created(){
    },
    methods: {
        startPay:function(){
            if(this.payType==="wx" && userAgentCheck()){
                /*
                const wx = require('weixin-js-sdk')
            // 配置微信 config信息
            let data = {
              noncestr: 'Wm3WZYTPz0wzccnWsss',
              timestamp: +new Date(),
              url: window.location.href.split('#')[0],
              jsApiList: ['chooseWXPay']
            }
// m6Get 是我自己封装的fetch方法
// 从后台获取appid和对应的signature
m6Get('getWechatSu', data).then((res) => {
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: res.data.appid, // 必填，公众号的唯一标识
    timestamp: data.timestamp, // 必填，生成签名的时间戳
    nonceStr: data.noncestr, // 必填，生成签名的随机串
    signature: res.data.signature, // 必填，签名，见附录1
    jsApiList: data.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  })
})*/
            /*WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
               "appId":"wx2421b1c4370ec43b",     //公众号名称，由商户传入
               "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数
               "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串
               "package":"prepay_id=u802345jgfjsdfgsdg888",
               "signType":"MD5",         //微信签名方式：
               "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名
                },
               function(res){
                   if(res.err_msg == "get_brand_wcpay_request:ok" ) {

                   }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
               }
            );
            if (typeof WeixinJSBridge == "undefined"){
               if( document.addEventListener ){
                   document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
               }else if (document.attachEvent){
                   document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                   document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
               }
            }else{
               onBridgeReady();
            }*/
            }
        },
        userAgentCheck:function(){
            var userAgent =  navigator.userAgent;
            userAgent = userAgent.toLowerCase();
            if(userAgent.indexOf("micromessenger")>=0){
                var version  = userAgent.split("micromessenger/")[1];
                version = version.split(" ")[0];
                if(parseFloat(version,10)>=5.0){
                    return true;
                }else{
                    Toast("当前微信版本不支持微信支付，请升级至最新版本！");
                    return false;
                }
            }else{
                Toast("当前浏览器不支持微信支付，请在微信内打开！");
                return false;
            }
        }
    }
}
</script>
<style scoped>
    .wrapper {
        padding:0;
        margin-top: 3rem;
    }
  .page-part {
  }
  .mint-button {
    background-color: #4cd964
  }
  .mint-header {
    background-color: #f7f7f8;
      border-bottom: 1px solid #e7e7e7;
      color: #3d4145;
  }
</style>
