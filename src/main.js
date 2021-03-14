import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import layer from 'vue-layer'
import 'vue-layer/lib/vue-layer.css';

// 全局注册
Vue.prototype.axios = axios
Vue.prototype.qs = qs
Vue.prototype.$layer = layer(Vue);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
