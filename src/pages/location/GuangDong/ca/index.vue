<script>
export default {
    data() {
        return {

            gdgsCA: [
                {
                    label: '网点查询',
                    url: '/gd_ca_net',
                    bgImg: require('src/assets/images/icon/icon_18.png'),
                },
                {
                    label: '如何办理',
                    url: '/newsContent?categorycode=001109012010010001&encode=440000',
                    bgImg: require('src/assets/images/icon/icon_22.png'),
                },
            ],
            gddsCA: [
                {
                    label: '如何办理',
                    url: '/newsContent?categorycode=001109012010010002&encode=440000',
                    bgImg: require('src/assets/images/icon/icon_16.png'),
                },
                // {
                //     label: '我要办理',
                //     url: '',
                //     bgImg: require('src/assets/images/icon/icon_16.png'),
                // },
                // {
                //     label: '资料上传',
                //     url: '',
                //     bgImg: require('src/assets/images/icon/icon_16.png'),
                // },
                {
                    label: '办理进度',
                    url: '/dealPace',
                    bgImg: require('src/assets/images/icon/icon_16.png'),
                },
                {
                    label: '税通号码',
                    url: '/mysthm',
                    bgImg: require('src/assets/images/icon/icon_16.png'),
                },
            ]
        }
    },
    mounted() {

    },
    methods: {

    },
}

</script>

<template>
    <div>
        <v-wx-header title="国地税CA"
                     showLeft/>

        <v-badge-title title="国税CA" />
        <div class="icon-group">
            <v-background-icon v-for="item in gdgsCA"
                               :label="item.label"
                               :url="item.url"
                               :bgImg="item.bgImg" />
        </div>
        <v-badge-title title="地税CA" />
        <div class="icon-group">
            <v-background-icon v-for="item in gddsCA"
                               :label="item.label"
                               :url="item.url"
                               :bgImg="item.bgImg" />
        </div>
        <router-view></router-view>
    </div>
</template>

<style scoped>
.badge-title {
    margin-top: .5rem;
}
.icon-group {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    background-color: white;
    padding: 1rem 0;
}
</style>
