<template>
    <div class="fwpj zt-page">
        <!-- <v-zt-header title="服务评价" showLeft /> -->

        <div class="serviceEvaluation-tip">
            <div>
                <img :src="loginInfo.headImgUrl" />
                <!-- <img src="http://wx.qlogo.cn/mmopen/AWW2Kbwic7ic2K1yE2pu3K3gMqww90ECwxtAOL8ykVcPLd5Cs3643frWMhJ1IMh4ZCDPxWCfiaupY6lexRCUnb1PY4L51IgE8OL/0" /> -->
            </div>
            <div>
                <span>我是服务人员</span>
                <span class="colored">{{userName?userName:'未登录'}}，</span>
                <span v-if="rygh">工号：{{rygh}}，</span>
                <span>请您对我的服务进行评价。</span>
            </div>
        </div>
        <div class="line"></div>
        <div class="serviceEvaluation-QRCode">
            <img :src="QRCodeUrl" />
        </div>

        <div class="serviceEvaluation-label">
            扫码评价
        </div>

    </div>
</template>

<script>
import QRCode from '../../../assets/images/u110.jpg';
import async from 'src/api/async'
import { Toast, Indicator, MessageBox } from 'mint-ui';
// 驻厅登陆信息
const ZT_LOGIN_INFO = 'ZT_LOGIN_INFO'
export default {
    data() {
        return {
            loginInfo: {},
            userName: '',
            rygh: '',
            appId: '',
            QRCodeUrl: '',
        }
    },
    methods: {
        getQRcode() {
            var params = {};
            params.appId = this.appId
            //params.appId = 'wxbddd4557e409cd1c'
            params.ywlx = 'yypt_fwpj'
            params.rygh = this.rygh
            params.userName = this.userName
            params.userId = this.loginInfo.userId

            if (params.appId == null || params.appId == '') {
                Toast('人员所属微信公众号appId为空，无法生成二维码');
                return

            }
            async(this, 'getQrCode', params, res => {
                //console.info("res  =" + response.data.head.errorMsg);
                var ticket = res.body.ticket;
                // console.info("ticket=" + ticket);
                var imgurl = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + ticket;
                this.QRCodeUrl = imgurl;

            })
        }
    },

    mounted() {
        this.loginInfo = JSON.parse(localStorage.getItem(ZT_LOGIN_INFO))
        this.userName = this.loginInfo.userName
        this.rygh = this.loginInfo.seriaNo ? this.loginInfo.seriaNo : ''
        this.appId = this.loginInfo.appId ? this.loginInfo.appId : ''
        this.getQRcode()
    },
}
</script>

<style scoped>
.colored {
    color: #f17712;
}
.fwpj {
    height: 100%;
    width: 100%;
    background: #ffffff;
}
.fwpj .serviceEvaluation-tip {
    margin: 0 auto;
    padding: 2em 0;
    height: auto;
    width: 92%;
    display: flex;
    display: -webkit-flex;
    align-items: center;
}
.serviceEvaluation-tip span {
    font-size: 1.3rem;
    font-weight: normal;
    line-height: 1.5;
}
.fwpj .serviceEvaluation-tip img {
    width: 8rem;
    height: 8rem;
    margin-right: 1.2rem;
    border-radius: 50%;
}
.fwpj .serviceEvaluation-QRCode {
    height: auto;
    width: 100%;
    margin-top: 2rem;
}
.fwpj .serviceEvaluation-QRCode>img {
    margin: 0 auto;
    /* height: 17em; */
    width: 80%;
    display: block;
}
.fwpj .serviceEvaluation-label {
    width: 100%;
    text-align: center;
    /* margin-top: 1em; */
    color: #868686;
    font-size: 1.4rem;
}
.fwpj .line {
    height: 1rem;
    background: #f3f3f3;
}
</style>
