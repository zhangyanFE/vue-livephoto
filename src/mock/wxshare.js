var appId;
var timeStamp;
var nonceStr;
var signature;
var shareLink = "";
var thisUrl = "";

var realShareLink = "";
var shareImgUrl = DETAIL.wx_img;
var sharedescContent = DETAIL.wx_desc;
var shareTitle = DETAIL.wx_title;

$(shareInit);

function shareInit() {
  shareLink = thisUrl = HREF.indexOf("http") > -1 ? HREF : "https://" + HREF;
  getRealLink();
  changeShareLink();
  // 钉钉
  if (isdingding()) {
    dd.ready(function() {
      dd.biz.navigation.setRight({
        show: true, //控制按钮显示， true 显示， false 隐藏， 默认true
        control: true, //是否控制点击事件，true 控制，false 不控制， 默认false
        text: "分享", //控制显示文本，空字符串表示显示默认文本
        onSuccess: function(result) {
          dd.biz.util.share({
            type: 0, //分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
            url: shareLink,
            content: DETAIL.wx_desc,
            title: DETAIL.wx_title,
            image: DETAIL.wx_img,
            onSuccess: function() {},
            onFail: function(err) {}
          });
        },
        onFail: function(err) {}
      });
    });
  }
}

function getRealLink() {
  $.ajax({
    async: false,
    url: "/share/signature",
    type: "GET",
    dataType: "json",
    data: { url: thisUrl, shareUrl: shareLink },
    success: function(data) {
      if (data.success) {
        appId = data.result.app_id;
        timeStamp = data.result.timestamp;
        nonceStr = data.result.noncestr;
        signature = data.result.signature;
        realShareLink = data.result.share_url;
        // alert(realShareLink)
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: appId, // 必填，公众号的唯一标识
          timestamp: timeStamp, // 必填，生成签名的时间戳
          nonceStr: nonceStr, // 必填，生成签名的随机串
          signature: signature, // 必填，签名，见附录1
          jsApiList: [
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "chooseImage",
            "previewImage",
            "uploadImage",
            "downloadImage",
            "getLocalImgData"
          ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
      }
    }
  });
}

// 切换分享链接
function changeShareLink() {
  wx.ready(function() {
    wx.onMenuShareAppMessage({
      title: shareTitle, // 分享标题
      desc: sharedescContent, // 分享描述
      link: realShareLink, // 分享链接
      imgUrl: shareImgUrl, // 分享图标
      type: "link", // 分享类型,music、video或link，不填默认为link
      dataUrl: "",
      success: function() {
        $.ajax({
          url: "/statistics/shareClick",
          type: "GET",
          dataType: "json",
          data: { key: PATHNAME, params: "activityNo=" + ACTIVITYNO }
        });
      }
    });

    wx.onMenuShareTimeline({
      title: shareTitle, // 分享标题
      link: realShareLink, // 分享链接
      imgUrl: shareImgUrl,
      success: function() {
        $.ajax({
          url: "/statistics/shareClick",
          type: "GET",
          dataType: "json",
          data: { key: PATHNAME, params: "activityNo=" + ACTIVITYNO }
        });
      }
    });
  });
}

function isdingding() {
  //判断是不是钉钉
  var ua = navigator.userAgent.toLowerCase();
  return ua.indexOf("dingtalk") >= 0;
}
