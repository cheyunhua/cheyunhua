<template>
  <div class="navHead">
<!--    <div class="tit-details"><img src="../../assets/images/about/xqy_02.png"></div>
    <div class="tit-details"><img src="../../assets/images/about/xqy_03.png"></div>
    <div class="tit-details"><img src="../../assets/images/about/xqy_04.png"></div>
    <div class="tit-details"><img src="../../assets/images/about/xqy_05.png"></div>
    <div class="tit-details"><img src="../../assets/images/about/xqy_06.png"></div>
    <div class="tit-details"><img src="../../assets/images/about/xqy_07.png"></div>
    <div class="tit-details"><img src="../../assets/images/about/xqy_08.png"></div>
    <div class="tit-details"><img src="../../assets/images/about/xqy_09.png"></div>-->
 <!--   <div class="tit-details"><img src="../../assets/images/about/about_01.jpg"></div>
    <div class="tit-details"><img src="../../assets/images/about/about_02.jpg"></div>
    <div class="tit-details"><img src="../../assets/images/about/about_03.jpg"></div>
    <div class="tit-details"><img src="../../assets/images/about/about_04.jpg"></div>
    <div class="tit-details"><img src="../../assets/images/about/about_05.jpg"></div>
    <div class="tit-details"><img src="../../assets/images/about/about_06.jpg"></div>
    <div class="tit-details"><img src="../../assets/images/about/about_07.jpg"></div>
    <div class="tit-details"><img src="../../assets/images/about/about_08.jpg"></div>
    <div class="tit-details"><img src="../../assets/images/about/about_09.jpg"></div>-->
    <div class="tit-details"><img v-for="i in 9" :src="wxImgvUrl + '/about/about_0'+i+'.jpg'"/>
    	
    </div>

  </div>

</template>
<script type="es6">
  import 'src/assets/css/about/common-xqy.css'
  import config from 'src/api/config'
  export default {
       data() {
       	return {
       		
       	}
       },
       created() {
       	this.wxImgvUrl = config.wxImgvUrl;
       }
  }
</script>
