<template>
	<div>
		<Header>商品分类</Header>
		<div class="clear"></div>
		<div class="cat-left">
			<ul >
				<router-link v-for="(cat,index) in cats" :key="index" tag="li" :to="{path:'/cat/subCat',query:{id:cat.id}}">{{cat.name}}</router-link>
			</ul>
		</div>
		<div >
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import Header from "../components/Header.vue"
	export default{
		created:function(){
			this.axios.get('http://192.168.249.1:3000/cats').then(res=>{
				this.cats = res.data
			})
		},
		components:{
			Header
		},
		data:function(){
			return{
					cats:[]
			}
		}
	}
</script>

<style>
	/* 清除浮动 */
	.clear{
		clear: both;
	}
	.router-link-exact-active{
		color: #CC0000;
	}
	.cat-left{
		width: 20%;
		background-color: #F0F0F0;
		height: 80vh;
		float: left;
	}
	.cat-left li{
		height: 5vh;
		line-height: 5vh;
		text-align: center;
		font-size: 14px;
	}
</style>
