<template>
  <div>
    <headerBox :title="title"></headerBox>
    <h2>benefit</h2>
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
        title:"搜索"
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
