<template>
    <header>
        <i v-if="showLeft"
           @click.stop="back"
           class="iconfont icon-back"></i>
        <div class="zt-title">{{title}}</div>
        <div v-if="showLeft"
             class="holder"></div>
    </header>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        showLeft: Boolean,
    },
    methods: {
        back() {
            this.$router.go(-1)
        },
    },
}
</script>

<style scoped>
header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #999;
    background-color: #fff;
}
.iconfont,
.holder {
    flex-basis: 12%;
    font-size: 2rem;
    text-align: center;
}
.holder {
    color: transparent;
}
.zt-title {
    flex: auto;
    text-align: center;
    margin: 1.2rem 0;
    font-size: 1.8rem;
}
</style>
