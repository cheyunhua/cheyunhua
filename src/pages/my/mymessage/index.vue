<template>
    <div>
        <div class="toptitle"><span class="dot iconfont icon-jiantou" v-on:click="goBack()"></span>我的消息</div>
        <div class="message" v-for="list in noticeList" v-on:click="openAgent(list)">
            <div class="messagel"><img src="../../../assets/images/common/xx_03.png"><span
                v-if="list.isRead==='N'"></span></div>
            <div class="messager">
                <div>{{list.title}}
                    <span style="top: 1.2rem;">{{list.sendDate}}</span>
                </div>
                <div class="content">{{list.summary}}</div>
            </div>
        </div>
        <mt-popup v-model="agentVisible" position="right" class="mint-popup-3" modal="false">
            <messageagent :agentDetail="agentDetail" v-on:closeAgent="closeAgent"
                          v-on:loadNoticeList="loadNoticeList"></messageagent>
        </mt-popup>

        <vBlackData v-if="noticeList==''"></vBlackData>

    </div>
</template>


<script>
    import {mapState} from 'vuex';
    import messageagent from './messageagent';
    import api from '../../../api/index';
    import _track from '../../../api/track';
    import 'src/assets/css/workspace/dispose.css';
    const WX_USER_CUST_ID = 'wx.user.cust.id';  //当前custid
    const localStorage = global.localStorage;
    export default{
        components: {
            messageagent
        },
        //数据绑定
        data: function () {
            return {
                noticeList: [],
                agentVisible: false,
                agentDetail: {},
            }
        },
        computed: mapState({
            userId: state => state.account.auth.userId,
        }),
        //定义额外方法
        methods: {
            loadNoticeList(){
                this.$emit('loadNoticeList');
            },
            loadData(){
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

                api.querywaitHandleLists(params).then((response) => {
                    console.log('querywaitHandleLists');
                    if (response.data.head.errorCode == '0') {
                        var resultBean = response.data.body;
                        this.noticeList = resultBean.data;
                    }
                })
                    .catch((response) => {
                        //commit(types.ACCOUNT_LOGIN_SUBMIT_FAILURE, response.data);
                    });
                console.info("noticeList=" + this.noticeList);
            },
            openAgent(list){
                this.agentVisible = true;
                this.agentDetail = list;
                //埋点：点击查看某一条消息详情时，记录事件信息
                _track._trackEvent("JCDZ_WX", "待办-查看消息内容", list.title, list.id);
                if (this.agentDetail.taskInstId != null) {
                    var params = {};
                    params.taskInstId = this.agentDetail.taskInstId;
                    params.remark = "阅读消息";
                    // params.confirm="Y";
                    params.messageType = "notice";
                    api.sureHandle(params).then((response) => {
                        this.loadNoticeList();
                    })
                }

            },
            closeAgent(){
                this.agentVisible = false;
            },
            goBack(){
                window.history.go(-1);
            },
        },
        //通过路由的before钩子解决router-view缓存页面问题
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.loadData();
            });
        }
    }

</script>

<style scoped>
    div.mint-popup-3 {
        width: 100%;
        height: 100%;
        border-radius: 0px;
        margin: 0;
        background: #ffffff;
    }

</style>

