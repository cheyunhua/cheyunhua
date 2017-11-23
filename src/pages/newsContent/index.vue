<script>
	import async from 'src/api/async'
	import config from 'src/api/config'
	import nav from 'src/router/nav'
	import eventBus from '../../assets/js/eventBus'
	export default {
		data() {
			return {
				news: {},
				cmsImgvUrl: '',
			}
		},
		created() {
			this.cmsImgvUrl = config.cmsImgvUrl;
		},
		methods: {
			getContent() {
				let contentId = this.$route.query.contentId
				// 根据文章id直接获取内容详情
				if(contentId) {
					async(this, 'getEcmContent', { contentId }, res => {
						this.news = res.body
						this.resizeImg()
						// 更新点击量
						async(this, 'updateClikcNum', { contentId }, res => {})
					})
				}
				// 根据站点编码和栏目编码直接获取内容详情
				else {
					let param = {
						encode: this.$route.query.encode,
						categorycode: this.$route.query.categorycode,
					}
					async(this, 'getDirectEcmContent', param, res => {
						this.news = res.body
						this.resizeImg()
						async(this, 'updateClikcNum', { contentId: res.body.id }, res => {})
					})
				}
			},
			resizeImg() {
				this.$nextTick(() => {
					let imgs = document.querySelectorAll('img')
					imgs.forEach(item => {
						let ow = item.width
						let oh = item.height
						item.style.width = '100%'
						// 保持宽高比
						item.style.height = Math.ceil(item.width * oh / ow) + 'px'
					})
				})
			},
			nav
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				vm.getContent()
			})
		},
		beforeRouteLeave(to, from, next) {
			this.news = {}
			next()
			eventBus.$emit('choiceList');
		},
	}
</script>

<template>
	<div class="nc">
		<v-wx-header title="文章详情" showLeft/>
		<div class="container">
			<div>
				<div class="title">{{news.title}}</div>
				<div class="source">
					<span>来源：{{news.source}}</span>
					<span>{{new Date(news.pubDate).toLocaleDateString().split('/').join('-')}}</span>
				</div>
			</div>
			<div v-html="news.content" />
			<v-to-top/>
			<div class="nc-fujian">
				<div v-for="(fj,index) in news.filePath">
				<!--<span style="letter-spacing: 1pt; font-size: 12pt; mso-spacerun: &quot;yes&quot;; mso-font-kerning: 2.0000pt;"><font face="微软雅黑">{{index + 1 }}.</font></span>--> 
					<ul>
						<li @click="nav(cmsImgvUrl + fj.path)">
							{{fj.name}}.{{fj.path.substr(fj.path.lastIndexOf('.') + 1)}}</li>
					</ul>
				</div>
			</div>
		</div>

	</div>
	</div>
</template>

<style scoped>
	.nc {
		background-color: white;
	}
	
	.container {
		padding: 2rem;
		padding-bottom: 30%;
	}
	
	.title {
		font-size: 2.7rem;
		font-weight: bold;
		text-align: left;
		padding: 0 5%;
	}
	
	.source {
		background-color: #f5f5f5;
		padding: 1rem;
		margin: 2rem 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.source>span {
		font-size: 1.4rem;
		color: #666;
	}
	
	.nc-fujian li {
		margin-top: .4rem;
		font-size: 12pt;
		color: rgb(0, 0, 255);
	}
</style>