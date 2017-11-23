<script>
import config from 'src/api/config';
import api from 'src/api/';
import async from 'src/api/async';
import { Toast } from 'mint-ui';
import vAreaSelectPopup from './areaSelectPopup'

export default {
    components: {
        vAreaSelectPopup
    },
    data() {
        return {
            wxImgvUrl: config.wxImgvUrl,
            pageConfigs:null,
            currentArea:null,
            iconData:null,
            headerName: '',
            backShow:'',
            popupVisible: false,
            pageGroupType:'',
            
        }
    },
    created() {
    },
    computed:{
        
    },
    //通过路由的before钩子解决router-view缓存页面问题
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.init();
        });
    },
    methods: {
        init() {
            //http://localhost:8011/#/views/etax
            //http://localhost:8011/#/views/etax?&backShow=N&wechatCode=WECHAT_CUS_DEV
            //debugger;
            this.pageGroupType = this.$route.params.pageGroupType
            this.backShow = this.$route.query.backShow?this.$route.query.backShow:'Y'
            let wechatCode = this.$route.query.wechatCode?this.$route.query.wechatCode:'JCHL_QH'
            let removeRedis = this.$route.query.removeRedis?this.$route.query.removeRedis:'N'
            let param = {
                "pageGroupType": this.pageGroupType,
                "removeRedis": removeRedis
            }
            //debugger;
            let _this = this
            async(this, 'queryPageGoupConfig', param, res => {
                if(res.head.errorCode == "0") {
                    _this.pageConfigs = JSON.parse(res.body)
                    localStorage.setItem("pageConfigs",res.body)
                    _this.changeData(wechatCode);
                }
            })
        },
        changeData(wechatCode){
            this.currentArea = this.pageConfigs.find(item =>
                item.pinyin === wechatCode
            )
            if(!this.currentArea){
                //Toast(wechatCode + '没有数据')
                throw Error(wechatCode + '没有数据')
            }
            let category = this.currentArea[this.pageGroupType]
            if (!category) {
                //Toast(this.currentArea.name + '没有' + this.pageGroupType + '数据')
                throw Error(this.currentArea.name + '没有' + this.pageGroupType + '数据')
            }
            this.headerName = category.headerName
            this.iconData = JSON.parse(category.iconData)
            //如果是调用后端服务就加上域名
            this.iconData.forEach((pp,ixp)=>{
                if(pp && pp.icons){
                    let foundItem = pp.icons.find(item => item.back === 'Y')
                    if (foundItem) {
                        foundItem.url = "http://" + config.wxUrl + foundItem.url
                    }
                }
            })
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
                this.changeData(pinyin);
            }
        },
    },

}

</script>

<template>
    <div>
        <v-wx-header :title="headerName"
                     :showLeft="backShow=='Y'" />
        <div @click.stop="popupVisible = true"
             class="city-select">
            <span >{{currentArea?currentArea.name:''}}</span>
            <i class="iconfont icon-jiantou-copy"></i>
        </div>
        
        <div v-for="iteration in iconData">
            <v-badge-title :title="iteration.titleName" />
            <div class="icon-group">
                <v-background-icon v-for="item in iteration.icons"
                                   :label="item.label"
                                   :url="item.url"
                                   :bgImg='wxImgvUrl+item.bgImg' />
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

div img {
    width: 100%;
    height: 100%;
}
</style>
