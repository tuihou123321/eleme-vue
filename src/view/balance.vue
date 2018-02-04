<template>
  <div>
    <headerBox :title="title"></headerBox>
    <div>
      <div class="main mt40" v-cloak>
        <div class="box p10" style="background:#3190e8;">
          <div class="bg-white bdrs5 p10">
            <div>当前余额 <router-link to="detail" class="c-active fr"> <i class="fa fa-question-circle mr5 fz16"></i>余额说明</router-link></div>
            <div class="mt10">
              <span class="fz40 b">0.00</span> <span class="fz16">元</span>
            </div>
            <button class="btn btn-default btn-block btn-success fz16" :class="{'btn-grey':balance==0.00}">提现</button>
          </div>
        </div>
        <p class="grey fz10 p10">交易明细</p>
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
          <p class="mt10 grey fz16">暂无明细记录</p>
        </div>
      </div>
    </div>
    <transition name="router-slider" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import headerBox from "../components/header.vue"
  export default {
    name: 'app',
    data () {
      return {
        title:"我的余额"
      }
    },
    components:{
      headerBox
    }
  }
</script>
<style>
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
</style>
