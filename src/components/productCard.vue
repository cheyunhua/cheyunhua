<script>
import config from 'src/api/config'
export default {
    props: {
        /*deadline: {
            type: String,
            required: true
        },*/
        product: {
            type: Object,
            required: true
        },
        shadowshow: Boolean,
        priceRight: Boolean,
    },
    data() {
        return {

        }
    },
    created() {

    },
    methods: {
    },
}

</script>
<template>
    <div class="pc">
        <div class="inc-hotproduct-show-photo">
            <img class="img"
                 :src="product.pcurl"
                 alt="图片加载失败">
            <div v-if="shadowshow"
                 class="inc-hotproduct-phototitile">
                <span>{{ product.productShortName }}</span>
                <div class="titleshadow"></div>
            </div>
        </div>
        <div class="desc">
            <div class="title">{{product.title}}</div>
            <div class="content">{{product.content}}</div>
            <div class="price">
                <span>{{product.price}}</span>
                <span v-if="priceRight">我感兴趣</span>
            </div>
        </div>
    </div>
</template>
<style scoped>
.pc {
    display: flex;
    margin-bottom: .4rem;
    padding: 1rem;
    background-color: white;
    border: 1px solid #ddd;
}
.img {
    width: 10rem;
    height: 8rem;
}
.desc {
    flex: 2.6;
    display: flex;
    flex-flow: nowrap column;
    padding-left: 1rem;
    font-size: 1.4rem;
}
.desc>div {
    min-height: 1rem;
}
.title {
    color: black;
    font-size: 1.4rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    /* flex: 1.4; */
    /* font-weight: 100; */
    letter-spacing: -0.05rem;
}
.content {
    color: #9E9E9E;
    font-size: 1.2rem;
    /* flex: 2; */
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    /* autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
}
.price {
    color: #FF5722;
    display: -webkit-flex;
    /* Safari */
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.price>span:nth-child(2) {
    text-indent: .5rem;
    font-size: 1.2rem;
    display: inline-block;
    border: 1px solid #9E9E9E;
    border-radius: 1rem;
    margin-top: .2rem;
    padding: .3rem;
    font-size: 1.3rem;
}
/* .interest span:nth-child(1) {
  color: #FF5722;
  display: inline-block;
  border: 1px solid #9E9E9E;
  border-radius: 1rem;
  padding: 4px;
  text-indent: .5r  em;
  font-size: 1.2rem;
} */
.inc-hotproduct-show-content span {
    font-size: 1rem;
    letter-spacing: -0.05rem;
    color: #9E9E9E;
    display: inline-block;
    line-height: 1.3rem;
    display: table-cell;
    vertical-align: middle;
}
.inc-hotproduct-show-photo {
    width: 10rem;
    height: 8rem;
}
.inc-hotproduct-phototitile {
    flex: 1;
    height: 2.1rem;
    line-height: 2.1rem;
    text-align: center;
    transform: translateY(-2.1rem);
    -webkit-transform: translateY(-2.1rem);
}
.inc-hotproduct-phototitile span {
    position: relative;
    font-size: 1.2rem;
    color: #555;
    z-index: 99;
    height: 100%;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.inc-hotproduct-phototitile .titleshadow {
    position: absolute;
    width: 100%;
    height: 2.1rem;
    background: #cfcfcf;
    bottom: 0rem;
    opacity: 0.8;
}

/* .inc-serve .sc {
    width: 100%;
} */

@media (device-width:320px) and (-webkit-min-device-pixel-ratio:2) {
    /* 兼容iphone4、iphone5 */
    /* .title {
        font-size: 1.2rem !important;
    }
    .content {
        font-size: 0.8rem !important;
        letter-spacing: -0.05rem;
        padding-right: 1rem;
    }
    .price {
        font-size: 1.2rem;
    }
    .inc-hotproduct-show-photo {
        width: 9rem;
    }
    .pc {
        padding-right: 0;
    }*/
}
</style>
