/**
 * Created by Administrator on 2018/1/29.
 */
import Vue from "vue"
import Router from "vue-router"
Vue.use(Router);

import index from "../view/index.vue"
import home from "../view/home.vue"
import city from "../view/city.vue"
import search from "../view/search.vue"
import order from "../view/order.vue"
import profile from "../view/profile.vue"
import address from "../view/address.vue"
import benefit from "../view/benefit.vue"
import download from "../view/download.vue"
import forget from "../view/forget.vue"
import info from "../view/info.vue"
import integral from "../view/integral.vue"
import invoiceRecord from "../view/invoiceRecord.vue"
import login from "../view/login.vue"
import payment from "../view/payment.vue"
import questionDetail from "../view/questionDetail.vue"
import service from "../view/service.vue"
import setUsername from "../view/setUsername.vue"
import useCart from "../view/useCart.vue"
import vipcard from "../view/vipcard.vue"
import vipDescription from "../view/vipDescription.vue"




var router=new Router({
    routes:[
      {
        path:"/",
        component:index
      },
        {
          path:"/city/:cityId",
          component:city
        },
      {
        path:"/search",
        component:search
      },
      {
        path:"/order",
        component:order
      },
      {
        path:"/profile",
        component:profile
      },
      {
        path:"/address",
        component:address
      },
      {
        path:"/benefit",
        component:benefit
      },
      {
        path:"/download",
        component:download
      },
      {
        path:"/forget",
        component:forget
      },
      {
        path:"/info",
        component:info
      },
      {
        path:"/integral",
        component:integral
      },
      {
        path:"/invoiceRecord",
        component:invoiceRecord
      },
      {
        path:"/login",
        component:login
      },
      {
        path:"/payment",
        component:payment
      },
      {
        path:"/questionDetail",
        component:questionDetail
      },
      {
        path:"/service",
        component:service
      },
      {
        path:"/setUsername",
        component:setUsername
      },
      {
        path:"/useCart",
        component:useCart
      },
      {
        path:"/vipcard",
        component:vipcard
      },
      {
        path:"/vipDescription",
        component:vipDescription
      },
        {
          path:"/home",
          component:home
        }
    ]
})


export default router;
