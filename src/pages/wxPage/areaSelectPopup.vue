<script>
import api from 'src/api/';
import { Toast } from 'mint-ui'
var wx = require('weixin-js-sdk');
const WX_USER_WECHAT_CODE = "wx.user.wechat.code";
const CACHE_PROVINCE = "taxBusiness.selectProvince2"

export default {
    data() {
        return {
            wxJsSdkConfig: false,
            locatedArea: {
                name: '正在定位...',
            },
            provinceHistory: [],
            areaInfoList: null,
        }
    },
    created() {
        this.wxConfig();
        this.init()
    },
    methods: {
        init() {
            this.areaInfoList = JSON.parse(localStorage.getItem("pageConfigs"))
            
            var provinceLocalObj = localStorage.getItem(CACHE_PROVINCE);
            if (provinceLocalObj) {
                provinceLocalObj = JSON.parse(provinceLocalObj);
                this.provinceHistory = provinceLocalObj.historyProvince;
            }
        },
        selectProvince(area) {
            if (this.areaInfoList.findIndex(item => item.name === area.name) < 0) {
                Toast('该地区暂无服务：' + area.name)
                return
            }
            this.saveHistory(area)
            this.$emit('selectArea', area)
        },
        saveHistory(area) {
            let provinceLocalObj = localStorage.getItem(CACHE_PROVINCE)
            if (provinceLocalObj) {
                provinceLocalObj = JSON.parse(provinceLocalObj)
                provinceLocalObj.historyProvince
                if (provinceLocalObj.historyProvince) {
                    let historyProv = provinceLocalObj.historyProvince
                    // 找到已存在item序号
                    let existItemIndex = historyProv.findIndex(item =>
                        item.code === area.code
                    )
                    if (existItemIndex >= 0) {
                        // 删除已存在item
                        historyProv.splice(existItemIndex, 1)
                    }
                    // 添加选择区域到数组头
                    historyProv.unshift(area)
                    // 历史数据的最大长度
                    let maxLength = 3
                    if (historyProv.length > maxLength) {
                        historyProv.splice(maxLength, historyProv.length - maxLength)
                    }
                } else {
                    provinceLocalObj.historyProvince = [area]
                }
            } else {
                provinceLocalObj = {}
                provinceLocalObj.historyProvince = [area]
            }
            provinceLocalObj.selectedProvince = area
            localStorage.setItem(CACHE_PROVINCE, JSON.stringify(provinceLocalObj))
        },
        wxConfig() {
            this.wxJsSdkConfig = false;
            let that = this;
            const url = encodeURIComponent(window.location.href.split('#')[0]);
            var param = {};
            param.wechatCode = localStorage.getItem(WX_USER_WECHAT_CODE);
            param.url = url;
            // ===================================调试==========================================
            console.log("url ", url);
            api.getWechatJsAuth(param)
                .then(function(d) {
                    if (!d.data.body) {
                        // ===================================调试==========================================
                        console.log("定位失败 ");
                        //Toast('定位失败');
                    } else {
                        var wxInfo = d.data.body;
                        // ===================================调试==========================================
                        console.log("wxInfo.nonceStr ", wxInfo.nonceStr);
                        wx.config({
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: wxInfo.appId, // 必填，公众号的唯一标识
                            timestamp: wxInfo.timestamp, // 必填，生成签名的时间戳
                            nonceStr: wxInfo.nonceStr, // 必填，生成签名的随机串
                            signature: wxInfo.signature,// 必填，签名，见附录1
                            jsApiList: ["scanQRCode", "chooseImage", "chooseWXPay", "getLocation"]
                            // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });
                        // ===================================调试==========================================
                        console.log("config ok ");
                        wx.ready(function() {
                            // ===================================调试==========================================
                            console.log("ready ok ");
                            that.wxJsSdkConfig = true;
                            that.getLocation();
                        });
                    }
                })
                .catch(function(err) {
                    // ===================================调试==========================================
                    console.log("getWechatJsAuth error");
                })

        },
        getLocation: function() {
            // ===================================调试==========================================
            console.log("getLocation start");
            if (!this.wxJsSdkConfig) {
                Toast("微信配置初始化中，请稍后再试！");
                return;
            }
            // ===================================调试==========================================
            console.log("wxJsSdkConfig ok");
            let _this = this;
            wx.getLocation({
                type: 'wgs84',
                success: function(res) {
                    $.ajax({
                        url: 'http://api.map.baidu.com/geocoder/v2/?ak=btsVVWf0TM1zUBEbzFz6QqWF&callback=renderReverse&location=' + res.latitude + ',' + res.longitude + '&output=json&pois=1',
                        type: "get",
                        dataType: "jsonp",  //类型
                        success: res => {
                            // ===================================调试==========================================
                            console.log("百度地图res", res);
                            let code = res.result.addressComponent.adcode
                            // 定位显示到省份  如果定位到深圳直接显示深圳。
                            let name = code === "440300"
                                ? res.result.addressComponent.city
                                : res.result.addressComponent.province
                            // 去掉最后的省市字符
                            name = name.replace(/[省市]$/, '')
                            // ===================================调试==========================================
                            console.log("选择的地区", name);
                            let found = iconConfig.find(item => item.name === name)
                            if (found) { _this.locatedArea = found }
                        },
                        error: err => {
                            // ===================================调试==========================================
                            console.log("百度地图faild");
                            Toast('当前城市定位失败:' + err.message)
                        }
                    });

                },
            });
            // ===================================调试==========================================
            console.log("getLocation end");
        }

    }
}
</script>

<template>
    <div class="icon-page">
        <v-wx-header title="选择区域" />
        <i @click.stop="$emit('closeSelectPopup');"
           class="iconfont icon-back"></i>

        <div class="selectProvince-label">定位/历史</div>
        <div class="selectProvince-provinceList">
            <div class="selectProvince-item"
                 @click.stop="selectProvince(locatedArea)">
                <i class="iconfont icon-yikeappshijiandizhiqianrenyuan74"></i>
                <span>{{locatedArea.name}}</span>
            </div>
            <div v-for="item in provinceHistory"
                 @click.stop="selectProvince(item)"
                 class="selectProvince-item">
                {{item.name}}
            </div>
        </div>

        <div class="selectProvince-label">选择区域</div>
        <div class="selectProvince-provinceList">
            <div v-for="item in areaInfoList"
                 @click.stop="selectProvince(item)"
                 class="selectProvince-item">
                {{item.name}}
            </div>
        </div>

    </div>
</template>
<style scoped>
.icon-back {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
    color: #fff;
    padding: .8rem 1.1rem;
    font-size: 1.8rem;
}
.selectProvince-label {
    width: 100%;
    height: 2.2em;
    background-color: #F1F3F2;
    line-height: 2.2em;
    padding-left: 0.5em;
}
.selectProvince-provinceList {
    display: flex;
    flex-flow: row wrap;
    margin-bottom: 1rem;
}
.selectProvince-item {
    padding: .5rem .8rem;
    margin: .8rem;
    background-color: #F7B49F;
    border-radius: .5rem;
}
.mint-toast {
    z-index: 9999;
}
</style>
