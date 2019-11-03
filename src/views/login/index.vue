<template>
  <div class="login-box">
    <div class="login-logo"></div>
    <div class="login-user">
      <div class="user-info login-user-phone">
        <i></i>
        <input type="tel" class="phone-val" maxlength="11" placeholder="输入手机号" />
      </div>
      <div class="user-info login-user-code">
        <i></i>
        <input type="tel" class="code-val" maxlength="6" placeholder="输入验证码" />
        <span class="send-code">发送验证码</span>
      </div>
      <div class="login-btn">
        <span>登录</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  activated() {},
  deactivated() {},
  methods: {}
};
</script>>
<style lang="scss" scoped>
$rem: 75;
@function conver($n) {
  @return $n * 2 / $rem + unquote("rem");
}
.login-box {
  width: 100%;
  height: 100%;
  background: #f9f9f9;
  padding-top: conver(40);
  .login-logo {
    width: conver(160);
    height: conver(114);
    background: url("./images/logo.png") no-repeat;
    background-size: conver(160) auto;
    margin: 0 auto;
  }
  .login-user {
    /* margin: conver(40) conver(37) 0 conver(37); */
    width: conver(300);
    margin: conver(40) auto 0 auto;
    .user-info {
      height: conver(40);
      line-height: conver(40);
      &:not(:last-child) {
        margin-bottom: conver(11);
      }
      i {
        display: inline-block;
        margin-left: conver(12);
        margin-right: conver(8);
      }
      input {
        height: conver(40);
        line-height: normal;
        font-size: conver(13);
        font-family: PingFang;
        font-weight: 500;
        &::-webkit-input-placeholder {
          color: #999999;
        }
      }
    }
    &-phone {
      width: conver(300);
      background: #fff;
      i {
        width: conver(13);
        height: conver(20);
        background: url("./images/phone-icon.png") no-repeat;
        background-size: conver(13) auto;
        vertical-align: middle;
      }
      .phone-val {
        width: 87%;
      }
    }
    &-code {
      width: conver(200);
      background: #fff;
      position: relative;
      i {
        width: conver(17);
        height: conver(19);
        background: url("./images/code-icon.png") no-repeat;
        background-size: conver(17) auto;
        vertical-align: middle;
      }
      .code-val {
      }
      .send-code {
        position: absolute;
        top: 0;
        right: conver(-100);
        width: conver(86);
        height: conver(40);
        background: #3a86fc;
        border-radius: conver(4);
        font-size: conver(13);
        font-family: PingFang;
        font-weight: 500;
        text-align: center;
        color: #fff;
      }
    }
    .login-btn {
      width: conver(300);
      height: conver(44);
      line-height: conver(44);
      text-align: center;
      border-radius: conver(22);
      color: #fff;
      font-size: conver(17);
      font-family: PingFang;
      font-weight: 500;
      margin-top: conver(77);
      box-shadow: 0px 1px 9px 0px rgba(89, 153, 225, 0.56);
      background: linear-gradient(
        -83deg,
        rgba(72, 174, 255, 1),
        rgba(72, 174, 255, 1),
        rgba(57, 133, 253, 1),
        rgba(76, 168, 241, 1)
      );
    }
  }
}
</style>