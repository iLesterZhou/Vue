<template>
	<div class="express">
		<ul>
			<li v-for="(ex,index) in express" :key="index">
				{{ex.datetime}}{{ex.remark}}
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		// props:{
		// 	order:{
		// 		type:Object,
		// 		default:function(){
		// 			return{
						
		// 			}
		// 		}
		// 	}
		// },
		props:['order'],
		created:function(){
			this.id = this.order
			//根据商品id获取快递信息
			this.axios.get('http://192.168.249.1:3000/express').then(res=>{
				if(res.data.resultcode==200){
					this.express = res.data.result.list
				}
			})
		},
		data:function(){
			return{
				id:'',
				express:''
			}
		}
	}
</script>

	
<style>
	.express li{
		height: 3vh;
		padding:2vw ;
		border-bottom: 1px solid #F0F0F0;
	}
</style>
