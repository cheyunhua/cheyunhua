<script>
import eventBus from '../assets/js/eventBus';
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        showLeft: Boolean,
        showRight: Boolean,
        showareaLeft: Boolean,
        showbusLeft: Boolean,
    },

    methods: {
        back() {
            this.$router.go(-1)
        },
        backselect: function() {
            this.$emit('backselect')
        }
    },
}

</script>

<template>
    <div class="wx-header-wrap">
        <div class="wx-header">
            <span class="left"
                  v-if="showLeft"
                  @click="back"></span>
            <span v-else
                  class="left-holder"></span>
            <span class="left"
                  v-if="showareaLeft"
                  @click="backselect"></span>
            <span class="title">{{title}}</span>
            <span class="right"
                  v-if="showRight"></span>
            <span v-else
                  class="right-holder"></span>
        </div>
    </div>
</template>

<style scoped>
.wx-header-wrap {
    height: 4rem;
    z-index: 9999;
    /*background-color: #FF7043;*/
}
.wx-header {
    height: 4rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FF7043;
    z-index: 999;
}
.left::after {
    font-family: "iconfont" !important;
    content: "\e60e";
}
.left {
    width: 4rem;
    text-align: center;
    font-size: 1.8rem;
}
.title {
    flex: 1;
    text-align: center;
    font-size: 1.8rem;
}
.right,
.right-holder,
.left-holder {
    text-align: right;
    width: 4rem;
    text-align: center;
}
.right::after {
    font-family: "iconfont" !important;
    content: "\e657";
    font-size: 1.8rem;
}
</style>
