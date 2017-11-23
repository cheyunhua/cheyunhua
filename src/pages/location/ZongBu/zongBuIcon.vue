<template>
  <div class="grayBg">
    <div class="navTit">
      <div>
        <div class="navHead">
          <div class="tit-head">财税业务</div>
          <div class="tit-content">
            <ul class="tit-icon">
              <li>
                <a href="http://ocsp.esv.com.cn/wxapp/assets/jchl/index.html?gnLx=%E7%BA%B3%E7%A8%8E%E6%9C%8D%E5%8A
%A1"><img :src="icon03"/></a>
                <p>纳税服务</p>
              </li>
              <li>
                <a href="http://ocsp.esv.com.cn/wxapp/assets/jchl/index.html?gnLx=%E4%B8%AA%E4%BA%BA%E5%8A%9E
%E7%A8%8E"><img :src="icon05"/></a>
                <p>个人办税</p>
              </li>
              <li>
                <a href="http://ocsp.esv.com.cn/wxapp/assets/jchl/index.html?gnLx=%E6%B6%89%E7%A8%8E%E4%BA%8B
%E9%A1%B9"><img :src="icon07"/></a>
                <p>涉税事项</p>
              </li>
            </ul>
            <ul class="tit-icon tit-icon2">
              <li>
                <a href="http://ocsp.esv.com.cn/wxapp/assets/jchl/index.html?gnLx=%E7%94%B3%E6%8A%A5%E7%BC%B4%E6%AC%BE&code=011DKE4U1fUNH91mMN3U1X645U1DKE4L&state=123&winzoom=1"><img :src="icon12"/></a>
                <p>申报缴款</p>
              </li>
              <li>
                <a href="http://ocsp.esv.com.cn/wxapp/assets/jchl/index.html?gnLx=%E5%8F%91%E7%A5%A8%E4%B8%AD%E5%BF%83"><img
                  :src="icon13"/></a>
                <p>发票中心</p>
              </li>
              <li>
                <a href="#"></a>
                <p></p>
              </li>
            </ul>
          </div>
          <div class="tit-head">电子税务局</div>
          <div class="tit-content">
            <ul class="tit-icon">
              <li>
                <router-link :to="{path:'bind'}"><img  :src="icon31"/></router-link>
                <p>绑定企业</p>
              </li>
              <li>
                <router-link :to="{path:'train'}"><img  :src="icon17"/></router-link>
                <p>培训报名</p>
              </li>
              <li>
                <a href="http://www.4009912366.com/portal/site/site/portal/jchl/detail.portal?
contentId=B81D3E1609F3C2551388FF75D76C117B&categoryId=2E26FB1FA4F1E2FE802A2CE72D8C0D55"><img
                  :src="icon18"/></a>
                <p>总体介绍</p>
              </li>
              <li>
                <a href="http://www.4009912366.com/portal/site/site/portal/jchl/detail.portal?
contentId=94C470A4ED3676ECF14852B4F37E3D57&categoryId=1DE76586ECC37560A254A8AF42233DE5"><img
                  :src="icon22"/></a>
                <p>如何办理实名制</p>
              </li>
            </ul>
            <ul class="tit-icon tit-icon2">
              <li>
                <a href="http://www.4009912366.com/portal/jsp/mobil/gddz_xgzl_list.jsp"><img
                  :src="icon16"/></a>
                <p>手册指南</p>
              </li>
              <li>
                <a href="http://www.4009912366.com/portal/site/site/portal/jchl/detail.portal?contentId=968C0DA3DD7AFA3FB36020E5D925352D&categoryId=5D98C76F7103C97DE9F6E9FFEA9CE018"><img :src="icon24"/></a>
                <p>常见问题</p>
              </li>
              <li>
                <a href=""></a>
                <p></p>
              </li>
            </ul>
          </div>
          <div class="tit-head">财税咨询</div>
          <div class="tit-content tit-content3">
            <ul class="tit-icon">
              <li>
                <a   v-on:click="startManService()"><img :src="icon28"/></a>
                <p>人工服务</p>
              </li>
              <li>
                <a href="http://www.4009912366.com/portal/jsp/mobil/zxdtInfo2.jsp"><img
                  :src="icon29"/></a>
                <p>资讯动态</p>
              </li>
              <li>
                <a href="http://www.4009912366.com/"><img :src="icon30"/></a>
                <!--<router-link :to="{path:'upload'}"><img :src="icon30"/></router-link>-->
                <p>我的社区</p>
              </li>
              <li>
                <a href=""></a>
                <p></p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import { Toast,Indicator  } from 'mint-ui';
  import api from '../../../api/';
  import config from '../../../api/config';
  import icon03 from '../../../assets/images/icon/icon_03.png';
  import icon05 from '../../../assets/images/icon/icon_05.png';
  import icon07 from '../../../assets/images/icon/icon_07.png';
  import icon12 from '../../../assets/images/icon/icon_12.png';
  import icon13 from '../../../assets/images/icon/icon_13.png';
  import icon31 from '../../../assets/images/icon/icon_31.png';
  import icon17 from '../../../assets/images/icon/icon_17.png';
  import icon18 from '../../../assets/images/icon/icon_18.png';
  import icon22 from '../../../assets/images/icon/icon_22.png';
  import icon16 from '../../../assets/images/icon/icon_16.png';
  import icon24 from '../../../assets/images/icon/icon_24.png';
  import icon28 from '../../../assets/images/icon/icon_28.png';
  import icon29 from '../../../assets/images/icon/icon_29.png';
  import icon30 from '../../../assets/images/icon/icon_30.png';

  export default {
   data() {
    return {
      icon03:icon03,
      icon05:icon05,
      icon07:icon07,
      icon12:icon12,
      icon13:icon13,
      icon31:icon31,
      icon17:icon17,
      icon18:icon18,
      icon22:icon22,
      icon16:icon16,
      icon24:icon24,
      icon28:icon28,
      icon29:icon29,
      icon30:icon30,
        wxJsSdkConfig:false,
		stop : false,   //默认是停止的，但界面加载之后会变成false
           Interval:null,  //setInterval的对象
		 timer:1,
           params:{
             code:''
          }
    };
  },

      methods:{
       startManService(){
       location.href=api.startManService();

      },
	    closeCurrentWindow(){
        try {
               WeixinJSBridge.call("closeWindow");
        } catch (e) {
           console.log("WeixinJSBridge    undefined");
                try{
                     parent.WeixinJSBridge.call("closeWindow");
                     }catch(e){
                      console.log("parent.WeixinJSBridge    undefined");
                     }
        }
      },
	     startTimer () {
                //如果是false就开始倒计时，如果是true就停止倒计时
                if(this.stop == false)
                {
                    this.Interval = setInterval(this.update,1000);
                }
                else
                {
                    clearInterval(this.Interval);
                }

                this.stop = !this.stop;
            },
	           update () {
                if(this.timer <= 0)
                {
                 Indicator.close();
				 clearInterval(this.Interval);
                 this.closeCurrentWindow();

                }
                else{
                 this.timer--;
                }

            },
          },
    mounted: function () {
       if(this.$route.query.manService){
             this.timer=1;
             Indicator.open({
                     text: '即将进入人工服务',
                     spinnerType: 'snake'
                   });
             this.startTimer();
         }
    }


}
</script>

<style scoped>
  @import "../../../assets/css/common-icon.css";
  @import "../../../assets/css/font-awesome.min.css";
  .fx-ico-left {
    font-size: 2rem;
    width: 3.8rem;
    height: 3.8rem;
    line-height: 3.6rem;
    left: 0rem;
    cursor: pointer;
    position: absolute;
  }

  .fx-ico-right {
    font-size: 2rem;
    width: 3.8rem;
    height: 3.8rem;
    line-height: 3.6rem;
    right: 0rem;
    cursor: pointer;
    position: absolute;
  }
  .fx-ico-right {
    position: absolute;
    right: 1.2rem;
  }
  .fx-header-top {
    position: relative;
  }
</style>
