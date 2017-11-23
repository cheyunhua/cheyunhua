<template>
  <div>
    <div v-if="noCustomers">
      <black-customer></black-customer>
    </div>
    <div v-if="!noCustomers">
    <header class="fx-header">
		<div class="fx-header-text col-xs-12">
			<div class="fx-left col-xs-6" style="padding: 0;padding-left: 1rem;">
				<p v-on:click="showCustomers()">{{selectCustomerName}}&nbsp;<i :class="customerActions.length>1?'fa fa-angle-bottom2':''"  style="    font-size: 20px;"></i></p>
				<mt-popup v-model="customerVisible" position="right" class="mint-popup-3" modal="false">
					 <!--<vCustomer v-on:cancelCustomers="cancelCustomers" v-on:selectCustomer="selectCustomer"></vCustomer>-->
          <customer v-on:cancelCustomers="cancelCustomers" v-on:selectCustomer="selectCustomer" :customerActions="customerActions"></customer>
        </mt-popup>
			</div>
			<div class="fx-right col-xs-6">
          <div class="fx-text" @click="selectFactory" style="width: 8.0rem;">
             <router-link :to="{path:'factory', query:{selectStoreDeptCode: selectStoreDeptCode,selectCustomerCode:selectCustomerCode}}">{{selectStoreDeptName}}</router-link>
          </div>
          <i class="fa fa-headphones" v-on:click="goToImcc()"></i>
          <router-link :to="{path:'map', query:{address: selectStoreAddress}}"><i class="fa fa-map-marker" @click="storeMap"></i></router-link>
          </div>
		</div>
	</header>
	<div class="fx-wrapper " v-if="!noService">
		<div class="fx-style fx-white" >
			<div class="fx-style-header" >
				<div class="row">
					<div class="col-xs-6" v-on:click="showService = true">{{selectServiceName}}<i class="fa fa-angle-bottom" @click="selectCusservice"></i></div>
          <mt-popup v-model="showService" position="right" class="mint-popup-3" modal="false">
            <cusservice v-on:cancelService="cancelService" v-on:selectService="selectService"  v-bind:serviceActions="serviceActions" ></cusservice>
          </mt-popup>
					<div class="col-xs-6" v-on:click="openPicker">{{selectAccountDate}}<i class="fa fa-angle-bottom"></i></div>
				</div>
			</div>
			<div class="fx-style-num" >
				<div class="row">
					<div class="col-xs-4" v-for="item in items" :class="[{'fc-background':currentItem.tab==item.tab}]">
						<img :src="item.statusImage" style="width: 74px;height: 74px;"
						 v-on:click="changeTab(item)"/>
						<p style="margin-top: -8px;">{{item.itemName}}</p>
					</div>
				</div>
			</div>
		</div>
    <div v-if="!noTask" style="    margin-top: 0px;">
       <!--取单-->
      <indent v-if="currentItem.tab=='take'" :selectCustomerCode="selectCustomerCode" :selecttxm="selecttxm" :currentItem="currentItem" :flagType="0"></indent>
      <!--记账-->
      <tally v-if="currentItem.tab=='account'" :selectCustomerCode="selectCustomerCode" :selectAccountDate="selectAccountDate"   :selectAccountId="selectAccountId" :selectServiceCode="selectServiceCode" :selectAccountSysCode="selectAccountSysCode" :currentItem="currentItem"></tally>
      <!--报税-->
      <dutiable v-if="currentItem.tab=='tax'" :selectCustomerCode="selectCustomerCode" :selectAccountDate="selectAccountDate" :selectAccountId="selectAccountId" :selectAccountSysCode="selectAccountSysCode" :currentItem="currentItem"></dutiable>
    </div>
	</div>
    <div v-if="noService" >
      <black-service ></black-service>
    </div>
    <div v-if="noTask" >
      <black-task ></black-task>
    </div>
    <mt-datetime-picker
      ref="picker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="selectPicker"
      v-model="pickerValue">
    </mt-datetime-picker>
	<!--<mt-actionsheet :actions="serviceActions" v-model="showService"></mt-actionsheet>-->
    </div>
  </div>

</template>
<script>
import { DatetimePicker } from 'mint-ui';
import api from '../../api/';
import config from 'src/api/config'
import _track from '../../api/track';
import status01mage from '../../assets/images/overview/state_01.png';
import status02mage from '../../assets/images/overview/state_02.png';
import status03mage from '../../assets/images/overview/state_03.png';
import dutiable from './dutiable';
import indent from './indent';
import tally from './tally';
import cusservice from './cusservice';
import customer from './customer';
import blackCustomer from './black_customer';
import blackService from './black_service';
import blackTask from './black_task';
import { Toast,Indicator  } from 'mint-ui';
const WX_USER_CUSTSTORELIST = 'wx.user.custStoreList';//企业-门店
const WX_USER_ID = 'wx.user.id';//用户id
const localStorage = global.localStorage;

export default {
	name:"overview-head",
	components: {
      dutiable,
      indent,
      tally,
      cusservice,
      customer,
      blackCustomer,
      blackService,
      blackTask,
    },
	data(){
		return {
      //任务列表
			items:[],
      //当前选中的任务
			currentItem:{},
      //客户单选框是否显示
			customerVisible:false,
      //一个客户都没有 要显示空白页 的控制开关
      noCustomers:false,
      //一个服务都没有 要显示空白页 的控制开关
      noService:false,
      //一个任务都没有 要显示空白页 的控制开关
      noTask:false,
      //服务单选框是否显示
			showService:false,
      //被选中的客户名
      selectCustomerName:null,
      //被选中的客户id
      selectCustomerCode:null,
      //被选中的门店id
      selectStoreDeptCode:null,
      //被选中的门店名称
      selectStoreDeptName:null,
      //vip易号码
      selectVipManagerEncode:null,
      //被选中的门店地址
      selectStoreAddress:null,
      //被选中的条形码
      selecttxm:null,
      //被选中的服务名
      selectServiceName:null,
      //被选中的服务编号
      selectServiceCode:null,
      //被选中的帐套id
      selectAccountId:null,
      //帐套系统识别码 区分帐套来源
      selectAccountSysCode:null,
      //被选中的日期
      selectAccountDate:null,
      // 时间控件
      pickerValue:'',
      //埋点：门店名字
      deptName:null,
      //单选框服务数据填充
      serviceActions:[],
      //单选框客户数据填充
      customerActions:[],
		}
	},
	created(){
  },
	methods:{
    selectCusservice(){
      //埋点：点击切换服务弹出按钮时
//      _track._trackEvent("JCDZ_WX","概览-选择服务",this.selectServiceName+"-"+this.selectAccountDate);
    },
    selectFactory(){
      //埋点：点击服务门店时
      _track._trackEvent("JCDZ_WX","概览-查看服务门店",this.deptName,"");
    },
    storeMap(){
      _track._trackEvent("JCDZ_WX","概览-查看门店地图",this.deptName,"");
    },
    //客服沟通
    goToImcc(){
      try{
        var params={};
        params.code=localStorage.getItem('wx.user.session');
        params.vipEncode=this.selectVipManagerEncode;
        params.custEncode=localStorage.getItem('wx.user.encode');

        /*if(params.vipEncode==null||params.vipEncode==undefined||params.vipEncode==''){
          Toast("vip客户经理不存在，不能进行在线沟通");
          return;
        }*/


        window.location.href=config.encodeUrl+'?eno='+params.custEncode;
        /*api.accessImcc(params).then((response) => {
          if(response.data.head.errorCode=='0'){
          Toast("在线沟通已接通");
          WeixinJSBridge.call('closeWindow');
        }
      });*/


      }catch(e){
        console.log("人工客服报错");
      }
    },
    openPicker() {
      this.$refs.picker.open();
    },
    selectPicker(date){
      Indicator.open({
        text: "加载中,请稍后",
        spinnerType: 'snake'
      });
      var year = date.getFullYear();
      var month =(date.getMonth() + 1).toString();
      if (month.length == 1) {
        month = "0" + month;
      }
      var dateTime = year + month ;
      this.selectAccountDate = dateTime;
      var params={};
      params.cusId=this.selectCustomerCode;
      params.accountMonth=this.selectAccountDate;
      params.serviceCode=this.selectServiceCode;
      this.loadData(params);
      //埋点:	点击切换时间时，记录事件信息
      _track._trackEvent("JCDZ_WX","概览-选择时间",this.selectServiceName+"-"+this.selectAccountDate);
    },
    //改变任务tab页
		changeTab(item){
			this.currentItem = item;
			//埋点
			if(item.tab=='take'){
        _track._trackEvent("JCDZ_WX","概览-收单",localStorage.getItem("wx.user.userPhone"),"");
      };
      if(item.tab=='account'){
        _track._trackEvent("JCDZ_WX","概览-记账",localStorage.getItem("wx.user.userPhone"),"");
      };
      if(item.tab=='tax'){
        _track._trackEvent("JCDZ_WX","概览-报税",localStorage.getItem("wx.user.userPhone"),"");
      };
		},
    //展示 客户单选框方法
		showCustomers(){
      if(this.customerActions.length>1){
        this.customerVisible=true;
        //埋点：客户点击公司选择按钮的时候
        _track._trackEvent("JCDZ_WX","概览-选择公司",localStorage.getItem("wx.user.userPhone"),"");
      }
		},
    //关闭 客户单选框
		cancelCustomers(customerVisible){
			this.customerVisible = customerVisible;
		},
    // 勾选 客户单选框
		selectCustomer(obj){
      Indicator.open({
        text: "加载中,请稍后",
        spinnerType: 'snake'
      });
      this.serviceActions=[];
      this.selectServiceName=null;
      this.selectServiceCode=null;
      this.selectAccountDate=null;
      //客户选中之后 数据填充customer页面
      if(obj!=null){
        this.selectCustomerName=obj.customerName;
        this.selectCustomerName=  this.selectCustomerName!=undefined?(this.selectCustomerName.length>7?this.selectCustomerName.substring(0,7)+"...":this.selectCustomerName):"";
        this.selectCustomerCode=obj.customerCode;
        this.selectStoreDeptName=obj.storeDeptName;
        this.deptName=obj.storeDeptName;
        this.selectStoreDeptCode=obj.storeDeptId;
        this.selectStoreDeptName=  this.selectStoreDeptName!=undefined?(this.selectStoreDeptName.length>4?this.selectStoreDeptName.substring(0,4)+"...":this.selectStoreDeptName):"";
        this.selectStoreAddress=obj.storeAddress;
        this.selectVipManagerEncode=obj.vipManagerEncode;

      }
      //选中客户时 触发待办信息同步
//      this.$store.dispatch('changeCustomer',this.selectCustomerCode);
      this.$emit('changeCusId', (this.selectCustomerCode) );
      localStorage.setItem("his_customer", this.selectCustomerCode);
      var params={};
      params.cusId=obj.customerCode;
      this.loadData(params);
		},
    //勾选  服务单选框
		selectService(obj){
      Indicator.open({
        text: "加载中,请稍后",
        spinnerType: 'snake'
      });
        this.selectServiceName = obj.serviceName;
      //埋点：确认服务时
      _track._trackEvent("JCDZ_WX","概览-切换服务",this.selectServiceName+"-"+this.selectAccountDate);
      //对选中的服务做数据查询
      var params={};
      params.cusId=this.selectCustomerCode;
      params.serviceCode=obj.serviceCode;
      params.accountMonth=this.selectAccountDate;
      this.loadData(params);
		},
    //关闭 服务单选框
    cancelService(showService){
      this.showService = showService;
    },
    //加载服务、任务
    loadData(params){
      //清空旧数据
      this.items = [];
     // this.selecttxm = null;
//    params.serviceCode="jzbs";
//    params.accountMonth="201701";
      var that = this;
      //埋点
//      _track._trackEvent("JCDZ_WX","客户产品服务任务数据查询",JSON.stringify(params));
      api.queryCusServiceLists(params).then((response) => {
        if(response.data != null){
        if (response.data.head.errorCode === "0") {
        //debugger;
          var resultBean = response.data;
          //start -------------根据选择的客户加载条形码----------
            if(resultBean.body.fileCoding){
              that.selecttxm = resultBean.body.fileCoding;
            }else{
              that.selecttxm = null;
            }
          //end  -------------根据选择的客户加载条形码----------
          //start -------------服务列表数据加载------------------
            if (resultBean.body.serviceList != null && resultBean.body.serviceList.length > 0) {
              var serviceList = resultBean.body.serviceList;
              var serviceActionsList = [];
              for (var i = 0; i < serviceList.length; i++) {
//                if (i === 0) {//默认取第一个服务
                if (serviceList[i].serviceCode!=null&&(serviceList[i].serviceCode === 'account'|| serviceList[i].serviceCode === 'factoryAcc' )) {//目前只有记账报税服务和邮寄工厂可操作
                  that.noService = false;
                  that.selectServiceName = serviceList[i].serviceName;
                  that.selectServiceCode = serviceList[i].serviceCode;
                  that.selectAccountDate = resultBean.body.accountMonth;
                  that.selectAccountId = resultBean.body.accountId;//帐套ID
                  that.selectAccountSysCode = resultBean.body.accountSysCode;//帐套系统识别码 区分帐套来源
                  var serviceActionsMap = {};
                  serviceActionsMap.label = serviceList[i].serviceName;
                  serviceActionsMap.value = serviceList[i].serviceCode;
                  serviceActionsList.push(serviceActionsMap);
                }
                /*var serviceActionsMap = {};
                serviceActionsMap.label = serviceList[i].serviceName;
                serviceActionsMap.value = serviceList[i].serviceCode;
                serviceActionsList.push(serviceActionsMap);*/
              }
              that.serviceActions = serviceActionsList;
            } else {//如果查询不到服务就跳转空白页面
              if (params != null && params.serviceCode != null && params.serviceCode.length > 0) {
              } else {
                that.noService = true;
                //document.title = "概览";
              }
            }
            //end -------------服务列表数据加载------------------
            //start------------任务列表数据加载------------------
            if (resultBean.body.taskList != null && resultBean.body.taskList.length > 0) {
              that.noTask = false;
              var taskListResult = resultBean.body.taskList;
              for (var i = 0; i < taskListResult.length; i++) {
             // debugger;
                var taskMap = {};
                taskMap.tab = taskListResult[i].taskCode;
                taskMap.itemName = taskListResult[i].taskName;
                taskMap.order = taskListResult[i].number;
                taskMap.statu = taskListResult[i].transactState;
                // stuat 0 -完成 ##### 1 -进行中 #####     2 -未开始
                if (taskListResult[i].transactState === "1") {
                  taskMap.statusImage = status03mage;
                }
                if (taskListResult[i].transactState === "2") {
                  taskMap.statusImage = status01mage;
                }
                if (taskListResult[i].transactState === "0") {
                  taskMap.statusImage = status02mage;
                }
                that.items.push(taskMap);
              }
              that.currentItem = that.items[0];
            } else {//如果查询不到任务就跳转空白页面
              if(that.noService === false){//如果已经没服务了 就不同再弹出 没任务的空白页面了
                that.noTask = true;
              }
              //document.title = "概览";
            }
            //end--------------任务列表数据加载------------------
          } else {//如果数据返回不正确就跳转空白页面
            Toast(response.data.head.errorMsg)
            that.noService = true;
            document.title = "概览";
          }
        }
      Indicator.close();
      });
    },
    //加载公司、客户
    loadCustomer(){
      if(localStorage.getItem(WX_USER_CUSTSTORELIST)!=null&&localStorage.getItem(WX_USER_CUSTSTORELIST)!=""){
        var custStoreList = eval("("+localStorage.getItem(WX_USER_CUSTSTORELIST)+")");
        for(var i=0;i<custStoreList.length;i++){
          var custStoreMap ={};
          custStoreMap.label= custStoreList[i].custName;
          custStoreMap.value= custStoreList[i].custId;
          custStoreMap.storeDeptId= custStoreList[i].storeDeptId;
          custStoreMap.storeDeptName= custStoreList[i].storeDeptName;
          custStoreMap.storeAddress= custStoreList[i].storeAddress;
          custStoreMap.vipManagerEncode= custStoreList[i].vipManagerEncode;
          this.customerActions.push(custStoreMap);
        }
        //上次登录时 浏览过的企业
        let his_customer = localStorage.getItem("his_customer");
        for(var i=0;i<this.customerActions.length;i++){
          if(his_customer==null||his_customer.length<1){
            if(i===0){
              this.selectCustomerName =  this.customerActions[0].label;
              this.selectCustomerName=  this.selectCustomerName!=undefined?(this.selectCustomerName.length>7?this.selectCustomerName.substring(0,7)+"...":this.selectCustomerName):"";
              this.selectCustomerCode =  this.customerActions[0].value;
              this.selectStoreDeptCode =  this.customerActions[0].storeDeptId;
              this.deptName=this.customerActions[0].storeDeptName;
              this.selectStoreDeptName =  this.customerActions[0].storeDeptName;
              this.selectStoreDeptName=  this.selectStoreDeptName!=undefined?(this.selectStoreDeptName.length>4?this.selectStoreDeptName.substring(0,4)+"...":this.selectStoreDeptName):"";
              this.selectStoreAddress =  this.customerActions[0].storeAddress;
              this.selectVipManagerEncode =  this.customerActions[0].vipManagerEncode;
              localStorage.setItem("his_customer", this.selectCustomerCode);
              this.$emit('changeCusId', (this.selectCustomerCode) );
              //埋点：自动登录是记录公司信息
             _track._track_setCompany(this.customerActions[0].value,this.customerActions[0].label);
            }
          }else{//如果有客户记录就填充该客户信息
            if(his_customer===this.customerActions[i].value){
              this.selectCustomerName =  this.customerActions[i].label;
              this.selectCustomerName=  this.selectCustomerName!=undefined?(this.selectCustomerName.length>7?this.selectCustomerName.substring(0,7)+"...":this.selectCustomerName):"";
              this.selectCustomerCode =  this.customerActions[i].value;
              this.selectStoreDeptCode =  this.customerActions[i].storeDeptId;
              this.selectStoreDeptName =  this.customerActions[i].storeDeptName;
              this.deptName=this.customerActions[i].storeDeptName;
              this.selectStoreDeptName=  this.selectStoreDeptName!=undefined?(this.selectStoreDeptName.length>4?this.selectStoreDeptName.substring(0,4)+"...":this.selectStoreDeptName):"";
              this.selectStoreAddress =  this.customerActions[i].storeAddress;
              this.selectVipManagerEncode =  this.customerActions[i].vipManagerEncode;
              localStorage.setItem("his_customer", this.selectCustomerCode);
              this.$emit('changeCusId', (this.selectCustomerCode) );
              //埋点：加载页面后记录公司的信息
              _track._track_setCompany(this.customerActions[i].value,this.customerActions[i].label);
            }else{
              if(this.selectCustomerCode==null){
                this.selectCustomerName =  this.customerActions[0].label;
                this.selectCustomerName=  this.selectCustomerName!=undefined?(this.selectCustomerName.length>7?this.selectCustomerName.substring(0,7)+"...":this.selectCustomerName):"";
                this.selectCustomerCode =  this.customerActions[0].value;
                this.selectStoreDeptCode =  this.customerActions[0].storeDeptId;
                this.deptName=this.customerActions[0].storeDeptName;
                this.selectStoreDeptName =  this.customerActions[0].storeDeptName;
                this.selectStoreDeptName=  this.selectStoreDeptName!=undefined?(this.selectStoreDeptName.length>4?this.selectStoreDeptName.substring(0,4)+"...":this.selectStoreDeptName):"";
                this.selectStoreAddress =  this.customerActions[0].storeAddress;
                this.selectVipManagerEncode =  this.customerActions[0].vipManagerEncode;
                localStorage.setItem("his_customer", this.selectCustomerCode);
                this.$emit('changeCusId', (this.selectCustomerCode) );
                //埋点：加载页面后记录公司的信息
                _track._track_setCompany(this.customerActions[0].value,this.customerActions[0].label);
                }
            }

          }
        }
      }else{
        document.title="概览";
        this.noCustomers = true;
      }
      //  ---------测试数据--------start------
      /*let his_customer = localStorage.getItem("his_customer");
      this.customerActions=[
        {"label":"方欣科技有限公司1" ,"value":"37dc54af74c1424a8f362c0731a36063","storeDeptId":"f266a49d39f0453f925ddaa304328c65","storeDeptName":"测试门店的身份3424撒旦法234","storeAddress":"广州创新大厦"},
//        {"label":"方欣科技有限公司2" ,"value":"33c48a5109ec41f8aad1ed4648cd936b","storeDeptId":"f266a49d39f0453f925ddaa304328c65","storeDeptName":"测试门店三大法撒法","storeAddress":"文昌雅居"},
//        {"label":"方欣科技有限公司3" ,"value":"37dc54af74c1424a8f362c0731a360635","storeDeptId":"f266a49d39f0453f925ddaa304328c65","storeDeptName":"测试门店撒旦法","storeAddress":"棠德花苑"}
      ]
       for(var i=0;i<this.customerActions.length;i++){
         if(his_customer==null||his_customer.length<1) {
           if (i === 0) {
             this.selectCustomerName = this.customerActions[0].label;
             this.selectCustomerName = this.selectCustomerName != undefined ? (this.selectCustomerName.length > 7 ? this.selectCustomerName.substring(0, 7) + "..." : this.selectCustomerName) : "";
             this.selectCustomerCode = this.customerActions[0].value;
             this.selectStoreDeptCode = this.customerActions[0].storeDeptId;
             this.selectStoreDeptName = this.customerActions[0].storeDeptName;
             this.selectStoreDeptName = this.selectStoreDeptName != undefined ? (this.selectStoreDeptName.length > 5 ? this.selectStoreDeptName.substring(0, 5) + "..." : this.selectStoreDeptName) : "";
             this.selectStoreAddress = this.customerActions[0].storeAddress;
             localStorage.setItem("his_customer", this.selectCustomerCode);
             //埋点
             _track._track_setCompany(this.customerActions[0].value, this.customerActions[0].label);
           }
         }else{
           if(his_customer===this.customerActions[i].value){
             this.selectCustomerName =  this.customerActions[i].label;
             this.selectCustomerName=  this.selectCustomerName!=undefined?(this.selectCustomerName.length>7?this.selectCustomerName.substring(0,7)+"...":this.selectCustomerName):"";
             this.selectCustomerCode =  this.customerActions[i].value;
             this.selectStoreDeptCode =  this.customerActions[i].storeDeptId;
             this.selectStoreDeptName =  this.customerActions[i].storeDeptName;
             this.selectStoreDeptName=  this.selectStoreDeptName!=undefined?(this.selectStoreDeptName.length>5?this.selectStoreDeptName.substring(0,5)+"...":this.selectStoreDeptName):"";
             this.selectStoreAddress =  this.customerActions[i].storeAddress;
             localStorage.setItem("his_customer", this.selectCustomerCode);
             //埋点
             _track._track_setCompany(this.customerActions[i].value, this.customerActions[i].label);
           }else{
             if(this.selectCustomerCode==null){
               this.selectCustomerName = this.customerActions[0].label;
               this.selectCustomerName = this.selectCustomerName != undefined ? (this.selectCustomerName.length > 7 ? this.selectCustomerName.substring(0, 7) + "..." : this.selectCustomerName) : "";
               this.selectCustomerCode = this.customerActions[0].value;
               this.selectStoreDeptCode = this.customerActions[0].storeDeptId;
               this.selectStoreDeptName = this.customerActions[0].storeDeptName;
               this.selectStoreDeptName = this.selectStoreDeptName != undefined ? (this.selectStoreDeptName.length > 5 ? this.selectStoreDeptName.substring(0, 5) + "..." : this.selectStoreDeptName) : "";
               this.selectStoreAddress = this.customerActions[0].storeAddress;
               localStorage.setItem("his_customer", this.selectCustomerCode);
               //埋点
               _track._track_setCompany(this.customerActions[0].value, this.customerActions[0].label);
             }
           }

         }
       }*/
      //  ---------测试数据--------end------
    },
    initData(){
      console.log("初始化数据中！！！");
      //初始化公司列表
      this.loadCustomer();
      var params={};
      params.cusId=this.selectCustomerCode;
      //加载服务、任务数据
      this.loadData(params);
      //初始化 时间控件  当前时间
      this.pickerValue = new Date();
    }
	},
	mounted() {
    this.initData();
  }
};
</script>
<style scoped>
  div.mint-popup-3 {
    width: 100%;
    height: 100%;
    border-radius: 0px;
    margin:0;
}
  a {
    color: #FFFFFF;
    text-decoration: none
  }
  .fa-angle-bottom2:before{
    content: "\F107";
    color: #FFFFFF;
  }
  .fa-angle-bottom2{
    content: "\F107";
    color: #FFFFFF;
  }
  .fx-right i{
    margin-right:0;
  }
  .fx-right .fa-headphones{

    margin-left:2rem;
    margin-right:1.4rem;
  }
.fx-right{
    padding: 0;
  }
  .fx-header-text{
    padding:0;
  }
  .fx-left{
    left:0;
    text-align: left;
  }
  .fa-headphones{
    position: absolute;
    right:2.2rem;
  }
  .fa-map-marker{
    position: absolute;
    right:1.2rem;
  }
  .fx-text{
    position: absolute;
    right:7.2rem;
  }
</style>
