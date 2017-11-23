<template>
    <div class="content">

        <v-wx-header title="财务专区"
                     showLeft/>

        <v-boss-icon/>

        <v-badge-title title="企业服务" />
        <v-enterprise-service-icon/>

        <v-badge-title title="财税服务" />
        <v-finance-service-icon/>

        <v-badge-title title="热门产品" />
        <v-product-card v-for="item in productItems"
                        :product="item"
                        deadline="起" />

        <v-badge-title title="财务专区" />
        <v-info-card v-for="item in infoItems"
                     :info="item" />

    </div>
</template>
<script>
export default {
    data() {
        return {
            infoItems: [{
                "id": "ABEB6D3C19F99370E7C2E3DB5559DBD2",
                "title": "发票开错怎么办，如何作废，如何开具负数发票",
                "pubDate": 1501721513000,
                "clickTimes": 0,
                "link": "/newsContent?contentId=ABEB6D3C19F99370E7C2E3DB5559DBD2",
                "picture": "/publish/001/001104/0E0148ABE0C2889FD72E53E99FEADDDF.jpg"
            }, {
                "id": "ABEB6D3C19F99370E7C2E3DB5559DBD2",
                "title": "发票开错怎么办，如何作废，如何开具负数发票",
                "pubDate": 1501721513000,
                "clickTimes": 0,
                "link": "/newsContent?contentId=ABEB6D3C19F99370E7C2E3DB5559DBD2",
                "picture": "/publish/001/001104/0E0148ABE0C2889FD72E53E99FEADDDF.jpg"
            }],
            productItems: [{
                "title": "小规模纳税人代理记帐（内资）-零申报",
                "price": "1980.00",
                "goodsCategoryName": "代理记账",
                "content": "专业资深会计为小规模纳税人提供代理记账、纳税申报等服务，VIP客户经理上门服务.....",
                "pcurl": require('../../assets/images/enterprisewx/raw_4.jpeg.jpg'),
                "goodsNumber": 1011001000
            }, {
                "title": "小规模纳税人代理记帐（内资）-零申报",
                "price": "1980.00",
                "goodsCategoryName": "代理记账",
                "content": "专业资深会计为小规模纳税人提供代理记账、纳税申报等服务，VIP客户经理上门服务.....",
                "pcurl": require('../../assets/images/enterprisewx/raw_4.jpeg.jpg'),
                "goodsNumber": 1011001000
            }]
        }
    },
    created() {

    },
    methods: {

    },

}
</script>
<style scoped>
.content {
    background-color: #F0F0F2;
}
</style>
