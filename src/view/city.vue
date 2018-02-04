<template>
  <div>
    <header class="header">
      <router-link to="search" class="header-left"><i aria-hidden="true" class="fa fa-chevron-left"></i></router-link>
      <div class="header-center" v-cloak>深圳</div>
      <router-link to="/" class="header-right fr">切换城市</router-link>
    </header>
    <div class="main mt40 mb50">
      <div class="top">
        <form  class="searhBox" method="post" onsubmit="return false">
          <div class="df">
            <input type="search" class="fx1 p5 mb10" placeholder="输入学校、商务楼、地址" v-model="keyword" :class="{'bd-active':keyword==''}" autocomplete="on" required>
          </div>
          <button class="btn btn-primary btn-block" @click="search(keyword)">提交</button>
        </form>
      </div>
      <div class="content" v-cloak>
        <div class="content-box1" v-show="!searchLists">
          <h4 class="title" v-show="searchHistory.length!=0">搜索历史</h4>
          <div class="bg-white">
            <ul>
              <li class="bdb1 p10" v-for="(item,index) in searchHistory" @click="search(item)">
                <router-link :to='"/home?geohash="+item.geohash'>
                  <p>{{item.name}}</p>
                  <p class="fz10 grey">{{item.address}}</p>
                </router-link>
              </li>
            </ul>
          </div>
          <p class="bg-white p10 grey tac fz16" v-show="searchHistory.length!=0" @click="empty()">
            清空所有
          </p>
        </div>

        <div class="bg-white">
          <ul v-show="searchLists">
            <li class="df bdb1 p10" v-for="(item,index) in searchLists" @click="nextPage(item,item.geohash)">
                <p>{{item.name}}</p>
                <p class="fz10 grey">{{item.address}}</p>
            </li>
          </ul>
          <div class="empty-box color-active text-center db" v-show="searchLists=='' && keyword">
            很抱歉！无搜索结果
          </div>
        </div>
      </div>
    </div>
    <footerBox :isActive="isActive"></footerBox>
  </div>
</template>

<script>
  import footerBox from "../components/footer.vue"


export default {
  name: 'app',
  data () {
    return {
      isActive:"search",
      keyword:"",
      searchHistory:[],  //搜索的历史记录，与localStorage保持一致
      searchLists:"",
      keywordTips:false
    }
  },
  methods:{
    nextPage:function(item,geohash){
      //没有才能添加
      if(!this.searchHistory.includes(item)){
        this.searchHistory.push(item);
        //存储的时候要先object对象转成json数据格式
        localStorage.setItem("searchHistory",JSON.stringify(this.searchHistory));
      }
      //路由跳转，push(path,query);  两个参数，第一个路径，第二个查询参数；
      //存储完成后再跳转
      this.$router.push({path:'/home', query:{geohash}})
    },
    empty:function(){
      this.searchHistory=[];
      localStorage.clear("history2");
    },
    remove:function(index){
      this.searchHistory.splice(index,1);
      localStorage.setItem("history2",JSON.stringify(this.searchHistory));
    },
    search:function(){
      if(this.keyword){
        var  _this=this;
        this.$http.get(baseUrl+"/v1/pois",{
          params: {
            type:"search", //附近
            city_id:"1",   //城市ID
            keyword:_this.keyword   //关键字
          }
        })
          .then(function (response) {
            console.log(response);
            _this.searchLists=response.data;
          })
          .catch(function (error) {
            console.log(error);
          });

      }
      else{
        this.searchLists="";
      }
    },
    open:function(item){
      //最多保存5条历史记录
      if(this.searchHistory.length>4){
        this.searchHistory.pop();
      }
      var one={
        name:item.name,
        address:item.address,
        geohash:item.geohash
      }
      this.searchHistory.unshift(one);
      console.log(this.searchHistory);
      localStorage.setItem("history2",JSON.stringify(this.searchHistory));
      location.href="home.html?geohash="+item.geohash;
    }
  },
  created:function(){
    var searchHistory=JSON.parse(localStorage.getItem("searchHistory"));
    if(searchHistory){
      this.searchHistory=searchHistory;
    }
  },
  components:{
      footerBox
  }
}
</script>
<style>
  .top {
    padding: 10px;
    background: #fff;
  }
  input[type=search]{
    border: 1px solid #ddd;
    background: #f2f2f2;
    color:#757575;
    font-size: 14px;
    text-indent: 6px;
    border-radius: 3px;
  }
  .title{
    padding: 10px;
  }
  .empty-box{
    padding: 8px;
    background: #fff;
    font-size: 14px;
    font-weight: 600;
  }
  .bd-active{
    outline-color: #faab20;
    background: #fff;
  }
  .tipsBox {
    position: absolute;
    top: 34px;
    background: #fff;
    padding: 10px 13px;
    border: 1px solid #ddd;
    border-radius: 4px;
    left: 30%;
  }
  .searhBox.flex {
    position: relative;
  }
</style>
