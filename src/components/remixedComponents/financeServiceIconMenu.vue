<script>
import config from 'src/api/config'
const localStorage = global.localStorage;
const WX_USER_TOKEN = 'wx.user.token';
export default {

    data() {
        return {
            xyurl: null
        }
    },
    created() {
        this.xyurl = config.xyUrl;
        this.xyurl = this.xyurl+"?wxtoken="+localStorage.getItem(WX_USER_TOKEN)
        console.info(this.xyurl)

    },
}
</script>
<template>
    <div class="fsim">
        <div class="fsi">
            <v-service-icon label="办税大厅"
                            icon="icon-caiwushuiwu"
                            url="/iconx/guangdong/etax?redirect=true&changeBtn=true"
                            bgcolor="#AB47BC" />
            <v-service-icon label="财税资讯"
                            icon="icon-zixun"
                            url="/jcinformation"
                            bgcolor="#E84E40" />
            <v-service-icon label="金财学院"
                            icon="icon-yingyangxuetang"
                            :url="xyurl"
                            bgcolor="#4E6CEF" />
            <v-service-icon label="政策法规"
                            icon="icon-falvfagui"
                            url="http://www.tax12366.org/Taxlaws/Index?fromid=gh_f8c4fb78c778&from=singlemessage"
                            bgcolor="#10B5A5" />

        </div>

        <div class="fsi">
            <v-service-icon label="金财管家"
                            icon="icon-lipinqia"
                            url="/steward"
                            bgcolor="#E84E40" />
            <v-service-icon label="办税助手"
                            icon="icon-zhushou"
                            url="/zb_taxAssistant"
                            bgcolor="#4E6CEF" />
            <v-service-icon label="发票管家"
                            icon="icon-fapiao"
                            url="/invoiceZone"
                            bgcolor="#10B5A5" />
            <v-service-icon label="财税问答"
                            icon="icon-wenda"
                            url=""
                            bgcolor="#AB47BC" />

        </div>
    </div>
</template>
<style scoped>
.fsim {
    display: flex;
    flex-direction: column;
}
.fsi {
    display: flex;
}
.card {
    width: 25%;
}
</style>
