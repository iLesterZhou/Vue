import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Cat from '../views/Cat.vue'
import Cart from '../views/Cart.vue'
import User from '../views/User.vue'
import Login from '../views/Login.vue'
import AllOrder from '../components/AllOrder.vue'
import WaitPay from '../components/WaitPay.vue'
import WaitRec from '../components/WaitRec.vue'
import Addr from '../components/Addr.vue'
import AddAddr from '../views/AddAddr.vue'
import GoodsDetail from '../views/GoodsDetail.vue'
import SubCat from "../components/SubCat.vue"
import GoodsList from "../views/GoodsList.vue"
Vue.use(VueRouter)

const routes = [
  {
	  path:"/",
	  component:Index,
	  meta:{
		  isTab:true
	  }
  },
  {
  	  path:"/cat",
  	  component:Cat,
	  redirect:'/cat/subCat',
	  meta:{
	  		  isTab:true
	  },
	  // 商品分类子分类
	  children:[
		  {
			  path:"subCat",
			  component:SubCat,
			  meta:{
					  isTab:true
			  }
		  }
	  ]
  },
  {
  	  path:"/cart",
  	  component:Cart,
	 
  },
  {
  	  path:"/user",
  	  component:User,
	  meta:{
	  		  isTab:true
	  },
	  //嵌套路由
	  children:[
		  {
			path:"allOrder",
			component:AllOrder,
			meta:{
					  isTab:true
			},  
		  },
		  {
		  	path:"waitPay",
		  	component:WaitPay,
		  	meta:{
		  			  isTab:true
		  	},  
		  },
		  {
		  	path:"waitRec",
		  	component:WaitRec,
		  	meta:{
					  isTab:true
		  	},  
		  },
		  {
			path:"addr",
			component:Addr,
			meta:{
					  isTab:true
			},  
		  },
	  ]
  },
  {
  	  path:"/login",
  	  component:Login,
  },
  //商品详情页面
  {
	  path:"/goodsDetail:id",
	  component:GoodsDetail
  },
  // 添加收货地址页面
  {
  	  path:"/user/addAddr",
  	  component:AddAddr,
  },
  {
  	  path:"/goodsList/:id",
  	  component:GoodsList,
  }
]

const router = new VueRouter({
  routes
})

export default router
