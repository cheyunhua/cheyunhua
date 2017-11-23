<template>
	<div class="startc">
		<div class="startc-title">
			<span>{{title}}</span>
		</div>
		<ul>
			<li v-for="list in lists"><i :class="'icon iconfont '+ list.icon"></i>
				<p class="name">{{list.name}}</p>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {

				title: "开办公司",
				lists: [{
						icon: "icon-taizhangjilu",
						name: "公司注册"
					},
					{
						icon: "icon-taizhangjilu",
						name: "公司注册"
					},
					{
						icon: "icon-taizhangjilu",
						name: "公司注册"
					},
					{
						icon: "icon-taizhangjilu",
						name: "公司注册"
					}
				]
			}

		}
	}
</script>

<style>
	.startc {
		border: .1rem solid #ddd;
		background: #fff;
	}
	
	.startc-title {
		border-bottom: .1rem solid #ddd;
		padding: .7rem 0;
		
	}
	
	div>span,
	.name {
		font-size: 1.4rem;
	}
	
	.startc-title span {
		color: #3B3B3B;
		border-left:1rem solid #FB8C00;
		padding: .4rem 1.4rem;
	}
	
	.name {
		color: #474747;
	}
	
	.startc i {
		font-size: 3rem !important;
		color: #FB8C00;
	}
	
	ul {
		width: 100%;
		overflow: hidden;
	}
	
	.startc li {
		text-align: center;
		width: 50%;
		float: left;
		padding: 1.2rem 0 2.2rem;
	}
</style>