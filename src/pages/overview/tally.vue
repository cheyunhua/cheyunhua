<template>
<div class="fx-wrapper fx-white">
	<div class="tally-conten fx-white" v-if="!noData">
		<div class="tally-conten-text">
			<div class="row">
				<div class="col-xs-6 fc-border" v-on:click="tallyDetail('资金')">
					<img class="text-ico" src="../../assets/images/images/tally_01.png" />
					<div class="text-flox">
						<p>资金</p>
						<p class="fc-color-orange">￥{{tallyList.zj!=null?(isNaN(tallyList.zj)===false?Number(tallyList.zj).toFixed(2):"0.00"):"....."}}</p>
					</div>
				</div>
				<div class="col-xs-6 fc-border" v-on:click="tallyDetail('应收')">
					<img class="text-ico" src="../../assets/images/images/tally_02.png" />
					<div class="text-flox">
						<p>应收</p>
						<p class="fc-color-orange">￥{{tallyList.ys!=null?(isNaN(tallyList.ys)===false?Number(tallyList.ys).toFixed(2):"0.00"):"....."}}</p>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-6 fc-border" v-on:click="tallyDetail('应付')">
					<img class="text-ico" src="../../assets/images/images/tally_03.png" />
					<div class="text-flox">
						<p>应付</p>
						<p class="fc-color-orange">￥{{tallyList.yf!=null?(isNaN(tallyList.yf)===false?Number(tallyList.yf).toFixed(2):"0.00"):"....."}}</p>
					</div>
				</div>
				<div class="col-xs-6 fc-border" v-on:click="tallyDetail('主营业务收入')">
					<img class="text-ico" src="../../assets/images/images/tally_05.png" />
					<div class="text-flox">
						<p>主营业务收入</p>
						<p class="fc-color-orange">￥{{tallyList.sr!=null?(isNaN(tallyList.sr)===false?Number(tallyList.sr).toFixed(2):"0.00"):"....."}}</p>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-xs-6 fc-border" v-on:click="tallyDetail('主营业务成本')">
					<img class="text-ico" src="../../assets/images/images/tally_06.png" />
					<div class="text-flox">
						<p>主营业务成本</p>
						<p class="fc-color-orange">￥{{tallyList.cb!=null?(isNaN(tallyList.cb)===false?Number(tallyList.cb).toFixed(2):"0.00"):"....."}}</p>
					</div>
				</div>
				<div class="col-xs-6 fc-border" v-on:click="tallyDetail('费用')">
					<img class="text-ico" src="../../assets/images/images/tally_07.png" />
					<div class="text-flox">
						<p>费用</p>
						<p class="fc-color-orange">￥{{tallyList.fy!=null?(isNaN(tallyList.fy)===false?Number(tallyList.fy).toFixed(2):"0.00"):"....."}}</p>
					</div>
				</div>
			</div>
      <div class="row">
			<div class="col-xs-6 fc-border fx-delete-border" v-on:click="tallyDetail('税前利润')">
				<img class="text-ico " src="../../assets/images/images/tally_08.png" />
				<div class="text-flox">
					<p>税前利润</p>
					<p class="fc-color-orange">￥{{tallyList.sqlr!=null?(isNaN(tallyList.sqlr)===false?Number(tallyList.sqlr).toFixed(2):"0.00"):"....."}}</p>
				</div>
			</div>
      <div class="col-xs-6 fc-border fx-white fx-delete-border">
        <div class="text-flox">
        </div>
      </div>
        </div>
      <div class="col-xs-6 fc-border fx-white fx-delete-border">

      </div>
		</div>
	</div>
  <div v-if="noData">
    <black-Data></black-Data>
  </div>
</div>
</template>
<script type="es6">
  import '../../assets/css/tally.css'
  import api from '../../api/';
  import _track from '../../api/track';
  import { Toast,Indicator  } from 'mint-ui';
  import blackData from './black_data';
  const localStorage = global.localStorage;
  const WX_USER_TOKEN = "wx.user.token";
  export default {
    props:['selectCustomerCode', 'selectAccountDate', 'selectAccountId', 'selectServiceCode', 'selectAccountSysCode', 'currentItem'],
    components: {
      blackData,
    },
    data(){
      return{
        tallyList:{},
        noData:false,
      }
    },
    methods:{
      //记账明细点击
      tallyDetail(objName){
        _track._trackEvent("JCDZ_WX","概览-记账-明细条目",objName);
      },
      loadData(){
        if(this.currentItem!=null){
          if(this.currentItem.statu==="2"||this.currentItem.statu==="1"){
            this.noData =  true;
            return;
          }else{
            this.noData =  false;
          }
        }
        Indicator.open({
          text: "加载中,请稍后",
          spinnerType: 'snake'
        });
        var params={};
          params.cusId=this.selectCustomerCode;
//        params.cusId="e12eb2418fdc41f8b81a701c90dcb538";
        console.log("记账会计期间==" + this.selectAccountDate);
        if(this.selectAccountDate!=null){
          params.kjqj=this.selectAccountDate;
        }
        if(!params.kjqj){
          var date = new Date();
            var year = date.getFullYear();
            var month =date.getMonth();
            if(month == 0){
              year = year - 1;
              month = 12;
            }
            if (month.toString().length == 1) {
                month = "0" + month;
              }
            params.kjqj = year.toString() + month.toString() ;

        }
         params.selectAccountId=this.selectAccountId;
         params.accountId=this.selectAccountId;
        // 北京接口调用
         console.log("记账==" + this.selectAccountSysCode);
        if(this.selectAccountSysCode === 'beijingAccount'){
            //params.token=localStorage.getItem(WX_USER_TOKEN);
          api.queryTallyListsByBeiJing(params).then((response) => {
            if(response!=null&&response.data.head.errorCode==="0"){
                this.tallyList =  response.data.body ;
            }else{
              Toast(response.data.head.errorMsg)
            }
            Indicator.close();
          })
            .catch((response) => {
              Indicator.close();
              Toast("请求网络异常");
            });
        }//云账房接口
        else if(this.selectAccountSysCode === 'sjzAccount'){
           // params.token=localStorage.getItem(WX_USER_TOKEN);
          api.queryTallyListsByYZF(params).then((response) => {
            if(response!=null&&response.data.head.errorCode==="0"){
              this.tallyList =  response.data.body ;
            }else{
              Toast(response.data.head.errorMsg)
            }
            Indicator.close();
          })
            .catch((response) => {
              Indicator.close();
              Toast("请求网络异常");
            });
        }
        else if(this.selectAccountSysCode === 'guangzhouAccount'){
          // 财税管家调用
          api.queryTallyLists(params).then((response) => {
            if(response!=null&&response.data.head.errorCode==="0"){
              var resultBean = eval('(' + response.data.head.errorMsg + ')');
              if(resultBean.rtnCode==="0000"){
                this.tallyList =  resultBean.data ;
              }
              if(resultBean.rtnCode==="0001"){
                Toast(resultBean.rtnMessage);
              }
            }else{
              Toast("请求数据失败");
            }
            Indicator.close();
          })
            .catch((response) => {
              Indicator.close();
              Toast("请求网络异常");
              //commit(types.ACCOUNT_LOGIN_SUBMIT_FAILURE, response.data);
            });
        }else{
          Indicator.close();
          Toast("识别接口出错"+this.selectAccountSysCode);
        }
      }
    },
    mounted:function(){
      this.loadData();
    },
    watch:{
      selectCustomerCode:function() {
        this.tallyList={};
        this.loadData();
      }
    }
  };
</script>
<style scoped>
</style>
