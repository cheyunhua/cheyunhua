<template>
  <div class="icon-page">
    <div>
      <div class="toptitle" ><span class="dot iconfont icon-jiantou" v-on:click="goBack()"></span>选择区域</div>
      <div>
        <div class="selectProvince-label">
          定位/历史
        </div>
        <div>
          <div class="selectProvince-location">
            <i class="iconfont icon-yikeappshijiandizhiqianrenyuan74"></i>
            <div class="" v-if="guessCity == '' || guessCity == null">正在定位...</div>
            <div class="" v-else>{{guessCity}}</div>
          </div>
          <div class="selectProvince-item" v-for="item in provinceHistory">
            {{item.xzqhMc}}
          </div>
        </div>
        <div class="selectProvince-label" style="margin-top:0.5em;">
          选择区域
        </div>
        <div class="selectProvince-provinceList">
          <div class="selectProvince-item" @click="selectProvince(item)" v-for="item in provinceList">
            {{item.xzqhMc}}
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
<style scoped>
.icon-page > body {
  background-color: red;
}
.selectProvince-label{
  float: left;
  width: 100%;
  height: 2.2em;
  background-color: #ffffff;
  border-bottom: 0.1em solid #E3E3E3;
  line-height: 2.2em;
  padding-left: 0.5em;
}
.selectProvince-location {
  float: left;
  width: auto;
  height: 2.5em;
  background-color: #F7B49F;
  margin: 0.5em 0 0 0.5em;
  padding: 0 0.3em 0 0.3em;
  line-height: 2.5em;
  border-radius: 0.3em;
 }
.selectProvince-location > i {
  float: left;
}
.selectProvince-location > div {
  float: left;
}
.selectProvince-provinceList {
  float: left;
}
.selectProvince-item {
  float: left;
  width: auto;
  height: 2.5em;
  background-color: #F7B49F;
  margin: 0.5em 0 0 0.5em;
  padding: 0 0.3em 0 0.3em;
  line-height: 2.5em;
  border-radius: 0.3em;
}
</style>
<script>
import api from '../../api/';
import { Button , Toast} from 'mint-ui';
const WX_USER_WECHAT_CODE = "wx.user.wechat.code";
const localStorage = global.localStorage;
var wx = require('weixin-js-sdk');
export default {
  props: [
    'province'
  ],
  data () {
    return {
      wxJsSdkConfig: false,
      guessCity:'',
      guessCityid:'',
      selectedProvince: '',
      provinceHistory:[],
      provinceList:[
        /*
        {
          xzqhDm:'100000',
          xzqhMc:'总部',
          component:'zongBu'
        },
        */
        {
          xzqhDm:'440000',
          xzqhMc:'广东',
          component:'guangDong'
        },
        {
          xzqhDm:'440300',
          xzqhMc:'深圳',
          component:'shenZhen'
        },
        {
          xzqhDm:'500100',
          xzqhMc:'重庆',
          component:'chongQing'
        },
        {
          xzqhDm:'520000',
          xzqhMc:'贵州',
          component:'guiZhou'
        },
        {
          xzqhDm:'630000',
          xzqhMc:'青海',
          component:'qingHai'
        },/*
        {
          xzqhDm:'530000',
          xzqhMc:'云南',
          component:'yunNan'
        },*/
        {
          xzqhDm:'370000',
          xzqhMc:'山东',
          component:'shanDong'
        },
        {
          xzqhDm:'130000',
          xzqhMc:'河北',
          component:'heBei'
        },
        {
          xzqhDm:'510000',
          xzqhMc:'四川',
          component:'siChuan'
        },
        {
          xzqhDm:'430000',
          xzqhMc:'湖南',
          component:'huNan'
        },
        {
          xzqhDm:'370200',
          xzqhMc:'青岛',
          component:'qingDao'
        }
      ]
    }
  },
  methods: {
    selectProvince(province){   //切换省份
      var provinceLocalObj = {};
      provinceLocalObj = JSON.parse(localStorage.getItem("taxBusiness.selectProvince"));
      provinceLocalObj.selectedProvince = province;
      provinceLocalObj.historyProvince = [];
      provinceLocalObj.historyProvince.push(province);

      localStorage.setItem("taxBusiness.selectProvince",JSON.stringify(provinceLocalObj));
      this.goBack();
    },
    goBack(){
      window.history.go(-1);
    },
    wxConfig() {
    //设置false
        this.wxJsSdkConfig = false;
        let that = this;
        const url = encodeURIComponent(window.location.href.split('#')[0]);
        var param = {};
          param.wechatCode = localStorage.getItem(WX_USER_WECHAT_CODE);
        param.url = url;
        api.getWechatJsAuth(param)
            .then(function (d) {
                var wxInfo = d.data.body;
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: wxInfo.appId, // 必填，公众号的唯一标识
                    timestamp: wxInfo.timestamp, // 必填，生成签名的时间戳
                    nonceStr: wxInfo.nonceStr, // 必填，生成签名的随机串
                    signature: wxInfo.signature,// 必填，签名，见附录1
                    jsApiList: ["scanQRCode", "chooseImage", "chooseWXPay", "getLocation"]
                    // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                wx.ready(function () {
                    that.wxJsSdkConfig = true;
                    that.getLocation();
                });
            })
            .catch(function (err) {
            //     Toast({
            //         message: '初始化微信JS接口失败:' + err,
            //         duration: 3000
            //     })
            })
    },
    getLocation: function () {
      if (!this.wxJsSdkConfig) {
        Toast("微信配置初始化中，请稍后再试！");
        return;
      }
      let _this = this;
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {

          $.ajax({
            url: 'http://api.map.baidu.com/geocoder/v2/?ak=btsVVWf0TM1zUBEbzFz6QqWF&callback=renderReverse&location=' + res.latitude + ',' + res.longitude + '&output=json&pois=1',
            type: "get",
            dataType: "jsonp",  //类型
            success: (res => {
              //定位显示到省份  如果定位到深圳直接显示深圳。
              _this.guessCityid = res.result.addressComponent.adcode;
              if(_this.guessCityid == "440300"){
                  _this.guessCity = res.result.addressComponent.city;
              }else{
                _this.guessCity = res.result.addressComponent.province;
              }
              //将区的行政区划编码变成市的行政区划编码
              //_this.guessCityid = _thit.guessCityid.substring(0,_thit.guessCityid.length-2)+'00';
            }),
            error: (err => {
              Toast({
                message: '当前城市定位失败:' + err.message,
                duration: 3000
              })
            })
          });

        },
      });
    }
  },
  computed: {

  },
  mounted(){
  },
  created(){

  },
  beforeRouteEnter (to, from, next) {
		next(vm => {
      vm.wxConfig();
      var provinceLocalObj = {};
      provinceLocalObj = localStorage.getItem("taxBusiness.selectProvince");
      if(!provinceLocalObj){

      }else{
        provinceLocalObj = JSON.parse(provinceLocalObj);
        vm.provinceHistory = provinceLocalObj.historyProvince;
      }

		});
	},
}
</script>
