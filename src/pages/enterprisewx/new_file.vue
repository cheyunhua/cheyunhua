<template>
    <div>
        <v-wx-header title="老板专区" />
        <!-- <div class="inc-serve"> -->
        <v-boss-icon></v-boss-icon>
        <!-- </div> -->
        <!-- <div class="inc-hotproduct"> -->
        <!-- <section class="inc-hotproduct-title"> -->
        <v-badge-title title="热门产品"></v-badge-title>
        <!-- </section> -->
        <div v-for="item in items"
             @click="$router.push(item.productCode)">
            <v-product-card :product="item" />
        </div>
        <!-- </div> -->
    </div>
</template>
<style scoped>
/* .mint-header {
    background-color: #ff7043 !important;
}
.mint-header-title {
    margin: 0;
}
.inc-serve {
    background: #fff;
}
.inc-hotproduct-title>div {
    margin-bottom: 0;
}
.inc-serve .sc {
    width: 100%;
}
.inc-serve .sc-label {
    margin-top: .4rem;
} */
</style>
<script>
import icon01 from '../../assets/images/enterprisewx/raw_4.jpeg.jpg';
import icon02 from '../../assets/images/enterprisewx/raw_4.jpeg.jpg';
import icon03 from '../../assets/images/enterprisewx/raw_5.jpeg.jpg';
import icon04 from '../../assets/images/enterprisewx/raw_6.jpeg.jpg';
import icon05 from '../../assets/images/enterprisewx/ent_01.jpg';
import icon06 from '../../assets/images/enterprisewx/ent_02.jpg';
import icon07 from '../../assets/images/enterprisewx/ent_03.jpg';
import icon08 from '../../assets/images/enterprisewx/ent_04.jpeg';
import icon09 from '../../assets/images/enterprisewx/ent_05.jpeg';
import api from '../../api/';
import async from 'src/api/async';
export default {
    data() {
        return {
            items: [/*{
                "title": "小规模纳税人代理记帐（内资）-零申报",
                "price": "",
                "productShortName": "代理记账",
                "content": "专业资深会计为小规模纳税人提供代理记账、纳税申报等服务，VIP客户经理上门服务.....",
                "pcurl": icon01,
                "productCode": "/product/detail?productCode=AGENCY_ZERO_DECLARATION"
            },
            {
                "title": "小规模纳税人代理记帐（内资）",
                "price": "",
                "productShortName": "代理记账",
                "content": "专业资深会计为小规模纳税人提供代理记账、纳税申报等服务，VIP客户经理上门服务.....",
                "pcurl": icon02,
                "productCode": "/product/detail?productCode=AGENCY_SMALL_INSIDE_CAPITAL"
            },
            {
                "title": "有限责任公司注册",
                "price": "",
                "productShortName": "公司注册",
                "content": "专业工商代办人员为您办理有限责任公司注册服务，服务进展实时更新，VIP客户经理一对一服务.....",
                "pcurl": icon03,
                "productCode": "/product/detail?productCode=ICR_RST_LIMITED_LIABILITY_COMPANY"
            },
            {
                "title": "更换三证合一营业执照",
                "price": "",
                "productShortName": "单项代办",
                "content": "VIP客户经理上门收取相应资料，专业人员为您办理更换三证合一服务，服务进展实时掌握.....",
                "pcurl": icon04,
                "productCode": "/product/detail?productCode=ICR_SINGLE_REPLACE_THREEINONE_BUSINESS_LICENSE"
            },*/
            {
                title: '运输物流企业财富增值服务包',
                content: '物流企业，重磅优惠！小规模纳税人3%，增值税奖励返还36%，实际税负1.92%；一般纳税人11%，正常抵扣6%，增值税奖励返还36%，实际税负3.2%',
                price: '',
                productShortName: '代理记账',
                pcurl: icon07,
                productCode: '/logistics',
            },
            
            {
                title: '信息技术(含动漫)行业财富增值服务包',
                content: '喀什政策送福利，直接享受企业所得税“五免五减”，优惠期满企业可迁移，增值税额外退还上缴25%，个人所得税额外退还20%',
                price: '',
                productShortName: '代理记账',
                pcurl: icon06,
                productCode: '/mobile_it',
            },
            {
                title: '咨询服务企业财富增值服务包',
                content: '节税政策送福利，直接享受企业所得税“五免五减”，增值税额外退还上缴25%，个人所得税额外退还20%',
                price: '',
                productShortName: '代理记账',
                pcurl: icon05,
                productCode: '/consultancy',
            },
            {
                title: '医药服务行业财富增值服务包',
                content: '医药行业两票制税筹专业解决方案，小规模纳税人节税地享综合税费6.69%，节约20.87%；一般纳税人节税地享综合税费9.61%，节约20.28%',
                price: '',
                productShortName: '代理记账',
                pcurl: icon09,
                productCode: '/treatment',
            },
           /* {
                title: '建安行业财富增值服务包',
                content: '总部不须迁移，资质不受影响，总包签约照旧，增值税额外退还上缴25%，个人所得税额外退还20%',
                price: '',
                productShortName: '代理记账',
                pcurl: icon08,
                productCode: '/jahy',
            },*/


            /*{
                title: '软件企业财富增值服务包',
                content: '品简介:喀什政策送福利，直接享受企业所得税”五免五减”，优惠期满企业可迁移，增值税在超3%，税负返还基础上，额外退还上缴25%；',
                price: '',
                productShortName: '代理记账',
                pcurl: icon01,
                productCode: 'ICR_SINGLE_REPLACE_THREEINONE_BUSINESS_LICENSE',
            },*/
            ],
        }
    },

}
</script>
