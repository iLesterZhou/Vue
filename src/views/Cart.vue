<template>
	<div>
		<Header>购物车</Header>
		<div class="clear"></div>
		<div class="cart">
			<ul>
				<li>
					<div class="radio">
						<input type="radio">
					</div>
					<div class="goods-img"><img src="//img10.360buyimg.com/mobilecms/s234x234_jfs/t1/145397/4/3578/174390/5f17e9a1E6b2e04ac/f2f2f09aac033e78.jpg!q70.dpg.webp" alt=""></div>
					<div class="goods-info">
						<p>
            古田森牛仔裤女2021春秋薄款黑色修身显瘦十分小脚铅笔裤202006 黑色 27码 (2尺)
        </p>
						<strong>169</strong>
						<div class="cartNum">
							<span>-</span>
							<input type="text" name="" id="">
							<span>+</span>
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
		components:{
			Header
		}
	}
</script>

<style>
	.clear{
		clear: both;
	}
	.cart{
		position: relative;
	}
	.cart li{
		height: 20vh;
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
		height: 6vh;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
