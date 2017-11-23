<script>
import StarRating from 'vue-star-rating'
import { Toast } from 'mint-ui'
import async from 'src/api/async'
import api from 'src/api/'
import apiConfig from 'src/api/config'
export default {
    components: {
        StarRating
    },
    data() {
        return {
            serverInfo: {},
            ratings: [
                {
                    label: '服务态度',
                    number: 0,
                },
                {
                    label: '专业能力',
                    number: 0,
                },
                {
                    label: '个人仪表',
                    number: 0,
                },
            ],
            ratingText: ['请选择', '非常不满意', '不满意', '一般', '满意', '非常满意',],

            adviseHolderRestore: '欢迎留下您的意见和建议（选填）',
            adviseHolder: '',
            adviseRequired: false,

            evalDescription: null,
            taxIdentifNumber: null,
            userName: null,
            mobilePhone: null,

        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            window.open('', '_self')
        });
    },
    created() {
        this.adviseHolder = this.adviseHolderRestore
        this.initView()
    },
    methods: {
        initView() {
            let params = {
                userId: this.$route.query.userId,
            }
            async(this, 'wechatUserInfoInHall', params, res => {
                this.serverInfo = res.body
            })
            params = {
                userId: this.$route.query.userId,
                openId: this.$route.query.openId,
            }
            api.queryEvalPersonInfoByOpenId(params).then((res) => {
                if (res.data.head.errorCode === '0' && res.data.body && res.data.body.taxIdentifNumber) {
                    this.taxIdentifNumber = res.body.taxIdentifNumber
                    this.userName = res.body.userName
                    this.mobilePhone = res.body.mobilePhone
                }
            })
        },
        submit() {
            let found = this.ratings.find(item => item.number === 0)
            if (found) {
                Toast(found.label + '尚未评价')
                return
            }
            if (this.adviseRequired && !this.evalDescription) {
                Toast('请填写反馈意见')
                return
            }
            if (!this.taxIdentifNumber || !this.userName || !this.mobilePhone) {
                Toast('请填写基本信息')
                return
            }
            if (!/^1[3|4|5|7|8]\d{9}$/.test(this.mobilePhone)) {
                Toast('手机号格式错误')
                return
            }

            let params = {
                userId: this.$route.query.userId,
                openId: this.$route.query.openId,
                evaluatTime: Date.now(),
                serviceAttitude: this.ratings[0].number,
                majorAbility: this.ratings[1].number,
                personMeter: this.ratings[2].number,
                mobilePhone: this.mobilePhone,
                userName: this.userName,
                taxIdentifNumber: this.taxIdentifNumber,
            }
            if (this.adviseRequired) { params.evalDescription = this.evalDescription }
            async(this, 'servicePersonEvaluation', params, res => {
                params = {
                    openId: this.$route.query.openId,
                    wechatId: this.$route.query.wechatId,
                }
                async(this, 'sendserviceEvaluation', params, res => {
                    // console.log("res ", res);
                    // console.log('评价成功');
                    this.closeCurrentWindow()
                })
            })
        },
        closeCurrentWindow() {
            try {
                WeixinJSBridge.call("closeWindow");
            } catch (e) {
                console.log("WeixinJSBridge    undefined");
                try {
                    parent.WeixinJSBridge.call("closeWindow");
                } catch (e) {
                    console.log("parent.WeixinJSBridge    undefined");
                }
            }
        },
    },
    computed: {
        firstPost() {
            return this.serverInfo.post ? this.serverInfo.post.split(',')[0] : ''
        }
    },
    watch: {
        ratings: {
            handler: function(newValue, oldValue) {
                let index = newValue.findIndex(item => item.number === 1 || item.number === 2)
                if (index < 0) {
                    this.adviseHolder = this.adviseHolderRestore
                    this.adviseRequired = false
                } else {
                    this.adviseHolder = '评分2星及以下需要填写反馈意见（必填）'
                    this.adviseRequired = true
                }
            },
            deep: true
        }
    },
}
</script>
<template>
    <div class="zt-page">
        <!-- <v-zt-header title="服务人员评价" /> -->
        <div class="people-info">
            <div class="peo-left">
                <img :src="serverInfo.headImgUrl"
                     alt="头像加载失败">
            </div>
            <div class="peo-mid">
                <div>
                    <div class="peo-mid-attr">姓名：</div>
                    <!-- <div class="peo-mid-val">的撒大苏</div> -->
                    <div class="peo-mid-val">{{serverInfo.userName}}</div>
                </div>
                <div v-if="serverInfo.seriaNo">
                    <div class="peo-mid-attr">工号：</div>
                    <!-- <div class="peo-mid-val">231232342323</div> -->
                    <div class="peo-mid-val">{{serverInfo.seriaNo}}</div>
                </div>
                <div>
                    <div class="peo-mid-attr peo-mid-gw">岗位：</div>
                    <!-- <div class="peo-mid-val">的撒大苏的撒大苏的撒大苏</div> -->
                    <div class="peo-mid-val">{{firstPost}}</div>
                </div>
            </div>
            <div class="peo-right">
                <div>{{serverInfo.satisfaction?(+serverInfo.satisfaction).toFixed(0):0}}%</div>
                <div>综合满意度</div>
            </div>
        </div>
        <main>
            <div class="center">

                <div class="stars">
                    <div v-for="item in ratings"
                         class="star-row">
                        <div>{{item.label}}</div>
                        <star-rating class="custom-rating"
                                     v-model="item.number"
                                     :star-size="20"
                                     :show-rating="false"
                                     inactive-color="#C8C8C8"
                                     active-color="#f17712"></star-rating>
                        <div>{{ratingText[item.number]}}</div>
                    </div>
                </div>

                <textarea v-model="evalDescription"
                          autocomplete="off"
                          :placeholder="adviseHolder"></textarea>
                <p>请输入您的基本信息：</p>
                <input type="text"
                       id="taxIdentifNumber"
                       v-model="taxIdentifNumber"
                       placeholder="纳税人识别号（必填）">
                <input type="text"
                       v-model="userName"
                       placeholder="姓名（必填）">
                <input type="tel"
                       v-model="mobilePhone"
                       placeholder="手机号（必填）">
            </div>
        </main>
        <mt-button class="cus-mt-button-zt"
                   @click.stop="submit"
                   size="large">提交评价</mt-button>
    </div>
</template>
<style scoped>
.zt-page {
    display: flex;
    min-height: 100%;
    min-height: 100vh;
    flex-direction: column;
}
.stars {
    margin: 2rem 0;
}
.star-row {
    display: inline-flex;
    align-items: center;
    width: 100%;
    margin-top: .8rem;
}
.star-row>div {
    font-size: 1.3rem;
}
.star-row>div:nth-child(1) {
    color: #1b1b1b;
    margin-right: 1.5rem;
}
.star-row>div:nth-child(2) {
    flex: 2;
}
.star-row>div:nth-child(3) {
    flex: 1;
    text-align: right;
    color: #adadad;
}
.people-info {
    background-color: #fff;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    padding: 1rem 0;
}
.peo-left {
    flex: 1.2;
    display: flex;
    justify-content: center;
    margin: 0 1rem;
}
.peo-left>img {
    height: 8rem;
    width: 8rem;
    border-radius: 50%;
}
.peo-mid {
    flex: 2;
    height: 8rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.peo-mid * {
    font-size: 1.3rem;
    color: #c5c5c5;
}
.peo-mid-gw {
    height: 2rem;
}
.peo-mid-attr {
    float: left;
}
.peo-right {
    flex: 1.2;
    text-align: center;
    margin-right: 1rem;
}
.peo-right>div {
    font-size: 1.3rem;
    line-height: 2.5rem;
    color: #c5c5c5;
}
.peo-right>div:first-child {
    font-size: 1.8rem;
    color: #1b1b1b;
}
.peo-mid,
.peo-right {
    display: flex;
    flex-flow: column nowrap;
}
main {
    background-color: #fff;
    flex: 1;
    padding-bottom: 2rem;
}
.center {
    width: 90%;
    margin: 0 auto;
}
textarea {
    width: 100%;
    height: 7rem;
    resize: none;
    font-size: 1.3rem;
    padding: .8rem 1rem;
    margin-bottom: 1rem;
    border-radius: 0;
    -webkit-appearance: none;
    border: 1px solid #bbb;
}
textarea+p {
    color: #1b1b1b;
    font-size: 1.3rem;
}
input {
    border: 1px solid #bbb;
    border-radius: 0;
    padding: 1.5rem 1rem;
    margin: .8rem 0;
    width: 100%;
    font-size: 1.3rem;
    -webkit-appearance: none;
}
</style>
