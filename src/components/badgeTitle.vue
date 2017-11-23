<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        ico: String,
        content: String,
        icoLeft: String,
    },
    methods: {
        clickRightElem: function () {
            this.$emit('clickRightElem')
        }
    }
}

</script>
<template>
    <div class="badge-title">
        <div class="badge-left">
            {{title}}
        </div>
        <span @click.stop="clickRightElem"
              class="right"
              :class="[ico]">
            <span :class="[icoLeft]">{{content}}</span>
        </span>
    </div>
</template>
<style scoped>
.badge-title{
        background-color: transparent;
        margin-top: .5rem;
}
.badge-left {
    /*width: 9rem;*/
    /* height: 2.5rem; */
    padding: 0.3rem 2rem;
    /* margin-top: .5rem; */
    /* margin-bottom: .2rem; */
    /* text-align: center; */
    border-radius: 0 5rem 5rem 0;
    color: #fff;
    background-color: #FB8C00;
    font-size: 1.3rem;
}
.right {
    font-size: 1.2rem;
    font-weight: bold;
}
.right>span {
    font-weight: normal;
}
</style>
