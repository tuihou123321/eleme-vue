<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
  name: 'app',
  data () {
    return {
    }
  },
  computed:{
    ...mapState(["msg"])
  },
  created:function(){
  }
}
</script>

<style>
  @import "./style/common.css";
</style>
