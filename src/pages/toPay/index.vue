<template>
	<div>
		<div class="topay-tip">
			正在跳转到支付页面，请稍等...
		</div>
	</div>
</template>
<style>
.topay-tip {
    height: 100%;
    width: 100%;
    text-align: center;
    margin-top: 10em;
    color: #FF7043;
}
</style>
<script>
    import {mapState} from 'vuex';
    import api from '../../api/';
    import {Toast} from "mint-ui";
    const localStorage = global.localStorage;
    const WX_USER_PHONE = 'wx.user.userPhone';
    const WX_USER_TOPAY_ORDER = 'wx.user.wait.topay.order';
    export default{
        name: 'page-topay',
        //数据绑定
        data: function () {
            return {
                code: '',
                wechatCode: '',
                orderParams:''
            }
        },
        computed: mapState({
            login: state => state.account.auth.check()
        }),
        //定义额外方法
        methods: {
            toPay() {
                this.orderParams = JSON.parse(localStorage.getItem(WX_USER_TOPAY_ORDER));

                //this.orderParams.code =  this.code;
                //this.orderParams.wechatCode =  this.wechatCode;

                if(this.orderParams.orderId){
                    //已经存在的订单付款
                    var param = {};
                    param.userId = localStorage.getItem("wx.user.id");
                    param.cusName = localStorage.getItem("wx.user.name");
                    //param.cusName = "congtou";
                    param.cusType = '0';
                    param.orderCode = this.orderParams.orderCode;
                    param.price = this.orderParams.payAmount;
                    param.payNo = this.orderParams.payNo;
                    param.mobilePhone = localStorage.getItem(WX_USER_PHONE);
                    param.wechatCode = this.wechatCode;
                    param.code = this.code;
                    //param.wechatCode = "WECHAT_CUS_DEV";
                    //param.code = "111";

                    this.unPayOrderToPay(param);
                }else{
                    //创建订单后付款
                    this.orderParams = JSON.parse(localStorage.getItem(WX_USER_TOPAY_ORDER));
                    this.orderParams.wechatCode = this.wechatCode;
                    this.orderParams.code = this.code;
                    //this.orderParams.wechatCode = "WECHAT_CUS_DEV";
                    //this.orderParams.code = "111";
										console.log("topayOrder" + this.orderParams.cusName);
                    this.addOrderAndPay(this.orderParams);
                }

            },
            //已经存在的订单付款
            unPayOrderToPay(params){
                api.unPayOrderToPay(params).then((response) => {
                    console.log('unPayOrderToPay')
                    if(response.data.head.errorCode === '0'){
                        var temparams = response.data.body;
                        if(temparams != null){
                            var payUrl = temparams.payUrl;
                            Toast("正在跳转到付款页面~~");
                            window.location.href=payUrl;
                        }
                    }
                    else{
                        Toast(response.data.head.errorMsg);
                    }
                }).catch((response) => {
                    Toast(response.data.head.errorMsg);
                });
            },
            //创建订单后付款
            addOrderAndPay(params){
                api.addOrderAndPay(params).then((response) => {
                        console.log('addOrderAndPay')
                        if(response.data.head.errorCode === '0'){
                            var temparams = response.data.body;
                            if(temparams != null){
                                var payUrl = temparams.payUrl;
                                Toast("提交订单成功！");
                                localStorage.setItem("wx.pay.finish.url","wx");
                                window.location.href=payUrl;
                            }
                        }
                        else{
                            Toast(response.data.head.errorMsg);
                        }
                })
                .catch((response) => {
                    Toast(response.data.head.errorMsg);
                });
            },
            //获取code和wechatcode
            getCodeAndWeChatCode(){
	            this.code = api.getQueryString("code");
	            if(!this.code){
	              this.code =  this.$route.query.code;
	            }
	            this.wechatCode = api.getQueryString("state");
	            if(!this.wechatCode){
	              this.wechatCode =  this.$route.query.state;
	            }
            },
            fetchData(){
            	var self = this;
                console.info("created: self.login=" + self.login);
                //if (self.login) {
                    self.getCodeAndWeChatCode();
                    self.toPay();
                //}
            },

        },
        //初始化执行的方法
        created(){
        	this.fetchData();
        },
        //通过路由的before钩子解决router-view缓存页面问题
        beforeRouteEnter (to, from, next) {
            next(vm => {

            });
        },
        mounted() {
        },
        watch:{

        }
    }
</script>
