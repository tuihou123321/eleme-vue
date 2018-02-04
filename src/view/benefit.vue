<template>
  <div>
    <headerBox :title="title"></headerBox>
    <div class="main mt40">
      <div class="nav p10 df jcc bg-white fz16">
        <a  href="javascript:" class="mr60" :class="{navActive:show}" @click="change()">红包</a>
        <a href="javascript:" :class="{navActive:!show}" @click="change()">商家代金券</a>
      </div>
      <div class="p10" v-if="show">
        <div class="mb10">
          有{{result.length}}个红包即将到期
          <a href="javascript:" class="fr c-active fz10"> <i class="fa fa-question-circle"></i> 红包说明</a>
        </div>
        <ul v-cloak>
          <li class="df bg-white mb10 bdrs5 p10 jcb" v-for="item in result">
            <div class="bdr1 pr10">
              <div class="red fz18" style="line-height: 0.9;">￥{{item.amount}}</div>
              <div class="fz10 grey">{{item.description_map.sum_condition}}</div>
            </div>
            <div style="margin-left: -24px;">
              <p>分享红包</p>
              <p class="fz10 grey">
                {{item.description_map.validity_periods}} <br>
                {{item.description_map.phone}}
              </p>
            </div>
            <span class="red">
                        {{item.description_map.validity_delta}}
                    </span>
          </li>
        </ul>
      </div>
      <div v-if="!show">
        <p>商家页面</p>
      </div>
    </div>
    <!--<footerBox :isActive="isActive"></footerBox>-->
  </div>
</template>

<script>
  import footerBox from "../components/footer.vue"
  import headerBox from "../components/header.vue"
  export default {
    name: 'app',
    data () {
      return {
        title:"账户信息",
        result:"",
        show:true
      }
    },
    components:{
      footerBox,
      headerBox
    },
    methods:{
      change:function(){
        this.show=!this.show;
      }
    },
    created:function(){
      var _this=this;
      var userId=localStorage.getItem("userId");
      if(userId!="" && userId!=undefined){
        this.$http.post("json/benefit.json",{"userId":userId},function(result){
          _this.result=result;
        });
      }
    }
  }
</script>
<style>
  @import "../style/search.css";
</style>
