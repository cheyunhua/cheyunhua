<script>
	export default {
		data() {
			return {

			}
		},
		created() {

		},
		methods: {

		},
	}
</script>
<template>
	<div class="bi">
		<div class="row">
			<div class="item">
				<v-service-icon label="开办公司" icon="icon-qiye1" url="/product/kbgs" bgcolor="#F29F3F">
					<div class="item-content item-content-double">
						<router-link :to="'/product/detail?productCode=AGENCY_SINGLE_CERTIFIED_INVOICE'">认证进项发票</router-link>
						<router-link :to="'/product/detail?productCode=AGENCY_SINGLE_OPEN_TICKET'">代开专票</router-link>
					</div>
					<div class="item-content">
						<router-link :to="'/product/detail?productCode=ICR_RST_SUBSIDIARY'">子公司注册</router-link>
					</div>
				</v-service-icon>

			</div>
			<div class="item">
				<v-service-icon label="财税外包" icon="icon-taizhangjilu" url="/product/dljz" bgcolor="#FF6633">
					<div class="item-content">
						<router-link :to="'/product/detail?productCode=AGENCY_COMMON_INSIDE_CAPITAL'">一般纳税人代理记账</router-link>
					</div>
					<div class="item-content">
						<router-link :to="'/product/detail?productCode=AGENCY_SMALL_INSIDE_CAPITAL'">小规模纳税人代理记账</router-link>
					</div>
				</v-service-icon>

			</div>
		</div>
		<div class="row">
			<div class="item">
				<v-service-icon label="财富增值" icon="icon-jingwaifalv" url="/appreciation" bgcolor="#E87E51">
					<div class="item-content">
						<router-link :to="'/appreciation'">企业所得税免税包</router-link>
					</div>
					<div class="item-content">
						<router-link :to="'/appreciation'">地方财政贡献奖励包</router-link>
					</div>
				</v-service-icon>

			</div>
			<div class="item">
				<v-service-icon label="财税咨询" icon="icon-zixun1" url="/product/cszx" bgcolor="#F2D309">
					<div class="item-content">
						<router-link :to="'/product/cszxDetail?goodsCategoryId=967ce253c8854350bc2649281f06b18c&id=2'">企业所得税汇算清缴报告</router-link>
					</div>
					<div class="item-content">
						<router-link :to="'/product/cszxDetail?goodsCategoryId=967ce253c8854350bc2649281f06b18c&id=1'">土地增值税清算审核报告</router-link>
					</div>
				</v-service-icon>

			</div>
		</div>
	</div>
</template>
<style scoped>
	.bi {
		background-color: #fff;
		border-left: 1px solid #e3e3e3;
		border-bottom: 1px solid #e3e3e3;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.item {
		padding: 0.6rem 1rem 1rem;
		border: 1px solid #e3e3e3;
		border-left: none;
		border-bottom: none;
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.item-content a {
		padding-top: .3rem;
		color: #9C9C9C;
		font-size: 1.2rem;
	}

	.item-content {
		text-align: center;
	}

	.item-content-double a {
		padding: 0 .6rem;
	}

	@media (device-width:320px) and (-webkit-min-device-pixel-ratio:2) {
		/* 兼容iphone4、iphone5 */
		.item-content-double a {
			padding: 0 .4rem;
		}
	}
</style>
