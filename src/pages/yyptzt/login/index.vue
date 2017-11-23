<script>
import async from 'src/api/async'
import nav from 'src/router/nav'
import { Toast } from 'mint-ui'
// 驻厅登录信息
const ZT_LOGIN_INFO = 'ZT_LOGIN_INFO'
export default {
    data() {
        return {
            captchImg: null,
            captchaClientId: null,
            captchaCode: null,
            loginName: null,
            password: null,
        }
    },
    created() {
        this.getCaptcha()
    },
    methods: {
        getCaptcha() {
            async(this, 'wechatCaptcha', {}, res => {
                this.captchImg = "data:image/jpeg;base64," + res.body.captchaData
                this.captchaClientId = res.body.captchaClientId
            })
        },
        login() {
            if (!this.loginName || !this.password || !this.captchaCode) {
                Toast('请输入完整信息后再尝试登录')
                return
            }
            let params = {
                captchaClientId: this.captchaClientId,
                loginName: this.loginName,
                password: this.password,
                captchaCode: this.captchaCode,
            }
            async(this, 'unifiedLogin', params, res => {
                localStorage.setItem(ZT_LOGIN_INFO, JSON.stringify(res.body))
                this.$router.push('/yyptzt/entry')
            })
        },
        nav,
    },
}
</script>
<template>
    <div class="zt-page">
        <!-- <v-zt-header title="登录" /> -->
        <div class="zt-body">
            <div class="zt-content"
                 @keyup.enter="login">
                <input type="text"
                       v-model="loginName"
                       placeholder="请输入您的工号或登录账号">
                <input type="password"
                       v-model="password"
                       placeholder="请输入密码">
                <div class="captcha">
                    <input type="number"
                           v-model="captchaCode"
                           placeholder="请输入验证码">
                    <div class="code">
                        <img :src="captchImg"
                             @click.stop="getCaptcha"
                             alt="验证码加载失败">
                    </div>
                </div>
                <mt-button class="cus-mt-button-zt"
                           @click.stop="login"
                           size="large">登录</mt-button>
                <span @click.stop="nav('http://pt.jchl.com/admin/main/forgetPassword.html')"
                      class="forget-btn">忘记密码</span>
            </div>
        </div>
        <div class="zt-foot">
            <p>运营平台驻厅版本1.1</p>
        </div>
    </div>
</template>

<style scoped>
.cus-mt-button-zt {
    margin: 2rem 0;
}
.zt-page {
    display: flex;
    min-height: 100%;
    flex-direction: column;
}
.zt-foot {
    background-color: #fff;
    padding-bottom: 2rem;
}
.zt-foot>p,
.forget-btn {
    font-size: 1.4rem;
    color: #adadad;
    text-align: center;
}
.captcha {
    display: inline-flex;
    align-items: center;
    margin: .8rem 0;
    width: 100%;
}
.captcha>input {
    flex: 1;
}
.code {
    flex: 1;
    margin-left: 1rem;
}
.zt-body {
    background-color: #fff;
    flex: auto;
    display: flex;
    justify-content: center;
}
.zt-content {
    width: 80%;
    margin-top: 2rem;
}
input {
    border-bottom: 1px solid #e2e2e2;
    padding: 1rem 1rem;
    margin: 1rem 0;
    width: 100%;
    font-size: 1.6rem;
    border-radius: 0;
}
::placeholder {
    color: #cacaca;
}
</style>
