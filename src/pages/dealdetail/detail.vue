<template lang="html">
  <div class="detail" id="" >
      <div class="fx-header-top fx-orange">
        <i class="glyphicon glyphicon-menu-left fx-ico-left" aria-hidden="true" @click="$router.go(-1)"></i>办理进度
      </div>
      <div class="content" v-for="list in fetchQcs" >
        <!-- <mt-cell title="纳税人编号"  :value="list.nsrCode" readOnly></mt-cell>
        <mt-cell title="纳税人名称"  :value="list.nsrName" readOnly></mt-cell>
        <mt-cell title="所属税务机关" :value="list.nsrSwdjh" style="height:30px" readOnly></mt-cell>
        <mt-cell title="申请办理" style="background-color:#dedede"></mt-cell>
        <mt-cell title="申请日期"  :value="list.askTime" readOnly></mt-cell>
        <mt-cell title="当前状态" :value="status1" v-if="`${status1}`==='已接收'" ></mt-cell>
        <mt-cell title="当前状态" :value="status1" v-if="`${flag}`==='1'" ></mt-cell>
        <mt-cell title="当前状态" :value="status1" v-else><a @click="upload">{{status1}}</a></mt-cell>
        <mt-cell title="申请审核" style="background-color:#dedede"></mt-cell>
        <mt-cell title="审核日期" :value="list.acceptDate" readOnly></mt-cell>
        <mt-cell title="当前状态"  :value="status2" readOnly></mt-cell>
        <mt-cell title="制作发行" style="background-color:#dedede"></mt-cell>
        <mt-cell title="制作日期"  :value="list.startTime" readOnly></mt-cell>
        <mt-cell title="当前状态"  :value="status3" readOnly></mt-cell>
        <mt-cell title="配送状态" style="background-color:#dedede"></mt-cell>
        <mt-cell title="配送日期"  :value="list.receiveDate" readOnly></mt-cell>
        <mt-cell title="当前状态"  :value="status4" readOnly></mt-cell>
        <div style="width:100%;height:40px;background-color: black"></div> -->
      </div>
      <div style="height:50rem;top:10px" v-if="fetchQcs" class="swipelist">
          <mt-swipe  :auto="0" @change="handleSwipeChange"  :defaultIndex="fetchQcs.length" ref="mtswipe" id="mtswipe">
            <mt-swipe-item class="slide" v-for="(list, index) in fetchQcs">
              <mt-cell title="纳税人编号"  :value="list.nsrCode" readOnly></mt-cell>
              <mt-cell title="纳税人名称"  :value="list.nsrName" readOnly></mt-cell>
              <mt-cell title="所属税务机关" :value="list.nsrSwdjh" style="height:30px" readOnly></mt-cell>
              <mt-cell title="申请办理" style="background-color:#dedede"></mt-cell>
              <mt-cell title="申请日期"  :value="list.askTime" readOnly></mt-cell>
              <mt-cell title="当前状态" :value="status1" v-if="!statusFlag" ></mt-cell>
              <mt-cell title="当前状态1" :value="status1" v-if="statusFlag"><a @click="upload">{{status1}}</a></mt-cell>
              <mt-cell title="申请审核" style="background-color:#dedede"></mt-cell>
              <mt-cell title="审核日期" :value="list.acceptDate" readOnly></mt-cell>
              <mt-cell title="当前状态"  :value="status2" readOnly></mt-cell>
              <mt-cell title="制作发行" style="background-color:#dedede"></mt-cell>
              <mt-cell title="制作日期"  :value="list.startTime" readOnly></mt-cell>
              <mt-cell title="当前状态"  :value="status3" readOnly></mt-cell>
              <mt-cell title="配送状态" style="background-color:#dedede"></mt-cell>
              <mt-cell title="配送日期"  :value="list.receiveDate" readOnly></mt-cell>
              <mt-cell title="当前状态"  :value="status4" readOnly></mt-cell>
              <!-- <div style="width:100%;height:40px;background-color: black"></div> -->
            </mt-swipe-item>
          </mt-swipe>
        </div>
      <!-- <mt-cell  style="background-color:#dedede"></mt-cell> -->
      <!-- <div ref="e  rrMsg">未查询到符合条件的结果</div> -->

  </div>
</template>

<script>
import api from 'api/index';
import {Toast, Indicator} from 'mint-ui'
import {mapState, mapMutations} from 'vuex'
const WX_USER_CODE = 'wx.user.code';
const WX_USER_WECHAT_CODE = 'wx.user.wechat.code';
export default {
  data() {
    return {
      fetchQcs: null,
      judgeStatus1: '',
      judgeStatus2: '',
      judgeStatus3: '',
      judgeStatus4: '',
      flag: '1',
      currentWiperIndex: 0,
      statusFlag: false,
    }
  },
  created() {
    console.log(this.nsrbind)
  },
  computed: {

    status1: {
      set() {},
      get() {
        return this.judgeStatus1
      }
    },
    status2: {
      set() {},
      get() {
        return this.judgeStatus2
      }
    },
    status3: {
      set() {},
      get() {
        return this.judgeStatus3
      }
    },
    status4: {
      set() {},
      get() {
        return this.judgeStatus4
      }
    },
  },
  mounted() {
    this.fetchDatas()
  },
  methods: {
    upload() {
      this.$router.push({ path: '/uploadYs', query: { protocolCode: this.fetchQcs[this.currentWiperIndex].protocolCode} });
    },
    fetchDatas() {
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
          this.fetchQcs = response.data.body.contend
          this.judge(this.currentWiperIndex)
        } else {
          Toast(response.data.errorMsg)
        }
      }).catch((error) => {
          Indicator.close()
          Toast(error)
      });
    },
    handleSwipeChange(index){
      this.currentWiperIndex = index
      this.judge(index)
    },
    judge(index) {

      if(this.fetchQcs[index].status === '4') {
        if(this.fetchQcs[index].flag !== 1) {
          this.statusFlag = true
        } else {
          this.statusFlag = false
        }
      }else if(this.fetchQcs[index].status === '1') {
        if(this.fetchQcs[index].flag !== 1) {
          this.statusFlag = true
        } else {
          this.statusFlag = false
        }
      } else {
        this.statusFlag = false
      }
      let item = this.fetchQcs[index]
      if(item.status === '1'){
        this.judgeStatus2 = '未受理'
        if(item.isUpload === '0'){
          switch(item.flag) {
            case "1": this.judgeStatus1 = '申请中，资料未上传'
              break;
            default: this.judgeStatus1 = '申请中，资料未上传'
		          // this.$router.push({ path: '/uploadYs', query: { protocolCode: item.protocolCode} });
              break;
          }
        }else {
          switch(item.flag) {
            case "1": this.judgeStatus1 = '申请中，资料已上传'
              break;
            default: this.judgeStatus1 = '申请中，资料已上传'
		          // this.$router.push({ path: '/uploadYs', query: { protocolCode: item.protocolCode} });
              break;
          }
        }
      }else if(item.status === '2') {
        this.judgeStatus1 = '已接收'
        this.judgeStatus2 = '已受理'
      }else if(item.status === '3') {
        this.judgeStatus1 = '无效申请'
        this.judgeStatus2 = '已受理'
      }else if(item.status === '4') {
        this.judgeStatus2 = '已受理'
        if(item.isUpload === '0') {
          switch(item.flag) {
            case "1": this.judgeStatus1 = '审核未通过，资料未上传'
              break;
            default: this.judgeStatus1 = '审核未通过，资料未上传'
		          // this.$router.push({ path: '/uploadYs', query: { protocolCode: item.protocolCode} });
              break;
          }
        }else {
          switch(item.flag) {
            case "1": this.judgeStatus1 = '审核未通过，资料已上传'
              break;
            default: this.judgeStatus1 = '审核未通过，资料已上传'
		    // this.$router.push({ path: '/uploadYs', query: { protocolCode: item.protocolCode} });
          }
        }
      }else {
        this.judgeStatus2 = '已受理'
      }
      if(item.startTime) {
        this.judgeStatus3 = '已制作'
      }else {
        this.judgeStatus3 = '未制作'
      }

      switch(item.deliveryStatus) {
        case "0": this.judgeStatus4 = '不需要配送'
          break;
        case "1": this.judgeStatus4 = '已配送'
          break;
        case "2": this.judgeStatus4 = '配送中(部分已经配送)'
          break;
        default: this.judgeStatus4 = '未配送'
          break;
      }
    }
  },
  watch: {
    fetchQcs(nval, oval) {
    }
  },
}
</script>

<style lang="css" scoped>
.detail {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #f3f3f3;
  top: 0;
  z-index: 100;
}
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s
}

 .slide-enter, .slide-leave-to {
   transform: translate3d(100%, 0, 0)
 }

</style>
