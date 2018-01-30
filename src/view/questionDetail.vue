<template>
  <div>
    <headerBox :title="title"></headerBox>
    <div class="mt40">
      <p class="p15">
        {{content}}
      </p>
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
        title:"搜索",
        "content":""
      }
    },
    computed:{
      result:function(){
        var _this=this;
        function getResult(url){
          var a;
          $.ajax({
            url:url,
            data:{},
            async:false, //此处ajax请求只能用同步，否则就会出问题
            success:function(data){
              a = data;
            }
          });
          return a;
        }
        return getResult("json/service.json");
      }
    },
    components:{
      footerBox,
      headerBox
    }
  }
</script>
<style>
  @import "../style/search.css";
</style>
