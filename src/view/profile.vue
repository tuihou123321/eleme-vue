<template>
  <div>
    <headerBox :title="title"></headerBox>
    <section class="main" v-cloak>
      <div class="profile">
        <router-link :to="url" class="db">
          <div class="profile-phone white">
            <div class="img-user fz30 bg-white ovf" v-if="!user.avatar">
              <i class="fa fa-user mt15" style="color:#dcdcdc;"></i>
            </div>
            <img :src="user.avatar" alt="" class="img-user"  v-else>
            <div class="profile-phone-center">
              <b class="fz18 b white" v-if="!user.username">登录/注册</b>
              <b class="fz18 white" v-else>{{user.username}}</b>
              <div class="fz16">
                <i class="fa fa-phone"></i>
                <span v-if="!user.mobile">暂无绑定手机号</span>
                <span v-else>{{user.mobile}}</span>
              </div>
            </div>
            <span class="fz12">
                <i class="fa fa-chevron-right"></i>
            </span>
          </div>
        </router-link>
        <div class="profile-data mb10 tac">
          <router-link to="/balance/" class="profile-data-item">
            <span class="fz26 orange b" v-if="!user.balance">0.00</span>
            <span class="fz26 orange b" v-else>{{user.balance | money}}</span>
            元
            <p class="grey">我的余额</p>
          </router-link>
          <router-link to="/benefit/" class="profile-data-item">
            <span class="fz26 red b" v-if="!user.gift_amount">0</span>
            <span class="fz26 red b" v-else>{{user.gift_amount}}</span>
            个
            <p class="grey">我的优惠</p>
          </router-link>
          <router-link to="/integral/" class="profile-data-item">
            <span class="fz26 green b" v-if="!user.point">0</span>
            <span class="fz26 green b" v-else>{{user.point}}</span>
            分
            <p class="grey">我的积分</p>
          </router-link>
        </div>
        <div class="lists">
          <router-link to="/order/" class="item">
            <aside class="color-grey"><i class="fa fa-file-text-o"></i></aside>
            <div class="myorder-box bdb1">
              <span>我的订单</span>
              <span class="mr10 color-grey fz10">
                        <i class="fa fa-chevron-right"></i>
                    </span>
            </div>
          </router-link>
          <a href="https://home.m.duiba.com.cn/#/chome/index" class="item">
            <aside class="color-red"><i class="fa fa-shopping-bag"></i></aside>
            <div class="myorder-box bdb1">
              <span>积分商城</span>
              <span class="mr10 color-grey fz10">
                        <i class="fa fa-chevron-right"></i>
                    </span>
            </div>
          </a>
          <router-link to="/vipcard/" class="item mb10">
            <aside class="color-yellow"><i class="fa fa-drivers-license-o"></i></aside>
            <div class="myorder-box bdb1">
              <span>饿了么会员卡</span>
              <span class="mr10 color-grey fz10">
                        <i class="fa fa-chevron-right"></i>
                    </span>
            </div>
          </router-link>
          <router-link to="/service/" class="item">
            <aside class="color-blue"><i class="fa fa-square"></i></aside>
            <div class="myorder-box bdb1">
              <span>服务中心</span>
              <span class="mr10 color-grey fz10">
                        <i class="fa fa-chevron-right"></i>
                    </span>
            </div>
          </router-link>
          <router-link to="/download/" class="item">
            <aside class="color-blue"><i class="fa fa-cloud-download"></i></aside>
            <div class="myorder-box bdb1">
              <span>下载饿了么APP</span>
              <span class="mr10 color-grey fz10">
                        <i class="fa fa-chevron-right"></i>
                    </span>
            </div>
          </router-link>
        </div>
      </div>
    </section>
    <footerBox :isActive="isActive"></footerBox>
  </div>
</template>

<script>
  import footerBox from "../components/footer.vue"
  import headerBox from "../components/header.vue"
export default {
  name: 'app',
  data () {
    return {
      title:"我的",
      isActive:"profile",
      user:"",
      url:"/login/"
    }
  },
  components:{
      footerBox,
      headerBox
  },
  created:function(){
    var _this=this;
    var userId=localStorage.getItem("userId");
    if(userId){
      this.$http.get("/src/json/user.json",{
        params:
          {
            userId:userId
          }
      })
      .then(function(result){
        _this.user=result.data;
      })
    }
  },
  filters: {
    money: function (value) {
      value=value+"";
      if(value.indexOf(".")<0){
        return value+".00"
      }
      else{
        var b=value.split(".")[1];
        if(b.length==1){
          return value+"0";
        }
        else if(b.length==2){
          return value;
        }
        else{
          return value.split(".")[0]+ "."+b.slice(0,2);
        }
      }
    }
  }
}
</script>
<style>
  @import "../style/profile.css";
</style>
