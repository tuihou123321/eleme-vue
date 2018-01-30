<template>
  <div>
    <headerBox :title="title"></headerBox>
    <div class="main mt40" v-cloak>
      <div class="box p10" style="background:#3190e8;">
        <div class="bg-white bdrs5 p10">
          <div>当前积分<a href="detail.html" class="c-active fr"> <i class="fa fa-question-circle mr5 fz16"></i>积分说明</a></div>
          <div class="mt10">
            <span class="fz40 b green">0</span> <span class="fz16">元</span>
          </div>
          <button class="btn btn-default btn-block btn-success fz16" :class="{'btn-grey':balance==0.00}">积分兑换商品</button>
        </div>
      </div>

      <p class="grey fz10 p10">最近30天积分记录</p>
      <div class="lists bg-white grey">
        <ul v-for="item in transactionRecord">
          <li class="p10 bdb1 df jcb">
            <span>{{item.name}}</span>
            <span>{{item.time}}</span>
          </li>
        </ul>
      </div>
      <div class="tac mt40">
        <img src="/src/images/no-log.png" alt="" width="180">
        <p class="mt10 grey fz16">最近30天无积分记录</p>
      </div>

    </div>
  </div>
</template>

<script>
  import footerBox from "../components/footer.vue"
  import headerBox from "../components/header.vue"
  export default {
    name: 'app',
    data () {
      return {
        title:"我的积分",
        balance:0.00,
        transactionRecord:""
      }
    },
    components:{
      footerBox,
      headerBox
    },
    created:function(){
      var userId=localStorage.getItem("userId");
//            var userId=1;
      if(userId!="" && userId!=undefined){
        var _this=this;
        this.$http.post("json/balance.json",{"userId":userId},function(result){
          _this.balance=result.balance;
          _this.transactionRecord=result.transactionRecord;
        })
      }
    }
  }
</script>
<style>
  @import "../style/search.css";
</style>
