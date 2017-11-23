<script>
export default {
    data() {
        return {
            selected: '1'
        }
    },
    created() {

    },
    mounted() {

    },
    methods: {

    },
}

</script>

<template>
    <div class="overlay-wrapper">
        <v-wx-header title="广东国税 CA 服务网点"
                     showLeft/>
        <mt-navbar v-model="selected" class="cus-nav-bar">
            <mt-tab-item id="1">惠州服务网点</mt-tab-item>
            <mt-tab-item id="2">东莞服务网点</mt-tab-item>
        </mt-navbar>
        <!-- tab-container -->
        <div class="ca-scroller">
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <table class="ca_table">
                        <thead>
                            <tr>
                                <th>税务局</th>
                                <th>国税地址</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>江北</td>
                                <td>惠州市惠城区江北街道文昌二路 3 号，国家税务局 24 小时服务厅</td>
                            </tr>
                            <tr>
                                <td>河南岸</td>
                                <td>惠州市惠城区河南岸广厦新苑 5 栋 111 号金财互联门店</td>
                            </tr>
                            <tr>
                                <td>河南岸</td>
                                <td>广东省惠州市惠城区白泥路群芳苑 7 栋 2 楼</td>
                            </tr>
                            <tr>
                                <td>水口</td>
                                <td>惠州市惠城区水口街道湖西一路三街 1 号湖西一路新区</td>
                            </tr>
                            <tr>
                                <td>小金口</td>
                                <td>惠州市惠城区金府路 1 号 2 楼大厅</td>
                            </tr>
                            <tr>
                                <td>博罗行政办公楼</td>
                                <td>博罗县罗阳镇商业西街行政服务中心 E 厅</td>
                            </tr>
                            <tr>
                                <td>仲恺</td>
                                <td>惠城区仲恺高新区和畅 6 路和畅国际小区首层国税地税联合办税 1 楼大厅关爱室房</td>
                            </tr>
                            <tr>
                                <td>陈江国税</td>
                                <td>惠城区陈江街道平南盛华路仲恺高新区地税局</td>
                            </tr>
                            <tr>
                                <td>惠阳淡水国税</td>
                                <td>广东省惠州市惠阳区淡水街道演达二路</td>
                            </tr>
                            <tr>
                                <td>大亚湾澳头国税</td>
                                <td>大亚湾区石化大道中科技路 1 号</td>
                            </tr>
                            <tr>
                                <td>惠东国税</td>
                                <td>惠东县平山镇河北一路 15 号黄排国税局办税大厅 B108</td>
                            </tr>
                        </tbody>
                    </table>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <table class="ca_table">
                        <thead>
                            <tr>
                                <th>办税厅名称</th>
                                <th>地址 （咨询电话）</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>中堂税务分局办税服务厅</td>
                                <td>东莞市中堂镇北王西路 2 号
                                    <p class="phone">88811757</p>
                                </td>
                            </tr>
                            <tr>
                                <td>望牛墩税务分局办税服务厅</td>
                                <td>东莞市望牛墩镇镇中路望联路段
                                    <p class="phone">88853945</p>
                                </td>
                            </tr>
                            <tr>
                                <td>麻涌税务分局办税服务厅</td>
                                <td>东莞市麻涌镇麻涌大道东太路段旁 33 号
                                    <p class="phone">88825549</p>
                                </td>
                            </tr>
                            <tr>
                                <td>高埗税务分局办税服务厅</td>
                                <td>东莞市高埗镇高埗大道南 22 号
                                    <p class="phone">88786671</p>
                                </td>
                            </tr>
                            <tr>
                                <td>石碣税务分局办税服务厅</td>
                                <td>东莞市石碣镇崇焕中路
                                    <p class="phone">86385993</p>
                                </td>
                            </tr>
                            <tr>
                                <td>道滘税务分局办税服务厅</td>
                                <td>东莞市道滘镇花园大街 6 号
                                    <p class="phone">88336610</p>
                                </td>
                            </tr>
                            <tr>
                                <td>洪梅税务分局办税服务厅</td>
                                <td>东莞市洪梅镇洪梅大道南
                                    <p class="phone">88436819</p>
                                </td>
                            </tr>
                            <tr>
                                <td>厚街税务分局办税服务厅</td>
                                <td>东莞市厚街镇厚街大道东国税大楼
                                    <p class="phone">85587003</p>
                                </td>
                            </tr>
                            <tr>
                                <td>沙田税务分局办税服务厅</td>
                                <td>东莞市沙田镇沙太二路 92 号
                                    <p class="phone">88683239</p>
                                </td>
                            </tr>
                            <tr>
                                <td>长安税务分局办税服务厅</td>
                                <td>东莞市长安镇东门西路 8 号
                                    <p class="phone">85535045</p>
                                </td>
                            </tr>
                            <tr>
                                <td>寮步税务分局办税服务厅</td>
                                <td>东莞市寮步镇勤政路 4 号
                                    <p class="phone">82222162</p>
                                </td>
                            </tr>
                            <tr>
                                <td>大岭山税务分局办税服务厅</td>
                                <td>东莞市大岭山镇教育路 102 号
                                    <p class="phone">85788263</p>
                                </td>
                            </tr>
                            <tr>
                                <td>大朗税务分局办税服务厅</td>
                                <td>东莞市大朗镇金丽路 63 号
                                    <p class="phone">83314342</p>
                                </td>
                            </tr>
                            <tr>
                                <td>黄江税务分局办税服务厅</td>
                                <td>东莞市黄江镇西进路 47 号
                                    <p class="phone">83360850</p>
                                </td>
                            </tr>
                            <tr>
                                <td>樟木头税务分局办税服务厅</td>
                                <td>东莞市樟木头镇银河北路 7 号
                                    <p class="phone">82337187</p>
                                </td>
                            </tr>
                            <tr>
                                <td>清溪税务分局办税服务厅</td>
                                <td>东莞市清溪镇鹿城西路 2 号
                                    <p class="phone">87309322</p>
                                </td>
                            </tr>
                            <tr>
                                <td>塘厦税务分局办税服务厅</td>
                                <td>东莞市塘厦镇塘福路 2 号
                                    <p class="phone">87920011</p>
                                </td>
                            </tr>
                            <tr>
                                <td>凤岗税务分局办税服务厅</td>
                                <td>东莞市凤岗镇永盛大街政通路 2 号
                                    <p class="phone">87779936</p>
                                </td>
                            </tr>
                            <tr>
                                <td>谢岗税务分局办税服务厅</td>
                                <td>东莞市谢岗镇振兴大道 185 号
                                    <p class="phone">87683103</p>
                                </td>
                            </tr>
                            <tr>
                                <td>常平税务分局办税服务厅</td>
                                <td>东莞市常平镇常平大道国税大楼
                                    <p class="phone">83819555</p>
                                </td>
                            </tr>
                            <tr>
                                <td>桥头税务分局办税服务厅</td>
                                <td>东莞市桥头镇桥光大道桥头段 3B 行政办市中心桥头国税局
                                    <p class="phone">81026078</p>
                                </td>
                            </tr>
                            <tr>
                                <td>横沥税务分局办税服务厅</td>
                                <td>东莞市横沥镇中山路国税大楼
                                    <p class="phone">83371371</p>
                                </td>
                            </tr>
                            <tr>
                                <td>东坑税务分局办税服务厅</td>
                                <td>东莞市东坑镇工业大道世纪广场旁
                                    <p class="phone">83385766</p>
                                </td>
                            </tr>
                            <tr>
                                <td>企石税务分局办税服务厅</td>
                                <td>东莞市企石镇振华路 160 号
                                    <p class="phone">86666211</p>
                                </td>
                            </tr>
                            <tr>
                                <td>石排税务分局办税服务厅</td>
                                <td>东莞市石排镇公园南路 1 号
                                    <p class="phone">86558230</p>
                                </td>
                            </tr>
                            <tr>
                                <td>茶山税务分局办税服务厅</td>
                                <td>东莞市茶山镇怡华北路 20 号
                                    <p class="phone">86178080</p>
                                </td>
                            </tr>
                            <tr>
                                <td>南城税务分局办税服务厅</td>
                                <td>东莞市南城区宏北路 8 号
                                    <p class="phone">22993912、22993283</p>
                                </td>
                            </tr>
                            <tr>
                                <td>万江税务分局办税服务厅</td>
                                <td>东莞市万江区万福路 100 号
                                    <p class="phone">22789778</p>
                                </td>
                            </tr>
                            <tr>
                                <td>东城税务分局办税服务厅</td>
                                <td>东莞市南城簪花路国税大楼
                                    <p class="phone">22317118</p>
                                </td>
                            </tr>
                            <tr>
                                <td>莞城税务分局办税服务厅</td>
                                <td>东莞市南城簪花路国税大楼
                                    <p class="phone">22317038</p>
                                </td>
                            </tr>
                            <tr>
                                <td>石龙税务分局办税服务厅</td>
                                <td>东莞市石龙镇西湖中路 260 号国税大楼
                                    <p class="phone">86185730</p>
                                </td>
                            </tr>
                            <tr>
                                <td>虎门税务分局办税服务厅</td>
                                <td>东莞市虎门镇行政小区
                                    <p class="phone">85118115</p>
                                </td>
                            </tr>
                            <tr>
                                <td>直属税务分局办税服务厅</td>
                                <td>东莞市城区金牛横路 12 号
                                    <p class="phone">22330175、22330176</p>
                                </td>
                            </tr>
                            <tr>
                                <td>松山湖税务分局办税服务厅</td>
                                <td>松山湖高新科技产业园区礼宾路一号松山湖一站式办事中心一楼
                                    <p class="phone">22892192</p>
                                </td>
                            </tr>
                            <tr>
                                <td>车购税分局办税服务厅</td>
                                <td>东莞市东城区下桥龙樟路时丰大厦一楼
                                    <p class="phone">22608690</p>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </mt-tab-container-item>

            </mt-tab-container>
        </div>
    </div>
</template>

<style scoped>
td>.phone {
    color: #F0870C;
    padding-top: .5rem
}
</style>
