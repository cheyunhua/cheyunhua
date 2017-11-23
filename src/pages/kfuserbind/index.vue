<template>
    <div class="cultivate-sign">
        <v-wx-header title="客户绑定" />
        <div class="apple-userinfo">
            <img :src="wechatImage" alt="" />
            <span>{{ wechatName }}</span>
        </div>
        <div class="personalInfo-form">

            <div class="personalInfo-item">
                <div class="personalInfo-item-label">
                    <span><span style="color:#FF9E0F">*</span>手机号码：</span>
                </div>
                <div class="personalInfo-item-selectArea">
                    <div class="areaName">
                        {{tel}}
                    </div>
                </div>
            </div>
            <div class="personalInfo-item topline">
                <div class="personalInfo-item-label">
                    <span><span style="color:#FF9E0F">*</span>客户ID：</span>
                </div>
                <div class="personalInfo-item-input theme-input">
                    <!--<input type="text" placeholder="" v-model="theme" ref="input" @focus="closeSelectAreaAgent()" readonly="readonly" />-->
                    <div class="themeText">{{khId}}</div>

                </div>
            </div>

            <div class="apply-buttom">
                <mt-button size="large" v-bind:class="this.existSignText.length>0?'sign_none':'sign'" @click="sureSign">{{buttonText}}</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../../api/';
    import { Toast, Indicator, MessageBox } from 'mint-ui';
    import ElementUI from 'element-ui'
    /*import selectArea from '../feedback/selectArea.vue';
     import theme from './theme'*/
    export default {
        components: {
            /*selectArea,
             theme*/
        },
        data() {
            return {
                wechatName: '',
                wechatImage: '',
                tel: '',
                khID: '',
                openId:'',
                buttonText: '绑定',
                existSignText: '',
            }
        },
        methods: {

            sureSign() {
                if(this.existSignText.length > 0) {
                    return
                }
                if(!this.tel) {
                    Toast('手机号码不能为空');
                    return
                }
                if(!this.khId) {
                    Toast('客户ID不能为空');
                    return
                }

                if(!this.openId) {
                    Toast('openId不能为空');
                    return
                }

                Indicator.open({
                    text: "绑定到中！请稍候",
                    spinnerType: 'snake'
                });
                //调用绑定接口
                var params = {};

                var userBinding=[];

                var para={};

                para.openId=this.openId;
                para.khId=this.khId;
                para.mobilePhone=this.tel;
                userBinding.push(para);
                params.userBinding =userBinding;

               api.userBind(params).then((response) => {

                   var result = response.data.body;
                    if(result.rtnCode == '0000') {
                        Indicator.close();
                        this.$message.success('绑定成功');
                        this.buttonText = '已绑定';
                        this.existSignText = '亲！绑定过了(∩_∩)'
                    } else if(result.rtnCode == '99999') {
                        Indicator.close();
                        this.$message.success(result.rtnMsg);
                        this.buttonText = '已绑定';
                        this.existSignText = '亲！今天签到过了(∩_∩)'
                    }
                }).catch((response) => {
                    Indicator.close();
                    Toast('哎呀！网络出了点问题，请稍后重试！');
                });
            }
        },
        created() {

            this.wechatImage = this.$route.query.wechatImage != undefined ? this.$route.query.wechatImage : 'http://p.qlogo.cn/bizmail/Tib8C2jsaHlAd4slsEKpj03OicPznv6bVEBL6ZTz3EHxlF3atOEFHvoQ/0';
            this.wechatName = this.$route.query.wechatName != undefined ? this.$route.query.wechatName : 'Hi';
            this.tel = this.$route.query.tel != undefined ? this.$route.query.tel : '';
            this.khId = this.$route.query.khId != undefined ? this.$route.query.khId : '';
            this.openId = this.$route.query.openId != undefined ? this.$route.query.openId : '';

        },
    }
</script>

<style scoped>
    .apple-userinfo {
        width: 8.5rem;
        margin: 1.6rem auto;
        text-align: center;
        color: #8A8A8A;
    }

    .apple-userinfo img {
        height: 8.5rem;
        width: 8.5rem;
        border-radius: 50%;
        border: 1px solid #e3e3e3;
        margin-bottom: .4rem;
    }

    .personalInfo-form .mint-button-text {
        font-size: 1.8rem;
        font-weight: 400;
    }

    .topline {
        margin-bottom: 1.6rem;
    }

    .personalInfo-item {
        width: 100%;
        height: 5rem;
        background: #ffffff;
        border-bottom: 0.1em solid #E3E3E3;
    }

    .personalInfo-item-label {
        float: left;
        width: 30%;
        height: auto;
        text-align: left;
    }

    .personalInfo-item-label>span {
        line-height: 5rem;
        margin-left: 1.3rem;
        color: #8A8A8A
    }

    .personalInfo-item-input {
        float: left;
        width: 70%;
        height: auto;
        position: relative;
    }

    .positionIcon {
        position: absolute;
        right: 0;
        top: 0;
        color: #B6B6B6;
        width: 10%;
    }
    /*placeholder颜色*/

    *::-webkit-input-placeholder {
        color: #DDDDDE;
    }

    *:-moz-placeholder {
        color: #DDDDDE;
    }

    *:-ms-input-placeholder {
        /* IE10+ */
        color: #DDDDDE;
    }

    .personalInfo-item-input>input {
        width: 90%;
        height: 2.5em;
        margin-top: 0.4em;
        -webkit-user-select :none;
    }

    .apply-buttom {
        height: auto;
        width: 100%;
        margin-top: 5.4rem;
    }

    .mint-button {
        background-color: #F0870C;
        color: #ffffff;
        border-radius: 0 !important;
        height: 4.6rem;
    }

    .mint-button-text {
        font-weight: 400;
        font-size: 1.8rem;
    }

    .mint-button::after {
        background: none;
    }

    .personalInfo-item-selectArea {
        float: left;
        width: 70%;
        height: auto;
        padding-top: 1.4rem;
    }

    .personalInfo-item-selectArea .areaName {
        float: left;
        width: 80%;
        color: #B6B6B6;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .personalInfo-item-selectArea .province {
        float: left;
        width: 30%;
        color: #B6B6B6;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .personalInfo-item-selectArea .city {
        float: left;
        width: 30%;
        color: #B6B6B6;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .personalInfo-item-selectArea .selectIcon {
        float: right;
        width: 10%;
        color: #B6B6B6;
    }

    .personalInfo-item-selectArea .selectLabel {
        float: right;
        text-align: right;
        width: 30%;
        color: #B6B6B6;
    }

    .showSelect .mint-popup-3 {
        height: 40% !important;
        width: 100%;
        background: none;
    }

    .showSelect .selectArea-page {
        padding-bottom: 3.4%;
        bottom: 0;
        background: #fff;
    }

    .picker {
        background: #fff;
        border-top: 1px solid #E3E3E3;
    }

    .sign_none {
        background: #dadada;
        cursor: pointer;
    }

    .theme-input {
        color: #B6B6B6;
    }

    .themeText {
        height: 5rem;
        line-height: 5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>
<style>
    .cultivate-sign .mint-button-text {
        font-weight: 400;
        font-size: 1.8rem;
    }
</style>
