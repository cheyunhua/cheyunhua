<script>
import nav from 'src/router/nav'
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        bgcolor: String
    },
    data() {
        return {

        }
    },
    methods: {
        nav
    },
}
</script>
<template>
    <div class="card">
        <div class="sc"
             @click.stop="nav(url)">
            <div class="sc-icon"
                 :style="{ backgroundColor: bgcolor }">
                <i :class="'icon iconfont '+ icon"></i>
            </div>
            <div class="sc-label">{{label}}</div>
        </div>
        <slot>
        </slot>
    </div>
</template>
<style scoped>
.sc {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.sc-icon {
    height: 5rem;
    width: 5rem;
    color: #FFFCF9;
    text-align: center;
    border-radius: 50%;
}
.sc-label {
    text-align: center;
    margin-top: .4rem;
    font-size: 1.2rem;
}
.sc-icon>i {
    position: relative;
    top: .5rem;
    font-size: 3rem;
}
.card {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
}
</style>
