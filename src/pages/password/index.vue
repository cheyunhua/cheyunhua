<template>
<div>
 <div class="fx-header-top fx-orange">
       <i v-on:click="goBack" class="fa fa-angle-left"></i>设置密码
    </div>
  <div class="change-container">
        (用户可用手机号码和此密码登录<span class="fx-color-orange">金财学院</span> )
      </div>
        <ul>
          <li class="fx-form-li fx-white fx-border-top">
            <img src="../../assets/images/setting/lock.png" />
            <label>旧密码</label>
            <input class="" type="password" name="" id="" value="" placeholder="请输入旧密码" />
            <div class="change-p">
              (如无旧密码可以不填此项)
            </div>
          </li>
          <li class="fx-form-li fx-white fx-border-top">
             <img src="../../assets/images/setting/lock.png" />
            <label>新密码</label>
            <input class="" type="password" name="" id="" value="" placeholder="请输入6-16位新密码" />
          </li>
          <li class="fx-form-li fx-white fx-border-top" style="margin:0">
            <img src="../../assets/images/setting/lock.png" />
            <label>确认密码</label>
            <input class="" type="password" name="" id="" value="" placeholder="请再次输入新密码" />
          </li>
        </ul>
      <div class="fx-button">
        <button class="fx-button-import  fx-orange" id="">确认</button>
      </div>
</div>
</template>
<script type="es6">
  import Vue from 'vue';
  import api from '../../api/';
  import { Toast,Indicator  } from 'mint-ui';
  export default {
  data(){
    return{

    }
  },
  mounted(){
  },
  methods:{

      goBack: function() {
          window.history.go(-1);
        }
  },
  created(){

  },
};
</script>
<style >

.fx-border-top {
  border-top: 0.1rem solid #e3e3e3;
}

.fx-button-import {
    color: white;
    text-align: center;
    padding: 0.8rem;
    margin-top: 2rem;
    width: 100%;
    height: 3.5rem;
    font-size: 1.8rem;
    border-radius:0.8rem;
}
.fx-color-orange{
  color: #f17712;
}

.fx-white{
  background: #FFFFFF;
}
.fx-form-li img {
  width: 2.5rem;
  height:2.5rem;
}

.fx-form-li label {
  width: 7rem;
}


.change-p {
  font-size: 12px;
  color: #ccc;
  margin-left: .5rem;
   text-align: center;
}

.change-container {
  text-align: center;
   font-size: 12px;
  color: #ccc;
  padding: 1.2rem 0;
}

.text-center {
  padding: .8rem 0;
}

input {
  outline: none;
}


.fx-wrapper {
  margin-bottom: 5rem;
}

ol,
ul {
  padding: 0;
  list-style-type: none;
}

body {
  background: #f3f3f3;
}



/**修改图标样式**/

.glyphicon-menu-right {
  text-align: right;
  color: #bcbcbc;
  line-height: 5rem;
}
.glyphicon-menu-down {
  margin-left: 0.8rem;
}

/**头部**/

.fx-header-text {
  background: #f17712;
  height: 4.5rem;
  color: #FFFFFF;
  position: relative;
}

.fx-header-top {
  text-align: center;
  height: 3.8rem;
  line-height: 3.8rem;
  font-size: 2rem;
  background: #242328;
  color: #fff;
  position: relative;
}




/**类型**/
.fx-style-num .col-xs-4 {
  padding: 0;
}

.fx-background {
  background: #fdeee2;
}

.fx-border {
  border-left: 0.1rem solid #e3e3e3;
  border-right: 0.1rem solid #e3e3e3;
}

.fx-style-header {
  height: 4.5rem;
  line-height: 4.5rem;
}

.fx-style-num {
  border-top: 0.1rem solid #e3e3e3;
  /*border-bottom: 0.1rem solid #e3e3e3;*/
}

.fx-style-num .row .col-xs-4 {
  height: 12.3rem;
}

.fx-style-num .row div img {
  margin: 1.2rem 0;
}


/**列表**/

.conten-text {
  height: 3.9rem;
  background: #f3f3f3;
  line-height: 3.9rem;
}

.conten-text p {
  margin: 0 1.2rem;
}

.conten-text span {
  color: #f17712;
}


/**列表二**/

.fx-form-li {
  position: relative;
  padding: 1rem 1.2rem;
}

.fx-form-li label {
  font-family: "Microsoft YaHei";
  font-weight: 100;
  margin: 0;
}

.fx-form-li-input {
  position: absolute;
  right: 1.2rem;
  text-align: right;
  line-height: 3rem;
  color: #a0a0a0;
}


/**居中按钮**/
.fx-button{
  padding: 0 2rem;
}



</style>
