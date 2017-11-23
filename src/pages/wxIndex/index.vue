<script>
import vHeadline from './vHeadline'
import vSelectSearchBar from './vSelectSearchBar'
import vRecommendCard from './vRecommendCard'
import nav from 'src/router/nav'

export default {
    data() {
        return {
            refreshFlag: true,
            increaseId: 0,
        }
    },
    created() {

    },
    mounted() {

    },
    methods: {
        refreshComponent() {
            this.refreshFlag = false
            this.$nextTick(() => {
                this.refreshFlag = true
            })
        },
        nav
    },
    components: {
        vHeadline, vSelectSearchBar, vRecommendCard
    }

}
</script>
<template>
    <div class="content">

        <v-select-search-bar @onSelectCity="refreshComponent" />

        <v-badge-title title="财务专区" />
        <v-finance-service-Icon/>

        <v-headline v-if="refreshFlag" />
       <!--@click.stop="nav('http://d.eqxiu.com/s/15yBI39c')">-->
        <div class="advertise"     
             @click.stop="nav('/jcPartner')">
            <img src="../../assets/images/wxindex/raw_1497599266.png"
                 alt="图片加载失败">
        </div>

        <v-badge-title title="老板专区" />
        <v-enterprise-service-Icon/>

        <v-badge-title title="金财推荐" />
        <v-recommend-card/>

    </div>
</template>
<style scoped>
.content {
    background-color: #F0F0F2;
}
.advertise {
    margin-top: .3rem;
    margin-bottom: .3rem;
}
.advertise>img {
    width: 100%;
}
.badge-title {
    margin-top: .4rem;
}
</style>
