<script>
import nav from 'src/router/nav'
import config from 'src/api/config'
export default {
    props: {
        info: {
            type: Object,
            required: true
        }
    },
    computed: {
        fullImgUrl() {
            return config.cmsImgvUrl + this.info.picture
        },
        // 截取标题
        ellipsisTitle() {
            let clipLength = 27
            return this.info.title.length >= clipLength
                ? this.info.title.substring(0, clipLength) + '...'
                : this.info.title
        }
    },
    methods: {
        nav
    },
}
</script>
<template>
    <div class="ic"
         @click.stop="nav(info.link)">
        <div class="img-wrap">
            <img :src="fullImgUrl"
                 alt="图片加载失败"
                 class="img">
        </div>
        <div class="desc">
            <div class="head">{{info.title}}</div>
            <div class="foot">
                <div class="foot-left">{{info.source}}</div>
                <div class="foot-right">{{new Date(info.pubDate).toLocaleDateString().split('/').join('-')}}</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.ic {
    display: flex;
    padding: .8rem;
    margin-bottom: .5rem;
    padding-left: 1.2rem;
    background-color: white;
}
.img {
    width: 10rem;
    max-height: 8rem;
}
.desc {
    flex: auto;
    display: flex;
    flex-flow: nowrap column;
    padding-left: 1rem;
}
.head {
    flex: 1;
    font-size: 1.4rem;
    color: #333;
    padding-bottom: 1rem;
}
.foot {
    color: #9E9E9E;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.foot>div {
    font-size: 1.2rem;
}
</style>
