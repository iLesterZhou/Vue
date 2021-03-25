<template>
	<div>
		<Header>订单结算</Header>
		<div class="clear"></div>
		<div class="addr">
			<strong>{{address.name}} {{address.mobile}}</strong>
			<p>{{address.address}}</p>
		</div>
		<div class="cart">
			<ul>
				<li v-for="(goods,index) in goodsList" :key="index">
					<div class="goods-img"><img :src="goods.goods_url" alt=""></div>
					<div class="goods-info">
						<p>{{goods.goods_name}}</p>
						<div class="goods-price">
							<strong>&yen{{goods.goods_price}}</strong>
							
						</div>
						<div class="delCart">x{{goods.num}}</div>
					</div>
				</li>
			</ul>
		</div>
		
		<div class="pay-total">
			<strong>实付价格</strong>
			<span> &yen;{{totalPrice}}</span>
		</div>
		<div class="clear"></div>
		<div class="pay-btn">
			<button @click="toPay('wx')" class="wx-pay">
				微信支付
			</button>
			<button @click="toPay('wx')" class="zfb-pay">
				支付宝支付
			</button>
		</div>
	</div>
</template>

<script>
	import Header from '../components/Header.vue'
	export default{
		data:function(){
			return{
				address:'',
				goodsList:[],
				totalPrice:0
			}
		},
		components:{
			Header
		},
		created:function(){
			//获取收货地址
			this.axios.get('http://192.168.249.1:3000/saveAddr/2').then(res=>{
				this.address = res.data
			})
			//用户在购物车一起购买，获取购物车中的宝贝
			if(!this.$route.query.id){
				
				let cart = JSON.parse(localStorage.getItem('cartList'))
				for(let i=0;i<cart.length;i++){
					if(cart[i].checked=='true'){
						this.goodsList.push(cart[i])
					}
				}
				this.sumPrice(this.goodsList)
			}else{
				//用户在商品详情页直接点击购买
				this.axios.get('http://192.168.249.1:3000/indexGoods/'+this.$route.query.id).then(res=>{
					this.goodsList.push(res.data)
					//计算价格
					this.totalPrice = res.data.goods_price
				})
				
			}
		},
		methods:{
			//结算
			sumPrice:function(goods){
				for(let i=0;i<goods.length;i++){
					//计算价格的时候判断宝贝是否被选中
					if(goods[i].checked=='true'){
						
						this.totalPrice = ((this.totalPrice*100) + (((goods[i].goods_price)*100)*goods[i].num))/100
					}
					
				}
			},
			toPay:function(type){
				//请求支付接口
				//模拟数据
				let ret={'status':'success','msg':'支付成功'}
				//支付成功
				if(ret.status=='success'){
					this.$router.push('/user')
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.clear{
		clear: both;
	}
	.addr{
		padding-bottom: 15px;
	    background: #fff url(../assets/img/icon/address.png) -7px bottom repeat-x;
	}
	.addr strong{
		font-size: 20px;
		padding: 3vw;
	}
	.addr p{
		color: #666;
		padding: 3vw;
	}
	.cart{
		position: relative;
	}
	.cart li{
		height: 20vh;
		border-bottom: 1px solid #f0f0f0;
	}
	.radio{
		position: absolute;
		line-height: 20vh;
	}
	.goods-img{
		position: absolute;
		margin-left: 5%;
		padding-top: 3vh;
	}
	.goods-img img{
		width: 25vw;
	}
	.goods-info{
		margin-left: 33%;
		padding-top: 3vh;
		
	}
	.goods-info p{
		font-size: 16px;
		height: 5vh;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.goods-price{
		margin-top: 5vh;
	}
	.goods-price strong{
		color: #CC0000;
		font-size: 20px;
		
	}
	.cart-num{
		float: right;
		background-color: #f7f7f7;
		margin-right: 20px;
	}
	.cart-num span{
		font-size: 32px;
		cursor: pointer;
	}
	.cart-num input{
		width: 8vw;
		border:none;
		outline: none;
		background-color:f7f7f7 ;
		margin-top: -30%;
		text-align: center;
	}
	.delCart{
		margin-top:-2vh;
		margin-left: 80%;
		color: #999;
		cursor: pointer;
	}
	.pay-total{
		float: right;
		padding: 3vw;
	}
	.pay-total strong{
		font-size: 18px;
	}
	.pay-total span{
		color: #CC0000;
		font-size: 18px;
	}
	.pay-btn{
		width: 100%;
		margin-top: 10%;
	}
	.wx-pay{
		width: 40%;
		height: 44px;
		border-radius: 22px;
		border-style: none;
		outline: none;
		background-color: #00c250;
		color: #fff;
		font-size: 18px;
		margin-left: 7%;
	}
	.zfb-pay{
		width: 40%;
		height: 44px;
		border-radius: 22px;
		border-style: none;
		outline: none;
		background-color: #1677ff;
		color: #fff;
		font-size: 18px;
		margin-left: 7%;
	}
</style>
