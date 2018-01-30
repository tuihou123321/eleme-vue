<template>
  <div>
    <footer class="footer-menu df tac">
      <router-link to="/home" class="fx1">
        <i class="fa fa-shopping-basket" :class="{'c-active':isActive=='home'}"></i>
        <span>外卖</span>
      </router-link>

      <router-link to="/search" class="fx1">
        <i class="fa fa-search" :class="{'c-active':isActive=='search'}"></i>
        <span>搜索</span>
      </router-link>

      <router-link to="/order" class="fx1">
        <i class="fa fa-reorder" :class="{'c-active':isActive=='order'}"></i>
        <span>订单</span>
      </router-link>

      <router-link to="/profile" class="fx1">
        <i class="fa fa-user-o" :class="{'c-active':isActive=='profile'}"></i>
        <span>我的</span>
      </router-link>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
  props:["isActive"]
}
</script>
<style>
</style>
