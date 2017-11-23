<template>
    <div>
        <div class="toptitle"><span class="dot iconfont icon-jiantou" v-on:click="goBack()"></span>查看进展</div>
        <div class="ljb-content clearfix">
            <li class="li01" v-on:click="openPicker">{{selectAccountDate}}</li>

            <li class="li02" v-if="selectServiceCode=='account'">记账</li>
            <li class="li03" v-if="selectServiceCode=='account'">记帐报税服务（内资）<br><span>{{selectCustomerName}}</span></li>

            <li class="li02" v-if="selectServiceCode=='bill'" style="background-color: #2BAF2B;">发票</li>
            <li class="li03" v-if="selectServiceCode=='bill'">发票认证服务（内资）<br><span>{{selectCustomerName}}</span></li>


        </div>
        <div class="progress01">

            <!--0 -完成 ##### 1 -进行中 #####     2 -未开始-->
            <template v-for="items in taskList">
                <li class="list001" v-if="items.statu=='0'" v-on:click="changeTab(items)">
                    <a class="step01">已完成</a><br><span>{{items.itemName}}</span>
                    <div class="icon01" v-if="items.order!='3'"><i class="iconfont icon-xiayige"
                                                                   style="color:#d9d9d9; font-size:2.6rem;"></i></div>
                    <div :class="[{'triangle':currentItem.tab==items.tab}]"></div>
                </li>
                <li class="list002" v-if="items.statu=='1'" v-on:click="changeTab(items)"><a
                    class="step02">进行中</a><br><span>{{items.itemName}}</span>
                    <div class="icon01" v-if="items.order!='3'"><i class="iconfont icon-xiayige"
                                                                   style="color:#d9d9d9; font-size:2.6rem;"></i></div>
                    <div :class="[{'triangle':currentItem.tab==items.tab}]"></div>
                </li>

                <li class="list002" v-if="items.statu=='2'" v-on:click="changeTab(items)"><a
                    class="step03">未开始</a><br><span>{{items.itemName}}</span>
                    <div class="icon01" v-if="items.order!='3'"><i class="iconfont icon-xiayige"
                                                                   style="color:#d9d9d9; font-size:2.6rem;"></i></div>
                    <div :class="[{'triangle':currentItem.tab==items.tab}]"></div>
                </li>
            </template>
        </div>
        <!--取单-->
        <indent v-if="currentItem.tab=='take'" :selectCustomerCode="selectCustomerCode" :selecttxm="selecttxm"
                :currentItem="currentItem"></indent>
        <!--记账-->
        <tally v-if="currentItem.tab=='account'" :selectCustomerCode="selectCustomerCode"
               :selectAccountDate="selectAccountDate" :selectAccountId="selectAccountId"
               :selectServiceCode="selectServiceCode" :selectAccountSysCode="selectAccountSysCode"
               :currentItem="currentItem"></tally>
        <!--报税-->
        <dutiable v-if="currentItem.tab=='tax'" :selectCustomerCode="selectCustomerCode"
                  :selectAccountDate="selectAccountDate" :selectAccountId="selectAccountId"
                  :selectAccountSysCode="selectAccountSysCode" :currentItem="currentItem"></dutiable>

        <mt-datetime-picker
            ref="picker"
            type="date"
            year-format="{value} 年"
            month-format="{value} 月"
            @confirm="selectPicker"
            v-model="pickerValue">
        </mt-datetime-picker>

    </div>
</template>

<script>

    import indent from './indent';
    import tally from './tally';
    import dutiable from './dutiable';
    import api from '../../../api/';
    import _track from '../../../api/track';
    const localStorage = global.localStorage;
    const WX_USER_CUST_ID = 'wx.user.cust.id';  //当前custid
    const WX_USER_CUST_NAME = 'wx.user.cust.name';  //当前custname
    const WX_USER_CUSTSTORELIST = 'wx.user.custStoreList';
    function getLastMonthYestdy() {

        var date = new Date();

        var daysInMonth = new Array([0], [31], [28], [31], [30], [31], [30], [31], [31], [30], [31], [30], [31]);

        var strYear = date.getFullYear();

        var strDay = date.getDate();

        var strMonth = date.getMonth() + 1;

        if (strYear % 4 == 0 && strYear % 100 != 0) {

            daysInMonth[2] = 29;

        }
        if (strMonth - 1 == 0) {

            strYear -= 1;

            strMonth = 12;

        }

        else {

            strMonth -= 1;

        }

        strDay = daysInMonth[strMonth] >= strDay ? strDay : daysInMonth[strMonth];

        if (strMonth < 10) {
            strMonth = "0" + strMonth;

        }

        if (strDay < 10) {

            strDay = "0" + strDay;

        }

        var datastr = strYear + strMonth;

        return datastr;

    }
    export default {
        name: 'page-agent-1',
        // props: ['agentDetail','byselected','taskList'],
        components: {indent, tally, dutiable},
        data() {
            return {

                selectAccountDate: getLastMonthYestdy(),
                pickerValue: '',
                byselected: {},
                taskList: [],
                currentItem: {},
                selecttxm: null,
                //选中的企业名称
                selectCustomerName:localStorage.getItem(WX_USER_CUST_NAME),
                //选中的企业code
                selectCustomerCode: null,
                //被选中的服务编号
                selectServiceCode: null,
                //被选中的帐套id
                selectAccountId: null,
                //帐套系统识别码 区分帐套来源
                selectAccountSysCode: null,

            }
        },

        methods: {
            changeTab(items){
                this.currentItem = items;

            },
            goBack: function () {
                /* console.log("111");
                 this.$emit('closeCheckProgressAgent');
                 console.log("222");*/
                //setTimeout('window.history.go(-1)', 500);
                window.history.go(-1);
            },
            openPicker() {
                this.$refs.picker.open();
            },
            selectPicker(date){

                var year = date.getFullYear();
                var month = (date.getMonth() + 1).toString();
                if (month.length == 1) {
                    month = "0" + month;
                }
                var dateTime = year + month;
                this.selectAccountDate = dateTime;
                this.loaddata();
                // this.loadData(params);
                //埋点:	点击切换时间时，记录事件信息
                // _track._trackEvent("JCDZ_WX","概览-选择时间",this.selectServiceName+"-"+this.selectAccountDate);
            },
            loaddata(){
                var params = {};
                params.cusId = this.selectCustomerCode;
                params.accountMonth = this.selectAccountDate;
                params.serviceCode = this.byselected.selectServiceCode;

                api.queryCusServiceLists(params).then((response) => {
                    if (response.data != null) {
                        if (response.data.head.errorCode === "0") {
                            //debugger;
                            var resultBean = response.data;
                            //start -------------根据选择的客户加载条形码----------
                            if (resultBean.body.fileCoding) {
                                this.selecttxm = resultBean.body.fileCoding;
                            } else {
                                this.selecttxm = null;
                            }
                            /* this.selectAccountId = resultBean.body.accountId;//帐套ID
                             this.selectAccountSysCode = resultBean.body.accountSysCode;//帐套系统识别码 区分帐套来源
                             console.info("帐套ID="+this.selectAccountId );
                             console.info("帐套系统识别码="+this.selectAccountSysCode );
                             */
                        }
                    }
                });
            },
            fetchData(){
                this.pickerValue = new Date();
                this.byselected = this.$route.query.byselected;
                this.taskList = this.$route.query.taskList;
                this.selectServiceCode = this.$route.query.byselected.selectServiceCode;
                this.selectAccountId = this.byselected.selectAccountId;//帐套ID
                this.selectAccountSysCode = this.byselected.selectAccountSysCode;//帐套系统识别码 区分帐套来源
                var cusId = localStorage.getItem(WX_USER_CUST_ID);
                this.selectCustomerCode = cusId;
                this.loaddata();
                console.info("this.selectServiceCode=" + this.selectServiceCode);
            }
        },
        //通过路由的before钩子解决router-view缓存页面问题
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.fetchData();
            });
        },
        computed: {}
    }
</script>
