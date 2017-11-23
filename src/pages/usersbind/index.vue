<template lang="html">
  <v-form-base ref="fb">
      <div class="ljb-pop vuePage currentVuePage" id="user">
          <div class="fx-header-top fx-orange">
            <i class="glyphicon glyphicon-menu-left fx-ico-left" aria-hidden="true" @click="$router.go(-1)"></i>用户绑定
          </div>
          <div class="content">
              <div class="phone"><i class="iconfont">&#xe63e;</i><input type="text" placeholder="请输入手机号码" v-model="params.phone" ></div>
              <div class="code" style="display:flex; flex-direction: row;">
                  <div  style="display:flex; flex-direction: row;flex-grow:2;">
                    <i class="iconfont">&#xe701;</i><input style="width: 100%; " type="text" placeholder="验证码"  v-model="params.captchaCode"  ref="input" >
                  </div>
                  <div style="display:flex; flex-direction: row;flex-grow:2;align-items:center">
                    <a  @click="captcha()" >{{validText}}</a>
                  </div>
                </div>
              <div class="btn" style="display:flex; align-items: center;"><mt-button  style="height: 4rem;line-height: 4rem;width:100%;background-color:#ff7045;color:white" @click="userLogin" :disabled="!doLogin" >{{loginText}}</mt-button></div>
          </div>

      </div>
      <div class="ljb-pop panel vuePage " id="account">
          <div class="fx-header-top fx-orange">
            <i class="glyphicon glyphicon-menu-left fx-ico-left" aria-hidden="true" @click="$refs.fb.toPage('user')"></i>账号绑定
          </div>
          <table style="border-radius: .1rem; box-shadow: 0 0.01rem 0.1rem;" width="100%" border="0" cellspacing="0" cellpadding="0" class="tablemst" id="fomateTab">
              <tr>
                <td class="indenttwo" style="text-indent:10px;width: 35%" >纳税人编码/识别号:</td>
                <td>
                 <input type="text" class="dairu" :style="styleObj" v-model="params.nsrsbh"/>
                </td>
              </tr>
              <tr>
                <td class="indenttwo" style="text-indent:10px;width: 35%"  >纳税人名称:</td>
                <td>
                   <input type="text" class="dairu" :style="styleObj" v-model="params.nsrName "/>
                </td>
              </tr>
              <tr>
                 <td class="indenttwo" style="text-indent:10px;width: 35%" >联系人姓名:</td>
                 <td>
                   <input type="text" class="dairu" :style="styleObj" v-model="params.userName "/>
                 </td>
              </tr>
              <tr>
                 <td class="indenttwo" style="text-indent:10px;width: 35%" >联系人手机号:</td>
                   <td>
                     <input type="number" class="dairu" :style="styleObj" v-model="params.phone "/>
                   </td>
              </tr>
           </table>
           <mt-button  type="primary" size="large" style="background-color: #FF7043;" @click="binding">开始绑定</mt-button>
      </div>
  </v-form-base>
</template>

<script>
import {Toast, Indicator, MessageBox} from 'mint-ui'
import  _track from 'api/track'
import api from 'api/index'
import datas from './data'
import {mapState, mapMutations} from 'vuex'

const localStorage = global.localStorage
const WX_USER_CODE = 'wx.user.code';
const WX_USER_WECHAT_CODE = 'wx.user.wechat.code';
export default {

  data(){
    return {
      params: datas,
      validText: '免费获取验证码',
      loginText: '下一步',
      onLogin: false,
      timer: 60,       //默认倒数30秒
      stop: false,   //默认是停止的，但界面加载之后会变成false
      Interval: null,  //setInterval的对象
      isCatchCode: 1,
      doLogin: true,
      isHook: false,
      hook: {
        r_hook: 'right'
      },
      nohook: {
        m_hook: 'gone'
      },
      accountQcs: null,
      bindedQcs: null,
      styleObj: {
          'text-indent': '10px',
        }
    }
  },
  created() {
  },
  mounted() {

  },
  computed: {

  },
  methods: {

    captcha() {
        if (this.stop) {
            Toast('收不到短信,请在' + this.timer + 's' + '重新发送')
            return;
        }
        let r = this.checkMobile(this.params.phone)
        if(r) {
          this.isCatchCode = 0;
          //埋点
          // _track._trackEvent("JCDZ_WX", "获取登陆验证码", this.params.phone, "");
          this.requestCode(this.params)
          this.startTimer();
        }

    },
    requestCode(params) {
      Indicator.open({
               text: '正在加载数据...',
               spinnerType: 'triple-bounce'
      });
      api.wechatCaptcha(params).then((response) => {
          Indicator.close();
          console.log(params)
        if(response.data.head.errorCode === '0'){
           Toast('短信已发至你的手机，请注意查收')

        }else{
          Toast(response.data.head.errorMsg)
        }
      }).catch(error => {
         Indicator.close()
          Toast(error)
      })

    },
    startTimer () {
        //如果是false就开始倒计时，如果是true就停止倒计时
        if (!this.stop) {
            this.Interval = setInterval(this.update, 1000);
        }
        else {
            clearInterval(this.Interval);
        }

        this.stop = !this.stop;
    },
    update () {
        if(this.timer <= 0)
        {
            this.timer = 60;
            this.validText="重新发送";
            clearInterval(this.Interval);
            this.stop=false;
        }
        else{
            this.timer--;
            this.validText="重新发送("+this.timer+'s)';
            console.log("hdk");

        }

    },
    userLogin() {
        if (!this.params.phone) {
            Toast('手机号码不能为空')
            return
        }else if(!(/^1[34578]\d{9}$/.test(this.params.phone))) {
            Toast('手机号码格式不正确');
            return
        }
        //注释验证码
         try {
         if (this.isCatchCode == 1) {
         Toast('请先获取验证码');
         return;
         }
         } catch (e) {
         console.log("提示失败");
         }
         if (!this.params.captchaCode) {
         Toast('验证码不能为空');
         return;
         }
        this.nextStep()
    },
    nextStep() {
      let param = {
          captchaCode: this.params.captchaCode,
          phone: this.params.phone
      }
      Indicator.open({
               text: '正在加载数据...',
               spinnerType: 'triple-bounce'
      });
      console.log(param)
        api.queryUserBindInfo(param).then((response) => {
        Indicator.close()
          if (response.data.head.errorCode == '0') {
              this.accountQcs = response.data.body;
              console.log(this.accountQcs)

          }
          else {
            MessageBox.alert(response.data.head.errorMsg).then(action => {
              this.$refs.fb.toPage('user')
              return
            });
          }
      }).catch(error => {
         Indicator.close()
          console.error(error)
          //Indicator.close()

      })
        // console.log(response.data)
        // if(response.flag === 'ok'){
        //    Toast({
        //     message: response.Msg,
        //     duration: 500,splice
        // })
        //    let obj = {
        //      nsrName: response.nsrName,
        //      nsr_phone: response.nsr_phone,
        //      nsrsbh: response.nsrsbh,
        //      userName: response.userName
        //    }
        //    this.accountQcs =Object.assign({},obj)
        //    this.$refs.fb.toPage('account')
        //
        // }else if(response.flag === 'error'){
        //   Toast(response.errMsg)
        // }
      // })
    },
    binding() {
      if (!this.params.phone) {
          Toast('手机号码不能为空')
          return
      }else if(!(/^1[34578]\d{9}$/.test(this.params.phone))) {
          Toast('手机号码格式不正确');
          return
      }else if(!this.params.nsrsbh) {
        Toast('识别号不能为空')
        return
      }else if(!this.params.nsrName) {
          Toast('纳税人名称不能为空')
          return
      }else if(!this.params.userName) {
        Toast('联系人不能为空')
        return
      }

      this.execute()
    },
    execute() {
      //debugger;
      let params = {
          userMobilePhone: this.params.phone,
          userName: this.params.userName,
         /* code: localStorage.getItem(WX_USER_CODE),
          wechatCode:localStorage.getItem(WX_USER_WECHAT_CODE),*/
          nsrName: this.params.nsrName,
          nsrsbh: this.params.nsrsbh
      }
      params.code = api.getQueryString("code");
      params.wechatCode = api.getQueryString("state");
      if(!params.code){
        params.code = localStorage.getItem(WX_USER_CODE);
      }
      if(!params.wechatCode){
        params.wechatCode = localStorage.getItem(WX_USER_WECHAT_CODE);
      }
      Indicator.open({
               text: '正在加载数据...',
               spinnerType: 'triple-bounce'
      });
      console.log(this.nsrbind)
      console.info(params)
      api.finalBindNsr(params).then((response)=> {
        Indicator.close()
        if(response.data.head.success) {
          Toast('绑定成功！')

          this.bindedQcs = response.data.messageBody
          this.$refs.fb.toPage('user')

        } else {
              Toast(response.data.head.errorMsg);
          }
      }).catch(error => {
         Indicator.close()
          console.error(error)
      })
    },
    checkMobile(number) {
      let result = false
      if (!number) {
          Toast('手机号码不能为空')
          return
      }else if (!(/^1[34578]\d{9}$/.test(number))) {
          Toast('手机号码格式不正确')
          return
      }else {
        result = true
      }
      return result

    }
  },
  watch: {
      accountQcs : function(nval, oval){
        console.log(nval)
        this.params.nsrName = nval.nsrName
        this.params.phone = nval.userPhone
        this.params.nsrsbh = nval.nsrsbh
        this.params.userName = nval.userName
        this.$refs.fb.toPage('account')

      },
      bindedQcs: function(nval, oval) {

      },
  },
}
</script>

<style scoped lang="css">
     b.r_hook{
      position: absolute;
      top: 1.9rem;
      font-size: 1.9rem;
      color: #878787;
      left: 15.6rem;
      color:#48da48
  }
  b.m_hook {
    position: absolute;
    top: 1.9rem;
    font-size: 1.9rem;
    color: #878787;
    left: 15.6rem;
    color:#ffffff
  }
  .tablems th{ line-height:1.5; text-align:center; font-size:0.8em;  color:#6d6d72; font-weight:normal;}
  .tablems td{  line-height:1.8;/* height:3em;  */font-size:0.9em; overflow:hidden; border-bottom:1px solid #FFF;}
  .tablems td.height{ line-height:3em; height:3em; }
  .tablems td.nobar{ border:none;}
  .tablems tr.onetit td{ background-color:#ebebeb;}
  .tablems tr.onetit td img,.tablems tr.twotit td img{ width:0.7em; margin-right:0.6em; position:relative; top:0em;}
  .tablems tr.twotit td{ background-color:#f7f7f7;}
  .tablems td.indent{ text-indent:1em; padding:1em 0; /*line-height:1em;*/ height:1em;}
  .tablems td.indenttwo{ text-indent:2em;}
  .tablems td.indentthree{ text-indent:3em;}
  .tablems td.indentfour{ text-indent:4em;}
  .tablems td input{ width:100%; margin:0; outline:none; font-size:1em;  border:none; border-style:none; line-height:3em; height:3em; display:block;}
  .tablems td input.shuru{ background-color:#cff3ff; text-indent:0.4em; font-size:1em; color:#333;}
  .tablems td input.dairu{background-color:#eeeeee; text-indent:0.4em; font-size:1em; color:#666;}

  .tablemst th {  border-top: 1px solid #ebebeb;  text-align:left; line-height: 3em; font-size: 0.8em; color: #999; font-weight: normal; text-indent:1em; }
  .tablemst td { line-height: 3em; height: 3em; font-size: 0.9em; overflow: hidden; border-top: 1px solid #e3e3e3; }
  .tablemst td.bobar{ border:none;}
  .tablemst td.imgbar{ border:none; width:3em; height:3em; text-align:center;}
  .tablemst td.imgbar img{ width:52%;  position: relative; top:0.3em; }
  .tablemst td.bartop{ border-top: 1px solid #e3e3e3;}
  .tablemst td input.shuru { background-color:#cff3ff;width: 100%; margin: 0; outline: none; font-size: 1em; border: none; border-style: none; line-height: 3em; height: 3em; display: block; font-size: 1em; color: #333; text-align:right; padding-right:10%; }
  .tablemst td input.cororg{ color:#ff6c00;}
  .tablemst td input.dairu{ background-color:#eeeeee;}
  .tablemst td span{ width:1.6em; height:1.6em; left:0.5em; border-radius:3em; background:#1ecc1e; line-height:1.6em; font-size:1.1em; color:#FFF; display:block; position:relative; top:0em;}
  .tablemst td span.org{ background-color:#ff6c00;}
  .tablemst td span.blue{ background-color:#007ef3;}
  .tablemst td span.qing{ background-color:#1ec6cc;}
  .tablemst td span.yew{ background-color:#f3c800;}

  #fomateTab > tr > td > input.dairu{
        background-color: #e8ecef;
        width: 100%;
        margin: 0;
        outline: none;
        font-size: 1em;
        border: none;
        border-style: none;
        line-height: 3em;
        height: 3em;
        display: block;
        font-size: 1.6rem;
        color: #333;
        text-align: left;
        padding-right: 5%;
    }
</style>
