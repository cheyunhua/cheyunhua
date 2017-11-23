<template lang="html">
    <div class="" id="main">
      <div class="fx-header-top" style="background-color:#4bbfff">
        <i class="glyphicon glyphicon-menu-left fx-ico-left" aria-hidden="true" @click="$router.back()"></i>税通号码
      </div>
      <div class="" >
          <img style="width:100%;height:auto" src="../../assets/images/ys_service/21_cs_big3.png"
               alt="">
      </div>
      <div v-if="headQcs">
        <mt-cell title="纳税人编号"  :value="headQcs.productBh" readOnly></mt-cell>
        <mt-cell title="纳税人名称"  :value="headQcs.productMc" readOnly></mt-cell>
      </div>
      <div class="father"  v-if="datasQcs" v-for="(item,index) in datasQcs">
        <div class="son1">
          <table>
            <tr><td class="indenttwo" style="text-indent:1px;width: 35%" >税通号码</td><td>{{item.sthm}}</td></tr>
            <tr><td class="indenttwo" style="text-indent:1px;width: 35%" >套餐类型</td><td>{{item.productType}}</td></tr>
            <tr><td class="indenttwo" style="text-indent:1px;width: 35%" >办理时间</td><td>{{item.blsj}}</td></tr>
          </table>
        </div>
        <div class="son2"><img src="../../assets/images/ys_service/21_cx_small.png" /></div>
      </div>

    </div>
</template>

<script type="text/ecmascript-6">
import api from 'api/index';
import {Toast, Indicator, MessageBox} from 'mint-ui'
import {mapState, mapMutations} from 'vuex'
const WX_USER_CODE = 'wx.user.code';
const WX_USER_WECHAT_CODE = 'wx.user.wechat.code';

export default {
  data(){
    return {
      headQcs: null,
      datasQcs: null,
    }
  },
  create() {
    console.log(this.nsrbind)
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
      console.log(params)
      Indicator.open({
               text: '正在加载数据...',
               spinnerType: 'triple-bounce'
      });
      api.sendYsSthm(params).then((response)=> {
        Indicator.close()
        if(response.data.head.errorCode === '0'){
          console.log(response.data.body)
          this.headQcs = response.data.body.head
          this.datasQcs = response.data.body.contend
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
    upload() {
      this.$router.push("/uploadJM")
    },
    selectItem() {

    },
  },
  watch: {
    fetchQcs(nval,oval) {
      // let o = {}
      // for(let [key,value] of Object.entries(nval)) {
      //
      //   if(parseInt(key) > 0) {
      //       let obj = {
      //         [key]: nval[key]
      //       }
      //     this.filter_Qcs = Object.assign(o,obj)
      //   }
      // }

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
  padding: 10px;
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

</style>
