<template>
    <div class="content">
        <v-wx-header title="财务专区" />
        <div class="taxation-heder">
            <v-finance-service-Icon-menu></v-finance-service-Icon-menu>
        </div>
        <!--推荐热点-->
        <div class="taxation-hot">
            <v-badge-title @clickRightElem="clickRefresh"
                           title="推荐热点"
                           ico="glyphicon glyphicon-refresh taxation-hot-ico "
                           content="换一批"
                           icoLeft="taxation-hot-ico-left"></v-badge-title>
            <v-info-card v-for="item in filteredItems"
                         :info="item"></v-info-card>
        </div>
        <!--推荐热点end-->
        <!--政策法规-->
        <div class="taxation-policy">
            <v-badge-title title="政策法规"></v-badge-title>
            <v-info-card v-for="item in policy"
                         :info="item" ></v-info-card>
        </div>
        <!--政策法规end-->
    </div>
</template>

<script scoped>
import refresh from 'src/assets/js/wrap_common.js'
import async from 'src/api/async'
import categoryCode from 'src/store/hardData/categoryCode'

export default {
    name: "taxation",
    data: function () {
        return {
            hotNews: [],
            policys: [],
        }
    },
    computed: {
        filteredItems: function () {
            return this.hotNews.slice(0, 3)
        },
        policy: function () {
            return this.policys.slice(0, 4)
        }
    },
    methods: {
        clickRefresh() {
            this.loadHot();
        },
        loadHot(){
        	let param = {
	            "encode": "440100",
	            "categorycode": categoryCode.热点推荐,
	            "pageindex": 1,
	            "pagesize": 9
	        }
        	async(this, 'getFrontHotArticleList', param, res => {
	            this.hotNews = res.body
	            // this.hotNews = [
	            //     {
	            //         "id": "ABEB6D3C19F99370E7C2E3DB5559DBD2",
	            //         "title": "发票开错怎么办，如何作废，如何开具负数发票",
	            //         "pubDate": 1501721513000,
	            //         "clickTimes": 0,
	            //         "link": "/newsContent?contentId=ABEB6D3C19F99370E7C2E3DB5559DBD2",
	            //         "picture": "/publish/001/001104/0E0148ABE0C2889FD72E53E99FEADDDF.jpg"
	            //     },
	            //     {
	            //         "id": "D92A6BC8C8207F69A0E7E3C501F7F1BD",
	            //         "title": "企业如何合理避税",
	            //         "pubDate": 1501721362000,
	            //         "clickTimes": 0,
	            //         "link": "/newsContent?contentId=D92A6BC8C8207F69A0E7E3C501F7F1BD",
	            //         "picture": "/publish/001/001104/5E0666AB9EE08CB40950A8AE5EBC6B93.jpg"
	            //     },
	            //     {
	            //         "id": "C9D0B9EE7A166C701FFF266478F3D0DB",
	            //         "title": "eeeeeeeeeeeeeeeeee",
	            //         "pubDate": 1501645523000,
	            //         "clickTimes": 0,
	            //         "link": "/newsContent?contentId=C9D0B9EE7A166C701FFF266478F3D0DB",
	            //         "picture": "/publish/001/001104/987EC9B7B8A96F7C38BCCFC411415162.jpg"
	            //     }, {
	            //         "id": "ABEB6D3C19F99370E7C2E3DB5559DBD2",
	            //         "title": "errrrrrrrrrrrrrrrrrrrr",
	            //         "pubDate": 1501721513000,
	            //         "clickTimes": 0,
	            //         "link": "/newsContent?contentId=ABEB6D3C19F99370E7C2E3DB5559DBD2",
	            //         "picture": "/publish/001/001104/5E0666AB9EE08CB40950A8AE5EBC6B93.jpg"
	            //     }]
	        })
        },
        loadPolicy(){
	        let param = {
	            "encode": "440100",
	            "categorycode": categoryCode.财税政策,
	            "pageindex": 1,
	            "pagesize": 8
	        }

	        async(this, 'getFrontArticleList', param, res => {
	            this.policys = res.body
	        })
        }

    },
    created() {
		this.loadHot();
		this.loadPolicy();

    },
}
</script>

<style>
/*头部*/

.taxation-heder {
    background-color: white;
}

/*热点*/

.badge-title {
    display: flex;
    position: relative;
    background-color: white;
}
.badge-title .taxation-hot-ico {
    padding: 0.5rem 0;
    position: absolute;
    right: 2rem;
    color: #707070;
}
.taxation-hot-ico-left {
    margin-left: .5rem;
}
.ic[data-v-433efdfc] {
    margin: 0;
    border-bottom: .1rem solid #f1f1f1;
}

/*政策*/

.taxation-policy,
.taxation-hot {
    margin-top: .6rem;
}
</style>
