<template>
  <div class="login-box">
    <div class="login-logo"></div>
    <div class="login-user">
      <div class="user-info login-user-phone">
        <i></i>
        <input
          v-model.trim="mobile"
          type="tel"
          name="mobile"
          class="phone-val"
          maxlength="11"
          :placeholder="$t('customName.login.phonePlaceholder')"
          @keyup.enter="checkMobile"
          @blur="checkMobile"
        />
      </div>
      <div class="user-info login-user-code">
        <i></i>
        <input
          v-model.trim="code"
          type="tel"
          name="code"
          class="code-val"
          maxlength="6"
          :placeholder="$t('customName.login.codePlaceholder')"
          @keyup.enter="checkCode"
          @blur="checkCode"
        />
        <span
          :class="['send-code', hasBeenSent && 'active']"
          @click="handleSendCode"
          >{{ sendText }}</span
        >
      </div>
      <div class="login-btn" @click="handleLogin">
        <span>{{ $t("customName.login.loginBtnText") }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { checkPhone } from "@/lib/util";
export default {
  name: "login",
  data() {
    return {
      mobile: "",
      code: "",
      timer: null,
      sendText: "获取验证码",
      count: 10,
      countTime: 1000,
      resetCount: 10,
      hasBeenSent: false // 已发送验证码状态标识
    };
  },
  computed: {},
  watch: {},
  created() {},
  activated() {},
  deactivated() {},
  methods: {
    phoneVal(e) {
      let { value } = e.currentTarget;
    },
    codeVal() {},
    checkMobile(type, flag) {
      if (this.mobile.length !== 11) {
        this.$toast("请输入11位手机号");
        return false;
      } else if (!checkPhone(this.mobile)) {
        this.$toast("请输入正确的手机号");
        return false;
      } else {
        return true;
      }
    },
    checkCode() {
      if (this.code.length !== 6) {
        this.$toast("请输入6位验证码");
        return false;
      } else {
        // ajax...
        return true;
      }
    },
    countDown() {
      this.$toast("验证码发送成功");
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.count--;
        this.hasBeenSent = true;
        this.sendText = `${this.count}s后获取`;
        if (this.count < 0) {
          clearInterval(this.timer);
          this.count = this.resetCount;
          this.sendText = "获取验证码";
          this.hasBeenSent = false;
        }
      }, this.countTime);
    },
    handleSendCode() {
      if (this.checkMobile() && !this.hasBeenSent) {
        // ajax...
        this.countDown();
      }
    },
    handleLogin() {
      if (this.checkMobile() && this.checkCode()) {
        // ajax...
        this.$toast("登录成功");
        let redirectUrl = this.$route.query.redirect;
        if (redirectUrl) {
          this.$router.push(decodeURIComponent(redirectUrl));
        } else {
          this.$router.push("/my");
        }
        this.handleEmpty();
      }
    },
    handleEmpty() {
      this.mobile = "";
      this.code = "";
      clearInterval(this.timer);
      this.hasBeenSent = false;
      this.sendText = "获取验证码";
    }
  }
};
</script>
>
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
        &.active {
          background: #e6e6e6;
          color: #fff;
        }
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
