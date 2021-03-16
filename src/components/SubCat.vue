<template>
	<div class="cat-right">
		<!-- this is subcat {{this.$route.query.id}} -->
		<ul>
			<li v-for="(sub,index) in subCats" :key="index">
				<img :src="sub.cat_img" alt="">
				<p>{{sub.cat_name}}</p>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		created:function(){
			this.getCats(0)
		},
		// beforeRouteUpdate 
        // 类型: Function 
		// 所属对象: ComponentOptions 
		// 在当前路由改变，但是该组件被复用时调用。举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
		// 。由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。可以访问组件实例 `this` 
		beforeRouteUpdate:function(to,from,next){
			// 获取分类主id
			let id = to.query.id
			this.getCats(id)
			next()
		},
		data:function(){
			return{
				subCats:[
					
				]
			}
		},
		methods:{
			getCats:function(id){
				if(id==0){
					id = 1
				}
				this.axios.get('http://192.168.249.1:3000/cats/'+id).then(res=>{
					this.subCats = res.data.sub_cat
				})	
			}
		}
	}
</script>

<style>
	.cat-right{
		margin-left: 12%;
	}
	.cat-right img{
		width: 20vw;
	}
	.cat-right li{
		float: left;
		padding: 2vw;
	}
	.cat-right p{
		padding: 2vw;
	}
</style>
