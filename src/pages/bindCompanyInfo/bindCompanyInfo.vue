<template>
  <div class="bdqyxx">
    <v-wx-header title="绑定企业信息" showLeft/>
    <div class="personalInfo">
      <div class="personalInfo-img">
        <img src="../../assets/images/touxiang.png"/>
      </div>
      <div class="personalInfo-name">
        {{userName}}
      </div>
      <div class="personalInfo-tip">
        <span>用户绑定企业信息后，可享受一对一专属服务</span>
      </div>
    </div>

    <div class="personalInfo-form">
      <div class="personalInfo-item">
        <div class="personalInfo-item-label">
          <span><span style="color:#FF9E0F">*</span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</span>
        </div>
        <div class="personalInfo-item-input">
          <input type="text" placeholder="请输入您的姓名" ref="input" v-model="name"/>
        </div>
      </div>
      <div class="personalInfo-item">
        <div class="personalInfo-item-label">
          <span><span style="color:#FF9E0F">*</span>手机号码:</span>
        </div>
        <div class="personalInfo-item-input">
          <input type="text" placeholder="请输入您的手机号码" ref="input" v-model="phone"/>
        </div>
      </div>
      <div class="personalInfo-item">
        <div class="personalInfo-item-label">
          <span><span style="color:#FF9E0F">*</span>验&nbsp;&nbsp;证&nbsp;&nbsp;码:</span>
        </div>
        <div class="personalInfo-item-input" style="width:35%;">
          <input type="text" placeholder="请输入验证码" ref="input" v-model="captcha"/>
        </div>
        <div class="personalInfo-item-input-verify" v-if="canGetCaptcha" @click="getCaptcha()">
          <div >获取验证码</div>
        </div>
        <div class="personalInfo-item-input-verify2" v-else>
          <div>重新发送({{time}}s)</div>
        </div>
      </div>
    </div>

    <div class="buttom">
      <mt-button size="large" @click="submitForm">下&nbsp;一&nbsp;步</mt-button>
    </div>

  </div>
</template>
<script>
import { Button,Toast } from 'mint-ui';
export default {
  data(){
    return{
      userName:'陈晓燕',
      canGetCaptcha:true,
      time:60,
      name:'',
      phone:'',
      captcha:''
    }
  },
  methods:{
    getCaptcha(){
      if( this.time == 0 ){
        this.canGetCaptcha = true;
        this.time = 60;
        return
      }else {
        this.canGetCaptcha = false;
        this.time --;
      }
      var _this = this;
      setTimeout(function() { _this.getCaptcha() },1000);
    },
    checkPhone(phone){
			if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){
	      return false;
	    }else{
				return true;
			}
		},
    submitForm(){
      if( !this.name){
				Toast("姓名不能为空！");
				return;
			}
			if( !this.phone ){
				Toast("手机号不能为空！");
				return;
			}
			if(!this.checkPhone(this.phone)){
				Toast("手机号码有误，请重填");
				return;
			}
      if( !this.captcha ){
        Toast("验证码不能为空！");
				return;
      }
    }
  }
}
</script>
<style scoped>
.bdqyxx .personalInfo {
  height: 10em;
  width: 100%;
}
.bdqyxx .personalInfo-img {
  height: 4.5em;
  width: 4.5em;
  margin: 1em auto 0 auto;
}
.bdqyxx .personalInfo-img > img {
  height: 4.5em;
  width: 4.5em;
  margin: 0 auto;
  border-radius: 50%;
}
.bdqyxx .personalInfo-name {
  text-align: center;
  margin-top: 0.5em;
  color:#8A8A8D;
}
.bdqyxx .personalInfo-tip {
  height: auto;
  width: 100%;
}
.bdqyxx .personalInfo-tip {
  color: #F76C07;
  text-align: center;
  margin-top: 1em;
}
.bdqyxx .personalInfo-form {

}
.bdqyxx .personalInfo-item {
  width: 100%;
  height: 3em;
  background: #ffffff;
  border-bottom: 0.1em solid #E3E3E3;
}
.bdqyxx .personalInfo-item-label {
	float: left;
	width: 30%;
	height: auto;
	text-align:left;
}
.bdqyxx .personalInfo-item-label > span {
	line-height: 3em;
	margin-left: 1em;
	color: #9B9B9C
}
.bdqyxx .personalInfo-item-input {
	float: left;
	width: 70%;
	height: auto;
}
/*placeholder颜色*/
*::-webkit-input-placeholder {
    color: #DDDDDE;
}

*:-moz-placeholder {
    color: #DDDDDE;
}

*:-ms-input-placeholder {
    /* IE10+ */
    color: #DDDDDE;
}
.bdqyxx .personalInfo-item-input > input {
	width:90%;
	height: 2.5em;
	margin-top: 0.2em;
}
.bdqyxx .personalInfo-item-input-verify {
  float: left;
  width: 35%;
  height: 100%;
}
.bdqyxx .personalInfo-item-input-verify > div {
  width: 80%;
  margin-top: 0.28em;
  background: #FF7045;
  height: 80%;
  border-radius: 0.4em;
  text-align: center;
  padding-top:0.44em;
  color: #ffffff;
}
.bdqyxx .personalInfo-item-input-verify2 {
  float: left;
  width: 35%;
  height: 100%;
}
.bdqyxx .personalInfo-item-input-verify2 > div {
  width: 90%;
  margin-top: 0.28em;
  background: #ababab;
  height: 80%;
  border-radius: 0.4em;
  text-align: center;
  padding-top:0.44em;
  color: #ffffff;
}
.bdqyxx .buttom {
  margin-top: 5em;
	height: auto;
	width: 100%;
}
.mint-button {
	background-color: #FF7042;
	color: #ffffff;
}
.mint-button::after {
	background-color: #2EF821;
}
</style>
