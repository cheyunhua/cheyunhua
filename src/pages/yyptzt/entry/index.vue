<script>
import { Toast } from 'mint-ui'
import indexPage from '../index/'
import myPage from '../my/'

export default {
    components: {
        indexPage, myPage
    },
    data() {
        return {
            selectedPage: 'index',
            settings: [
                {
                    id: 'index',
                    name: '首页',
                    icon: 'icon-zhuye',
                    component: 'indexPage'
                },
                {
                    id: 'my',
                    name: '我的',
                    icon: 'icon-weibiaoti101',
                    component: 'myPage'
                },
            ]
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.nav2Tab()
        });
    },
    methods: {
        nav2Tab() {
            let pageId = this.$route.query.tab
            if (pageId) {
                this.selectedPage = pageId
            }
        }
    },
}

</script>

<template>
    <div class="entry">
        <mt-tab-container v-model="selectedPage">
            <mt-tab-container-item v-for="item in settings"
                                   :id="item.id">
                <!-- <v-zt-header title="金财互联" showLeft /> -->
                <component :is="item.component"></component>
            </mt-tab-container-item>
        </mt-tab-container>

        <mt-tabbar v-model="selectedPage"
                   fixed>
            <mt-tab-item v-for="item in settings"
                         :id="item.id">
                <div class="tab-slot">
                    <div :class="'ts-icon icon iconfont '+item.icon"></div>
                    <div class="ts-label">{{item.name}}</div>
                </div>
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<style scoped>
.mint-tab-container-item {
    margin-bottom: 6rem;
}
.tab-slot {
    color: #6E6E6E;
    height: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}
.ts-icon {
    font-size: 2.3rem;
}
.ts-label {
    font-size: 1.3rem;
}
.mint-tab-item.is-selected .tab-slot {
    color: #f17712;
}
</style>
