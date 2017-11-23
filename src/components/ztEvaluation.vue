<template>
	<div class="zt-evaluation">
		<div class="zt-evaluation-nsrsbh">
			{{nsrsbh}}
		</div>
		<div class="zt-evaluation-company">
			{{company}}
		</div>
		<div class="zt-evaluation-message">
			<span><i class="iconfont icon-wo" style="margin-right: .2rem;"></i>{{linkman}}</span>
			<span style="text-align: center;margin-right: 2rem;"><i class="iconfont icon-shouji"></i>{{phone}}</span>
			<span style="text-align: right;"><i class="iconfont icon-time" style="margin-right: .4rem;"></i>{{time}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			nsrsbh: {
				type: String,
				required: true
			},
			company: {
				type: String,
				required: true
			},
			linkman: {
				type: String,
				required: true
			},
			phone: {
				type: String,
				required: true
			},
			time: {
				type: String,
				required: true
			},
		},
		data() {
			return {}
		}
	}
</script>

<style>
	.zt-evaluation-nsrsbh {
		font-size: 1.8rem;
		color: #000;
		margin-top: .6rem;
		margin-bottom: .2rem;
	}
	
	.zt-evaluation-company {
		color: #6c6c6c;
		font-size: 1.4rem;
		margin-bottom: 1.4rem;
	}
	
	.zt-evaluation-message {
		margin-bottom: 1.4rem;
		white-space: nowrap;
		display: flex;
		display: -webkit-flex;
	}
	
	.zt-evaluation-message span {
		font-size: 1.4rem;
		display: inline-block;
		color: #adadad;
		flex: 1;
		-webkit-flex: 1;
	}
	
	.zt-evaluation-time {
		font-size: 1.4rem;
		color: #AEAEAE;
	}
	
	.zt-evaluation {
		padding: .9rem 0 .7rem;
		border-bottom: 1px solid #ddd;
	}
	
	@media (device-width:320px) and (-webkit-min-device-pixel-ratio:2) {
    /* 兼容iphone4、iphone5 */
   .zt-evaluation-nsrsbh {
		font-size: 1.6rem;
	}
    .zt-evaluation-message span {
		font-size: 1.2rem;
	}
}
</style>