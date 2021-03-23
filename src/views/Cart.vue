<template>
	<div>
		<Header>购物车</Header>
		<div class="clear"></div>
		<div class="cart">
			<ul>
				<li v-for="(goods,index) in goodsList" :key="index">
					<div class="radio" @click="checkCart(index,$event)">
						<input type="checkbox" v-if="goods.checked=='true'" checked="">
						<input type="checkbox" v-else>
					</div>
					<div class="goods-img"><img :src="goods.goods_url" alt=""></div>
					<div class="goods-info">
						<p>{{goods.goods_name}}</p>
						<div class="goods-price">
							<strong>&yen{{goods.goods_price}}</strong>
							<div class="cart-num">
								<span @click="subNum(index)">-</span>
								<input type="text" :value="goods.num">
								<span @click="addNum(index)">+</span>
							</div>
						</div>
						<div class="delCart" @click="delCart(index)">删除</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="cart-footer">
			<div class="cart-total">
				<strong>总计</strong>
				<span>&yen{{totalPrice}}</span>
			</div>
			<div class="cart-pay">
				<button>去结算</button>
				
			</div>
		</div>
	</div>
</template>

<script>
	import Header from "../components/Header.vue"
	export default{
		created:function(){
			this.goodsList = JSON.parse(localStorage.getItem('cartList'))
			this.sumPrice(this.goodsList)
		},
		components:{
			Header
		},
		data:function(){
			return{
				goodsList:'',
				totalPrice:0.00
			}
			
		},
		methods:{
			delCart:function(index){
				// alert(index)
				//删除当前数组中的宝贝，从当前索引开始，删除的个数为一个。并非本地缓存购物车中的宝贝
				this.goodsList.splice(index,1)
				//提醒用户是否真的删除
				//弹窗提示
				let layerid = this.$layer.msg('确定要删除吗？',()=>{
					this.saveCart(this.goodsList)
					//关闭提示
					this.$layer.close(layerid)
				})
	
			},
			// 更新一下本地缓存购物车
			saveCart:function(good){
				let goods = JSON.stringify(good)
				localStorage.setItem('cartList',goods)
			},
			// 减少购物车宝贝数量
			subNum:function(index){
				//如果用户减少购物车的宝贝数量小于零，直接返回
				if(this.goodsList[index].num<=1){
					return
				}
				this.goodsList[index].num--
				//计算价格
				this.sumPrice(this.goodsList)
				//更新本地缓存中的数据
				this.saveCart(this.goodsList)
			},
			//增加购物车宝贝的数量
			addNum:function(index){
				this.goodsList[index].num++
				//计算价格
				this.sumPrice(this.goodsList)
				//更新本地缓存中的数据
				this.saveCart(this.goodsList)
			},
			//结算
			sumPrice:function(goods){
				this.totalPrice = 0
				for(let i=0;i<goods.length;i++){
					//计算价格的时候判断宝贝是否被选中
					if(goods[i].checked=='true'){
						this.totalPrice += goods[i].goods_price*goods[i].num
					}
					
				}
			},
			//检查宝贝是否被选中
			checkCart:function(index,$event){
				console.log($event)
			}
		}
	}
</script>

<style scoped="scoped">
	.clear{
		clear: both;
	}
	.cart{
		position: relative;
	}
	.cart li{
		height: 25vh;
		border-bottom: 1px solid #f0f0f0;
	}
	.radio{
		position: absolute;
		line-height: 20vh;
	}
	.goods-img{
		position: absolute;
		margin-left: 10%;
		padding-top: 3vh;
	}
	.goods-img img{
		width: 25vw;
	}
	.goods-info{
		margin-left: 38%;
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
	.cart-footer{
		position: fixed;
		bottom: 0;
		background-color: #f0f0f0;
		height: 50px;
		width: 100%;
	}
	.cart-total{
		float:left;
		line-height: 50px;
		margin-left: 25%;
	}
	.cart-total span{
		color: #F2270C;
		font-size: 16px;
		font-weight:blod;
	}
	.cart-total strong{
		font-size: 20px;
		font-weight: blod;
	}
	.cart-pay{
		float:left;
	}
	.cart-pay button{
		    margin: 6px 12px 0;
		    font-weight: 700;
		    display: block;
		    width: 113px;
		    height: 38px;
		    line-height: 38px;
		    text-align: center;
		    font-size: 20px;
		    border-radius: 20px;
		    background-color: #f2270c;
		    color: #fff;
		    font-size: .7rem;
		    background-image: -webkit-linear-gradient(315deg,#f2140c,#f2270c 70%,#f24d0c);
		    background-image: linear-gradient(135deg,#f2140c,#f2270c 70%,#f24d0c);
			border-style: none;
	}
	.delCart{
		margin-top: 3vh;
		margin-left: 80%;
		color: #999;
		cursor: pointer;
	}
</style>
