<template>
    <div>
        <header class="fx-header">
            <div class="fx-header-top fx-orange">
                <i class="glyphicon glyphicon-menu-left fx-ico-left" v-on:click="goBack"></i>设置
            </div>
        </header>

        <label class="my-label" style="margin-left: 2em;">个人信息</label>
        <div class="item-head">
            <div class="setting-left" style="margin-top: 1em;">
                <label style="font-weight: normal;">头像</label>
            </div>
            <div class="setting-right">
                <div class="my-icon" style="margin-left: 10em;margin-top: 0.25em;"><i
                    class="iconfont icon-weibiaoti101 "
                    style="font-size: 2em;color: #707070;margin: 0.25em 0 0 0.2em"></i></div>
            </div>
        </div>

        <div class="item-phone">
            <div class="setting-left">
                <label style="font-weight: normal;margin-top: 1em">手机号码</label>
            </div>
            <div class="setting-right">
                <div class="my-gray" style="margin-top: 1em;margin-left: 6em;padding-right: 2em;float: right;">
                    <div>{{userMobilePhone}}</div>
                </div>
            </div>
        </div>
        <div class="item-name">
            <div class="setting-left">
                <label style="font-weight: normal;margin-top: 1em">姓名</label>
            </div>
            <div class="setting-right">
                <div class="my-gray" style="margin-top: 1em;padding-right: 2em;float: right;">{{userName}}</div>
            </div>
        </div>
        <div class="item-email">
            <div class="setting-left">
                <label style="font-weight: normal;margin-top: 1em">邮箱</label>
            </div>
            <div class="setting-right">
                <div class="my-gray" style="margin-top: 1em;padding-right: 2em;float: right;">
                    <div>{{userEmail}}</div>
                </div>
            </div>
        </div>

        <label class="my-label" style="margin-left: 2em;margin-top: 2em;">企业信息</label>
        <router-link :to="{path:'mycustomerlist'}">
            <div class="item-companyList">
                <div class="setting-left">
                    <label style="font-weight: normal;margin-top: 1em">企业列表</label>
                </div>
                <div class="setting-right">
                    <i class="fa fa-angle-right my-gray"
                       style="font-size: 1.8em;margin-top: 0.4em;padding-right: 1em;float: right;"></i>
                </div>
            </div>
        </router-link>

        <div class="item-logout" style="margin-top: 5em;" v-on:click="logout">
            <div class="setting-left" style="color: #FF7043">
                <i class="fa fa-power-off" style="font-size: 1.3em;"></i><label
                style="font-weight: normal;margin-top: 1em;padding-left: 0.5em;">退出登录</label>
            </div>
            <div class="setting-right">
                <i class="fa fa-angle-right my-gray"
                   style="font-size: 1.8em;margin-top: 0.4em;padding-right: 1em;float: right;"></i>
            </div>
        </div>

    </div>
</template>
<style>
    .my-label {
        font-size: 0.8em;
        font-weight: normal;
        color: #A8A8A8;
    }

    .item-head {
        width: 100%;
        height: 3.5em;
        background-color: #ffffff;
        /*border-top: 0.1em solid #E3E3E3;
        border-bottom: 0.1em solid #E3E3E3;*/
        display: table;
    }

    .setting-left {
        padding-left: 1.6em;
        height: auto;
        width: 35%;
        float: left;
    }

    .setting-right {
        height: auto;
        width: 65%;
        float: left;
    }

    .my-icon {
        background-color: #E8E8E8;
        height: 3em;
        width: 3em;
        border-radius: 3em;
        border: 0.1em solid #D4D4D4;
    }

    .item-phone {
        margin-top: 0.5em;
        width: 100%;
        height: 3.2em;
        background-color: #ffffff;
        border-bottom: 0.1em solid #E3E3E3;
    }

    .item-name {
        width: 100%;
        height: 3.2em;
        background-color: #ffffff;
        border-bottom: 0.1em solid #E3E3E3;
    }

    .item-email {
        width: 100%;
        height: 3.2em;
        background-color: #ffffff;
    }

    .item-companyList {
        width: 100%;
        height: 3.2em;
        background-color: #ffffff;
    }

    .item-logout {
        width: 100%;
        height: 3.2em;
        background-color: #ffffff;
    }

    .my-gray {
        color: #999999;
    }
</style>
<script>

    import {mapState} from 'vuex';
    import api from '../../api/';
    import config from '../../api/config';
    import _track from '../../api/track';
    import 'src/assets/css/setting.css';
    import {Toast, Indicator, MessageBox} from 'mint-ui';
    const localStorage = global.localStorage;






    //新增
    export default {
        name: 'me-page',
        data(){
            return {
                userName: null,
                userMobilePhone: null,
                userEmail: null
            }
        },

        watch:{
            logoutSuccess(val){
                console.log('logout----'+val);
                window.location.href="/wechat/#/wx";
                window.location.reload();
                //this.$router.push({ path: 'wx' })
            },
        },


        computed: mapState({
            logoutSuccess:state => state.account.logout.success,
            isLogin: state => state.account.auth.check(),
            userId: state => state.account.auth.userId,
            custStoreList: state => (state.account.auth.custStoreList == '' || state.account.auth.custStoreList == undefined) ? "" : JSON.parse(state.account.auth.custStoreList),
        }),
        methods: {
            onDetail(objName){
                _track._trackEvent("JCDZ_WX", "设置", objName);
            },
            goBack: function () {
                window.history.go(-1);
            },
            loadUserInfo(){
                console.log('路由发送变化doing...');
                console.log(this.userId + ",查找个人信息");
//         _track._trackEvent("JCDZ_WX","概览-查看个人信息",this.userId);
                api.queryUserInfoByUserId({userId: this.userId}).then((response) => {
                    console.log(response.data.head);
                    if (response.data.body) {
                        this.userName = response.data.body.userName;
                        this.userMobilePhone = response.data.body.mobilePhone;
                        this.userEmail = (response.data.body.email == undefined || response.data.body.email == null || response.data.body.email == '') ? "未设置邮箱" : response.data.body.email;
                    }
                });
            },
            logout(){
                let that = this;
                MessageBox.confirm('是否退出登录?').then(action => {
                    that.$store.dispatch('accountLogoutSubmit');

                });
            },
            closeCurrentWindow(){
                try {
                    WeixinJSBridge.call("closeWindow");
                } catch (e) {
                    console.log("WeixinJSBridge    undefined");
                    try {
                        parent.WeixinJSBridge.call("closeWindow");
                    } catch (e) {
                        console.log("parent.WeixinJSBridge    undefined");
                    }
                }
            },

        },
        created() {
            var self = this;
            self.loadUserInfo();
        },
        mounted: function () {

        }
    }
</script>
