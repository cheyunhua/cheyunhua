<script>
export default {
    data() {
        return {

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
        <v-wx-header title="广州国税 CA"
                     showLeft/>
        <div class="head">
            <span>广州国税 CA 服务网点</span>
            <span>服务热线： 95105000</span>
        </div>
        <div class="ca-scroller">
            <table class="ca_table">
                <thead>
                    <tr>
                        <th>服务网点</th>
                        <th>服务网点地址</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>番禺市桥网点</td>
                        <td>广州市番禺区市桥街光明南路 199 号友利创意产业园 7 号楼 201 室</td>
                    </tr>
                    <tr>
                        <td>黄埔网点</td>
                        <td>广州市黄埔区大沙北路泰景中街 9 号（黄埔国税局隔壁）</td>
                    </tr>
                    <tr>
                        <td>花都新华网点</td>
                        <td>广州市花都区天贵路 62-1 号天贵大厦 4 楼 3A01-3A03</td>
                    </tr>
                    <tr>
                        <td>荔湾人民中网点</td>
                        <td>广州市荔湾区人民中路 246 号中域电信营业厅内</td>
                    </tr>
                    <tr>
                        <td>增城新塘网点</td>
                        <td>增城市新塘镇东坑三横路 1 号汇创国贸大厦二栋 901 室</td>
                    </tr>
                    <tr>
                        <td>天河车陂网点</td>
                        <td>广州市天河区车陂龙口大街 7 号龙口商业大厦 5 楼</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.head {
    font-size: 1.6rem;
    padding: 1.5rem 1rem;
    display: flex;
    justify-content: space-around;
    color: #757575;
}
.head>span:nth-child(2) {
    color: #FF9800;
}
</style>
