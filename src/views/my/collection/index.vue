<template>
  <div class="collection-box">
    <div class="collection-album">
      <div class="collection-album-item" v-for="(item, index) in list" :key="index">
        <div class="collection-album-item-left">
          <img :src="item.img" :alt="item.title" />
        </div>
        <div class="collection-album-item-right">
          <div class="item-info">
            <div class="item-info-title">{{item.title}}</div>
            <div class="item-info-time">
              <i></i>
              <span>{{item.time}}</span>
            </div>
            <div class="item-info-address">
              <i></i>
              <span>{{item.address}}</span>
            </div>
            <div class="item-info-del-btn">
              <i></i>
              <span>删除</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          img:
            "http://vcysy-album.oss-cn-beijing.aliyuncs.com/web/2019/10/26/837aa8377498521bd2c55d1fe1c56c77b58f2c662192fd08251bf8f37889a620.jpg?x-oss-process=image/resize,m_fill,w_1080,h_720,limit_0/auto-orient,0/quality,q_90",
          title: "2019秀行中国",
          time: "2019-10-30",
          address: "浙江省杭州市西大街121号"
        },
        {
          img:
            "http://vcysy-album.oss-cn-beijing.aliyuncs.com/web/2019/10/26/837aa8377498521bd2c55d1fe1c56c77b58f2c662192fd08251bf8f37889a620.jpg?x-oss-process=image/resize,m_fill,w_1080,h_720,limit_0/auto-orient,0/quality,q_90",
          title: "2019秀行中国2",
          time: "2019-10-30",
          address: "浙江省杭州市西大街121号"
        }
      ]
    };
  }
};
</script>>
<style lang="scss" scoped>
$rem: 75;
@function conver($n) {
  @return $n * 2 / $rem + unquote("rem");
}
.collection-box {
  width: 100%;
  height: 100%;
  background: #f9f9f9;
  .collection-album {
    margin: 0 conver(15);
    padding-top: conver(12);
    &-item {
      width: conver(345);
      height: conver(105);
      background: #fff;
      border-radius: conver(4);
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      &:not(:last-child) {
        margin-bottom: conver(10);
      }
      &-left {
        width: conver(130);
        height: conver(85);
        background: #f2f2f2;
        border-radius: conver(4);
        margin-right: conver(12);
        margin-left: conver(10);
        img {
          display: block;
          width: conver(130);
          height: conver(85);
          border-radius: conver(4);
        }
      }
      &-right {
        position: relative;
        width: conver(200);
        .item-info {
          font-weight: 500;
          font-family: "微软雅黑";
          i,
          span {
            display: inline-block;
            vertical-align: middle;
            margin-right: conver(8);
          }
          &-title {
            color: #000;
            font-size: conver(15);
          }
          &-time {
            color: #999;
            font-size: conver(11);
            padding-top: conver(18);
            padding-bottom: conver(13);
            i {
              width: conver(12);
              height: conver(12);
              background: url("../images/time-icon.png") no-repeat;
              background-size: conver(12) auto;
            }
          }
          &-address {
            color: #999;
            font-size: conver(12);
            i {
              width: conver(12);
              height: conver(16);
              background: url("../images/address-icon.png") no-repeat;
              background-size: conver(12) auto;
            }
          }
          &-del-btn {
            position: absolute;
            top: 0;
            right: conver(5);
            border: conver(0.8) solid #bfbfbf;
            border-radius: conver(32);
            padding: conver(7) conver(11);
            color: #666;
            font-size: conver(13);
            i {
              width: conver(12);
              height: conver(15);
              background: url("../images/del-icon.png") no-repeat;
              background-size: conver(12) auto;
            }
            span {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}
</style>