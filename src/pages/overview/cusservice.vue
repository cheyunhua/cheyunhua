<template>
  <div class="page-radio">
    <header class="fx-header">
      <div class="fx-header-top fx-orange">
        <i class="glyphicon glyphicon-menu-left fx-ico-left" v-on:click="cancelService"></i>服务列表
      </div>
    </header>
    <mt-radio
      class="page-part"
      title=""
      v-model="value"
      :options="serviceActions" />
    <div>
      <mt-cell title="选中的服务" v-if="selectInput">{{ value }}</mt-cell>
    </div>
  </div>
</template>

<script type="es6">
  export default {
    name: 'page-radio',
    props:['serviceActions'],
    data() {
      return {
        value: '',
        label: '',
        selectInput:false,
      };
    },
    created() {
    },
    methods:{
      cancelService(){
        this.$emit('cancelService',false);
      }
    },
    watch:{
      //监听单选服务被选中之后的事务
      value: function (){
        this.$emit('cancelService',false);
        for(var i =0;i<this.serviceActions.length;i++){
          if(this.serviceActions[i].value===this.value){
            this.label = this.serviceActions[i].label;
          }
        }
        this.$emit('selectService',{serviceCode:this.value,serviceName:this.label});
      }
    },
    mounted() {

    },
    updated(){
    }
  };
</script>

<style lang="css">
  .page-radio .page-part {
    margin-top: 40px;
  }
</style>
