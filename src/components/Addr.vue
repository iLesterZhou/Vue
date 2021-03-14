<template>
	<div>
		<div class="addr-list">
			<ul>
				<li v-for="(addr,index) in addrList" :key="index">
					<p>{{addr.name}}{{addr.mobile}}</p>
					<span>{{addr.address}}</span>
					<button @click="delAddr(addr.id)">删除</button>
					<hr>
				</li>
			</ul>
		</div>
		<div class="addr-but">
			<button @click="addAddr">添加收货地址</button>
		</div>
	</div>
</template>

<script>
	export default{
		created:function(){
			//请求用户收货地址信息
			this.axios.get('http://192.168.249.1:3000/saveAddr').then(res=>{
				// console.log(res.data)
				this.addrList = res.data
			})
		},
		data:function(){
			return{
				addrList:[]
			}
		},
		methods:{
			addAddr:function(){
				this.$router.push('/user/addAddr')
			},
			//删除收货地址
			delAddr:function(id){
				//提示用户是否真的删除
				let layid = this.$layer.confirm('确定删除吗？',()=>{
					this.$layer.close(layid)
					// alert(id)
					this.axios.delete('http://192.168.249.1:3000/saveAddr/'+id).then(res=>{
						let ret = {
							"status":"success",
							"msg":"删除成功"
						}
						if(ret.status="success"){
							// alert(ret.msg)
							let layerid = this.$layer.msg(ret.msg,()=>{
								this.$layer.close(layerid)
								// 刷新页面
								this.$router.go(0)
							});
							
						}
					})
				})
				
			}
		}
	}
</script>

<style scoped="scoped">
	.addr-but button{
		width: 90%;
		margin-left: 5%;
		height: 14vw;
		background-image: linear-gradient(90deg,#fab3b3,#ffbcb3 73%,#ffcaba);
		color: #fff;
		border-radius: 7vw;
		outline: none;
		border-style: none;
		margin-top: 10vw;
	}
	.addr-list p {
		font-size: 5vw;
		font-weight: bold;
		padding: 2vw;
	}
	.addr-list span{
		padding: 2vw;
	}
	.addr-list button{
		background-image: linear-gradient(90deg,#fab3b3,#ffbcb3 73%,#ffcaba);
		color: #fff;
		outline: none;
		border-style: none;
		float: right;
	}
</style>
