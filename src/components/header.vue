<template>
  <div>
    <header class="header">
      <a href="javascript:history.back()" class="header-left"><i aria-hidden="true" class="fa fa-chevron-left"></i></a>
      <div class="header-center">{{title}}</div>
      <!--<div class="header-right fr"><i aria-hidden="true" class="fa fa-chevron-right"></i></div>-->
    </header>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
  props:["title"]
}
</script>
<style>
</style>
