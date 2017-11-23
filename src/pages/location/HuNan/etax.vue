<script>
export default {
    data() {
        return {
            // 财税业务
            taxBusiness: [
                {
                    label: '纳税服务',
                    url: 'http://etax.hntax.gov.cn/wxbs/page/index.html#eyJwYXJhbXMiOnt9LCJoYXNoIjoiaW5kZXhfc2VjdGlvbiIsInVybCI6ImluZGV4X3NlY3Rpb24uaHRtbD8ifQ%3D%3D',
                    bgImg: require('src/assets/images/icon/icon_03.png')
                },
                {
                    label: '个人办税',
                    url: 'http://etax.hntax.gov.cn/wxbs/page/index.html#eyJwYXJhbXMiOnt9LCJoYXNoIjoiaW5kZXhfc2VjdGlvbiIsInVybCI6ImluZGV4X3NlY3Rpb24uaHRtbD8ifQ%3D%3D',
                    bgImg: require('src/assets/images/icon/icon_05.png')
                },
                {
                    label: '涉税事项',
                    url: 'http://etax.hntax.gov.cn/wxbs/page/index.html#eyJwYXJhbXMiOnt9LCJoYXNoIjoiaW5kZXhfc2VjdGlvbiIsInVybCI6ImluZGV4X3NlY3Rpb24uaHRtbD8ifQ%3D%3D',
                    bgImg: require('src/assets/images/icon/icon_07.png')
                },
                {
                    label: '申报缴款',
                    url: 'http://etax.hntax.gov.cn/wxbs/page/index.html#eyJwYXJhbXMiOnt9LCJoYXNoIjoiaW5kZXhfc2VjdGlvbiIsInVybCI6ImluZGV4X3NlY3Rpb24uaHRtbD8ifQ%3D%3D',
                    bgImg: require('src/assets/images/icon/icon_12.png')
                },
                {
                    label: '发票中心',
                    url: 'http://etax.hntax.gov.cn/wxbs/page/index.html#eyJwYXJhbXMiOnt9LCJoYXNoIjoiaW5kZXhfc2VjdGlvbiIsInVybCI6ImluZGV4X3NlY3Rpb24uaHRtbD8ifQ%3D%3D',
                    bgImg: require('src/assets/images/icon/icon_13.png')
                },
            ],
        }
    },
    mounted () {

    },
    methods: {

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
