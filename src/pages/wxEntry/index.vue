<script>
    import {mapState} from 'vuex';
    import { Toast } from 'mint-ui';
import wxIndex from '../wxIndex'
import enterprisewx from '../enterprisewx/new_file'
import taxation from '../taxation'
import my from '../my'
import api from '../../api/';
import _track from '../../api/track';
/*const WX_USER_ID = 'wx.user.id';
const WX_USER_ENCODE = 'wx.user.encode';
const WX_USER_CUSTSTORELIST = 'wx.user.custStoreList';
const WX_USER_TOKEN = "wx.user.token";
const WX_USER_PHONE = 'wx.user.userPhone';*/
const WX_USER_CODE = 'wx.user.code';
const WX_USER_WECHAT_CODE = "wx.user.wechat.code";
const WX_USER_PHONE='wx.user.userPhone';
const WX_USER_PROVINCECODE='wx.user.provinceCode';
const WX_USER_LOGIN='wx.user.login';
const localStorage = global.localStorage;
const sessionStorage=global.sessionStorage;
export default {
    components: {
        wxIndex, enterprisewx, taxation, my
    },
    data() {
        return {
            selectedPage: 'index',
            params: {
                appCode: '',
                wechatCode: '',
                isHasWxInfo: ''
            },
            settings: [
                {
                    id: 'index',
                    name: '首页',
                    icon: 'icon-zhuye',
                },
                {
                    id: 'finance',
                    name: '财务专区',
                    icon: 'icon-qian',
                },
                {
                    id: 'boss',
                    name: '老板专区',
                    icon: 'icon-laobanxingming',
                },
                {
                    id: 'my',
                    name: '个人中心',
                    icon: 'icon-weibiaoti101',
                },
            ]
        }
    },
    created() {
        let pageId = this.$route.query.tab
        if (pageId) {
            this.selectedPage = pageId
        }
        this.autoLogin();
    },
    computed: mapState({
        mobilePhone: state => state.account.auth.mobilePhone
    }),
    watch:{
        selectedPage(val){
            this.$store.dispatch('changeTabs', val);
        },
        /*mobilePhone(val){

            console.info("手机号码="+val);
            if(val==''){

                Toast("请完善个人信息再进行操作");
                this.$router.push("/bindPhone");
            }
        }*/
    },
    methods: {
        autoLogin() {

            this.params.appCode = api.getQueryString('code');
            if (!this.params.appCode) {
                this.params.appCode = this.$route.query.code;
            }
            if (this.params.appCode) {
                localStorage.setItem(WX_USER_CODE, this.params.appCode);
            }

            this.params.wechatCode = api.getQueryString('state');
            if (!this.params.wechatCode) {
                this.params.wechatCode = this.$route.query.state;

            }
            this.params.isHasWxInfo = '0';

            if(this.params.wechatCode) {
                localStorage.setItem(WX_USER_WECHAT_CODE, this.params.wechatCode);
            }
            var provinceCode = api.getQueryString('provinceCode');
            if (!provinceCode) {
                provinceCode = this.$route.query.provinceCode;
            }
            if(provinceCode){
             localStorage.setItem(WX_USER_PROVINCECODE, provinceCode);
            }

            var login=sessionStorage.getItem(WX_USER_LOGIN)||'';
            if(login==''){//未登陆状态

                if (this.params.appCode != null && this.params.appCode != '') {
                    console.log("自动登录");
                    this.$store.dispatch('autoWechatLogin', this.params);

                }

            }


           /* if (this.param.appCode != null && this.param.appCode != '') {
                console.log("自动登录");
                this.$store.dispatch('autoWechatLogin', this.param);
            }*/
            /* let that = this;
             if(this.params.appCode != null && this.params.appCode != ''){
                $.ajax({
                  url: api.loginAsync(),
                  type: "POST",
                  cache: false,
                  async: false,
                  data: JSON.stringify(that.params), //传入组装的参数
                  contentType: 'application/json;charset=utf-8',
                  dataType: "json",  //类型
                  success: function (response) {
                      console.log('自动登录');
                      console.log(response);
                     if(response.head.errorCode ==='0'){
                         loginInit(response.body);
                      }
                     else{
                         console.log('自动登录失败:'+ response.head.errorMsg);
                     }
                  },
                   error:function (e) {
                      console.log("异常:" + e);

                   }
                });
               }*/
        },

    },
}

</script>

<template>
    <div class="entry">
        <mt-tab-container v-model="selectedPage">

            <mt-tab-container-item :id="settings[0].id">
                <keep-alive>
                    <wx-index v-if="selectedPage===settings[0].id" />
                </keep-alive>
            </mt-tab-container-item>

            <mt-tab-container-item :id="settings[1].id">
                <keep-alive>
                    <taxation v-if="selectedPage===settings[1].id" />
                </keep-alive>
            </mt-tab-container-item>

            <mt-tab-container-item :id="settings[2].id">
                <keep-alive>
                    <enterprisewx v-if="selectedPage===settings[2].id" />
                </keep-alive>
            </mt-tab-container-item>

            <mt-tab-container-item :id="settings[3].id">
                <my v-if="selectedPage===settings[3].id" />
            </mt-tab-container-item>

        </mt-tab-container>

        <mt-tabbar v-model="selectedPage"
                   fixed>
            <mt-tab-item v-for="item in settings"
                         :id="item.id">
                <div class="tab-slot">
                    <div :class="'ts-icon icon iconfont '+item.icon"></div>
                    <div class="ts-label">{{item.name}}</div>
                </div>
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<style scoped>
.mint-tab-container-item {
    margin-bottom: 6rem;
}
.tab-slot {
    color: #6E6E6E;
    height: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}
.ts-icon {
    font-size: 2.3rem;
}
.ts-label {
    font-size: 1.3rem;
}
.mint-tab-item.is-selected .tab-slot {
    color: #FF5722;
}
</style>
