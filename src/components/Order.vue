<template>
	<div>
		<div class="orders-list">
			<ul>
				<li v-for="(order,index) in orders" :key="index">
					<div class="order-left">
						<img :src="order.goods_url" alt="">
					</div>
					<div class="order-right">
						<p>{{order.goods_name}}</p>
						<div>
							    &yen{{order.goods_price}}
						</div>
						<div class="orders-but">
							<button v-if="order.is_pay==0" @click="toBuy(order.id)">去支付</button>
							<button v-if="order.is_pay==1" >确认收货</button>
							<button v-if="order.is_pay==2" @click="comment(order.id)" >去评价</button>
							<button v-if="order.is_pay!=0" @click="getExpress(order.id)">物流信息</button>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import Express from "./Express.vue"
	import Comment from "./Comment.vue"
	export default{
		created:function(){
			this.getOrders(this.$route.query.uri)
			// console.log(this.$route.query.uri)
		},
		//路由更新的时候
		beforeRouteUpdate:function(to,from,next){
			// console.log(to.query.uri)
			this.getOrders(to.query.uri)
			next()
		},
		data:function(){
			return{
				orders:''
			}
		},
		components:{
			Express,
			Comment
		},
		methods:{
			getOrders:function(order_type){
				if(order_type=='allOrder'){
					this.axios.get('http://192.168.249.1:3000/orders').then(res=>{
						this.orders = res.data
					})
				}
				if(order_type=='waitPay'){
					this.axios.get('http://192.168.249.1:3000/orders?is_pay=0').then(res=>{
						this.orders = res.data
					})
				}
				if(order_type=='waitRec'){
					this.axios.get('http://192.168.249.1:3000/orders?is_pay=1&is_pay=2').then(res=>{
						this.orders = res.data
					})
				}
			},
			//未付款的去支付
			toBuy:function(id){
				this.$router.push({'path':'/toPay','query':{'id':id}})
			},
			//查看物流信息
			getExpress:function(id){
				this.$layer.open({
				  type: 2,
				  title:'物流信息查询',
				  area: ['360px', '500px'],
				  skin: 'layui-layer-rim', //加上边框
				  content: {content:Express,data:{order:id}}
				});
			},
			//去评价
			comment:function(id){
				this.$layer.open({
				  type: 2,
				  title:'商品评价',
				  area: ['300px', '300px'],
				  skin: 'layui-layer-rim', //加上边框
				  content: {content:Comment,data:{order:id}}
				});
			}
		}
	}
</script>

<style scoped="scoped">
	.orders-list {
		position: relative;
	}
	
	.orders-list li{
		height: 16vh;
		border-bottom:1px solid #f0f0f0;
	}
	.order-left img{
		width: 25vw;
		position: absolute;
		padding:2vw;
	}
	.order-right{
		margin-left: 27vw;
		padding:2vw;
	}
	.order-right p{
		margin-top: 8px;
		color: #333;
		line-height: 1.36;
		overflow: hidden;
		text-overflow: ellipsis;
		height: 19px;
		font-size: 16px;
		font-weight: bold;
	}
	.order-right div{
		color: #e93b3d;
		font-size: 20px;
		font-weight: bold;
		padding-top: 3vw;
	}
	.orders-but button{
		float: right;
		height: 30px;
		background-color: #CC0000;
		color: #fff;
		border-radius: 10px;
		border-style: none;
	}
</style>
