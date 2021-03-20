<template>
	<div>
		<Header>鍟嗗搧鍒楄〃</Header>
		<div class="clear"></div>
		<div class="goods-list">
			<ul>
				<li @click="goodsDetail(goods.id)" v-for="(goods,index) in goodsList" :key="index">
					<div class="goods-left">
						<img :src="goods.goods_url" alt="">
					</div>
					<div class="goods-right">
						<p>{{goods.goods_name}}</p>
						<div>
							    &yen{{goods.goods_price}}
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import Header from "../components/Header.vue"
	export default{
		created:function(){
			this.axios.get('http://192.168.249.1:3000/indexGoods').then(res=>{
				this.goodsList = res.data
			})
		},
		components:{
			Header
		},
		data:function(){
			return{
				goodsList:[]
			}
		},
		methods:{
			//点击商品，进入商品详情页
			goodsDetail:function(id){
				this.$router.push('/goodsDetail'+id)
			}
		}
	}
</script>

<style>
	.clear{
		clear: both;
	}
	.goods-list {
		position: relative;
	}
	.goods-left img{
		width: 25vw;
		position: absolute;
		padding:2vw;
	}
	.goods-list li{
		height: 16vh;
	}
	.goods-right{
		margin-left: 27vw;
		padding:2vw;
	}
	.goods-right p{
		margin-top: 8px;
		color: #333;
		line-height: 1.36;
		overflow: hidden;
		text-overflow: ellipsis;
		height: 19px;
		font-size: 16px;
		font-weight: bold;
	}
	.goods-right div{
		color: #e93b3d;
		font-size: 20px;
		font-weight: bold;
		padding-top: 3vw;
	}
</style>
