<template>
    <div>
        <!--登录头
        <div class="login_head" v-show="!login">
             <div class="head_left">
                 <div class="head_leftBody">
                     <i class="iconfont icon-weibiaoti101 big_icon" style="font-size: 2em;color: #969696"></i>
                 </div>
             </div>
             <div class="head_right">
                 <div class="head_rightBody" v-on:click="gotologin()">
                     {{loginText}}
                 </div>
             </div>

             <div class="head_right_new">
             </div>

         </div>
         -->

        <!--登录人相关信息-->
        <div class="login_head" style="background-color: #FC8968">
            <div class="head_left">
                <div class="head_leftBody" :style="{backgroundImage: 'url(' + headImgUrl + ')'}">
                    <!--<img :src="headImgUrl" width="35px" height="35px"/>-->
                </div>
            </div>
            <!--登录按钮-->
            <div class="head_right">
                <div style="color: #ffffff;font-size:12px;">
                    <div>{{userName}}</div>
                    <div>{{userMobilePhone}}</div>
                </div>
            </div>

            <!--消息

            <div class="head_right_new">
                <div style="position: relative;">
                    <img src="../../assets/images/common/xx_03.png" alt="" style="width: 3em;height:3em;"/>
                    <div class="wait-new" v-if="waitNew>0">{{waitNew}}</div>
                </div>

            </div>
            -->


        </div>

        <!--选择公司
        <div class="choose-business-title">
            <div class="choose-business-icon"></div>
            <label class="choose-business-label"
                   style="padding-top:0.6em;padding-left: 0.5em;float: left;font-size: 0.9em;">已选择公司</label>
        </div>
        <div class="item-choose-business" v-show="login"  @click="openCompanyNameAgent">
            <div class="choose-business-left">
                <div class="choose-business-name" ><i class="fa fa-home"
                    style="font-size: 1.3em;color: #FF7043;margin-left: 1em;margin-right: .7em;"></i>{{custName}}
                </div>
            </div>
            <div class="choose-business-right">
                <i class="fa fa-angle-right"
                   style="font-size: 20px;margin-top: 0.8em;margin-right: .6em;float: right;"></i>
            </div>
        </div>
        <div class="item-choose-business" v-show="!login">
            <p style="font-size:0.9em;padding-top: 1.1em;padding-left: 2em;">未选择任何公司（请先登录）</p>
        </div>
    -->

        <!--订单-->
        <div class="order">
            <div class="order-body" >
                <div class="order-left"></div>
                <div class="order-leftText">{{myOrder}}</div>
                <div class="order-right" @click="gotoOrder('all')">
                    {{showAllOrder}} <span><i class="fa fa-angle-right"></i> </span></div>
            </div>
            <!--订单图标按钮组-->
            <div class="order-buttonGroup">
                <div class="buttonGroup" style="position: relative" @click="gotoOrder('waitPay')">
                    <i class="iconfont" style="font-size: 1.8em;color: #969696">&#xe861;</i>
                    <div class="fontSzie12">{{waitPay}}</div>
                    <div class="waitpay-new" v-if="waitPayNew>0">
                        {{waitPayNew}}
                    </div>
                </div>
                <div class="buttonGroup" @click="gotoOrder('waitDeal')">
                    <i class="iconfont icon-daiban2" style="font-size: 1.8em;color: #969696"></i>
                    <div class="fontSzie12">{{waitDeal}}</div>
                </div>

                <div class="buttonGroup"  @click="gotoOrder('inService')">
                    <i class="iconfont icon-taizhangjilu" style="font-size: 1.8em;color: #969696"></i>
                    <div class="fontSzie12">{{inService}}</div>
                </div>
                <div class="buttonGroup" @click="gotoOrder('complete')">
                    <i class="iconfont icon-yiwancheng11" style="font-size: 1.8em;color: #969696"></i>
                    <div class="fontSzie12">{{complete}}</div>
                </div>
                <div class="buttonGroup" @click="gotoOrder('canceled')">
                    <i class="iconfont" style="font-size: 1.8em;color: #969696">&#xe71a;</i>
                    <div class="fontSzie12">{{canceled}}</div>
                </div>
            </div>
        </div>

        <!--按钮组-->
        <!--
                    <div class="buttonGroup-head" style="position: relative" @click="gotomyhandle()" v-show="login">
                        <div class="todo-new" v-if="todoNew>0">
                            {{todoNew}}
                        </div>
                        &lt;!&ndash;  <i class="iconfont icon-daiban"
                             style="font-size: 1.5em;color: #FC8968;float: left;margin-top: 6px;"></i>&ndash;&gt;

                        <i class="iconfont" style="font-size: 1.5em;color: #e51c23;float: left;margin-top: 6px;">&#xe637;</i>

                        <div class="buttonGroup-left">{{waitWork}}</div>
                        <div class="buttonGroup-right"><i class="fa fa-angle-right" style="font-size: 20px;"></i>
                        </div>
                    </div>

                <div class="buttonGroup-head" style="position: relative" v-show="!login">
                    <i class="iconfont" style="font-size: 1.5em;color: #969696;float: left;margin-top: 6px;">&#xe637;</i>
                    &lt;!&ndash; <i class="iconfont icon-daiban" style="font-size: 1.5em;color: #969696;float: left;margin-top: 6px;"></i>&ndash;&gt;
                    <div class="buttonGroup-left">{{waitWork}}</div>
                    <div class="buttonGroup-right"><i class="fa fa-angle-right" style="font-size: 20px;"></i>
                    </div>
                </div>


                <div class="buttonGroup-middle">
                    <div class="middle-head" @click="goMyProgress">
                        &lt;!&ndash;  <i class="iconfont icon-jinduchaxun"
                             style="font-size: 1.5em;color: #969696;float: left;margin-top: 6px;"
                             v-show="!login"></i>&ndash;&gt;
                        <i class="iconfont" style="font-size: 1.5em;color: #969696;float: left;margin-top: 6px;"
                           v-show="!login">&#xe652;</i>

                        <i class="iconfont" style="font-size: 1.5em;color: #259b24;float: left;margin-top: 6px;" v-show="login">&#xe652;</i>
                        &lt;!&ndash;
                             <i class="iconfont icon-jinduchaxun"
                              style="font-size: 1.5em;color: #E51C23;float: left;margin-top: 6px;"
                              v-show="login"></i>&ndash;&gt;
                        <div class="buttonGroup-left">{{myWorking}}</div>
                        <div class="buttonGroup-right"><i class="fa fa-angle-right"
                                                          style="font-size: 20px;"></i></div>
                    </div>
                    <div class="middle-head">

                        <i class="iconfont" style="font-size: 1.5em;color: #969696;float: left;margin-top: 6px;"
                           v-show="!login">&#xe667;</i>
                        &lt;!&ndash;
                                  <i class="iconfont icon-baobiao" style="font-size: 1.5em;color: #969696;float: left;margin-top: 6px;"
                                   v-show="!login"></i>&ndash;&gt;
                        <i class="iconfont icon-zdylogobaobiao" style="font-size: 1.5em;color: #ff7045;float: left;margin-top: 6px;" v-show="login"></i>

                        <div class="buttonGroup-left">{{reportCompany}}</div>
                        <div class="buttonGroup-right"><i class="fa fa-angle-right"
                                                          style="font-size: 20px;"></i></div>
                    </div>
                    <div class="middle-head">
                        <i class="iconfont" style="font-size: 1.5em;color: #969696;float: left;margin-top: 6px;"
                           v-show="!login">&#xe726;</i>

                        <i class="iconfont" style="font-size: 1.5em;color: #5677fc;float: left;margin-top: 6px;" v-show="login">&#xe726;</i>

                        <div class="buttonGroup-left">{{infoCompany}}</div>
                        <div class="buttonGroup-right"><i class="fa fa-angle-right"
                                                          style="font-size: 20px;"></i></div>
                    </div>

                </div>-->

        <!-- <div style="margin: 1em 0;height: 3em;background-color: #ffffff;padding-left: 1em;" v-on:click="gotosetting()">
             <i class="iconfont icon-shezhi" style="font-size: 1.5em;color: #969696;float: left;margin-top: 6px;"
                v-show="!login"></i>
             <i class="iconfont icon-shezhi" style="font-size: 1.5em;color: #FF7045;float: left;margin-top: 6px;"
                v-show="login"></i>
             <div class="buttonGroup-left">{{setting}}</div>
             <div class="buttonGroup-right"><i class="fa fa-angle-right"
                                               style="font-size: 20px;"></i></div>
         </div>-->


       <!-- <div style="margin: 1em 0;height: 3em;background-color: #ffffff;padding-left: 1em;" v-on:click="gotomyinfo()">

            <i class="iconfont icon-msnui-person-info" style="font-size: 1.5em;color: #FF7045;float: left;margin-top: 6px;"></i>
            <div class="buttonGroup-left">个人信息</div>
            <div class="buttonGroup-right"><i class="fa fa-angle-right"
                                              style="font-size: 20px;"></i></div>
        </div>-->

        <div style="margin: 1em 0;height: 3em;background-color: #ffffff;padding-left: 1em;" v-on:click="gotomycustomerlist()">

            <i class="iconfont icon-qiye1" style="font-size: 1.5em;color: #FF7045;float: left;margin-top: 6px;"></i>
            <div class="buttonGroup-left">企业信息</div>
            <div class="buttonGroup-right"><i class="fa fa-angle-right"
                                              style="font-size: 20px;"></i></div>
        </div>

        <div style="margin: 1em 0;height: 3em;background-color: #ffffff;padding-left: 1em;" v-on:click="routeTo('userDetail')">

            <i class="iconfont icon-msnui-person-info" style="font-size: 1.5em;color: #FF7045;float: left;margin-top: 6px;"></i>
            <div class="buttonGroup-left">个人信息</div>
            <div class="buttonGroup-right"><i class="fa fa-angle-right"
                                              style="font-size: 20px;"></i></div>
        </div>

       <!-- <mt-popup v-model="companyNamePoupVisible" position="right" class="mint-popup-3" modal="false">
            <companyName v-on:closeCompanyNameAgent="closeCompanyNameAgent" v-on:setCustName="setCustName"></companyName>
        </mt-popup>-->


        <!--弹出登录框
        <mt-popup v-model="popupVisible" style="width: 90%;">
          <login-page></login-page>
        </mt-popup>-->

    </div>
</template>
<style>
    .choose-business-title {
        width: 100%;
        height: 2.2em;
    }

    .choose-business-icon {
        float: left;
        width: 0.5em;
        height: 2em;
        margin-top: 0.2em;
        background-color: #FF7043;
    }

    .choose-business-label {
        font-size: 0.8em;
        font-weight: normal;
        color: #A8A8A8;
    }

    .item-choose-business {
        width: 100%;
        height: 3.2em;
        margin-bottom: .5em;
        background-color: #ffffff;
    }

    .choose-business-left {
        height: auto;
        width: 80%;
        float: left;
    }

    .choose-business-right {
        height: auto;
        width: 20%;
        float: left;
    }

    .choose-business-name {
        padding-top: 1em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #707070;
    }

    .login_head {
        margin: 6px 0px;
        height: 5em;
        background-color: #B8B8B8
    }

    .head_left {
        width: 20%;
        height: 5em;
        float: left;
        align-items: center;
        display: -webkit-flex;
        justify-content: center;


    }

    .head_leftBody {
        width: 3em;
        height: 3em;
        z-index: 1;
        border-radius: 50%;
        background-color: #eee;
        background-size: cover;
        background-position: center center;
        filter: none;
    }

    .head_right {
        width: 60%;
        height: 5em;
        float: left;
        align-items: center;
        display: -webkit-flex;
    }

    .head_right_new {
        width: 20%;
        height: 5em;
        float: right;
        align-items: center;
        display: -webkit-flex;
    }

    .head_rightBody {
        margin-left: 1em;
        width: 5em;
        height: 2em;
        border-radius: 4px;
        line-height: 2em;
        border: 1px solid #FF7045;
        color: #FF7045;
        text-align: center;
    }

    .order {
        background-color: #ffffff;
        height: 9em;
        width: 100%;
    }

    .order-body {
        height: 3em;
        border-bottom: 1px solid #E3E3E3;
    }

    .order-left {
        width: .5em;
        height: 3em;
        background-color: #FF7045;
        border-radius: 2px;
        float: left;
    }

    .order-leftText {
        margin-left: 1em;
        display: inline;
        float: left;
        height: 3em;
        line-height: 3em;
    }

    .order-right {
        font-size: 12px;
        float: right;
        height: 45px;
        line-height: 45px;
        margin-right: 1em;
        display: inline;
    }

    .order-buttonGroup {
        float: left;
        height: 6em;
        width: 100%;
        display: -webkit-flex;
        align-items: center;
    }

    .buttonGroup {
        float: left;
        height: auto;
        width: 20%;
        text-align: center;
    }
    .buttonGroup > i {
        margin: 0 0.5em;
    }
    .fontSzie12 {
        width: 100%;
        font-size: 0.8em;
    }

    .buttonGroup-head {
        margin: .5em 0;
        height: 3em;
        background-color: #ffffff;
        padding-left: 1em;
        border-bottom: 1px solid #E3E3E3;
    }

    .buttonGroup-left {
        margin-left: 1em;
        float: left;
        line-height: 3em;
        height: 3em;
    }

    .buttonGroup-right {
        float: right;
        margin-right: 1em;
        line-height: 3em;
        height: 3em
    }

    .buttonGroup-middle {
        height: 9em;
        background-color: #ffffff;
    }

    .middle-head {
        height: 3em;
        border-bottom: 1px solid #E3E3E3;
        padding-left: 1em;
    }

    .todo-new {
        position: absolute;
        top: 10px;
        left: 115px;
        border-radius: 1.2em;
        width: 1.2em;
        height: 1.2em;
        align-items: center;
        display: -webkit-flex;
        justify-content: center;
        border: 1px solid red;
        color: red;
        font-size: 12px;
    }

    .waitpay-new {
        position: absolute;
        top: 1px;
        left: 68%;
        border-radius: 1.2em;
        width: 1.2em;
        height: 1.2em;
        align-items: center;
        display: -webkit-flex;
        justify-content: center;
        border: 1px solid red;
        color: red;
        font-size: 12px;
    }

    .wait-new {
        position: absolute;
        top: 2px;
        left: 40px;
        border-radius: 1.2em;
        width: 1.2em;
        height: 1.2em;
        align-items: center;
        display: -webkit-flex;
        justify-content: center;
        background-color: #ffffff;
        color: red;
        font-size: 12px;
    }

    a:focus, a:hover {
        color: #1f2d3d;
    }

</style>
<script>
    import {mapState} from 'vuex';
    import { Toast } from 'mint-ui';
    import api from '../../api/';
    import _track from '../../api/track';
    import companyName from './company_name.vue'
    import config from '../../api/config'
    const localStorage = global.localStorage;
    const WX_USER_CUST_ID = 'wx.user.cust.id';  //当前custid
    const WX_USER_CUST_NAME = 'wx.user.cust.name';  //当前custname
    const WX_USER_CUSTSTORELIST = 'wx.user.custStoreList';
    const WX_USER_ORDER_SHOW_TYPE = 'wx.user.order.show.type';//订单显示方式
    const WX_USER_PHONE = 'wx.user.userPhone';
    const WX_USER_ID = 'wx.user.id';
    const WX_USER_CODE = 'wx.user.code';
    const WX_USER_WECHAT_CODE = "wx.user.wechat.code";
    const WX_USET_ORDER = 'wx.user.order';
    const WX_SERVICE_USER_INFO='wx.service.user.info';
    const WX_USER_IMG='wx.user.img';
    export default{
        components: {
            companyName
        },
        data(){

            return {
                param: {
                    appCode: '',
                    wechatCode: '',
                    isHasWxInfo: ''
                },
                companyNamePoupVisible: false,
                myProgressPoupVisible: false,
                custName: '',
                loginText: '登录',
                myOrder: '我的订单',
                showAllOrder: '查看所有订单',
                waitPay: '待付款',
                payed: '已付款',
                waitDeal: '待处理',
                inService: '服务中',
                complete: '已完成',
                canceled: '已取消',
                waitWork: '待办事项',
                myWorking: '我购买的服务',
                reportCompany: '我的报表',
                infoCompany: '企业资料',
                setting: '设置',
                todoNew: 0,
                waitPayNew: 0,
                waitNew: 0,
                userName: '',
                userMobilePhone: '',
                headImgUrl:null,
                //popupVisible:false
            }
        },
        computed: mapState({
            login: state => state.account.auth.check(),
            userId: state => state.account.auth.userId,
            loginTime: state => state.account.login.loginTime,
            selectedPage:state => state.account.selected.selectedPage,
            waitOrderCount:state => state.account.order.waitOrderCount
        }),



        watch:{
            loginTime(val){
                console.log('自动登录成功时间'+val);
                this.fetchData();
            },
            selectedPage(val){
              console.log("selectedTab:" + val);
                if(val=='my'){
                    this.fetchData();
                }
            },
            //修改代付款訂單數量
            waitOrderCount(val){
                console.log("我的页面---待付款订单发生改变");
                this.waitPayNew = val;
            }
        },
        methods: {
            setCustName: function () {
                this.custName = localStorage.getItem(WX_USER_CUST_NAME);
                this.loadNoticeList();
                this.loadTodoNewList();
            },
            openCompanyNameAgent: function () {
                this.companyNamePoupVisible = true;
            },
            closeCompanyNameAgent: function () {
                this.companyNamePoupVisible = false;
            },
            goMyProgress: function () {
                if(this.login){
                    this.$router.push('/myProgress');
                }else{
                    Toast('未登录用户不可进行操作，请登录！');
                }
            },
            //订单type: all-全部  waitPay-待付款  waitDeal-待处理  inService-服务中  complete-已完成 canceled-已取消
            gotoOrder: function (type) {
                if(!this.login){
                    Toast('未登录用户不可进行操作，请登录！');
                    return;
                }
                var orderShowType = '';
                switch (type){
                    case 'all' :
                        orderShowType = 'all';
                        break;
                    case 'waitPay' :
                        orderShowType = 'waitPay';
                        break;
                    case 'waitDeal' :
                        orderShowType = 'waitDeal';
                        break;
                    case 'inService' :
                        orderShowType = 'inService';
                        break;
                    case 'complete' :
                        orderShowType = 'complete';
                        break;
                    case 'canceled' :
                        orderShowType = 'canceled';
                        break;
                }
                localStorage.setItem(WX_USER_ORDER_SHOW_TYPE, orderShowType);
                let wechatCode = localStorage.getItem("wx.user.wechat.code");
                this.$router.push('/myorder');
                /*
                let retUrl = "http://"+config.wxUrl+"/auth/wechatCommonService"
                    +"/wechatDomainAuth?menuCode=WAIT_PAY_A&wechatCode="+wechatCode+"&pay=212";
                console.log(retUrl);
                window.location.href = retUrl;
                */

            },
            gotologin() {

                //this.popupVisible = true;
                this.$router.push('/logins');
                console.info("gotologin");

            },
            gotomymessage(){
                if(this.login){
                    this.$router.push('/mymessage');
                }else{
                    Toast('未登录用户不可进行操作，请登录！');
                }
            },
            gotomyhandle(){
                if(this.login){
                    this.$router.push('/myhandle');
                }else{
                    Toast('未登录用户不可进行操作，请登录！');
                }
            },
            gotomyinfo(){

                this.$router.push('/myinfo');
                /*if(this.login){
                 this.$router.push('/setting');
                 }else{
                 Toast('未登录用户不可进行操作，请登录！');
                 }*/
            },
            gotomycustomerlist(){
                this.$router.push('/mycustomerlist');
            },
            loadUserInfo(){

                api.queryUserInfoByUserId({userId: this.userId}).then((response) => {
                    console.log(response.data.head);
                    if (response.data.body) {
                        this.userName = response.data.body.userName;
                        this.userMobilePhone = response.data.body.mobilePhone;
                    }
                });
            },
            //查询个人订单新接口
            loadOrderListFromService(){
                console.log("调用-查询个人订单新接口");
                localStorage.removeItem(WX_USET_ORDER);
                var params = {};
                params.userId = localStorage.getItem(WX_USER_ID);
                //params.userId = '000000000000';
                params.pageSize = '1000';
                params.pageIndex = '1';
                api.queryPersonalOrderPage(params).then((response) => {
                    var orderList = response.data.body.data;
                    if(response.data.head.errorCode == '0'){
                        var waitPayCount = 0;
                        for(var i = 0; i < orderList.length; i ++){
                            if(orderList[i].orderStatus == '0' ){
                                waitPayCount ++;
                            }
                        }
                        this.waitPayNew = waitPayCount;

                        localStorage.setItem(WX_USET_ORDER,orderList==undefined?"":JSON.stringify(orderList));
                    }
                }).catch((response) => {

                });
            },
            loadTodoNewList(){
                var params = {};
                params.userId = this.userId;
//        params.cusId = localStorage.getItem("his_customer");
                //var cusId = '87080f43abe24a25919cbf84d22d4e29';
                var cusId = localStorage.getItem(WX_USER_CUST_ID);
                params.cusId = cusId;
                params.pageIndex = "1";
                params.pageSize = "20";
                params.messageType = "todo";
                api.querywaitHandleLists(params).then((response) => {
                    if (response.data.head.errorCode == '0') {
                        var resultBean = response.data.body;
                        var handleList = resultBean.tasks;
                        console.log('handleList:' + handleList);
                        if (handleList instanceof Array) {
                            this.todoNew = handleList.length;
                        }
                        // this.$emit('countHandleListLength', this.handleList.length );
                    }
                })
                    .catch((response) => {
                        //commit(types.ACCOUNT_LOGIN_SUBMIT_FAILURE, response.data);
                    });
            },
            loadTodoNewList(){
                var params = {};
                params.userId = this.userId;
//        params.cusId = localStorage.getItem("his_customer");
                //var cusId = '87080f43abe24a25919cbf84d22d4e29';
                var cusId = localStorage.getItem(WX_USER_CUST_ID);
                params.cusId = cusId;
                params.pageIndex = "1";
                params.pageSize = "20";
                params.messageType = "todo";
                console.info("loadTodoNewList=params"+params);
                api.querywaitHandleLists(params).then((response) => {
                    if (response.data.head.errorCode == '0') {
                        var resultBean = response.data.body;
                        var handleList = resultBean.tasks;
                        console.log('handleList:' + handleList);
                        if (handleList instanceof Array) {
                            this.todoNew = handleList.length;
                        }
                        // this.$emit('countHandleListLength', this.handleList.length );
                    }
                })
                    .catch((response) => {
                        //commit(types.ACCOUNT_LOGIN_SUBMIT_FAILURE, response.data);
                    });
            },
            loadNoticeList(){
                var params = {};
//      params.userId="33c48a5109ec41f8aad1ed4648cd936b";
                params.userId = this.userId;
//        params.cusId = localStorage.getItem("his_customer");
                //var cusId = '87080f43abe24a25919cbf84d22d4e29';
                var cusId = localStorage.getItem(WX_USER_CUST_ID);

                params.cusId = cusId;
                params.pageIndex = "1";
                params.pageSize = "20";
                params.messageType = "notice";
                params.clientInfoValue = "public_wechat_jcdz_entrepreneur";

                console.info("loadNoticeList=params"+params);

                api.querywaitHandleLists(params).then((response) => {
                    console.log('querywaitHandleLists');
                    if (response.data.head.errorCode == '0') {
                        var resultBean = response.data.body;
                        var noticeList = resultBean.data;
                        var noReadCount = noticeList.length;
                        for (var i = 0; i < noticeList.length; i++) {
                            if (noticeList[i].isRead === "Y") {
                                noReadCount--;
                            }
                        }
                        console.log('noReadCount:' + noReadCount);
                        this.waitNew = noReadCount;
//          this.$emit('countNoticeListLength', this.noticeList.length );
                    }
                })
                    .catch((response) => {
                        //commit(types.ACCOUNT_LOGIN_SUBMIT_FAILURE, response.data);
                    });
            },
            fetchData(){
                console.info("获取登录人相关信息");
                this.custName = localStorage.getItem(WX_USER_CUST_NAME);
                this.headImgUrl= localStorage.getItem(WX_USER_IMG);

                /*    console.info(JSON.stringify(localStorage.getItem(WX_SERVICE_USER_INFO)));
                 self.imagelogo=localStorage.getItem(WX_SERVICE_USER_INFO).headimgurl;
                 console.info('头像图片加载地址='+self.imagelogo);*/
                this.loadUserInfo();
                //self.loadNoticeList();
                //self.loadTodoNewList();
                this.loadOrderListFromService();


            },
            autoLogin() {
                this.param.appCode = api.getQueryString('code');
                if (!this.param.appCode) {
                    this.param.appCode = this.$route.query.code;
                }
                if (this.param.appCode) {
                    localStorage.setItem(WX_USER_CODE, this.param.appCode);
                }

                this.param.wechatCode = api.getQueryString('state');
                if (!this.param.wechatCode) {
                    this.param.wechatCode = this.$route.query.state;

                }
                this.param.isHasWxInfo = '0';

                if(this.param.wechatCode) {
                    localStorage.setItem(WX_USER_WECHAT_CODE, this.param.wechatCode);
                }

                if (this.param.appCode != null && this.param.appCode != '') {
                    console.log("自动登录");
                    this.$store.dispatch('autoWechatLogin', this.param);
                }
            },
            routeTo(path){
                if (this.login) {
                    this.$router.push(path)
                }else{
                    Toast('未登录用户不可进行操作，请登录！');
                }
            }
        },
        mounted() {
            if (this.login) {
                this.fetchData();
            }

        },
        //通过路由的before钩子解决router-view缓存页面问题
        /* beforeRouteEnter (to, from, next) {
         next(vm => {
         console.log('-------------route')
         vm.fetchData();
         });
         }*/


    }
</script>
