<template>
  <div>
    <headerBox :title="title"></headerBox>
      <div class="main mt50">
        <form action="" onsubmit="return false" v-cloak>
          <ul class="bg-white grey">
            <li class="bdb1 df p5">
              <input type="text" placeholder="账号" class="form-control bd0 fz16" v-model="account">
            </li>
            <li class="bdb1 df p5 aic">
              <input :type="passwordType" placeholder="密码" class="form-control bd0 fz16"  v-model="password">
              <div>
                <label class="switch-box" @click="showPassword()" :class="{'bg-active':onOff}">
                  <span class="switch-circle" :class="{'switch-active':onOff,'switch-active2':!onOff}"></span>
                </label>
              </div>
            </li>
            <li class="bdb1 df jcb p5 aic">
              <input type="text" placeholder="验证码" class="form-control bd0 fz16"  v-model="checkCode" style="margin-right:-15px;">
              <div class="df aic">
                <a href="javascript:" @click="changeCode()" class="mr5"><img :src=src alt="" width="85" height="35"></a>
                <div class="fz10">
                  <p>看不清</p>
                  <a href="javascript:" class="c-active" @click="changeCode()">换一张</a>
                </div>
              </div>
            </li>
          </ul>
          <div class="red fz10 p10">
            <p>温馨提示:末注册过的账号，登录时将自动注册</p>
            <p> 注册过的用户可凭账号密码登录 </p>
          </div>
          <div class="p10 df mt10">
            <button type="submit" class="btn btn-success btn-block" @click="checkLogin()">登录</button>
          </div>
          <div class="p10  tar">
            <router-link to="/forget/" class="c-active">重置密码?</router-link>
          </div>
        </form>
      </div>
      <div class="modalBox" :class="{hidden:!exitButton2}" v-cloak>
        <div class="modal animated bounce" :class="{bounceInDown:exitButton,bounceOutDown:!exitButton}">
          <div class="modal-dialog p0 m40">
            <div class="modal-body pt10">
              <i class="fa fa-exclamation-circle fz90 yellow mb20"></i>
              <p class="fz24">{{errorInfo}}</p>
            </div>
            <div class="modal-footer">
            </div> <button class="btn btn-success btn-block bdrs0 fz18" @click="quit(true)">确认</button>
          </div>
        </div>
        <div class="modal-backdrop animated" :class="{fadeIn:exitButton,fadeOut:!exitButton}"></div>
      </div>
  </div>

</template>

<script>
  import footerBox from "../components/footer.vue"
  import headerBox from "../components/header.vue"
  export default {
    name: 'app',
    data () {
      return {
        title:"账户信息",
        showCode:false,
        passwordType:"password",
        account:"",
        password:"",
        checkCode:"",
        errorInfo:"",
        exitButton:false,
        exitButton2:false,
        onOff:false,
        src:"/src/images/code.png"
      }
    },
    components:{
      footerBox,
      headerBox
    },
    methods:{
      showPassword:function(){
        this.onOff=!this.onOff;
        if(this.onOff==true){
          this.passwordType="text";
        }
        else{
          this.passwordType="password";
        }
      },
      changeCode:function(){
        var _this=this;
        this.$http.get("https://easy-mock.com/mock/5a6ee6924c02fb3139acf189/searchContent_copy/code").then(function(result){
          _this.src=result.codesrc;
        }).catch(function(err){
            console.log(err);
        });
      },
      checkLogin:function(){
        if(this.account==""){
          this.errorInfo="请输入账号";
          this.exit();
        }
        else if(this.password==""){
          this.errorInfo="请输入密码";
          this.exit();
        }
        else if(this.checkCode==""){
          this.errorInfo="验证码不正确";
          this.exit();
        }
        else{
          var _this=this;
          this.$http.get("https://easy-mock.com/mock/5a6ee6924c02fb3139acf189/searchContent_copy/user",
            {
                params:{
                    "account":_this.account,
                     "password":_this.password,
                     "checkCode":_this.checkCode
                }
            }).then(function(result){
            if(result){
              result=result.data;
              localStorage.setItem("userId",result.user_id);
              _this.$router.push("/profile");
            }
          }).catch(function(err){
              console.log(err);
          });
        }
      },
      exit: function () {
        this.exitButton = true;
        this.exitButton2 = true;
      },
      quit: function (boole) {
        var _this = this;
        this.exitButton = false;
        setTimeout(function () {
          _this.exitButton2 = false;
        }, 500)
        if (boole) {
          setTimeout(function () {
          }, 500)
        }
      }
    }
  }
</script>
<style>
  @import "../style/search.css";
  .mint-switch {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
  }
  .mint-switch-core {
    display: inline-block;
    position: relative;
    width: 52px;
    height: 32px;
    border: 1px solid #d9d9d9;
    border-radius: 16px;
    box-sizing: border-box;
    background: #d9d9d9;
  }
  .mint-switch-core:before {
    width: 50px;
    height: 30px;
    background-color: #fdfdfd;
  }
  .mint-switch-core:after {
    width: 30px;
    height: 30px;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,.4);
  }
  .mint-switch-label {
    margin-left: 10px;
    display: inline-block;
  }
  .mint-switch * {
    pointer-events: none;
  }
</style>
