<template>
	<div class="comment">
		<div v-if="!isComment">
			<textarea  cols="30" rows="5" v-model="content"></textarea><br>
			<button @click="saveComment">提交评价</button>
		</div>
		<div v-else>
			<p>评价成功!</p>
		</div>
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
			
		},
		data:function(){
			return{
				id:'',
				content:'',
				isComment:false
			}
		},
		methods:{
			saveComment:function(){
				//获取评价用户手机号
				let mobile = localStorage.getItem('mobile')
				//评价时间、
				let date = new Date
				let time = date.getFullYear() +'-'+(date.getMonth()+1)+'-'+date.getDate()
				// console.log(mobile+time)
				//获取用户评价内容
				let data = this.qs.stringify({mobile:mobile,time:time,content:this.content})
				// console.log(data)
				this.axios.post('http://192.168.249.1:3000/comments',data).then(res=>{
					let ret = {status:'success',msg:'评价成功!'}
					if(ret.status=='success'){
						this.isComment=true
					}
				})
			}
		}
	}
</script>

	
<style scoped="scoped">
	.comment{
		margin:6vh auto;
	}
	.comment button{
		float: right;
		height: 30px;
		background-color: #CC0000;
		color: #fff;
		border-radius: 10px;
		border-style: none;
		margin-top: 5vh;
	}
	.comment p{
		font-size: 20px;
		color: #00C250;
		font-weight: bold;
	}
	
</style>
