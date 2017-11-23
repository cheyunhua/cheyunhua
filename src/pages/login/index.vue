<template>
    <div class="page-field">
        <header>
            <div class="navTit">
                <div class="navBt">
                    登录
                </div>
            </div>
        </header>
        <div class="wrapper">
            <div class="row fx-white index-content">
                <div class="col-xs-4" style="text-align:left;font-size: 14px">手机号码</div>
                <div class="col-xs-3"><input type="" name=""  value="" v-model="params.phone" placeholder="请输入手机号码" style="font-size: 14px;" /></div>
            </div>
            <div class="row fx-white index-content">
                <div class="col-xs-4" style="text-align:left;font-size: 14px">验证码</div>
                <div class="col-xs-3"><input type="" name=""  value="" v-model="params.captchaCode" placeholder="验证码" style="font-size: 14px;"/></div>
                <div class="col-xs-4 fc-color-orange" v-on:click="captcha()"  :style="this.stop==true?'border: 0.1rem solid #dadada;color:#dadada;float: right;':'float: right'" ><font size="1.8rem" >{{validText}}</font></div>
            </div>
        </div>
        <div class="page-part">
            <div class="login" v-on:click="userLogin();">{{loginText}}</div>
        </div>
    </div>
</template>
<script type="es6">
    import config from '../../api/config';
    import api from '../../api/';
    import _track from '../../api/track';
    import { mapState } from 'vuex';
    import { Toast,Indicator  } from 'mint-ui';
    import '../../assets/css/login.css';

    const WX_USER_ID = 'wx.user.id';
    const WX_USER_CODE = 'wx.user.code';
    const WX_USER_ENCODE = 'wx.user.encode';
    const WX_USER_CUSTSTORELIST = 'wx.user.custStoreList';
    const WX_USER_TOKEN="wx.user.token";
    const WX_USER_PHONE='wx.user.userPhone'
    const localStorage = global.localStorage;

    export default {
        data () {
            return {
                params:{
                    phone:'',
                    userAccount:'',
                    userPassword:'',
                    captchaCode:'',
                    code:'',
                },
                validText:'获取验证码',
                loginText:'登录',
                onLogin:false,
                timer: 60,       //默认倒数30秒
                stop : false,   //默认是停止的，但界面加载之后会变成false
                Interval:null,  //setInterval的对象
                isCatchCode:1
            }
        },
        //通过路由的before钩子解除router-view缓存限制
        //相对于组件来说的，而且应该是在路由进入之前开始准备的
        //所以beforeRouteEnter是调用ajax的时机
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.loginText = '登录';
                vm.onLogin = false;
                vm.captchCode = '';
            });
        },
        //在组件的生命周期完成后，且旧路由即将切换走，新路由beforeEach的时机执行

        beforeRouteLeave(to, from, next){
            next();
        },
        //在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用
        beforeCreate() {
            console.log("come beforeCreate");
            this.$store.dispatch('accountLoginInit');
        },
        //mounted 是生命期钩子
        mounted(){
            this.params.code=this.$route.query.code;
            //alert(this.params.code);
        },
        //computed相当于属性的一个实时计算，如果实时计算里关联了对象，那么当对象的某个值改变的时候，同事会出发实时计算
        computed: mapState({
            success: state => state.account.login.success,
            failure: state => state.account.login.failure,
            loginTime: state=>state.account.login.loginTime,
        }),
        //监听某个值（双向绑定）的变化，一旦发生变化，就调用引号里的方法，从而达到change事件监听的效果！
        watch: {
            //Vue.set(state.login, 'success', true);
            success: 'successWatcher',
            failure: 'failureWatcher',
            loginTime:'successWatcher',
            //'$route':'initLogin',
        },
        created(){
        },
        methods: {
            successWatcher(val, oldVal) {
                //埋点:登陆成功后，记录个人信息
                _track._track_setUser(localStorage.getItem("wx.user.id"),localStorage.getItem("wx.user.userPhone"),'001','WX');
                console.log('登陆成功')
                clearInterval(this.Interval);
                this.validText="获取验证码";
                /*	let redirectUrl = window.sessionStorage.getItem('redirect_url');
                 if (val && !oldVal) {
                 Indicator.close();
                 this.loginText = '登录成功,正在跳转...'

                 if(!redirectUrl){
                 redirectUrl = this.$route.query.redirect_url || '/';
                 }

                 }*/
                Indicator.close();
                this.$router.push('/detail');
            },
            failureWatcher() {
                console.log('登陆失败')
                this.loginText = '登录';
                Indicator.close();
            },
            update () {
                if(this.timer <= 0)
                {
                    this.timer = 60;
                    this.validText="重新发送";
                    clearInterval(this.Interval);
                    this.stop=false;
                }
                else{
                    this.timer--;
                    this.validText="重新发送("+this.timer+'s)';
                    console.log("hdk");

                }

            },
            startTimer () {
                //如果是false就开始倒计时，如果是true就停止倒计时
                if(this.stop == false)
                {
                    this.Interval = setInterval(this.update,1000);
                }
                else
                {
                    clearInterval(this.Interval);
                }

                this.stop = !this.stop;
            },
            loading(){
                this.loginText = '登录中...'
                Indicator.open({
                    text: this.loginText,
                    spinnerType: 'snake'
                });
            },
            userLogin() {
                if(!this.params.phone){
                    Toast('号码不能为空');
                    return
                }
                if(!(/^1[34578]\d{9}$/.test(this.params.phone))){
                    Toast('号码格式不正确');
                    return
                }
                try{
                    if(this.isCatchCode==1){
                        Toast('请先获取验证码');
                        return;
                    }
                }catch(e){
                    console.log("提示失败");
                }
                if(!this.params.captchaCode){
                    Toast('验证码不能为空');
                    return;
                }
                //this.params.code=this.params.appCode;
//				this.onLogin = true;
                //埋点
                _track._trackEvent("JCDZ_WX","登陆",this.params.phone,"");
                //调用store中的accountLoginSubmit方法
                this.$store.dispatch('accountWechatLoginSubmit', this.params);
            },
            initLogin(){
                console.log("初始化登录设置");
                this.$store.dispatch('accountLoginInit');
            },
            captcha() {
                if(this.stop==true){
                    Toast('收不到短信,请在'+this.timer+'s'+'重新发送');
                    return;
                }


                if(!this.params.phone){
                    Toast('号码不能为空');
                    return
                }
                this.params.mobilePhone=this.params.phone;
                if(!(/^1[34578]\d{9}$/.test(this.params.phone))){
                    Toast('号码格式不正确');
                    return
                }
                this.isCatchCode=0;

                //埋点
                _track._trackEvent("JCDZ_WX","获取登陆验证码",this.params.phone,"");
                //调用store中的accountLoginSubmit方法
                this.$store.dispatch('wechatCaptcha', this.params);
                this.startTimer();
            },
        }
    }
</script>
<style scoped>
    .page-part {
        margin-top: 3rem;
    }
    .mint-button {
        background-color: #4cd964
    }
    .mint-header {
        background-color: #f7f7f8;
        border-bottom: 1px solid #e7e7e7;
        color: #3d4145;
    }
    img {
        width:4rem;
        margin-top:0.5rem;
    }
    .wrapper{
        padding:0;
    }
</style>
