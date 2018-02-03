/**
 * Created by Administrator on 2018/1/29.
 */
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

var store=new Vuex.Store({
  state:{
    msg:"hello world",
    geohash:[31.22709,121.48097]
  },
  getters:{},
  mutations:{
    changeGeohash:function(state,data){
        state.geohash=state;
    }
  },
  actions:{}
})

export default store;
