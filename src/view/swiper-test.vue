<template>
  <div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" style="background: red;"> 1111</div>
        <div class="swiper-slide" style="background: blue;">222</div>
        <div class="swiper-slide" style="background: yellow;">333</div>
      </div>
      <div class="pagination"></div>
    </div>
  </div>
</template>

<script>
import  Swiper from "../plugins/swiper/js/idangerous.swiper.min"
import  "../plugins/swiper/css/idangerous.swiper.css"

export default {
  name: 'app',
  data () {
    return {
    }
  },
  components:{
  },
  methods:{
  },
  created:function() {
  },
  mounted:function(){
    new Swiper(".swiper-container", {
      loop: true,
      pagination: ".pagination"
      // autoplay:2000,   //每2s钟自动轮播
    })
   },
}



</script>
<style>
  @import "../style/home.css";
  @import "../plugins/swiper/css/idangerous.swiper.css";
  .swiper-container{
    max-height:250px;
    height: 250px;
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
    background: #fff;
  }
</style>
