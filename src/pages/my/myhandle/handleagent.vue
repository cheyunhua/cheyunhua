<template>
    <div>
        <div class="toptitle" ><span class="dot iconfont icon-jiantou" v-on:click="goBack()"></span>单据交接确认</div>
        <div class="backlog02">
            <div class="p1">{{agentDetail.title == null ? "" : agentDetail.title}}</div>
            <div class="p2">{{currentTime}}—单据交接确认</div>
            <div class="iconn04">{{agentDetail.createTime.substring(0, 10)}}</div>
        </div>
        <div class="backlog03">
            <li><span>取单人&nbsp;&nbsp;&nbsp;：</span><span class="text">{{userName}}</span></li>
            <li><span>联系电话：</span><span class="text">{{userMobilePhone}}</span></li>
            <li><span>取单时间：</span><span
                class="text">{{agentDetail.createTime == null ? '' : agentDetail.createTime}}</span></li>
            <li><span>取单方式：</span><span
                class="text">{{agentDetail.vars.public.expressType == null ? '上门取单' : (agentDetail.vars.public.expressType == '0' ? '快递取单' : '上门取单')}}</span>
            </li>
        </div>

        <div class="backlog04">共收取票据（张）<span>{{indentZysCount}}</span></div>
        <div class="backlog05 clearfix">
            <div class="list01">
                <li v-for="list in indentList">
                    <div class="text">{{list.materialName}}（张）<span>{{list.materialCount}}</span></div>
                </li>
            </div>
        </div>
        <div class="backlog06">
            <div class="btn01" v-on:click="pushHandle()"><a>确认</a></div>
            <div class="btn02" v-on:click="backHandle()"><a>拒绝</a></div>
        </div>
    </div>
</template>

<script>
    import indent from '../../overview/indent';
    import api from '../../../api/index';
    import _track from '../../../api/track';
    import {Toast, Indicator, MessageBox} from 'mint-ui';

    Date.prototype.Format = function (format) {

        var o = {

            "M+": this.getMonth() + 1, //month

            "d+": this.getDate(), //day

            "h+": this.getHours(), //hour

            "m+": this.getMinutes(), //minute

            "s+": this.getSeconds(), //second

            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter

            "S": this.getMilliseconds() //millisecond

        }

        if (/(y+)/.test(format)) {

            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));

        }

        for (var k in o) {

            if (new RegExp("(" + k + ")").test(format)) {

                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));

            }

        }

        return format;

    }
    function getDate() {

        var date = new Date();
        var currentTime = date.Format("yyyy-MM-dd");
        return currentTime;

    }
    export default {
        name: 'page-agent',
       /* props: ['agentDetail', 'userName', 'userMobilePhone', 'indentZysCount', 'indentList'],*/
        components: {
            indent,
        },
        data() {
            return {
                currentTime: getDate(),
                agentDetail:[],
                userName:"",
                userMobilePhone:"",
                indentZysCount:0,
                indentList:[]
            };
        },
        created() {

            this.agentDetail =  this.$route.query.paramlist;
            console.info("查找个人基本信息");
            var userId=this.agentDetail.vars.public.receivOrderUserId;
            api.queryUserInfoByUserId({userId:userId}).then((response) => {
                console.log(response.data.head);
                if(response.data.body){
                    this.userName=response.data.body.userName;
                    this.userMobilePhone=response.data.body.mobilePhone;
                    //      this.userEmail=response.data.body.email==undefined?"未设置邮箱":response.data.body.email;
                }
            });

            var params={};
            // params.userId=this.selectCustomerCode;
            params.txm=this.agentDetail.vars.public.fileCoding;
            params.id=this.agentDetail.processInstId;
            api.queryIndentListsBywqd(params).then((response) => {
                if(response.data!=null){
                    if(response.data.head.errorCode==="0"){
                        var resultBean = response.data.body;
                        this.indentList =  resultBean ;
                        for(var i=0;i<this.indentList.length;i++){
                            this.indentZysCount = this.indentZysCount + this.indentList[i].materialCount;
                        }
                    }else{
                        Toast("网络异常");
                    }
                }

            }).catch((response) => {
                Toast("应用异常");
            });

        },
        methods: {
            goBack: function () {
                window.history.go(-1);
            },
            pushHandle(){
                MessageBox.confirm('确定该操作吗?').then(action => {
                    if (this.agentDetail.taskInstId != null) {
                        var params = {};
                        params.taskInstId = this.agentDetail.taskInstId;
                        params.remark = "推送";
                        params.confirm = "Y";
                        params.messageType = "todo";
                        params.tranType = "1";
                        _track._trackEvent("JCDZ_WX", "待办-确定", this.agentDetail.title, this.agentDetail.taskInstId);
                        api.sureHandle(params).then((response) => {
                            if (response.data != null) {
                                if (response.data.head.errorCode === "0") {
                                    Toast('签收成功!');
                                    this.$route.push("/myhandle");
                                }
                            }
                        })
                    }
                });
            },
            backHandle(){
                MessageBox.confirm('确定该操作吗?').then(action => {
                    if (this.agentDetail.taskInstId != null) {
                        var params = {};
                        params.taskInstId = this.agentDetail.taskInstId;
                        params.remark = "回退";
                        params.confirm = "Y";
                        params.messageType = "todo";
                        params.tranType = "0";
                        _track._trackEvent("JCDZ_WX", "待办-拒绝", this.agentDetail.title, this.agentDetail.taskInstId);
                        api.sureHandle(params).then((response) => {
                            if (response.data != null) {
                                if (response.data.head.errorCode === "0") {
                                    Toast('拒绝成功！');
                                    this.$route.push("/myhandle");

                                } else {
                                    Toast(response.data.head.errorMsg);

                                }
                            }
                        })
                    }
                });
            }
        },
        watch: {},
        mounted() {

        },
        updated(){
        }

    };
</script>
<style scoped>
    @import '../../../assets/css/agent.css';

    .mint-button--large {
        width: 90%;
        margin-left: 5%;
        border-radius: 0.8rem;
    }
</style>
