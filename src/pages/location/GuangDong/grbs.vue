<script>
	export default {
		data() {
			return {
				landTax: [{
						label: '税务管家',
						url: 'http://mtax.gdltax.gov.cn/appserver/assets/zrr/swgj.html',
						bgImg: require('src/assets/images/location/33.png')
					},
					{
						label: '个人消息',
						url: 'http://mtax.gdltax.gov.cn/appserver/assets/bsfw/bstx.html?nsrType=2',
						bgImg: require('src/assets/images/location/17.png')
					},
					{
						label: '办税厅实况',
						url: 'http://yymtax.gdltax.gov.cn/gdyypt/booking/pages/hallrealtimeinfo.html',
						bgImg: require('src/assets/images/location/03.png')
					},
				],
				sbjn: [{
						label: '个税自行申报',
						url: 'http://mtax.gdltax.gov.cn/appserver/assets/zrr/grsdszxsb_csh.html',
						bgImg: require('src/assets/images/location/20.png')
					},
					{
						label: '12万个税申报',
						url: 'http://mtax.gdltax.gov.cn/appserver/assets/zrr/gr12wsb.html',
						bgImg: require('src/assets/images/location/01.png')
					},
					{
						label: '税费缴款',
						url: 'http://mtax.gdltax.gov.cn/appserver/assets/zrr/zrrwqjxxcx.html',
						bgImg: require('src/assets/images/location/31.png')
					},
					{
						label: '电子税票',
						url: 'http://mtax.gdltax.gov.cn/appserver/assets/dzsp/dzspdy_zrr.html',
						bgImg: require('src/assets/images/location/07.png')
					},
					{
						label: '个税证明邮寄',
						url: 'http://mtax.gdltax.gov.cn/appserver/assets/bsfw/gswszmyj.html',
						bgImg: require('src/assets/images/location/19.png')
					},
					{
						label: '社保业务',
						url: 'http://mtax.gdltax.gov.cn/appserver/assets/zrr/lhjysbfgl.html',
						bgImg: require('src/assets/images/location/27.png')
					},
					{
						label: '码上开票',
						url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx35102306dfc2506e&redirect_uri=http%3A%2F%2Fwx.jchl.com%2Fwx%2Findex&response_type=code&scope=snsapi_base&state=1#wechat_redirect',
						bgImg: require('src/assets/images/location/24.png')
					},
					{
						label: '车船税缴款',
						url: 'http://mtax.gdltax.gov.cn/appserver/assets/zrr/ccssb.html',
						bgImg: require('src/assets/images/location/04.png')
					},
					{
						label: '房产交易申报',
						url: 'http://ds.etax-gd.gov.cn/web-sxbl/fcjy/enter.do',
						bgImg: require('src/assets/images/location/13.png')
					},
					
				],
				fpyw: [{
						label: '个税查询',
						url: 'http://mtax.gdltax.gov.cn/appserver/assets/zrr/grsdscx.html',
						bgImg: require('src/assets/images/location/18.png')
					},
					{
						label: '社保查询',
						url: 'http://mtax.gdltax.gov.cn/appserver/assets/zrr/sbfcx.html',
						bgImg: require('src/assets/images/location/26.png')
					},
					{
						label: '车船税查询',
						url: 'http://mtax.gdltax.gov.cn/appserver/assets/bsfw/ccscx.html',
						bgImg: require('src/assets/images/location/04.png')
					},
					{
						label: '房屋契税查询',
						url: 'http://mtax.gdltax.gov.cn/appserver/assets/bsfw/fcqscx.html',
						bgImg: require('src/assets/images/location/15.png')
					},
					{
						label: '房产申报查询',
						url: 'http://ds.etax-gd.gov.cn/web-sxbl/yybs/sxcxrk.do',
						bgImg: require('src/assets/images/location/14.png')
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
		<v-wx-header title="个人办税" showLeft/>
		<v-badge-title title="我的管家" style="" />
		<div class="icon-group">
			<v-background-icon v-for="item in landTax" :label="item.label" :url="item.url" :bgImg="item.bgImg" />
		</div>
		<v-badge-title title="业务办理" />
		<div class="icon-group">
			<v-background-icon v-for="item in sbjn" :label="item.label" :url="item.url" :bgImg="item.bgImg" />
		</div>
		<v-badge-title title="综合查询" />
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