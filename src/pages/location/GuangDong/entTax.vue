<script>
	export default {
		data() {
			return {
				// 地税
				landTax: [{
						label: '税务管家',
						url: 'http://mtax.gdltax.gov.cn/appserver/assets/nsr/swgj.html',
						bgImg: require('src/assets/images/location/33.png')
					},
					{
						label: '涉税提醒',
						url: 'http://mtax.gdltax.gov.cn/appserver/assets/bsfw/bstx.html?nsrType=1',
						bgImg: require('src/assets/images/location/28.png')
					},
					{
						label: '办税厅实况',
						url: 'http://yymtax.gdltax.gov.cn/gdyypt/booking/pages/hallrealtimeinfo.html',
						bgImg: require('src/assets/images/location/03.png')
					},
					{
						label: '税费清缴',
						url: 'http://mtax.gdltax.gov.cn/appserver/assets/nsr/wqjsfqk.html',
						bgImg: require('src/assets/images/location/31.png')
					},
					{
						label: '电子税票',
						url: 'http://mtax.gdltax.gov.cn/appserver/assets/dzsp/dzspdy_qy.html',
						bgImg: require('src/assets/images/location/07.png')
					},
					{
						label: '办理进度查询',
						url: 'http://mtax.gdltax.gov.cn/appserver/assets/bsfw/ssjdcx.html',
						bgImg: require('src/assets/images/location/02.png')
					},
				],
				// 国税
				sbjn: [{
						label: '增值税小规模申报',
						url: 'http://gs.etax-gd.gov.cn/bsfwtweb/sb/XgmzzsSb_initPage.do?type=zzsxgmsb',
						bgImg: require('src/assets/images/location/36.png')
					},
					{
						label: '消费税申报(金银首饰类)',
						url: 'http://gs.etax-gd.gov.cn/bsfwtweb/sb/XfsSb_initPage.do?type=xfssb',
						bgImg: require('src/assets/images/location/35.png')
					},
					{
						label: '企业所得税(季)度申报(B类)',
						url: 'http://gs.etax-gd.gov.cn/bsfwtweb/sb/QysdsSb_initPage.do?type=qysdssb',
						bgImg: require('src/assets/images/location/25.png')
					},
					{
						label: '申报作废',
						url: 'http://gs.etax-gd.gov.cn/bsfwtweb/sb/Sbzf_initPage.do?type=sbzf',
						bgImg: require('src/assets/images/location/30.png')
					},
					{
						label: '申报结果反馈',
						url: 'http://qydzsb.gd-n-tax.gov.cn/bsfwtweb/sb/Sbxxfk_initPage.do?type=gt3_sbxxfk',
						bgImg: require('src/assets/images/location/29.png')
					},
				],
				fpyw: [{
						label: '发票领用及查询',
						url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx425b58833f082a50&redirect_uri=http%3A%2F%2Fgssqt.dg.gov.cn%2Fwxappserver%2Fassets%2Fsscx%2Ffplgcx.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect',
						bgImg: require('src/assets/images/location/10.png')
					},
					{
						label: '发票代开及查询',
						url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx425b58833f082a50&redirect_uri=http%3A%2F%2Fgssqt.dg.gov.cn%2Fwxappserver%2Fassets%2Fsscx%2Ffpdkcx.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect',
						bgImg: require('src/assets/images/location/09.png')
					},
					{
						label: '丢失发票报告',
						url: 'http://app.gd-n-tax.gov.cn/search/html/fpcx/dsbdfp.html',
						bgImg: require('src/assets/images/location/08.png')
					},
					{
						label: '发票遗失申明',
						url: 'http://app.gd-n-tax.gov.cn/search/jsp/zhcx/fpysx.jsp',
						bgImg: require('src/assets/images/location/12.png')
					},
					{
						label: '发票验证',
						url: 'http://app.gd-n-tax.gov.cn/search/html/fpcx/fpcy.html?categoryCode=014017002004&rawId=gh_9f5bb3f0b53c&statDomainId=OI85M3W1M3OHLMXLEBH95AN6LC68J4OV',
						bgImg: require('src/assets/images/location/11.png')
					},
				],

			}
		},
		mounted() {},
		methods: {},
	}
</script>

<template>
	<div>
		<v-wx-header title="企业办税" showLeft/>
		<v-badge-title title="广东地税" style="" />
		<div class="icon-group">
			<v-background-icon v-for="item in landTax" :label="item.label" :url="item.url" :bgImg="item.bgImg" />
		</div>
		<v-badge-title title="申报缴纳" />
		<div class="icon-group">
			<v-background-icon v-for="item in sbjn" :label="item.label" :url="item.url" :bgImg="item.bgImg" />
		</div>
		<v-badge-title title="发票业务" />
		<div class="icon-group">
			<v-background-icon v-for="item in fpyw" :label="item.label" :url="item.url" :bgImg="item.bgImg" />
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