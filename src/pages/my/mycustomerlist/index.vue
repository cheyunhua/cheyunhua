<template>
    <div>
        <!--   <div class="fx-header-top fx-orange">
             <i class="glyphicon glyphicon-menu-left fx-ico-left" aria-hidden="true" v-on:click="goBack()"></i>企业列表
           </div>-->

        <div class="toptitle"><span class="dot iconfont icon-jiantou" v-on:click="goBack()"></span>企业列表
            <span style="position: absolute;right: 2rem;" @click="bindcompany"> 绑定企业</span>
        </div>

        <div class="listdiv" v-if="custStoreList!=null">
            <ul v-for="custStore in custStoreList" style="margin-bottom: 0px;display: block">

                <router-link :to="{path:'customer', query:{cusId:custStore.custId}}">
                    <a href="#"><img
                        src="../../../assets/images/common/grxx_10.png" alt=""/>{{custStore.custName}}<span><i
                        class="fa fa-angle-right"></i> </span></a>
                </router-link>

            </ul>
        </div>

        <vBlackData v-if="custStoreList==''"></vBlackData>
    </div>
</template>
<style>

</style>
<script>
    import api from '../../../api/';
    import { Toast } from 'mint-ui';
    const localStorage = global.localStorage;
    const WX_USER_ID = 'wx.user.id';
    const WX_USER_PHONE = 'wx.user.userPhone';
    export default{
        data(){
            return {
                custStoreList:''
            }
        },
        methods: {
            bindcompany:function () {
                //console.log("绑定企业")
                var phone=localStorage.getItem(WX_USER_PHONE)||'';

                if(phone==''||phone=='undefined'||phone==null){

                    Toast("请完善个人信息再进行操作");
                    this.$router.push("/bindPhone");
                   // this.$router.push('/bindcompany');

                }else{
                    this.$router.push('/bindcompany');
                }

            },
            goBack: function () {
                window.history.go(-1);
            },
            fetchData(){

                let params = {}

                params.userId = localStorage.getItem(WX_USER_ID)

                api.queryCustfoByUserId(params).then((response) => {

                    if (response.data.body) {

                        this.custStoreList = response.data.body;

                    }
                });

            }
        },

        //通过路由的before钩子解决router-view缓存页面问题
         beforeRouteEnter (to, from, next) {
         next(vm => {
         console.log('-------------route')
         vm.fetchData();
         });
         }
    }
</script>
