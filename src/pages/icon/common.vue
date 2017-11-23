<script>
import { Indicator, Toast } from 'mint-ui'
import api from 'src/api'
export default {
    data() {
        return {
            // 财税业务
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

            // 电子税务局
            etaxDepartment: [
                {
                    label: '总体介绍',
                    url: '/newsContent?categorycode=001109011',
                    bgImg: require('../../assets/images/icon/icon_18.png')
                },
                {
                    label: '如何办理实名制',
                    url: '/newsContent?categorycode=001109008',
                    bgImg: require('../../assets/images/icon/icon_22.png')
                },
                {
                    label: '手册指南',
                    url: '/inforpractice?categorycode=001109009',
                    bgImg: require('../../assets/images/icon/icon_16.png')
                },
                {
                    label: '常见问题',
                    url: '/newsContent?categorycode=001109010',
                    bgImg: require('../../assets/images/icon/icon_24.png')
                },
            ],


        }
    },
    mounted() {
        this.mountProvinceCode()
    },
    methods: {
        mountProvinceCode() {
            let dmQs = '&shengDm=' + this.$route.query.shengDm
            this.taxBusiness.forEach((item) => {
                item.url += dmQs
            })
            let encode = '&encode=' + this.$route.query.shengDm
            this.etaxDepartment.forEach((item) => {
                item.url += encode
            })
        },

    },
}

</script>

<template>
    <div>
        <v-wx-header title="办税专区"
                     showLeft/>

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
