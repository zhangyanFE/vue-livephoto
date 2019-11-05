<template>
  <div class="data-box">
    <div class="data-content">
      <div class="list-wrap">
        <div class="list-item">
          <span>0</span>
          <p>照片数</p>
        </div>
        <div class="list-item">
          <span>0</span>
          <p>浏览数</p>
        </div>
        <div class="list-item">
          <span>0</span>
          <p>下载量</p>
        </div>
        <div class="list-item">
          <span>0</span>
          <p>有效浏览</p>
        </div>
        <div class="list-item">
          <span>0</span>
          <p>浏览时间统计</p>
        </div>
      </div>
    </div>
    <div class="data-stat">
      <div class="browser-stat-title">
        <i></i>
        <span>浏览区域统计</span>
      </div>
      <div class="city-list">
        <div class="city-list-item">上海站</div>
        <div class="city-list-item">上海站</div>
        <div class="city-list-item">上海站</div>
        <div class="city-list-item">上海站</div>
        <div class="city-list-item">上海站</div>
        <div class="city-list-item">上海站</div>
      </div>
    </div>
    <div class="data-share">
      <div class="data-share-left">
        <i></i>
        <span>分享</span>
      </div>
      <div class="data-share-right">
        <i class="iconfont">&#xe73e;</i>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$rem: 75;
@function conver($n) {
  @return $n * 2 / $rem + unquote("rem");
}
.data-box {
  height: 100%;
  background: #f3f3f3;
  padding: conver(12) conver(15) 0 conver(15);
  .data-content {
    background: #fff;
    height: conver(170);
    border-radius: conver(4);
    .list-wrap {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      padding-top: conver(25);
      .list-item {
        width: 33.3%;
        margin-bottom: conver(32);
        span {
          display: flex;
          justify-content: center;
          font-size: conver(20);
          font-family: SourceHanSansCN;
          font-weight: 500;
          color: rgba(57, 133, 253, 1);
          line-height: conver(15);
          padding-bottom: conver(12);
          text-align: center;
        }
        p {
          font-size: conver(15);
          font-family: SourceHanSansCN;
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
          line-height: conver(15);
          text-align: center;
        }
      }
    }
  }
  .data-stat {
    background: #fff;
    border-radius: conver(4);
    margin-top: conver(10);
    padding: conver(17) 0 conver(10) conver(14);
    .browser-stat-title {
      padding-bottom: conver(10);
      i {
        display: inline-block;
        width: conver(23);
        height: conver(23);
        background: url("./images/data-address-icon.png") no-repeat;
        background-size: conver(23) auto;
        vertical-align: middle;
      }
      span {
        font-size: conver(15);
        font-family: SourceHanSansCN;
        font-weight: 500;
        padding-left: conver(12);
      }
    }
    .city-list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      &-item {
        width: conver(69);
        height: conver(27);
        line-height: conver(27);
        text-align: center;
        background: #dceaff;
        border-radius: conver(4);
        color: #3985fd;
        font-size: conver(13);
        font-family: SourceHanSansCN;
        font-weight: 500;
        margin-right: conver(10);
        margin-bottom: conver(10);
      }
    }
  }
  .data-share {
    height: conver(50);
    line-height: conver(50);
    background: #fff;
    border-radius: conver(4);
    margin-top: conver(15);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &-left {
      margin-left: conver(10);
      i {
        display: inline-block;
        width: conver(23);
        height: conver(23);
        background: url("./images/data-share-icon.png") no-repeat;
        background-size: conver(23) auto;
        vertical-align: middle;
        margin-right: conver(13);
      }
      span {
        font-size: conver(15);
        font-family: SourceHanSansCN;
        font-weight: 500;
      }
    }
    &-right {
      i {
        color: #999999;
        font-size: conver(24);
        display: inline-block;
        transform: rotate(-90deg);
        margin-right: conver(10);
      }
    }
  }
}
</style>