<template>
    <div>
        <div class="navHead">
            <div class="navTop">
                <i class="fa fa-angle-left"
                   @click.capture="$emit('citySelectBack')"></i>
                选择城市
            </div>
        </div>
        <div>
            <div>
                <div class="search">
                    <input type="text"
                           v-model='inputVaule'
                           @input='searchCityByKey(inputVaule)'
                           placeholder="输入城市名或拼音查询">
                </div>
            </div>
            <div v-show='showFlag' style='background-color:#f1f3f2;'>
                <div>
                    <mt-index-list class='blockshow'>
                       <div>
                            <div class="textdis" style='padding-top: 1.5rem;'>
                                <span>定位/历史</span>
                               <!-- <span>定位不准时，请在城市列表中选择</span>-->
                            </div>
                            <div>
                                <!-- 绑定点击事件 -->
                                <!--<mt-button type="default" @click="getCurrentCity">{{guessCity}}</mt-button>-->
                                <mt-button type="default" class="currentPosition elementdis"
                                           @click="getCurrentCity(guessCity,guessCityid,1)">{{guessCity}}</mt-button>
                                 <template v-if='recentSelectCity.length>0'>
                                    <mt-button type="default" class="elementdis"
                                               v-for='item in recentSelectCity'
                                               @click="getCurrentCity(item.split(':')[0],item.split(':')[1],0)">{{item.split(':')[0]}}</mt-button>
                            </template>
                            </div>
                      </div>
                       <div>
                            <div class="textdis">
                                <span>热门城市</span>
                            </div>
                            <div>
                                <mt-button type="default" class="elementdis"
                                           v-for="(item, index) in hotcity"
                                           v-if="index<3"
                                           @click="getCurrentCity(item.name,item.code)">{{item.name}}</mt-button>
                            </div>
                            <div>
                                <mt-button type="default" class="elementdis"
                                           v-for="(item, index) in hotcity"
                                           v-if="index>=3"
                                           @click="getCurrentCity(item.name,item.code)">{{item.name}}</mt-button>
                            </div>
                        </div>
                        <mt-index-section v-for="(value, key, index) in groupcity"
                                          :index='key'
                                          class='blockshow'>
                            <mt-cell v-for="(item, index) in value"
                                     :title="item.areaName"
                                     class='blockshow'
                                     @click.native="getCurrentCity(item.areaName,item.areaCode)"></mt-cell>
                        </mt-index-section>
                    </mt-index-list>
                </div>
            </div>
            <div v-show='!showFlag'>
                <div class='blockshow'
                     style="overflow:auto;height:45rem;">
                    <mt-tab-container-item v-for="(value, key, index) in groupcity"
                                           class='blockshow'>
                        <mt-cell v-for="(item, index) in value"
                                 class='blockshow'
                                 v-if='toSearch(item,inputVaule)'
                                 :title="item.areaName"
                                 @click.native="getCurrentCity(item.areaName,item.areaCode)"></mt-cell>
                    </mt-tab-container-item>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import api from '../../api/';
import { Search, Toast, Button, IndexList, IndexSection, TabContainerItem } from 'mint-ui';
import axios from 'axios';
import { mapMutations } from 'vuex'
var wx = require('weixin-js-sdk');
Vue.component(Search.name, Search);
Vue.component(Button.name, Button);
Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);
Vue.component(TabContainerItem.name, TabContainerItem);

 const WX_USER_WECHAT_CODE = "wx.user.wechat.code";

export default {
    data() {
        return {
            inputVaule: '', // 搜索地址
            guessCity: '',   //当前城市
            guessCityid: '', //当前城市id
            recentSelectCity: [], //最近选择的城市
            //            hotcity: ['上海市', '北京市', '广州市', '成都市', '天津市', '杭州市'],//热门城市列表
            hotcity: [{ name: '上海市', code: 310000 }, { name: '北京市', code: 110000 }, { name: '广州市', code: 440100 }, { name: '成都市', code: 510100 }, { name: '天津市', code: 120000 }, { name: '杭州市', code: 330100 }],//热门城市列表
            groupcity: {},   //所有城市列表
            wxJsSdkConfig: false,
            showFlag: true, //控制div切换
        }
    },
    methods: {
        ...mapMutations([
            'SET_SELECTED_CITY'
        ]),
        getLocation() {
            if (!this.wxJsSdkConfig) {
                Toast("微信配置初始化中，请稍后再试！");
                return;
            }
            let that = this;
            wx.getLocation({
                type: 'wgs84',
                success: function (res) {
                    //将经纬度转为城市
                    $.ajax({
                        url: 'http://api.map.baidu.com/geocoder/v2/?ak=btsVVWf0TM1zUBEbzFz6QqWF&callback=renderReverse&location=' + res.latitude + ',' + res.longitude + '&output=json&pois=1',
                        type: "get",
                        dataType: "jsonp",  //类型
                        success: (res => {
                            that.guessCity = res.result.addressComponent.city;
                            that.guessCityid = res.result.addressComponent.adcode;
                            //将区的行政区划编码变成市的行政区划编码
                            that.guessCityid = that.guessCityid.substring(0,that.guessCityid.length-2)+'00';
                        }),
                        error: (err => {
                            Toast({
                                message: '当前城市定位失败:' + err.message,
                                duration: 3000
                            })
                        })
                    });

                },
              /*  fail: function (req) {
                    alert('fail');
                }*/
            });
        },
        wxConfig() {
            let that = this;
            const url = encodeURIComponent(window.location.href.split('#')[0]);
            var param = {};
//            param.wechatCode = 'WECHAT_CUS2';//微信区域编码，登录或js微信说全后会存在缓存里
            param.wechatCode = localStorage.getItem(WX_USER_WECHAT_CODE);
            param.url = url;
            api.getWechatJsAuth(param)
                .then(function (d) {
                    var wxInfo = d.data.body;
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: wxInfo.appId, // 必填，公众号的唯一标识
                        timestamp: wxInfo.timestamp, // 必填，生成签名的时间戳
                        nonceStr: wxInfo.nonceStr, // 必填，生成签名的随机串
                        signature: wxInfo.signature,// 必填，签名，见附录1
                        jsApiList: ["scanQRCode", "chooseImage", "chooseWXPay", "getLocation"]
                        // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    wx.ready(function () {
                        that.wxJsSdkConfig = true;
                        that.getLocation();
                    });
                })
                .catch(function (err) {
                    Toast({
                        message: '初始化微信JS接口失败:' + err,
                        duration: 3000
                    })
                })
        },
        //根据搜索字获取相关城市
        searchCityByKey(key) {
            if (!this.inputVaule) {
                this.showFlag = true;
            } else { //根据关键字获取相关城市
                this.showFlag = false;
            }
        },
        //搜索
        toSearch(obj, name) {
            //去除空格
            name = name.trim();
            //            return ((obj.areaName).includes(name) || (obj.areaNamePy).includes(name));
            //忽略大小写比较
            return (((obj.areaName).includes(name)) || (eval("/" + name + "/ig").test(obj.areaNamePy)));
        },
        //绑定点击事件,绑定城市
        getCurrentCity(city, encode, flag) {
            if(flag===1) {//点击当前城市
                 //判断城市定位是否完成
                if(this.guessCity==='' || this.guessCityid==='') {
                    Toast({
                        message: '请等待城市定位完成',
                        duration: 2000
                    })
                    return;
                }
            }
            localStorage.setItem("currentCity", city);
            this.SET_SELECTED_CITY({
                name: city,
                encode,
            })
            //将选择的城市追加到最近选择的城市
            if (this.recentSelectCity.length < 3) {
                if (!this.recentSelectCity.includes(city + ':' + encode)) {
                    this.recentSelectCity[this.recentSelectCity.length] = city + ':' + encode;
                }
            } else {
                if (flag === 0) {

                } else if (this.recentSelectCity.includes(city + ':' + encode)) { //包含的情况

                }
                else {
                    let that = this;
                    //最近选择城市更新
                    for (let i = 2; i > 0; i--) {
                        that.recentSelectCity[i] = that.recentSelectCity[i - 1];
                    }
                    that.recentSelectCity[0] = city + ':' + encode;
                }
            }
            localStorage.setItem("recentSelectCity_", this.recentSelectCity);
            this.showFlag = true;
            this.$emit('onSelectCity');
        },

    },
    mounted() {
        this.wxConfig();
        //获取城市
        api.getCityLevelArea({}).then(res => {
            //判断请求城市列表是否成功
            if (res.data.head.errorCode === '0') {
                this.groupcity = res.data.body;
                console.log(this.groupcity);
            } else {
                Toast({
                    message: '获取城市列表失败',
                    duration: 3000
                })
            }
        });
        //最近选择的城市更新
        let city = localStorage.getItem('recentSelectCity_');
        if (city !== null) {
            this.recentSelectCity = city.split(',');
        }
    },
}

</script>
<style scoped>
.search {
    width: 100%;
    margin: 1rem 0;
}

.search>input {
    width: 90%;
    height: 3rem;
    border-radius: .5rem;
    border: 1px solid gray;
    text-indent: 3rem;
}
.search::before {
    content: "\e603";
    font-family: "iconfont" !important;
    color: #C4C4C4;
    position: relative;
    right: -2.2rem;
    top: .1rem;
}
.currentPosition::before {
    content: "\e61d";
    font-family: "iconfont" !important;
    color: #f17712;
}
/*设置元素间的间距*/
.elementdis {
     /* margin: .7rem 1rem;*/
     margin-top: .7rem;
     margin-bottom: .5rem;
     margin-left: 1rem;
     background: #ffffff;
    }
.textdis {
     margin-left: 1rem;
    }
</style>
