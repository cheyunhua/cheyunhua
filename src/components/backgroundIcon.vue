<script>
import api from 'src/api/';
import {Toast} from "mint-ui";
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
        bgImg: {
            type: String,
            required: true
        },
        message:{
            type: String,
            required: false
        }
    },

    methods: {
        nav(url){
            let _this = this
            if (url && url.length > 0) {
                if(_this.message && _this.message.length>0){
                    let instance = Toast(_this.message);
                    setTimeout(function() {
                        instance.close();
                        _this.innerNav(url)
                    }, 2000)
                }
                else{
                    _this.innerNav(url)
                }
            }
        },
        innerNav(url){
            if (url.indexOf('http') > -1) {
                location.href = url
            } else {
                this.$router.push({ path: url })
            }
        }
    },
}

</script>

<template>
    <div class="bg-icon"
         @click.stop="nav(url)">
        <div class="bg-img"
             :style="{ background: 'no-repeat center/100% url(' + bgImg + ')' }"></div>
        <div class="bg-label" v-html='label'></div>
    </div>
</template>

<style scoped>
.bg-icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:33.33%;
    padding: 1rem;
    margin-bottom: 1rem;
}
.bg-img {
    height: 5rem;
    width: 5rem;
}
.bg-label {
    margin-top: 3px;
    font-size: 1.2rem;
    height: 1rem;
    text-align: center;
    line-height: 1.6rem;
}
</style>
