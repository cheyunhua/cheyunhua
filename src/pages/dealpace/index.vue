<template lang="html">
    <div class="" id="main">
      <div class="fx-header-top" style="background-color:#4bbfff">
        <i class="glyphicon glyphicon-menu-left fx-ico-left" aria-hidden="true" @click="$router.back()"></i>进度查询
      </div>
      <div class="" >
          <img style="width:100%;height:auto" src="../../assets/images/ys_service/21_cs_big.png"
               alt="">
      </div>
      <div class="content" v-if="fetchQcs">
        <mt-cell title="公司名称"   :value="re_Qcs.productMc" readOnly></mt-cell>
        <mt-cell title="纳税人编号" :value="re_Qcs.productBh" readOnly></mt-cell>

        <div class="father" @click="selectItem(item.protocolCode)" v-for="(item,index) in re_Content" style="margin-top:10px">
          <div class="son1">
            <table>
              <tr><td class="indenttwo" style="text-indent:1px;width: 45%" >协议编号</td><td>{{item.protocolCode}}</td></tr>
              <tr><td class="indenttwo" style="text-indent:1px;width: 45%" >套餐类型</td><td>{{item.productType}}</td></tr>
              <tr><td class="indenttwo" style="text-indent:1px;width: 45%" >订购数量</td><td>{{item.quantity}}</td></tr>
            </table>
          </div>
          <div class="son2"><img src="../../assets/images/ys_service/21_cx_small.png" /></div>
        </div>
      </div>
      <transition name="fade">
          <router-view></router-view>
      </transition>

    </div>
</template>

<script >
import api from 'api/index';
import {Toast, Indicator, MessageBox} from 'mint-ui'
import {mapState, mapMutations} from 'vuex'
const WX_USER_CODE = 'wx.user.code';
const WX_USER_WECHAT_CODE = 'wx.user.wechat.code';
export default {
  data(){
    return {
      fetchQcs: null,
      re_Qcs:null,
      re_Content:null,
      judgeStatus1: '',
      judgeStatus2: '',
      judgeStatus3: '',
      judgeStatus4: '',
    }
  },
  create() {
  },
  mounted() {


  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.isBinded()
    });
  },
  beforeRouteLeave(to, from, next){
    next();
  },
  computed: {

  },
  methods: {
    initForm() {
      let params = {
        "code": global.localStorage.getItem(WX_USER_CODE),
        "wechatCode": global.localStorage.getItem(WX_USER_WECHAT_CODE)
      }
      Indicator.open({
               text: '正在加载数据...',
               spinnerType: 'triple-bounce'
      });
      api.getDealPace(params).then((response)=> {
        Indicator.close()
        if(response.data.head.errorCode === '0'){
          console.log(response.data.body)
          this.fetchQcs = response.data.body
        } else {
          Toast(response.data.errorMsg)
        }
      }).catch((error) => {
          Indicator.close()
          Toast(error)
      });
    },
    isBinded() {
      let params = {
        "code": global.localStorage.getItem(WX_USER_CODE),
        "wechatCode": global.localStorage.getItem(WX_USER_WECHAT_CODE)
      }
      let self = this
      api.isBinding(params).then((response)=> {
        Indicator.close()
        if(response.data.head.errorCode === '0'){
          console.log(response.data.body)
          if(!response.data.body) {

            MessageBox.alert('请先绑定!').then(action => {
              self.$router.push({
                path: `/userbind`
              })
            });
          }else {
            self.initForm()
          }
        } else {
          Toast(response.data.errorMsg)
        }
      }).catch((error) => {
          Indicator.close()
          Toast(error)
      });
    },
   /* upload() {
      this.$router.push("/uploadYs")
    },*/
    selectItem(id) {
      this.$router.push({
          path: `/dealPace/${id}`
      })
    },
  },
  watch: {
    fetchQcs(nval,oval) {
      console.log(nval)
      this.re_Qcs = nval.head
      this.re_Content = nval.contend

    }
  }
}
</script>

<style lang="css" scoped>
a.mint-cell {
  min-height: 62px;
}
a .mint-cell-wrapper {
     min-height: 4rem;
}
.father{
  display: -webkit-flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  box-shadow:2px 2px 3px #aaaaaa;
}
.father td {
  line-height:3rem;
  font-size: 1.5rem;
   width: 50%;
   overflow:hidden;
   border-bottom:1px solid #FFF;
}
.father .son1 {
  flex-grow: 2;
}
.father .son2 {
  flex-grow: 1;
  width: 100px;
  height: auto;
  margin-right: -7%;
}
.son2 > img {
  width: 80%;
  height: 80%;
}
&.fade-enter-active, &.fade-leave-active {
  transition: all 0.5s ease

}
&.fade-enter, &.fade-leave-active {
  opacity: 0
}




</style>
