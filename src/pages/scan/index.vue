<template>
    <div>
        <img :src="imgurl" style="width:274px;height: 274px;"/>
    </div>
</template>
<style>

</style>
<script>
    import api from '../../api/';
    export default{
        data(){
            return {
                params: {
                    appid: null,
                    sqqcodeid: null,
                },

                imgurl: null,
                Interval: null,  //setInterval的对象
            }
        },
        created() {

            this.params.appid = api.getQueryString('appid');
            if (!this.params.appid) {
                this.params.appid = this.$route.query.appid;
            }
            console.info("appid=" + this.params.appid);
            api.loginscan(this.params).then((response) => {
                console.log(response.data.head);
                if (response.data.body) {
                    var ticket = response.data.body.ticket;
                    this.params.sqqcodeid = response.data.body.sqqcodeid;
                    console.info("ticket=" + ticket);
                    console.info("sqqcodeid=" + this.params.sqqcodeid);
                    this.imgurl = "https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + ticket;
                    //this.Interval = setInterval(this.listenscan, 1000);


                }
            });
        },
        methods: {
            listenscan(){

                if(this.params.sqqcodeid){
                    api.listenscan(this.params).then((response) => {
                        if (response.data.body) {
                            var sqqcodeid = response.data.body.sqqcodeid;
                            //console.info("返回的sqqcodeId=" + sqqcodeid);
                            if (sqqcodeid == '1') {//扫描登录成功
                                clearInterval(this.Interval);//停止监听
                                var registParams=response.data.body.userinfo;
                                window.external.InvokeService("OmniContainer", "NotifySendWebChat", JSON.stringify(registParams));


                            }else if(sqqcodeid == '2'){//调用自动登录失败

                                //clearInterval(this.Interval);//停止监听
                                alert('调用安全模块自动登录失败，请重新扫描！');
                                //window.location.reload();

                            } else if (sqqcodeid == null) {//验证码有效期过，重新刷新页面
                                clearInterval(this.Interval);//停止监听
                                alert('二维码有效已过，请重新刷新扫描！');
                                //window.location.reload();

                            }
                        }
                    });
                }


            }
        }
    }
</script>
