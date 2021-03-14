<template>
	<div>
		<Header>京东登录注册</Header>
		<div class="clear"></div>
		
		<div class="login-main">
				<div class="mobile">
					<input type="text" v-model.lazy="mobile" placeholder="请输入手机号"/>
				</div>		
				<div class="code">
						<div class="code-text">
							<input type="text" v-model="code" placeholder="请输入验证码"/>
						</div>
						<div>
							<button @click="sendCode">{{btnMsg}}</button>
						</div>
				</div>
				
		</div>
		<div class="clear"></div>
		<div class="tip" v-show="!isCheck">{{errInfo}}</div>
		<div class="sub">
			<button @click="login">登录</button>
		</div>
	</div>
</template>

<script>
	import Header from '../components/Header.vue'
	export default{
		data:function(){
			return {
				mobile:'',
				errInfo:'',
				isCheck:false,
				btnMsg:'发送验证码',
				code:''
			}
		},
		components:{
			Header
		},
		methods:{
		
			sendCode:function(){
				//先判断手机号是否正确
				if(this.isCheck){
					//获取验证码
					let data=this.qs.stringify({
						mobile:this.mobile
					})
					this.axios.post('http://192.168.249.1:3000/sendCode',data).then(res=>{
						// console.log(res)
						//成功返回验证码之后
						let ret={
							"status":'success',
							'msg':'发送成功'
						}
						if(ret.status=='success'){
							this.btnMsg=ret.msg
						}
						
					})
				}
				
			},
			login:function(){
				//先判断手机号是否正确
				if(this.isCheck){
					// qs.stringify()作用是将对象或者数组序列化成URL的格式
					//转换成 "mobile=***&code=***"
					let data=this.qs.stringify({
						mobile:this.mobile,
						code:this.code
					})
					this.axios.post('http://192.168.249.1:3000/login',data).then(res=>{
						let ret = {
							'status':'success',
							'msg':'登录成功',
							'token':'123456'
						}
						if(ret.status=='success'){
							//登录成功之后,将token存放到本地
							localStorage.setItem('token',ret.token)
							//将用户登录用的手机号存放到本地
							localStorage.setItem('mobile',this.mobile)
							
							//登录成功弹窗
							let layerid = this.$layer.msg(ret.msg,()=>{
								this.$router.push('/')
								//跳转之后关闭弹窗
								this.$layer.close(layerid)
							})
							
						}else{
							//登录失败弹窗
							let layerid = this.$layer.msg(ret.msg,()=>{
								this.$layer.close(layerid)
							})
						}
					})
				}
		   }
		},
		//监控属性
		watch:{
			mobile:function(){
				// console.log(this.mobile)
				let res =  this.mobile.match(/^1(3|5|7|8|9)\d{9}$/)
				
				// console.log(res)
				//手机号格式不正确
				if(!res){
				   	this.errInfo="手机号码格式不正确"
					this.isCheck=false
				}else{
					this.isCheck=true
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.clear{
		/* 清除浮动 */
		clear: both;
	}
	
	.mobile{
		margin-top: 10%;
		width:80%;
		margin-left: 10%;
	}
	.mobile input{
		width: 100%;
		border: none;
		border-bottom: 1px solid #333333;
		height: 44px;
		outline: none;
	}
	.code{
		margin-top: 10%;
		width:100%;
		margin-left: 10%;
	}
	.code div{
		float: left;
	}
	.code-text input{
		width: 100%;
		border: none;
		border-bottom: 1px solid #333333;
		height: 44px;
		outline: none;
	}
	.code button{
		height: 44px;
		background-color: #CC0000;
		color: #FFFFFF;
		border-style: none;
		border-radius: 15px;
		outline: none;
	}
	.sub{
		width:80%;
		margin-left: 10%;
		margin-top: 20%;
	}
	.tip{
		width:100%;
		margin-left: 10%;
		margin-top: 10%;
		color: #CC0000;
	}
	.sub button{
       width:100%;
	   height: 44px;
	   border-radius: 20px;
	   border-style: none;
	   outline: none;
	   background-image: linear-gradient(90deg,#fab3b3,#ffbcb3 73%,#ffcaba)
	}
</style>

