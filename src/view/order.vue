<template>
  <div>
      <div id="box">
        <div class="img-loading" v-show="imgLoading" :style="{backgroundPositionY:positionY}"></div>
        <headerBox :title="title"></headerBox>
        <div class="main mt40">
          <div class="bg-white" v-if="lists && userId">
            <a href="javascript:" class="bdb1 p10  df jcb" v-for="item in lists">
              <span>{{item.name}}</span>
              <span>{{item.time}}</span>
            </a>
          </div>
          <div class="tac mt100" v-if="!lists && userId">
            <img src="/src/images/empty.gif" alt="" width="200" class="mb20">
            <p class="fz16 mb10">近三个月无外卖订单记录</p>
            <a href="javascript:" @click="searchOldOrder()">
              <p class="fz10 grey">查看三个月前的外卖订单 <i class="fa fa-chevron-circle-down"></i></p>
            </a>
          </div>
          <div class="tac mt100" v-if="!userId">
            <img src="/src/images/empty.gif" alt="" width="200" class="mb20">
            <p class="fz16 mb10">登录后查看外卖订单</p>
            <router-link to="/login/" class="btn btn-success">立即登录</router-link>
          </div>
        </div>
      <footerBox :isActive="isActive"></footerBox>
    </div>
  </div>
</template>
<script>
  import $ from "jquery"
  import footerBox from "../components/footer.vue"
  import headerBox from "../components/header.vue"
export default {
  name: 'app',
  data () {
    return {
      title:"订单",
      isActive: 'order',
      imgLoading:true,
      positionY:0,
      lists:"",
      userId:""
    }
  },
  methods:{
    lists2:function(){
      var _this=this;
      if(this.userId){
          this.$http.get("/src/json/order.json",{
            params:{userId:_this.userId}
          }).then(function(result){
            _this.lists=result.data;
          }).catch(function(err){
            console.log(err);
          })
      }
    }
  },
  components:{
      footerBox,
      headerBox
  },
  computed:{
  },
  created:function(){
    var userId=localStorage.getItem("userId");
    if(userId){
      this.userId=userId;
      this.lists2();
    }
  },
  beforeCreate:function(){
    var _this=this;
    var i=0;
    var timer=setInterval(function(){
      if(i>5){
        i--;
      }
      else{
        i++;
      }
      _this.positionY=-70*i+"px";
    },1000);
    setTimeout(function(){
      _this.imgLoading=false;
    },3000)
  }
}
</script>
<style>
</style>
