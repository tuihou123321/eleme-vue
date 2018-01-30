<template>
  <div>
    <header class="header">
      <a href="search.html" class="header-left">ele.me</a>
      <div class="header-center"></div>
      <a href="index.html" class="header-right fr"><i class="fa fa-user-o" aria-hidden="true"></i></a>
    </header>
    <div class="main mt40">
      <div class="top">
        <div class="jcb bdb1 df p10 bg-white">
          <span>当前定位城市</span>
          <span class="color-gray">定位不准时，请在城市列表中选择</span>
        </div>

        <router-link :to="'/city/'+address.pinyin" class="bdb1 p10 df jcb bg-white">
          <span class="fz18 c-active" v-cloak>{{address.name}}</span>
          <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </router-link>
      </div>
      <div class="city-wrap city-hot">
        <div class="content-title">
          热门城市
        </div>
        <div class="content" v-cloak>
          <template  v-for="(item,index) in cityHot" >
            <router-link  :to='"/city/"+item.pinyin' data-area_code="item.area_code" @click="city(item)" class="col-xs-3 c-active">{{item.name}} </router-link>
          </template>
        </div>
      </div>
      <div class="city-wrap city-group">
        <div class="city-group-one" v-for="(item,index) in cityGroup" v-cloak>
          <div class="content-title">
            {{softRule[index]}}<span v-show="index=='A'" class="fz10 color-grey">(按字母排序)</span>
          </div>
          <div class="content">
            <template v-for="(item2,index2) in item">
              <router-link :to='"/city/"+item2.pinyin' data-area_code="item2.area_code" class="col-xs-3 ellipsis">{{item2.name}} </router-link>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        cityHot:"11",
        cityGroup:[],
        softRule:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
      }
    },
    computed:{
      address:function(){
        return  {
          "pinyin": "shanghai",
          "is_map": true,
          "longitude": 121.473701,
          "latitude": 31.23037,
          "sort": 1,
          "area_code": "021",
          "abbr": "SH",
          "name": "上海",
          "id": 1
        }
      }
    },
    created:function(){
      var _this=this;
      this.$http.get(baseUrl+'/v1/cities?type=hot',{
      }).then(function(res){
          _this.cityHot=res.data;
      },function(res){
        console.log(res.status);
      })

//    this.$http.get('http://cangdu.org:8001/v1/cities?type=group',{
//    }).then(function(res){
//      var a=res.data;
//      for(var i=0;i<_this.softRule.length;i++){
//        var one=a[_this.softRule[i]];
//        _this.cityGroup.push(one);
//      }
//    },function(){
//      console.log("请求失败");
//    })

    }
  }
</script>
<style>
@import "../style/common.css";
@import "../style/index.css";
</style>
