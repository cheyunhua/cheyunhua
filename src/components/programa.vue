<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
/*        name: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        }*/
    },
    data() {
        return {

        }
    },
    created() {

    },
    methods: {
        click() {

        }
    },
}

</script>
<template>
    <!--<div class="startc">-->
		<div class="startc-title">
			<span>{{title}}</span>
		</div>
		<!--<ul>
			<li><i :class="'icon iconfont '+ icon"></i>
				<p class="name">{{name}}</p>
			</li>
		</ul>

	</div>-->
</template>
<style scoped>
/*.startc {
		border: .1rem solid #ddd;
		background: #fff;
	}*/
	
	.startc-title {
		border: .1rem solid #ddd;
		padding: .7rem 0;
		font-size: 1.4rem;
		background: #fff;
		margin-top: .4rem;
	}

	.startc-title span {
		color: #3B3B3B;
		border-left:1rem solid #FB8C00;
		padding: .4rem 1.4rem;
	}
	
	/*.name {
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
	}*/
</style>
