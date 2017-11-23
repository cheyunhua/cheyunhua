<style scoped>
    .user {
        position: relative;
        /*   height: 180px;*/
        /*   background-image: url(../../assets/images/headimg-bg.jpg);*/
        background-position: center center;
        background-size: cover;
    }

    .headimg {
        position: absolute;
        top: 100px;
        bottom: 0;
        left: 50%;
        z-index: 1;
        width: 120px;
        height: 120px;
        margin: 0 0 -40px -60px;
        border-radius: 50%;
        border: 1px solid #ddd;
        background-color: #eee;
        background-size: cover;
        background-position: center center;
        filter: none;
    }

    .user-name {
        padding: 40px 0 50px;
        line-height: 32px;
        text-align: center;
    }
</style>
<template>
    <div style="background-color: #f3f3f3">
        <!--   <div v-if="!isLogin">
               <div class="user"></div>
               <div class="headimg"
               :style="{backgroundImage: 'url(' + userImage + ')'}"></div>
               <div class="user-name" v-if="user && user.userName">{{ userInfo.userName }}</div>
           </div>-->
        <router-link v-if="!isLogin" to="/login">
            <div class="user"></div>
            <div class="headimg"></div>
            <div class="user-name">你还未登录，请先登录！</div>
        </router-link>
        <div v-if="isLogin" class="page-cell">
            <!-- <mt-cell title="服务企业数量" :value="customer.n"></mt-cell> -->

            <!-- <mt-cell title="登录账号" v-if="user && user.loginName" :value="user.loginName"></mt-cell>
            <mt-cell title="姓名" v-if="user && user.userName" :value="user.userName"></mt-cell>
            <mt-cell title="所在门店" v-if="dept && dept.storeDepName" :value="dept.storeDepName"></mt-cell>-->

            <!--<div class="navHead">-->
            <!--<div class="navTop" style="margin-bottom:1.2rem;">个人设置</div>-->
            <div class="navMo" v-on:click="onDetail('个人信息')">
                <div class="userPhoto">
                    <li><img src="../../assets/images/common/photo.png"/></li>
                </div>
                <div class="user">
                    <div class="name">{{ userName }}</div>
                </div>
            </div>
            <!--</div>-->
            <div class="listdiv">
                <ul>
                    <a v-on:click="onDetail('手机号')"><img src="../../assets/images/common/grxx_03.png" alt=""/>手机号<span>{{ userMobilePhone }}</span></a>
                    <a v-on:click="onDetail('邮箱')"><img src="../../assets/images/common/grxx_06.png" alt=""/>邮箱<span>{{ userEmail }}</span></a>
                    <a v-on:click="onDetail('密码')"><img src="../../assets/images/common/grxx_08.png" alt=""/>密码<span>{{userPassword }}</span></a>
                </ul>
            </div>
            <div class="listdiv" style="margin-top:1rem;">
                <ul  v-for="custStore in custStoreList" style="margin-bottom: 0px;"  v-on:click="onDetail(custStore.custName)">

                    <router-link :to="{path:'customer', query:{cusId:custStore.custId}}"><a href="#"><img src="../../assets/images/common/grxx_10.png" alt=""/>{{custStore.custName}}<span><i class="fa fa-angle-right" ></i> </span></a></router-link>

                </ul>
            </div>

            <div class="listdiv" style="margin-top:1rem;">
                <ul  style="margin-bottom: 0px;"  v-on:click="logout()">
                    <a href="#" style="color:red"><img src="../../assets/images/common/exit.png" alt="" height="34" />退出登录<span><i class="fa fa-angle-right" ></i> </span></a>

                </ul>
            </div>

        </div>


    </div>
</template>
<script type="es6">
    import { mapState } from 'vuex';
    import api from '../../api/';
    import _track from '../../api/track';
    import 'src/assets/css/setting.css';
    import { Toast,Indicator,MessageBox  } from 'mint-ui';
    //新增
    export default {
        name: 'me-page',
        data(){
            return {
                customer:{
                    n:100
                },
                userName:null,
                userMobilePhone:null,
                userEmail:null,
                userPassword:'未设置密码',
            }
        },
        computed: mapState({
            isLogin: state => state.account.auth.check(),
            userId: state=>state.account.auth.userId,
            custStoreList:state =>(state.account.auth.custStoreList==''||state.account.auth.custStoreList==undefined)?"":JSON.parse(state.account.auth.custStoreList),
            //userInfo: state=>JSON.parse(state.account.getUserInfo()),
            /*  userImage(){
             console.log(this.isLogin);
             console.log(this.userInfo);
             console.log(this.custStoreList.length);

             },*/

        }),
        methods:{
            onDetail(objName){
                _track._trackEvent("JCDZ_WX","设置",objName);
            },
            loadUserInfo(){
                console.log('路由发送变化doing...');
                console.log(this.userId+",查找个人信息");
//         _track._trackEvent("JCDZ_WX","概览-查看个人信息",this.userId);
                api.queryUserInfoByUserId({userId:this.userId}).then((response) => {
                    console.log(response.data.head);
                    if(response.data.body){
                        this.userName=response.data.body.userName;
                        this.userMobilePhone=response.data.body.mobilePhone;
                        this.userEmail=(response.data.body.email==undefined||response.data.body.email==null||response.data.body.email=='')?"未设置邮箱":response.data.body.email;
                        //      this.userEmail=response.data.body.email==undefined?"未设置邮箱":response.data.body.email;
                    }
                });
            },
            logout(){
                //  var code=localStorage.getItem("wx.user.code");
                //  debugger;
                // consloe.log(code);
                // code="0311Uf9i0UfnCA1bcY9i0A2k9i01Uf9q";
                let that=this;
                MessageBox.confirm('是否退出登录?').then(action => {
                    api.logout().then(function(res){
                        if(res.data.head.errorCode=='0'){
                           /* Toast({
                                message: "退出登录",
                                duration: 3000
                            });*/
                            localStorage.clear();
                            //关闭页面
                            that.closeCurrentWindow();

                        }
                        else{
                            Toast({
                                message: res.data.head.errorMsg,
                                duration: 3000
                            });
                        }
                    }) .catch(function(err){
                        //系统异常
                        Toast({
                            message: '系统异常:'+err,
                            duration: 3000
                        });
                    })
                });
            },
            closeCurrentWindow(){
                try {
                    WeixinJSBridge.call("closeWindow");
                } catch (e) {
                    console.log("WeixinJSBridge    undefined");
                    try{
                        parent.WeixinJSBridge.call("closeWindow");
                    }catch(e){
                        console.log("parent.WeixinJSBridge    undefined");
                    }
                }
            },

        },
        created() {
            var self = this;
            self.loadUserInfo();
        },
        watch:{
            '$route':'loadUserInfo'
        },
        mounted: function () {

        }
    }
</script>
