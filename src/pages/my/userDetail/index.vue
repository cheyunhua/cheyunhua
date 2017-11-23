<script>
import imgUpload from './imgUpload'
import async from 'src/api/async'
import { mapState } from 'vuex'

export default {
    components: {
        imgUpload
    },
    data() {
        return {
            phone: {
                textMain: '',
            },
            userName: {
                // 主界面的text
                textMain: '',
                // popup中输入的text
                text: '',
                state: '',
                popup: false
            },
            email: {
                textMain: '',
                text: '',
                state: '',
                popup: false
            },
        }
    },
    computed: mapState({
        userId: state => state.account.auth.userId,
    }),
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.init()
        });
    },
    methods: {
        init() {
            async(this, 'queryUserInfoByUserId', { userId: this.userId }, res => {
                if (res.body) {
                    this.phone.textMain = res.body.mobilePhone ? res.body.mobilePhone : ''
                    this.userName.textMain = res.body.userName ? res.body.userName : ''
                    this.email.textMain = res.body.email ? res.body.email : ''
                }
            })
        },
        userNameConfirm() {
            let param = {
                token: localStorage.getItem('wx.user.token'),
                nickName: this.userName.text
            }
            async(this, 'wechatUpdateUserNikeName', param, res => {
                this.userName.textMain = this.userName.text
                this.userName.popup = false
            })
        },
        emailConfirm() {
            let param = {
                token: localStorage.getItem('wx.user.token'),
                email: this.email.text
            }
            async(this, 'wechatUpdateUserEmail', param, res => {
                this.email.textMain = this.email.text
                this.email.popup = false
            })
        }

    },
    watch: {
        'email.text': function() {
            this.email.state = /[\w-\.]+@([\w-]+\.)+[a-z]{2,6}/i.test(this.email.text) ? 'success' : 'error'
        },
        'userName.text': function() {
            this.userName.state = this.userName.text === '' ? 'error' : 'success'
        },

    }
}
</script>

<template>
    <div>
        <v-wx-header title="个人信息"
                     style="margin-bottom:2.5rem;"
                     @click.capture.stop.native="$router.push('/wx?tab=my')"
                     showLeft/>

        <mt-cell title="头像">
            <img-upload></img-upload>
        </mt-cell>

        <mt-field label="手机号码"
                  v-model="phone.textMain"
                  @click.native="$router.push('/bindPhone')">
            <i class="icon iconfont icon-jiantou-copy1"></i>
        </mt-field>
        <mt-field label="昵称"
                  class="custom"
                  disabled
                  @click.native="userName.popup=true"
                  v-model="userName.textMain">
            <i class="icon iconfont icon-jiantou-copy1"></i>
        </mt-field>
        <mt-field label="邮箱"
                  class="custom"
                  disabled
                  @click.native="email.popup=true"
                  v-model="email.textMain">
            <i class="icon iconfont icon-jiantou-copy1"></i>
        </mt-field>

        <!-- popups -->
        <mt-popup v-model="userName.popup"
                  position="right"
                  :modal="false">
            <mt-field label="昵称"
                      type="text"
                      class="border custom"
                      :state="userName.state"
                      v-model="userName.text">
            </mt-field>
            <div class="btn-group">
                <mt-button @click.native="userNameConfirm"
                           :disabled="userName.state!=='success'"
                           size="large"
                           type="primary">确定</mt-button>
                <mt-button @click.native="userName.popup=false;userName.text=''"
                           size="large">取消</mt-button>
            </div>
        </mt-popup>

        <mt-popup v-model="email.popup"
                  position="right"
                  :modal="false">
            <mt-field label="邮箱"
                      type="email"
                      class="border custom"
                      :state="email.state"
                      v-model="email.text">
                <i class="icon iconfont icon-jiantou-copy1"></i>
            </mt-field>
            <div class="btn-group">
                <mt-button @click.native="emailConfirm"
                           :disabled="email.state!=='success'"
                           size="large"
                           type="primary">确定</mt-button>
                <mt-button @click.native="email.popup=false;email.text=''"
                           size="large">取消</mt-button>
            </div>
        </mt-popup>

    </div>
</template>

<style scoped>
.mint-cell.mint-field {
    height: 6rem;
    margin-top: 2rem;
}
.mint-popup {
    width: 100%;
    height: 100%;
    background-color: #F3F3F3;
    padding: 1rem;
    padding-bottom: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
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
.border {
    border: 1px solid #ccc;
}
</style>
