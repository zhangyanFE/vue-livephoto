!(function(doc, win) {
  var userAgentInfo = navigator.userAgent;
  var Agents = new Array(
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod"
  );
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > -1) {
      flag = false;
      break;
    }
  }
  if (flag) {
    var from = GetSearchParam("from");
    var docEle = doc.documentElement,
      evt = "onorientationchange" in window ? "resize" : "orientationchange",
      fn = function() {
        var width = from === "saas" ? 540 : 500;
        width && (docEle.style.fontSize = 100 * (width / 750) + "px");
      };
    win.addEventListener(evt, fn, false);
    doc.addEventListener("DOMContentLoaded", fn, false);
    if (from !== "saas") {
      $("html, body").css({ width: "500px", margin: "0 auto" });
      $(
        ".jh-container, .nav,.discuss-wrapper, .order, .try, .swiper-masking, .main-masking"
      ).css({ width: "500px", left: "50%", "margin-left": "-250px" });
      $(".pos-box").remove();
    }
  } else {
    return;
  }
})(document, window);
// 以上部分为了暂时在pc上展示样式 后期更改

// 判断浏览器
var browser = {
  versions: (function() {
    var u = navigator.userAgent,
      app = navigator.appVersion;
    return {
      //移动终端浏览器版本信息
      trident: u.indexOf("Trident") > -1, //IE内核
      presto: u.indexOf("Presto") > -1, //opera内核
      webKit: u.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
      gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, //火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或者uc浏览器
      iPhone: u.indexOf("iPhone") > -1 || u.indexOf("Mac") > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf("iPad") > -1, //是否iPad
      webApp: u.indexOf("Safari") == -1, //是否web应该程序，没有头部与底部
      google: u.indexOf("Chrome") > -1,
      weiChat:
        (u.indexOf("MicroMessenger") > -1 ||
          u.indexOf("micromessenger") > -1) &&
        u.indexOf("wxwork") === -1
    };
  })()
};
// 哪种设备打开
if (browser.versions.weiChat) {
  var wx_login = getCookie("wx_login");
  if (wx_login == "undefined" || wx_login == "" || wx_login == "false") {
    setCookie("iswx", "1");
    $("#me, #find").remove();
    // window.location.reload();
  } else if (wx_login == "true") {
    setCookie("iswx", "1");
  }
} else {
  setCookie("iswx", "0");
  $("#me, #find").remove();
}
// 获取活动号
function getNo() {
  var path = window.location.pathname;
  var activityNo = path.split("/")[path.split("/").length - 1];
  return activityNo;
}

// 获取链接参数
function GetSearchParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return r[2];
  return null;
}

// 长按
$.fn.longPress = function(fn) {
  var timeout = undefined;
  var $this = this;
  for (var i = 0; i < $this.length; i++) {
    $this[i].addEventListener(
      "touchstart",
      function(event) {
        timeout = setTimeout(fn, 800);
      },
      false
    );
    $this[i].addEventListener(
      "touchend",
      function(event) {
        clearTimeout(timeout);
      },
      false
    );
  }
};

// 阻止默认事件
function touchModal(event) {
  var event = event || window.event;
  event.preventDefault();
  return false;
}

// toast 弹层
function toast(text) {
  var $toast = $(".toast");
  if ($toast.attr("style") == "display: block;") {
    return;
  }
  $toast.find("p").html(text);
  $toast
    .fadeIn(100)
    .delay(1500)
    .fadeOut();
}

//cookie
function setCookie(name, value, iDay) {
  var oDate = new Date();
  oDate.setDate(oDate.getDate() + iDay);
  document.cookie =
    name + "=" + encodeURIComponent(value) + ";expires=" + oDate;
}
function getCookie(name) {
  var arr = document.cookie.split("; ");
  var i = 0;
  for (i = 0; i < arr.length; i++) {
    var arr2 = arr[i].split("=");
    if (arr2[0] == name) {
      var getC = decodeURIComponent(arr2[1]);
      return getC;
    }
  }
  return "";
}

(function() {
  window.loadingFun = function(obj) {
    if (obj.imgs && obj.imgs.length > 0 && obj.imgs instanceof Array) {
      var _imgs = [];
      var imgIndex = 0;
      for (var i = 0; i < obj.imgs.length; i++) {
        var img = new Image();
        img.src = obj.imgs[i];
        _imgs.push(img);
        img.onload = function() {
          imgIndex++;
          if (obj.loading && typeof obj.loading == "function") {
            obj.loading();
          }
          if (imgIndex == obj.imgs.length) {
            if (obj.loaded && typeof obj.loaded == "function") {
              obj.loaded(_imgs);
            }
          }
        };
      }
    }
  };
})();
function get_ios_version() {
  var ua = navigator.userAgent.toLowerCase();
  var version = null;
  if (ua.indexOf("like mac os x") > 0) {
    var reg = /os [\d._]+/gi;
    var v_info = ua.match(reg);
    version = (v_info + "").replace(/[^0-9|_.]/gi, "").replace(/_/gi, "."); //得到版本号9.3.2或者9.0
    version = parseInt(version.split(".")[0]); // 得到版本号第一位
  }

  return version;
}
// touch 关闭图片
function touchImg(son, father) {
  var father = father[0];
  var son = son[0];
  var parentOpacity = 1;
  var imgScale = 1;

  var iw = son.offsetWidth,
    ih = son.offsetHeight;
  var startY, moveY, touchAngle;

  son.addEventListener(
    "touchstart",
    function(ev) {
      if (ev.targetTouches.length === 1) {
        son.style.transition = "";
        son.style.webkitTransition = "";
        father.style.transition = "";
        father.style.webkitTransition = "";

        startY = ev.touches[0].clientY;
        startX = ev.touches[0].clientX;
      }
    },
    false
  );
  son.addEventListener(
    "touchmove",
    function(ev) {
      if (ev.targetTouches.length === 1) {
        moveY = ev.touches[0].clientY - startY;
        moveX = ev.touches[0].clientX - startX;

        parentOpacity = 1 - Math.abs(moveY) / 500;
        imgScale = 1 - Math.abs(moveY) / 500;

        // 触摸滑动角度
        touchAngle = Math.abs(moveY / moveX);
        if (touchAngle > 1 && dragClose) {
          son.style.webkitTransform =
            "translate(" +
            moveX +
            "px, " +
            moveY +
            "px) scale(" +
            imgScale +
            ")";
          son.style.transform =
            "translate(" +
            moveX +
            "px, " +
            moveY +
            "px) scale(" +
            imgScale +
            ")";
          father.style.background = "rgba(0, 0, 0, " + parentOpacity + ")";
          $("#imgShowModal .modal_footer, #imgShowModal .imgShowTip").fadeOut();
        }
      }
    },
    false
  );
  son.addEventListener("touchend", function(ev) {
    if (touchAngle > 1 && dragClose) {
      if (Math.abs(moveY) > 130) {
        son.style.webkitTransition = "all .5s";
        son.style.transition = "all .5s";
        son.style.webkitTransform = "scale(0)";
        son.style.transform = "scale(0)";
        $("video").removeClass("none");
        $("#imgShowModal").fadeOut(200, function() {
          picLikeArr = []; //关闭时清空 自己点赞过图片的数组
          getLikes(); // 重新获取一次；
          $("#imgShowModal .modal_footer, #imgShowModal .imgShowTip").fadeIn();
          $(".imgShowSwiper .swiper-wrapper").empty();
          picShowSwiper.destroy(false, true);
        });
        $(".container").off("touchmove");
      } else {
        son.style.webkitTransform = "translateY(0) scale(1)";
        son.style.transform = "translateY(0) scale(1)";
        son.style.webkitTransition = "all .2s";
        son.style.transition = "all .2s";

        father.style.background = "rgba(0, 0, 0, 1)";
        father.style.webkitTransition = "all .5s";
        father.style.transition = "all .5s";

        $("#imgShowModal .modal_footer, #imgShowModal .imgShowTip").fadeIn();
      }
    }
  });
}
// swiperSimple(['http://s.plusx.cn/plus/live/meta/4941768/thumb/20481866/IMG_1887.JPG?imageView2/0/w/1600/h/3000/q/85&sign=c17bfae8c26c534b2a4cf336796c1a27&t=5c386fed'], 2);
function swiperSimple(imgArr, index) {
  if (!imgArr instanceof Array) return;
  $(".container").on("touchmove", touchModal);
  var dom =
    '\
	<div class="simple-swiper">\
		<div class="simple-operate">\
			<i class="iconfont icon-guanbi simple-close"></i>\
		</div>\
		<div class="swiper-container simple-swiper-container">\
			<div class="swiper-wrapper simple-swiper-wrapper"></div>\
		</div>\
		<div class="swiper-pagination simple-swiper-pagination"></div>\
	</div>';
  $(".container").append(dom);
  for (var i = 0, len = imgArr.length; i < len; i++) {
    var item = imgArr[i];
    var slide =
      '\
		<div class="swiper-slide simple-swiper-slide">\
			<div class="slide_zoom_container row-all-center" style="height: 100vh;">\
				<img src="' +
      item +
      '" alt="">\
			</div>\
		</div>';
    $(".simple-swiper-wrapper").append(slide);
  }
  var touchWrap = $(".simple-swiper");
  var touchFather = $(".simple-swiper-container");
  var simpleSwiper = new Swiper(".simple-swiper-container", {
    centeredSlides: true,
    preloadImages: false,
    observer: true,
    keyboardControl: true,
    spaceBetween: 10,
    initialSlide: index,
    pagination: ".simple-swiper-pagination",
    paginationType: "fraction",
    onInit: function(swiper) {
      var touchSon = touchFather.find(".swiper-slide-active").find("img");
      touchImgSimple(touchSon, touchFather, touchWrap, swiper);
    },
    onSlideChangeStart: function(swiper) {
      var touchSon = touchFather.find(".swiper-slide-active").find("img");
      touchImgSimple(touchSon, touchFather, touchWrap, swiper);
    }
  });
  $(".simple-swiper").on("click", ".simple-close", function() {
    touchWrap.fadeOut(200, function() {
      touchWrap.remove();
      simpleSwiper.destroy(false, true);
    });
    $(".container").off("touchmove");
  });
  // 放大
  $(".simple-swiper .slide_zoom_container").each(function() {
    new RTP.PinchZoom($(this), {});
  });
}
function touchImgSimple(son, father, wrap, swiper) {
  // 待优化
  var father = father[0];
  var $wrap = wrap;
  var son = son[0];
  var parentOpacity = 1;
  var imgScale = 1;

  var iw = son.offsetWidth,
    ih = son.offsetHeight;
  var startY, moveY, touchAngle;
  son.addEventListener(
    "touchstart",
    function(ev) {
      if (ev.targetTouches.length === 1) {
        son.style.transition = "";
        son.style.webkitTransition = "";
        father.style.transition = "";
        father.style.webkitTransition = "";

        startY = ev.touches[0].clientY;
        startX = ev.touches[0].clientX;
      }
    },
    false
  );
  son.addEventListener(
    "touchmove",
    function(ev) {
      if (ev.targetTouches.length === 1) {
        moveY = ev.touches[0].clientY - startY;
        moveX = ev.touches[0].clientX - startX;

        parentOpacity = 1 - Math.abs(moveY) / 500;
        imgScale = 1 - Math.abs(moveY) / 500;

        // 触摸滑动角度
        touchAngle = Math.abs(moveY / moveX);
        if (touchAngle > 1 && dragClose) {
          son.style.webkitTransform =
            "translate(" +
            moveX +
            "px, " +
            moveY +
            "px) scale(" +
            imgScale +
            ")";
          son.style.transform =
            "translate(" +
            moveX +
            "px, " +
            moveY +
            "px) scale(" +
            imgScale +
            ")";
          father.style.background = "rgba(0, 0, 0, " + parentOpacity + ")";
        }
      }
    },
    false
  );
  son.addEventListener("touchend", function(ev) {
    if (touchAngle > 1 && dragClose) {
      if (Math.abs(moveY) > 130) {
        son.style.webkitTransition = "all .5s";
        son.style.transition = "all .5s";
        son.style.webkitTransform = "scale(0)";
        son.style.transform = "scale(0)";
        $wrap.fadeOut(200, function() {
          $wrap.remove();
          swiper.destroy(false, true);
        });
        $(".container").off("touchmove");
      } else {
        son.style.webkitTransform = "translateY(0) scale(1)";
        son.style.transform = "translateY(0) scale(1)";
        son.style.webkitTransition = "all .2s";
        son.style.transition = "all .2s";
        father.style.background = "rgba(0, 0, 0, 1)";
        father.style.webkitTransition = "all .5s";
        father.style.transition = "all .5s";
      }
    }
  });
} // 待优化
function checkPhone(str) {
  var reg = /^1\d{10}$/;
  if (str === "") {
    return false;
  } else {
    return reg.test(str.trim());
  }
}
function throttle(method, delay, time) {
  var timeout,
    startTime = new Date();
  return function() {
    var context = this,
      args = arguments,
      curTime = new Date();
    clearTimeout(timeout);
    // 如果达到了规定的触发时间间隔，触发 handler
    if (curTime - startTime >= time) {
      method.apply(context, args);
      startTime = curTime;
      // 没达到触发间隔，重新设定定时器
    } else {
      timeout = setTimeout(method, delay);
    }
  };
}
// 埋点
function visitRecord(key, param) {
  $.ajax({
    url: "/statistics/click",
    type: "get",
    dataType: "json",
    data: { key: key, params: param, activity_no: ACTIVITYNO }
  });
}

// 对document.hidden做前缀处理
function getHiddenProp() {
  var prefixes = ["webkit", "moz", "ms", "o"];
  // if 'hidden' is natively supported just return it
  if ("hidden" in document) return "hidden";
  // otherwise loop over all the known prefixes until we find one
  for (var i = 0; i < prefixes.length; i++) {
    if (prefixes[i] + "Hidden" in document) return prefixes[i] + "Hidden";
  }
  // otherwise it's not supported
  return null;
}
// 获取document.visibilityState属性
function getVisibilityState() {
  var prefixes = ["webkit", "moz", "ms", "o"];
  if ("visibilityState" in document) return "visibilityState";
  for (var i = 0; i < prefixes.length; i++) {
    if (prefixes[i] + "VisibilityState" in document)
      return prefixes[i] + "VisibilityState";
  }
  // otherwise it's not supported
  return null;
}
function audioAutoPlay(id) {
  var audio = document.getElementById(id);
  audio.play();
  function audioInBroswer() {
    audio.play();
    document.removeEventListener("touchstart", audioInBroswer);
  }
  document.addEventListener("touchstart", audioInBroswer);
  document.addEventListener(
    "WeixinJSBridgeReady",
    function() {
      audio.play();
    },
    false
  );
}
// 提示 弹窗
function alertComfirm(title, mes, wrap) {
  var dom =
    '<div class="alert-common col-all-center none" id="confirm-common">\
		<div class="alert-box">\
			<div class="alert-content col-all-center">\
				<p class="alert-title"></p>\
				<p class="alert-mes"></p>\
			</div>\
			<div class="alert-button-box row-all-center">\
				<div class="alert-cancel row-all-center">取消</div>\
				<div class="alert-sure row-all-center">确认</div>\
			</div>\
		</div>\
	</div>';
  $(".container").append(dom);
  if (mes == "") {
    $(wrap)
      .find(".alert-mes")
      .addClass("none");
  } else {
    $(wrap)
      .find(".alert-mes")
      .removeClass("none");
    $(wrap)
      .find(".alert-mes")
      .html(mes);
  }
  $(wrap)
    .find(".alert-title")
    .html(title);
  $(wrap)
    .find(".alert-mes")
    .html(mes);
  $(wrap).removeClass("none");
}
function offComfirm() {
  $("#confirm-common").remove();
  $(".alert-sure").off("click");
}
// 生成二维码
function getQRcode(id, url, size) {
  if (!url || !id) return;
  size = size || 300;
  console.log(url);
  return new QRCode(id, {
    text: url,
    width: softHeight(size),
    height: softHeight(size)
  });
}
// 计算比例
function softHeight(a) {
  return (winW / 375) * a;
}
function hideVideo(bol) {
  bol ? $("video").addClass("none") : $("video").removeClass("none");
}
// 换行
function replaceReturn(str) {
  var regRN = /(\r\n)|(\n)/g;
  str = str.replace(regRN, "<br>");
  return str;
}
// 将<br>换回\n;
function backReturn(str) {
  var regRN = /<br>/g;
  str = str.replace(regRN, "\n");
  return str;
}
