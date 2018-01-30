<template>
  <div id="box" class="bg-white">
    <headerBox :title="title"></headerBox>
    <div class="mt40">
      <div class="df tac bdb1">
        <a href="javascript:" class="fx1 tac p20 bdr1">
                    <span class="fz30 red">
                        <i class="fa fa-user-circle-o"></i>
                    </span>
          <p class="grey">在线客服</p>
        </a>
        <a href="javascript:" class="fx1 tac p20">
                    <span class="fz30 green">
                        <i class="fa fa-phone-square"></i>
                    </span>
          <p class="grey">在线客服</p>
        </a>
      </div>
      <div class="question">
        <div class="title p10 bdb1">
          <p class="pt10 pb10 fz16">
            热门问题
          </p>
        </div>
        <div class="lists">
          <template v-for="(item,key,index) in result">
            <a :href='"questionDetail.html?id="+index' class="df p10 grey jcb bdb1" v-if="key.indexOf('Caption')>0">
                            <span>
                                {{item}}
                            </span>
              <span>
                              <i class="fa fa-chevron-right"></i>
                          </span>
            </a>
          </template>
        </div>
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
        title:"服务中心",
        result:""
      }
    },
    components:{
      footerBox,
      headerBox
    },
    created:function(){
      var _this=this;
      this.$http.get("https://easy-mock.com/mock/5a6ee6924c02fb3139acf189/searchContent_copy/service").then(function(result){
        _this.result=result.data;
      }).catch(function(error){
          console.log(error);
      })
    }
  }
</script>
<style>
  @import "../style/search.css";
</style>
