<template>
	<div>
		<v-wx-header title="金财资讯" showLeft/>
		<div class="jcInfor">

			<ul>
				<li v-for="jclist in jclists">
					<div class="jcInfor-icon" @click.stop="inforlink(jclist.categorycode)" v-bind:style="{background:jclist.bgcolor}">
						<i :class="'icon iconfont '+ jclist.icon"></i>
					</div>
					<p>{{jclist.jctitle}}</p>

				</li>

			</ul>

		</div>
		<!--推荐热点-->
		<div class="taxation-hot">
			<v-badge-title v-on:clickRightElem="clickRefresh" title="推荐热点" ico="glyphicon glyphicon-refresh taxation-hot-ico " content="换一批" icoLeft="taxation-hot-ico-left"></v-badge-title>
			<v-info-card v-for="item in filteredItems" :info="item"></v-info-card>
		</div>
		<!--推荐热点end-->
		<!--专题-->
		<v-programa title="专题" />
		<div class="infor-subject">
			<ul>
				<li v-for="subject in subjects">
					<div class="infor-content">
						<router-link :to="{path:subject.link}">
							<img :src="subject.picture" />
						</router-link>
						<p>{{subject.title}}</p>
					</div>
				</li>
			</ul>
		</div>
		<!--专题end-->
	</div>
</template>

<script>
	import refresh from 'src/assets/js/wrap_common.js'
	import api from 'src/api/'
	import async from 'src/api/async'
	import categoryCode from 'src/store/hardData/categoryCode'
	import config from 'src/api/config'
	export default {
		data() {
			return {
				jclists: [
					{ jctitle: "财税实务", bgcolor: "#FF7043", categorycode: categoryCode.财税实务, icon: "icon-gouzhua" },
					{ jctitle: "财税政策", bgcolor: "#AB47BC", categorycode: categoryCode.财税政策, icon: "icon-zhengcefagui1" },
					{ jctitle: "财税案例", bgcolor: "#2BAF2B", categorycode: categoryCode.财税案例, icon: "icon-dianzan" },
					{ jctitle: "财税动态", bgcolor: "#4E6CEF", categorycode: categoryCode.财税动态, icon: "icon-xinhao" },
				],
				subjects: [],
				hots: [],
				encode: '',
				selectCity: localStorage.getItem('recentSelectCity_')
			}
		},
	/*	beforeRouteEnter(to, from, next) {
			next(vm => {
				vm.init()
			})
		},*/
		created() {
			this.init()
		},
		computed: {
			filteredItems: function() {
				return this.hots.slice(0, 5)
			},
		},
		methods: {
			init() {
				if(!this.selectCity) {
					this.selectCity = "广州市:440100";
				}
				this.encode = this.selectCity.substr(this.selectCity.lastIndexOf(":") + 1);
				this.loadHot();
				this.loadSubject();
			},
			inforlink(code) {
				this.$router.push({ path: '/inforpractice', query: { categorycode: code, encode: this.encode} });
			},
			clickRefresh() {
				this.loadHot();
			},
			loadHot() {
				let param = {
					"encode": this.encode,
					"categorycode": categoryCode.热点推荐,
					"pageindex": 1,
					"pagesize": 9
				}
				async(this, 'getFrontHotArticleList', param, res => {
					this.hots = res.body
				})
			},
			loadSubject() {
				let param = {
					"encode": this.encode,
					"categorycode": categoryCode.专题,
					"pageindex": 1,
					"pagesize": 10
				}
				async(this, 'getFrontArticleList', param, res => {
					this.subjects = res.body
					this.$nextTick(() => {
						this.imgDistance();
					})
					for(let item of this.subjects) {
						item.picture = config.cmsImgvUrl + item.picture
					}
				})
			},
			imgDistance() {
				//图片等间距排列
				var that = this;
				var width = document.body.clientWidth / 10;
				var imgWidth = $(".infor-content img").width() / 10;
				var distance = (width - 2 * imgWidth) / 3;
				$(".infor-content:even").css("marginLeft", "" + distance + "rem");
				$(".infor-content:odd").css("marginLeft", "" + distance/2 + "rem");
				window.onresize = function() {
				that.imgDistance();
			}
			}
		}
	}
</script>

<style scoped>
	.jcInfor {
		padding: 1.2rem;
		background: #fff;
		text-align: center;
	}

	.jcInfor ul,
	.infor-subject ul {
		display: flex;
		display: -webkit-flex;
	}

	.jcInfor li {
		flex: 1;
	}

	.jcInfor-icon {
		height: 4.2rem;
		width: 4.2rem;
		margin: 0 auto;
		line-height: 4.2rem;
		border-radius: 1.4rem;
	}

	.jcInfor-icon i {
		position: relative;
		font-size: 2.8rem;
		color: #fff;
		top: .2rem
	}

	.jcInfor p {
		color: #3B3B3B;
		font-size: 1.2rem;
		margin-top: .6rem;
	}

	.infor-subject {
		background: #fff;
		padding: .4rem 0 .8rem 0;
	}
	.infor-subject ul {
		display: block;
		overflow: hidden;
	}
	.infor-subject li {
		width: 50%;
		float: left;
	}
	.infor-content {
		width: 16rem;
		margin: .8rem auto;
	}

	.infor-subject p {
		font-size: 1.4rem;
		font-weight: 400;
		color: #757575;
		line-height: 1.6rem;
		padding-top: .3rem;
	}

	.infor-subject img {
		width: 16rem;
		height: 9rem;
	}

	@media (device-width:320px) and (-webkit-min-device-pixel-ratio:2) {
		/* 兼容iphone4、iphone5 */
		.infor-content {
			width: 13rem;
			margin: 0 auto;
		}
		.infor-subject img {
			width: 13rem;
			height: 7.4rem;
		}
		.infor-subject p {
			font-size: 1.2rem;
			letter-spacing: -0.05rem;
			padding: 0 0.6rem 0 .2rem;
		}
	}
</style>
