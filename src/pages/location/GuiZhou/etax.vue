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
        }
    },
    mounted () {
          this.mountProvinceCode()
    },
    methods: {
        mountProvinceCode() {
            let shengDm = "520000"
           /* this.etaxDepartment.forEach((item) => {
                item.url += '&encode=' + shengDm
            })*/
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
