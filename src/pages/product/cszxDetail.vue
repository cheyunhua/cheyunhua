<template>
  <div>
    <div class="fx-header-top fx-orange">
      <i class="glyphicon glyphicon-menu-left fx-ico-left" aria-hidden="true"
      v-on:click="goBack()"></i>财税咨询
    </div>
    <div class="boxstyle04" v-for="item in cszxList" v-if="item.id == id">
      <div class="title">
        <li style="flex:initial;" class="icon"><i class="iconfont icon-loupanziliao"></i></li>
        <li class="txt">{{item.title}}</li>
      </div>
      <div class="text">
        <div class="h1">适用纳税人：{{item.nsr}}</div>
        <div class="h2">服务内容：</div>
        <div class="txt" v-for="serContext in item.context">
          <li><div class="cszxDetail-dot"></div>{{serContext}}</li>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div style="height: 5rem;"></div>
    <div class="footbtn02">
      <li><a v-on:click="goBack()" class="btnleft">取消</a><a @click="startManService()" class="btnright">咨询服务顾问</a></li>
    </div>
  </div>
</template>

<script type="es6">
import { Toast,Indicator,MessageBox  } from 'mint-ui';
import api from '../../api/';
export default{
  data(){
    return{
      id:'',
      content:null,
      goodsCategoryId:null,
      goodsList:null,
      cszxList:[
        {
          id:'1',
          title:'土地增值税清算审核报告',
          nsr:'房地产开发商',
          context:[
            '对符合土地增值税清算条件的纳税人，依照 税收法律、法规及土地增值税有关政策规定，计算房地产开发项目应缴纳的土地增值税税额',
            '出具土地增值税清算税款审核报告',
            '协助纳税人填写《土地增值税清算申报表》，向主管税务机关提供有关资料，办理土地增值税清算手续，结清房地产项目应缴纳土地增值税税款'
          ]
        },
        {
          id:'2',
          title:'企业所得税汇算清缴报告',
          nsr:'企业所得税实行查账征收的纳税人',
          context:[
            '核实纳税人利润总额',
            '计算应纳税所得额',
            '计算应补（退）所得税额',
            '出具企业所得税汇算清缴纳税审核报告'
          ]
        },
        {
          id:'3',
          title:'个人所得税汇算清缴报告',
          nsr:'缴纳生产、经营所得个人所得税的投资者',
          context:[
            '审核利润总额',
            '审核纳税调整增加额和纳税调整减少额',
            '审核投资者费用减除标准',
            '计算投资者个人应纳税额',
            '出具生产、经营所得投资者个人所得税年度纳税申报报告'
          ]
        },
        {
          id:'4',
          title:'企业注销清算审核报告',
          nsr:'办理注销税务登记的企业',
          context:[
            '审核纳税人注销税务登记前3年（开业不足3年按实际经营期限）各项税款的缴纳情况',
            '出具注销税务登记清算税款审核报告'
          ]
        },
        {
          id:'5',
          title:'股权转让税款清算报告',
          nsr:'股权转让方',
          context:[
            '核实纳税人利润总额',
            '核实股权转让成本',
            '出具股权转让税款清算报告'
          ]
        },
        {
          id:'6',
          title:'企业资产损失报告',
          nsr:'发生资产损失的纳税人',
          context:[
            '了解企业资产损失情况',
            '获取资产损失证据',
            '出具资产损失审核报告'
          ]
        }
      ]
    }
  },
  methods:{
    initPage(){
      this.id = this.$route.query.id;
      console.log("id:" + this.id);

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
    goBack: function() {
      window.history.go(-1);
    }
  },
  created() {
  },
  watch:{
  },
  //通过路由的before钩子解除router-view缓存限制
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.initPage();
    });
  },
  beforeRouteLeave(to, from, next){
    next();
  },
  mounted: function () {

  }

}

</script>

<style>
.cszxDetail-dot {
  float: left;
  height: 0.5em;
  width: 0.5em;
  background-color: #888888;
  margin-top: .6rem;
  margin-right: 0.5rem;
  border-radius: 1rem;
}
.boxstyle04{ background-color: #fff;}
.boxstyle04 .title{ background-color:#F29F3F; color: #fff; padding: 2rem; display: flex;}
.boxstyle04 .title .icon{  }
.boxstyle04 .title .icon .iconfont{ display: block; font-size: 4.4rem;width: 5rem;height: 5rem; line-height: 5rem; background-color: #fff; border-radius: 50%; color: #F29F3F; text-align: center; margin-right: 2rem;}
.boxstyle04 .title .txt{ font-size:2.9rem;}
.boxstyle04 .text{ padding: 2rem;}
.boxstyle04 .text .h1{ font-size: 1.8rem; color: #f17712; line-height: 4rem;}
.boxstyle04 .text .h2{ font-size: 1.6rem; line-height: 3rem;}
.boxstyle04 .text .txt{ line-height: 2rem; color: #707070;list-style-type: square;}
.boxstyle04 .text .txt li{ padding: 0.5rem 0;}
</style>
