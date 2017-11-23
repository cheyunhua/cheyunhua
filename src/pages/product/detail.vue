<template>
  <div>
    <div class="fx-header-top fx-orange">
      <i class="glyphicon glyphicon-menu-left fx-ico-left" aria-hidden="true"
			 v-on:click="goBack()"></i>{{Title}}
    </div>
    <div class="picbox"><img :src="headImgUrl"></div>
    <div class="boxstyle02">
    	<div class="title">{{goodsName}}</div>
    	<!-- <div class="text">
    		{{goodsName}}
    	</div> -->
    	<div class="bottom">
        <li class="licss01">
    			<!-- <span class="money">{{price}}</span> -->
    		</li>
        <li class="licss01" v-show="false">
    	    <span class="fwdq">服务地区
            <select class="form-control input-sm" style="width:25%;display:inline" id="sel_Province" @change="provinceOnchange()"></select>
            <select class="form-control input-sm" style="width:25%;display:inline" id="sel_City" @change="cityOnchange()"></select>
            <select class="form-control input-sm" style="width:25%;display:inline " id="sel_County"></select>
    			</span>
    		</li>
    		<li class="licss02">
    			<span><i class="iconfont icon-dunpai"></i>下单30分钟内响应</span>
    			<span><i class="iconfont icon-dunpai"></i>服务流程全程监管</span>
    			<span><i class="iconfont icon-dunpai"></i>不成功无条件退款</span>
    		</li>
    	</div>
    </div>
    <div class="line"></div>
    <div v-for="(photo,index) in photos" v-if="index>0" class="picbox"><img onerror="this.style.display='none'" :src="photo.photoUrl"></div>

    <div style="height: 6rem;"></div>
    <div class="footbtn03">
        <ul>
    	<a href="tel:400-99-12366" class="icon"><i class="iconfont icon-dianhua"></i></a>
    	<a @click="startManService()" class="btn01">在线咨询</a>
    	<a @click="purchaseAtOnce()" class="btn02">我感兴趣</a>
    	</ul>
    </div>

  </div>

</template>

<script type="es6">
  import {mapState} from 'vuex';
  import { Toast,Indicator,MessageBox  } from 'mint-ui';
  import api from '../../api/';
  import config from '../../api/config';
  export default{
    data(){
      return{
        Title: '商品详情',
				productCode:null,
        good:null,
        areasList:null,
        goodsName:null,
        goodsNumber:null,
        goodsCode:null,
        goodsSku:null,
        price:"面议",
        wxImgvUrl:null,
        photos:null,
        headImgUrl:null
      }
    },
    computed: mapState({
        login: state => state.account.auth.check(),
        userId: state => state.account.auth.userId,
    }),
    methods:{
			queryGoods(){
				var _this = this;
				var flag=0;
        var testProvince=/^[0-9]{2}[0]{4}$/;
				var params={};
				if(this.$route.query){
						params = this.$route.query;
				}
        _this.productCode = params.productCode;
        params.areaCode = '440600';//TODO 获取城市

        Indicator.open({
          text: '正在加载...',
          spinnerType: 'triple-bounce'
        });

				api.queryGoodInfo(params).then((response) => {
          Indicator.close();
          _this.good = response.data.body[0];//TODO 如果有多个商品
          _this.goodsName = response.data.body[0].goodsName;
          _this.photos = response.data.body[0].photos
          _this.headImgUrl = response.data.body[0].photos[0].photoUrl
          _this.initArea();
				})
			},
      initArea(){
        var _this = this;
        var areasList = sessionStorage.areasList;

        if(areasList != null || typeof(areasList) != "undefined"){
          areasList = JSON.parse(areasList);
          _this.areasList = areasList;
          for (var i = 0 ; i < areasList.length; i++){
            var areaCode = areasList[i].areaCode;
            var area = areasList[i].areaName;
            $("#sel_Province").append(
        								"<option value='" + areaCode + "'>" + area
        										+ "</option>");
          }

          document.getElementById('sel_Province').value = "440000";
          _this.provinceOnchange();
          document.getElementById('sel_City').value = "440600";
          _this.cityOnchange();
          document.getElementById('sel_County').value = "440604";
          _this.queryGoodsSku();
        }else{
          /*var params={};
          api.queryAllArea(params).then((response) => {
            Indicator.close();
            _this.areasList = response.data.body;
            localStorage.setItem("areasList",JSON.stringify(_this.areasList));
            initArea();

  				}).catch((response) => {
              Indicator.close();
              Toast("网络异常，请稍后再试");
          });*/

          $.getJSON(config.cdnUrl+"/weChatMall/json/areaJson/queryAllArea.json",function(data){
            _this.areasList = data.body;
            sessionStorage.setItem("areasList",JSON.stringify(_this.areasList));
            _this.initArea();
          });
        }

      },
      provinceOnchange(){
        var areasList = this.areasList;
        $("#sel_City").empty().append("<option value='城市'>请选择城市</option>");
        $("#sel_County").empty().append("<option value='区县'>请选择区县</option>");
        var ProvinceValue = $("#sel_Province").val();
        if(ProvinceValue == 110000){
				$("#sel_City").append(
						"<option value='110000'>北京市</option>");
      	}else if(ProvinceValue==120000){
      				$("#sel_City").append(
      						"<option value='120000'>天津市</option>");
      	}else if(ProvinceValue==310000){
      				$("#sel_City").append(
      						"<option value='310000'>上海市</option>");
      	}else if(ProvinceValue==500000){
      				$("#sel_City").append(
      						"<option value='500000'>重庆市</option>");
      	}else{
          for (var i = 0 ; i < areasList.length; i++){
            if(areasList[i].areaCode == ProvinceValue){
              var areaCity = areasList[i].subArea;
              for(var j=0; j<areaCity.length; j++){
                var areaCode = areaCity[j].areaCode;
                var area = areaCity[j].areaName;
                $("#sel_City").append(
            							"<option value='" + areaCode + "'>" + area
            									+ "</option>");
              }
            }
          }
      	}
      },
      cityOnchange(){
        var areasList = this.areasList;
        $("#sel_County").empty().append("<option value='区县'>请选择区县</option>");
        var ProvinceValue = $("#sel_Province").val();
        var CityValue=$("#sel_City option:selected").val();
        this.queryGoodsSku();
      	if(CityValue==110000 || CityValue==120000 || CityValue==310000 ||CityValue==500000){
          for (var i = 0 ; i < areasList.length; i++){
            if(areasList[i].areaCode == ProvinceValue){
              var areaCity = areasList[i].subArea;
              for(var j=0; j<areaCity.length; j++){
                var areaCode = areaCity[j].areaCode;
                var area = areaCity[j].areaName;
                $("#sel_County").append(
            						"<option value='" + areaCode + "'>" + area
            								+ "</option>");
              }
            }
          }
      	}else{
          for (var i = 0 ; i < areasList.length; i++){
            if(areasList[i].areaCode == ProvinceValue){
              var areaCity = areasList[i].subArea;
              for(var j=0; j<areaCity.length; j++){
                if(areaCity[j].areaCode == CityValue){
                  var CountyList = areaCity[j].subArea;
                  for(var k=0; k<CountyList.length; k++){
                    var areaCode = CountyList[k].areaCode;
                    var area = CountyList[k].areaName;
                    $("#sel_County").append(
                            "<option value='" + areaCode + "'>" + area
                                + "</option>");
                  }
                }
              }
            }
          }
      	}
      },
      queryGoodsSku(){
        var _this = this;
        var ProvinceValue = $("#sel_Province").val();
        var CityValue=$("#sel_City option:selected").val();
        // var CountyValue=$("#sel_County option:selected").val();
        var params={};
        params.goodsCode = this.good.goodsCode;
        params.areaCode = CityValue;
        api.queryGoodsSku(params).then((response) => {
 //         _this.price = response.data.body.price;
          _this.goodsSku = response.data.body.goodsSku;
        }).catch((response) => {
            Indicator.close();
            _this.price = "面议";
            // Toast("获取商品价格失败");
        });
      },
      purchaseAtOnce(){
        let _this = this;

        //if(_this.verificationInfo()){
       //   if(_this.price == "面议" ||_this.price == null){
       //     Toast('请电话咨询相关购买信息');
        //  }else{
        //    if (!_this.login) {
        //        _this.gotologin();
         //   }else{
       //       localStorage.setItem("goodsSku",_this.goodsSku)
              //重定向到商品订购页面
        //      this.$router.push('/Order');
        //    }
         // }

      //  }
      localStorage.setItem("goodsSku",_this.goodsSku);
      this.$router.push('/feedback/product_ordering');
      },
      verificationInfo(){
        var testAreaSelect=/^[0-9]{6}$/;
      	var ProvinceValue=$("#sel_Province option:selected").val();
      	var CityValue=$("#sel_City option:selected").val();
      	var CountyValue=$("#sel_County option:selected").val();
      	if(!testAreaSelect.test(ProvinceValue)){
          Toast('请选择省份');
      		return false;
      	}
      	if(!testAreaSelect.test(CityValue)){
          Toast('请选择城市');
      		return false;
      	}
      	if(!testAreaSelect.test(CountyValue)){
          Toast('请选择区县');
      		return false;
      	}
      	return true;
      },
      startManService(){
        var param = {};
        Indicator.open({
                       text: '请求中....',
                       spinnerType: 'snake'
                     });
          param.appCode = localStorage.getItem("wx.user.code");
          param.wechatCode = localStorage.getItem("wx.user.wechat.code");
         api.startArtificiallyService(param)
                              .then((response) => {
                              Indicator.close();
           if(response.data.head.errorCode=='0'){
             console.log("进入人工服务");
             WeixinJSBridge.call("closeWindow");
           }else{
              console.log("进入人工服务失败");
                Toast("请稍后重试！");
           }
         }).catch((response) => {
            Indicator.close();
                     Toast("请稍后重试！");
                   });


      },
      gotologin() {
        this.$router.push('/logins?redirect_url=%2fproduct%2fdetail%3fgoodsNumber%3d'+this.goodsNumber);
      },
      goBack: function() {
        window.history.go(-1);
      },
  },
  //通过路由的before钩子解除router-view缓存限制
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.queryGoods();
    });
  },
  beforeRouteLeave(to, from, next){
    next();
  },
	created() {
    this.productCode = this.$route.query.productCode;
    this.wxImgvUrl = config.wxImgvUrl;
	},

	watch:{

	 },

	mounted: function () {

	}

}

</script>

<style>
.mint-popup-4 {
    width: 100%;
}
.mint-popup-4 .picker-slot-wrapper, .page-popup .mint-popup-4 .picker-item {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}
</style>
