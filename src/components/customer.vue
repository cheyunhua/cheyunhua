<template>
  <div>
    <mt-cell>
      <i slot="icon" class="iconfont icon-search"></i>
      <mt-field type="text"  placeholder="搜索企业或手机号码"
      :attr="{ maxlength: 30}" v-model="value"  >
      </mt-field>
      <mt-button size="small" type="default" @click.native="cancelCustomers">取消</mt-button>
    </mt-cell>
    <mt-radio
        align="left"
        v-model="value"
        :options="options">
      </mt-radio>
     <!--返回顶部-->
    <vToTop></vToTop>
  </div>
</template>

<script type="es6">
export default {
  name: 'page-tabbar',
  data() {
    return {
      value: '',
      customers:[],
      options : [
            {
              label: '被禁用',
              value: '值F',
              disabled: true
            },
            {
              label: '选项A',
              value: '值A'
            },
            {
              label: '选项B',
              value: '值B'
            }
          ]
    };
  },
  created(){
    this.loadCustomers();
  },
  methods:{
    loadCustomers(){
      console.log('abbbb');
    },
    cancelCustomers(){
        this.$emit('cancelCustomers',false);
    },
    selectCustomer(){

    }
  },
  computed:{
    filterResult(){

    }
  }
};
</script>

<style>
  .page-tabbar {
    overflow: hidden;
    height: 100vh;
  }

  .page-wrap {
    overflow: auto;
    height: 100%;
    padding-bottom: 100px;
  }
</style>
