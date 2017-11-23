<template>
     <div>
     <i @click = 'scanQRCode'>点我扫码</i>
      <i @click = 'getTestAuth'>点我授权</i>
    </div>
</template>
<script type="es6">
    import api from '../../api/';
    import {Toast} from 'mint-ui';
    var wx = require('weixin-js-sdk');
    export default {
      data(){
        return {
         wxJsSdkConfig: false,
        }
      },
     methods:{
     /*  wechatJsAuth(){
       this.wxConfig();

       },*/
       getTestAuth(){
      /*api.getTestAuth({})
           .then(function(d){
            console.log(d);
           });*/
            $.ajax({
                    url: api.getTestAuth(),
                    type: "post",
                    dataType: "jsonp",  //类型
                    success:(res => {
                        
                    }),
                    error:(err => {
               
                    })
                  });

       },
       scanQRCode(){
      if(!this.wxJsSdkConfig){
        Toast("微信配置初始化中，请稍后再试！");
        return;
      }
      let that = this;
    /*  wx.scanQRCode({
        needResult : 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType : [ "qrCode", "barCode" ], // 可以指定扫二维码还是一维码，默认二者都有
        success : function(res) {
          let serial = res.split(",");
          let serialNumber = serial[serial.length - 1];
          that.sdbInfo.barCode = serialNumber;
          api.saveBarCode()
            .then(function(res){
              if(res.data.flag){
                that.canEditTxm = false;
                that.sdbInfo.txmCheck = 'false';
              }
            })
        },
        error : function() {
          Toast("未扫描到任何结果！");
        },
        cancel : function() {
        }
      });*/
             wx.getLocation({
                type: 'wgs84',
                success: function (res) {
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    var speed = res.speed; // 速度，以米/每秒计
                    var accuracy = res.accuracy; // 位置精度
                    console.log(latitude);
                },
                fail: function(req) {
                    alert('fail');      
                }  
    });
    },
      wxConfig(){
       // alert(wx);
      let that = this;
      const url=encodeURIComponent(window.location.href.split('#')[0]);
      var param = {};
      param.wechatCode = 'WECHAT_CUS2';//微信区域编码，登录或js微信说全后会存在缓存里
      param.url = url;
      api.getWechatJsAuth(param)
        .then(function(d){
            if(d.data.head.errorCode=='0'){
            var wxInfo=d.data.body;
              wx.config({
                debug : false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId : wxInfo.appId, // 必填，公众号的唯一标识
                timestamp : wxInfo.timestamp, // 必填，生成签名的时间戳
                nonceStr : wxInfo.nonceStr, // 必填，生成签名的随机串
                signature : wxInfo.signature,// 必填，签名，见附录1
                jsApiList : ["scanQRCode","chooseImage","chooseWXPay","getLocation"]
              // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
              });
              wx.ready(function() {
                that.wxJsSdkConfig = true;
              });
            }
        })
        .catch(function(err){
           Toast({
                message: '初始化微信JS接口失败:'+err,
                duration: 3000
              })
          })
    },
     },
      mounted: function () {
            this.wxConfig();
    }
    }
</script>
