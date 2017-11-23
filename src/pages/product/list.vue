<template>
    <div>
        <div class="fx-header-top fx-orange">
            <i class="glyphicon glyphicon-menu-left fx-ico-left"
               aria-hidden="true"
               v-on:click="goBack()"></i>{{Title}}
        </div>
        <div v-for="(good,index) in goodsList"
             @click="gotoDetail(good.productCode,good.productIntroduction)">
            <!--<v-product-card :product="good"
                            deadline="年起"></v-product-card>-->
            <v-product-card :product="good"></v-product-card>
        </div>
    </div>
</template>

<script type="es6">
import { Toast, Indicator, MessageBox } from 'mint-ui';
import api from '../../api/';
import config from 'src/api/config'
export default {
    data() {
        return {
            Title: '',
            goodsCategoryId: null,
            goodsList: null,
            number:0
        }
    },
    methods: {
        gotoDetail(productCode,productContent){
          //商品详情 存缓存
          //sessionStorage.setItem("productContent", productContent);
          this.$router.push('/product/detail?productCode=' + productCode);
        },
        queryGoods() {
            let _this = this
            var params = {};
            //params.goodsCategoryId= '967ce253c8854350bc2649281f06b18c';
            if (this.$route.query) {
                params.categoryFrontId = this.$route.query.goodsCategoryId;
                _this.Title = this.$route.query.title;
            }
            Indicator.open({
              text: '正在加载...',
              spinnerType: 'triple-bounce'
            });
            api.queryCategory(params).then((response) => {
                Indicator.close();
                if (response.data.body) {
                    _this.goodsList = response.data.body.products;
                    for (var i = 0; i < _this.goodsList.length; i++) {
                        let good = _this.goodsList[i];
                        // good.name = good.nameShorts[0].productName.split('_')[0].split('—')[0].split('-')[0];
                        good.name = good.productName
                        if(good.photoAlbums.length>0){
                          good.imgUrl = good.photoAlbums[0].photoUrl;
                        }
                        good.title = good.productName
                        good.pcurl = good.imgUrl
                        good.price = ""
                        // good.orgPrice = good.orgPrice + "";
                        good.hint = ""
                        good.img = ""
                        good.content = good.productIntroduction
                    }
                }
            }).catch((response) => {
              if(_this.number < 3){
                setTimeout(function(){
                  _this.queryGoods();
                  _this.number++;
                },2000);
              }else {
                Indicator.close();
                Toast("网络异常，请稍后再试");
                _this.goBack();
              }
            });
        },
        goBack: function () {
            window.history.go(-1);
        }
    },
    created() {
    },
    //通过路由的before钩子解除router-view缓存限制
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.queryGoods();
        });
    },
    beforeRouteLeave(to, from, next) {
        next();
    },
    watch: {
    },

    mounted: function () {

    }

}

</script>

<style>

</style>
