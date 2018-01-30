/**
 * Created by Administrator on 2018/1/29.
 */
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

var store=new Vuex.Store({
  state:{
    msg:"hello world"
  },
  getters:{},
  mutations:{},
  actions:{}
})

export default store;
