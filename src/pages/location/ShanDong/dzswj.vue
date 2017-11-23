<script>
export default {
    data() {
        return {

            // 电子税务局
            etaxDepartment: [
                {
                    label: '地税常见\n问题',
                    url: '/inforpractice?categorycode=001109012013003001',
                    bgImg: require('src/assets/images/icon/icon_24.png')
                },
                {
                    label: '地税总体\n介绍',
                    url: '/newsContent?categorycode=001109012013003002',
                    bgImg: require('src/assets/images/icon/icon_18.png')
                },

            ],

        }
    },
    mounted() {
        this.mountProvinceCode()
    },
    methods: {
        mountProvinceCode() {
            let shengDm = "370000"
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
            <v-wx-header title="办税专区"
                         showLeft/>
                       -->

        <v-badge-title title="电子税务局" />
        <div class="icon-group"
             style="padding: 1rem 0 2.2rem 0;">
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
}
</style>
