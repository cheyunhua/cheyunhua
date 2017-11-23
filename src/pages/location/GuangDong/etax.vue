<script>
export default {
    data() {
        return {

            // 电子税务局
            etaxDepartment: [
                {
                    label: '总体介绍',
                    url: '/newsContent?categorycode=001109012010001001',
                    bgImg: require('src/assets/images/icon/icon_18.png')
                },
                {
                    label: '如何办理实名制',
                    url: '/newsContent?categorycode=001109012010001002',
                    bgImg: require('src/assets/images/icon/icon_22.png')
                },
                {
                    label: '手册指南',
                    url: '/inforpractice?categorycode=001109012010001003',
                    bgImg: require('src/assets/images/icon/icon_16.png')
                },
                {
                    label: '常见问题',
                    url: '/newsContent?categorycode=001109012010001004',
                    bgImg: require('src/assets/images/icon/icon_24.png')
                },
                {
                    label: '涉税查询',
                    url: '/inforpractice?categorycode=001109012010001005',
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

            let shengDm = "440000"
            this.etaxDepartment.forEach((item) => {
                item.url += '&encode=' + shengDm
            })
        },
    },
}

</script>

<template>
    <div>
      <!--
        <v-wx-header title="电子税务局"
                     showLeft/>
                   -->
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
