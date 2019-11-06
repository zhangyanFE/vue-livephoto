// 跳pc
var userAgentInfo = navigator.userAgent;
var Agents = new Array(
  "Android",
  "iPhone",
  "SymbianOS",
  "Windows Phone",
  "iPad",
  "iPod"
);
var flag = false;
for (var v = 0; v < Agents.length; v++) {
  if (userAgentInfo.indexOf(Agents[v]) > -1) {
    flag = true;
    break;
  }
}
var isFromSaas = GetSearchParam("from");
if (!flag && isFromSaas !== "saas") {
  window.location.href =
    "//" + HOST + "/activity/live/pc/" + ACTIVITYNO + "/#/" + ISNOWATERSIGN;
}

var isLoading = false, //正在加载
  isOver = false, //是否结束直播
  picShowSwiper = null, // 大图预览实例
  contentSort = 0, // 图片直播、图文、热门
  picLikeArr = [], // 所有自己点过赞的图片hash数组
  bigTagArr = [], // 1-10排名的hash数组
  all = {
    leftHeight: 0,
    rightHeight: 0,
    step: 30,
    theLast: 0,
    theNew: 0,
    fixLocation: [],
    preloadImg: [],
    swiperArr: [],
    total: 0,
    cur: 0
  }, //默认全部 对象
  hot = {
    fixLocation: [],
    preloadImg: [],
    swiperArr: [],
    isHot: false,
    total: 0,
    cur: 0
  }, // 热门 对象
  imgText = {
    fixLocation: [],
    preloadImg: [],
    swiperArr: [],
    count: 0,
    step: 50,
    add: 0,
    data: [],
    total: 0,
    cur: 0
  }, // 图文对象  bol: 是否切换到在图文 has: 是否有图文
  timeLine = {
    fixLocation: [],
    preloadImg: [],
    swiperArr: [],
    count: 0,
    step: 3,
    add: 0,
    data: [],
    theme: 1,
    total: 0,
    cur: 0
  }, // 时间线对象 ,theme: 区分黑白版本
  media = {
    from: 0,
    size: 3,
    albumId: "",
    type: 501,
    end: false
  },
  discuss = {
    from: 0,
    size: 10,
    type: 0,
    sortType: 2,
    end: false
  },
  showPic = {
    from: 0,
    size: 5,
    type: 1,
    sortType: 2,
    end: false
  },
  albumObj = {
    arr: []
  },
  visibleContainer = ".pic-container__waterfall"; // 方便筛选当前排列方式下的picItem

vhall = {
  // 微吼
  scrollTop: 0,
  url: ""
};
timer = {
  all: null,
  album: null // 只检测所在的相册
};
findmeObj = {
  guide: true // 引导
};
puzzledObj = {
  count: 0,
  status: false
};

(scrollEle = ".all"), //滚动哪个区块
  (scrollObj = all), //滚动哪个区块的对象
  (eleStatus = {
    // 一些元素的高度或卷入高度
    navST: 0,
    navH: 0
  }),
  (winIndex = 0), // 全局index
  (hasInsertVideo = false),
  // hasVideoBefore = false,
  (redButtonTimer = null),
  (mesType = "hidden");

var guestDecribeArr = [];
// 初始化
$(eventInit);
$(init);
// 初始化
function init() {
  $(".nav-2")
    .eq(0)
    .attr("id", "picAlbum");
  if (DETAIL.color == 2) {
    $(".detail-title h1").css("color", "#333");
  }

  // 是否有视频
  var hasVideo = false;
  if ((DETAIL.is_sell & 32768) > 0 && DETAIL.media_url) {
    hasVideo = true;
    $(".pull-tip, .floortip-masking").removeClass("none");

    var options = {
      controls: false,
      file: DETAIL.media_url,
      type: "mp4",
      poster: DETAIL.media_url_cover,
      preload: "auto",
      autoplay: false
    };
    player = new QiniuPlayer("video-play", options);
  } else {
    $(".pull-tip, .pull-icon, .floortip-masking").remove();
  }
  // 首页
  var allSwiper = new Swiper(".swiper-container-all", {
    direction: "vertical",
    nextButton: "#floorClose",
    speed: 600,
    initialSlide: 1,
    shortSwipes: false,
    touchRatio: 0.4,
    longSwipesRatio: 0.1,
    allowSwipeToPrev: hasVideo,
    onTap: function(swiper) {
      var index = swiper.activeIndex;
      var trans = swiper.translate;
      if (trans > -winH && trans < 0) {
        var bili = (winH - Math.abs(swiper.translate)) / winH;
        if (index === 1) {
          if (bili > 0.129) {
            allSwiper.slidePrev();
          } else {
            allSwiper.slideNext();
          }
        }
        if (index === 0) {
          if (bili > 0.129) {
            allSwiper.slideNext();
          } else {
            allSwiper.slidePrev();
          }
        }
      }
    },
    onSlideChangeStart: function(swiper) {
      var index = swiper.activeIndex;
      if (index === 0) {
        // 切换时关闭拼图模式
        $(".wrapper").css("z-index", "9999999999");
        $(".puzzle-cancel, #ninegridClose").trigger("click");
        $(".pull-icon, .pull-tip").addClass("none");
      }
    },
    onSlideChangeEnd: function(swiper) {
      var index = swiper.activeIndex;
      if (index === 1) {
        $(".wrapper").css("z-index", "1");
        $(".pull-icon, .pull-tip").removeClass("none");
      }
    },
    onTouchMove: function(swiper) {
      var index = swiper.activeIndex;
      $(".pull-tip").addClass("ani");
    },
    onTouchEnd: function(swiper) {
      var index = swiper.activeIndex;
      $(".pull-tip").removeClass("ani");
    }
  });
  // swiper 内部滚动
  var startScroll, touchStart, touchCurrent;
  allSwiper.slides.on(
    "touchstart",
    function(e) {
      startScroll = this.scrollTop;
      touchStart = e.targetTouches[0].pageY;
    },
    false
  );
  allSwiper.slides.on(
    "touchmove",
    function(e) {
      touchCurrent = e.targetTouches[0].pageY;
      var touchesDiff = touchCurrent - touchStart;
      var slide = this;
      var onlyScrolling =
        slide.scrollHeight > slide.offsetHeight && //allow only when slide is scrollable
        ((touchesDiff < 0 && startScroll === 0) || //start from top edge to scroll bottom
        (touchesDiff > 0 &&
          startScroll === slide.scrollHeight - slide.offsetHeight) || //start from bottom edge to scroll top
          (startScroll > 0 &&
            startScroll < slide.scrollHeight - slide.offsetHeight)); //start from the middle
      if (onlyScrolling) {
        e.stopPropagation();
      }
    },
    false
  );

  getAlbum(); // 获得相册nav
  // 是否有活动名称
  if (DETAIL.name) {
    $(".detail-title h1").html(DETAIL.name);
  }
  // 地点
  if (DETAIL.place) {
    $("#activityPlace, #mes-place").html(DETAIL.place);
  } else {
    $("#activityPlace, #mes-place")
      .parent()
      .addClass("none");
  }
  // 简介
  if (DETAIL.description) {
    $("#activityIntro, #mes-intro").html(DETAIL.description);
  } else {
    $("#activityIntro, #mes-intro")
      .parent()
      .addClass("none");
  }

  // 活动状态状态
  getAllPics(".all", all);
  var status_;
  if (DETAIL.status == 20) {
    window.location.href = "/404";
    return;
  }
  if (DETAIL.status > 5) {
    $(".pic-wait").addClass("none");
  } else {
    $(".pic-wait").removeClass("none");
  }
  if (DETAIL.status == 5) {
    status_ = "人正在等待收看此次图片直播";
    $(".pic-nomore, .count-wrapper").remove();
  } else if (DETAIL.status == 10) {
    status_ = "人正在收看此次图片直播";
  } else {
    status_ = "人已收看此次图片直播";
  }

  var dataShow = DETAIL.data_show;
  if (dataShow === -1) {
    $(".detail-count").addClass("none");
  } else {
    $("#lookStatus").html(status_);
    $("#lookNum").html(DETAIL.view_count);
  }
  // 预加载图片数组
  var preloadImg = [
    "//q.plusx.cn/wechat/liveplus/image/loading-bg.png",
    "//q.plusx.cn/wechat/liveplus/image/red-chai.jpg",
    "//q.plusx.cn/wechat/liveplus/image/red-bag.png",
    "//q.plusx.cn/wechat/liveplus/image/red-rain.png"
  ];
  // 是否有启动屏
  if (
    DETAIL.back_img_param &&
    DETAIL.back_img_param.url &&
    DETAIL.back_img_param.url.indexOf("plus/immediate") > -1
  ) {
    preloadImg.push(DETAIL.back_img_param.url);
  }
  // 是否有头图
  if (DETAIL.head_img) {
    var head = DETAIL.head_img;
    head = head.indexOf("[") > -1 ? JSON.parse(head) : [head];
    var headLen = head.length || 0;
    for (var i = 0; i < headLen; i++) {
      var item =
        '\
      <div class="swiper-slide">\
        <img src="' +
        head[i] +
        '" alt="图片直播">\
      </div>';
      $(".wrapper-banner").append(item);
    }
    $(".wrapper-banner").removeClass("row-all-center");
    var swiperBanner = new Swiper("#swiper-banner", {
      pagination: ".pagination-banner",
      centeredSlides: true
    });
    if (headLen === 1) $(".pagination-banner").addClass("none");
    // preloadImg.push(head[0]);
  } else {
    $(".banner")
      .addClass("noimg")
      .html(DETAIL.name);
  }
  // 头图是否有跳转链接
  if (DETAIL.url) {
    $(".banner-link").attr("data-href", DETAIL.url);
  } else {
    $(".banner-tip2").addClass("none");
  }
  // 其他信息
  var contractor_ = DETAIL.contractor ? JSON.parse(DETAIL.contractor) : [];
  var contractor_len = contractor_.length;
  if (contractor_len) {
    for (var i = 0; i < contractor_len - 3; i++) {
      var contractor_one = contractor_[i];
      var dom_ =
        '\
      <div class="mes-one row-start-start">\
        <span>' +
        contractor_one.title +
        '：</span>\
        <p id="mes-intro">' +
        contractor_one.content +
        "</p>\
      </div>\
      ";
      var dom__ =
        '<p class="detail-content__t row-start-start"><span>' +
        contractor_one.title +
        "：</span><span>" +
        contractor_one.content +
        "</span></p>";
      $("#mesModal .mes-content").append(dom_);
      $(".detail-content").append(dom__);
    }

    // 信息显示或隐藏
    mesType = contractor_.slice(-1)[0].type;
    var mesImg = contractor_.slice(-2)[0].url;
    var mesTime = contractor_.slice(-3)[0].time;
    switch (mesType) {
      case "show":
        $(".detail-content").removeClass("none");
        $(".icon-detail").addClass("none");
        break;
      case "none":
        $(".icon-detail, .detail-content").addClass("none");
        break;
      case "image":
        $(".detail-content").addClass("none");
        $(".icon-detail").removeClass("none");
        $("#mesImage").attr("src", mesImg);
        break;
      default:
        $(".detail-content").addClass("none");
        $(".icon-detail").removeClass("none");
    }
  } else {
    $(".detail-content").addClass("none");
    $(".icon-detail").removeClass("none");
  }

  // 活动时间显示
  if (DETAIL.start_date) {
    modifyMainview(DETAIL.start_date);
    if (DETAIL.start_date === DETAIL.end_date) {
      $("#activityTime, #mes-time").html(
        DETAIL.start_date +
          "&nbsp;&nbsp;&nbsp;" +
          DETAIL.start_time +
          "~" +
          DETAIL.end_time
      );
    } else {
      $("#activityTime, #mes-time").html(
        DETAIL.start_date +
          " " +
          DETAIL.start_time +
          " ~ " +
          DETAIL.end_date +
          " " +
          DETAIL.end_time
      );
    }
  } else {
    $("#activityTime, #mes-time")
      .parent()
      .addClass("none");
  }
  if (mesTime) {
    $("#activityTime, #mes-time").html(mesTime);
  }

  // 自定义页面信息
  var is_sell = DETAIL.is_sell;
  if ((is_sell & 1048576) > 0) {
    $("#picAlbum .nav-2__item")
      .eq(0)
      .addClass("none");
    $("#picAlbum .nav-2__item")
      .eq(1)
      .trigger("click");
  }
  if ((is_sell & 1) <= 0) {
    // $('.ad-service, .homeLink').removeClass('none');
  }
  if ((is_sell & 256) <= 0) {
    $(".try").removeClass("none");
  }
  if ((is_sell & 2) <= 0) {
    $(".ad-photoplus").removeClass("none");
  }

  if ((is_sell & 2048) > 0) {
    var company_des = DETAIL.company_des;
    if (company_des.ad_type == 0) {
      $("#order, #orderRight").remove();
    } else {
      $("#try").remove();
      if ((is_sell & 8388608) > 0) {
        $("#order").remove();
      } else {
        $("#orderRight").remove();
      }
      if (company_des.ad_title) {
        $(".camer-name")
          .parent()
          .html(company_des.ad_title);
      } else {
        $(".camer-name")
          .parent()
          .html("预约咨询");
      }

      company_des.ad_pic
        ? $(".describe-wrapper").before(
            '<img style="width: 100%; margin-bottom: .3rem;" src="' +
              company_des.ad_pic +
              '">'
          )
        : null;

      company_des.ad_phone
        ? $("#camerPhone").html(company_des.ad_phone)
        : $(".camerPhone").remove();
    }
  } else {
    $(".order, .orderRight, .order-wrapper").remove();
  }
  if ((is_sell & 4) > 0) {
    $(".logo").addClass("none");
  }
  if ((is_sell & 8) > 0) {
    document.title = DETAIL.name;
  }
  if ((is_sell & 1024) > 0) {
    document.title = DETAIL.definition_title;
  }
  if ((is_sell & 16) > 0) {
    $("#me").attr("href", "//" + HOST + "/page3/home/me");
  } else {
    $("#me").remove();
  }
  if ((is_sell & 32) <= 0 && (is_sell & 2097152) <= 0) {
    $("#find").remove();
  }
  if ((is_sell & 64) <= 0) {
    $("#hot, .like-box").addClass("none");
  }
  if ((is_sell & 128) <= 0) {
    $("#timeline").addClass("none");
  }
  if ((is_sell & 512) <= 0) {
    $("#textImg").addClass("none");
  }
  if ((is_sell & 65536) <= 0) {
    $("#discuss").addClass("none");
  }
  if ((is_sell & 134217728) <= 0) {
    $("#showPic").addClass("none");
  }
  // 有试用或预约时 评论框样式变化
  if (
    ((is_sell & 2048) > 0 && (is_sell & 8388608) <= 0) ||
    (is_sell & 256) <= 0
  ) {
    $(".discuss-wrapper").addClass("bottom88");
  }

  // 大图是否显示摄影师
  if ((is_sell & 4096) <= 0) {
    $("#camer")
      .parent()
      .remove();
  }
  // 大图是否显示修图师
  if ((is_sell & 8192) <= 0) {
    $("#pser")
      .parent()
      .remove();
  }
  // 是否有打赏
  if ((is_sell & 262144) <= 0) {
    $(".reward-box").addClass("none");
  }
  // 是否有打印
  if ((is_sell & 4194304) <= 0) {
    $(".dayin-box, #yachang").remove();
  }
  // 是否有iframe
  if ((is_sell & 16384) > 0 && DETAIL.video_url) {
    $(".video-live").removeClass("none");
    $(".video-live")
      .find(".video-box")
      .append('<iframe id="iframeWH"></iframe>');
    vhall.url = DETAIL.video_url;
    $("#iframeWH").attr("src", vhall.url);
  }
  if (!(((is_sell & 16384) > 0 && DETAIL.video_url) || DETAIL.cc_room_id)) {
    $(".video-live").remove();
  }
  // 是否有cc视频
  if (DETAIL.cc_room_id) {
    $("head").append(
      '<script src="http://view.csslcloud.net/js/liveSDK.js" type="text/javascript"></script><script src="http://view.csslcloud.net/js/playbackSDK.js" type="text/javascript"></script>'
    );
    setTimeout(function() {
      $(".video-live").removeClass("none");
      ccLive(DETAIL.cc_room_id);
    }, 2000);
  }
  // 是否有音乐
  if ((is_sell & 67108864) > 0 && DETAIL.music_url) {
    $(".icon-yinxiao1").removeClass("none");
    $("#musicPlay").attr("src", DETAIL.music_url);
    audioAutoPlay("musicPlay");
  }
  var preloadObj = {
    imgs: preloadImg,
    loaded: function() {
      $(".container").on("touchmove", touchModal);
      // 是否有密码
      var praviteType = PRAVITE.type;
      var praviteValue = PRAVITE.value;
      switch (praviteType) {
        case 1:
          if (PASSWORD == praviteValue) {
            $(".password-masking").remove();
          }
          break;
        case 2:
          $(".password-masking").remove();
          $("#face-container").removeClass("none");
          break;
        default:
          $(".password-masking").remove();
      }

      if (LANGUAGE)
        $(".checklang span")
          .eq(1)
          .trigger("click");
      $(".masking").addClass("none");

      if (DETAIL.back_img_param && DETAIL.back_img_param.url) {
        setView();
      } else {
        removeMainMasking();
      }
      // 第一次授权返回评论
      var firsGetInfo = GetSearchParam("point");
      if (firsGetInfo && firsGetInfo == "discuss") {
        $("#main-view-enter").trigger("click");
        $("#discuss").trigger("click");
      }
      if (firsGetInfo && firsGetInfo == "showpic") {
        $("#main-view-enter").trigger("click");
        $("#showPic").trigger("click");
      }
      eleStatus.navST =
        $(".banner").outerHeight() +
        $(".detail").outerHeight() +
        $(".guest").outerHeight() +
        $(".video-live").outerHeight();
    }
  };
  // 预加载启动屏和头图
  loadingFun(preloadObj);

  // 是否属于合辑页
  if (DETAIL.father_activity_no) {
    $(".advertisement").addClass("jh");
    getFatherActivity();
  } else {
    $(".jh-button").remove();
  }

  getGuestList(); // 获得嘉宾列表信息
  getLikes(); // 获得点赞的数组
  homeGuide(); //引导页 是否出现
  picTimer(); //定时刷新全部
}
// 事件初始化
function eventInit() {
  // 验证密码
  $(".password-masking").on("click", "#password-enter", praviteVerify);
  // 点击跳过主视觉
  $(".main-masking").on("click", "#main-view-enter", function() {
    removeMainMasking();
  });
  // 点击出现详情
  $(".detail").on("click", ".icon-detail", activityInfoAlert);
  // 点击主办方和嘉宾
  $(".guest").on("click", ".guest-item", activityGuestAlert);
  // 关闭弹层
  $(".container").on("click", ".close", activityCloseAlert);
  $(".container").on("click", ".window-close", closeBarWindow);
  // 视频下载
  $(".photo").on("click", ".video-down", downMedia);
  $(".video-down-wrapper").on("click", "#videoDownClose", closeVideoDown);
  // 切换内容
  $(".nav").on("click", ".nav-1-content__item", switchContent);
  // 切换内容的分类
  $(".nav").on("click", ".nav-1-sort__item", switchSort);
  // 选择分类
  $(".nav").on("click", ".sort-item__list li", chooseSort);
  // 切换图片内的相册
  $(".nav").on("click", "#picAlbum .nav-2__item", switchPicAlbumTab);
  // 切换视频内的相册
  $(".nav").on("click", "#videoAlbum .nav-2__item", switchVideoAlbumTab);
  // 点击图片 展示大图
  $(".photo").on("click", ".picItem", bigPicShow);
  // 关闭大图预览
  $(".swiper-masking").on("click", ".modalClose", closeBigPicShow);
  // 找自己
  $(".pos-box").on("click", ".findMe", findMeInit);
  $(".find-choose-container").on(
    "click",
    ".find-type-bottom__item",
    findMeChoose
  );
  $(".find-container").on(
    "change",
    "#findOnceInput",
    {
      id: "findOnceInput"
    },
    getUploadFile
  );
  $(".find-container").on(
    "change",
    "#faceOnceInput",
    {
      id: "faceOnceInput"
    },
    getUploadFile
  );
  $(".find-container").on("click", "#numberOnce", getNumberPics);
  // 聚合页
  $(".container").on("click", ".jh-button", gatherEntry);
  // 点赞
  $(".swiper-masking").on("click", ".like-box", clickLikes);
  $(".photo").on("click", ".like-box--out", clickOutLikes);
  // 单张分享按钮
  $(".swiper-masking").on(
    "click",
    ".singleShare-box",
    {
      bol: true
    },
    singleShare
  );
  $(".container").on(
    "click",
    "#share",
    {
      bol: false
    },
    singleShare
  );
  // yachan
  $(".swiper-masking").on("click", ".dayin-box", yachanPrint);
  $(".container").on("click", "#yachang", yachanHide);
  // 请求原图
  $(".swiper-masking").on("click", ".originPic-box", requestOriPic);
  // toggle
  $(".swiper-masking").on("click", ".swiper-slide", toggleFade);
  // 时间线 收缩
  $(".timeLine").on("click", ".timeLine-title", shrinkTimeLine);
  // 添加评论
  $(".container").on("click", "#discussButton", discussAdd);
  $(".photo").on("click", ".discuss-item__likeicon", discussLike);
  $(".container").on("focus", "#discussValue", function() {
    wxGetInfo("discuss");
  });
  // 音乐开关
  $(".container").on("click", "#music-switch", switchMusic);
  $(".container").on("blur", "#discussValue", function() {
    $("body").scrollTop($("body").scrollTop());
  });
  $(".container").on("blur", "#password", function() {
    $("body").scrollTop(0);
  });
  // 头图链接
  $(".container").on("click", ".banner-link", function() {
    var href_ = $(this).attr("data-href");
    if (href_) {
      visitRecord("live_button", "head_link");
      window.location.href = href_;
    }
  });
  // 品牌链接
  $(".container").on("click", ".cusWebSite", function() {
    var href_ = $(this).attr("data-href");
    visitRecord("live_button", "bottom_link");
    window.location.href = href_;
  });
  // 滚动行为
  $(".floor2").on("scroll", throttle(scrollAction, 200, 200));
  $document.on("click", closeSlide);
  $(".container").on("click", "#try", function() {
    visitRecord("live_button", "pp_try");
  });
  // 视频播放
  // $('.video-play').on('click', '#videoBox', function() {
  //   player.play();
  // })
}

function activityInfoAlert() {
  // 切换时关闭拼图模式
  $(".puzzle-cancel, #ninegridClose").trigger("click");
  hideVideo(true);
  whModify();
  if (mesType === "image") {
    $("#mesImageModal").fadeIn();
  } else {
    $("#mesModal").fadeIn();
  }
}

function activityGuestAlert(event) {
  var $this = $(this),
    $index = $this.index(),
    a = $this.hasClass("guest-item--small");
  var type = a ? 1 : 2;
  var qrcode = $this.attr("data-qr");
  var link = $this.attr("data-link");

  $(".puzzle-cancel, #ninegridClose").trigger("click");
  hideVideo(true);

  whModify();

  if (type === 2) {
    $("#holderModal").fadeIn();
    $(".sponsor-img").attr("src", $this.attr("data-logo"));
    $(".sponsor-name").html($this.attr("data-name"));
    $(".sponsor-describe").html(guestDecribeArr[$index]);
    $(".sponsor-link").attr("href", link);
    $(".sponsor-qrcode")
      .find("img")
      .attr("src", qrcode);
    removeEle(qrcode, ".sponsor-qrcode");
    removeEle(link, ".sponsor-link");
  } else {
    $("#guestModal").fadeIn();
    $(".guest-img").attr("src", $this.attr("data-logo"));
    $(".guest-name").html($this.attr("data-name"));
    $(".guest-describe").html(guestDecribeArr[$index]);
    $(".guest-link").attr("href", link);
    $(".guest-qrcode")
      .find("img")
      .attr("src", qrcode);
    removeEle(qrcode, ".guest-qrcode");
    removeEle(link, ".guest-link");
  }
}

function activityCloseAlert() {
  $("#holderModal, #guestModal, #mesModal, #guideModal").fadeOut();
  $(".find-container").addClass("none");
  $(".find-choose-container").addClass("none");
  hideVideo(false);
  $("body").css("position", "relative");
}

function closeBarWindow() {
  $(".bar-window").fadeOut();
}
// 切换内容
function switchContent() {
  $(".puzzle-cancel, #ninegridClose").trigger("click");
  setTimeout(function() {
    eleStatus.navH = $(".nav").outerHeight();
  }, 500);
  toTop();

  var $this = $(this),
    $index = $this.index();

  $(".nav-1-content__item").removeClass("active");
  $this.addClass("active");
  $(".nav-1-sort__item, .block, .discuss-wrapper, .xt-button").addClass("none");
  $(
    ".advertisement, .pos-box, .count-wrapper, .jh-button, .pic-wait"
  ).removeClass("none");

  if ($index !== 0) {
    $("#picAlbum").slideUp(200);
    visibleContainer = ".pic-container";
  }
  if ($index !== 1) {
    $("#videoAlbum").slideUp(200);
  }
  if ($index === 1 || $index === 6 || $index === 2) {
    $(
      ".advertisement, .pos-box, .count-wrapper, .jh-button, .pic-wait"
    ).addClass("none");
    $(".pic-loading__top").removeClass("hide");
  }

  hot.isHot = false;
  switch ($index) {
    case 1:
      $(".media").removeClass("none");
      scrollEle = ".media";
      scrollObj = media;
      $("#videoAlbum").slideDown(200);
      $(".media .pic-container")
        .css("height", winH)
        .find(".media-item--new")
        .remove();
      media.from = 0;
      media.end = false;
      media.albumId = "";
      // if ((DETAIL.is_sell & 1048576) > 0) {
      //   $('#videoAlbum .nav-2__item').eq(1).trigger('click');
      // } else {
      //   $('#videoAlbum .nav-2__item').eq(0).trigger('click');
      // }
      getMedia();
      break;
    case 2:
      $(".showPic, .xt-button").removeClass("none");
      scrollEle = ".showPic";
      scrollObj = showPic;
      $(".showPic .pic-container")
        .css("height", winH)
        .html("");
      showPic.from = 0;
      showPic.end = false;
      getShowPic();
      $("#discuss-select").removeClass("none");
      var tip = window.localStorage.getItem("showpictip");
      if (tip === "false") {
        $(".xt-tip").addClass("none");
      } else {
        setTimeout(function() {
          $(".xt-tip").fadeOut();
          window.localStorage.setItem("showpictip", "false");
        }, 3000);
      }
      break;
    case 3:
      $(".imgText").removeClass("none");
      scrollEle = ".imgText";
      scrollObj = imgText;
      scrollObj.cur = 0;
      getImageTextPics();
      break;
    case 4:
      $(".timeLine").removeClass("none");
      scrollEle = ".timeLine";
      scrollObj = timeLine;
      scrollObj.cur = 0;
      getTimelinePics();
      break;
    case 5:
      $(".hot").removeClass("none");
      scrollEle = ".hot";
      scrollObj = hot;
      scrollObj.cur = 0;
      hot.isHot = true; //用于热门图片点开大图 有个排名的标识
      getHotPics();
      break;
    case 6:
      $(".discuss, .discuss-wrapper").removeClass("none");
      scrollEle = ".discuss";
      scrollObj = discuss;
      $("#discuss-select").removeClass("none");

      $(".discuss .pic-container")
        .css("height", winH)
        .html("");
      discuss.from = 0;
      discuss.end = false;
      getDiscuss();
      // 评论界面 关闭弹幕 (red.js)
      var danmuStatus = $("#danmu-switch").attr("data-status");
      if (danmuStatus === "1") {
        $("#danmu-switch")
          .addClass("icon-danmu-guan")
          .removeClass("icon-danmu")
          .attr("data-status", "0");
        clearBullet();
      }
      break;
    default:
      scrollEle = ".all";
      scrollObj = all;
      visibleContainer = $(".pic-container__waterfall").hasClass("none")
        ? ".pic-container__tiled"
        : ".pic-container__waterfall";
      $("#all-select").removeClass("none");
      if (!$("#picAlbum").hasClass("none")) $("#picAlbum").slideDown(200);
      $(".all").removeClass("none");
      if ((DETAIL.is_sell & 1048576) > 0) {
        $("#picAlbum .nav-2__item")
          .eq(1)
          .trigger("click");
      } else {
        $("#picAlbum .nav-2__item")
          .eq(0)
          .trigger("click");
      }
  }
}
// 切换分类
function switchSort(e) {
  e.stopPropagation();
  var $this = $(this),
    $index = $this.index();
  contentSort = $index;
  $this.find("ul").slideToggle(200);
}
// 选择分类
function chooseSort(e) {
  e.stopPropagation();
  var $this = $(this),
    $index = $this.index(),
    $val = $this.html();
  $this.parent().slideUp(200);
  $this
    .parents(".nav-1-sort__item")
    .find(".nav-sort__cur")
    .html($val);
  switch (contentSort) {
    case 1:
      switchDiscussSort($index);
      break;
    default:
      switchPicDisplay($index);
  }
}
// 切换相册tab
function switchPicAlbumTab() {
  var $this = $(this),
    $index = $this.index();
  var albumId = $this.attr("data-id"); //相册的id
  var newTip = !$this.find("i").hasClass("none"); // 新图的提示
  hot.isHot = false;

  // 切换时关闭拼图模式
  $(".puzzle-cancel, #ninegridClose").trigger("click");

  // 清除红点
  $this.find("i").addClass("none");

  // 切换nav的样式
  $("#picAlbum .nav-2__item").removeClass("active");
  $this.addClass("active");

  // 滚动至顶部
  toTop();

  $(".block").addClass("none");

  // 判断相册的显示状态
  if (albumId == 0) {
    $(".all").removeClass("none");
    scrollEle = ".all";
    scrollObj = all;
    if (newTip) {
      scrollObj.fixLocation = [];
      scrollObj.swiperArr = [];
      scrollObj.preloadImg = [];
      scrollObj.theNew = 0;
      scrollObj.step = 30;
      scrollObj.cur = 0;
      $(scrollEle)
        .find(
          ".waterfall-container__left, .waterfall-container__right, .pic-container__tiled"
        )
        .empty();
      $("#all")
        .find("i")
        .addClass("none");
      getAllPics(scrollEle, scrollObj);
    }
  } else {
    $(".album" + albumId).removeClass("none");
    scrollEle = ".album" + albumId;
    scrollObj = albumObj.arr[$index - 1];

    clearInterval(timer.album); //取消上一个定时器
    albumInterVal($this, scrollObj, albumId); // 开启相应相册对应的定时器
    $("#count-current").html("0");

    // // 相册图片首次加载
    // if (scrollObj && !scrollObj.albumNew) {
    //   getAlbumPics(scrollEle, scrollObj);
    //   scrollObj.albumNew = true;
    // }
    // 相册有新图进图
    if (newTip) {
      scrollObj.fixLocation = [];
      scrollObj.swiperArr = [];
      scrollObj.preloadImg = [];
      scrollObj.step = 30;
      scrollObj.cur = 0;
      $(scrollEle)
        .find(
          ".waterfall-container__left, .waterfall-container__right, .pic-container__tiled"
        )
        .empty();
      $("#all")
        .find("i")
        .addClass("none");
      getAlbumPics(scrollEle, scrollObj);
    }
  }
  // 改变图片总数
  $("#count-total").html(scrollObj.total);
}

function switchVideoAlbumTab() {
  var $this = $(this),
    $index = $this.index();
  // 切换nav的样式
  $("#videoAlbum .nav-2__item").removeClass("active");
  $this.addClass("active");
  // 取相册id
  $(".media .pic-container")
    .css("height", winH)
    .find(".media-item--new")
    .remove();
  media.from = 0;
  media.end = false;
  var albumId = $this.attr("data-id") || "";
  media.albumId = albumId;
  getMedia();
}
// 切换展示方式
function switchPicDisplay(index) {
  // 关闭拼图模式
  $(".puzzle-cancel, #ninegridClose").trigger("click");

  if (index === 0) {
    visibleContainer = ".pic-container__waterfall";
    $(".pic-container__tiled").addClass("none");
    $(".pic-container__waterfall")
      .find(".waterfall-container__left, .waterfall-container__right")
      .removeClass("none");
    $(".pic-container__waterfall").css("width", "100%");
  } else {
    visibleContainer = ".pic-container__tiled";
    $(".pic-container__waterfall").css("width", "0");
    $(".pic-container__waterfall")
      .find(".waterfall-container__left, .waterfall-container__right")
      .addClass("none");
    $(".pic-container__tiled").removeClass("none");
  }
  // 回到顶部
  toTop();
}
// 点开大图
function bigPicShow() {
  var $this = $(this);
  $(".container").on("touchmove", touchModal);
  yachanShow();
  // 付费模式下默认无大图，去支付
  if (!$this.attr("data-big")) {
    PAY.hash = $this.attr("data-hash");
    PAY.money = PAYMONEY;
    PAY.type = 1;
    var camerOrretoucher =
      $this.attr("data-camer") == "--"
        ? $this.attr("data-retoucher")
        : $this.attr("data-camer");
    $(".pay-avator").attr("src", $this.attr("data-avator"));
    $(".pay-camer").html(camerOrretoucher);
    $("#pay-money").html(PAYMONEY);
    $("#pay-wrapper").removeClass("none");
    return;
  }

  hideVideo(true);
  // 4.2.4
  // var getOri = $('#imgShowModal .swiper-slide-active img').attr('data-getOri');
  // getOri === 'yes' ? $('#origin-picSize, #orgin-title').addClass('none') : $('#origin-picSize, #orgin-title').removeClass('none');

  var likeCount_ = $this.attr("data-likeCount"); //喜欢改图的数量
  var thisHash = $this.attr("data-hash"); //hash
  var thisSrc = $this.attr("data-src") || $this.attr("src");
  var showIndex = scrollObj.fixLocation.indexOf(thisSrc);
  var showNum = scrollObj.fixLocation.length;
  var add = showIndex,
    reduce = showIndex,
    oneOrTwo = 0,
    dom = "";
  var camer_ = $this.attr("data-camer") || "--";
  var retoucher_ = $this.attr("data-retoucher") || "--";
  var midsize_ = $this.attr("data-midSize");
  var orisize_ = $this.attr("data-oriSize");
  var time = $this.attr("data-time");
  var name_ = $this.attr("data-name");
  var rcount_ =
    $this.attr("data-rcount") * 1 > 0 ? $this.attr("data-rcount") : "打赏";
  midsize_ =
    midsize_ / (1024 * 1024) >= 1
      ? (midsize_ / (1024 * 1024)).toFixed(1) + "MB"
      : parseInt(midsize_ / 1024) + "KB";
  orisize_ =
    orisize_ / (1024 * 1024) >= 1
      ? (orisize_ / (1024 * 1024)).toFixed(1) + "MB"
      : parseInt(orisize_ / 1024) + "KB";
  $("#camer").html(camer_);
  $("#pser").html(retoucher_);
  $("#picSize").html(midsize_);
  $("#origin-picSize").html(orisize_);
  $("#pub-time").html(time);
  $("#like-num").html(likeCount_);
  $("#picName").html(name_);
  $(".reward-box p").html(rcount_);
  likeStatus(likeCount_);

  testLike(thisHash); // 自己是否点过赞

  dom =
    '\
  <div class="swiper-slide">\
  <div class="slide_zoom_container row-all-center" style="height: ' +
    winH +
    'px">\
  <img class="swiper-lazy big_img_slide" data-src="' +
    scrollObj.swiperArr[showIndex].big_img +
    '" data-hash="' +
    scrollObj.swiperArr[showIndex].pic_hash +
    '"\
  data-midSize="' +
    scrollObj.swiperArr[showIndex].middle_size +
    '" data-camer="' +
    scrollObj.swiperArr[showIndex].camer +
    '" data-retoucher="' +
    scrollObj.swiperArr[showIndex].retoucher +
    '" data-name="' +
    scrollObj.swiperArr[showIndex].pic_name +
    '" data-rcount="' +
    scrollObj.swiperArr[showIndex].reward_count +
    '"\
  data-time="' +
    scrollObj.swiperArr[showIndex].create_time +
    '" data-ori="' +
    scrollObj.swiperArr[showIndex].origin_img +
    '" data-oriSize="' +
    scrollObj.swiperArr[showIndex].pic_size +
    '" data-likeCount="' +
    scrollObj.swiperArr[showIndex].like_count +
    '" data-avator="' +
    scrollObj.swiperArr[showIndex].camer_head +
    '" data-avator2="' +
    scrollObj.swiperArr[showIndex].retoucher_head +
    '" onload=loadOnePic(this)>\
  </div>\
  </div>';
  $(".imgShowSwiper .swiper-wrapper").append(dom);
  picShowSwiper = new Swiper(".imgShowSwiper", {
    centeredSlides: true,
    preloadImages: false,
    lazyLoading: true,
    observer: true,
    keyboardControl: true,
    initialSlide: oneOrTwo,
    onInit: function() {
      var father = $(".imgShowSwiper");
      var thisBigImg = $(".imgShowSwiper .swiper-slide-active .big_img_slide");
      var hash_ = thisBigImg.attr("data-hash");
      // 查看记录hash
      picAjax("pic_view", hash_);
      // 长按记录hash
      thisBigImg.longPress(function() {
        picAjax("pic_down", hash_);
      });
      touchImg(thisBigImg, father); //下拉或上拉  关闭预览
      testBigTag(hash_); //大图是否有排名标签
    },
    onSlideChangeStart: function() {
      // $('.loading-box').addClass('none');

      var father = $(".imgShowSwiper");
      var thisBigImg = $(".imgShowSwiper .swiper-slide-active .big_img_slide");
      var hash_ = thisBigImg.attr("data-hash");
      var camer_ =
        thisBigImg.attr("data-camer") &&
        thisBigImg.attr("data-camer") !== "null"
          ? thisBigImg.attr("data-camer")
          : "--";
      var retoucher_ =
        thisBigImg.attr("data-retoucher") &&
        thisBigImg.attr("data-retoucher") !== "null"
          ? thisBigImg.attr("data-retoucher")
          : "--";
      var midsize_ = thisBigImg.attr("data-midSize");
      var orisize_ = thisBigImg.attr("data-oriSize");
      var time = $this.attr("data-time");
      var name_ = thisBigImg.attr("data-name");
      var rcount_ =
        thisBigImg.attr("data-rcount") * 1 > 0
          ? thisBigImg.attr("data-rcount")
          : "打赏";
      // 4.2.4
      // var getOri = $('#imgShowModal .swiper-slide-active img').attr('data-getOri');

      // 4.2.4
      // if(getOri == 'yes') {
      //   midsize_ = thisBigImg.attr('data-oriSize');
      //   $('#origin-picSize, #orgin-title').addClass('none');
      // } else {
      //   $('#origin-picSize, #orgin-title').removeClass('none');
      // }
      midsize_ =
        midsize_ / (1024 * 1024) >= 1
          ? (midsize_ / (1024 * 1024)).toFixed(1) + "MB"
          : parseInt(midsize_ / 1024) + "KB";
      orisize_ =
        orisize_ / (1024 * 1024) >= 1
          ? (orisize_ / (1024 * 1024)).toFixed(1) + "MB"
          : parseInt(orisize_ / 1024) + "KB";
      $("#picSize").html(midsize_);
      $("#origin-picSize").html(orisize_);
      $("#camer").html(camer_);
      $("#pser").html(retoucher_);
      $("#pub-time").html(time);
      $("#picName").html(name_);
      $(".reward-box p").html(rcount_);
      testLike(hash_); // 自己是否点过赞

      picAjax("pic_view", hash_);
      thisBigImg.longPress(function() {
        picAjax("pic_down", hash_);
      });

      touchImg(thisBigImg, father); //下拉或上拉  关闭预览
      testBigTag(hash_); //大图是否有排名标签
      //利用hash去获得列表中likecount的数量 方法不好 暂用
      $(scrollEle)
        .find(".picItem")
        .each(function() {
          var $this_ = $(this);
          var thisHash = $this_.attr("data-hash");
          if (thisHash == hash_) {
            var thisCount = $this_.attr("data-likeCount");
            $("#like-num").html(thisCount);
            likeStatus(thisCount);
          }
        });
    },
    onSlidePrevEnd: function(swiper) {
      reduce--;
      if (reduce >= 0) {
        var dom =
          '\
        <div class="swiper-slide">\
        <div class="slide_zoom_container row-all-center" style="height: ' +
          winH +
          'px">\
        <img class="swiper-lazy big_img_slide" data-src="' +
          scrollObj.swiperArr[reduce].big_img +
          '" data-hash="' +
          scrollObj.swiperArr[reduce].pic_hash +
          '" data-midSize="' +
          scrollObj.swiperArr[reduce].middle_size +
          '"\
        data-camer="' +
          scrollObj.swiperArr[reduce].camer +
          '" data-retoucher="' +
          scrollObj.swiperArr[reduce].retoucher +
          '" data-name="' +
          scrollObj.swiperArr[reduce].pic_name +
          '" data-rcount="' +
          scrollObj.swiperArr[reduce].reward_count +
          '"\
        data-time="' +
          scrollObj.swiperArr[reduce].create_time +
          '" data-ori="' +
          scrollObj.swiperArr[reduce].origin_img +
          '" data-oriSize="' +
          scrollObj.swiperArr[reduce].pic_size +
          '" data-likeCount="' +
          scrollObj.swiperArr[reduce].like_count +
          '" data-avator="' +
          scrollObj.swiperArr[reduce].camer_head +
          '" data-avator2="' +
          scrollObj.swiperArr[reduce].retoucher_head +
          '" onload=loadOnePic(this)>\
        </div>\
        </div>';
        picShowSwiper.prependSlide(dom);
        picShowSwiper.update(true);
      }
      var $this = $(".imgShowSwiper .swiper-slide-prev .slide_zoom_container");
      new RTP.PinchZoom($this, {});
    },
    onSlideNextStart: function() {
      add++;
      if (add < showNum) {
        var dom =
          '\
        <div class="swiper-slide">\
        <div class="slide_zoom_container row-all-center" style="height: ' +
          winH +
          'px">\
        <img class="swiper-lazy big_img_slide" data-src="' +
          scrollObj.swiperArr[add].big_img +
          '" data-hash="' +
          scrollObj.swiperArr[add].pic_hash +
          '" data-midSize="' +
          scrollObj.swiperArr[add].middle_size +
          '" data-camer="' +
          scrollObj.swiperArr[add].camer +
          '" data-retoucher="' +
          scrollObj.swiperArr[add].retoucher +
          '" data-name="' +
          scrollObj.swiperArr[add].pic_name +
          '" data-rcount="' +
          scrollObj.swiperArr[add].reward_count +
          '"\
        data-time="' +
          scrollObj.swiperArr[add].create_time +
          '" data-ori="' +
          scrollObj.swiperArr[add].origin_img +
          '" data-oriSize="' +
          scrollObj.swiperArr[add].pic_size +
          '" data-likeCount="' +
          scrollObj.swiperArr[add].like_count +
          '" data-avator="' +
          scrollObj.swiperArr[add].camer_head +
          '" data-avator2="' +
          scrollObj.swiperArr[add].retoucher_head +
          '" onload=loadOnePic(this)>\
        </div>\
        </div>';
        picShowSwiper.appendSlide(dom);
        picShowSwiper.update(true);
      }
      var $this = $(".imgShowSwiper .swiper-slide-next .slide_zoom_container");
      new RTP.PinchZoom($this, {});
    }
  });
  // 付费模式下 大图不创建新的slide
  if (!ISPAY) {
    if (showIndex == 0 && showNum > 1) {
      add++;
      var dom =
        '\
      <div class="swiper-slide">\
      <div class="slide_zoom_container row-all-center" style="height: ' +
        winH +
        'px">\
      <img class="swiper-lazy big_img_slide" data-src="' +
        scrollObj.swiperArr[add].big_img +
        '" data-hash="' +
        scrollObj.swiperArr[add].pic_hash +
        '" data-midSize="' +
        scrollObj.swiperArr[add].middle_size +
        '" data-camer="' +
        scrollObj.swiperArr[add].camer +
        '" data-retoucher="' +
        scrollObj.swiperArr[add].retoucher +
        '"\
      data-name="' +
        scrollObj.swiperArr[add].pic_name +
        '" data-rcount="' +
        scrollObj.swiperArr[add].reward_count +
        '"\
      data-time="' +
        scrollObj.swiperArr[add].create_time +
        '" data-ori="' +
        scrollObj.swiperArr[add].origin_img +
        '" data-oriSize="' +
        scrollObj.swiperArr[add].pic_size +
        '" data-likeCount="' +
        scrollObj.swiperArr[add].like_count +
        '" data-avator="' +
        scrollObj.swiperArr[add].camer_head +
        '" data-avator2="' +
        scrollObj.swiperArr[add].retoucher_head +
        '" onload=loadOnePic(this)>\
      </div>\
      </div>';
      picShowSwiper.appendSlide(dom);
      picShowSwiper.update(true);
    } else if (showIndex == showNum - 1 && showNum > 1) {
      reduce--;
      var dom =
        '\
      <div class="swiper-slide">\
      <div class="slide_zoom_container row-all-center" style="height: ' +
        winH +
        'px">\
      <img class="swiper-lazy big_img_slide" data-src="' +
        scrollObj.swiperArr[reduce].big_img +
        '" data-hash="' +
        scrollObj.swiperArr[reduce].pic_hash +
        '" data-midSize="' +
        scrollObj.swiperArr[reduce].middle_size +
        '" data-camer="' +
        scrollObj.swiperArr[reduce].camer +
        '" data-retoucher="' +
        scrollObj.swiperArr[reduce].retoucher +
        '" data-name="' +
        scrollObj.swiperArr[reduce].pic_name +
        '" data-rcount="' +
        scrollObj.swiperArr[reduce].reward_count +
        '"\
      data-time="' +
        scrollObj.swiperArr[reduce].create_time +
        '" data-ori="' +
        scrollObj.swiperArr[reduce].origin_img +
        '" data-oriSize="' +
        scrollObj.swiperArr[reduce].pic_size +
        '" data-likeCount="' +
        scrollObj.swiperArr[reduce].like_count +
        '" data-avator="' +
        scrollObj.swiperArr[reduce].camer_head +
        '" data-avator2="' +
        scrollObj.swiperArr[reduce].retoucher_head +
        '" onload=loadOnePic(this)>\
      </div>\
      </div>';
      picShowSwiper.prependSlide(dom);
      picShowSwiper.update(true);
    } else if (showIndex != 0 && showIndex != showNum - 1 && showNum > 2) {
      add++;
      reduce--;
      var domPrev =
        '\
      <div class="swiper-slide">\
      <div class="slide_zoom_container row-all-center" style="height: ' +
        winH +
        'px">\
      <img class="swiper-lazy big_img_slide" data-src="' +
        scrollObj.swiperArr[reduce].big_img +
        '" data-hash="' +
        scrollObj.swiperArr[reduce].pic_hash +
        '" data-midSize="' +
        scrollObj.swiperArr[reduce].middle_size +
        '" data-camer="' +
        scrollObj.swiperArr[reduce].camer +
        '" data-retoucher="' +
        scrollObj.swiperArr[reduce].retoucher +
        '"\
      data-name="' +
        scrollObj.swiperArr[reduce].pic_name +
        '" data-rcount="' +
        scrollObj.swiperArr[reduce].reward_count +
        '"\
      data-time="' +
        scrollObj.swiperArr[reduce].create_time +
        '" data-ori="' +
        scrollObj.swiperArr[reduce].origin_img +
        '" data-oriSize="' +
        scrollObj.swiperArr[reduce].pic_size +
        '" data-likeCount="' +
        scrollObj.swiperArr[reduce].like_count +
        '" data-avator="' +
        scrollObj.swiperArr[reduce].camer_head +
        '" data-avator2="' +
        scrollObj.swiperArr[reduce].retoucher_head +
        '" onload=loadOnePic(this)>\
      </div>\
      </div>';
      console.log(picShowSwiper);
      picShowSwiper.prependSlide(domPrev);
      picShowSwiper.update(true);
      var domNext =
        '\
      <div class="swiper-slide">\
      <div class="slide_zoom_container row-all-center" style="height: ' +
        winH +
        'px">\
      <img class="swiper-lazy big_img_slide" data-src="' +
        scrollObj.swiperArr[add].big_img +
        '" data-hash="' +
        scrollObj.swiperArr[add].pic_hash +
        '" data-midSize="' +
        scrollObj.swiperArr[add].middle_size +
        '" data-camer="' +
        scrollObj.swiperArr[add].camer +
        '" data-retoucher="' +
        scrollObj.swiperArr[add].retoucher +
        '" data-name="' +
        scrollObj.swiperArr[add].pic_name +
        '" data-rcount="' +
        scrollObj.swiperArr[add].reward_count +
        '"\
      data-time="' +
        scrollObj.swiperArr[add].create_time +
        '" data-ori="' +
        scrollObj.swiperArr[add].origin_img +
        '" data-oriSize="' +
        scrollObj.swiperArr[add].pic_size +
        '" data-likeCount="' +
        scrollObj.swiperArr[add].like_count +
        '" data-avator="' +
        scrollObj.swiperArr[add].camer_head +
        '" data-avator2="' +
        scrollObj.swiperArr[add].retoucher_head +
        '" onload=loadOnePic(this)>\
      </div>\
      </div>';
      picShowSwiper.appendSlide(domNext);
      picShowSwiper.update(true);
    }
  }

  $("#imgShowModal")
    .fadeIn()
    .find(".imgShowSwiper")
    .fadeIn();

  // 图片放大
  $(".slide_zoom_container").each(function() {
    new RTP.PinchZoom($(this), {});
  });

  // 点击记录hash
  picAjax("pic_click", thisHash);
}
// 关闭大图
function closeBigPicShow() {
  $(".container").off("touchmove");
  hideVideo(false);
  $(".loading-box").addClass("none");
  $("#imgShowModal").fadeOut(200, function() {
    picLikeArr = []; //关闭时清空 自己点赞过图片的数组
    getLikes(); // 重新获取一次；
    $("#imgShowModal .modal_footer").fadeIn();
    $(".imgShowSwiper .swiper-wrapper").empty();
    picShowSwiper.destroy(false, true);
  });
}
// 关闭下拉栏
function closeSlide() {
  $(".sort-item__list").slideUp(200);
}
// 滚动时执行
function scrollAction() {
  var photo_height = $(".photo").outerHeight();
  var this_st = $(".floor2").scrollTop();
  vhall.scrollTop = this_st;
  // 当前图片位置
  var container = $(scrollEle + " " + visibleContainer);
  container =
    visibleContainer === ".pic-container__waterfall"
      ? container.find(".waterfall-container__right")
      : container;
  var items = container.find(".picItem");
  var itemsLen = items.length;
  var curNum = Math.ceil((itemsLen * this_st) / (photo_height - 400));
  var cur = items.eq(curNum);
  cur[0]
    ? $("#count-current").html(cur.attr("data-cur"))
    : $("#count-current").html(scrollObj.total);

  // 红包按钮
  $("#redButton").addClass("rotate");
  if (this_st < 200) {
    $(".floor2").removeClass("swiper-no-swiping");
  } else {
    $(".floor2").addClass("swiper-no-swiping");
  }
  // 加载图片
  if (this_st > photo_height + eleStatus.navST - winH * 3) {
    var notList = [
      ".imgText",
      ".timeLine",
      ".hot",
      ".discuss",
      ".media",
      ".showPic"
    ];
    if (!isLoading && notList.indexOf(scrollEle) < 0) {
      isLoading = true;
      loadMorePic(scrollEle, scrollObj);
    }
    if (scrollEle === ".imgText") {
      scrollImageTextPics();
    }
    if (scrollEle === ".timeLine" && timeLine.add < timeLine.count) {
      scrollTimeLinePics();
    }
    if (!isLoading && !discuss.end && scrollEle === ".discuss") {
      getDiscuss();
    }
    if (!isLoading && !showPic.end && scrollEle === ".showPic") {
      getShowPic();
    }
    if (scrollEle === ".media" && !isLoading && !media.end) {
      getMedia();
    }
  }
  // 相册悬浮
  if (this_st > eleStatus.navST) {
    $(".nav")
      .addClass("float")
      .appendTo(".container");
    albumObj.arr.length > 0
      ? $(".pos-top").addClass("float1")
      : $(".pos-top").addClass("float2");
    $(".photo").css("padding-top", eleStatus.navH + "px");
    if (
      scrollEle !== ".discuss" &&
      scrollEle !== ".media" &&
      scrollEle !== ".showPic"
    )
      $(".count-wrapper").removeClass("none");
    var isDiscuss =
      $(".nav-1-content")
        .find(".active")
        .attr("id") === "discuss";
    if (isDiscuss) $(".nav-1-content").scrollLeft(200);
  } else {
    $(".nav")
      .removeClass("float")
      .insertBefore(".photo");
    $(".pos-top").removeClass("float1 float2");
    $(".photo").css("padding-top", 0);
    if (
      scrollEle !== ".discuss" ||
      scrollEle !== ".media" ||
      scrollEle !== ".showPic"
    )
      $(".count-wrapper").addClass("none");
    var isDiscuss =
      $(".nav-1-content")
        .find(".active")
        .attr("id") === "discuss";
    if (isDiscuss) $(".nav-1-content").scrollLeft(200);
  }

  clearTimeout(redButtonTimer);
  redButtonTimer = setTimeout(function() {
    scrollEnd(this_st);
  }, 100);
}
// 滚动时加载图片
function loadMorePic(scrollEle, scrollObj) {
  scrollObj.step = 30;
  picsWhere(scrollEle, scrollObj);
}
// 获取所有图片 每次只请求picstep30张
function getAllPics(ele, obj) {
  $(".pic-loading__top").removeClass("hide");
  $.ajax({
    url: "/activity/live/pics",
    type: "get",
    dataType: "json",
    data: {
      activityNo: ACTIVITYNO,
      picIndex: obj.theNew,
      isNew: false,
      count: 500,
      ppSign: ISNOWATERSIGN,
      test: "test"
    },
    success: function(data) {
      if (data.success) {
        var result = data.result;
        var picsArr = result.pics_array;
        obj.total = result.pics_total;
        $("#count-total").html(obj.total);
        if (picsArr.length > 0) {
          $(".pic-wait").remove();

          obj.theNew = picsArr[picsArr.length - 1].pic_index;

          for (var i = 0, len = picsArr.length; i < len; i++) {
            obj.fixLocation.push(picsArr[i].small_img); //用于图片定位的数组
          }
          obj.preloadImg = obj.preloadImg.concat(picsArr);
          obj.swiperArr = obj.swiperArr.concat(picsArr);

          picsWhere(ele, obj);

          if (picsArr.length === 500) {
            getAllPics(ele, obj);
          } else {
            obj.theLast = obj.swiperArr[0].pic_index;
          }
        }
        if (obj.total === 0) {
          $(".pic-wait").removeClass("none");
          $(".pic-nomore").remove();
        }
      }
      $(".pic-loading__top").addClass("hide");
      getMediaTrigger();
    }
  });
}
// 获得相应相册的图片
function getAlbumPics(ele, obj) {
  $(".pic-loading__top").removeClass("hide");
  $.ajax({
    url: "/activity/live/album/one",
    type: "get",
    dataType: "json",
    data: {
      albumId: obj.id,
      picIndex: 0,
      count: 5000,
      isNew: false,
      ppSign: ISNOWATERSIGN
    },
    success: function(data) {
      var pics = data.result.pics;
      if (data.success && pics.length > 0) {
        obj.total = pics.length;
        $("#count-total").html(obj.total);

        obj.theLast = pics[0].pic_index;
        for (var i = 0, len = pics.length; i < len; i++) {
          obj.fixLocation.push(pics[i].small_img);
        }
        obj.preloadImg = pics.concat();
        obj.swiperArr = pics.concat();
        picsWhere(ele, obj);
      } else {
        if (DETAIL.status !== 5 && all.total !== 0)
          $(ele)
            .find(".pic-no")
            .removeClass("none");
      }
      $(".pic-loading__top").addClass("hide");
    }
  });
}
// 获取主办方及嘉宾
function getGuestList() {
  $.ajax({
    url: "/activity/live/guest/list",
    type: "get",
    dataType: "json",
    data: {
      activityNo: ACTIVITYNO
    },
    success: function(data) {
      var result = data.result;
      var guestList = result.guest_list;
      var brandList = result.band_list;
      // 是否有嘉宾
      if (data.success && guestList && guestList.length > 0) {
        $(".guest").removeClass("none");
        var guestDom = "";
        for (var i = 0, len = guestList.length; i < len; i++) {
          if (guestList[i].type == 2) {
            var guestDom_one =
              '\
            <li class="guest-item col-start-center" data-name="' +
              guestList[i].name +
              '"\
              data-qr="' +
              guestList[i].qr_code +
              '" data-logo="' +
              guestList[i].big_img +
              '" data-link="' +
              guestList[i].url +
              '">\
              <div class="guest-item__avator" style="background-image:url(' +
              guestList[i].big_img +
              ')"></div>\
              <p class="guest-item__name">' +
              guestList[i].name +
              '</p>\
              <span class="guest-item__title">' +
              guestList[i].title +
              "</span>\
            </li>\
            ";
          } else {
            var guestDom_one =
              '\
            <li class="guest-item guest-item--small col-start-center" data-name="' +
              guestList[i].name +
              '"\
              data-qr="' +
              guestList[i].qr_code +
              '" data-logo="' +
              guestList[i].big_img +
              '" data-link="' +
              guestList[i].url +
              '">\
              <div class="guest-item__avator" style="background-image:url(' +
              guestList[i].big_img +
              ')"></div>\
              <p class="guest-item__name">' +
              guestList[i].name +
              '</p>\
              <span class="guest-item__title">' +
              guestList[i].title +
              "</span>\
            </li>\
            ";
          }
          guestDom += guestDom_one;
          guestDecribeArr.push(guestList[i].description);
        }
        $(".guest-wrapper").append(guestDom);
      } else {
        $(".guest").remove();
      }

      // 相册栏距顶部高度
      eleStatus.navST =
        $(".banner").outerHeight() +
        $(".detail").outerHeight() +
        $(".guest").outerHeight() +
        $(".video-live").outerHeight();

      // 是否有品牌信息
      if (data.success && brandList && brandList.length > 0) {
        var customerDom = "";
        for (var i = 0, len = brandList.length; i < len; i++) {
          var customer_one =
            '\
          <div class="ad-guest col-start-center">\
          <div class="ad-title row-all-center">\
          <span class="ad-title__content">' +
            brandList[i].name +
            "</span>\
          </div>\
          " +
            (function() {
              if (brandList[i].description) {
                return (
                  '<p class="ad-content">' + brandList[i].description + "</p>"
                );
              } else {
                return "";
              }
            })() +
            (function() {
              if (brandList[i].big_img) {
                return (
                  '<img src="' + brandList[i].big_img + '" class="cusLogoImg">'
                );
              } else {
                return "";
              }
            })() +
            (function() {
              if (brandList[i].url) {
                return (
                  '<a data-href="' +
                  brandList[i].url +
                  '" class="cusWebSite row-all-center">前往相关页面&gt;</a>'
                );
              } else {
                return "";
              }
            })() +
            "</div>";
          customerDom += customer_one;
        }
        $(".ad-container").append(customerDom);
      }
      // 更换皮肤
      changeTheme(DETAIL.color);
      // 切换语言
      if (LANGUAGE) interprete(".guest", "en");
    }
  });
}

// 相册
function getAlbum() {
  $.ajax({
    async: false,
    url: "/activity/live/albums",
    type: "get",
    dataType: "json",
    data: {
      activityNo: ACTIVITYNO,
      count: 1000
    },
    success: function(data) {
      if (data.success && data.result.length > 0) {
        var result = data.result;

        for (var i = 0, len = result.length; i < len; i++) {
          var navLiDom =
            '\
          <li class="nav-2__item" data-id="' +
            result[i].album_id +
            '">' +
            result[i].name +
            "\
            <i></i>\
          </li>";
          var albumEle =
            '\
          <div class="album' +
            result[i].album_id +
            ' block none">\
            <div class="pic-container row-start-center">\
              <div class="pic-container__waterfall">\
                <div class="waterfall-container__left"></div>\
                <div class="waterfall-container__right"></div>\
              </div>\
              <div class="pic-container__tiled flex-wrap none"></div>\
            </div>\
            <p class="pic-no none">暂无图片</p>\
          </div>';

          var album = {
            bol: true,
            theLast: 0,
            preloadImg: [],
            fixLocation: [],
            swiperArr: [],
            newImgArr: [],
            leftHeight: 0,
            rightHeight: 0,
            total: 0,
            cur: 0,
            id: result[i].album_id
          };
          albumObj.arr.push(album);
          $("#picAlbum ul").append(navLiDom);
          $(".photo").append(albumEle);
        }
      } else {
        $("#picAlbum").addClass("none");
      }
    }
  });
  // 视频相册
  $.ajax({
    async: false,
    url: "/activity/live/albums",
    type: "get",
    dataType: "json",
    data: {
      activityNo: ACTIVITYNO,
      count: 1000,
      albumType: 3
    },
    success: function(data) {
      if (data.success && data.result.length > 0) {
        var result = data.result;
        for (var i = 0, len = result.length; i < len; i++) {
          var navLiDom =
            '\
          <li class="nav-2__item" data-id="' +
            result[i].album_id +
            '">' +
            result[i].name +
            "\
            <i></i>\
          </li>";
          $("#videoAlbum ul").append(navLiDom);
        }
      } else {
        $("#videoAlbum").remove();
      }
      eleStatus.navH = $(".nav").outerHeight();
      // 切换语言
      if (LANGUAGE) interprete(".guest", "en");
    }
  });
}

function picsWhere(ele, obj) {
  if (obj.preloadImg.length > 0 && obj.step > 0) {
    $(".pic-loading__bottom").removeClass("hide");
    var first_ = obj.preloadImg.shift(),
      picType_ = first_.pic_type,
      src_ = first_.small_img,
      hash_ = first_.pic_hash,
      bigSrc_ = first_.big_img,
      oriSrc_ = first_.origin_img,
      camer_ = first_.camer || "--",
      avator_ = first_.camer_head || first_.retoucher_head,
      retoucher_ = first_.retoucher || "--",
      midsize_ = first_.middle_size,
      orisize_ = first_.pic_size,
      likeCount_ = first_.like_count,
      createTime_ = first_.create_time;
    rcount_ = first_.reward_count;
    name_ = first_.pic_name;
    obj.step--;
    var isGif =
      first_.small_img.indexOf(".gif") > -1
        ? '<img class="gifSign" src="//q.plusx.cn/wechat/live/image/live4/gif.png">'
        : "";
    var hasPayDom =
      ISPAY && first_.big_img
        ? '<i class="iconfont icon-jiaobiao jiaobiao"></i>'
        : "";
    var unselected = DETAIL.color == 2 ? "unselectedw" : "unselected"; //无法选择时的图片样式 分黑白
    var oldPicSelect = puzzledObj.count >= 9 ? unselected : "";
    var oldSelectTag = puzzledObj.count >= 9 ? "none" : "";
    var oldPicSelectShow = puzzledObj.status ? "" : "none";

    // 当前图片的序号，用于显示当前图片所处位置
    obj.cur++;
    obj.cur = obj.cur < obj.total ? obj.cur : obj.total;
    // 瀑布流
    var picTypeClass_ = "";
    if (picType_ === 1) {
      picTypeClass_ = "picType1";
    } else if (picType_ === 2) {
      picTypeClass_ = "picType2";
    } else {
      picTypeClass_ = "picType3";
    }

    var picDom =
      '\
    <div class="pic_item picItem ' +
      picTypeClass_ +
      ' " data-src="' +
      src_ +
      '" data-time="' +
      createTime_ +
      '" data-hash="' +
      hash_ +
      '" data-big="' +
      bigSrc_ +
      '"\
    data-midSize="' +
      midsize_ +
      '" data-ori="' +
      oriSrc_ +
      '" data-oriSize="' +
      orisize_ +
      '" data-likeCount="' +
      likeCount_ +
      '"\
    data-cur="' +
      obj.cur +
      '" data-camer="' +
      camer_ +
      '" data-retoucher="' +
      retoucher_ +
      '" data-avator="' +
      avator_ +
      '" data-name="' +
      name_ +
      '" data-rcount="' +
      rcount_ +
      '" style="background-image:url(' +
      src_ +
      ')">\
    ' +
      isGif +
      "\
    " +
      hasPayDom +
      '\
    <div class="picSelect ' +
      oldPicSelect +
      " " +
      oldPicSelectShow +
      '">\
    <span class="select-tag ' +
      oldSelectTag +
      '"></span>\
    </div>\
    </div>';

    var left = $(ele).find(".waterfall-container__left"),
      right = $(ele).find(".waterfall-container__right");
    obj.leftHeight = left.height();
    obj.rightHeight = right.height();
    obj.leftHeight <= obj.rightHeight
      ? left.append(picDom)
      : right.append(picDom);
    // 平铺
    var tiledDom =
      '\
    <div class="pic_item picItem tiled_item" data-src="' +
      src_ +
      '" data-time="' +
      createTime_ +
      '" data-hash="' +
      hash_ +
      '"\
    data-big="' +
      bigSrc_ +
      '" data-midSize="' +
      midsize_ +
      '" data-ori="' +
      oriSrc_ +
      '" data-oriSize="' +
      orisize_ +
      '" data-likeCount="' +
      likeCount_ +
      '"\
    data-cur="' +
      obj.cur +
      '" data-camer="' +
      camer_ +
      '" data-retoucher="' +
      retoucher_ +
      '" data-avator="' +
      avator_ +
      '" data-name="' +
      name_ +
      '" data-rcount="' +
      rcount_ +
      '" style="background-image:url(' +
      src_ +
      ')">\
    ' +
      isGif +
      "\
    " +
      hasPayDom +
      '\
    <div class="picSelect ' +
      oldPicSelect +
      " " +
      oldPicSelectShow +
      '">\
    <span class="select-tag ' +
      oldSelectTag +
      '"></span>\
    </div>\
    </div>';
    var tiled = $(ele).find(".pic-container__tiled");
    tiled.append(tiledDom);

    if (DETAIL.color == 2) $(".select-tag").addClass("white"); //白色的拼图勾选
    picsWhere(ele, obj);
  } else {
    $(".pic-loading__bottom").addClass("hide");
    isLoading = false;
  }
  if (obj.preloadImg.length <= 0) {
    isOver = true;
    setTimeout(function() {
      $(ele)
        .find(".pic-nomore")
        .removeClass("none");
    }, 500);
  }
}

// 轮询新图
function picTimer() {
  timer.all = setInterval(function() {
    $.ajax({
      url: "/activity/live/pics",
      type: "get",
      dataType: "json",
      data: {
        activityNo: ACTIVITYNO,
        picIndex: all.theLast,
        // picIndex: 0,
        isNew: true,
        count: 1000,
        ppSign: ISNOWATERSIGN
      },
      success: function(data) {
        if (data.success) {
          $("#lookNum").html(data.result.view_count);
          if (data.result.pics_array.length > 0) {
            $(".pic-wait").addClass("none");
            $("#picAlbum .nav-2__item")
              .eq(0)
              .find("i")
              .removeClass("none");
            $("#all")
              .find("i")
              .removeClass("none");
          }
        }
      }
    });
  }, 30000);
}
// 统计点击量
function picAjax(value, hash_) {
  $.ajax({
    url: "/statistics/picClick",
    type: "get",
    dataType: "json",
    data: {
      key: value,
      params: hash_,
      activity_no: ACTIVITYNO
    }
  });
}
// cc视频
function ccLive(roomid_) {
  $.ajax({
    url: "/activity/live/bokecc",
    type: "get",
    dataType: "json",
    data: {
      roomId: roomid_
    },
    success: function(data) {
      if (data.success) {
        var liveid_ = data.result.liveId;
        if (liveid_ && liveid_ == "is_living") {
          $(".video-live")
            .find(".video-box")
            .append('<div id="livePlayer"></div>');
          DWLive.init({
            userid: "33DAEE6345188E32",
            roomid: roomid_
          });
        } else if (liveid_ && liveid_.length > 1) {
          $(".video-live")
            .find(".video-box")
            .append('<div id="playbackPlayer"></div>');
          $.DW.config({
            userId: "33DAEE6345188E32",
            roomId: roomid_,
            liveId: liveid_
          });
        }
      }
    }
  });
}

//swiper大图加载
function loadOnePic(ele) {
  var imgSrc_ = $(ele).attr("src");
  var img_ = new Image();
  img_.src = imgSrc_;
  img_.onload = function() {
    $(ele)
      .parents(".swiper-slide")
      .css("background", "transparent");
  };
}
// 相册检测
function albumInterVal(curAlbum, obj, id) {
  timer.album = setInterval(function() {
    $.ajax({
      url: "/activity/live/album/one",
      type: "get",
      dataType: "json",
      data: {
        albumId: id,
        picIndex: obj.theLast,
        count: 1000,
        isNew: true,
        ppSign: ISNOWATERSIGN
      },
      success: function(data) {
        if (data.success && data.result.pics.length > 0) {
          curAlbum.find("i").removeClass("none");
          $("#all")
            .find("i")
            .removeClass("none");
        }
      }
    });
  }, 30000);
}
// 获得热门图片
function getHotPics() {
  $(".hot .pic-container")
    .addClass("row-start-start")
    .html("")
    .css("height", winH);
  $(".pic-loading__top").removeClass("hide");
  hot.fixLocation = [];
  hot.add = 0;
  $.ajax({
    url: "/activity/live/album/like",
    type: "get",
    dataType: "json",
    data: {
      activityNo: ACTIVITYNO,
      from: 0,
      size: 100,
      ppSign: ISNOWATERSIGN
    },
    success: function(data) {
      if (data.success) {
        var pics = data.result.pics;
        var picsArr = [];
        hot.total = pics.length || 0;
        $("#count-total").html(hot.total);
        for (var i = 0; i < hot.total; i++) {
          hot.fixLocation.push(pics[i].small_img);
          if (i < 10) {
            bigTagArr.push(pics[i].pic_hash);
          }
        }
        solveHotPics(pics);
        hot.swiperArr = pics.concat();
      }
      $(".hot .pic-container").css("height", "auto");
    }
  });
}
// 处理热门图片
function solveHotPics(pics) {
  for (var i = 0, len = pics.length; i < len && 100; i++) {
    // 当前图片的序号，用于显示当前图片所处位置
    hot.cur++;
    hot.cur = hot.cur < hot.total ? hot.cur : hot.total;
    var camer_ = pics[i].camer || "--";
    var avator_ = pics[i].camer_head || pics[i].retoucher_head;
    var retoucher_ = pics[i].retoucher || "--";
    var name_ = pics[i].pic_name;
    var rcount_ = pics[i].reward_count;

    var hasPayDom =
      ISPAY && pics[i].big_img
        ? '<i class="iconfont icon-jiaobiao jiaobiao"></i>'
        : "";
    var payText = pics[i].big_img
      ? ""
      : '<p class="nopay-masking-p">购买成功后<br>可点击下载原图</p>';

    var bs = pics[i].big_img ? pics[i].big_img : pics[i].small_img;
    var isnopay = pics[i].big_img ? "" : "filterblur";

    var likeNum = pics[i].like_count;
    var userLike = pics[i].like
      ? "icon-dianzanhou like-ani"
      : "icon-dianzanqian";
    var likeStatus = likeNum > 0 ? likeNum : "";

    var bigHot =
      '\
    <div class="hot-item-big hot-item picItem" data-src="' +
      pics[i].small_img +
      '" data-hash="' +
      pics[i].pic_hash +
      '" data-big="' +
      pics[i].big_img +
      '" data-midSize="' +
      pics[i].middle_size +
      '" data-time="' +
      pics[i].create_time +
      '" data-ori="' +
      pics[i].origin_img +
      '"\
    data-cur="' +
      hot.cur +
      '" data-camer="' +
      camer_ +
      '" data-retoucher="' +
      retoucher_ +
      '" data-avator="' +
      avator_ +
      '" data-oriSize="' +
      pics[i].pic_size +
      '" data-name="' +
      name_ +
      '" data-rcount="' +
      rcount_ +
      '"\
    data-likeCount="' +
      likeNum +
      '">\
    <img src="' +
      bs +
      '" class="' +
      isnopay +
      '">\
    ' +
      payText +
      "\
    " +
      hasPayDom +
      '\
    <div class="picSelect none">\
    <span class="select-tag"></span>\
    </div>\
    <div class="like-box--out col-all-center">\
      <i class="iconfont ' +
      userLike +
      ' like no-shrink"></i>\
      <p><span class="like-num--out" data-num="' +
      likeNum +
      '">' +
      likeStatus +
      "</span></p>\
    </div>\
    </div>";
    var smallHot =
      '\
    <div class="hot-item-small hot-item fadeIn picItem" data-src="' +
      pics[i].small_img +
      '" data-hash="' +
      pics[i].pic_hash +
      '" data-big="' +
      pics[i].big_img +
      '" data-midSize="' +
      pics[i].middle_size +
      '" data-time="' +
      pics[i].create_time +
      '" data-ori="' +
      pics[i].origin_img +
      '"\
    data-cur="' +
      hot.cur +
      '" data-camer="' +
      camer_ +
      '" data-retoucher="' +
      retoucher_ +
      '" data-avator="' +
      avator_ +
      '" data-oriSize="' +
      pics[i].pic_size +
      '" data-name="' +
      name_ +
      '" data-rcount="' +
      rcount_ +
      '"\
    data-likeCount="' +
      pics[i].like_count +
      '">\
    ' +
      hasPayDom +
      '\
    <div class="picSelect none">\
    <span class="select-tag"></span>\
    </div>\
    <div class="like-box--out col-all-center">\
      <i class="iconfont ' +
      userLike +
      ' like no-shrink"></i>\
      <p><span class="like-num--out" data-num="' +
      likeNum +
      '">' +
      likeStatus +
      "</span></p>\
    </div>\
    </div>";
    i < 2
      ? $(".hot .pic-container").append(bigHot)
      : $(".hot .pic-container").append(smallHot);

    if (i < 2) {
      $(".hot-item")
        .eq(i)
        .append(
          '<p class="no-sign-big row-all-center" data-bigTag=' +
            i +
            "><span>No.</span>" +
            (i + 1) +
            "</p>"
        );
    } else if (i >= 2 && i < 10) {
      $(".hot-item")
        .eq(i)
        .append(
          '<p class="no-sign-small row-all-center" data-bigTag=' +
            i +
            ">" +
            (i + 1) +
            ".</p>"
        );
    }
  }

  hotLoad();
  $(".pic-loading__top").addClass("hide");

  if (DETAIL.color == 2) $(".select-tag").addClass("white");
}
// 加载热门图片
function hotLoad() {
  if ($(".fadeIn").length > 0) {
    var $self = $(".fadeIn").eq(0);
    var img_ = new Image();
    img_.src = $self.attr("data-src");
    img_.onload = function() {
      $self.css("background-image", "url(" + img_.src + ")");
      $self.removeClass("fadeIn");
      hotLoad();
    };
    img_.onerror = function() {
      $self.remove();
      hotLoad();
    };
  }
}
// 获得点赞的hash数组
function getLikes() {
  $.ajax({
    url: "/activity/live/pic/like/info",
    type: "get",
    dataType: "json",
    data: {
      activityNo: ACTIVITYNO
    },
    success: function(data) {
      if (data.success) {
        var picLike = data.result.picLike;
        for (var k in picLike) {
          picLikeArr.push(k);
        }
      }
    }
  });
}
// 点赞操作
function clickLikes(e) {
  var $this = $(this).find(".like");
  var num = parseInt($("#like-num").html());
  var hash_ = $("#imgShowModal .swiper-slide-active img").attr("data-hash");
  var likeCount_ = $("#imgShowModal .swiper-slide-active img").attr(
    "data-likeCount"
  );
  if (!$this.hasClass("like-ani")) {
    num++;
    $("#like-num").html(num);
    likeStatus(num);

    $(scrollEle)
      .find(".picItem")
      .each(function() {
        var $this_ = $(this);
        var thisHash = $this_.attr("data-hash");
        if (thisHash == hash_) {
          $this_.attr("data-likeCount", num);
        }
      });
    visitRecord("pic_button", "pic_like");
    iLike(hash_, 5);
    $this.removeClass("icon-dianzanqian").addClass("icon-dianzanhou");
  } else {
    num--;
    $("#like-num").html(num);
    likeStatus(num);
    //利用hash去获得列表中likecount的数量 方法不好 暂用
    $(scrollEle)
      .find(".picItem")
      .each(function() {
        var $this_ = $(this);
        var thisHash = $this_.attr("data-hash");
        var thisCount = $this_.attr("data-likeCount");
        if (thisHash == hash_) {
          $this_.attr("data-likeCount", --thisCount);
        }
      });
    iLike(hash_, -1);
    $this.addClass("icon-dianzanqian").removeClass("icon-dianzanhou");
  }
  $this.toggleClass("like-ani");
}
// 外部点赞
function clickOutLikes(e) {
  e.stopPropagation();
  var $this = $(this).find(".like");
  var $likeWord = $(this).find(".like-num--out");
  var num = $likeWord.attr("data-num") * 1;
  var hash_ = $(this)
    .parent()
    .attr("data-hash");
  if (!$this.hasClass("like-ani")) {
    num++;
    $likeWord.html(num);
    likeStatus(num);

    visitRecord("pic_button", "pic_like");
    iLike(hash_, 5);
    $this.removeClass("icon-dianzanqian").addClass("icon-dianzanhou");
  } else {
    num--;
    var status = num == 0 ? "" : num;
    $likeWord.html(status);

    likeStatus(num);
    iLike(hash_, -1);
    $this.addClass("icon-dianzanqian").removeClass("icon-dianzanhou");
  }
  $likeWord.attr("data-num", num);
  $this.toggleClass("like-ani");
}
// 点赞状态切换
function likeStatus(count) {
  if (count > 0) {
    $("#like-no").addClass("none");
    $("#like-num")
      .removeClass("none")
      .html(count);
  } else {
    $("#like-num").addClass("none");
    $("#like-no").removeClass("none");
  }
}
// 点赞请求
function iLike(hash_, status) {
  $.ajax({
    url: "/activity/live/pic/add/like",
    type: "get",
    dataType: "json",
    data: {
      picHash: hash_,
      status: status
    },
    success: function(data) {
      if (data.success) {
        status == 5
          ? picLikeArr.push(hash_)
          : picLikeArr.splice($.inArray(hash_, picLikeArr), 1);
      }
    }
  });
}
// 匹配自己是否点赞
function testLike(hash_) {
  if (picLikeArr.indexOf(hash_) > -1) {
    $(".modal_footer")
      .find(".like")
      .addClass("like-ani")
      .addClass("icon-dianzanhou")
      .removeClass("icon-dianzanqian");
  } else {
    $(".modal_footer")
      .find(".like")
      .removeClass("like-ani")
      .removeClass("icon-dianzanhou")
      .addClass("icon-dianzanqian");
  }
}
// 大图内是否有标识
function testBigTag(hash_) {
  $(".bigNoTag-big, .bigNoTag-small").remove();
  if (hot.isHot && bigTagArr.indexOf(hash_) > -1) {
    var no_ = bigTagArr.indexOf(hash_) + 1;
    no_ < 3
      ? $("#imgShowModal").append(
          '<p class="bigNoTag-big row-all-center"><span>No.</span>' +
            no_ +
            "</p>"
        )
      : $("#imgShowModal").append(
          '<p class="bigNoTag-small row-all-center">' + no_ + ".</p>"
        );
  }
}
// 单张分享按钮
function singleShare(event) {
  var bol = event.data.bol;
  if (bol) {
    visitRecord("pic_button", "pic_share");
    var hash_ = $("#imgShowModal .swiper-slide-active img").attr("data-hash");
    $("#share").fadeIn();
    shareLink = "//" + HOST + "/activity/live/pic/one/" + hash_;
  } else {
    $("#share").fadeOut();
    shareLink = window.location.href;
  }
  getRealLink();
  changeShareLink();
}

// 请求原图
function requestOriPic() {
  visitRecord("pic_button", "pic_origin");
  $(".loading--box").removeClass("none");
  // 4.2.4
  // $('#imgShowModal .swiper-slide-active img').attr('data-getOri', 'yes');
  var oriSrc = $("#imgShowModal .swiper-slide-active img").attr("data-ori");
  // 4.2.4
  // var oriSize = $('#origin-picSize').html();
  var oriImg = new Image();
  oriImg.src = oriSrc;
  oriImg.onload = function() {
    $("#imgShowModal .swiper-slide-active img").attr("src", oriSrc);
    // 4.2.4
    // $('#picSize').html(oriSize);
    // $('#origin-picSize, #orgin-title').addClass('none');
    $(".loading--box").addClass("none");
    toast("当前已是原图");
  };
  oriImg.onerror = function() {
    $(".loading--box").addClass("none");
    toast("请求原图失败");
  };
}
// 控制显示隐藏一些元素
function removeEle(something, ele) {
  if (something == "null" || !something || something == "undefined") {
    $(ele).addClass("none");
  } else {
    $(ele).removeClass("none");
  }
}
// 引导页
function homeGuide() {
  if (GUIDE && GUIDE === "false") {
    $("#guideModal, .floortip-masking").removeClass("none");
    $("#guideModal").click(removeHomeGuide);
    $(".floortip-masking").click(removeFloortip);
  } else {
    $("#guideModal, #yachang, .floortip-masking").remove();
  }
}
// 雅昌
function yachanShow() {
  if (GUIDE && GUIDE === "false") {
    $("#yachang").fadeIn();
  }
}

function yachanHide() {
  $("#yachang").remove();
}

function yachanPrint() {
  var ori = $("#imgShowModal .swiper-slide-active img").attr("data-ori");
  // var oriEncode = encodeURIComponent(ori);
  window.location.href =
    "http://mobile.artup.com/sendToArtron.html?urlType=1001&channelCode=chengying&imagesUrls=http:" +
    ori;
}
// 去除引导页cookie
function removeHomeGuide() {
  $(this).fadeOut(200);
  $.ajax({
    url: "/home/guide/remove",
    type: "get",
    dataType: "json",
    data: {
      activityNo: ACTIVITYNO
    }
  });
}

function removeFloortip() {
  $(this).fadeOut(200);
}
// 是否有主会场信息
function getFatherActivity() {
  var URL =
    HOST.indexOf("test") > -1
      ? "//" + HOST + "/activity/live/" + DETAIL.first_activity_no
      : "//" + HOST + "/activity/live/" + DETAIL.first_activity_no;
  $("#go-jh").attr("href", URL);
  $("#title-jh").html(DETAIL.father_activity_name);
  var theme = DETAIL.father_activity_them;
  for (var i = 0, len = DETAIL.father_activity_list.length; i < len; i++) {
    var resultList_ = DETAIL.father_activity_list[i];
    var status_ = resultList_.activity_status;

    // 替换host 后台无法处理
    var url = "";
    if (resultList_.type !== 301) {
      var urlArr = resultList_.activity_url.split("/");
      urlArr[2] = HOST;
      url = urlArr.join("/");
    } else {
      url = resultList_.activity_url;
    }
    // 替换host 后台无法处理

    var isLink = 'href="' + url + '"';
    // var subList = resultList_.activity_list ? JSON.stringify(resultList_.activity_list) : '""';
    var subList = "";
    var domb_ = "";

    if (theme == 10) {
      domb_ =
        "\
      <a " +
        isLink +
        " data-list=" +
        subList +
        ' data-theme="' +
        resultList_.theme +
        '" class="day_btn row-start-center" data-no="' +
        resultList_.activity_no +
        '" style="border-color: ' +
        resultList_.color +
        '">\
        <span class="day_title">' +
        resultList_.title +
        '</span>\
        <span class="arrow_right"><i class="iconfont icon-gengduo" style="color: ' +
        resultList_.color +
        '"></i></span>\
      </a>';
    }
    if (theme == 11) {
      domb_ =
        "<a " +
        isLink +
        " data-list=" +
        subList +
        ' data-theme="' +
        resultList_.theme +
        '"  style="border:none;background-image:url(' +
        resultList_.little_img +
        ')" class="day_btn row-start-center" data-no="' +
        resultList_.activity_no +
        '"></a>';
    }
    if (theme == 12) {
      domb_ =
        "<a " +
        isLink +
        " data-list=" +
        subList +
        ' data-theme="' +
        resultList_.theme +
        '"  data-title="' +
        resultList_.title +
        '" class="list-item--fang row-start-center" style="background-image:url(' +
        resultList_.little_img +
        ');" data-no="' +
        resultList_.activity_no +
        '">\
                <span class="list-item__title">' +
        resultList_.title +
        "</span>\
              </a>";
    }
    $(".jh-box").append(domb_);
  }
}
// 找自己 悬浮
function findMeInit() {
  visitRecord("live_button", "find_me");
  $(".puzzle-cancel, #ninegridClose").trigger("click");
  hideVideo(true);
  whModify();

  var is_sell = DETAIL.is_sell;
  if ((is_sell & 32) > 0 && (is_sell & 2097152) > 0) {
    $(".find-choose-container").removeClass("none");
  } else {
    if ((is_sell & 32) > 0) {
      findMeNext(1);
    } else if ((is_sell & 2097152) > 0) {
      findMeNext(0);
    }
  }
}

function findMeChoose() {
  $(".find-choose-container").addClass("none");
  var $this = $(this),
    $index = $this.index();
  findMeNext($index);
}

function findMeNext(index) {
  if (index === 0) {
    $("#number-container").removeClass("none");
  } else {
    if (findmeObj.guide) {
      $("#find-container").removeClass("none");
      findmeObj.guide = false;
    } else {
      $("#find-container")
        .find("input")
        .trigger("click");
    }
  }
}
// 找自己 引导
// function findMeGuide() {
//   $('.pos-box').find('input').trigger('click');
//   $('.find-container').fadeOut();
//   $('video').removeClass('none');
// }
// 上传图片 8.20
function getUploadFile(ev) {
  var id = ev.data.id;
  var target = document.getElementById(id);
  var file = target.files[0];
  target.value = "";
  var limitSize = 6; // mb

  var fileName = file.name;
  fileName = fileName.replace(/-/g, "_");

  var myDate = new Date();
  var timestamp_ =
    myDate.getFullYear().toString() +
    (myDate.getMonth() + 1).toString() +
    myDate.getDate().toString() +
    myDate.getHours().toString() +
    myDate.getMinutes().toString() +
    myDate.getSeconds().toString() +
    myDate.getMilliseconds().toString();

  var key = "/plus/user/findme/" + USERID + "/" + timestamp_;
  var token = TOKEN;
  var putExtra = {
    fname: "",
    params: {},
    mimeType: ["image/png", "image/jpeg"]
  }; // 4
  var config = {
    domain: "https://s.plusx.cn"
  }; // 5

  var observer = {
    next(res) {
      $(".masking").removeClass("none");
    },
    error(err) {
      $(".masking").addClass("none");
      toast("服务器异常");
    },
    complete(res) {
      var key = res.key,
        hash = res.hash;
      $.ajax({
        type: "get",
        dataType: "json",
        url: "/home/pic/add",
        data: {
          url: key,
          hash: hash,
          activityNo: ACTIVITYNO
        },
        success: function(data) {
          var isSign = PRAVITE.type == 2 ? "?type=face" : "?type=find";
          window.location.href = "/page1/home/findme" + isSign;
          $(".masking").addClass("none");
        },
        error: function(data) {
          $(".masking").addClass("none");
          toast("服务器异常");
        }
      });
    }
  };
  // // 上传前压缩
  // var options = {
  //   quality: 0.8,
  //   noCompressIfLarger: true,
  //   maxHeight: 800
  // }
  var observable = qiniu.upload(file, key, token, putExtra, config);
  var subscription = observable.subscribe(observer); // 上传开始
}

function getNumberPics() {
  var val = $("#searchNumber").val();
  if (!/^[A-Za-z0-9]+$/.test(val)) {
    toast("请输入字母或数字");
    return;
  }
  var isSign = "?type=number&value=" + val;
  window.location.href = "/page1/home/findme" + isSign;
}
// 点击出现聚合页入口
function gatherEntry() {
  $("video").toggleClass("none");
  $(".jh-container").fadeToggle();
  $(".jh-container-inner").toggleClass("active");
  $(this).toggleClass("active");
  $(".jh-button__1, .jh-button__2").toggleClass("none");
  whModify();
}
// 设置主视觉
function setView() {
  var view = DETAIL.back_img_param.url;
  var text = DETAIL.back_img_param.text
    ? DETAIL.back_img_param.text
    : "进入图片直播";
  var time = DETAIL.back_img_param.time;
  var timeOpen = DETAIL.back_img_param.open;
  var size = DETAIL.back_img_param.size;
  $("#main-view").css("background-image", "url(" + view + ")");

  addMainViewAni(view);
  timeOpen ? viewInterval(time) : $(".main-view-interval").remove();
  if (size == 2) {
    $(".main-view-enter")
      .addClass("small")
      .append('<i class="iconfont icon-gengduo"></i>')
      .find("span")
      .html("跳过");
  } else {
    $("#main-view-enter span").html(text);
  }
}
// 主视觉倒计时
function viewInterval(second) {
  $(".main-view-interval").html(second);
  var viewInterval_ = setInterval(function() {
    second--;
    $(".main-view-interval").html(second);
    if (second === 0) {
      removeMainMasking();
      clearInterval(viewInterval_);
    }
  }, 1000);
}

function removeMainMasking() {
  $(".container").off("touchmove");
  $(".main-masking").remove();
}

// 获取时间线图片总数
function getTimelinePics() {
  $(".pic-loading__top").removeClass("hide");
  $(".timeLine .pic-container")
    .css("height", winH)
    .html("");
  timeLine.fixLocation = [];
  timeLine.swiperArr = [];
  timeLine.count = 0;
  timeLine.add = 0;
  timeLine.total = 0;
  timeLine.data = [];
  $.ajax({
    url: "/activity/live/album/timeline",
    type: "get",
    dataType: "json",
    data: {
      activityNo: ACTIVITYNO,
      from: 0,
      size: 4000,
      ppSign: ISNOWATERSIGN
    },
    success: function(data) {
      if (data.success) {
        var result = data.result;
        if (result instanceof Array && result.length > 0) {
          timeLine.count = result.length;
          timeLine.data = result;
          for (var i = 0; i < result.length; i++) {
            for (var j = 0; j < result[i].picList.length; j++) {
              timeLine.total++;
              timeLine.fixLocation.push(result[i].picList[j].small_img);
            }
            timeLine.swiperArr = timeLine.swiperArr.concat(result[i].picList);
          }
          $("#count-total").html(timeLine.total);
          scrollTimeLinePics();
        }
        $(".pic-loading__top").addClass("hide");
        $(".timeLine .pic-container").css("height", "auto");
      }
    }
  });
}
// 滚动加载时间线
function scrollTimeLinePics() {
  for (var i = 0; i < timeLine.step && timeLine.add < timeLine.count; i++) {
    var timeline_one = timeLine.data[timeLine.add];
    var timeLineTheme = DETAIL.color == 2 ? "white" : "";
    var timeLineDom =
      '\
    <div class="timeLine-one col-start-start">\
      <div class="timeLine-one-outer">\
      <div class="timeLine-title row-start-center">\
        <span class="iconfont icon-yuandian timeLine-dot ' +
      timeLineTheme +
      '">\
          <i class="timeLine-line"></i>\
        </span>\
        <span class="timeLine-time ' +
      timeLineTheme +
      '">' +
      timeline_one.name +
      '</span>\
        <span class="iconfont icon-shuangjiantouyou timeLine-shrink ' +
      timeLineTheme +
      '"></span>\
      </div>\
      <div class="timeLine-picbox flex-wrap">\
        ' +
      (function() {
        var timeline_picDomAll = "";
        for (var j = 0, j_len = timeline_one.picList.length; j < j_len; j++) {
          // 当前图片的序号，用于显示当前图片所处位置
          timeLine.cur++;
          timeLine.cur =
            timeLine.cur < timeLine.total ? timeLine.cur : timeLine.total;
          // 图片信息
          var timeline_picOne = timeline_one.picList[j];
          var src_ = timeline_picOne.small_img,
            hash_ = timeline_picOne.pic_hash,
            bigSrc_ = timeline_picOne.big_img,
            oriSrc_ = timeline_picOne.origin_img,
            midsize_ = timeline_picOne.middle_size,
            orisize_ = timeline_picOne.pic_size,
            likeCount_ = timeline_picOne.like_count,
            createTime_ = timeline_picOne.create_time,
            camer_ = timeline_picOne.camer || "--",
            avator_ =
              timeline_picOne.camer_head || timeline_picOne.retoucher_head,
            retoucher_ = timeline_picOne.retoucher || "--",
            name_ = timeline_picOne.pic_name,
            rcount_ = timeline_picOne.reward_count,
            isGif =
              src_.indexOf(".gif") > -1
                ? '<img class="gifSign" src="//q.plusx.cn/wechat/live/image/live4/gif.png">'
                : "",
            hasPayDom =
              ISPAY && timeline_picOne.big_img
                ? '<i class="iconfont icon-jiaobiao jiaobiao"></i>'
                : "",
            unselected = DETAIL.color == 2 ? "unselectedw" : "unselected",
            oldPicSelect = puzzledObj.count >= 9 ? unselected : "",
            oldSelectTag = puzzledObj.count >= 9 ? "none" : "",
            oldPicSelectShow = puzzledObj.status ? "" : "none";

          var timeline_picDom =
            '\
            <div class="pic_item picItem tiled_item" data-src="' +
            src_ +
            '" data-time="' +
            createTime_ +
            '" data-hash="' +
            hash_ +
            '" data-big="' +
            bigSrc_ +
            '" data-midSize="' +
            midsize_ +
            '" data-ori="' +
            oriSrc_ +
            '" data-oriSize="' +
            orisize_ +
            '" data-likeCount="' +
            likeCount_ +
            '" data-cur="' +
            timeLine.cur +
            '" data-camer="' +
            camer_ +
            '"\
              data-avator="' +
            avator_ +
            '" data-retoucher="' +
            retoucher_ +
            '" data-name="' +
            name_ +
            '" data-rcount="' +
            rcount_ +
            '" style="background-image:url(' +
            src_ +
            ')">\
            ' +
            isGif +
            "\
            " +
            hasPayDom +
            '\
            <div class="nopay" style="background-image: url(' +
            src_ +
            ')"></div>\
            <p class="nopay-masking-p none">购买成功后<br>可点击下载原图</p>\
            <div class="picSelect ' +
            oldPicSelect +
            " " +
            oldPicSelectShow +
            '">\
            <span class="select-tag ' +
            oldSelectTag +
            '"></span>\
            </div>\
            </div>\
            ';
          timeline_picDomAll += timeline_picDom;
        }
        return timeline_picDomAll;
      })() +
      '<div class="timeLine-one-inner ' +
      timeLineTheme +
      '"></div>\
        </div>\
      </div>\
    </div>\
    ';
    $(".timeLine .pic-container").append(timeLineDom);
    if (DETAIL.color == 2) $(".select-tag").addClass("white");
    timeLine.add++; // 统计加载到第几个时间线模块
  }
  fixImgArea(".timeLine-picbox");
}
// 收缩时间线
function shrinkTimeLine() {
  var $this = $(this);
  $this.siblings(".timeLine-picbox").slideToggle(200);
  $this.find(".timeLine-shrink").toggleClass("active");
  $this.parents(".timeLine-one").toggleClass("mb");
}

// 获得图文图片
function getImageTextPics() {
  $(".pic-loading__top").removeClass("hide");
  $(".imgText .pic-container")
    .html("")
    .css("height", winH);
  imgText.fixLocation = [];
  imgText.swiperArr = [];
  imgText.total = 0;
  imgText.add = 0;
  imgText.count = 0;
  $.ajax({
    url: "/activity/live/album/timenote",
    type: "get",
    dataType: "json",
    data: {
      activityNo: ACTIVITYNO,
      from: 0,
      size: 3000,
      ppSign: ISNOWATERSIGN
    },
    success: function(data) {
      if (data.success && data.result instanceof Array) {
        var result = data.result;

        if (result.length > 0) {
          for (var i = 0, len = result.length; i < len; i++) {
            if (result[i].type == 1) imgText.total++;
          }
          $("#count-total").html(imgText.total);
          imgText.data = result;
          imgText.count = result.length;
          scrollImageTextPics();
        }
        $(".imgText .pic-container").css("height", "auto");
        $(".pic-loading__top").addClass("hide");
      }
    }
  });
}

function scrollImageTextPics() {
  for (var i = 0; i < imgText.step && imgText.add < imgText.count; i++) {
    var textimage_picOne = imgText.data[imgText.add];
    var imageTextTheme = DETAIL.color == 2 ? "white" : "";
    if (imgText.add === 0 && textimage_picOne.type === 1) {
      $(".imgText .pic-container").append(
        '<div class="imgText-area flex-wrap"></div>'
      );
    }

    if (textimage_picOne.type == 1) {
      // 当前图片的序号，用于显示当前图片所处位置
      imgText.cur++;
      imgText.cur = imgText.cur < imgText.total ? imgText.cur : imgText.total;
      // 图文中的图
      var src_ = textimage_picOne.small_img,
        hash_ = textimage_picOne.pic_hash,
        bigSrc_ = textimage_picOne.big_img,
        camer_ = textimage_picOne.camer || "--",
        avator_ =
          textimage_picOne.camer_head || textimage_picOne.retoucher_head,
        retoucher_ = textimage_picOne.retoucher || "--",
        oriSrc_ = textimage_picOne.origin_img,
        midsize_ = textimage_picOne.middle_size,
        orisize_ = textimage_picOne.pic_size,
        likeCount_ = textimage_picOne.like_count,
        createTime_ = textimage_picOne.create_time,
        name_ = textimage_picOne.pic_name,
        rcount_ = textimage_picOne.reward_count,
        isGif =
          src_.indexOf(".gif") > -1
            ? '<img class="gifSign" src="//q.plusx.cn/wechat/live/image/live4/gif.png">'
            : "",
        hasPayDom =
          ISPAY && textimage_picOne.big_img
            ? '<i class="iconfont icon-jiaobiao jiaobiao"></i>'
            : "",
        unselected = DETAIL.color == 2 ? "unselectedw" : "unselected",
        oldPicSelect = puzzledObj.count >= 9 ? unselected : "",
        oldSelectTag = puzzledObj.count >= 9 ? "none" : "",
        oldPicSelectShow = puzzledObj.status ? "" : "none";

      var textimage_picDom =
        '\
      <div class="pic_item picItem tiled_item " data-src="' +
        src_ +
        '" data-time="' +
        createTime_ +
        '" data-hash="' +
        hash_ +
        '" data-big="' +
        bigSrc_ +
        '" data-midSize="' +
        midsize_ +
        '" data-ori="' +
        oriSrc_ +
        '" data-oriSize="' +
        orisize_ +
        '" data-likeCount="' +
        likeCount_ +
        '"\
      data-cur="' +
        imgText.cur +
        '" data-camer="' +
        camer_ +
        '" data-avator="' +
        avator_ +
        '" data-retoucher="' +
        retoucher_ +
        '" data-name="' +
        name_ +
        '" data-rcount="' +
        rcount_ +
        '" style="background-image:url(' +
        src_ +
        ')">\
      ' +
        isGif +
        "\
      " +
        hasPayDom +
        '\
      <div class="nopay" style="background-image: url(' +
        src_ +
        ')"></div>\
      <p class="nopay-masking-p none">购买原图后<br>可点击下载原图</p>\
      <div class="picSelect ' +
        oldPicSelect +
        " " +
        oldPicSelectShow +
        '">\
      <span class="select-tag ' +
        oldSelectTag +
        '"></span>\
      </div>\
      </div>';
      imgText.fixLocation.push(src_);
      imgText.swiperArr.push(textimage_picOne);
      $(".imgText-area")
        .last()
        .append(textimage_picDom);
    } else {
      // 图文中的文
      var title_ = textimage_picOne.title;
      var word_ = textimage_picOne.note;
      var time_ = textimage_picOne.relate_time;
      var textDom =
        '\
      <section class="text_item">\
        <p class="row-start-center"><i class="iconfont icon-yuandian"></i><span class="imageText-title ' +
        imageTextTheme +
        '">' +
        title_ +
        '</span></p>\
        <p class="imageText-word ' +
        imageTextTheme +
        '">' +
        word_ +
        '</p>\
        <p class="imageText-time ' +
        imageTextTheme +
        '">' +
        time_ +
        "</p>\
      </section>\
      ";
      $(".imgText .pic-container").append(textDom);
      $(".imgText .pic-container").append('<div class="imgText-area"></div>');
    }
    imgText.add++;
  }
  fixImgArea(".imgText-area");
}
// 适配图文中仅有一张或者两张时的图片样式
function fixImgArea(ele) {
  $(ele).each(function() {
    var $this = $(this),
      pics = $this.find(".picItem"),
      len = pics.length;
    if (len === 0) {
      return;
    }
    if (len === 1) {
      var smallSrc = pics.attr("data-src");
      var bigSrc = pics.attr("data-big");
      if (bigSrc) {
        pics.attr("style", "background-image:url(" + bigSrc + ")");
      } else {
        pics.attr("style", "");
        pics.find(".nopay").addClass("nopay-masking");
        pics.find(".nopay-masking-p").removeClass("none");
      }

      pics.addClass("area-one");
    }
    if (len === 2) {
      pics.addClass("area-two");
    }
  });
}

function getShowPic() {
  isLoading = true;
  $.ajax({
    url: "/activity/live/comment/list",
    type: "get",
    dataType: "json",
    data: {
      from: showPic.from,
      size: showPic.size,
      activityNo: ACTIVITYNO,
      sortType: showPic.sortType,
      type: showPic.type
    },
    success: function(res) {
      if (res.success) {
        var list = res.result.comment_list;
        if (list.length < showPic.size) showPic.end = true;
        for (var i = 0, len = list.length; i < len; i++) {
          var listOne = list[i];

          var isIconLike = listOne.like
            ? "icon-dianzanhou"
            : "icon-dianzanqian";
          var isCountLike = listOne.like ? "like" : "";
          var isWhite = DETAIL.color == 2 ? "white" : "";
          var isFour =
            listOne.pics.length === 4 || listOne.pics.length === 1
              ? "four"
              : "";
          var isFlexWrap = listOne.pics.length === 1 ? "" : "flex-wrap";
          var item =
            '\
          <div class="discuss-item row-start-start ' +
            isWhite +
            '">\
            <div class="discuss-item__avator">\
              <img src="' +
            listOne.wxHead +
            '">\
            </div>\
            <div class="discuss-item__detail">\
              <p class="discuss-item__name ' +
            isWhite +
            '">' +
            listOne.wxName +
            '</p>\
              <p class="discuss-item__content ' +
            isWhite +
            '">' +
            listOne.comment +
            '</p>\
              <div class="discuss-item__img ' +
            isFour +
            " " +
            isFlexWrap +
            '"></div>\
              <div class="discuss-item__other row-all-center">\
                <span class="discuss-item__time ' +
            isWhite +
            '">' +
            listOne.createTime.slice(0, 16) +
            '</span>\
                <span class="discuss-item__share xt-share ' +
            isWhite +
            '" data-head="' +
            listOne.wxHead +
            '" data-wxname="' +
            listOne.wxName +
            '" data-comment="' +
            listOne.comment +
            '" data-first="' +
            listOne.pics.slice(0, 1) +
            '">\
                  <i class="iconfont icon-fenxiang2"></i>\
                </span>\
                <div class="discuss-item__like row-all-center">\
                  <i class="iconfont ' +
            isWhite +
            " " +
            isIconLike +
            ' discuss-item__likeicon" data-id="' +
            listOne.id +
            '"></i>\
                  <span class="discuss-item__likecount ' +
            isWhite +
            " " +
            isCountLike +
            '">' +
            listOne.likeCount +
            "</span>\
                </div>\
              </div>\
            </div>\
          </div>";
          $(".showPic .pic-container").append(item);
          var $content = $(".showPic .discuss-item:last").find(
            ".discuss-item__content"
          );
          var $contentRem = $content.height();
          var rem = (winW / 750) * 100;
          if ($contentRem / rem > 2.6) {
            $content.addClass("hide");
            $content.after('<p class="discuss-item__open">全文</p>');
          }
          for (var o = 0; o < listOne.pics.length; o++) {
            var item_ = listOne.pics[o];
            var isSingle = listOne.pics.length === 1;
            var dom_ = isSingle
              ? '<img class="xt-item__single xt-item__click" src="' +
                item_ +
                '" data-arr="' +
                listOne.pics.toString() +
                '">'
              : '<div class="xt-item xt-item__click" data-arr="' +
                listOne.pics.toString() +
                '" style="background-image: url(' +
                item_ +
                ')"></div>';
            $(".showPic .pic-container")
              .find(".discuss-item:last")
              .find(".discuss-item__img")
              .append(dom_);
          }
        }
        if (LANGUAGE) interprete(".discuss-item__open", "en");
        $(".showPic .pic-container").css("height", "auto");
        $(".pic-loading__top").addClass("hide");
        showPic.from = $(".showPic .discuss-item").length;
        isLoading = false;
        if (showPic.end)
          $(".showPic .discuss-item")
            .last()
            .addClass("last");
        if (showPic.from > 0) $(".showPic .pic-no").addClass("none");
      }
    }
  });
}
// sbsbsbsbs
function getMediaTrigger() {
  $.ajax({
    url: "/activity/live/video",
    type: "get",
    dataType: "json",
    data: {
      from: media.from,
      size: media.size,
      albumId: "",
      activityNo: ACTIVITYNO,
      serverType: media.type
    },
    success: function(res) {
      if (res.success) {
        var mediaLen = res.result.total;
        if (mediaLen !== 0) {
          scrollEle === ".all" && all.total === 0
            ? $("#media").trigger("click")
            : null;
        } else {
          $("#media").addClass("none");
        }
      }
    }
  });
}
// 获取视频
function getMedia() {
  var url = media.albumId
    ? "/activity/live/album/video"
    : "/activity/live/video";
  isLoading = true;
  $.ajax({
    url: url,
    type: "get",
    dataType: "json",
    data: {
      from: media.from,
      size: media.size,
      albumId: media.albumId,
      activityNo: ACTIVITYNO,
      serverType: media.type
    },
    success: function(res) {
      if (res.success) {
        var medias = res.result.videos;
        var mediaLen = res.result.total;
        if (medias.length < media.size) media.end = true;
        $(".media .pic-container").css("height", "auto");
        if (mediaLen !== 0) {
          $(".media .pic-no").addClass("none");
          for (var i = 0; i < medias.length; i++) {
            var mediaI = medias[i];
            var isDown =
              Math.ceil(mediaI.video_size / 1024) > 50
                ? ""
                : '<p class="video-down row-all-center" data-qr="' +
                  mediaI.qr_code +
                  '"><span class="iconfont icon-down"></span><span>下载视频</span></p>';
            var item =
              '\
            <div class="media-item media-item--new">\
              <div class="video-box">\
                <video src="' +
              mediaI.url +
              '" id="video-play' +
              winIndex +
              '" class="video-js vjs-big-play-centered video-1" x5-video-player-fullscreen="true" x-webkit-airplay="allow" object-fit="fill"></video>\
              </div>\
              <div class="col-start-right">\
                <p class="media-description">' +
              mediaI.description +
              '</p>\
                <div class="video-operator row-all-center">\
                  ' +
              isDown +
              '\
                  <i class="iconfont icon-fenxiang2 video-share" data-url="' +
              mediaI.url +
              '" data-cover="' +
              mediaI.cover +
              '"></i>\
                </div>\
              </div>\
            </div>';
            $(".media .pic-container").append(item);
            var options = {
              controls: false,
              file: medias[i].url,
              type: "mp4",
              poster: medias[i].cover,
              preload: "auto",
              autoplay: false
            };

            var id = "video-play" + winIndex;
            var playerList = new QiniuPlayer(id, options);
            winIndex++;

            (function() {
              var videoContext = document.getElementById(id);
              var a = videoContext.getElementsByTagName("video")[0];
              a.addEventListener("ended", () => {
                if (browser.versions.android) {
                  a.play();
                  setTimeout(function() {
                    a.pause();
                  }, 100);
                }
              });
            })(id);
          }
          if (DETAIL.color == 2) {
            $(".media-description").css("color", "#333");
            $(".video-share").addClass("white");
          }
          media.from = $(".media-item").length;
        } else {
          $(".media .pic-no").removeClass("none");
          media.albumId ? null : $("#media").addClass("none");
        }
        isLoading = false;
        $(".pic-loading__top").addClass("hide");
      }
    }
  });
}

function closeVideoDown() {
  hideVideo(false);
  $(".video-down-wrapper").addClass("none");
}

function downMedia() {
  var $this = $(this);
  var url = $this.attr("data-qr");
  $("#wxappQR").attr("src", url);
  hideVideo(true);
  $(".video-down-wrapper").removeClass("none");
}
// 获取评论
function getDiscuss() {
  isLoading = true;
  $.ajax({
    url: "/activity/live/comment/list",
    type: "get",
    dataType: "json",
    data: {
      from: discuss.from,
      size: discuss.size,
      activityNo: ACTIVITYNO,
      sortType: discuss.sortType
    },
    success: function(res) {
      if (res.success) {
        var list = res.result.comment_list;
        if (list.length < discuss.size) discuss.end = true;
        var listDom = "";
        for (var i = 0, len = list.length; i < len; i++) {
          var listOne = list[i];

          var isIconLike = listOne.like
            ? "icon-dianzanhou"
            : "icon-dianzanqian";
          var isCountLike = listOne.like ? "like" : "";
          var isWhite = DETAIL.color == 2 ? "white" : "";

          var item =
            '\
          <div class="discuss-item row-start-start ' +
            isWhite +
            '">\
            <div class="discuss-item__avator">\
              <img src="' +
            listOne.wxHead +
            '">\
            </div>\
            <div class="discuss-item__detail">\
              <p class="discuss-item__name ' +
            isWhite +
            '">' +
            listOne.wxName +
            '</p>\
              <p class="discuss-item__content ' +
            isWhite +
            '">' +
            listOne.comment +
            '</p>\
              <div class="discuss-item__other row-all-center">\
                <span class="discuss-item__time ' +
            isWhite +
            '">' +
            listOne.createTime.slice(0, 16) +
            '</span>\
                <div class="discuss-item__like row-all-center">\
                  <i class="iconfont ' +
            isWhite +
            " " +
            isIconLike +
            ' discuss-item__likeicon" data-id="' +
            listOne.id +
            '"></i>\
                  <span class="discuss-item__likecount ' +
            isWhite +
            " " +
            isCountLike +
            '">' +
            listOne.likeCount +
            "</span>\
                </div>\
              </div>\
            </div>\
          </div>";
          listDom += item;
        }
        $(".discuss .pic-container")
          .css("height", "auto")
          .append(listDom);
        $(".pic-loading__top").addClass("hide");
        discuss.from = $(".discuss .discuss-item").length;
        isLoading = false;
        if (discuss.end)
          $(".discuss .discuss-item")
            .last()
            .addClass("last");
        if (discuss.from > 0) $(".discuss .pic-no").addClass("none");
      }
    }
  });
}

function switchDiscussSort(index) {
  if (index == 0) {
    discuss.sortType = 2;
    showPic.sortType = 2;
  } else if (index == 1) {
    discuss.sortType = 1;
    showPic.sortType = 1;
  }
  $(".pic-loading__top").removeClass("hide");
  if (scrollEle === ".discuss") {
    $(".discuss .pic-container")
      .css("height", winH)
      .html("");
    discuss.from = 0;
    discuss.end = false;
    getDiscuss();
  } else if (scrollEle === ".showPic") {
    $(".showPic .pic-container")
      .css("height", winH)
      .html("");
    showPic.from = 0;
    showPic.end = false;
    getShowPic();
  }
}

function discussAdd() {
  var comment = $("#discussValue").val();
  if (!comment.trim()) {
    LANGUAGE ? toast("Please enter a comment") : toast("请输入评论内容");
    return;
  }
  if ($("#discussButton").hasClass("isOn")) {
    return;
  }
  $(".loading--box").removeClass("none");
  $("#discussButton").addClass("isOn");

  $.ajax({
    url: "/activity/live/comment/add",
    type: "get",
    dataType: "json",
    data: {
      comment: comment,
      activityNo: ACTIVITYNO
    },
    success: function(res) {
      if (res.success) {
        $("#discussButton").removeClass("isOn");
        $("#discussValue").val("");
        // LANGUAGE ? toast('Sent successfully！<br>Pending approval for display') : toast('评论提交成功！<br>待审核后发布显示');
        toast('提交成功！<br>待审核后显示<br>可先前往"我的"中查看');
      } else {
        toast("服务器异常，稍后再试");
      }
      $(".loading--box").addClass("none");
    }
  });
}

function discussLike() {
  var $this = $(this),
    $prev = $this.next(),
    count = $prev.html() * 1;
  var commentId = $this.attr("data-id");
  var liked = $this.hasClass("icon-dianzanhou");
  var status = liked ? -1 : 5;
  liked ? count-- : count++;
  $prev.html(count);
  $this.toggleClass("icon-dianzanhou").toggleClass("icon-dianzanqian");
  $prev.toggleClass("like");
  $.ajax({
    url: "/activity/live/comment/like/add",
    type: "get",
    dataType: "json",
    data: {
      commentId: commentId,
      status: status
    },
    success: function(res) {}
  });
}

function wxGetInfo(point) {
  if (!WX_INFO || (WX_INFO && WX_INFO == "0"))
    window.location.href =
      "//" +
      HOST +
      "/activity/live/" +
      ACTIVITYNO +
      "?wxStatus=noinfo&point=" +
      point;
}

// 密码验证
function praviteVerify() {
  if (!$("#password-enter").hasClass("active")) {
    $("#password-enter").addClass("active");
    var password_ = $.trim($("#password").val());
    password_ = $.md5(password_);
    if (password_ == PRAVITE.value) {
      setCookie("password", password_);
      $(".password-wrapper").addClass("ani-fadeoutdown");
      $(".password-masking").fadeOut(1200, function() {
        $(this).remove();
      });
    } else {
      toast("密码错误!");
      $("#password-enter").removeClass("active");
      $("#password").focus();
    }
  }
}
// 音乐开关
function switchMusic() {
  var $this = $(this);
  var status = $this.attr("data-status");
  var audioEle = $("#musicPlay")[0];
  if (status == 1) {
    $this
      .addClass("icon-yinxiaoguan1")
      .removeClass("icon-yinxiao1 ani-rotate-linear")
      .attr("data-status", "0");
    audioEle.pause();
  } else {
    $this
      .addClass("icon-yinxiao1 ani-rotate-linear")
      .removeClass("icon-yinxiaoguan1")
      .attr("data-status", "1");
    audioEle.play();
  }
}
// 适配微吼视频出现在视口内 页面上滚
function whModify() {
  if (vhall.scrollTop <= eleStatus.navST && vhall.url) {
    toTop();
  }
}

function toggleFade() {
  $(".modal_footer, .imgShowTip").fadeToggle();
}
// 适配2018.05.15之前的启动屏
function modifyMainview(time) {
  if (!time) return;
  var a = time.split(".");
  var targetDate = 2018 * 365 + 5 * 30 + 15 * 1;
  var thisDate = a[0] * 365 + a[1] * 30 + a[2] * 1;
  if (thisDate < targetDate) {
    $(".main-view").addClass("modify");
  }
}
// 启动屏高度大于手机屏幕增加滚动动画
function addMainViewAni(img) {
  var $mainView = $("#main-view");
  var mainViewH = $mainView.height(),
    mainViewW = $mainView.width();
  var thisImg = new Image();
  thisImg.src = img;
  thisH = thisImg.height;
  thisW = thisImg.width;
  if (mainViewH / mainViewW < thisH / thisW) {
    $mainView.addClass("ani");
  }
}

function toTop() {
  $(".floor2").animate(
    {
      scrollTop: eleStatus.navST + 2
    },
    1000
  );
}
