<template>
  <div class="popup-box">
    <van-popup
      v-model="showQrcodePopup.popupType"
      closeable
      :overlay="overlayMask"
      :close-on-click-overlay="closeClickOverlay"
      :close-icon="setWhiteCloseIcon"
    >
      <div class="venue-qrcode-box">
        <div class="venue-qrcode-title">{{$t('customName.qrcodePopup.qrcodeTitle')}}</div>
        <div class="venue-qrcode-img">
          <img :src="setQrcodeImg" :alt="$t('customName.qrcodePopup.qrcodeTitle')" />
          <p>{{$t('customName.qrcodePopup.qrcodeDesc')}}</p>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { whiteCloseIconImg, qrcodeImg } from "@/assets/images/img";
export default {
  name: "venueQrcode",
  props: {
    showQrcodePopup: {
      type: Object,
      default: () => {
        return {
          popupType: false
        };
      }
    }
  },
  computed: {
    ...mapState({
      qrcodeState: state => state.livephoto.qrcodeState
    }),
    setWhiteCloseIcon() {
      return whiteCloseIconImg;
    },
    setQrcodeImg() {
      return qrcodeImg;
    }
  },
  data() {
    return {
      showVenueQrcodePopup: true,
      closeClickOverlay: false,
      overlayMask: true
    };
  },
  methods: {}
};
</script>
>
<style lang="scss" scoped>
$rem: 75;
@function conver($n) {
  @return $n * 2 / $rem + unquote("rem");
}
.popup-box {
  .van-image {
    top: conver(-5);
    right: conver(-4);
  }
}
.venue-qrcode-box {
  width: conver(280);
  height: conver(355);

  .venue-qrcode-title {
    height: conver(45);
    line-height: conver(45);
    text-align: center;
    color: #fff;
    font-size: conver(18);
    font-family: SourceHanSansCN;
    font-weight: 400;
    background: linear-gradient(
      90deg,
      rgba(16, 142, 233, 1),
      rgba(16, 195, 233, 1)
    );
  }
  .venue-qrcode-img {
    margin: conver(51) conver(49) 0 conver(49);
    img {
      display: block;
      width: conver(182);
      height: conver(182);
    }
    p {
      color: #666;
      font-size: conver(12);
      font-family: SourceHanSansCN;
      font-weight: 400;
      text-align: center;
      padding-top: conver(35);
    }
  }
}
</style>
