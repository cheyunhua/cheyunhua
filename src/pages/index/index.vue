<template>
    <div>
    </div>
</template>
<script type="es6">
    import {Toast, Indicator} from 'mint-ui';
    import api from '../../api/';
    import _track from '../../api/track';
    const WX_USER_ID = 'wx.user.id';
    const WX_USER_CODE = 'wx.user.code';
    const WX_USER_ENCODE = 'wx.user.encode';
    const WX_USER_CUSTSTORELIST = 'wx.user.custStoreList';
    const WX_USER_TOKEN = "wx.user.token";
    const WX_USER_PHONE = 'wx.user.userPhone'
    const WX_USER_WECHAT_CODE = "wx.user.wechat.code";
    const WX_USER_LOGIN='wx.user.login';
    const localStorage = global.localStorage;
    const sessionStorage=global.sessionStorage;
    export default {
        data(){
            return {
                //首页自动登录参数
                params: {
                    appCode: '1',
                    wechatCode: '',
                }
            }
        },
        mounted(){
            this.autoLogin();
        },
        methods: {
            autoLogin(){
                this.params.appCode = api.getQueryString('code');
                this.params.wechatCode = api.getQueryString('state');
                localStorage.setItem(WX_USER_CODE, this.params.appCode);
                localStorage.setItem(WX_USER_WECHAT_CODE, this.params.wechatCode);
                if (this.params.appCode != null && this.params.appCode != '') {
                    Indicator.open({
                        text: '自动登录中....',
                        spinnerType: 'snake'
                    });
                    var that = this;
                    api.autoLogin(this.params).then(function (res) {
                        if (res.data.head.errorCode == '0') {
                            console.log("自动登录成功！！！" + res.data.body);
                            console.log("自动登录成功！！！当前路由" + that.$route.path);

                            that.$store.dispatch('autoWechatLoginChangeStatus', res.data.body);
                            //that.loginInit(res.data.body);
                            //登陆成功
                            Indicator.close();
                            //跳转到
                            that.$router.push('/detail');
                        }
                        else {
                            Indicator.close();
                            that.$router.push({
                                path: '/login',
                                query: {code: that.params.appCode, wechatCode: that.params.wechatCode}
                            });
                            //  that.$router.push('/index');
                            //不能自动登录
                        }
                    }).catch(function (err) {

                        Indicator.close();

                        //系统异常
                        Toast({
                            message: '系统异常:' + err,
                            duration: 3000
                        });
                        that.$router.push({
                            path: '/login',
                            query: {code: that.params.appCode, wechatCode: that.params.wechatCode}
                        });
                    })
                }
            },
            loginInit(data){
                sessionStorage.setItem(WX_USER_LOGIN, data.userId);
                localStorage.setItem(WX_USER_ID, data.userId);
                localStorage.setItem(WX_USER_TOKEN, data.token);
                localStorage.setItem(WX_USER_ENCODE, data.encode);
                localStorage.setItem(WX_USER_PHONE, data.phone);
                localStorage.setItem(WX_USER_CODE, data.code);
                localStorage.setItem(WX_USER_CUSTSTORELIST, data.cusList == undefined ? "" : JSON.stringify(data.cusList));
            },


        },
        created(){
            //自动登录

        },
    };
</script>
<style scoped>
</style>
