<template>
	<div class="addr">
		<div>
			<label>姓名:</label><input v-model="name" type="text" placeholder="收件人姓名">
		</div>
		<div>
			<label>电话号码:</label><input v-model="mobile" type="text" placeholder="收件人号码">
		</div>
		<div>
			<label>选择区域 </label>:<input type="text" @click="choose" :value="address"   />
			 <address class="address" v-if="show">
			 <v-distpicker type="mobile" @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
			</address>  
		</div>
		<div>
			<label>详细地址:</label><input v-model="street" type="text" placeholder="详细地址街道门牌号">
		</div>
		<div>
			<button @click="saveAddr">保存收件地址</button>
		</div>
	</div>
</template>

<script>
	// 引入地区三级联动
	import VDistpicker from 'v-distpicker'
	export default {
		data:function(){
			return{
				address:'',
				show:'false',
				name:'',
				mobile:'',
				street:''
			}
		},
	    components: {
		  VDistpicker
		},
		methods:{
			choose(){
			     this.show=!this.show
			 },
			 onChangeProvince(a){
			    this.address=a.value        
			 },
			 onChangeCity(a){
			     this.address +='  '+a.value
			 },
			 onChangeArea(a){
			    this.address +='  '+a.value 
			     this.show=false
			 },
			 //保存用户地址
			 saveAddr:function(){
				 //token，区分用户身份
				 let token = localStorage.getItem('token')
				 let data = this.qs.stringify({
					 name:this.name,
					 mobile:this.mobile,
					 address:this.address + this.street,
					 token:token
				 })
				 // console.log(data)
				 this.axios.post('http://192.168.249.1:3000/saveAddr',data).then(res=>{
					 //模拟接口返回的数据
					 let ret = {
						 "status":"success",
						 "msg":"添加地址成功"
					 }
					 //成功
					 if(ret.status=="success"){
						 //弹窗提示
						 let layerid = this.$layer.msg(ret.msg,()=>{
							  this.$router.push('/user/addr')
							  //关闭提示
							  this.$layer.close(layerid)
						 })
					 }
				 })
			 }
		}
	}
</script>

<style scoped="scoped">
	.addr>div{
		padding: 5vw;
	}
	.addr input{
		border: none;
		height: 10vw;
		outline: none;
		width: 80%;
	}
	button{
		width: 90%;
		margin-left: 5%;
		height: 14vw;
		background-image: linear-gradient(90deg,#fab3b3,#ffbcb3 73%,#ffcaba);
		color: #fff;
		border-radius: 7vw;
		outline: none;
		border-style: none;
		margin-top: 10vw;
	}
	.address{
	    height: 400px;
	    overflow-y: auto;
	    position: fixed;
	    left: 0;
	    bottom: 0;
	    width: 100%;
	    }
	.address>>>.distpicker-address-wrapper{
	    color: #999;
	}
	.address>>>.address-header{
	    position: fixed;
	    bottom: 400px;
	    width: 100%;
	    background: #000;
	    color:#fff;
		background: #CC0000 ;
	}
	.address>>>.address-header ul li{
	    flex-grow: 1;
	    text-align: center;
	}
	.address>>>.address-header .active{
	    color: #fff;
	    border-bottom:#FFFFFF solid 8px
	}
	.address>>>.address-container .active{
	    color: #000;
	}
	
</style>
