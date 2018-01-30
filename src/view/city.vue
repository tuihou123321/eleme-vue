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
                <router-link :to='"home/geohash="+item.geohash'>
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
            <li class="df bdb1 p10" v-for="(item,index) in searchLists">
              <router-link to="javascript:" class="fx1" @click="open(item)">
                <p>{{item.name}}</p>
                <p class="fz10 grey">{{item.address}}</p>
              </router-link>
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
      searchHistory:[],
      searchLists:"",
      keywordTips:false
    }
  },
  methods:{
    empty:function(){
      this.searchHistory=[];
      localStorage.clear("history2");
    },
    remove:function(index){
      this.searchHistory.splice(index,1);
      localStorage.setItem("history2",JSON.stringify(this.searchHistory));
    },
    search:function(){
      //https://www.ele.me/restapi/v2/pois?extras%5B%5D=count&geohash=ws105rz9smwm&keyword=a&limit=20&type=nearby
      if(this.keyword){
        this.$http.post("https://www.ele.me/restapi/v2/pois",{
          keyword:this.keyword,   //关键字
          geohash:"ws105rz9smwm",   //城市,
          limit:10,  //限制条数
          type:"nearby" //附近
        }).then(function(res){
          this.searchLists=res.data;
        },function(res){
          console.log(res.status);
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
    var history2=JSON.parse(localStorage.getItem("history2"));
    if(history2){
      this.searchHistory=history2;
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
