<script>
import config from '../../../api/config';
export default {
    data() {
        return {

            zx: [
                {
                    label: '热点资讯',
                    url: '/inforpractice?categorycode=001109012013004&pageindex=1&encode=370000',
                    bgImg: require('src/assets/images/icon/icon_29.png')
                },
                {
                    label: '政策法规',
                    url: 'http://www.tax12366.org/Taxlaws/Index?fromid=gh_f8c4fb78c778&from=singlemessage',
                    bgImg: require('src/assets/images/icon/icon_07.png')
                },
            ],
        }
    },

    mounted() {

    },
    methods: {

    }
}
</script>

<template>
    <div>

        <v-badge-title title="资讯" />
        <div class="icon-group">
            <v-background-icon v-for="item in zx"
                               :label="item.label"
                               :url="item.url"
                               :bgImg="item.bgImg" />
        </div>

    </div>
</template>

<style scoped>
.badge-title {
    margin-top: .5rem;
}
.icon-group {
    display: flex;
    flex-flow: row wrap;
    background-color: white;
    padding: 1rem 0;
}
</style>
