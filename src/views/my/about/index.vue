<template>
  <div class="about-box">
    <div class="logo">
      <span></span>
      <p>云摄影</p>
    </div>
    <div class="about-introduce">
      <p>
        <span>定位：</span>
        为公关传播赋能的超高效图片直播展示平台
      </p>
      <p>
        <span>功能介绍：</span>
        云摄影是基于互联网+的思维模式创立，以互联网+硬件+摄影服务为模式的优质公关展示平台。
        <br />云摄影自成立伊始，就以提升摄影图片呈现的即时性，图片素材资源提供的简洁性和图片品质的保障性为目标方向、不断在摄影师端和图片数码处理端做深度的整合和优化，在实践中不断地总结，最终统一出一套标准化的实操流程和品控方案，客户体验不断提升，云摄影作为图片直播领域的标签，因肩负行业使命，必众阔步前行！
      </p>
    </div>
    <div class="contact-information">
      <a href="tel:4006162518">
        <p>
          提交信息后，我们会以最快的速度联系您
          <br />或拨打免费客户咨询电话
        </p>
      </a>
    </div>
    <div class="brand">您身边的品牌也在选择云摄影</div>
    <div class="cooperative-partner"></div>
    <div class="official-account">
      <span></span>
      <p>关注服务号了解更多</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$rem: 75;
@function conver($n) {
  @return $n * 2 / $rem + unquote("rem");
}
.about-box {
  width: 100%;
  background: #f9f9f9;
  .logo {
    padding-top: conver(25);
    span {
      display: block;
      width: conver(155);
      height: conver(120);
      background: url("./images/logo.png") no-repeat;
      background-size: conver(155) auto;
      margin: 0 auto;
    }

    p {
      text-align: center;
      font-size: conver(18);
      color: #000;
      font-weight: bold;
    }
  }
  .about-introduce {
    margin: conver(25) conver(19);
    p {
      color: #333;
      font-size: conver(12);
      font-family: SourceHanSansCN;
      font-weight: 400;
      line-height: conver(20);
      span {
        font-weight: bold;
      }
    }
  }
  .contact-information {
    width: 100%;
    height: conver(129);
    background: url("./images/tel-bg.png") no-repeat;
    background-size: 100% auto;
    a {
      display: block;
      width: 100%;
      height: conver(129);
    }
    p {
      text-align: center;
      color: #fff;
      font-size: conver(12);
      font-family: SourceHanSansCN;
      font-weight: bold;
      line-height: conver(18);
      padding: conver(17) 0 conver(22) 0;
    }
  }
  .brand {
    color: #000;
    font-size: conver(15);
    font-family: SourceHanSansCN;
    font-weight: bold;
    text-align: center;
    padding: conver(22) 0 conver(25) 0;
  }
  .cooperative-partner {
    width: conver(345);
    height: conver(207);
    background: url("./images/partner-bg.png") no-repeat;
    background-size: conver(345) auto;
    margin: 0 conver(15);
  }
  .official-account {
    span {
      display: block;
      width: conver(120);
      height: conver(120);
      background: url("./images/qrcode-icon.png") no-repeat;
      background-size: conver(120) auto;
      margin: conver(21) auto conver(17) auto;
    }
    p {
      color: #000;
      font-size: conver(12);
      font-family: SourceHanSansCN;
      font-weight: 400;
      text-align: center;
      padding-bottom: conver(27);
    }
  }
}
</style>