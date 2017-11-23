<template>

    <div>
        <div class="toptitle"><span class="dot iconfont icon-jiantou" v-on:click="goBack()"></span>我的进展</div>

        <div class="progress-title">
            <div class="progress-icon"></div>
            <label class="progress-label" style="padding-top:1.3em;padding-left: 0.5em;float: left;font-size: 0.9em;">我购买的产品</label>
        </div>
        <div class="item-product" v-for="item in serviceList">
            <div class="progress-left">
                <div class="progress-product-accounting" v-if="item.serviceCode == 'account'">
                    <div style="padding-top: 0.55em;padding-left: 0.35em;color: #ffffff">记账</div>
                </div>
                <div class="progress-product-invoice" v-else="item.serviceCode == 'bill'">
                    <div style="padding-top: 0.55em;padding-left: 0.35em;color: #ffffff">发票</div>
                </div>
            </div>
            <div class="progress-middle">
                <div class="progress-product-title">{{item.serviceName + '服务'}}</div>
                <div class="progress-product-time">{{item.startTime}}</div>
            </div>
            <div class="progress-right">
                <div class="progress-product-button" @click="openCheckProgressAgent(item.serviceCode)">
                    <div>查看进展</div>
                </div>
            </div>
        </div>

        <vBlackData v-if="serviceList==''"></vBlackData>

    </div>

</template>
<style>
    .progress-label {
        font-size: 0.8em;
        font-weight: normal;
        color: #A8A8A8;
    }

    .progress-title {
        width: 100%;
        height: 3em;
    }

    .progress-icon {
        float: left;
        width: 0.5em;
        height: 2.5em;
        margin-top: 0.5em;
        background-color: #FF7043;
    }

    .item-product {
        width: 100%;
        height: 4.5em;
        background-color: #ffffff;
        margin-bottom: 0.1em;
    }

    .progress-left {
        height: auto;
        width: 20%;
        float: left;
    }

    .progress-middle {
        height: auto;
        width: 55%;
        float: left;
    }

    .progress-right {
        height: auto;
        width: 25%;
        float: left;
    }

    .progress-product-accounting { /*记账图标*/
        background-color: #FFA726;
        width: 2.8em;
        height: 2.8em;
        border-radius: 2.8em;
        margin: 0.8em 1em 1em 0.8em;
    }

    .progress-product-invoice { /*发票图标*/
        background-color: #2BAF2B;
        width: 2.8em;
        height: 2.8em;
        border-radius: 2.8em;
        margin: 0.8em 1em 1em 0.8em;
    }

    .progress-product-title {
        padding-top: 1em;
        font-size: 0.9em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .progress-product-time {
        padding-top: 0.5em;
        color: #999999;
        font-size: 0.8em;
    }

    .progress-product-button {
        border: 0.1em solid #FF7043;
        width: 4.5em;
        height: 1.6em;
        margin-top: 1.5em;
        margin-left: 0.2em;
        border-radius: 0.3em;
    }

    .progress-product-button > div {
        font-size: 0.8em;
        color: #FF7043;
        padding-top: 0.18em;
        padding-left: 0.7em;
    }

    .mint-popup-3 {
        width: 100%;
        height: 100%;
        border-radius: 0px;
        margin: 0;
        background: #e8e8e8;
    }
</style>
<script>
    import checkProgress from './check_progress.vue';
    import api from '../../../api/';
    import _track from '../../../api/track';
    const localStorage = global.localStorage;
    const WX_USER_CUST_ID = 'wx.user.cust.id';  //当前custid
    const WX_USER_CUST_NAME = 'wx.user.cust.name';  //当前custname
    const WX_USER_CUSTSTORELIST = 'wx.user.custStoreList';
    export default {
        components: {
            checkProgress
        },
        data () {
            return {
                checkProgressPoupVisible: false,
                serviceList: [],
                taskList: [],
                byselected: {
                    //被选中的服务编号
                    selectServiceCode: null,
                    //被选中的帐套id
                    selectAccountId: null,
                    //帐套系统识别码 区分帐套来源
                    selectAccountSysCode: null,
                },
            }
        },
        methods: {
            openCheckProgressAgent: function (serviceCode) {
                this.checkProgressPoupVisible = true;
                this.byselected.selectServiceCode = serviceCode;
                this.$router.push({path: 'progress', query: {byselected: this.byselected, taskList: this.taskList}});
            },

            closeCheckProgressAgent: function () {
                this.checkProgressPoupVisible = false;
            },
            goBack: function () {
                window.history.go(-1);
            }
        },
        created()  {
            var params = {};
            var cusId = localStorage.getItem(WX_USER_CUST_ID);
            params.cusId = cusId;
            //params.cusId='87080f43abe24a25919cbf84d22d4e29';
            var that = this;
            //埋点
//      _track._trackEvent("JCDZ_WX","客户产品服务任务数据查询",JSON.stringify(params));
            console.info("created");
            api.queryCusServiceLists(params).then((response) => {
                if (response.data != null) {
                    if (response.data.head.errorCode === "0") {
                        //debugger;
                        var resultBean = response.data;
                        that.byselected.selectAccountId = resultBean.body.accountId;//帐套ID
                        that.byselected.selectAccountSysCode = resultBean.body.accountSysCode;//帐套系统识别码 区分帐套来源

                        console.info("that.byselected.selectAccountId=" + that.byselected.selectAccountId);
                        console.info("resultBean.body.accountSysCode=" + that.byselected.selectAccountSysCode);
                        /* //start -------------根据选择的客户加载条形码----------
                         if (resultBean.body.fileCoding) {
                         that.selecttxm = resultBean.body.fileCoding;
                         } else {
                         that.selecttxm = null;
                         }*/
                        //end  -------------根据选择的客户加载条形码----------
                        //start -------------服务列表数据加载------------------

                        if (resultBean.body.serviceList != null && resultBean.body.serviceList.length > 0) {
                            that.serviceList = resultBean.body.serviceList;
                            console.info(that.serviceList);
                            var taskList = resultBean.body.taskList;
                            for (var i = 0; i < taskList.length; i++) {
                                // debugger;
                                var taskMap = {};
                                taskMap.tab = taskList[i].taskCode;
                                taskMap.itemName = taskList[i].taskName;
                                taskMap.order = taskList[i].number;
                                taskMap.statu = taskList[i].transactState;
                                console.info(taskMap);
                                that.taskList.push(taskMap);
                            }


                        }
                    }
                }

            })
        },
        computed: {}
    }
</script>
