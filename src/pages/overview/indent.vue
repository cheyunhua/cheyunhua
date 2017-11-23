<template>
  <div class="fx-wrapper fx-white" >
	<div class="fx-conten" v-if="!noData">
		<div class="conten-text">
      <p style="font-size: 1.6rem">共收取票据 <span >{{indentZysCount}}</span>  张</p>
    </div>
		<div class="listdiv">
			<ul>
              <a  v-on:click="intendDetail(list)"  v-for="list in indentList"><img src="../../assets/images/images/indent_01.png" alt="">
                <b v-if="flagType=='0'">{{list.clmc}}</b><!-- 电子档案 clmc 代表材料名称-->
                <b v-if="flagType=='1'">{{list.materialName}}</b><!-- 本地系统 materialName 代表材料名称-->
                <span class="fx-span-right" v-if="flagType=='0'&&(currentItem.statu==null?false:currentItem.statu=='0')">{{list.zys}}张</span>
                <span class="fx-span-right" v-if="flagType=='1'">{{list.materialCount}}张</span>
              </a>
            </ul>
		</div>
	</div>
    <div v-if="noData">
      <black-Data></black-Data>
    </div>
  </div>
</template>
<script type="es6">
  import api from '../../api/';
  import _track from '../../api/track';
  import blackData from './black_data';
  import { Toast,Indicator  } from 'mint-ui';
  export default {
    //flagType 判断是从概览进入的 取单数据 还是从待办进入的取单数据   flagType:0 为 概览进入    1 为待办
  props:['selectCustomerCode','selecttxm',"selectHandleCode",'currentItem','flagType'],
    components: {
      blackData,
    },
  data:function(){
    return {
      indentList: [],
      indentScysCount:0,
      indentZysCount:0,
      noData:false,
    }
  },
  created:function(){
  },
  mounted:function(){
    this.loadData();
  },
  //定义额外方法
  methods:{
    intendDetail(obj){
      _track._trackEvent("JCDZ_WX","概览-收单-明细条目",obj.clmc);
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
      this.indentList=[];
      this.indentScysCount=0;
      this. indentZysCount=0;
      var params={};
      params.userId=this.selectCustomerCode;
      params.txm=this.selecttxm;
      //概览-取单
      if(this.flagType=="0"){
        api.queryIndentLists(params).then((response) => {
          if(response.data!=null){
          if(response.data.head.errorCode==="0"){
            var resultBean = eval('(' + response.data.head.errorMsg + ')');
            if (resultBean.code === 200) {
              this.indentList =  resultBean.result ;
              for(var i=0;i<this.indentList.length;i++){
                this.indentScysCount = this.indentScysCount + this.indentList[i].scys;
                this.indentZysCount = this.indentZysCount + this.indentList[i].zys;
              }
            }
          }else{
            Indicator.close();
            Toast("网络异常");
          }
        }
        Indicator.close();
      }) .catch((response) => {
          Indicator.close();
           Toast("应用异常");
        });
      }
      //待办-取单
      if(this.flagType=="1"){
        params.id=this.selectHandleCode;
        api.queryIndentListsBywqd(params).then((response) => {
          if(response.data!=null){
          if(response.data.head.errorCode==="0"){
            var resultBean = response.data.body;
              this.indentList =  resultBean ;
              for(var i=0;i<this.indentList.length;i++){
//                this.indentScysCount = this.indentScysCount + this.indentList[i].scys;
                this.indentZysCount = this.indentZysCount + this.indentList[i].materialCount;
              }
          }else{
            Indicator.close();
            Toast("网络异常");
          }
        }
        Indicator.close();
      }).catch((response) => {
          Indicator.close();
        Toast("应用异常");
      });
      }


    }


    },
  watch:{
    selecttxm:function () {
      this.loadData();
    },
    selectHandleCode:function(){

    }
  }
};
</script>
<style scoped>
  .fx-span-right{
    color: #f17712;
  }
</style>
