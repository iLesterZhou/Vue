<template>
	<div>
		<Header>商品详情</Header>
		<div class="clear"></div>
		<div class="goods-main">
			<div class="goods-info">
				<div>
					<!-- 可以替换为幻灯片 -->
					<img :src="goods_detail.goods_url">
					
				</div>
				<div class="goods-price">
					￥{{goods_detail.goods_price}}}
				</div>
				<div class="goods-name">
					<h1>
						{{goods_detail.goods_name}}}
					</h1>
				</div>
			</div>
			<div class="comments">
				<p class="tit">评价</p>
				<ul>
					<li v-for="(comment,index) in comments" :key="index">
						<div><em>{{doMobile(comment.mobile)}}</em> <span>{{comment.time}}</span></div>
						<p>{{comment.content}}</p>
					</li>
				
					
				</ul>
			</div>
			<div class="goods-introduce">
				<p class="tit">商品介绍</p>
				<ul>
					<li v-for="(src,index) in goods_detail.goods_introduce" :key="index">
						<img :src="src" alt="">
					</li>
				</ul>
			</div>
		</div>
		<!-- footer -->
		<div class="goods-footer">
			<div>
				<span>
					<img src="../assets/img/icon/cart.png" alt="">
				</span>
				<span class="add-cart">
					<button>加入购物车</button>
				</span>
				<span class="to-buy">
					<button>立即购买</button>
				</span>
			</div>
			
		</div>
	</div>
</template>

<script>
	import Header from '../components/Header.vue'
	export default{
		created:function(){
			// 获取商品评价
			this.axios.get('http://192.168.249.1:3000/comments').then(res=>{
				this.comments = res.data
			})
			// 通过this.$route.params来获取路由中的参数
			//获取点击商品的id
			let id = this.$route.params.id
			// 获取商品详情
			this.axios.get('http://192.168.249.1:3000/indexGoods/'+id).then(res=>{
				this.goods_detail = res.data
			})
		},
		data:function(){
			return{
				// 评论
				comments:[],
				goods_detail:''
			}
		},
		components:{
			Header
		},
		methods:{
			// 隐藏手机号中间部分
			doMobile:function(mobile){
				// console.log(mobile)
				// 裁剪手机号码中间四位
				let str = mobile.slice(3,7)
				// 将中间四位数字替换为****
				return mobile.replace(str,"****")
			}
		}
	}
</script>

<style>
	.clear{
		clear: both;
	}
	.goods-main{
		background-color: #F0F0F0;
	}
	.goods-info{
		background-color: #fff;
	}
	.goods-info img{
		width: 100vw;
	}
	.goods-price{
		font-family: JDZH-Regular;
		font-size: 16px;
		line-height: 30px;
		color: #f2270c;
		padding: 2vw;
		font-size: 25px;
		font-weight: bold;
	}
	.goods-name{
		padding: 3vw;
		font-size: 10px;
	}
	.comments{
		background-color: #fff;
		margin-top: 3vw;
		border-radius: 2vw;
	}
	.comments li{
		border-top: 1px solid #F0F0F0;
	}
	.tit{
		color: #262626;
		font-weight: 700;
		padding: 3vw;
	}
	.comments div{
		margin: 3vw;
	}
	.comments div span{
		float: right;
		color: #999;
	}
	.comments li p{
		padding: 3vw;
	}
	.goods-introduce{
		background-color: #fff;
		border-radius: 2vw;
		margin-top: 2vw;
	}
	.goods-introduce img{
		width:100%;
	}
	.goods-footer{
		position: fixed;
		bottom: 0;
		height: 44px;
		background-color: #fff;
		width: 100%;
	}
	.goods-footer img{
		width: 9vw;
	}
	.goods-footer div{
		margin-left: 40%;
		line-height: 44px;
	}
	.add-cart button{
		background-image: linear-gradient(135deg,#f2140c,#f2270c 70%,#f24d0c);
		border-style: none;
		height: 35px;
		border-radius: 17px;
		color: #fff;
		outline: none;
		font-size: 13px;
		margin-left: 4%;
	}
	.to-buy button{
		background-image: linear-gradient(135deg,#ffba0d,#ffc30d 69%,#ffcf0d);
		border-style: none;
		height: 35px;
		border-radius: 17px;
		color: #fff;
		outline: none;
		font-size: 13px;
		margin-left: 4%;
	}
</style>
