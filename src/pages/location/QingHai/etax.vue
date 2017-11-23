<script>
export default {
    data() {
        return {
            // 财税业务
            taxBusiness: [
                {
                    label: '纳税服务',
                    url: '/taxBusiness?funType=纳税服务',
                    bgImg: require('src/assets/images/icon/icon_03.png')
                },
                {
                    label: '个人办税',
                    url: '/taxBusiness?funType=个人办税',
                    bgImg: require('src/assets/images/icon/icon_05.png')
                },
                {
                    label: '涉税事项',
                    url: '/taxBusiness?funType=涉税事项',
                    bgImg: require('src/assets/images/icon/icon_07.png')
                },
                {
                    label: '申报缴款',
                    url: '/taxBusiness?funType=申报缴款',
                    bgImg: require('src/assets/images/icon/icon_12.png')
                },
                {
                    label: '发票中心',
                    url: '/taxBusiness?funType=发票中心',
                    bgImg: require('src/assets/images/icon/icon_13.png')
                },
            ],
            // 电子税务局
            etaxDepartment: [
                {
                    label: '总体介绍',
                    url: '/newsContent?categorycode=001109012016005004',
                    bgImg: require('src/assets/images/icon/icon_18.png')
                },
                {
                    label: '如何办理实名制',
                    url: '/newsContent?categorycode=001109012016005003',
                    bgImg: require('src/assets/images/icon/icon_22.png')
                },
                {
                    label: '手册指南',
                    url: '/inforpractice?categorycode=001109012016005002',
                    bgImg: require('src/assets/images/icon/icon_16.png')
                },
                {
                    label: '常见问题',
                    url: '/newsContent?categorycode=001109012016005001',
                    bgImg: require('src/assets/images/icon/icon_24.png')
                },
            ],

        }
    },
    mounted () {
          this.mountProvinceCode()
    },
    methods: {
        mountProvinceCode() {
            let shengDm = "630000"
            this.etaxDepartment.forEach((item) => {
                item.url += '&encode=' + shengDm
            })
            this.taxBusiness.forEach((item) => {
                item.url += '&shengDm=' + shengDm
            })
        },
    },
}

</script>

<template>
    <div>
      <!--
        <v-wx-header title="办税专区"
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
