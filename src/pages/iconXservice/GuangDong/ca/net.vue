<script>
export default {
    data() {
        return {
            selected: '1',
            data: [
                {
                    name: '广州',
                    id: '1',
                    body: [
                        { col1: '天河车陂网点', col2: '广州市天河区车陂龙口大街7号龙口商业大厦5楼' },
                        { col1: '番禺市桥网点', col2: '广州市番禺区市桥街光明南路199号友利创意产业园7号楼201室' },
                        { col1: '黄埔网点', col2: '广州市黄埔区大沙北路泰景中街9号（黄埔国税局隔壁）' },
                        { col1: '花都网点', col2: '广州市花都区天贵路62-1号天贵大厦4楼3A01-3A03' },
                        { col1: '荔湾网点', col2: '广州市荔湾区人民中路246号中域电信营业厅内' },
                        { col1: '增城新塘网点', col2: '增城市新塘镇东坑三横路1号汇创国贸大厦二栋901室' },
                    ],
                    time: '09:00-12:00； 14:00-17:30',
                    timeNote: ' (逢周五下午、节假日不对外办公)',
                    phone: '95105000',
                    notes: [
                        '编号 1、广东省电子税务局系统业务操作咨询包含（申报、发票、文书等业务）；',
                        '编号 2、广州国税数字证书（CA）业务咨询、申请及领取；',
                        '编号 3、广州国税数字证书（CA）年费续缴、解锁业务办理；',
                    ],
                },
                {
                    name: '江门',
                    id: '2',
                    body: [
                        { col1: '蓬江区行政服务中心', col2: '江门市蓬江区堤西路88号' },
                        { col1: '新会区国税大厅', col2: '江门市新会区葵安路2号国家税务局' },
                        { col1: '江海区国税大厅', col2: '江门市江海区东海路123号江海国税一楼大厅' },
                        { col1: '鹤山市国税大厅', col2: '广东省鹤山市沙坪镇新城路8号' },
                        { col1: '台山市国税大厅', col2: '广东省台山市和平路2号' },
                        { col1: '开平市国税大厅', col2: '广东省开平市三埠区东胜路39号' },
                        { col1: '恩平市国税大厅', col2: '广东省恩平市广场e区6号荣誉市民大道' },
                    ],
                    time: '08:30-12:00； 14:30-17:30',
                    timeNote: ' (周一至周五办公、周六日休息)',
                    phone: '400-99-12366',
                    notes: [
                        '编号 1、电子税务局软件业务操作咨询包含（申报、发票、文书等业务）；',
                        '编号 2、数字证书（CA）业务办理包含（申报无纸化、文书无纸化）；',
                        '编号 3、涉税短信业务办理包含（税务机关通知公告提醒、涉税类提醒、发票类提醒、风险类提醒）；',
                        '编号 4、江门国税 “广东省电子税务局” “办税助手” 软件业务操作使用咨询；',
                        '编号 5、江门国税 “税务回单柜” 业务咨询包含（发票代开、发票领用、纸质文书）实现 “即办、即取、即走” 的 “一站式” 服务；',
                    ],
                },
                {
                    name: '惠州',
                    id: '3',
                    body: [
                        { col1: '江北', col2: '惠州市惠城区江北街道文昌二路3号，惠州市惠城区国家税务局（大厅）' },
                        { col1: '河南岸', col2: '惠州市惠城区河南岸广厦新苑5栋111号金财互联门店' },
                        { col1: '河南岸', col2: '广东省惠州市惠城区白泥路群芳苑7栋2楼' },
                        { col1: '水口', col2: '惠州市惠城区水口街道湖西一路三街1号湖西一路新区' },
                        { col1: '小金口', col2: '惠州市惠城区金府路1号2楼大厅' },
                        { col1: '博罗行政办公楼', col2: '博罗县罗阳镇商业西街行政服务中心E厅' },
                        { col1: '仲恺', col2: '惠州市惠城区仲恺高新区和畅6路和畅国际小区首层国税地税联合办税1楼大厅关爱室房' },
                        { col1: '陈江国税', col2: '惠城区陈江街道平南盛华路仲恺高新区地税局' },
                        { col1: '惠阳淡水国税', col2: '广东省惠州市惠阳区淡水街道演达二路' },
                        { col1: '大亚湾澳头国税', col2: '大亚湾区石化大道中科技路1号' },
                        { col1: '惠东国税', col2: '惠东县平山镇河北一路15号黄排国税局办税大厅B108' },
                    ],
                    time: '08:30-17:00 （周一至周五）',
                    timeNote: ' (周六日休息)',
                    phone: '400-99-12366',
                    notes: [
                        '编号 1、电子税务局软件业务操作咨询包含（申报、发票、文书等业务）；',
                        '编号 2、数字证书（CA）业务办理包含（申报无纸化、文书无纸化）；',
                        '编号 3、惠州国税 “税务回单柜” 业务咨询包含（发票代开、发票领用、纸质文书）实现 “即办、即取、即走” 的 “一站式” 服务；',
                    ],
                },
                {
                    name: '东莞',
                    id: '4',
                    body: [
                        { col1: '厚街国税分局', col2: '东莞市厚街镇厚街大道东国税大楼' },
                        { col1: '南城国税分局', col2: '东莞市南城区宏北路8号' },
                        { col1: '凤岗国税分局', col2: '东莞市凤岗镇永盛大街政通路2号' },
                        { col1: '樟木头国税分局', col2: '东莞市樟木头镇银河北路7号' },
                        { col1: '清溪国税分局', col2: '东莞市清溪镇鹿城西路2号' },
                        { col1: '长安国税分局', col2: '东莞市长安镇东门西路8号' },
                        { col1: '塘厦国税分局', col2: '东莞市塘厦镇塘福路2号' },
                        { col1: '常平国税分局', col2: '东莞市常平镇常平大道国税大楼' },
                        { col1: '寮步国税分局', col2: '东莞市寮步镇勤政路4号' },
                        { col1: '大岭山国税分局', col2: '东莞市大岭山镇教育路102号' },
                        { col1: '虎门国税分局', col2: '东莞市虎门镇行政小区　' },
                        { col1: '东城国税分局', col2: '东莞市南城簪花岭国税大楼' },
                        { col1: '万江国税分局', col2: '东莞市万江区万福路100号' },
                    ],
                    time: '08:30-17:00 （周一至周五）',
                    timeNote: ' (周六日休息)',
                    phone: '400-99-12366',
                    notes: [
                        '编号 1、电子税务局软件业务操作咨询包含（申报、发票、文书等业务）；',
                        '编号 2、数字证书（CA）业务办理包含（申报无纸化、文书无纸化）；',
                        '编号 3、涉税短信业务办理包含（税务机关通知公告提醒、涉税类提醒、发票类提醒、风险类提醒）；',
                        '编号 4、东莞国税 “税企通” 软件业务操作使用咨询；',
                        '编号 5、东莞国税 “税务回单柜” 业务咨询包含（发票代开、发票领用、纸质文书），实现 “即办、即取、即走” 的 “一站式” 服务；',
                    ],
                },

            ]
        }
    },
    methods: {

    },
}

</script>

<template>
    <div class="overlay-wrapper">
        <v-wx-header title="国税网点查询"
                     showLeft/>
        <mt-navbar v-model="selected"
                   class="cus-nav-bar">
            <mt-tab-item v-for="item in data"
                         :id="item.id">{{item.name}}</mt-tab-item>
        </mt-navbar>
        <!-- tab-container -->
        <div class="ca-scroller">
            <mt-tab-container v-model="selected">
                <mt-tab-container-item v-for="item in data"
                                       :id="item.id">
                    <table class="ca_table">
                        <thead>
                            <tr>
                                <th>服务网点</th>
                                <th>服务网点地址</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="col in item.body">
                                <td>{{col.col1}}</td>
                                <td>{{col.col2}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="bottom">
                        <div class="bottom-info">
                            <div>营业时间</div>
                            <div>{{item.time}}
                                <p class="timeNote">{{item.timeNote}}</p>
                            </div>
                        </div>
                        <div class="bottom-info">
                            <div>公共服务电话</div>
                            <div>{{item.phone}}</div>
                        </div>
                        <div class="bottom-info-long">
                            <div>可办理业务内容</div>
                            <div>
                                <p v-for=" note in item.notes">{{note}}</p>
                            </div>
                        </div>
                    </div>
                </mt-tab-container-item>

            </mt-tab-container>
        </div>
    </div>
</template>

<style scoped>
.bottom {
    margin-top: -9rem;
    margin-bottom: 8rem;
}
.bottom-info,
.bottom-info-long {
    color: #FF9800;
    font-weight: normal;
    padding: 1rem;
    background-color: white;
    margin-top: .5rem;
    display: flex;
}
.bottom-info {
    align-items: center;
}
.bottom-info>div {
    font-size: 1.4rem;
}
.bottom-info>div:nth-child(1) {
    width: 12rem;
}
.bottom-info-long {
    flex-direction: column;
}
.bottom-info-long>div:nth-child(2) {
    color: #757575;
}
.bottom-info-long p {
    font-size: 1.3rem;
    margin-top: 1rem;
}
.timeNote {
    color: #757575;
    font-size: 1.3rem;
}
</style>
