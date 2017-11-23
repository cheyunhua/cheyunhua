<template>
  <div>
    <div class="fx-header-top fx-orange">
      培训报名
    </div>
    <div class="_head">
      <div class="_head_content">{{headText}}</div>
    </div>
    <div class="_body">
      <div class="wrapper">
        <div class="row fx-white index-content" >
          <div class="col-xs-4" style="margin-left: -3rem;">联系人</div>
          <div class="col-xs-3" style="width: 75%;margin-left: -0.5rem;"><input    style="font-size: 14px;" v-model="userInfo.userName" /></div>
        </div>
        <div class="row fx-white index-content">
          <div class="col-xs-4" style="margin-left: -2.5rem">手机号码</div>
          <div class="col-xs-3" style="width: 75%;margin-left: -1rem;"><input    style="font-size: 14px;" v-model="userInfo.mobilePhone"  /></div>
        </div>
          <div class="row fx-white index-content" >
            <div class="col-xs-4" style="margin-left: -2.5rem">培训预约</div>
            <div class="col-xs-3" style="width: 75%;margin-left: -1rem;">
              <select  class="_selectMyself" v-model="selected" v-on:change="showTrainTime(selected)">
                <option value="">请选择</option>
                <option v-for="train in trainList" v-bind:value="train">
                  {{train.trainName}}
                </option>
              </select>
            </div>
          </div>
          <!--
          <div class="row fx-white index-content" >
            <div class="col-xs-4" style="margin-left: -2.5rem"><span v-if="selected.fullTrainAddress">培训地址</span></div>
            <div class="col-xs-3" style="width: 75%;margin-left: -1rem;"><span   class="train_address" style="font-size: 14px;width: 100% ;" >{{selected.fullTrainAddress}}</span></div>
          </div>
          <div class="row fx-white index-content" >
            <div class="col-xs-4" style="margin-left:-2.5rem"><span v-if="selected.beginDateStr">培训时间</span></div>
              <div class="col-xs-3" style="width: 75%;margin-left: -1rem;"><input    style="font-size: 14px;" v-model="selected.beginDateStr"  readonly /></div>
          </div>
        -->
      </div>
    </div>
    <div class="page-part">
      <div class="login" v-on:click="sureAdd();">{{buttonText}}</div>
    </div>
  </div>
</template>

<script type="es6">
  import { Toast,Indicator,MessageBox  } from 'mint-ui';
  import api from '../../api/';
  import _track from '../../api/track';
  export default{
    name: 'trainEnroll',
    props: ['headText','appCode'],
    data(){
      return {
        buttonText: '提交报名',
        userInfo: {},
        trainList: [],
        selected: '',
      }
    },
    methods: {
      goBack(){
        this.$router.go(-1);
      },
      showTrainTime(obj){
         /* if(obj.trainTime){
            obj.trainDate =obj.trainTime + obj.trainTime;
          }*/
//        alert(new Date(parseInt(obj.trainTime)+parseInt(obj.beginTime)).format("yyyy-MM-dd hh:mm:ss"));
      },
      initData(){
        console.info("train页面的code"+this.appCode);
        Indicator.open({
          text: "加载中,请稍后",
          spinnerType: 'snake'
        });
//      let result = {"pager":{"pageIndex":1,"pageSize":100,"pageCount":1,"recordCount":1,"sizeOfCurrentPage":0,"indexOfFirstItemOfCurrentPage":0,"prePageIndex":1,"nextPageIndex":1},"data":[{"trainId":"c76bd0dfcb4f4b9abd82334a51f920ce","trainCode":"00000010","trainName":"是的方法","areaCode":"北京市,东城区,","trainAddress":"发生发","trainTime":1495555200000,"beginTime":9900000,"endTime":10200000,"accommodate":34,"createUser":"1","createDate":1495507546000,"updateUser":"1","updateDate":1495541808000}]};
//      this.trainList = result.data;
        let params ={};
        api.pageTrainDataAddress(params).then((response) => {
          if(response.data.head.errorCode=='0'){
          Indicator.close();
          this.userInfo = response.data.body.extMap.userInfo;
          this.trainList =  response.data.body.body.data;
        }else if(response.data.head.errorCode=="010121"){
          Indicator.close();
          Toast("请先登录");
        }else if(response.data.head.errorCode=="2"){//未绑定企业
          Indicator.close();
          Toast(response.data.head.errorMsg);
          this.$router.push({path:'/bind'});
        }
        else{
          Indicator.close();
          Toast(response.data.head.errorMsg);
        }
      }).catch((response) => {
          Indicator.close();
        Toast("访问超时");
      });
      },
      sureAdd(){
        if(!this.userInfo.userName){
          Toast( "用户信息不全！");
          return ;
        }
        if(!this.selected){
          Toast( "请选择一个培训地址");
          return ;
        }
        if(!this.appCode){
          Toast( "appCode为空");
          return ;
        }
        Indicator.open({
          text: "加载中,请稍后",
          spinnerType: 'snake'
        });
        this.selected.appCode = this.appCode;
        let params =this.selected;
        let that = this;
        api.enrollTrain(params).then((response) => {
          if(response.data.head.errorCode=='0'){
          Indicator.close();
          MessageBox.alert('<div style="text-align: left">你已成功报名:<br>主题：'+that.selected.trainName+'<br>时间：'+that.selected.beginDateStr+'<br>地点：'+that.selected.fullTrainAddress+'</div>','报名成功').then(action => {
            that.$router.push('/icon');
          });
        }else{
          Indicator.close();
          Toast( response.data.head.errorMsg);
        }
      }).catch((response) => {
          Indicator.close();
          Toast("访问超时");
      });
      }
    },
    watch: {
      '$route': 'initData'
    },
    mounted() {
      this.initData();
    }
  }

</script>

<style>
  ._selectMyself{
    width: 14.5rem;
    border-radius: 0.4rem;
  }
  .train_address{
  display:block;
  min-height:2rem;
  }
</style>
