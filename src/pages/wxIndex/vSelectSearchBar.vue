<script>
import vSelectCity from './selectcity'
import async from 'src/api/async'
import { mapState } from 'vuex'

export default {
    components: {
        vSelectCity
    },
    data() {
        return {
            openCitySelect: false,
            oldSelectedCityCode: null,
            siteInfo: {},
        }
    },
    created() {
        this.oldSelectedCityCode = this.selectedCity.encode
    },
    computed: {
        ...mapState({
            selectedCity: state => state.wx.selectedCity,
        })
    },
    methods: {
        emitToIndex() {
            this.closeCityPopup()
            if (this.selectedCity.encode !== this.oldSelectedCityCode) {
                this.oldSelectedCityCode = this.selectedCity.encode
                this.$emit('onSelectCity')
            }
        },

        closeCityPopup() {
            this.openCitySelect = false
        },
    },

}
</script>
<template>
    <div>
        <div class="select-search-bar">
          <!--  <div class="select"
                 @click.stop="openCitySelect=true">{{selectedCity.name}}</div>-->
            <div class="search">
                <input type="text"
                       placeholder="输入关键字搜索">
            </div>
        </div>
        <mt-popup v-if="openCitySelect"
                  v-model="openCitySelect"
                  position="right"
                  class="citypopup"
                  :modal="false">
            <v-select-city @onSelectCity="emitToIndex"
                           @citySelectBack="closeCityPopup" />
        </mt-popup>
    </div>
</template>
<style scoped>
.citypopup {
    width: 100%;
    height: 100%;
}
.select-search-bar {
    height: 4.5rem;
    background-color: #FFA726;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
}
.select {
    flex: 1;
    max-width: 50%;
    color: white;
    margin-left: 2rem;
}
.search {
    flex: 3;
    /*max-width: 80%;*/
    /*margin-right: 2rem;*/
}
.search>input {
    /*width: 90%;*/
    width: 92.5%;
    height: 3rem;
    border-radius: .5rem;
    text-indent: 3rem;
}
.search::before {
    content: "\e603";
    font-family: "iconfont" !important;
    color: #C4C4C4;
    position: relative;
    right: -2.2rem;
    top: .1rem;
}
.select::after {
    content: '\e617';
    font-family: "iconfont" !important;
    margin-left: .8rem;
    position: relative;
    top: .2rem;
    left: -.2rem;
}
</style>
