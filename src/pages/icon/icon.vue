<script>
import { Indicator, Toast } from 'mint-ui'
import api from 'src/api'
export default {
    data() {
        return {
            // 财税业务
            /*
            taxBusiness: [
                {
                    label: '纳税服务',
                    url: 'http://ocsp.esv.com.cn/wxapp/assets/jchl/index.html?gnLx=%E7%BA%B3%E7%A8%8E%E6%9C%8D%E5%8A%A1',
                    bgImg: require('../../assets/images/icon/icon_03.png')
                },
                {
                    label: '个人办税',
                    url: 'http://ocsp.esv.com.cn/wxapp/assets/jchl/index.html?gnLx=%E4%B8%AA%E4%BA%BA%E5%8A%9E%E7%A8%8E',
                    bgImg: require('../../assets/images/icon/icon_05.png')
                },
                {
                    label: '涉税事项',
                    url: 'http://ocsp.esv.com.cn/wxapp/assets/jchl/index.html?gnLx=%E6%B6%89%E7%A8%8E%E4%BA%8B%E9%A1%B9',
                    bgImg: require('../../assets/images/icon/icon_07.png')
                },
                {
                    label: '申报缴款',
                    url: 'http://ocsp.esv.com.cn/wxapp/assets/jchl/index.html?gnLx=%E7%94%B3%E6%8A%A5%E7%BC%B4%E6%AC%BE&code=011DKE4U1fUNH91mMN3U1X645U1DKE4L&state=123&winzoom=1',
                    bgImg: require('../../assets/images/icon/icon_12.png')
                },
                {
                    label: '发票中心',
                    url: 'http://ocsp.esv.com.cn/wxapp/assets/jchl/index.html?gnLx=%E5%8F%91%E7%A5%A8%E4%B8%AD%E5%BF%83',
                    bgImg: require('../../assets/images/icon/icon_13.png')
                },
            ],
            */
            // 财税业务
            taxBusiness: [
                {
                    label: '纳税服务',
                    url: '/taxBusiness?funType=纳税服务',
                    bgImg: require('../../assets/images/icon/icon_03.png')
                },
                {
                    label: '个人办税',
                    url: '/taxBusiness?funType=个人办税',
                    bgImg: require('../../assets/images/icon/icon_05.png')
                },
                {
                    label: '涉税事项',
                    url: '/taxBusiness?funType=涉税事项',
                    bgImg: require('../../assets/images/icon/icon_07.png')
                },
                {
                    label: '申报缴款',
                    url: '/taxBusiness?funType=申报缴款',
                    bgImg: require('../../assets/images/icon/icon_12.png')
                },
                {
                    label: '发票中心',
                    url: '/taxBusiness?funType=发票中心',
                    bgImg: require('../../assets/images/icon/icon_13.png')
                },
            ],
            // 电子税务局
            etaxDepartment: [
                {
                    label: '绑定企业',
                    url: '/bind?',
                    bgImg: require('../../assets/images/icon/icon_31.png')
                },
                {
                    label: '培训报名',
                    url: '/train?',
                    bgImg: require('../../assets/images/icon/icon_17.png')
                },
                {
                    label: '总体介绍',
                    url: '/newsContent?categorycode=001109012020001',
                    bgImg: require('../../assets/images/icon/icon_18.png')
                },
                {
                    label: '如何办理实名制',
                    url: '/newsContent?categorycode=001109012020002',
                    bgImg: require('../../assets/images/icon/icon_22.png')
                },
                {
                    label: '手册指南',
                    url: '/inforpractice?categorycode=001109012020003',
                    bgImg: require('../../assets/images/icon/icon_16.png')
                },
                {
                    label: '常见问题',
                    url: '/newsContent?categorycode=001109012020004',
                    bgImg: require('../../assets/images/icon/icon_24.png')
                },
            ],

            // 财税咨询
            taxConsult: [
                {
                    label: '资讯动态',
                    url: '/jcinformation',
                    bgImg: require('../../assets/images/icon/icon_29.png')
                },
                {
                    label: '我的社区',
                    url: 'http://www.4009912366.com/',
                    bgImg: require('../../assets/images/icon/icon_30.png')
                },
            ],

            wxJsSdkConfig: false,
            stop: false,   //默认是停止的，但界面加载之后会变成false
            Interval: null,  //setInterval的对象
            timer: 1,
        }
    },
    mounted() {
        this.mountProvinceCode()

        if (this.$route.query.manService) {
            this.timer = 1;
            Indicator.open({
                text: '即将进入人工服务',
                spinnerType: 'snake'
            });
            this.startTimer();
        }
    },
    methods: {
        mountProvinceCode() {

            this.taxBusiness.forEach((item) => {
                item.url += '&shengDm=440000'
            })
            this.etaxDepartment.forEach((item) => {
                item.url += '&encode=100000'
            })
        },
        startManService() {
            var param = {};
            Indicator.open({
                text: '请求中....',
                spinnerType: 'snake'
            });
            param.appCode = api.getQueryString("code");
            param.wechatCode = api.getQueryString("state");
            api.startArtificiallyService(param)
                .then((response) => {
                    // debugger;
                    Indicator.close();
                    if (response.data.head.errorCode == '0') {
                        console.log("进入人工服务");
                        WeixinJSBridge.call("closeWindow");
                    } else {
                        console.log("进入人工服务失败");
                        Toast("请稍后重试！");
                    }
                }).catch((response) => {
                    Indicator.close();
                    Toast("请稍后重试！");
                });


        },
        /* startManService(){
         location.href=api.startManService();

        },*/
        closeCurrentWindow() {
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
        startTimer() {
            //如果是false就开始倒计时，如果是true就停止倒计时
            if (this.stop == false) {
                this.Interval = setInterval(this.update, 1000);
            }
            else {
                clearInterval(this.Interval);
            }

            this.stop = !this.stop;
        },
        update() {
            if (this.timer <= 0) {
                Indicator.close();
                clearInterval(this.Interval);
                this.closeCurrentWindow();

            }
            else {
                this.timer--;
            }

        },
    },

}

</script>

<template>
    <div>
      <!--
        <v-wx-header title="办税大厅"
                     showLeft/>
                   -->
        <v-badge-title title="财税业务"
                       style="" />
        <div class="icon-group">
            <v-background-icon v-for="item in taxBusiness"
                               :label="item.label"
                               :url="item.url"
                               :bgImg="item.bgImg" />
        </div>

        <v-badge-title title="电子税务局" />
        <div class="icon-group">
            <v-background-icon v-for="item in etaxDepartment"
                               :label="item.label"
                               :url="item.url"
                               :bgImg="item.bgImg" />
        </div>
        <!--
        <v-badge-title title="财税咨询" />
        <div class="icon-group">
            <v-background-icon label="人工服务"
                               @click.native="startManService"
                               url=""
                               :bgImg="require('../../assets/images/icon/icon_28.png')" />
            <v-background-icon v-for="item in taxConsult"
                               :label="item.label"
                               :url="item.url"
                               :bgImg="item.bgImg" />
                             -->
        </div>

    </div>
</template>

<style scoped>
.badge-title {
    margin-top: .5rem;
}
.icon-group {
    display: flex;
    flex-flow: row wrap;
    background-color: white;
    padding: 1rem 0;
}
</style>
