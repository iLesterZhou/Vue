<template>
	<div class="index-nav">
		<ul>
			<router-link tag="li" to="/">
				<img src="../assets/img/icon/icon-index.png" />
			</router-link>
			<router-link tag="li" to="/cat">
				<img src="../assets/img/icon/icon-cat.png" />
			</router-link>
			<router-link tag="li" to="/cart">
				<img src="../assets/img/icon/icon-cart.png" />
			</router-link>
			<router-link tag="li" to="/user/AllOrder">
				<img src="../assets/img/icon/icon-user.png" />
			</router-link>
		</ul>
	</div>
</template>

<script>
</script>

<style scoped="scoped">
	.router-link-exact-active{
		background-color: #f2270c;
	}
	.index-nav{
		width: 100%;
		text-align: center;
	    position: fixed;
		bottom: 0;
		background-color: #fff;
	}
	.index-nav li{
		float: left;
		width: 25%;
	}
	.index-nav li img{
		width: 25vw;
	}
	
	
</style>
