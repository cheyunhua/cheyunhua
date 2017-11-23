<script>
	export default {
		data() {
			return {
				// 财税业务
				taxBusiness: [{
						label: '热点资讯',
						url: '/inforpractice?categorycode=001109012010004&pageindex=1&encode=440000&wechatCode=JCHL_GD',
						bgImg: require('src/assets/images/location/10.png')
					},
					{
						label: '通知公告',
						url: '/inforpractice?categorycode=001109012010006&pageindex=1&encode=440000&wechatCode=JCHL_GD',
						bgImg: require('src/assets/images/location/08.png')
					},
					{
						label: '政策法规',
						url: 'http://www.tax12366.org/Taxlaws/Index?fromid=gh_f8c4fb78c778&from=singlemessage&wechatCode=JCHL_GD',
						bgImg: require('src/assets/images/location/06.png')
					},
				],

			}
		},
	}
</script>

<template>
	<div>
		<v-wx-header title="税务广场" showLeft/>
		<v-badge-title title="税务广场" style="" />
		<div class="icon-group">
			<v-background-icon v-for="item in taxBusiness" :label="item.label" :url="item.url" :bgImg="item.bgImg" />
		</div>
	</div>
</template>

<style scoped>
	.badge-title {
		margin-top: .5rem;
	}
	
	.icon-group {
		display: flex;
		flex-flow: row wrap;
		background-color: white;
		padding: 1rem 0;
	}
</style>