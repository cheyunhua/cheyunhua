<template>
  <div>
    <div class="fx-header-top fx-orange">
      绑定企业信息
    </div>
    <div class="_head">
      <div class="_head_content">{{headText}}</div>
    </div>
    <div class="_body">
      <div class="wrapper">
        <mt-checklist
          title="已关联的企业"
          v-model="selectEnterprise"
          :options="enterpriseList">
        </mt-checklist>
      </div>
    <!--  <div class="wrapper">
         <div v-for="enterprise in enterpriseList">
           <label><input type="checkbox" v-bind:value="enterprise.value"  v-model="enterprise.checked" >{{enterprise.label}}</label>
         </div>

      </div>-->
      <div class="wrapper">
        <div class="_addOther" v-on:click="enterAddStep">{{enterAddStepText}}</div>
      </div>
    </div>
    <div class="page-part">
      <div :class="selectEnterprise.length>0?'login':'login_none'" v-on:click="sureBind();">{{sureBindText}}</div>
    </div>
  </div>

</template>

<script>
import {Toast, Indicator, MessageBox} from 'mint-ui'
import api from '../../api/'
// import _track from '../../api/track'
const WX_USER_PHONE = 'wx.user.userPhone'
export default{
  name: 'bindEnterprise',
  // 需要绑定的列表 ，头部标题 ，企业列表
  props: ['needBindList', 'headText', 'enterpriseList', 'code'],
  data () {
    return {
      sureBindText: '确定绑定',
      enterAddStepText: '添加企业',
      selectEnterprise: []// 选中需要绑定的企业
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      // 初始化企业列表 查询后端
      if (this.enterpriseList.length < 1) {
        this.getBindList()
      }
      // 追加新的需要绑定的企业
      this.appendNewBind()
    },
    goBack () {
      this.$emit('enterLoginStep')
    },
    // 追加新的需要绑定的企业
    appendNewBind () {
      let that = this
      if (this.needBindList) {
        // 过滤重复
        let breakFlag = false
        this.enterpriseList.forEach(function (obj) {
          if (obj.label === that.needBindList.label) {
            breakFlag = true
          }
        })
        if (!breakFlag) {
          this.enterpriseList.push(this.needBindList)
        }
      }
    },
    // 根据手机号码查询企业列表
    getBindList () {
      Indicator.open({
        text: '加载中,请稍后',
        spinnerType: 'snake'
      })
      let params = {}
      // 获取手机号码
      params.mobilePhone = localStorage.getItem(WX_USER_PHONE)
      if (!params.mobilePhone) {
        Toast('用户信息异常')
        return
      }
      api.queryCustomerListByMobile(params).then((response) => {
        if (response.data.head.errorCode === '0') {
          Indicator.close()
          let custStoreList = response.data.body.data
          for (var i = 0; i < custStoreList.length; i++) {
            // 只列出未绑定的企业
            let option = {}
            option.label = custStoreList[i].cusName
            option.value = {'custId': custStoreList[i].custId, 'cusName': custStoreList[i].cusName}
            option.checked = 'checked'// 默认选中
            this.enterpriseList.push(option)
          }
          this.appendNewBind()
        } else {
          Indicator.close()
          Toast(response.data.head.errorMsg)
        }
      }).catch((response) => {
        Indicator.close()
        Toast('访问超时')
      })
    },
      // 确定绑定
    sureBind () {
      // 需要绑定的条目总数
      var needBindCount = this.selectEnterprise.length
      if (needBindCount < 1) {
        Toast('请选中一个要绑定的企业')
        return
      }
      // 成功绑定的条目总数 初始化为0
      var successBindCount = 0
      // 失败绑定的条目总数 初始化为0
      var failBindCount = 0
      // 成功绑定的详细列表
      // var successBindList = []
      // 失败绑定的详细列表
      var failBindList = []
      Indicator.open({
        text: '加载中,请稍后',
        spinnerType: 'snake'
      })
      let that = this
      for (let i = 0; i < this.selectEnterprise.length; i++) {
        let params = {}
        params.cusId = this.selectEnterprise[i].custId
        $.ajax({
          url: api.bindWeChatCustomerAsync(),
          type: 'POST',
          cache: false,
          async: false,
          data: JSON.stringify(params), // 传入组装的参数
          contentType: 'application/json;charset=utf-8',
          dataType: 'json', // 类型
          success: function (response) {
            if (response.head.errorCode === '0') {
              Indicator.close()
              // 如果成功绑定就 +1 记录批量绑定中 成功绑定的条目数
              successBindCount++
              if (successBindCount === 1) {
                // 如果存在绑定成功一条记录就推送消息
                let params = {}
                params.code = that.code
                console.log('bind_enterprise:code' + that.code)
                api.bindAfterSendMsg(params).then((response) => {})
              }
              if (successBindCount === needBindCount) {
                // 重新加载企业
                MessageBox.alert('<div style="text-align: left">现在开始，您就可以<br>1、对接您的企业专属客服<br>2、直接预约培训报名<br>还有服务市场及开发中的培训、咨询等更多精彩功能，等您体验！</div>', '绑定成功').then(action => {
                  //that.$router.push('/icon')
                  //微信浏览器窗口
                  WeixinJSBridge.call('closeWindow');
                })
              }
            } else {
              Indicator.close()
              failBindCount++
              let failBindMap = {'cusName': that.selectEnterprise[i].cusName, 'custId': that.selectEnterprise[i].custId, 'errorMsg': response.head.errorMsg}
              failBindList.push(failBindMap)
            }
          },
          error: function () {
            Indicator.close()
            Toast('访问超时')
          }
        })
        // 如果存在错误绑定的 就打印出来
        if (failBindCount > 0) {
          let faileText = '<br>'
          for (let j = 0; j < failBindList.length; j++) {
            faileText += (j + 1) + '、' + failBindList[j].cusName + '<font color="blue">(' + failBindList[j].errorMsg + ')</font><br>'
          }
          MessageBox.alert('<div style="text-align: left">失败条数:<font color="red">' + failBindCount + '</font> &nbsp;&nbsp;&nbsp;成功条数:' + successBindCount + '</div><div style="text-align: left">绑定失败企业：' + faileText + '</div>', '绑定结果').then(action => {
          })
        }
      }
        // 重新加载企业
      this.selectEnterprise = []
      this.enterpriseList = []
      this.needBindList = null
      this.getBindList()
    },
    enterAddStep () {
      this.$emit('enterAddStep')
    }
  },
  watch: {
    selectEnterprise (val) {

    },
    '$route': 'initData'
  }
}

</script>

<style>
  .page-part{
    background-color: #f3f3f3;
  }
  ._addOther{
    text-align: center;
    color: #f17712;
  }
  .mint-cell{
    margin-bottom: -1rem;
  }

</style>
