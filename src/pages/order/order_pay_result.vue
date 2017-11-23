<template>
  <div class="page-field">
      <div class="toptitle" ></span>支付结果</div>
    <div class="line"></div>
    <div class="line"></div>
    <div style="width:100%;text-align:center;background-color:#fff;padding:2rem;" id="zhifuchenggong">
      <i class="icon iconfont icon-weixinzhifu" style="color:#00C901;font-size:8rem;"></i>
      <br>
      <span style="font-size:3rem;">支付成功</span>
    </div>

     <div class="login" style="border-radius: 3px;background-color:#3BAF36;" v-on:click="goIndex();">完成</div>
  </div>
  </section>
</template>
<script>
    import config from '../../api/config';
    import api from '../../api/';
    import _track from '../../api/track';
    import { mapState } from 'vuex';
    import { Toast,Indicator  } from 'mint-ui';
    const localStorage = global.localStorage;
    export default {
        data () {
            return {
                params:{
                    orderId:'有限责任公司注册',
                },
                orderId:'',
                payPrice:'',
                goodsName:'',
                payTime:'',
                result:''
            }
        },
        //通过路由的before钩子解除router-view缓存限制
        //相对于组件来说的，而且应该是在路由进入之前开始准备的
        //所以beforeRouteEnter是调用ajax的时机
        beforeRouteEnter (to, from, next) {
          next(vm => {

            });
      },
      beforeEach(to, from, next){
      },
        //在组件的生命周期完成后，且旧路由即将切换走，新路由beforeEach的时机执行

        beforeRouteLeave(to, from, next){
                next();
        },
        //在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用
        beforeCreate() {
            console.log("come beforeCreate");
        },
        //mounted 是生命期钩子
        mounted(){

          /*var payPrice = localStorage.getItem('order.wx.payPrice');
          var payProject = localStorage.getItem('order.wx.payProject');
          var orderId = localStorage.getItem('order.wx.pay.orderId');
          var payTime = localStorage.getItem('order.wx.pay.time');
          localStorage.removeItem("order.wx.payPrice");
          localStorage.removeItem("order.wx.payProject");
          localStorage.removeItem("order.wx.pay.orderId");
          localStorage.removeItem("order.wx.pay.time");*/

          var payPrice = this.$route.query.payPrice;
          var payProject = this.$route.query.payProject;
          var orderId = this.$route.query.orderId;
          var payTime = this.$route.query.payTime;

          this.payPrice = payPrice;
          this.orderId = orderId;
          this.goodsName = decodeURIComponent(decodeURIComponent(payProject==null?"":payProject));
          this.payTime = payTime;
          this.params.orderId = orderId;
        },
        //computed相当于属性的一个实时计算，如果实时计算里关联了对象，那么当对象的某个值改变的时候，同事会出发实时计算
        computed: mapState({

        }),
        //监听某个值（双向绑定）的变化，一旦发生变化，就调用引号里的方法，从而达到change事件监听的效果！
        watch: {

        },
    created(){
    },
    methods: {
      goIndex:function(){
        var url = localStorage.getItem("wx.pay.finish.url");
        if(url!=null&&url!=""){
          this.$router.push(url);
        }else{
          this.$router.push("wx");
        }
      }
    }
}
</script>
<style scoped>
    .wrapper {
        padding:0;
        margin-top: 3rem;
    }
  .page-part {
  }
  .mint-button {
    background-color: #4cd964
  }
  .mint-header {
    background-color: #f7f7f8;
      border-bottom: 1px solid #e7e7e7;
      color: #3d4145;
  }
</style>
