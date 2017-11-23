<template>
    <div class="zt-page">
        <div class="card-layout">
            <div class="zt-card"
                 v-for="item in cards"
                 @click.stop="nav(item.url)">
                <div class="zt-icon">
                    <img :src="item.icon"
                         alt="图标">
                </div>
                <div class="zt-label">{{item.label}}</div>
            </div>
            <div class="zt-card card-holder"
                 v-if="cards.length%2">
            </div>
        </div>
        <div class="zt-foot">
            <p>运营平台驻厅版本1.1</p>
        </div>
    </div>
</template>

<script>
import nav from 'src/router/nav'
export default {
    data() {
        return {
            cards: [
                {
                    icon: require('../../../assets/images/zt/index_03.jpg'),
                    label: '服务评价',
                    url: '/yyptzt/serviceEvaluation'
                }, {
                    icon: require('../../../assets/images/zt/index_05.jpg'),
                    label: '我的二维码',
                    url: '/yyptzt/myQRCode'
                },
            ]
        }
    },
    methods: {
        nav
    }
}
</script>

<style scoped>
.zt-page {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.card-layout {
    width: 90%;
    margin: 1.5rem auto ;
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
}
.zt-card {
    flex: 0 1 48%;
    padding: 2rem;
    margin: 1rem 0;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.card-holder {
    background-color: transparent;
}
.zt-icon {
    width: 100%;
}
.zt-icon>img {
    width: 50%;
    height: 50%;
    margin-left: auto;
    margin-right: auto;
    display: block;
}
.zt-label {
    color: #000;
    font-size: 1.3rem;
    margin-top: 1.5rem;
}
.zt-foot {
    position: fixed;
    bottom: 5rem;
    padding-bottom: 2rem;
    width: 100%;
}
.zt-foot>p {
    font-size: 1.3rem;
    color: #adadad;
    text-align: center;
}
</style>
