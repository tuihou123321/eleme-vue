<template>
  <div>
    <div>
      <div class="img-loading" v-show="imgLoading" :style="{backgroundPositionY:positionY}"></div>
      <header class="header">
        <router-link to="/search/" class="header-left"><i aria-hidden="true" class="fa fa-search"></i></router-link>
        <router-link to="/" class="header-center ellipsis" style="width: 180px;">南山科技园金融基地大厦</router-link>
        <router-link to="/profile/" class="header-right fr" v-if="login"><i aria-hidden="true" class="fa fa-user-o"></i></router-link>
        <router-link to="/login/" class="header-right fr fz14" v-else>登录/注册</router-link>
      </header>

      <div class="goTop fz50 grey fix op8" style="right:30px;bottom:70px;" @click="goTop()" v-show="toTopIcon">
        <i  class="fa fa-arrow-circle-o-up"></i>
      </div>

      <div class="banner bdb1" style="padding-top: 50px;">
        <div class="swiper-container">
          <div class="swiper-wrapper">

            <div class="swiper-slide" v-for="item in filteredItems">
                <div class="row">
                  <a href="javascript:" class="col-xs-3"  v-for="item2 in item">
                    <img :src='"https://fuss10.elemecdn.com/"+item2.image_url' alt="">
                    <figcaption>{{item2.title}}</figcaption>
                  </a>
                </div>
            </div>

          </div>
          <div class="pagination"></div>
        </div>
      </div>

      <div class="container">
        <h5 class="title">
          <i class="fa fa-university"></i>
          附近商家
        </h5>
        <div class="items" v-cloak>
          <div class="item" v-for="item in restaurants">
            <div class="item-left">
              <img :src='"http://images.cangdu.org/"+item.image_path' alt="" class="img-shop">
            </div>
            <div class="item-right">
              <h4 class="item-right-1">
                <span class="seller-tab">品牌</span> <span>{{item.name}}</span>
                <div class="item-right-1-right fr">
                  <ul>
                    <li class="supports" v-for="item2 in item.supports">{{item2.icon_name}}</li>
                  </ul>
                </div>
              </h4>
              <div class="item-right-2">
                <div class="starBox">
                            <span class="grey">
                                <i class="fa fa-star" v-for="n in 5"></i>
                            </span>
                  <span style="color:#ff9a0d;">
                                <i class="fa fa-star" v-for="n in starFun(item,0)"></i>
                                <i class="fa fa-star-half" v-for="m in starFun(item,1)"></i>
                            </span>
                </div>
                <span class="orange">{{item.rating}}</span>
                <span>月售612单</span>
                <div class="fr">
                  <span class="tag-1 scale08">蜂鸟专送</span>
                  <span class="tag-1 scale08">准时达</span>
                </div>
              </div>
              <div class="item-right-3">
                <span class="scale09">￥{{item.float_minimum_order_amount}}起送/ {{item.piecewise_agent_fee.tips}}</span>
                <div class="item-right-3-right fr scale09">
                  <span class="grey">{{item.distance}}公里/</span>  <span class="color-active">{{item.order_lead_time}}</span>
                </div>
              </div>
            </div>
          </div>
        </div >
        <!--<p class="fz14 grey p15 tac" v-show="busy">-->
        <p class="fz14 grey p15 tac">
          <i class="fa fa-refresh"></i>  <span>加载中</span>
        </p>
        <p class="fz14 grey p15 tac" v-show="isover">
          <span>已经到底了</span>
        </p>
      </div>
    </div>
    <div class="toastBox toastAnimate" v-show="msg">
      <div class="toast" >{{msg}}</div>
    </div>
    <footerBox :isActive="isActive"></footerBox>
  </div>
</template>

<script>
import  Swiper from "../plugins/swiper/js/idangerous.swiper.min"
import footerBox from "../components/footer.vue"
export default {
  name: 'app',
  data () {
    return {
      isActive: 'home',
      dataBanner:"",
      restaurants:[],
      filteredItems:"",
      imgLoading:true,
      positionY:0,
      toTopIcon:false,
      rating:[],
      loading:true,
      busy:false,
      offset:0,
      msg:"",
      filtData:"",
      isover:false
    }
  },
  components:{
      footerBox
  },
  methods:{
    goTop:function() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    //评分
    starFun:function(item,index){
      var num=item.rating+"";
      var a;
      if(index==0){
        if(num.indexOf(".")<0){
          a=num;
        }
        else{
          a=num.split(".")[0];
        }
      }
      else{
        if(num.indexOf(".")<0 ||  num.split(".")[1]<5 ){
          a=0;
        }
        else{
          a=1;
        }
      }
      return a*1;
    },
    footActive:function(value){
      var url=location.href;
      if(url.indexOf(value)>0){
        return true;
      }
      else{
        return false;
      }
    },
    loadMore:function(){
          this.offset++;
          this.busy = true;
          var _this=this;
          this.$http.get(baseUrl+"/shopping/restaurants",{
            params:{
              latitude:_this.geohash[0],
              longitude:_this.geohash[1],
              offset:_this.offset,
              limit:10,
              extras:"activities",
              keyword:"",
              restaurant_category_id:"",
              restaurant_category_ids:"",
              order_by:"",
              delivery_mode:""
            }
          }).then(function(result){
              if(result.data.length==0){
                  _this.isover=true;
                    return
              }
            _this.restaurants=_this.restaurants.concat(result.data);
//            console.log(_this.restaurants);
            _this.busy=false;
            _this.msg="加载成功";
            setTimeout(function(){
                _this.msg="";
            },2000)
          }).catch(function(error){
            console.log(error);
            _this.msg=error;
            setTimeout(function(){
              _this.msg="";
            },2000)
          })
    },
    filterFun:function(){
      var _this=this;
      var filteredItems=[];
      //axios使用promise异步特性then,按同步方式执行，解决异步的一个好方法；
      this.$http.get("https://easy-mock.com/mock/5a6ee6924c02fb3139acf189/searchContent_copy/group-type").then(function(result){
        var len = Math.ceil(result.data.length/8);
        for (var i=0;i<len;i++){
          filteredItems[i] = result.data.splice(0,8);  //0-8,8-16
        }
        _this.filteredItems=filteredItems;
      }).then(function(){
        new Swiper(".swiper-container", {
          loop: true,
          pagination: ".pagination"
        })
      }).catch(function(error){
      })
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
      },
    login:function(){
      var userId=localStorage.getItem("userId");
      if(userId!="" && userId!=undefined){
        return true;
      }
      else{
        return false;
      }
    }
  },
  created:function(){
    this.loadMore();
    var _this=this;
    window.addEventListener("scroll", function(e){
      var ele=document.documentElement;
      var a=ele.scrollHeight-ele.clientHeight-ele.scrollTop;

      if (ele.scrollTop>20) {
        _this.toTopIcon=true;
      } else {
        _this.toTopIcon=false;
      }

      if (a<= 5) {
        if (!_this.busy) {
          _this.loadMore();
        }
      }
    });
  },
  beforeCreate:function(){
  },
  mounted:function(){
      this.filterFun();
  },
  updated:function(){
//    this.funA();  //使用updated会产生很多相同的轮播列
  }
}



</script>
<style>
  @import "../style/home.css";
  @import "../plugins/swiper/css/idangerous.swiper.css";
  .fa-refresh{
      animation:roading 1s infinite linear;
  }
  @keyframes roading{
    0%{
      transform:rotate(0deg)
    }
    100%{
      transform:rotate(360deg)
    }
  }
  .toast{
    background: #fff;
    border:1px solid #ddd;
    padding: 5px 10px;
    border-radius: 10px;
    bottom:120px;
    display: inline-block;
    font-size: 14px;
  }
  .toastBox{
    position: fixed;
    margin:auto;
    left: 0;
    right: 0;
    bottom:0;
    text-align: center;
  }
  .toastAnimate{
    bottom:100px;
    animation:toast 2s;
  }
  @keyframes toast {
    0%{
      bottom:0;
    }
    20%{
      bottom:100px;
    }
    80%{
      bottom:100px;
    }
    100%{
      bottom:0;
    }
  }
.banner{
  height: 180px !important;
}

  .swiper-slide{
    text-align: center;
  }
  .pagination{
    position: absolute;
    z-index: 20;
    bottom: 10px;
    width: 100%;
    text-align: center;
    top: 150px;
  }
  .swiper-pagination-switch{
    display: inline-block;
    width: 8px;
    height: 8px;
    border-right: 8px;
    background: #555;
    margin: 0 5px;
    opacity: 0.8;
    border: 1px solid #fff;
    cursor:pointer;
  }
  .swiper-active-switch{
    background: #3190e8;
  }
</style>
