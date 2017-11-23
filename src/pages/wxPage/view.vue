<script>
import config from 'src/api/config';
import api from 'src/api/';
import async from 'src/api/async';
import { Toast } from 'mint-ui';

/**
 * etax代码逻辑：
 * beforeRouteEnter() => 先以url对应的区域 => 根据localStorage自动切换区域  => 显示页面 =>
 * 打开popup => 定位 => 选取一个区域 => 写入localStorage
 */
export default {
    components: {
        
    },
    data() {
        return {
            pageType:'icon',
            wxImgvUrl: config.wxImgvUrl,
            pageConfig:null,
            iconData: null,
            headerName: '',
            pageHeaderShow:'Y',
            backShow:'N'
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
            //http://localhost:8011/#/view/icon/wechat_cus_dev/etax
            //http://localhost:8011/#/view/icon/wechat_cus_dev/pxfw
            //http://localhost:8011/#/view/image/wechat_cus_dev/taxAssistant
            //debugger;
            this.pageType = this.$route.params.pageType
            let wechatCode = this.$route.params.wechatCode.toLowerCase()
            let pageCode = this.$route.params.pageCode
            let removeRedis = this.$route.query.removeRedis?this.$route.query.removeRedis:'N'
            let param = {
                "wechatCode": wechatCode.toUpperCase(),
                "pageCode": pageCode,
                "pageType":this.pageType,
                "removeRedis": removeRedis
            }
            //debugger;
            let _this = this
            async(this, 'queryPageConfig', param, res => {
                if(res.head.errorCode == "0") {
                    _this.pageConfig = JSON.parse(res.body)
                    _this.headerName = _this.pageConfig[pageCode].headerName
                    _this.pageHeaderShow = _this.pageConfig[pageCode].pageHeaderShow
                    _this.backShow = _this.pageConfig[pageCode].backShow
                    _this.iconData = JSON.parse(_this.pageConfig[pageCode].iconData)
                    //如果是调用后端服务就加上域名
                    _this.iconData.forEach((pp,ixp)=>{
                        if(pp && pp.icons){
                            let foundItem = pp.icons.find(item => item.back === 'Y')
                            if (foundItem) {
                                foundItem.url = "http://" + config.wxUrl + foundItem.url
                            }
                        }
                    })

                    

                }
            })
        },


    },

}

</script>

<template>
    <div>
        <v-wx-header v-if="pageHeaderShow=='Y'" :title="headerName"
                     :showLeft="backShow=='Y'" />
        
        <div v-if="pageType=='icon'" v-for="iteration in iconData">
            <v-badge-title :title="iteration.titleName" />
            <div class="icon-group">
                <v-background-icon v-for="item in iteration.icons"
                                   :label="item.label"
                                   :url="item.url"
                                   :bgImg='wxImgvUrl+item.bgImg'
                                   :message='item.message'
                                    />
            </div>
        </div>
        <div v-if="pageType=='image'">
            <img  v-for="iteration in iconData" onerror="this.style.display='none'" 
            :src="wxImgvUrl + iteration" />
        </div>
        <div v-if="!iconData"
             class="no-service">
            无相关服务
        </div>
    </div>
</template>

<style scoped>
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
