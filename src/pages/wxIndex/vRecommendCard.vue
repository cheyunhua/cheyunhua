<script>
import nav from 'src/router/nav'
import config from 'src/api/config'
const localStorage = global.localStorage;
const WX_USER_TOKEN = 'wx.user.token';

export default {
    data() {
        return {
            list: [
                {
                    title: '办税助手',
                    content: '功能更强大，系统更稳定，办税更流畅',
                    img: require('../../assets/images/wxindex/办税助手.png'),
                    url: '/zb_taxAssistant',
                },
                {
                    title: '金财管家',
                    content: '零风险，闪电申报不求人',
                    img: require('../../assets/images/wxindex/金财管家.png'),
                    url: '/steward',
                },
                {
                    title: '财税天天学',
                    content: '财税天天学，天天学财税。每天5分钟，5门学科循环进阶',
                    img: require('../../assets/images/wxindex/财税天天学.png'),
                    url: config.xyUrl+"?wxtoken="+localStorage.getItem(WX_USER_TOKEN),
                },
                {
                    title: '喀什注册公司',
                    content: '享受所得税五免五减。节税，从注册公司开始',
                    img: require('../../assets/images/wxindex/喀什注册.png'),
                    url: '/register',
                },
            ]
        }
    },
    created() {

    },
    methods: {
        nav
    },
}

</script>
<template>
    <div class="rc">

        <div v-for=" item in list"
             class="item"
             @click.stop="nav(item.url)">
            <div class="desc">
                <div class="title">{{item.title}}</div>
                <div class="content">{{item.content}}</div>
            </div>
            <div class="img-wrap">
                <img class="img"
                     :src="item.img"
                     alt="图片加载失败">
            </div>
        </div>

    </div>
</template>
<style scoped>
.rc {
    background-color: white;
    display: flex;
    flex-wrap: wrap;
}
.row {
    flex: auto;
    display: flex;
}
.item {
    width: 50%;
    height: 12rem;
    display: flex;
    padding: 1rem;
    border: 1px solid #ddd;
    border-bottom: none;
    border-left: none;
}
.desc {
    display: flex;
    flex-direction: column;
}
.img-wrap {
    margin: auto;
}
.img {
    max-width: 8rem;
    /* max-height: 6rem; */
}
.title {
    color: #FB8C00;
    font-size: 1.4rem;
    flex: 1;
}
.content {
    color: #B3B3B3;
    font-size: 1.1rem;
    flex: 2;
    overflow: auto;
}
</style>
