<script>
import { Indicator, Toast, Popup,MessageBox  } from 'mint-ui';
import api from '../../api/';
import selectProvince from './selectProvince.vue';
import zongBu from './icon';
import chongQing from '../location/ChongQing/etax.vue';
import guangDong from '../location/GuangDong/etax.vue';
import guiZhou from '../location/GuiZhou/etax.vue';
import heBei from '../location/HeBei/etax.vue';
import qingHai from '../location/QingHai/etax.vue';
import shanDong from '../location/ShanDong/etax.vue';
import shenZhen from '../location/ShenZhen/etax.vue';
import yunNan from '../location/YunNan/etax.vue';
import siChuan from '../location/SiChuan/etax.vue';
import huNan from '../location/HuNan/etax.vue';
import qingDao from '../location/QingDao/etax.vue';
const WX_USER_WECHAT_CODE = "wx.user.wechat.code";
const localStorage = global.localStorage;
var wx = require('weixin-js-sdk')
export default {
  components: {
    selectProvince,
    zongBu,
    chongQing,
    guangDong,
    guiZhou,
    heBei,
    qingHai,
    shanDong,
    shenZhen,
    yunNan,
    siChuan,
    huNan,
    qingDao
  },
  data() {
    return {
      wxJsSdkConfig: false,
      provinceCode:'',
      guessCity:'',
      guessCityid:'',
      selectProvincePoupVisible:false,
      //showComponent:'guangDong',
      province:{  //省份对象默认  广东
        xzqhDm:'',
        xzqhMc:'',
        component:'',
      },
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
    goBack(){
      window.history.go(-1);
    },
    openSelectProvincePage(){
      this.$router.push('/selectProvince');
    },
    closeSelectProvinceAgent(province){
      if(this.province.xzqhDm == province.xzqhDm){

      }else{
        console.log("加载------------> " + province.xzqhMc + " <--------------页面");
        //this.province.component = province.component;
        this.province = province;
      }
      this.selectProvincePoupVisible = false;
    },
    wxConfig() {
      //设置false
      this.wxJsSdkConfig = false;
      let that = this;
      const url = encodeURIComponent(window.location.href.split('#')[0]);
      var param = {};
      param.wechatCode = localStorage.getItem(WX_USER_WECHAT_CODE);
      param.url = url;
      api.getWechatJsAuth(param).then(function (d) {
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
    getLocation() {
      console.log("getLocation");
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
              console.log("获取百度地图api成功！");
              _this.guessCity = res.result.addressComponent.city;
              _this.guessCityid = res.result.addressComponent.adcode;

              _this.changeProvince();

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
    },
    changeProvince(){
      var locationProvince = {};
      if(this.guessCityid == '440300'){
        locationProvince.xzqhDm = '440300';
        locationProvince.xzqhMc = '深圳';
        locationProvince.component = 'shenZhen';
      }else{
        this.provinceCode = this.guessCityid.substring(0,2) + '0000';
        for( var i = 0; i < this.provinceList.length; i ++){
          if( this.provinceList[i].xzqhDm == this.provinceCode){
            locationProvince = this.provinceList[i];
          }
        }
      }
      if( this.province.xzqhDm == locationProvince.xzqhDm ){
        //定位和 前一次选择一样，不提示切换
        return;
      }
      localStorage.setItem("taxHall.isGetLocation",1);  //办税大厅 只定位一次标识
      MessageBox({
        title: '当前定位到'+locationProvince.xzqhMc,
        message: '是否切换到当前定位地区?',
        confirmButtonText:'切换',
        showCancelButton: true
      }).then(action => {
        if (action == 'confirm') {
          this.province = locationProvince;
          var provinceLocalObj ={};
          provinceLocalObj = JSON.parse(localStorage.getItem("taxBusiness.selectProvince"));
          provinceLocalObj.selectedProvince = locationProvince;
          localStorage.setItem("taxBusiness.selectProvince",JSON.stringify(provinceLocalObj));
        }

      });
    },
    setProvince(province){
      this.province = province;
    }

  },
  watch:{
  },
  mounted(){
    //静默获取地理位置--只定位一次
    var flag = localStorage.getItem("taxHall.isGetLocation");
    if(!flag){ //如果不存在定位缓存，则静默定位。
      this.wxConfig();
    }

  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      var provinceLocalObj = {};
      provinceLocalObj = localStorage.getItem("taxBusiness.selectProvince");
      //判断  省份缓存是否为空,不为空直接读取 省份数据，为空就默认  广东
        console.log(provinceLocalObj);
      if(!provinceLocalObj){
        console.log("省份为空");
        provinceLocalObj = {};
        provinceLocalObj.selectedProvince = {"xzqhDm":"440000","xzqhMc":"广东","component":"guangDong"};
        provinceLocalObj.historyProvince = [];
        vm.setProvince(provinceLocalObj.selectedProvince);
        localStorage.setItem("taxBusiness.selectProvince",JSON.stringify(provinceLocalObj));
      }else{
        console.log("省份不为空");
        provinceLocalObj = JSON.parse(provinceLocalObj);
        vm.setProvince(provinceLocalObj.selectedProvince);
      }

    });
  }

}

</script>

<template>
    <div>

        <div class="icon-toptitle">
          <div class="icon-selectCity" @click="goBack()"><i class="iconfont icon-jiantou"></i></div>
          <div class="icon-title">办税大厅</div>
          <div class="icon-menuIcon"  @click="openSelectProvincePage">{{province.xzqhMc}}<i class="iconfont icon-jiantou-copy"></i></div>
        </div>

        <div class="" style="height:100%;width:100%;padding-top:2.8em;">
          <component :is="province.component"></component>
        </div>
        <!--
        <div class="icon-showMenu-popup">
    			<mt-popup v-model="selectProvincePoupVisible" position="bottom" class="mint-popup-3" :modal="false" popup-transition="popup-fade">
    	      <selectProvince @openSelectProvinceAgent="openSelectProvinceAgent" @closeSelectProvinceAgent="closeSelectProvinceAgent" :province="province" v-if="province"></selectProvince>
    	    </mt-popup>
    		</div>
      -->
    </div>
</template>

<style scoped>
.v-modal {
  display: none;
}
.badge-title {
    margin-top: .5rem;
}
.icon-group {
    display: flex;
    flex-flow: row wrap;
    background-color: white;
    padding: 1rem 0;
}
.icon-toptitle {
	position:fixed;
	float: left;
	width: 100%;
	background-color: #ff7043;
	height: 4.2rem;
	color: #fff;
	font-size: 1.8rem;
	z-index: 1;
	top:0;
}
.icon-selectCity {
	float: left;
	height: auto;
	width: 30%;
	line-height: 4.2rem;
	padding-left: 1em;
}
.icon-title {
	float: left;
	height: auto;
	width: 40%;
	text-align: center;
	line-height: 4.2rem;
}
.icon-menuIcon {
	float: left;
	height: auto;
	width: 30%;
	line-height: 4.2rem;
	padding-left: 1em;
}
</style>
