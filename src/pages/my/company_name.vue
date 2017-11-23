<template>
  <div>
      <div class="toptitle" ><span class="dot iconfont icon-jiantou" v-on:click="goBack()"></span>公司名称</div>

    <div class="company-name-content">
      <div class="item-company-name" v-for="item in cusList" @click="chooseItem(item)">
        <div class="company-name-left">
          <div class="company-name">{{item.custName}}</div>
        </div>
        <div class="company-name-right" v-show="selectedCustId == item.custId">
          <div ><i class="fa fa-check" style="font-size: 1.3em;color: #FF7043;padding-top: 0.6em;"></i></div>
        </div>
      </div>

    </div>

  </div>
</template>
<style scoped>
  .company-name-content {
    padding-top: 0.5em;
  }
  .item-company-name {
    width: 100%;
    height: 3.2em;
    background-color: #ffffff;
    border-bottom: 0.1em solid #E3E3E3;
  }
  .company-name {
    padding: 0.7em 0 0 1em;
    color: #949494;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .company-name-left {
    height: auto;
    width: 85%;
    float: left;
  }
  .company-name-right {
    height: auto;
    width: 15%;
    float: left;
  }
</style>
<script>
    import {mapState} from 'vuex';
  const WX_USER_CUSTSTORELIST = 'wx.user.custStoreList';
  const WX_USER_CUST_ID = 'wx.user.cust.id';  //当前custid
  const WX_USER_CUST_NAME = 'wx.user.cust.name';  //当前custname
  const localStorage = global.localStorage;

  export default {
    name: 'page-agent',
    props: ['agentDetail'],
    components: {
    },
    data() {
      return {
        cusList: '',
        selectedCustId: '',
        selectedCustName: ''
      }
    },
    methods: {
      goBack: function () {
        this.$emit('setCustName');
        this.$emit('closeCompanyNameAgent');

      },
      chooseItem: function (item) {
        console.log("---------" + localStorage.getItem(WX_USER_CUSTSTORELIST));

        this.selectedCustId = item.custId;
        localStorage.setItem(WX_USER_CUST_ID, this.selectedCustId);
        localStorage.setItem(WX_USER_CUST_NAME,item.custName);
        setTimeout(()=>this.goBack(),1000);

      },
        fetchData(){
            console.info("初始化公司列表");
            this.selectedCustId=localStorage.getItem(WX_USER_CUST_ID);
            var custlist =localStorage.getItem(WX_USER_CUSTSTORELIST);
            if(custlist!=""){
                this.cusList=JSON.parse(custlist);

            }
        }
    },
      computed: mapState({

          loginTime: state => state.account.login.loginTime,
      }),
      watch:{
          loginTime(val){
              console.log('登录成功次数'+val);
              this.fetchData();
          }
      },
    created: function () {

        this.fetchData();

    }
  }
</script>
