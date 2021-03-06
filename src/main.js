import Vue from 'vue'
import App from './App.vue'
import router from './router/router'   //注意这里引入的router只能这么写；
import store from './store/store'
import Axios from "axios"
import infiniteScroll from "vue-infinite-scroll"
Vue.prototype.$http=Axios
Vue.use(infiniteScroll)



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
