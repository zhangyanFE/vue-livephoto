<template>
  <div class="face-box">
    <div class="face-avatar">
      <div class="face-avatar-img">
        <div v-if="!fileFlag" class="face-avatar-img-bg"></div>
        <img v-else :src="avatarImg" alt="头像" />
      </div>
      <div class="face-avatar-desc">{{$t('customName.lookForSb.lookUploadDesc1')}}</div>
      <div class="face-avatar-desc">{{$t('customName.lookForSb.lookUploadDesc2')}}</div>
    </div>
    <div class="face-upload-btn">
      <van-uploader :after-read="afterRead">
        {{$t('customName.lookForSb.lookUploadBtnText')}}
      </van-uploader>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      avatarImg: "",
      fileFlag: false
    };
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file.content);
      this.fileFlag = true;
      this.avatarImg = file.content;
    }
  }
};
</script>
<style lang="scss" scoped>
$rem: 75;
@function conver($n) {
  @return $n * 2 / $rem + unquote("rem");
}
.face-box {
  width: 100%;
  height: 100%;
  background: url("./images/face-bg.png") no-repeat;
  background-size: 100% 100%;
  .face-avatar {
    padding-top: conver(48);
    &-img {
      width: conver(125);
      height: conver(125);
      background: #fff;
      box-shadow: 0 conver(-2) conver(4) 0 rgba(127, 127, 127, 0.08);
      border-radius: conver(10);
      margin: 0 auto;
      position: relative;
      &-bg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        width: conver(78);
        height: conver(87);
        background: url("./images/face-avatar.png") no-repeat;
        background-size: contain;
      }
      img{
        width: 100%;
        height: 100%;
        display: block;
        overflow: hidden;
        border-radius: conver(10);
      }
    }
    &-desc {
      font-size: conver(12);
      font-family: SourceHanSansCN;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: conver(18);
      text-align: center;
      &:not(:last-child) {
        padding-top: conver(14);
      }
    }
  }
  .face-upload-btn {
    position: fixed;
    bottom: conver(29);
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: conver(300);
    height: conver(40);
    line-height: conver(40);
    background: linear-gradient(
      90deg,
      rgba(19, 184, 204, 1),
      rgba(76, 90, 247, 1)
    );
    border-radius: conver(4);
    color: #fff;
    font-size: conver(15);
    font-family: SourceHanSansCN;
    font-weight: 400;
    text-align: center;
  }
}
</style>
