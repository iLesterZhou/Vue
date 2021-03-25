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
					&yen{{goods_detail.goods_price}}
				</div>
				<div class="goods-name">
					<h1>
						{{goods_detail.goods_name}}
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
					<span @click="toCart()" v-show="cart_num" class="cart-num">{{cart_num}}</span><img src="../assets/img/icon/cart.png" alt="">
				</span>
				<span class="add-cart" @click="addCart(goods_detail)">
					<button>加入购物车</button>
				</span>
				<span class="to-buy" @click="toBuy(goods_detail.id)">
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
			//加载页面的时候显示购物车中宝贝的数量
			this.cart_num = JSON.parse(localStorage.getItem("cartList")).length
		},
		data:function(){
			return{
				// 评论
				comments:[],
				goods_detail:'',
				cart_num:0
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
			},
			addCart:function(goods){
				// console.log(goods)
				//判断用户是否登录,没有登录的话不能将商品添加到购物车，然后跳转到登录页面
				if(!localStorage.getItem('token')){
					this.$router.push('/login')
				}
				let cartGoods = {
					"goods_name":goods.goods_name,
					"goods_url":goods.goods_url,
					"goods_price":goods.goods_price,
					"id":goods.id,
					"num":1,
					// 商品在加入购物车之后计算价格的时候是否选中的状态
					"checked":'false'
					
				}
				// console.log(cartGoods)
				var cart = localStorage.getItem('cartList')
				//获取本地缓存的购物车中是否为空,如果购物车中没有商品的话，直接将商品存入购物车
				//如果购物车中有商品，则和当前添加的商品进行比较，如果是同一种商品直接加一，如果不是则添加近购物车
				// console.log(cart)
				if(cart){
					//转换成对象
					// 在接收服务器数据时一般是字符串。我们可以使用 JSON.parse() 方法将数据转换为 JavaScript 对象。
					cart = JSON.parse(cart)
					//判断 是否有此商品 有num+1 没有 push
					var ret = this.inArray(cart,cartGoods)
					// console.log(ret)
					//此次添加的商品之前添加过，现在直接加一
					if(ret.status){
						cart[ret.index].num += 1 
					}else{
						//之前没有没有添加过，push
						cart.push(cartGoods)
					}
				}else{
					var cart = []
					cart.push(cartGoods)
					//将cartGoods转换为字符串
					
					
				}
				//购物车中宝贝的数量
				this.cart_num = cart.length
				// 在向服务器发送数据时一般是字符串。我们可以使用 JSON.stringify() 方法将 JavaScript 对象转换为字符串。
				cartGoods =JSON.stringify(cart)
				//存入本地缓存
			    localStorage.setItem("cartList",cartGoods)
				
			},
			inArray:function(cart,cartGoods){
				for(let i=0;i<cart.length;i++){
					//判断添加的商品之前是否添加过
					if(cart[i].id == cartGoods.id){
						return {"status":true,"index":i}
					}
				}
				return {"status":false}
			},
			toCart:function(){
				this.$router.push('/cart')
			},
			// 点击直接购买
			toBuy:function(id){
				this.$router.push({'path':'/toPay','query':{'id':id}})
			}
		}
	}
</script>

<style scoped="scoped">
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
	.cart-num{
		position: absolute;
		top: 0;
		left: 48%;
		display: inline-block;
		background: #fff;
		color: #e4393c;
		font-size: 7px;
		margin-left: -10px;
		line-height: 9px;
		border: 1px solid #e4393c;
		border-radius: 10px;
		padding: 1px 3px;
		font-weight: 700;
	}
</style>
