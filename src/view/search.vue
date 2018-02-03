<template>
  <div>
    <div>
      <headerBox :title="title"></headerBox>
      <div class="main mt40">
        <div class="top">
          <form  class="searhBox df" method="post" onsubmit="return false">
            <input type="search" class="fx1 mr5" placeholder="请输入商家或美食名称" v-model="keyword" :class="{'bd-active':keyword==''}" autocomplete="on" required @keyup="keyupFun" @click="resetFun">
            <button class="btn btn-primary" @click="search(keyword)">提交</button>
          </form>
        </div>
        <div class="content" v-cloak>
          <div class="content-box1" v-show="!searchLists && !keywordTips">
            <h4 class="title" v-show="searchHistory.length!=0">搜索历史</h4>
            <div class="bg-white">
              <ul>
                <li class="df bdb1 p10" v-for="(item,index) in searchHistory">
                  <a href="javascript:"  @click="search(item)" class="fx1">{{item}}</a>
                  <a href="javascript:"  @click="remove(index)"><i class="fa fa-close"></i></a>
                </li>
              </ul>
            </div>
            <a  href="javascript:" class="empty-box color-active text-center db" v-show="searchHistory.length!=0" @click="empty()">
              清空搜索历史
            </a>
          </div>

        <div class="content-box1" v-show="searchLists.length==0 && keywordTips">
          <div class="empty-box color-active text-center db">
            很抱歉！无搜索结果
          </div>
        </div>


          <div v-show="searchLists">
            <h4 class="title" >商家</h4>
            <div class="bg-white">
              <ul>
                <router-link tag="li" to="#"  class="df p10 pr0 pb20 bdb1" v-for="item in searchLists">
                    <div class="pr10">
                      <img  :src="imgBaseUrl+item.image_path" alt="" style="width: 40px;height: 40px;">
                    </div>
                    <div class="fx1">
                      <p>{{item.name}}
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="24" height="14" class="pay_icon">
                                    <polygon points="0,14 4,0 24,0 20,14" style="fill:none;stroke:#FF6000;stroke-width:1" />
                                    <line x1="1.5" y1="12" x2="20" y2="12" style="stroke:#FF6000;stroke-width:1.5"/>
                                    <text x="3.5" y="9" style="fill:#FF6000;font-size:9;font-weight:bold;">支付</text>
                           </svg>
                        </span>
                      </p>
                      <p>月售{{item.recent_order_num}}单</p>
                      <p class="bdb1 pb5">{{item.float_minimum_order_amount}}元起送/距离{{item.distance}}</p>
                    </div>
                </router-link>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
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
        title:"搜索",
        isActive:"search",
        keyword:"",
        searchHistory:[],
        searchLists:"",
        keywordTips:false,
        imgBaseUrl:imgBaseUrl
      }
    },
    methods:{
      resetFun:function(){
          var _this=this;
          setTimeout(function(){
              if(_this.keyword==""){
                  _this.keywordTips=false;
              }
          },100)
      },
      keyupFun:function(){
          if(!this.keyword){
              this.keywordTips=false;
          }
      },
      empty:function(){
        this.searchHistory=[];
        localStorage.clear();
      },
      remove:function(index){
        this.searchHistory.splice(index,1);
        localStorage.setItem("history",JSON.stringify(this.searchHistory));
      },
      search:function(kw){
        this.keyword=kw;
        if(kw){
          //先判断是否重复，如果重复就不添加历史记录里面
          if(this.searchHistory.indexOf(kw)<0){
            //本地存储
            var len= this.searchHistory.length;
            if(len>4){
              this.searchHistory.pop();
            }
            this.searchHistory.unshift(kw);
            localStorage.setItem("history",JSON.stringify(this.searchHistory));
          }

          this.get();
          this.keywordTips=true;
        }
      },
      //搜索"大"字有返回结果
      get:function(){
        console.log(89);
        var _this=this;
        this.$http.get(baseUrl+"/v4/restaurants",{
            params:{
              keyword:_this.keyword,   //关键字
              geohash:_this.geohash.join(),   //城市
              //extras[]:"restaurant_activity",  //限制条数
              type:"search" //
            }
        }).then(function(res){
          _this.searchLists=res.data;
        },function(res){
          console.log(res);
        });
      }
    },
    computed:{
      geohash:function(){
        if(this.$route.query.geohash){
          var arr=this.$route.query.geohash.split(",");
          this.$store.commit("changeGeohash",arr);
          return arr
        }
        else{
          //如果没有传地区IP过来，就调用默认的IP
          return this.$store.state.geohash;
        }
      }
    },
    created:function(){
      var history=JSON.parse(localStorage.getItem("history"));
      if(history){
        this.searchHistory=history;
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
