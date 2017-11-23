<template>
    <div class="wdewm zt-page">
        <!-- <v-zt-header title="我的二维码" showLeft /> -->

        <div class="myQRCode-QRCode">
            <div class="img-wrapper">
                <div class="cat">
                    <img :src="catHand"
                         class="cat-hand">
                    <img :src="catHead"
                         :class="catHeadClass">
                    <img :src="catHand"
                         class="cat-hand">
                </div>
                <img class="myQRCode-img"
                     :src="QRCodeUrl" />
            </div>
            <div class="myQRCode-label">
                微信扫一扫，关注金财互联
            </div>
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
            QRCodeUrl: '',
            catHand: require('../../../assets/images/zt/cat_06.png'),
            catHead: require('../../../assets/images/zt/cat_03.png'),
            catHeadClass: 'cat-head',
        }
    },
    methods: {
        getQRcode() {
            var params = {};
            params.userId = this.loginInfo.userId
            params.appId = this.loginInfo.appId
            //params.appId = 'wxbddd4557e409cd1c'
            params.ywlx = 'yypt_myqrCode'

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

            });
        }
    },
    created() {
        this.loginInfo = JSON.parse(localStorage.getItem(ZT_LOGIN_INFO))
        this.userName = this.loginInfo.userName
        this.rygh = this.loginInfo.seriaNo ? this.loginInfo.seriaNo : ''
        this.getQRcode()

    }
}
</script>

<style scoped>
.cat {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 80px;
}
.cat-head {
    width: 20%;
    display: block;
}
.cat-hand {
    width: 4%;
}
.wdewm {
    height: 100%;
    width: 100%;
    background: #ffffff;
}
.wdewm .myQRCode-QRCode {
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
}
.myQRCode-img {
    margin: 0 auto;
    width: 80%;
    display: block;
}
.wdewm .myQRCode-label {
    width: 100%;
    text-align: center;
    color: #868686;
    font-size: 1.4rem;
}
</style>
