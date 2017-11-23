<template>
    <div>
        <template v-if="!noData">
        <div class="ljb-wrap">共收取票据（张）<br><span>{{indentZysCount}}</span></div>
        <div class="ljb-wrap01 clearfix">
            <div class="list01">

                <li v-for="list in indentList"><div class="text">{{list.clmc}}（张）<br><span>{{list.zys}}</span></div></li>
               <!-- <li><div class="text">采购（张）<br><span>10</span></div></li>-->
            </div>
           <!-- <div class="list01">
                <li><div class="text">费用（张）<br><span>10</span></div></li>
                <li><div class="text">资金（张）<br><span>10</span></div></li>
            </div>
            <div class="list01">
                <li><div class="text">成本（张）<br><span>10</span></div></li>
                <li><div class="text">工资表（张）<br><span>1</span></div></li>
            </div>
            <div class="list01">
                <li><div class="text">其他（张）<br><span>1</span></div></li>
                <li><div class="text">其他（张）<br><span>1</span></div></li>
            </div>-->
        </div>
        </template>
        <div v-if="noData">
            <vBlackData></vBlackData>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import api from '../../../api/';
    import _track from '../../../api/track';
    import { Toast,Indicator  } from 'mint-ui';
    export default{
        props:['selectCustomerCode','selecttxm','currentItem'],

        data(){
            return {
                indentList: [],
                indentZysCount:0,
                noData:false,

            }
        },
        watch: {
            'selecttxm': 'loadData',
        },
        methods:{
            loadData(){

                console.info("selecttxm="+this.selecttxm);
                console.info("selectCustomerCode="+this.selectCustomerCode);

                if(this.currentItem!=null){
                    if(this.currentItem.statu==="2"||this.currentItem.statu==="1"){
                        this.noData =  true;
                        return;
                    }else{
                        this.noData =  false;
                    }
                }

                Indicator.open({
                    text: "加载中,请稍后",
                    spinnerType: 'snake'
                });
               this.indentList=[];
                this.indentScysCount=0;
                this. indentZysCount=0;

                for(var j=0;j<5;j++){
                    var mp={};
                    mp.clmc='销售';
                    mp.zys=20;
                    this.indentList.push(mp);
                }
                this.indentZysCount=0;
                for(var i=0;i<this.indentList.length;i++){

                    this.indentZysCount = this.indentZysCount + this.indentList[i].zys;
                }

                var params={};
                params.userId=this.selectCustomerCode;
                params.txm=this.selecttxm;
                //概览-取单
                api.queryIndentLists(params).then((response) => {
                    if(response.data!=null){
                        if(response.data.head.errorCode==="0"){
                            var resultBean = eval('(' + response.data.head.errorMsg + ')');
                            if (resultBean.code === 200) {
                                this.indentList =  resultBean.result ;

                               /* for(var j=0;j<5;j++){
                                    var mp={};
                                    mp.clmc='销售';
                                    mp.zys=20;
                                    this.indentList.push(mp);
                                }*/
                                this.indentZysCount=0;
                                for(var i=0;i<this.indentList.length;i++){

                                    this.indentZysCount = this.indentZysCount + this.indentList[i].zys;
                                }
                            }
                            Indicator.close();

                        }else{
                            Indicator.close();
                            Toast("网络异常");
                        }
                    }else{
                        Indicator.close();
                    }


                }).catch((response) => {
                    Indicator.close();
                    Toast("应用异常");
                });
            },

        },
        created() {
            this.loadData();
        }



    }
</script>
