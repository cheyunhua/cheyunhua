<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import async from 'src/api/async'
import nav from 'src/router/nav'
import categoryCode from 'src/store/hardData/categoryCode'
import { mapState } from 'vuex'

// 金财头条
export default {
    components: { swiper, swiperSlide },
    data() {
        return {
            swiperOption: {
                direction: 'vertical',
                initialSlide: 0,
                iOSEdgeSwipeDetection: true,
                autoplay: 3000,
                autoplayDisableOnInteraction: false,
            },

            headlineShort: [],
            headlinePairs: [],
        }
    },
    computed: {
        ...mapState({
            selectedCity: state => state.wx.selectedCity,
        })
    },
    created() {
        this.getNewsList()
    },
    methods: {
        getNewsList() {
            let param = {
                "encode": this.selectedCity.encode,
                "categorycode": categoryCode.金财头条,
                "pageindex": 1,
                "pagesize": 10
            }
            async(this, 'getFrontArticleList', param, res => {
                this.headlineShort = res.body
                this.headlinePairs = this.groupingArray(this.headlineShort, 2, {})
            })
        },

        /**
         * 数据分组
         * []=>[[],[],[],...]
         * @param {array} inputArr
         * @param {number} eachArraySize 每个分组的长度
         * @param {any} fillItem 填充项，补足分组后的剩余位置
         * @returns
         */
        groupingArray(inputArr, eachArraySize, fillItem) {
            return inputArr.reduce((acc, item, index) => {
                index % eachArraySize === 0
                    ? acc.push(new Array(eachArraySize).fill(fillItem))
                    : null
                acc[acc.length - 1][index % eachArraySize] = item
                return acc
            }, [])
        },

        // 将import的nav定义到vue methods中
        nav,

    },
}

</script>
<template>
    <div class="headline">

        <div class="left">
            <div>金财</div>
            <div>头条</div>
        </div>

        <div class="right">
            <swiper :options="swiperOption">
                <swiper-slide v-for="item in headlinePairs">
                    <div class="sl">
                        <div v-for="subItem in item"
                             @click.stop="nav(subItem.link)"
                             class="sl-title">{{subItem.title}}</div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>

    </div>
</template>
<style scoped>
.swiper-container {
    height: 7rem;
    width: 100%;
}
.sl {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    padding: 1rem 0 0 1rem;
}
.sl-title {
    height: 2rem;
    font-size: 1.4rem;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.headline {
    margin: .5rem 0;
    background-color: white;
    display: flex;
}
.left {
    flex: 1;
    position: relative;
}
.right {
    flex: 4;
    height: 7rem;
    width: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.left::after {
    content: "";
    background: #ddd;
    position: absolute;
    right: 0;
    top: 20%;
    height: 60%;
    width: 1px;
}
.left>div:nth-child(1) {
    margin: 1rem;
    margin-bottom: 0;
    text-align: center;
}
.left>div:nth-child(2) {
    margin: 1rem;
    margin-top: .5rem;
    padding: .6rem;
    text-align: center;
    color: white;
    background-color: #ED4759;
    font-weight: bold;
}
</style>
