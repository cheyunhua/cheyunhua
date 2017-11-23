<template>
   <div class = "sub_menu_list_div" :style = "{ width: currentWidth}">
   <ul class = "sub_menu_list">
     <li v-show = 'status === 1' v-for = "sub_menu in menuList.sub_button" 
     class = "sub_menu_li">{{sub_menu.name}}</li>
     <li class = "sub_menu_li sub_menu_li_main" @click = "changeStatus" >{{menuList.name}}</li>
   </ul>
  </ul>
   </div>
</template>
<script>
export default {
    data() {
    return {
      status:0
    }
  },
  props:[
    "menuList",
    "currentWidth"
  ],
   methods:{
     changeStatus(){
      this.status = 1 -this.status;
     }
   }
}
</script>

<style>
.sub_menu_li{
  list-style: none;
  border:2px solid black; 
  text-align: center;
  height: 2rem;
  line-height: 1.5rem;
  background-color: #fff;
}
.sub_menu_list{     
/* float: left;
display: inline-block;  */
}
.sub_menu_li_main{
}
</style>