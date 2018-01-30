<template>
  <div>
    <headerBox :title="title"></headerBox>
    <div class="main mt40">
      <h4 class="p10">为账户17855556666购买会员</h4>
      <section class="vip-prerogative bgw bg-white mb10">
        <router-link to="/vipDescription/" class="df jcb bdb1 p10 pl0 ml10">
          <span class="fz16">会员特权</span>
          <span class="grey fz10">会员说明  <i class="fa fa-chevron-right"></i></span>
        </router-link>
        <ul class="ml10">
          <li class="df p10 pl0 bdb1">
            <img src="/src/images/sheng.jpeg" alt="" width="32" height="36">
            <div class="prerogative-list-text flex1 ml10 fz16">
              减免配送费
              <p class="grey fz10">
                每月减免30单，每日可减免3单，每单最高减4元<br>蜂鸟专送专享
              </p>
            </div>
          </li>
          <li class="df p10 pl0">
            <img src="/src/images/sheng.jpeg" alt="" width="32" height="36">
            <div class="prerogative-list-text flex1 ml10 fz16">
              减免配送费
              <p class="grey fz10">
                每月减免30单，每日可减免3单，每单最高减4元<br>蜂鸟专送专享
              </p>
            </div>
          </li>
        </ul>
      </section>
      <section class="vip-apply bgw bg-white mb10">
        <div class="df jcb bdb1 p10 pl0 ml10">
          <span class="fz16">开通会员</span>
        </div>
        <ul>
          <li class="p10 df jcb aic">
                    <span class="fz16">
                        1个月 <em class="orange b">￥20元</em>
                    </span>
            <router-link to="/payment/" class="btn btn-default fz16 btn-orange">购买</router-link>
          </li>
        </ul>
      </section>


      <router-link to="/useCart/" class="df jcb bdb1 p10  mb10 bg-white">
        <span class="fz16">兑换会员</span>
        <span class="grey fz10">使用卡号卡密  <i class="fa fa-chevron-right"></i></span>
      </router-link>


      <router-link to="/invoiceRecord/" class="df jcb bdb1 p10  bg-white">
        <span class="fz16">购买记录</span>
        <span class="grey fz10">开发票  <i class="fa fa-chevron-right"></i></span>
      </router-link>

    </div>
  </div>
</template>

<script>
  import headerBox from "../components/header.vue"
  export default {
    name: 'app',
    data () {
      return {
        title:"会员中心"
      }
    },
    components:{
      headerBox
    }
  }
</script>
<style>
  .btn-orange{
    border-color:#ff9a0d;
    color:#ff9a0d;
    padding: 3px 12px;
  }
  .btn-orange:hover:active{
    background: #ff9a0d;
    color:#fff;
    border: #ff9a0d;
  }
  .btn-orange:hover{
    border-color:#ff9a0d;
    color:#ff9a0d;
    padding: 3px 12px;
    background: transparent;
  }

</style>
