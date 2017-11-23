<template>
    <div>
        <div v-for="item in items">
            <v-product-card :product="item"
                            deadline="起" />

        </div>
    </div>
</template>

<script>
import api from '../../api/';
export default {
    data() {
        return {
            /*items:null,*/
            items: [{
                "title": "",
                "price": "800.00",
                "hint": "代理记账",
                "content": "专业工商代办人员为您办理有限责任公司注册服务，服务进展实时更新，VIP客户经理一对一服务....."
            },
            {
                "title": "有限责任公司注册",
                "price": "800.00",
                "hint": "代理记账",
                "content": "专业工商代办人员为您办理有限责任公司注册服务，服务进展实时更新，VIP客户经理一对一服务....."
            },
            {
                "title": "有限责任公司注册",
                "price": "800.00",
                "hint": "代理记账",
                "content": "专业工商代办人员为您办理有限责任公司注册服务，服务进展实时更新，VIP客户经理一对一服务....."
            },
            {
                "title": "有限责任公司注册",
                "price": "800.00",
                "hint": "代理记账",
                "content": "专业工商代办人员为您办理有限责任公司注册服务，服务进展实时更新，VIP客户经理一对一服务....."
            },
            ],
            "goodsNumber": "1001001000"
        }
    },
    created() {
        this.queryGoods();
    },
    methods: {
		/*	queryGoods() {
				let _this = this;
				var params = {};
				params.goodsCategoryId= '967ce253c8854350bc2649281f06b18c';
				api.queryGoodsByGoodsCategoryId(params).then((response) => {
					debugger

						console.log(response.data.head.errorMsg);
						if(response.data.body){
							_this.items =response.data.body;
							for (var i = 0; i < _this.items.length; i++) {
								let item = _this.items[i];
								item.price = item.orgPrice+"";
								item.pcurl = "http://183.62.253.122:9002/portal/product/res/images/"+item.goodsNumber+"/head_img.jpg";
							}
						}

				}).catch((response) => {
					debugger
					this.$message.error('哎呀！网络出了点问题，请稍后重试！');
				});
			}*/
    }

}
</script>

<style>

</style>
