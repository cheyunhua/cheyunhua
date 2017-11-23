<script>
	import nav from 'src/router/nav'
	export default {
		props: {
			title: {
				type: String,
				required: true
			},
			content: {
				type: String,
				required: true
			},
			link: {
				type: String,
				required: true
			},
			url: {
				type: String,
				required: true
			},
			itcShow: Boolean,
			content: {
				type: String,
				required: true
			},
			pubDate: {
				type: Number,
				required: true
			},
		},
		computed: {
        ellipsisTitle() {
            let clipLength = 27
            return this.title.length >= clipLength
                ? this.title.substring(0, clipLength) + '...'
                : this.title
        }
    },
		data() {
			return {

			}
		},
		created() {},
		methods: {
			nav
		},
	}
</script>
<template>
	<div class="itc" @click="nav(link)">
		<img v-if="itcShow" class="itc-img" :src="url" alt="" />
		<div class="itc-content">
			<p>{{ellipsisTitle}}</p>
			<div class="itc-foot">
				<span class="itc-foot-left">{{content}}</span>
				<span class="itc-foot-right">{{new Date(pubDate).toLocaleDateString().split('/').join('-')}}</span>
			</div>
		</div>
	</div>
</template>
<style scoped>
	.itc {
		display: flex;
		height: 10rem;
		margin-bottom: .5rem;
		padding: .8rem;
		padding-left: 1.4rem;
		background-color: white;
		border: 1px solid #ddd;
	}
	
	.itc-img {
		width: 10rem;
		height: 8rem;
	}
	
	.itc-content {
		flex: 2.6;
		margin-left: 1rem;
		overflow: hidden;
		display: flex;
		flex-flow: nowrap column;
	}
	
	.itc-content p {
		font-size: 1.4rem;
		color: #FF9800;
		margin-bottom: .5rem;
		font-weight: 400;
		flex: 3.6;
	}
	
	.itc-content span {
		font-size: 1.2rem;
		display: inline-block;
		line-height: 1.4rem;
		color: #9E9E9E;
		flex: 1;
		text-align: right;
		padding-right: .8rem;
	}
	
	.itc-foot {
		flex: 1;
		display: flex;
	}
	
	.itc-foot-left {
		flex: 2 !important;
		text-align: left !important; 
	}
</style>