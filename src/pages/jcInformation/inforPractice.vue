<template>
	<div class="infor-backgorund">
		<v-wx-header :title="categoryName" showLeft/>
		<mt-loadmore :top-method="loadMore" @top-status-change="handleTopChange" ref="loadmore">
			<div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="distance">
				<!--<v-infor-taxation-content v-for="list in lists" :title="list.title" :content="list.author" :link="list.link" :url="list.picture" :itcShow="list.itcShow" :pubDate="list.pubDate">
				</v-infor-taxation-content>-->
				<v-info-card v-for="list in lists" :info="list"></v-info-card>
			</div>
			<div slot="top" class="mint-loadmore-top">
				<span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
				<span v-show="topStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
			</div>
		</mt-loadmore>
		<p v-show="loading" class="page-infinite-loading">
			<mt-spinner type="fading-circle"></mt-spinner>
			加载中...
		</p>
	</div>

</template>

<script>
	import eventBus from '../../assets/js/eventBus';
	import api from '../../api/'
	import config from 'src/api/config'
	import { Toast, Indicator, MessageBox } from 'mint-ui';
	import async from 'src/api/async'
	export default {
		data() {
			return {
				lists: [],
				headtitle: "",
				loading: false,
				topStatus: '',
				pageindex: "1",
				endpage: null,
				categoryName: "",
				encode: this.$route.query.encode,
				endindex: 0,
				startindex: 0,
				refresh: true,
				lookout: true,
				debasd: true,
				intcode: true,
				distance: 50
			}
		},
		methods: {
			/*loadshow:function() {
			var scrollTop = document.body.scrollTop;;　　
            var scrollHeight = document.body.scrollHeight;　　
            var windowHeight = document.body.clientHeight;
            var scrollWhole = Math.max(scrollHeight - scrollTop - windowHeight);
            if(scrollWhole < 100 ) {
     	      this.alloading:true;
            }
		},*/
			handleTopChange(status) {
				this.topStatus = status;
			},
			loadMore() {
				this.intcode = true;
				if($('div').hasClass('ic')) {
					if(!this.endpage) {
						//判断是否进行滚动加载
						this.loading = true;
						setTimeout(() => {
							this.pageindex++;
							this.getFrontArticleList();
						}, 200);
					} else {
						this.$refs.loadmore.onTopLoaded();
					}
				}
			},
			getFrontArticleList() {
				this.refresh = true;
				this.debasd = true;
				if(this.lookout && this.intcode) { //判断是否调用列表数据
					let params = {
						"encode": this.encode,
						"categorycode": this.$route.query.categorycode,
						"pageindex": this.pageindex,
						"pagesize": this.pagesize,
					}
					var endcurrentpage = "";
					var listEndpage = false;
					var inputArr = [];
					var that = this;
					if(params.pageindex == 1) { //当列表pageindex为1时，清空lists,重置当前列表条数位置
						this.lists = [];
						this.endindex = 0;
						this.startindex = 0;
					}
					api.getFrontArticleList(params).then((response) => {
						if(response.data.head.errorCode == '0') {
							endcurrentpage = response.data.body.length;
							if(endcurrentpage < params.pagesize) {
								//判断列表内容是否全部接受
								listEndpage = true;
								that.debasd = false;
							}
							this.endpage = listEndpage;
							for(let i = 0; i < endcurrentpage; i++) {
								//获取列表内容，并添加进lists
								inputArr = response.data.body;
								this.lists.push(inputArr[i]);
								this.endindex++;
							}
							for(let item of this.lists) {
								//检索列表author,若无返回数据，则返回空字符串；
								if(!item.author) {
									item.author = '';
								}
							}
							for(let i = this.startindex; i < this.endindex; i++) {
								//通过startindex和endindex截取当前页面的列表序号，并判断是否显示图片，有图片地址则显示，空则不显示；
								if(this.lists[i].picture) {
									this.lists[i].itcShow = true;
									/*this.lists[i].picture = config.cmsImgvUrl + this.lists[i].picture*/
								} else {
									this.lists[i].itcShow = false;
								}

							}
							this.startindex = this.endindex;
						} else {
							this.endpage = true;
						}
						this.loading = false;
						this.$refs.loadmore.onTopLoaded();
					}).catch((response) => {
						this.loading = false;
						this.$refs.loadmore.onTopLoaded();
						Toast('哎呀！网络出了点问题，请稍后重试！');
					});
//					async(this, 'getFrontArticleList', params, res => {
//						this.loading = false;
//						this.$refs.loadmore.onTopLoaded();
//						endcurrentpage = res.body.length;
//						if(endcurrentpage < params.pagesize) {
//							//判断列表内容是否全部接受
//							listEndpage = true;
//							that.debasd = false;
//						}
//						this.endpage = listEndpage;
//						for(let i = 0; i < endcurrentpage; i++) {
//							//获取列表内容，并添加进lists
//							inputArr = res.body;
//							this.lists.push(inputArr[i]);
//							this.endindex++;
//						}
//						for(let item of this.lists) {
//							//检索列表author,若无返回数据，则返回空字符串；
//							if(!item.author) {
//								item.author = '';
//							}
//						}
//						for(let i = this.startindex; i < this.endindex; i++) {
//							//通过startindex和endindex截取当前页面的列表序号，并判断是否显示图片，有图片地址则显示，空则不显示；
//							if(this.lists[i].picture) {
//								this.lists[i].itcShow = true;
//								/*this.lists[i].picture = config.cmsImgvUrl + this.lists[i].picture*/
//							} else {
//								this.lists[i].itcShow = false;
//							}
//
//						}
//						this.startindex = this.endindex;
//					})
				}
			},
			getEcmCategoryBycode() {
				if(this.refresh) { //判断是否刷新头部名称；
					let params = {
						"encode": this.encode,
						"categorycode": this.$route.query.categorycode
					}
					async(this, 'getEcmCategoryBycode', params, res => {
						this.categoryName = res.body.categoryName;
					})
				}
			}
		},
		//通过路由的before钩子解决router-view缓存页面问题
		beforeRouteEnter(to, from, next) {
			next(vm => {
				//vm.fetchData();

				vm.getEcmCategoryBycode();
				vm.getFrontArticleList();
			});
		},
		beforeRouteLeave(to, from, next) {
			next();
		},
		created() {
			this.pagesize = Math.round(window.screen.height / 100 + 1);
		},
		activated() {
			eventBus.$on('choiceList', function() {
				//阻止列表刷新
				this.refresh = false;
				this.intcode = false;
				this.lookout = true;
				if(!this.debasd) {
					this.lookout = false;
				}
			}.bind(this));
			if(this.refresh) {
				//更新列表
				this.pageindex = 1;
				this.lookout = true;
				this.intcode = true;
			}
		},
		deactivated() {
			this.lookout = false;
		}
	}
</script>

<style>
	.page-infinite-loading {
		text-align: center;
		height: 50px;
	}
	
	.infor-backgorund .mint-spinner-fading-circle {
		margin: 0 auto;
	}
	
	.infor-backgorund .mint-spinner-snake {
		margin: 1rem auto;
	}
	
	.infor-backgorund {
		/*background: #fff;*/
		height: 100%;
	}
	
	.infor-backgorund .mint-loadmore {
		/*background: #fff;*/
		min-height: 100%;
	}
</style>