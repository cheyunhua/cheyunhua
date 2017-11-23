<template>
    <div>
        <div class="toptitle" ><span class="dot iconfont icon-jiantou" v-on:click="goBack()"></span>消息详情</div>

        <div class="msg-body">
            <div>
                <div class="msg-left">
                    <div><i class="iconfont icon-zixun11" style="color: #FF7043"></i></div>
                </div>
                <div class="msg-middle">
                    <div class="msg-middle-left">
                        <div class="msg-title" >{{agentDetail.title==null?"":agentDetail.title}}</div>
                    </div>
                    <div class="msg-middle-right">
                        <div class="msg-time">{{agentDetail.sendDate==null?"":agentDetail.sendDate}}</div>
                    </div>
                </div>
                <div class="msg-right">
                </div>
            </div>

            <div style="padding-top: 3.5em;width: 100%;height: auto;background-color: #ffffff">
                <div class="msg-content">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{agentDetail.content==null?"":agentDetail.content}}</div>
                <div class="msg-content-info" v-if='agentDetail.expressType==null?false:(agentDetail.expressType=="0"||agentDetail.expressType=="2"?true:false)'>
                    <div class="msg-content-addr">地址：{{agentDetail.expressAddress}}</div>
                    <div class="msg-content-recipient">收件人：{{agentDetail.expressUser}}</div>
                    <div class="msg-content-phone">联系电话：{{agentDetail.expressPhone}}</div>
                    <div></div>
                </div>
            </div>

        </div>

    </div>
</template>
<style>
    .msg-body {

    }
    .msg-left {
        float: left;
        width: 12%;
        height:3em;
        background-color: #ffffff;
    }
    .msg-left > div {
        padding-top: 0.8em;
        padding-left: 1em;
    }
    .msg-middle {
        float: left;
        width: 81%;
        height:3em;
        background-color: #ffffff;
        border-bottom: 0.15em solid #E3E3E3;
    }
    .msg-right {
        float: left;
        width: 7%;
        height:3em;
        background-color: #ffffff;
    }
    .msg-middle-left {
        float: left;
        width: 75%;
        height:3em;
    }
    .msg-middle-right {
        float: left;
        width: 25%;
        height:3em;
    }
    .msg-title {
        margin-top: 1em;
        font-size:0.9em;
        overflow:hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .msg-time {
        margin-top: 1.5em;
        font-size: 0.8em;
        color: #C2C2C2;
    }
    .msg-content {
        margin:0 1em 0.5em 1.5em;
        font-size: 0.9em;
        color: #919191;
        line-height: 1.6em;
    }
    .msg-content-info {
        width: 100%;
        height: auto;
        padding-left: 2.5em;

    }
    .msg-content-addr {
        width: 90%;
        margin-top: 0.7em;
        font-size: 0.9em;
        color: #919191;
    }
    .msg-content-recipient {
        margin-top: 0.7em;
        font-size: 0.9em;
        color: #919191;
    }
    .msg-content-phone {
        margin-top: 0.7em;
        font-size: 0.9em;
        color: #919191;
    }
</style>
<script>
    import api from '../../../api/index';
    import _track from '../../../api/track';
    import { Toast,Indicator  } from 'mint-ui';
    export default {
        name: 'page-agent',
        props:['agentDetail'],
        components: {
        },
        data() {
            return {
                vipManagerName: '',
                depAddress: '',
                vipPhone: '',
                storeName: '',
            };
        },
        created() {
        },
        methods:{
            loadCustomer(){
                api.querycustomerBycusId({cusId:this.agentDetail.cusId}).then((response) => {
                    var cusInfo=response.data.body;
                    if(cusInfo){
                        this.vipManagerName=cusInfo.customerDepInfoList[0].vipManagerName;
                        this.vipPhone=cusInfo.customerDepInfoList[0].vipPhone;
                        this.depAddress=cusInfo.customerDepInfoList[0].depAddress;
                        this.storeName=cusInfo.customerDepInfoList[0].storeDeptName;
                    }
                });
            },
            loadNoticeList(){
                this.$emit('loadNoticeList');
            },
            goBack(){
                this.$emit('closeAgent');
            },
            sureHandle(){
                if(this.agentDetail.id!=null){
                    var params={};
                    params.id=this.agentDetail.id;
                    params.remark="阅读消息";
                    params.confirm="Y";
                    params.messageType="notice";
                    _track._trackEvent("JCDZ_WX","消息阅读确认",JSON.stringify(params));
                    api.sureHandle(params).then((response) => {
                        if(response.data!=null){
                            if(response.data.head.errorCode==="0"){
                                Toast("处理完毕");
                                this.loadNoticeList();
                                this.$emit('closeAgent');
                            }
                        }
                    })
                }
            }
        },
        watch: {
            agentDetail:function () {
                //下载客户信息
                /*        if(this.agentDetail.expressType!=null&&this.agentDetail.expressType==='0'){
                 this.loadCustomer();
                 }*/
            }
        },
        mounted:function() {

        },
        updated(){
        }
    };
</script>
