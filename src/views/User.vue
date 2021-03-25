<template>
	<div>
		<Header>我的京东</Header>
		<div class="clear"></div>
		
		<div class="user-info">
			<div>
				<img src="../assets/img/icon/user.png" alt="">
			</div>
			<div class="user-mobile">
				{{mobile}}
			</div>
			<div @click="logout" class="logout">
				退出登录
			</div>
		</div>
		
		<div class="clear"></div>
		<div class="gray-line"></div>
		<div>
			<ul class="user-nav">
				<router-link tag="li" :to="{path:'/user/order',query:{uri:'allOrder'}}">全部订单</router-link>
				<router-link tag="li" :to="{path:'/user/order',query:{uri:'waitPay'}}">待付款</router-link>
				<router-link tag="li" :to="{path:'/user/order',query:{uri:'waitRec'}}">待收货</router-link>
				<router-link tag="li" to="/user/addr">地址管理</router-link>
			</ul>
		</div>
		<div class="clear"></div>
		<div class="gray-line"></div>
		
		<div>
			<router-view></router-view>
				
		</div>
	</div>
</template>

<script>
	import Header from '../components/Header.vue'
	export default{
		data:function(){
			return{
				mobile:''
				
			}
		},
		components:{
			Header
		},
		methods:{
			logout:function(){
				//this.axios
				localStorage.clear()
				this.$router.push('/')
			}
		},
		created:function(){
			this.mobile=localStorage.getItem('mobile')
		},
		//Vue导航守卫，进入导航时
		beforeRouteEnter:function(to,from,next){
			//判断用户是否登录,没有登录的话直接跳转到登录页面
			if(!localStorage.getItem('token')){
				next('/login')
			}else{
				next()
			}
		},
		
	}
</script>

<style scoped="scoped">
	/* 清除浮动 */
	.clear{
		clear:both
	}
	.user-info{
		background: linear-gradient(90deg,#dd9b4c,#ffd787);
		height: 25vw;
	}
	.user-info div{
		float: left;
	}
	.user-info img{
		width: 18vw;
		padding: 3vw;
	}
	.user-mobile{
		font-size: 5vw;
		font-weight: bold;
		color: #fff;
		line-height: 20vw;
		
	}
	.logout{
		font-weight: bold;
		color: #CC0000;
		font-size: 4vw;
		margin-left: 15vw;
		padding: 2vw;
	}
	.gray-line{
		height: 3vw;
		background-color: #f0f0f0;
		
	}
	.user-nav li{
		float: left;
		width: 25%;
		text-align: center;
		height: 44px;
		line-height: 44px;
	}
	/* 选中时的样式 */
	.router-link-exact-active{
		background-color: #f0f0f0;
	}
</style>
