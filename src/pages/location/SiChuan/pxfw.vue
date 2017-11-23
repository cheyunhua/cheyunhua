<script>
import config from '../../../api/config';
export default {
    data() {
        return {
            pxfw: [
                {
                    label: '培训报名',
                    url: '/train',
                    bgImg: require('src/assets/images/icon/icon_18.png')
                },
                {
                    label: '培训签到',
                    url: '/sign',
                    bgImg: require('src/assets/images/icon/icon_22.png')
                },
            ]
        }
    },

    mounted() {

    },
    methods: {
     fetchData:function(){
       this.pxfw[1].url = "http://"+config.wxUrl+"/auth/wechatCommonService/trainSignAuth?wechatCode=JCHL_SC";
     } 
    },
    beforeRouteEnter (to, from, next) {
          next(vm => {
              vm.fetchData();
          });
      },
}

</script>

<template>
    <div>
        <v-wx-header title="培训服务"
                     showLeft/>
        <v-badge-title title="培训服务" />
        <div class="icon-group">
            <v-background-icon v-for="item in pxfw"
                               :label="item.label"
                               :url="item.url"
                               :bgImg="item.bgImg" />
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
    background-color: white;
    padding: 1rem 0;
}
</style>
