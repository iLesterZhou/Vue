<template>
	<div>
		
		<div class="index-header">
			<ul>
				<li @click="toCat" class="header-cat">
					<img src="../assets/img/icon/cat.png" >
				</li>
				<li class="header-search">
					<input type="text">
				</li>
				<li class="header-user">
					<img @click="toUser" v-if="isLogin" src="../assets/img/icon/login-user.png">
					<div @click="toLogin" v-else >登录</div>
					
					
				</li>
			</ul>
		</div>
		<div class="clear"></div>
		<!-- 幻灯片 -->
		<div class="swiper">
			<swiper ref="mySwiper" :options="swiperOptions">
			    <swiper-slide v-for="(swiper,index) in swipers" :key="index">
					<img :src="swiper.url" />
				</swiper-slide>
			    <div class="swiper-pagination" slot="pagination"></div>
			  </swiper>
		</div>
		<!--商品展示 -->
		<div class="index-goods">
			<ul>
				<li @click="goodsDetail(goods.id)" v-for="(goods,index) in goods_list" :key="index">
					<div><img :src="goods.goods_url" alt=""></div>
					<div class="goods-name">{{goods.goods_name}}</div>
					<div class="goods-price">&yen{{goods.goods_price}}</div>
				</li>
				
			</ul>
		</div>
	</div>
</template>

<script>
	//引入幻灯片
	import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
	// import 'swiper/css/swiper.css'
	import 'swiper/swiper-bundle.css'
	export default{
		created:function(){
			//判断用户是否登录
			if(localStorage.getItem('token')){
				this.isLogin=true 
			}
			//获取幻灯片
			this.axios.get('http://192.168.249.1:3000/swiper').then(res=>{
				// console.log(res);
				this.swipers = res.data
			})
			//获取商品信息、图片、介绍、价格
			// this.axios.get('http://192.168.249.1:3000/indexGoods?_start=0&_limit=6').then(res=>{
			// 	this.goods_list = res.data
			// })
			this.getGoods()
			// addEventListener提供的注册事件监听器的方法,当用户向上向下滑动屏幕或者向上向下滑动滚动条的时候调用this后面的方法
			window.addEventListener('scroll',this.onScroll)
		},
		data:function(){
			return {
				isLogin:false,
				// 幻灯片引入的文件
				swiperOptions: {
				    pagination: {
				        el: '.swiper-pagination'
				    },
				    // 幻灯片自动播放
					autoplay:true
				},
				swipers:[],
				goods_list:[],
				curIndex:0,
				limit:6
				
			}
		},
		methods:{
			toCat:function(){
				// 编程式导航
				this.$router.push('/cat')
			},
			toUser:function(){
				// 编程式导航
				this.$router.push('/user')
			},
			toLogin:function(){
				// 编程式导航
				this.$router.push('/login')
			},
			//滑动滚动条调用的方法，实现懒加载，
			onScroll:function(){
				// console.log('onScroll')
				//兼容电脑和手机端
				//滚动条从顶部到底部的最大长度
				let top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
				//滚动条的长度
				let height = document.documentElement.scrollHeight
				let clientHeight = document.documentElement.clientHeight
				// 滚动条快到底的时候
				if(height-top-clientHeight<=50){
					// console.log("到底了，不要再划了")
					this.getGoods()
				}
			},
			getGoods:function(){
				//每次增加相同数量的商品信息
				let start = (this.curIndex)*6
				//滚动条到底时，继续获取商品信息、图片、介绍、价格,
				this.axios.get('http://192.168.249.1:3000/indexGoods?_start='+start+'&_limit='+this.limit).then(res=>{
					// console.log(res.data)
					//合并数据，将新加载的数据和之前加载的数据拼接到一起
					this.goods_list = this.goods_list.concat(res.data)
				})
				this.curIndex++
			},
			//点击主页商品，进入商品详情页
			goodsDetail:function(id){
				this.$router.push('/goodsDetail'+id)
			}
		},
		// 幻灯片引入的文件
		components: {
		    Swiper,
		    SwiperSlide
		},
	}
</script>

<style scoped="scoped">
	.clear{
		height: 46px;
	}
	.index-header{
		background-color: #F2270C;
		height: 46px;
		width: 100%;
		text-align: center;
		position: fixed;
		z-index: 2;
	}
	.index-header li{
		float: left;
		line-height: 46px;
	}
	.index-header img{
		width: 6vw;
	}
	.header-cat,.header-user{
		width: 20%;
	}
	.header-search{
		width: 60%;
	}
	.header-search input{
		width: 100%;
		height: 22px;
		border-radius: 11px;
		border-style: none;
	}
	.header-user div{
		color: #FFFFFF;
		font-size: 14px;
		font-weight: bold;
	}
	.swiper img{
		width: 100%;
	}
	.index-goods li{
		width: 42%;
		float: left;
		padding: 2vw;
		margin-left:2%;
	}
	.index-goods img{
		width: 42vw;
	}
	.goods-name{
		box-sizing: border-box;
		    height: 31px;
		    font-size: 13px;
		    overflow: hidden;
		    text-overflow: ellipsis;
		    display: -webkit-box;
		    -webkit-line-clamp: 2;
		    -webkit-box-orient: vertical;
		    word-break: break-all;
		    color: #1a1a1a;
		    margin-top: 5px;
		    line-height: 16px;
		    margin-bottom: 3px;
		    padding: 0 4px;
	}
	.goods-price{
		color: #fa2c19;
		display: inline-block;
		padding: 0 5px 0 4px;
		position: relative;
		top: 1px;
		height: 25px;
		line-height: 25px;
		font-family: JDZhengHT-EN-Regular;
	}
	
</style>
