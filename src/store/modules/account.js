import Vue from 'vue';
import api from '../../api/';
import utilApi from '../../api/util';
import config from '../../api/config';
import _track from '../../api/track';
import * as types from '../mutation-types';
import {Toast, Indicator} from 'mint-ui';
import async from 'src/api/async'

const AUTH_JWT_TOKEN = 'auth.jwt_token';
const AUTH_USER_ID = 'auth.id';
const AUTH_USER = 'auth.user';
const AUTH_USER_WX = 'auth.user_wx';
const AUTH_USER_CONFIGS = 'auth.user_configs';
const AUTH_DEPT = 'auth.dept';

//新增
const WX_USER_ID = 'wx.user.id';
const WX_USER_NAME = 'wx.user.name';
const WX_USER_CODE = 'wx.user.code';
const WX_USER_WECHAT_CODE = 'wx.user.wechat.code';
const WX_USER_ENCODE = 'wx.user.encode';
const WX_USER_CUSTSTORELIST = 'wx.user.custStoreList';
const WX_USER_TEPM = "wx.user.temp";
const WX_USER_TOKEN = "wx.user.token";
const WX_USER_SESSION = 'wx.user.session'
const WX_USER_PHONE = 'wx.user.userPhone'
const WX_USER_CUST_ID = 'wx.user.cust.id';  //当前custid
const WX_USER_CUST_NAME = 'wx.user.cust.name';  //当前custname
const WX_USER_LOGIN_TIME = 'wx.user.login.time';
const WX_SERVICE_USER_INFO='wx.service.user.info';
const WX_USER_IMG='wx.user.img';
const WX_USER_LOGIN='wx.user.login';
const localStorage = global.localStorage;
const sessionStorage=global.sessionStorage;

export default {
    state: {
        auth: {
            check() {
                return this.loginid != null && this.loginid != '';
            },
            user_token: localStorage.getItem(WX_USER_TOKEN),
            id: localStorage.getItem(AUTH_USER_ID) || '',
            user: JSON.parse(localStorage.getItem(AUTH_USER)),
            user_wx: JSON.parse(localStorage.getItem(AUTH_USER_WX)),
            configs: JSON.parse(localStorage.getItem(AUTH_USER_CONFIGS)),
            dept: JSON.parse(localStorage.getItem(AUTH_DEPT)),
            userId: localStorage.getItem(WX_USER_ID) || '',
            userName: localStorage.getItem(WX_USER_NAME) || '',
            loginid: sessionStorage.getItem(WX_USER_LOGIN)||'',
            mobilePhone:'phone',
            encode: localStorage.getItem(WX_USER_ENCODE),
            isLoginTimeOut: localStorage.getItem(WX_USER_LOGIN_TIME),
            custStoreList: localStorage.getItem(WX_USER_CUSTSTORELIST) || '',
        },
        login: {
            success: false,
            failure: null,
            loginTime: new Date().getTime(),
        },
        logout: {
            success: false,
            failure: null,
        },
        selected:{
            selectedPage:'index',
        },
        order:{
            waitOrderCount: null,
        }

    },
    mutations: {
        ACCOUNT_WAITPAY_CHANGED: (state,data) => {
           Vue.set(state.order, 'waitOrderCount', data);
        },
        ACCOUNT_SELECTED_CHANGED: (state, data) => {
            Vue.set(state.selected, 'selectedPage', data);

        },
        ACCOUNT_AUTH_STATUS_CHANGED: (state, data) => {
            if (!data) {
                Vue.set(state.auth, 'jwt_token', null);
                Vue.set(state.auth, 'userId', '');
                Vue.set(state.auth, 'userName', '');
                Vue.set(state.auth, 'loginid', '');
                Vue.set(state.auth, 'encode', null);
                Vue.set(state.auth, 'cusList', null);

                Vue.set(state.auth, 'configs', []);
                localStorage.removeItem(AUTH_JWT_TOKEN);
                localStorage.removeItem(AUTH_USER_ID);
                localStorage.removeItem(AUTH_USER);
                localStorage.removeItem(AUTH_USER_WX);
                localStorage.removeItem(AUTH_USER_CONFIGS);
                localStorage.removeItem(AUTH_DEPT);
                localStorage.removeItem(WX_USER_TOKEN);
                localStorage.removeItem(WX_USER_LOGIN_TIME);
                localStorage.removeItem(WX_USER_ID);
                localStorage.removeItem(WX_USER_NAME);
                sessionStorage.removeItem(WX_USER_LOGIN);
                localStorage.removeItem(WX_USER_ENCODE);
                localStorage.removeItem(WX_USER_CUSTSTORELIST);
                localStorage.removeItem(WX_SERVICE_USER_INFO);
                localStorage.removeItem(WX_USER_IMG);

                console.log("登陆失败，清缓存");
                return;
            }

            console.log(data.cusList);
            Vue.set(state.auth, 'userId', data.userId);
            Vue.set(state.auth, 'userName', data.userName);
            Vue.set(state.auth, 'loginid', data.userId);

            Vue.set(state.auth, 'encode', data.encode);
            Vue.set(state.auth, 'custStoreList', data.cusList
            == undefined ? "" : JSON.stringify(data.cusList));

            Vue.set(state.auth, 'mobilePhone', data.mobilePhone||'');

            localStorage.setItem(WX_USER_ID, data.userId);
            localStorage.setItem(WX_USER_NAME,data.userName);
            sessionStorage.setItem(WX_USER_LOGIN,data.userId);
            localStorage.setItem(WX_USER_TOKEN, data.token);
            localStorage.setItem(WX_USER_ENCODE, data.encode);
            localStorage.setItem(WX_USER_PHONE, data.mobilePhone);
            //localStorage.setItem(WX_USER_CODE, data.code);
            localStorage.setItem(WX_USER_LOGIN_TIME, new Date().getTime());
            localStorage.setItem(WX_USER_CUSTSTORELIST, data.cusList
            == undefined ? "" : JSON.stringify(data.cusList));
            localStorage.setItem(WX_SERVICE_USER_INFO,data.wxServerUserInfo);
            localStorage.setItem(WX_USER_IMG,data.headImgUrl);

            console.info("localStorage.getItem(WX_USER_CUST_ID)=" + localStorage.getItem(WX_USER_CUST_ID));


            if (localStorage.getItem(WX_USER_CUST_ID) == null) {

                localStorage.setItem(WX_USER_CUST_ID, data.cusList == undefined ? "" : data.cusList[0].custId);//默认选中第一个企业
                localStorage.setItem(WX_USER_CUST_NAME, data.cusList == undefined ? "" : data.cusList[0].custName);//默认选中第一个企业
            }


            console.log(data.cusList);
            //做埋点
            // _track._trackPageview("/login","登录");
        },
        // user login init
        //set state.login.success value eq false
        //set state.login.failure value eq null
        ACCOUNT_LOGIN_INIT: (state) => {
            Vue.set(state.login, 'success', false);
            Vue.set(state.login, 'failure', null);
        },
        //set state.login.success value eq true
        //set state.login.failure value eq null
        ACCOUNT_LOGIN_SUBMIT_SUCCESS: (state) => {
            console.info("登录时间="+state.login.loginTime);
            Vue.set(state.login, 'success', true);
            Vue.set(state.login, 'loginTime', new Date().getTime());
            console.info("当前登录时间="+state.login.loginTime);
        },
        //set state.login.success value eq false
        //set state.login.failure value eq data
        ACCOUNT_LOGIN_SUBMIT_FAILURE: (state, data) => {
            Vue.set(state.login, 'success', false);
            Vue.set(state.login, 'failure', data);
        },
        //set state.login.success value eq false
        //set state.login.failure value eq null
        ACCOUNT_LOGOUT_INIT: (state) => {
            Vue.set(state.logout, 'success', false);
            Vue.set(state.logout, 'failure', null);
        },
        ACCOUNT_LOGOUT_SUBMIT_SUCCESS: (state) => {
            Vue.set(state.logout, 'success', true);
            Vue.set(state.logout, 'failure', null);
        },
        ACCOUNT_LOGOUT_SUBMIT_FAILURE: (state, data) => {
            Vue.set(state.logout, 'success', false);
            Vue.set(state.logout, 'failure', data);
        }
    },
    actions: {
        changeWaitPayNum({commit}, params){
            commit(types.ACCOUNT_WAITPAY_CHANGED,params);

        },
        changeTabs({commit}, params){

            commit(types.ACCOUNT_SELECTED_CHANGED,params);
        },

        //user login init
        accountLoginInit({commit}) {
            commit(types.ACCOUNT_LOGIN_INIT);
        },
        //user submit login call
        /* accountLoginSubmit({ commit }, params) {
         $.ajax({
         url: api.loginAsync(),
         type: "POST",
         cache: false,
         async: false,
         data: JSON.stringify(params), //传入组装的参数
         contentType: 'application/json;charset=utf-8',
         dataType: "json",  //类型
         success: function (response) {
         console.log('login')
         console.log(response)
         if(response.head.errorCode=='0'){
         commit(types.ACCOUNT_LOGIN_SUBMIT_SUCCESS);
         commit(types.ACCOUNT_AUTH_STATUS_CHANGED, response.body);
         }
         else{
         try {
         Toast(response.head.errorMsg);
         }catch(e){
         console.log("异常");
         }
         commit(types.ACCOUNT_LOGIN_SUBMIT_FAILURE, response);
         }
         },
         error:function (e) {
         console.log("异常");
         commit(types.ACCOUNT_LOGIN_SUBMIT_FAILURE, response.data);
         }
         });
         },*/
        //获取验证码
        /*accountCaptcha({commit}, params) {
         api.captcha(params).then((response) => {
         console.log('captcha')
         if(response.data.head.errorCode=='0'){
         Toast('短信已发至你的手机，请注意查收');
         }
         else{
         Toast(response.data.head.errorMsg);
         }
         })
         .catch((response) => {

         });
         },*/
        //获取验证码
        wechatCaptcha({commit}, params) {
            api.wechatCaptcha(params).then((response) => {
                console.log('captcha')
                if (response.data.head.errorCode == '0') {
                    Toast('短信已发至你的手机，请注意查收');

                }
                else {
                    Toast(response.data.head.errorMsg);
                }
            })
                .catch((response) => {

                });
        },
        //user logout init call
        accountLogoutInit({commit}) {
            console.log("come accountLogoutInit");
            commit(types.ACCOUNT_LOGOUT_INIT);
        },
        //user logout submit call
        accountLogoutSubmit({commit}) {
            let that = this
            api.logout().then(function (res) {
                if (res.data.head.errorCode == '0') {
                    commit(types.ACCOUNT_LOGOUT_SUBMIT_SUCCESS);
                    commit(types.ACCOUNT_AUTH_STATUS_CHANGED,null);


                }
                else {
                    Toast({
                        message: res.data.head.errorMsg,
                        duration: 3000
                    });
                }
            }).catch(function (err) {
                commit(types.ACCOUNT_LOGOUT_SUBMIT_FAILURE, response.data);
                //系统异常
                Toast({
                    message: '系统异常:' + err,
                    duration: 3000
                });
            })

        },
        accountWechatLoginSubmit({commit}, params) {
            //  debugger;
            if(!params.wechatCode){
               params.wechatCode = localStorage.getItem(WX_USER_WECHAT_CODE);
             }
            if(!params.code){
               params.code = localStorage.getItem(WX_USER_CODE);
            }
            params.hasWxInfo = "hasWxInfo";
            //  params.appId=config.appId;
            // params.openId="oce-9wK5E0tIbGNTJyXCTdtFOJb8";
            params.captchaClientId = params.mobilePhone;

            $.ajax({
                url: api.wechatLogin(),
                type: "POST",
                cache: false,
                async: true,
                data: JSON.stringify(params), //传入组装的参数
                contentType: 'application/json;charset=utf-8',
                dataType: "json",  //类型
                success: function (response) {
                    console.log('login')
                    console.log(response)
                    if (response.head.errorCode == '0') {

                        commit(types.ACCOUNT_AUTH_STATUS_CHANGED, response.body);
                        commit(types.ACCOUNT_LOGIN_SUBMIT_SUCCESS);
                    }
                    else {
                        try {
                            Toast(response.head.errorMsg);
                        } catch (e) {
                            console.log("异常");
                        }
                        commit(types.ACCOUNT_LOGIN_SUBMIT_FAILURE, response);
                    }
                },
                error: function (e) {
                    console.log("异常");
                    commit(types.ACCOUNT_LOGIN_SUBMIT_FAILURE, response.data);
                }
            });
        },

        autoWechatLoginChangeStatus({commit},params){
            commit(types.ACCOUNT_LOGIN_SUBMIT_SUCCESS);
            commit(types.ACCOUNT_AUTH_STATUS_CHANGED, params);
        },

        autoWechatLogin({commit}, params) {
        /*    async(this, 'autoLogin', params, res => {
                    console.log("自动登录成功！！！" + res.body);
                    commit(types.ACCOUNT_LOGIN_SUBMIT_SUCCESS);
                    commit(types.ACCOUNT_AUTH_STATUS_CHANGED, res.body);

            })*/

          /* Indicator.open({
                text: '自动登录中....',
                spinnerType: 'snake'
            });*/
            api.localLogin(params).then(function (res) {
                if (res.data.head.errorCode === '0') {
                    console.log("自动登录成功！！！" + res.data.body);
                    commit(types.ACCOUNT_LOGIN_SUBMIT_SUCCESS);
                    commit(types.ACCOUNT_AUTH_STATUS_CHANGED, res.data.body);
                    //登陆成功
                    /*Indicator.close();*/


                }
                else {
                   /* Indicator.close();
                    Toast(res.data.head.errorMsg);*/
                    console.log("不能自动登录！！！" + res.data.body);
                    commit(types.ACCOUNT_AUTH_STATUS_CHANGED, null);
                }
            }).catch(function (err) {
                /*Indicator.close();*/
                //系统异常
                Toast({
                    message: '系统异常:' + err,
                    duration: 3000
                });
                commit(types.ACCOUNT_AUTH_STATUS_CHANGED, null);
            })

        },
    }
}


