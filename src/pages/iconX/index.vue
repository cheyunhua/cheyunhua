<script>
import iconConfig from 'src/store/hardData/iconXconfig'
import config from 'src/api/config';
import { Popup, Toast } from 'mint-ui';
import vAreaSelectPopup from './areaSelectPopup'
var wx = require('weixin-js-sdk')
import api from 'src/api/';
const WX_USER_WECHAT_CODE = "wx.user.wechat.code";
const CACHE_PROVINCE = "taxBusiness.selectProvince2"
/**
 * etax代码逻辑：
 * beforeRouteEnter() => 先以url对应的区域 => 根据localStorage自动切换区域  => 显示页面 =>
 * 打开popup => 定位 => 选取一个区域 => 写入localStorage
 */
export default {
    components: {
        vAreaSelectPopup
    },
    data() {
        return {
            currentArea: null,
            iconData: null,
            headerName: '',
            showAreaChangeButton: false,
            popupVisible: false,
        }
    },
    created() {
        this.clearCache()
        this.init()
    },
    methods: {
        init() {
            let urlArea = this.$route.params.area.toLowerCase()
            this.currentArea = iconConfig.find(item =>
                item.pinyin === urlArea
            )
            if (!this.currentArea) {
                Toast('该地区暂无相关服务：' + urlArea)
                throw Error('该地区暂无相关服务：' + urlArea)
            }
            let routeCategory = this.$route.params.category
            let category = this.currentArea[routeCategory]
            if (!category) {
                Toast(this.currentArea.name + '没有' + routeCategory + '数据')
                throw Error(this.currentArea.name + '没有' + routeCategory + '数据')
            }
            // 初始化页面数据
            this.headerName = category.headerName
            this.iconData = category.iconData

            if (routeCategory === 'etax') {
                this.showAreaChangeButton = !!this.$route.query.changeBtn
                // url若存在redirect参数，则跳转至历史选择
                if (this.$route.query.redirect) {
                    this.redirect2History()
                }
            }
            else if (routeCategory === 'training') {
                this.mountWechatCode()
            }
            this.mountProvinceCode()
        },
        clearCache() {
            let iconXflag = localStorage.getItem("taxBusiness.iconXflag2")
            if (!iconXflag) {
                // 清除旧版缓存
                localStorage.removeItem(CACHE_PROVINCE)
                localStorage.setItem("taxBusiness.iconXflag2", 'true')
            }
        },
        redirect2History() {
            let provinceLocalObj = localStorage.getItem(CACHE_PROVINCE)
            if (provinceLocalObj) {
                provinceLocalObj = JSON.parse(provinceLocalObj)
                let pinyin = provinceLocalObj.historyProvince[0].pinyin
                this.updateAreaView(pinyin)
            }
        },
        mountProvinceCode() {
            this.iconData.forEach(iteration => {
                iteration.icons.forEach(item => {
                    let preStr = /\?/g.test(item.url) ? '&encode=' : '?encode='
                    item.url += preStr + this.currentArea.code + '&shengDm=' + this.currentArea.code
                })
            })
        },
        mountWechatCode() {
            let icons = this.currentArea.training.iconData[0].icons
            let foundItem = icons.find(item => item.label === '培训签到')
            if (foundItem) {
                foundItem.url = "http://" + config.wxUrl + "/auth/wechatCommonService/trainSignAuth?wechatCode=" + foundItem.wechatCode
            }
        },
        closePopup() {
            this.popupVisible = false
        },
        onSelectArea(area) {
            this.closePopup()
            this.updateAreaView(area.pinyin)
        },
        updateAreaView(pinyin) {
            // 选择跟当前不一样才更新视图
            if (pinyin !== this.currentArea.pinyin) {
                let path = '/iconx/' + pinyin + '/etax'
                this.showAreaChangeButton && (path += '?changeBtn=true')
                this.$router.replace(path)
                this.init()
            }
        },

    },

}

</script>

<template>
    <div>
        <v-wx-header :title="headerName"
                     showLeft/>
        <div v-if="showAreaChangeButton"
             @click.stop="popupVisible = true"
             class="city-select">
            <span>{{currentArea.name}}</span>
            <i class="iconfont icon-jiantou-copy"></i>
        </div>

        <div v-for="iteration in iconData">
            <v-badge-title :title="iteration.titleName" />
            <div class="icon-group">
                <v-background-icon v-for="item in iteration.icons"
                                   :label="item.label"
                                   :url="item.url"
                                   :bgImg="item.bgImg" />
            </div>
        </div>
        <div v-if="!iconData"
             class="no-service">
            无相关服务
        </div>
        <mt-popup v-model="popupVisible"
                  class="popup"
                  popup-transition="popup-fade"
                  :modal="false">
            <!-- 根据popupVisible动态挂载 -->
            <v-area-select-popup v-if="popupVisible"
                                 @closeSelectPopup="closePopup"
                                 @selectArea="onSelectArea" />
        </mt-popup>
    </div>
</template>

<style scoped>
.city-select {
    color: #fff;
    padding: .8rem 1rem;
    padding-right: 1.5rem;
    float: right;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 999;
    display: flex;
    align-items: center;
}
.city-select>span {
    font-size: 1.7rem;
}
.city-select>i {
    margin: .1rem 0 0 .1rem;
}
.popup {
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 99999;
}
.badge-title {
    margin-top: .5rem;
}
.icon-group {
    display: flex;
    flex-flow: row wrap;
    background-color: #fff;
    padding: 1rem 0;
}
.no-service {
    font-size: 2rem;
    color: #757575;
    text-align: center;
    padding: 2rem;
}
</style>
