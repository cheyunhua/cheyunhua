<template>
	<div>
		<v-wx-header title="发票专区" showLeft/>
		<div class="listPng02 invoice-zone">
			<li>
				<a href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx35102306dfc2506e&redirect_uri=http%3A%2F%2Fwx.jchl.com%2Fwx%2Findex&response_type=code&scope=snsapi_base&state=1#wechat_redirect'>
					<span class="iconfont icon-saomakaipiao"></span>
					<span class="txt">码上开票</span>
				</a>
			</li>
			<li>
				<a href='https://fpgj.dzfpyun.com/wx/fpcy'>
					<span class="iconfont icon-icon"></span>
					<span class="txt">发票验证</span>
				</a>
			</li>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	.invoice-zone a {
		border-right: none !important;
		border-bottom: 1px solid #e3e3e3 !important;
		height: auto !important;
		padding-top: 3.4rem !important;
		padding-bottom: 3.4rem;
	}
	
	.invoice-zone .icon-icon {
		font-size: 3.2rem !important;
		color: #837ac5 !important;
	}
	
	.invoice-zone .icon-saomakaipiao {
		font-size: 3.2rem !important;
		color: #666 !important;
	}
	
	.invoice-zone .txt {
		font-size: 1.4rem;
	}
</style>