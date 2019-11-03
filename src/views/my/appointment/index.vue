<template>
  <div class="appointment-box">
    <div class="appointment-title">
      <p>全球领先的即时影像服务平台</p>
      <div class="appointment-title-line">
        <span class="appointment-title-line-block"></span>
        <div class="photography-title">云摄影平台</div>
      </div>
    </div>
    <div class="appointment-info">
      <div class="appointment-user">
        <div class="appointment-user-input user-name">
          <i></i>
          <input type="text" placeholder="请输入联系人姓名" />
        </div>
        <div class="appointment-user-input user-phone">
          <i></i>
          <input type="tel" maxlength="11" placeholder="请输入手机号" />
        </div>
        <div class="appointment-user-input user-code">
          <i></i>
          <input type="tel" maxlength="6" placeholder="请输入验证码" />
          <span class="send-code">获取验证码</span>
        </div>
      </div>
      <div class="submit-btn">
        <span>提交信息</span>
        <p>云摄影客服将在2小时内与您联系</p>
      </div>
      <div class="dashed-line"></div>
      <div class="cooperative-service">
        <div class="cooperative-service-left">
          <div class="cooperative-tel">
            <span class="cooperative-tel-title">合作热线</span>
            <span class="cooperative-tel-number">400-6162-518</span>
            <a href="tel:400-6162-518" class="cooperative-tel-call"></a>
          </div>
        </div>
        <div class="cooperative-service-right">
          <div class="cooperative-account">
            <span>关注服务号</span>
            <span>了解更多</span>
            <div class="cooperative-account-qrcode"></div>
          </div>
        </div>
      </div>
      <div class="guide">
        <i class="iconfont">&#xe73e;</i>
      </div>
      <div class="guide-tip">行业标准定义者</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$rem: 75;
@function conver($n) {
  @return $n * 2 / $rem + unquote("rem");
}

.appointment-box {
  width: 100%;
  height: 100%;
  background: url("./images/bg.png") no-repeat;
  background-size: 100% 100%;
  .appointment-title {
    margin: 0 conver(85);
    padding-top: conver(22);
    font-size: conver(15);
    font-family: SourceHanSansCN;
    font-weight: bold;
    color: #fff;
    &-line {
      position: relative;
      margin-top: conver(12);
      height: conver(1);
      background: rgba(255, 255, 255, 0.32);
      &-block {
        position: absolute;
        top: 50%;
        left: 50%;
        width: conver(20);
        height: conver(3);
        background: #fff;
        transform: translate3d(-50%, -50%, 0);
      }
      .photography-title {
        padding-top: conver(8);
        padding-bottom: conver(12);
        text-align: center;
        font-size: conver(12);
        font-family: SourceHanSansCN;
        font-weight: 400;
      }
    }
  }
  .appointment-info {
    height: conver(455);
    margin: conver(30) conver(15) 0 conver(15);
    background: #fff;
    box-shadow: conver(3) conver(3) conver(13) conver(1) rgba(4, 0, 0, 0.43);
    border-radius: conver(10);
    .appointment-user {
      padding: conver(24) conver(23) 0 conver(23);
      &-input {
        width: conver(300);
        height: conver(40);
        line-height: conver(40);
        background: #f5f5f5;
        border-radius: conver(4);
        &:not(:last-child) {
          margin-bottom: conver(15);
        }
        i {
          display: inline-block;
          margin-right: conver(12);
          margin-left: conver(14);
        }
        input {
          width: conver(250);
          height: conver(30);
          line-height: normal;
          font-size: conver(12);
          font-family: "微软雅黑";
          font-weight: 400;
          background: #f5f5f5;
          box-sizing: border-box;
          /* -webkit-text-fill-color: #333; */
          &::-webkit-input-placeholder {
            color: #666666;
          }
        }
        &.user-name {
          i {
            width: conver(15);
            height: conver(17);
            background: url("./images/user-icon.png") no-repeat;
            background-size: conver(15) auto;
            vertical-align: middle;
          }
        }
        &.user-phone {
          i {
            width: conver(18);
            height: conver(18);
            background: url("./images/tel-icon.png") no-repeat;
            background-size: conver(18) auto;
            vertical-align: middle;
          }
        }
        &.user-code {
          width: conver(200);
          position: relative;
          i {
            width: conver(17);
            height: conver(19);
            background: url("./images/appointment-icon.png") no-repeat;
            background-size: conver(17) auto;
            vertical-align: middle;
          }
          input {
            width: conver(150);
          }
          .send-code {
            position: absolute;
            top: 0;
            right: conver(-100);
            display: inline-block;
            width: conver(85);
            height: conver(40);
            background: #dde6ff;
            text-align: center;
            border-radius: conver(4);
            font-size: conver(14);
            font-family: SourceHanSansCN;
            font-weight: 400;
            color: #3c73eb;
          }
        }
      }
    }
    .submit-btn {
      width: conver(200);
      height: conver(40);
      line-height: conver(40);
      margin: conver(37) auto conver(15) auto;
      text-align: center;
      border-radius: conver(30);
      background: linear-gradient(
        90deg,
        rgba(19, 184, 204, 1),
        rgba(76, 90, 247, 1)
      );
      span {
        color: #fff;
        font-size: conver(15);
        font-family: SourceHanSansCN;
        font-weight: 400;
      }
      p {
        color: #999999;
        font-size: conver(12);
        font-family: SourceHanSansCN;
        font-weight: 400;
      }
    }
    .dashed-line {
      height: conver(1);
      border-bottom: conver(1) dashed #d2d2d2;
      padding-top: conver(30);
      margin: 0 conver(30) conver(26) conver(30);
    }
    .cooperative-service {
      margin: 0 conver(30);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      /* align-items: center; */
      &-left {
        .cooperative-tel {
          font-size: conver(13);
          font-family: SourceHanSansCN;
          font-weight: 400;
          text-align: center;
          span {
            display: block;
            &:not(:last-child) {
              margin-bottom: conver(10);
            }
          }
          &-title {
            color: #333;
          }
          &-number {
            color: #4566f2;
            font-family: "微软雅黑";
            font-weight: bold;
            font-size: conver(18);
          }
          &-call {
            display: block;
            width: conver(58);
            height: conver(58);
            background: url("./images/call-icon.png") no-repeat;
            background-size: conver(58) auto;
            margin: conver(10) auto 0 auto;
          }
        }
      }
      &-right {
        .cooperative-account {
          color: #333333;
          font-size: conver(13);
          font-family: SourceHanSansCN;
          font-weight: 400;
          span {
            display: block;
            text-align: center;
            &:not(:last-child) {
              margin-bottom: conver(10);
            }
          }
          &-qrcode {
            width: conver(67);
            height: conver(67);
            background: url("./images/qrcode-icon.png") no-repeat;
            background-size: conver(67) auto;
            margin-top: conver(6);
          }
        }
      }
    }
    .guide {
      width: conver(50);
      height: conver(50);
      margin: 0 auto;
      background: linear-gradient(
        90deg,
        rgba(19, 184, 204, 1),
        rgba(76, 90, 247, 1)
      );
      box-shadow: 1px 1px 28px 3px rgba(64, 109, 238, 0.31);
      border-radius: 50%;
      position: relative;
      top: conver(-7);
      i {
        color: #fff;
        font-size: conver(30);
        font-weight: bold;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        transition: transform 0.3s;
      }
    }
    .guide-tip {
      font-size: conver(15);
      font-family: "微软雅黑";
      font-weight: bold;
      text-align: center;
      color: #010101;
      padding-top: conver(2);
    }
  }
}
</style>