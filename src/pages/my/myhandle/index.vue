<template>
    <div>

        <div class="toptitle"><span class="dot iconfont icon-jiantou" v-on:click="goBack()"></span>待办事项</div>
        <router-link :to="{path:'handleagent',query: {paramlist:list}}" v-for="list in handleList">
            <div class="backlog01">
                <div class="p1">{{list.title}}</div>
                <div class="p2">{{list.createTime.substring(0, 10)}}—单据交接确认</div>
                <div class="p3">以下为VIP客户经理从贵司接收的单据清单，请确认。</div>
                <div class="iconn04"><a href="#"><i class="iconfont" style="color:#b3b3b3;">&#xe623;</i></a></div>
            </div>
        </router-link>
        <vBlackData v-if="handleList==''"></vBlackData>


        <!-- <mt-popup v-model="agentVisible" position="right" class="mint-popup-3">
             <handleagent :userName="userName" :indentZysCount="indentZysCount" :indentList="indentList" :userMobilePhone="userMobilePhone" :agentDetail="agentDetail" v-on:closeAgent="closeAgent" v-on:loadHandleList="loadHandleList"></handleagent>
         </mt-popup>-->
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import handleagent from './handleagent';
    import api from '../../../api/index';
    import _track from '../../../api/track';
    const WX_USER_CUST_ID = 'wx.user.cust.id';  //当前custid
    const localStorage = global.localStorage;
    export default{
        components: {
            handleagent
        },
        //数据绑定
        data: function () {
            return {
                handleList: [],
                agentVisible: false,
                agentDetail: {},
                userName: '',
                userMobilePhone: '',
                indentZysCount: 0,
                indentList: [],

            }
        },
        computed: mapState({
            userId: state => state.account.auth.userId
        }),
        //定义额外方法
        methods: {
            openAgent(list){
                this.agentVisible = true;
                this.agentDetail = list;
                console.info("查找个人基本信息");
                var userId = this.agentDetail.vars.public.receivOrderUserId;
                api.queryUserInfoByUserId({userId: userId}).then((response) => {
                    console.log(response.data.head);
                    if (response.data.body) {
                        this.userName = response.data.body.userName;
                        this.userMobilePhone = response.data.body.mobilePhone;
                        //      this.userEmail=response.data.body.email==undefined?"未设置邮箱":response.data.body.email;
                    }
                });

                var params = {};
                // params.userId=this.selectCustomerCode;
                params.txm = this.agentDetail.vars.public.fileCoding;
                params.id = this.agentDetail.processInstId;
                api.queryIndentListsBywqd(params).then((response) => {
                    if (response.data != null) {
                        if (response.data.head.errorCode === "0") {
                            var resultBean = response.data.body;
                            this.indentList = resultBean;
                            for (var i = 0; i < this.indentList.length; i++) {
                                this.indentZysCount = this.indentZysCount + this.indentList[i].materialCount;
                            }
                        } else {
                            Toast("网络异常");
                        }
                    }

                }).catch((response) => {
                    Toast("应用异常");
                });


                //埋点：查看待办消息详情时，记录事件信息
                _track._trackEvent("JCDZ_WX", "概览-查看待办", this.agentDetail.serviceName, this.agentDetail.id);
            },
            closeAgent(){
                this.agentVisible = false;
            },
            loadHandleList(){
                this.$emit('loadHandleList');
            },
            loadHandleList(){
                var params = {};
                params.userId = this.userId;
                if (this.cusId === "0") {
                    return;
                }
                //var cusId = '87080f43abe24a25919cbf84d22d4e29';
                var cusId = localStorage.getItem(WX_USER_CUST_ID);
                params.cusId = cusId;
                params.pageIndex = "1";
                params.pageSize = "20";
                params.messageType = "todo";
                api.querywaitHandleLists(params).then((response) => {
                    if (response.data.head.errorCode == '0') {
                        var resultBean = response.data.body;
                        this.handleList = resultBean.tasks;
                        console.info("handleList" + this.handleList);
                    }
                    else {
                        this.handleList = [];
                        this.countHandleListLength(this.handleList.length);
                    }
                })
                    .catch((response) => {
                        //commit(types.ACCOUNT_LOGIN_SUBMIT_FAILURE, response.data);
                    });
            },
            goBack(){
                window.history.go(-1);
            }
        },
        //初始化执行的方法
        created(){
            // this.loadHandleList();
        },
        //通过路由的before钩子解决router-view缓存页面问题
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.loadHandleList();
            });
        },
        mounted() {
        },
        watch: {}
    }

</script>
<style scoped>
    div.mint-popup-3 {
        width: 100%;
        height: 100%;
        border-radius: 0px;
        margin: 0;
        background: #f3f3f3;
    }

</style>
