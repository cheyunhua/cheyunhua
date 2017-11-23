<script>
import { mapState } from 'vuex'
import async from 'src/api/async'
export default {
    data() {
        return {
            phone: '',
            phoneState: 'warning',
            lockPhone: false,
            countDownStop: true,
            veriCode: '',
            countDownSecond: 60,
            leftSecond: null,
            intervalID: null,
        }
    },
    created() {
        this.leftSecond = this.countDownSecond
    },
    mounted() {
        window.onresize = function() {
            document.querySelector('.row-veri-code').scrollIntoViewIfNeeded();
        }
    },
    methods: {
        startCountDown() {
            this.countDownStop = false
            this.lockPhone = true
            setTimeout(() => {
                this.countDownStop = true
            }, this.countDownSecond * 1000)

            this.intervalID = setInterval(() => {
                --this.leftSecond
                if (this.leftSecond <= 0) {
                    this.lockPhone = false
                    this.leftSecond = this.countDownSecond
                    clearInterval(this.intervalID)
                }
            }, 1000)
        },
        getVeriCode() {
            // let params = {}
            // params.phone = this.phone;
            // this.$store.dispatch('wechatCaptcha', params);
            async(this, 'getBindCaptcha', { mobilePhone: this.phone }, res => {
                this.startCountDown()
            })
        },
        submit() {
            let param = {
                token: localStorage.getItem('wx.user.token'),
                mobilePhone: this.phone,
                captchaCode: this.veriCode
            }
            async(this, 'wechatUpdateUserPhone', param, res => {
                localStorage.setItem('wx.user.userPhone', this.phone)
                this.$router.push('/wx')
            })
        }

    },
    computed: {
        readyToConfrim() {
            return this.phoneState === 'success' && this.veriCode !== ''
        }
    },
    watch: {
        phone: function() {
            this.phoneState = /^1[3|4|5|7|8]\d{9}$/.test(this.phone) ? 'success' : 'error'
        },
    }
}

</script>

<template>
    <div class="sinle-view-port">
        <v-wx-header title="绑定手机"
                     style="margin-bottom:3rem;" />
        <div class="layout">

            <div class="relative">
                <div class="vericode-info"
                     v-if="!countDownStop">
                    <div class="vericode-info-text">验证码已发送，{{leftSecond}}秒后可以重新获取验证码</div>
                    <mt-spinner type="double-bounce"
                                color="#FF7043" />
                </div>
                <mt-field label="手机号码"
                          :readonly="lockPhone"
                          class="custom-filed"
                          type="tel"
                          :state="phoneState"
                          v-model="phone"></mt-field>
            </div>

            <div class="row-veri-code">
                <mt-field label="验证码"
                          class="custom-filed"
                          type="tel"
                          v-model="veriCode"></mt-field>
                <mt-button :disabled="!countDownStop||phoneState!=='success'"
                           size="large"
                           type="primary"
                           @click.native="getVeriCode">获取验证码</mt-button>
            </div>
            <div class="btn-group">
                <mt-button size="large"
                           class="confrim-btn"
                           :disabled="!readyToConfrim"
                           @click.native="submit"
                           type="primary">确定</mt-button>
                <mt-button size="large"
                           @click.native="$router.push('/wx')"
                           type="primary">取消</mt-button>
            </div>

        </div>
    </div>
</template>

<style scoped>
.sinle-view-port {
    height: 100%;
    width: 100%;
}
.vericode-info {
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.vericode-info-text {
    font-size: 1.4rem;
    margin-right: 1rem;
}
.relative {
    position: relative;
    padding-top: 5rem;
}
.layout {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.layout>div {
    width: 90%;
    height: 8rem;
    margin-top: 2rem;
}
.row-veri-code {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.row-veri-code>*:nth-child(1) {
    flex: 1;
}
.row-veri-code>*:nth-child(2) {
    width: 30%;
    margin-left: 1rem;
    position: relative;
    top: .5rem;
}
.mint-button.mint-button--primary {
    background-color: #FF7043;
}
.btn-group {
    margin-top: 3rem;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.btn-group>button {
    width: 40%;
    height: 5rem;
}
</style>
