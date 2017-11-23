<template>
	<div class="fx-wrapper fx-white"  >
		<div class="fx-conten" v-if="!noData">
				<div class="listdiv">
					<ul>
						<!--<a href="#"><p class="dutiable-conten">本期税额合计：<span class="fc-color-orange">￥{{dutiableTotal}}</span>  </p> </a>-->
						<a href="#" v-on:click="dutiableDetail('本期税额合计')"><p class="dutiable-conten">本期税额合计：<span class="fc-color-orange">￥{{dutiableTotalMap.se!=null?dutiableTotalMap.se:'0.00'}}</span>  </p> </a>
						<li v-for="(list,index) in dutiableList" v-on:click="dutiableDetail(list.sbywMc)">
                <a href="#" v-if="index==0"><img src="../../assets/images/images/dutiable_02.png" alt="" style="margin-left: 50px;">{{list.sbywMc}}<span class="fx-span-right">￥{{list.se}}</span></a>
                <a href="#" v-if="index==1"><img src="../../assets/images/images/dutiable_02.png" alt="" style="margin-left: 50px;">{{list.sbywMc}}<span class="fx-span-right">￥{{list.se}}</span></a>
                <a href="#" v-if="index==2"><img src="../../assets/images/images/dutiable_02.png" alt="" style="margin-left: 50px;">{{list.sbywMc}}<span class="fx-span-right">￥{{list.se}}</span></a>
              <div style="margin-top: 1rem;"  v-if="index==3" >  </div>
                <a href="#" v-if="index==3"><img src="../../assets/images/images/dutiable_03.png" alt="">{{list.sbywMc}}<span class="fx-span-right">￥{{list.se}}</span></a>
                <a href="#" v-if="index==4"><img src="../../assets/images/images/dutiable_03.png" alt="">{{list.sbywMc}}<span class="fx-span-right">￥{{list.se}}</span></a>

            </li>
          </ul>
				</div>
			</div>
    <div v-if="noData">
        <black-Data></black-Data>
    </div>
		<!--	<div class="fx-conten">
				<div class="listdiv">
					<ul>
						<a href="#"><img src="../../assets/images/images/dutiable_03.png" alt="">社保<span class="fx-span-right">￥20,100.00<i class="fa fa-angle-right"></i></span></a>
						<a href="#"><img src="../../assets/images/images/dutiable_04.png" alt="">个税<span class="fx-span-right">￥20,100.00<i class="fa fa-angle-right"></i></span></a>
					</ul>
				</div>
			</div>-->
		</div>

</template>
<script type="es6">
  import '../../assets/css/dutiable.css'
  import api from '../../api/';
  import _track from '../../api/track';
  import blackData from './black_data';
  import { Toast,Indicator  } from 'mint-ui';
  const localStorage = global.localStorage;
  const WX_USER_TOKEN = "wx.user.token";
  export default {
  props:['selectCustomerCode','selectAccountDate','currentItem', 'selectAccountSysCode', 'selectAccountId'],
    components: {
      blackData,
    },
  data(){
    return{
      dutiableTotal:0,
      dutiableTotalMap:{},
      dutiableList:[],
      noData:false,
    }
  },
  methods:{
    dutiableDetail(objName){
      _track._trackEvent("JCDZ_WX","概览-报税-明细条目",objName);
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
          params.khId=this.selectCustomerCode;
          let select_date = this.selectAccountDate;
            if(!select_date){
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
            select_date = year.toString() + month.toString() ;

        }
          if(select_date!=null&&select_date>0){
            var sssqQ = select_date.substr(0,4)+"-"+select_date.substr(4,5)+"-01"
            var sssqZ = select_date.substr(0,4)+"-"+select_date.substr(4,5)+"-31"
            params.sssqQ=sssqQ;
            params.sssqZ=sssqZ;
          }
          params.accountId = this.selectAccountId;
          //调用云账房接口
            console.log("报税==" + this.selectAccountSysCode);
          if(this.selectAccountSysCode==='sjzAccount'){
              //params.token=localStorage.getItem(WX_USER_TOKEN);
            api.queryDutiableListsByYZF(params).then((response) => {
              if(response!=null&&response.data.head.errorCode==="0"){
                  var result = response.data.body;
                  this.dutiableTotalMap = result.taxTotalObjDTO;
                  this.dutiableList =  result.taxArrayObjDTOList ;
              }else{
                Toast(response.data.head.errorMsg)
              }
              Indicator.close();
            })
              .catch((response) => {
                Toast("请求网络异常");
              });
          }
          else if(this.selectAccountSysCode==='guangzhouAccount'
            || this.selectAccountSysCode==='beijingAccount'){
            api.queryDutiableLists(params).then((response) => {
              if(response.data!=null){
                if(response.data.head.errorCode==="0"){
                    var resultBean = eval('(' + response.data.head.errorMsg + ')');
                    if (resultBean!=null) {
                        this.dutiableList =  resultBean ;
                        this.dutiableTotalMap =  this.dutiableList[0] ;
                        this.dutiableList.splice(0,1);
                    }
                }
              }
              Indicator.close();
            })
              .catch((response) => {
                Toast("请求网络异常");
              });
          }else{
            Toast("识别接口出错");
          }
    }
  },
  mounted:function(){
    this.loadData();
  },
  watch:{
    selectCustomerCode:function() {
      this.dutiableTotal=0;
      this.dutiableList=[];
      this.loadData();
    }
  }
};
</script>
<style scoped>
  .fc-color-orange{
    color: #f17712;
    border:0;
  }
  .fx-span-right{
    color: #f17712;
  }


</style>
