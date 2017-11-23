<template>

  <div class="page-radio">
    <header class="fx-header">
      <div class="fx-header-top fx-orange">
        <i class="glyphicon glyphicon-menu-left fx-ico-left" v-on:click="cancelCustomer"></i>公司列表
      </div>
    </header>
    <div class="over">
    <mt-radio
      class="page-part"
      title=""
      v-model="value"
      :options="options" />
    </div>
    <div>
      <mt-cell title="选中的公司" v-if="selectInput">{{ value }}</mt-cell>
    </div>
  </div>

</template>

<script type="es6">
  import _track from '../../api/track';
  export default {
    name: 'page-radio',
    props:['customerActions'],
    data() {
      return {
        value: '',
        label: '',
        storeDeptId: '',
        storeDeptName: '',
        storeAddress: '',
        selectInput:false,
        options:[],
      };
    },
    created() {
    },
    methods:{
      cancelCustomer(){
        this.$emit('cancelCustomers',false);
      }
    },
    watch: {
      //监听父组件 公司数据加载完毕后 渲染 单选服务数据填充
      customerActions:function(){
        this.options=this.customerActions;
      },
      //监听单选服务被选中之后的事务
      value: function (){
        this.$emit('cancelCustomers',false);
        for(var i =0;i<this.options.length;i++){
          if(this.options[i].value===this.value){
            this.label = this.options[i].label;
            this.storeDeptId = this.options[i].storeDeptId;
            this.storeDeptName = this.options[i].storeDeptName;
            this.storeAddress = this.options[i].storeAddress;
            this.vipManagerEncode = this.options[i].vipManagerEncode;
          }
        }
        //埋点;客户选中公司之后
        _track._track_setCompany(this.value,this.label);
        this.$emit('selectCustomer',{customerCode:this.value,customerName:this.label,storeDeptId:this.storeDeptId,storeDeptName:this.storeDeptName,storeAddress:this.storeAddress,vipManagerEncode:this.vipManagerEncode});
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
  .mint-radio-label{
    color: #000000;
  }
  .over{
    width: 100%;
    height:510px;
    overflow: auto;
  }
</style>
