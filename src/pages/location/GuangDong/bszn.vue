<script>
	export default {
		data() {
			return {
				// 财税业务
				taxBusiness: [{
						label: '办税指南(国税)',
						url: 'http://weixin.gd-n-tax.gov.cn/weixin/jsp/template/view/gsws/categoryList.jsp?categoryId=61099&picType=bszn&isPolicy=N&canSearch=N&rawId=gh_9f5bb3f0b53c&statDomainId=JYJ8MBS6NWXAR3JTLQDCODFNURFEOQQ8',
						bgImg: require('src/assets/images/location/06.png')
					},
					{
						label: '办税指南(地税)',
						url: 'http://www.gdltax.gov.cn/gdsite/portal/gdsite/7YP80YRU21LUX3CS1MSRT1Y7A0VSM59G.htm',
						bgImg: require('src/assets/images/location/06.png')
					},

				],
				// 电子税务局
				/* etaxDepartment: [
				     {
				         label: '办税指南',
				         url: 'http://weixin.gd-n-tax.gov.cn/weixin/jsp/template/view/gsws/categoryList.jsp?categoryId=61099&picType=bszn&isPolicy=N&canSearch=N&rawId=gh_9f5bb3f0b53c&statDomainId=JYJ8MBS6NWXAR3JTLQDCODFNURFEOQQ8',
				         bgImg: require('src/assets/images/icon/icon_24.png')
				     },
				 ],*/

			}
		},
	}
</script>

<template>
	<div>
		<v-wx-header title="办税指南" showLeft/>
		<v-badge-title title="办税指南" style="" />
		<div class="icon-group">
			<v-background-icon v-for="item in taxBusiness" :label="item.label" :url="item.url" :bgImg="item.bgImg" />
		</div>
		<!--<v-badge-title title="国税" />
        <div class="icon-group">
            <v-background-icon v-for="item in etaxDepartment"
                               :label="item.label"
                               :url="item.url"
                               :bgImg="item.bgImg" />
        </div>-->

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