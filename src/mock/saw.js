var SELECTEDARR = [], // 所选照片url
  SELECTEDHASHARR = [],
  MUSICTYPE = 1,
  DIYPLAYER = "",
  SELECTEDCAMERARR = [], // 所选照片的摄影师
  NINEGRIDPICS = DETAIL.grid_pic_url, // 九宫格背景图数组
  CURNINEGRID = "", // 所选九宫格的哪部分进行拼图
  CURNINEGRIDINDEX = 0, // 所选九宫格的下标
  POSTERTYPE = 0, // 海报类型 0经典版 1简约版 2极简版
  ISBIGMODE = false, // 是否是大图模式下的海报
  nineMiddleImg = "", // 九宫格选中的 中间部分的图片
  jigsawImgHeight = [], // 存放拼图图片高度
  jigsawImgEle = [], // 存放拼图图片dom
  loadImgUrl = [], // 存放拼图图片地址
  diyNinegrid = null, // 裁剪图片对象
  diyNinegridDisabled = false,
  qrcode = null,
  showPicShareUser = {
    name: "",
    comment: ""
  },
  videoShareUser = {
    url: ""
  };

$(jigsawInit);
function jigsawInit() {
  initDiyVideoMusic();
  // 自定义九宫格裁剪
  var diyNineW = Math.round(((winW * 100) / 750) * 6);
  if (window.location.href.indexOf("findme") < 0) {
    diyNinegrid = new Mar({
      el: "#diyNinegridArea",
      width: diyNineW + "px",
      height: diyNineW + "px",
      fileOnchange: function(e) {
        $(".loading--box").removeClass("none");
        var img = document.getElementById("Mavatar-img");
        img.onload = function() {
          $(".loading--box").addClass("none");
          $("#diyNinegridSure").removeClass("disabled");
          diyNinegridDisabled = true;
        };
        $("#diyNinegridArea .icon-add").addClass("none");
      }
    });
    $("#diyVideoModal").on("click", "#diyVideoDown", downMedia);
  }
  // 临时修改
  $(".ninegrid-box li").append(
    '<div style="position:absolute;width:100%;height:100%;left:0;top:0;background:rgba(0,0,0,.5);z-index:1;"><div>'
  );
  $("#number-container")
    .find(".find-sure")
    .addClass("none");
  // 开启拼图
  $(".pos-box").on("click", "#puzzle", puzzleShow);
  $(".puzzle-type-wrapper").on("click", "#puzzleClose", puzzleHide);
  // 开启海报
  $(".puzzle-type-wrapper").on("click", "#haibao", puzzleHaibaoShow);
  $(".puzzle-haibao-wrapper").on(
    "click",
    "#puzzleHaibaoClose",
    puzzleHaibaoHide
  );
  // 选择拼图类型
  $(".puzzle-type-wrapper").on("click", "li", { bol: true }, choosePuzzleType);
  $(".puzzle-haibao-wrapper").on(
    "click",
    "li",
    { bol: true },
    chooseHaibaoType
  );
  // 关闭九宫格
  $(".ninegrid-wrapper").on("click", "#ninegridClose", ninegridHideDeep);
  // 选择九宫格
  $(".ninegrid-wrapper").on("click", "li", { bol: true }, chooseNinegrid);
  // 关闭拼图模式
  $(".puzzle-operate").on("click", ".puzzle-cancel", { bol: false }, ifPuzzled);
  // 去拼图确认
  $(".puzzle-operate").on("click", ".puzzle-sure", getPuzzle);
  // 关闭拼图
  $(".puzzled-result").on(
    "click",
    "#puzzleResClose",
    { bol: false },
    closePuzzleAlert
  );
  $(".puzzled-result").on(
    "click",
    "#puzzleResBack",
    { bol: false },
    backNinegrid
  );
  // 选择将要拼图的图片
  $(".photo").on("click", ".picSelect", selectPuzzlePic);
  // 大图模式下生成海报
  $(".swiper-masking").on("click", ".haibao-box", getPoster);
  // 自定义九宫格
  $(".ninegrid-wrapper").on("click", "#ninegridUpload", function() {
    $(".diyninegrid-wrapper").removeClass("none");
  });
  $(".diyninegrid-wrapper").on("click", "#diyNinegridCancel", function() {
    diyNineReset();
    $(".diyninegrid-wrapper").addClass("none");
  });
  $(".diyninegrid-wrapper").on("click", "#diyNinegridSure", diyNineClip);
  $(".diyninegrid-wrapper").on("click", "#diyNinegridReset", diyNineReset);
  // 10svideo
  $("#diyVideoMusicModal").on("click", "li", changeDiyMusic);
  $("#diyVideoMusicModal").on("click", "#diyVideoReturn1", closeMusicModal);
  $("#diyVideoMusicModal").on("click", "#diyVideoNext", makeDiyVideo);
  $("#diyVideoModal").on("click", "#diyVideoReturn2", quitDiyVideoModal);

  // 视频分享图片
  $(".photo").on("click", ".video-share", videoShare);
  // 秀图分享图片
  $(".photo").on("click", ".xt-share", xtShare);
}
// 打开弹窗
function puzzleShow() {
  ISBIGMODE = false;
  $(".container").on("touchmove", touchModal);
  $(".puzzle-type-wrapper").removeClass("none");
}
function puzzleHide() {
  $(".container").off("touchmove");
  $(".puzzle-type-wrapper").addClass("none");
}
function puzzleHaibaoShow() {
  $(".puzzle-haibao-wrapper").removeClass("none");
}
function puzzleHaibaoHide() {
  $(".puzzle-haibao-wrapper").addClass("none");
}
function ninegridHide() {
  $(".ninegrid-wrapper").addClass("none");
}
function ninegridHideDeep() {
  JIGSAWTYPE = "";
  ninegridHide();
}
function ninegridShow() {
  $(".ninegrid-wrapper").removeClass("none");
}
function puzzleResShow() {
  $(".puzzled-result").removeClass("none");
}
// 选择类型
function choosePuzzleType(event) {
  var index = $(this).index();
  if (index !== 1) puzzleHide();
  if (index === 3) {
    $("#puzzleNtitle").removeClass("none");
    $("#puzzleCTtitle, #puzzleCBtitle").addClass("none");
  } else {
    $("#puzzleNtitle").addClass("none");
    $("#puzzleCTtitle, #puzzleCBtitle").removeClass("none");
  }
  switch (index) {
    case 0:
      visitRecord("live_button", "pic_long");
      JIGSAWTYPE = "long";
      ifPuzzled(event);
      break;
    case 1:
      visitRecord("live_button", "pic_post");
      JIGSAWTYPE = "poster";
      puzzleHaibaoShow();
      break;
    case 2:
      visitRecord("live_button", "pic_gif");
      JIGSAWTYPE = "gif";
      ifPuzzled(event);
      break;
    case 3:
      visitRecord("live_button", "pic_grid");
      JIGSAWTYPE = "ninegrid";
      ninegridShow();
      if (!NINEGRIDPICS) return;
      setNinegrid();
      break;
    case 4:
      visitRecord("live_button", "pic_video");
      JIGSAWTYPE = "diyvideo";
      ifPuzzled(event);
  }
}
// 设置九宫格
function setNinegrid() {
  $(".ninegrid-box")
    .find("li")
    .each(function(index, ele) {
      var item = NINEGRIDPICS[index];
      $(this)
        .css("background-image", "url(" + item + ")")
        .attr("data-ninegrid", item);
    });
}
// 选择海报类型
function chooseHaibaoType(event) {
  POSTERTYPE = $(this).index();
  if (ISBIGMODE) {
    visitRecord("pic_button", "pic_post");
    $("#puzzleNtitle").addClass("none");
    $("#puzzleCTtitle, #puzzleCBtitle").removeClass("none");
    (SELECTEDARR = []), (SELECTEDCAMERARR = []);
    var target = $(".swiper-slide-active").find(".big_img_slide");
    var targetImg = target.attr("src");
    var targetCamer = target.attr("data-camer");
    SELECTEDARR.push(targetImg);
    SELECTEDCAMERARR.push(targetCamer);
    JIGSAWTYPE = "poster";
    puzzledObj.count = 1;
    $(".container").off("touchmove");
    puzzleHaibaoHide();
    getPuzzle();
  } else {
    ifPuzzled(event);
    puzzleHide();
    puzzleHaibaoHide();
  }
}
// 九宫格选择
function chooseNinegrid(event) {
  var $this = $(this);
  CURNINEGRID = $(this).attr("data-ninegrid");
  if (!CURNINEGRID) {
    toast("请上传九宫格背景图");
    return;
  }
  ninegridHide();
  CURNINEGRIDINDEX = $this.index();
  ifPuzzled(event);
}
// 开启或关闭拼图模式
function ifPuzzled(event) {
  var bol = event.data.bol;
  if (bol) {
    puzzledObj.status = true;
    $(scrollEle)
      .find(".picSelect")
      .removeClass("none");
    $(
      ".no-sign-big, .no-sign-small, .pos-box, .jh-button, .delete-img-button"
    ).addClass("none");
    $(".puzzle-operate").removeClass("none");
  } else {
    puzzledObj.status = false;
    $(".picSelect").addClass("none");
    $(".picSelect.selected, .select-tag.selected").removeClass("selected");
    $(".no-sign-big, .no-sign-small, .delete-img-button").removeClass("none");
    if (
      scrollEle !== ".media" &&
      scrollEle !== ".discuss" &&
      scrollEle !== ".showPic"
    ) {
      $(".pos-box, .jh-button").removeClass("none");
    }
    $(".puzzle-operate").addClass("none");
    if (JIGSAWTYPE === "ninegrid") ninegridShow();
    puzzledObj.count = 0;
    $("#puzzle-selected-count")
      .html(puzzledObj.count)
      .addClass("none");
    unPuzzled(false);
    SELECTEDARR = [];
    SELECTEDHASHARR = [];
  }
}
// 选择将要拼图的图片
function selectPuzzlePic(event) {
  event.stopPropagation();
  var $this = $(this),
    $parent = $this.parent();
  var bigUrl = $parent.attr("data-big");
  var hash = $parent.attr("data-hash");
  var camer = $parent.attr("data-camer");

  if ($this.hasClass("unselected") || $this.hasClass("unselectedw")) {
    return;
  } else {
    if (!bigUrl) {
      toast("未付费照片无法拼图");
      return;
    }

    $this.toggleClass("selected");
    $this.find(".select-tag").toggleClass("selected");

    var urlIn = SELECTEDARR.indexOf(bigUrl);
    urlIn > -1 ? SELECTEDARR.splice(urlIn, 1) : SELECTEDARR.push(bigUrl);
    urlIn > -1 ? SELECTEDHASHARR.splice(urlIn, 1) : SELECTEDHASHARR.push(hash);
    var camerIn = SELECTEDCAMERARR.indexOf(camer);
    if (camerIn === -1 && camer !== "--" && camer != "null")
      SELECTEDCAMERARR.push(camer);

    puzzledObj.count = SELECTEDARR.length;

    if (puzzledObj.count > 0) {
      $("#puzzle-selected-count")
        .removeClass("none")
        .html(puzzledObj.count);
    } else {
      $("#puzzle-selected-count").addClass("none");
    }
    if (JIGSAWTYPE === "long" || JIGSAWTYPE === "poster") {
      puzzledObj.count >= 9 ? unPuzzled(true) : unPuzzled(false);
    }
    if (JIGSAWTYPE === "gif") {
      puzzledObj.count >= 5 ? unPuzzled(true) : unPuzzled(false);
    }
    if (JIGSAWTYPE === "ninegrid") {
      puzzledObj.count >= 8 ? unPuzzled(true) : unPuzzled(false);
    }
  }
}
// 九张之后不可选择 样式变化
function unPuzzled(bol) {
  var lessPicSelect = $(".picSelect").not(".picSelect.selected");
  var unselected = DETAIL.color == 2 ? "unselectedw" : "unselected";

  if (bol) {
    lessPicSelect.addClass(unselected);
    lessPicSelect.find(".select-tag").addClass("none");
  } else {
    lessPicSelect.removeClass(unselected);
    lessPicSelect.find(".select-tag").removeClass("none");
  }
}
// 去拼图
function getPuzzle() {
  if (puzzledObj.count > 0) {
    if (JIGSAWTYPE === "long" || JIGSAWTYPE === "gif") {
      if (puzzledObj.count < 2) {
        toast("至少选择两张图片");
        return;
      }
    }
    if (JIGSAWTYPE === "ninegrid") {
      if (puzzledObj.count % 2 !== 0) {
        toast("请添加偶数张图片");
        return;
      }
      SELECTEDARR.splice(SELECTEDARR.length / 2, 0, CURNINEGRID);
    }
    if (JIGSAWTYPE === "poster") {
      qrcode = getQRcode("qrcode", DETAIL.activity_url);
      if (POSTERTYPE === 0) {
        SELECTEDARR = SELECTEDARR.concat(
          "//q.plusx.cn/wechat/liveplus/image/poster-bb.png",
          "//q.plusx.cn/wechat/liveplus/image/icon-place.png",
          "//q.plusx.cn/wechat/liveplus/image/icon-man.png",
          "//q.plusx.cn/wechat/liveplus/image/poster-bt.png"
        );
        // SELECTEDARR = SELECTEDARR.concat(
        //   'http://s.plusx.cn/plus/immediate/1801557/20187101042969/posterbb.png?imageView2/0/w/1600/h/3000/q/85&sign=7fdee1108943b6efbfa889f120cb6904&t=5c4ad938',
        //   'http://s.plusx.cn/plus/immediate/1801557/20187101042907/iconplace.png?imageView2/0/w/1600/h/3000/q/85&sign=1abcc489323670f38cf8c69d9556dbe4&t=5c4ad938',
        //   'http://s.plusx.cn/plus/immediate/1801557/20187101042700/iconman.png?imageView2/0/w/1600/h/3000/q/85&sign=d7c9095f5419957149d1c18e1942ec7b&t=5c4ad938',
        //   'http://s.plusx.cn/plus/immediate/1801557/2018710104393/posterbt.png?imageView2/0/w/1600/h/3000/q/85&sign=26d5b52d50108eaca0c84aa343ef4e43&t=5c4ad938'
        // );
      }
      if (POSTERTYPE === 1) {
        if (DETAIL.head_img) {
          var head = DETAIL.head_img;
          head = head.indexOf("[") > -1 ? JSON.parse(head) : [head];
          var firstHead = head.shift();
          SELECTEDARR.unshift(firstHead);
        }
      }
    }
    if (JIGSAWTYPE === "diyvideo") {
      if (puzzledObj.count < 5) {
        toast("至少选择5张图片");
        return;
      }
      if (puzzledObj.count > 30) {
        toast("至多选择30张图片");
        return;
      }
      showMusicModal();
      return;
    }
    if (JIGSAWTYPE === "videoShare") {
      var fakeUrl = videoShareUser.url.split("?")[0].split("cn/")[1];
      var http_ = HOST.indexOf("live.photoplus.cn") > -1 ? "https" : "http";
      var link =
        http_ +
        "://" +
        HOST +
        "/activity/live/video/one?url=" +
        fakeUrl +
        "&no=" +
        ACTIVITYNO;
      qrcode = getQRcode("qrcode", link);
    }
    if (JIGSAWTYPE === "xtShare") {
      qrcode = getQRcode("qrcode", DETAIL.activity_url);
    }
    $(".masking").removeClass("none");
    puzzleResShow();
    whModify();
    jigsawImgEle = [];
    jigsawImgHeight = [];
    loadImgUrl = SELECTEDARR.concat();
    getImgsHeight();
  } else {
    toast("请选择图片");
  }
}
// 关闭拼图弹窗
function closePuzzleAlert(event) {
  $(".puzzled-result").addClass("none");
  $(".puzzled-img").remove();
  ifPuzzled(event);
}
// 返回九宫格
function backNinegrid(event) {
  $(".ninegrid-box")
    .find("li")
    .eq(CURNINEGRIDINDEX)
    .find(".icon-add")
    .addClass("none");
  $(".ninegrid-box")
    .find("li")
    .eq(CURNINEGRIDINDEX)
    .find(".nine-finish")
    .removeClass("none");
  closePuzzleAlert(event);
  ninegridShow();
}

var Jigsaw = {
  wrap: "",
  board: null,
  boardContext: null,
  boardWidth: winW,
  boardHeight: 0, // 生成图片的高度

  maxHeight: 0, // 素材中图片最高的高度
  gifImgArr: [], // 生成gif的图片数组

  gap: 0, // 图片间距
  startX: 0, // 绘制起始X
  startY: 0, // 绘制起始Y
  contentWidth: winW, // 主要内容的宽度，不是画布的宽度
  ratio: 1,

  posterMap: {
    paddingTop: softHeight(54),
    titleHeight: 0,
    ganTop: softHeight(30),
    ganHeight: softHeight(3),
    ganBottom: softHeight(30),

    activityGap: softHeight(14),

    btitleTop: softHeight(25),
    btitleHeight: 0,
    bactivityTop: softHeight(10),
    bactivityHeight: 0,

    qrTop: softHeight(30),
    qrTipTop: softHeight(17),
    qrTipBottom: softHeight(29),

    camerString: ""
  },
  init: function() {
    this.gap = 0;
    this.startY = 0;
    this.board = null;
    this.boardHeight = 0;
    this.posterMap.bactivityHeight = 0;
    this.posterMap.camerString = "";

    this.renderAll();
  },
  renderAll: function() {
    this.wrap = document.querySelector(".puzzled-result-content");
    this.board = document.createElement("canvas");
    this.wrap.appendChild(this.board);
    if (!this.board.getContext) {
      toast("浏览器版本过低，无法拼图");
      $(".masking").addClass("none");
      return;
    }
    this.boardContext = this.board.getContext("2d");
    // 除去背景图和修饰图 需要绘制的主图
    var jigsawImgHeightLength = jigsawImgHeight.length;
    if (JIGSAWTYPE === "poster" && POSTERTYPE === 0) {
      jigsawImgHeightLength = jigsawImgHeightLength - 4;
    }
    if (JIGSAWTYPE === "videoShare") {
      jigsawImgHeightLength = jigsawImgHeightLength - 2;
      this.boardHeight += softHeight(230); // 空隙
      this.boardHeight += this.calculateWordHeight(DETAIL.name, 20, 28); // 活动名称
      console.log(this.calculateWordHeight(DETAIL.name, 20, 28));
    }
    if (JIGSAWTYPE === "xtShare") {
      jigsawImgHeightLength = jigsawImgHeightLength - 4;
      this.boardHeight += softHeight(290);
      this.boardHeight += this.calculateWordHeight(
        showPicShareUser.comment,
        14,
        20
      );
    }
    // 计算开始canvas的高度
    for (var i = 0, len = jigsawImgHeightLength; i < len; i++) {
      this.boardHeight += jigsawImgHeight[i];
    }

    if (JIGSAWTYPE === "poster") {
      for (var j = 0, len = SELECTEDCAMERARR.length; j < len; j++) {
        var camerName = SELECTEDCAMERARR[j];
        if (camerName && camerName != "--" && camerName != "null") {
          this.posterMap.camerString += SELECTEDCAMERARR[j] + " ";
        }
      }
      this.gap = 10;
      if (POSTERTYPE === 0) {
        this.boardHeight += softHeight(235); // 杂七杂八的高度
        this.boardHeight +=
          this.posterMap.camerString && (DETAIL.is_sell & 4096) > 0
            ? softHeight(37)
            : 0;
        this.boardHeight += DETAIL.place ? softHeight(37) : 0;
        this.boardHeight += (jigsawImgHeightLength - 1) * this.gap;
        this.boardHeight +=
          this.calculateWordHeight(DETAIL.name, 30, 33) +
          this.calculateWordHeight(DETAIL.name, 30, 33);
        if (SELECTEDARR.length !== 5) {
          (this.posterMap.camerString && (DETAIL.is_sell & 4096) > 0) ||
          DETAIL.place
            ? (this.boardHeight += softHeight(80))
            : null;
          this.boardHeight += this.calculateWordHeight(DETAIL.name, 18, 22.5);
        }
      }
      if (POSTERTYPE === 1) {
        this.boardHeight +=
          this.posterMap.camerString && (DETAIL.is_sell & 4096) > 0
            ? softHeight(37)
            : 0;
        this.boardHeight += (jigsawImgHeightLength - 1) * this.gap;
        this.boardHeight += softHeight(140); // 杂七杂八的高度
      }
      if (POSTERTYPE === 2) {
        this.boardHeight += softHeight(37);
        this.boardHeight += this.calculateWordHeight(DETAIL.name, 16, 18);
        this.boardHeight += softHeight(35); // 杂七杂八的高度
      }
    }
    if (JIGSAWTYPE === "ninegrid") {
      var a = (jigsawImgHeight.length - 1) / 2;
      var th = 0,
        bh = 0;
      for (var i = 0; i < a; i++) {
        th += jigsawImgHeight[i];
        bh += jigsawImgHeight[i + 1 + a];
      }
      var diffHeight = th - bh;
      var absDiffHeight = Math.abs(diffHeight);
      if (absDiffHeight !== 0) {
        this.boardHeight += absDiffHeight;
        if (diffHeight < 0) {
          this.startY = absDiffHeight;
        }
      }
    }

    this.board.width = this.boardWidth;
    this.board.height = this.boardHeight;

    var devicePixelRatio = window.devicePixelRatio || 1,
      backingStoreRatio =
        this.boardContext.webkitBackingStorePixelRatio ||
        this.boardContext.mozBackingStorePixelRatio ||
        this.boardContext.msBackingStorePixelRatio ||
        this.boardContext.oBackingStorePixelRatio ||
        this.boardContext.backingStorePixelRatio ||
        1;
    this.ratio = devicePixelRatio / backingStoreRatio;
    this.board.width = this.board.width * this.ratio;
    this.board.height = this.board.height * this.ratio;

    this.boardContext.scale(this.ratio, this.ratio);

    switch (JIGSAWTYPE) {
      case "long":
        this.drawLong();
        break;
      case "gif":
        this.drawGif();
        break;
      case "poster":
        if (POSTERTYPE === 0) {
          this.contentWidth = winW * 0.8;
          this.drawPoster();
        }
        if (POSTERTYPE === 1) {
          this.contentWidth = winW - softHeight(30);
          this.drawPosterJY();
        }
        if (POSTERTYPE === 2) {
          this.contentWidth = winW;
          this.drawPosterJJ();
        }
        break;
      case "ninegrid":
        this.drawNinegrid();
        break;
      case "videoShare":
        this.contentWidth = winW * 0.8;
        this.drawVideoShare();
        break;
      case "xtShare":
        this.contentWidth = winW * 0.8;
        this.drawXtShare();
        break;
    }
    if (JIGSAWTYPE !== "gif") {
      var resultUrl = this.board.toDataURL("image/jpeg", 0.7);
      var jigsawImg = document.createElement("img");
      var realUrl = getImageUrl(resultUrl.slice(23));

      jigsawImg.src = realUrl;
      jigsawImg.className = "puzzled-img";
      this.wrap.appendChild(jigsawImg);
      this.wrap.classList.remove("col-all-center");

      var img = new Image();
      img.src = realUrl;
      img.onload = function() {
        $(".masking").addClass("none");
      };
      img.onerror = function() {
        $(".masking").addClass("none");
        toast("加载失败，请重试");
      };
    }

    this.wrap.removeChild(this.board);
  },
  drawLong: function() {
    var drawStart = this.startY;
    for (var i = 0, len = SELECTEDARR.length; i < len; i++) {
      var targetImg = jigsawImgEle[i];
      this.boardContext.drawImage(
        targetImg,
        0,
        drawStart,
        this.boardWidth,
        jigsawImgHeight[i]
      );
      drawStart += jigsawImgHeight[i];
    }
  },
  drawPoster: function() {
    var bgTop = jigsawImgEle.pop(),
      bgTopHeight = jigsawImgHeight.pop();
    var manIcon = jigsawImgEle.pop(),
      manIconHeight = jigsawImgHeight.pop();
    var placeIcon = jigsawImgEle.pop(),
      placeIconHeight = jigsawImgHeight.pop();
    var bgBottom = jigsawImgEle.pop(),
      bgBottomHeight = jigsawImgHeight.pop();
    var drawStart = this.posterMap.paddingTop + softHeight(30);

    // 背景初始化背景颜色
    this.boardContext.fillStyle = "#fff";
    this.boardContext.fillRect(0, 0, this.boardWidth, 8000);
    // 绘制顶部背景
    this.boardContext.drawImage(
      bgTop,
      0,
      0,
      this.boardWidth,
      bgTopHeight / 0.8
    );
    // 绘制底部背景
    this.boardContext.drawImage(
      bgBottom,
      0,
      this.boardHeight - bgBottomHeight / 0.8,
      this.boardWidth,
      bgBottomHeight / 0.8
    );

    // 绘制顶部标题
    this.drawText(
      DETAIL.name,
      { font: softHeight(30) + "px STHeitiSC", color: "#333" },
      winW * 0.1,
      drawStart,
      softHeight(33),
      "titleHeight"
    );

    // 绘制分割线
    drawStart += this.posterMap.titleHeight + this.posterMap.ganTop;
    this.boardContext.fillStyle = "#000";
    this.boardContext.fillRect(
      winW * 0.1,
      drawStart,
      softHeight(55),
      softHeight(3)
    );

    // 绘制摄影师
    drawStart += this.posterMap.ganBottom;
    if ((DETAIL.is_sell & 4096) > 0 && this.posterMap.camerString) {
      this.boardContext.drawImage(
        manIcon,
        winW * 0.1,
        drawStart,
        softHeight(13),
        softHeight(15.7)
      );
      this.drawText(
        "摄影师：" + this.posterMap.camerString,
        { font: softHeight(14) + "px STHeitiSC", color: "#000" },
        winW * 0.1 + softHeight(20),
        drawStart + softHeight(13),
        softHeight(15.7),
        ""
      );
      drawStart +=
        this.posterMap.activityGap +
        this.calculateWordHeight("摄影师：战鼓摄影师：", 14, 14);
    }
    // 绘制地点
    if (DETAIL.place) {
      this.boardContext.drawImage(
        placeIcon,
        winW * 0.1,
        drawStart,
        softHeight(13),
        softHeight(15.7)
      );
      this.drawText(
        DETAIL.place,
        { font: softHeight(14) + "px STHeitiSC", color: "#000" },
        winW * 0.1 + softHeight(20),
        drawStart + softHeight(13),
        softHeight(15.7),
        ""
      );
      drawStart +=
        this.posterMap.activityGap +
        this.calculateWordHeight(DETAIL.place, 14, 14);
    }
    // if ((DETAIL.is_sell & 4096) > 0 && this.posterMap.camerString && DETAIL.place) {
    //
    // }
    // 绘制图片
    for (var i = 0, len = jigsawImgEle.length; i < len; i++) {
      var targetImg = jigsawImgEle[i];
      this.boardContext.drawImage(
        targetImg,
        winW * 0.1,
        drawStart,
        this.contentWidth,
        jigsawImgHeight[i]
      );
      drawStart += jigsawImgHeight[i] + this.gap;
    }

    // 绘制底部标题
    if (SELECTEDARR.length > 5) {
      drawStart += this.posterMap.btitleTop;
      this.boardContext.textAlign = "center";
      this.drawText(
        DETAIL.name,
        { font: softHeight(18) + "px STHeitiSC", color: "#333" },
        this.boardWidth / 2,
        drawStart,
        softHeight(22.5),
        "btitleHeight"
      );

      var bcamer =
        (DETAIL.is_sell & 4096) > 0 && this.posterMap.camerString
          ? this.posterMap.camerString + " "
          : "";
      var bcamerplace = bcamer + DETAIL.place;
      if (
        ((DETAIL.is_sell & 4096) > 0 && this.posterMap.camerString) ||
        DETAIL.place
      ) {
        drawStart += this.posterMap.btitleHeight + this.posterMap.bactivityTop; // if
        this.drawText(
          bcamerplace,
          { font: softHeight(14) + "px STHeitiSC", color: "#333" },
          this.boardWidth / 2,
          drawStart,
          softHeight(18),
          "bactivityHeight"
        );
      }
    }

    drawStart += this.posterMap.bactivityHeight;

    drawStart += this.posterMap.qrTop - this.gap;
    // 绘制二维码
    this.boardContext.drawImage(
      qrcode._el.childNodes[1],
      softHeight(155),
      drawStart,
      softHeight(61),
      softHeight(61)
    );

    // 绘制二维码提示文案
    drawStart += this.posterMap.qrTipTop + softHeight(61);
    this.boardContext.fillStyle = "#C0C2F1";
    this.boardContext.fillRect(
      softHeight(94),
      drawStart,
      softHeight(186),
      softHeight(18.5)
    );
    this.boardContext.textAlign = "left";
    this.drawText(
      "长按图片识别二维码进入现场",
      { font: softHeight(12) + "px STHeitiSC", color: "#fff" },
      softHeight(108),
      drawStart + softHeight(14),
      softHeight(12),
      ""
    );

    $("#qrcode").empty();
  },
  drawPosterJY: function() {
    var drawStart = softHeight(15);
    // 背景初始化背景颜色
    this.boardContext.fillStyle = "#fff";
    this.boardContext.fillRect(0, 0, this.boardWidth, 8000);
    // 绘制图片
    for (var i = 0, len = jigsawImgEle.length; i < len; i++) {
      var targetImg = jigsawImgEle[i];
      this.boardContext.drawImage(
        targetImg,
        softHeight(15),
        drawStart,
        this.contentWidth,
        jigsawImgHeight[i]
      );
      drawStart += jigsawImgHeight[i] + this.gap;
    }
    drawStart += softHeight(5);
    // 绘制摄影师
    if ((DETAIL.is_sell & 4096) > 0 && this.posterMap.camerString) {
      this.boardContext.textAlign = "center";
      this.drawText(
        "摄影师：" + this.posterMap.camerString,
        { font: softHeight(14) + "px STHeitiSC", color: "#9898A6" },
        this.boardWidth / 2,
        drawStart + softHeight(13),
        softHeight(15.7),
        ""
      );
      drawStart +=
        this.posterMap.activityGap +
        this.calculateWordHeight(this.posterMap.camerString, 14, 14);
    }
    // 绘制二维码
    this.boardContext.drawImage(
      qrcode._el.childNodes[1],
      softHeight(155),
      drawStart,
      softHeight(61),
      softHeight(61)
    );
    drawStart += softHeight(86);
    this.boardContext.textAlign = "center";
    this.drawText(
      "长按图片识别二维码进入现场",
      { font: softHeight(14) + "px STHeitiSC", color: "#9898A6" },
      this.boardWidth / 2,
      drawStart,
      softHeight(14),
      ""
    );
    $("#qrcode").empty();
  },
  drawPosterJJ: function() {
    var drawStart = 0;
    // 背景初始化背景颜色
    this.boardContext.fillStyle = "#fff";
    this.boardContext.fillRect(0, 0, this.boardWidth, 8000);
    // 绘制图片
    for (var i = 0, len = jigsawImgEle.length; i < len; i++) {
      var targetImg = jigsawImgEle[i];
      this.boardContext.drawImage(
        targetImg,
        0,
        drawStart,
        this.contentWidth,
        jigsawImgHeight[i]
      );
      drawStart += jigsawImgHeight[i];
    }
    drawStart += softHeight(15);
    // 绘制二维码
    this.boardContext.drawImage(
      qrcode._el.childNodes[1],
      softHeight(300),
      drawStart,
      softHeight(61),
      softHeight(61)
    );
    drawStart += softHeight(18);
    // 绘制标题
    this.drawText(
      DETAIL.name,
      { font: softHeight(18) + "px STHeitiSC", color: "#333" },
      softHeight(15),
      drawStart,
      softHeight(18),
      "",
      true
    );
    drawStart += this.calculateWordHeight(DETAIL.name, 16, 18);
    // 绘制摄影师
    if ((DETAIL.is_sell & 4096) > 0 && this.posterMap.camerString) {
      this.boardContext.textAlign = "left";
      this.drawText(
        "摄影师：" + this.posterMap.camerString,
        { font: softHeight(14) + "px STHeitiSC", color: "#9898A6" },
        softHeight(15),
        drawStart + softHeight(13),
        softHeight(15.7),
        "",
        "jj"
      );
      drawStart +=
        this.posterMap.activityGap +
        this.calculateWordHeight(this.posterMap.camerString, 14, 14);
    }
    $("#qrcode").empty();
  },
  drawNinegrid: function() {
    var drawStart = this.startY;
    for (var i = 0, len = SELECTEDARR.length; i < len; i++) {
      var targetImg = jigsawImgEle[i];
      this.boardContext.drawImage(
        targetImg,
        0,
        drawStart,
        this.boardWidth,
        jigsawImgHeight[i]
      );
      drawStart += jigsawImgHeight[i];
    }
  },
  drawGif: function() {
    this.maxHeight = this.getMaxHeight(jigsawImgHeight);
    this.gifImgArr = [];
    for (var i = 0, len = jigsawImgHeight.length; i < len; i++) {
      if (jigsawImgHeight[i] == this.maxHeight) {
        this.gifImgArr.push(SELECTEDARR[i]);
      } else {
        this.makeSameSizeImg(jigsawImgEle[i], jigsawImgHeight[i]);
      }
    }
    var that = this;
    gifshot.createGIF(
      {
        gifWidth: winW * 2,
        gifHeight: this.maxHeight * 2,
        interval: 0.3,
        sampleInterval: 2,
        images: this.gifImgArr
      },
      function(obj) {
        if (!obj.error) {
          var image = obj.image;

          var jigsawImg = document.createElement("img");
          jigsawImg.src = image;
          jigsawImg.classList.add("puzzled-img");
          that.wrap.classList.add("col-all-center");
          that.wrap.appendChild(jigsawImg);
          $(".masking").addClass("none");
        }
      }
    );
  },
  drawVideoShare: function() {
    var bgEle = jigsawImgEle.pop(),
      bgHeight = jigsawImgHeight.pop();
    var videoIconEle = jigsawImgEle.pop(),
      videoIconHeight = jigsawImgHeight.pop();
    videoIconHeight = softHeight(80);
    var title = "这段小视频真心不错，分享给你：";
    var drawStart = softHeight(45);
    // 背景初始化背景颜色
    this.boardContext.fillStyle = "#F5F5FA";
    this.boardContext.fillRect(0, 0, this.boardWidth, 8000);
    // 绘制顶部背景
    this.boardContext.drawImage(bgEle, 0, 0, this.boardWidth, bgHeight / 0.8);
    // 绘制顶部标题
    this.drawText(
      title,
      { font: softHeight(14) + "px STHeitiSC", color: "#3d3d3d" },
      winW * 0.1,
      drawStart,
      softHeight(20),
      ""
    );
    drawStart += softHeight(20);
    // 绘制图片
    var targetImg = jigsawImgEle[0];
    this.boardContext.drawImage(
      targetImg,
      winW * 0.1,
      drawStart,
      this.contentWidth,
      jigsawImgHeight[0]
    );
    drawStart += (jigsawImgHeight[0] - videoIconHeight) / 2;
    // 绘制播放按钮
    this.boardContext.drawImage(
      videoIconEle,
      (winW - videoIconHeight) / 2,
      drawStart,
      videoIconHeight,
      videoIconHeight
    );
    drawStart += jigsawImgHeight[0] / 2 + videoIconHeight / 2;
    drawStart += softHeight(40);
    // 绘制活动名称
    this.drawText(
      DETAIL.name,
      { font: softHeight(20) + "px STHeitiSC", color: "#000" },
      winW * 0.1,
      drawStart,
      softHeight(28),
      ""
    );
    drawStart += softHeight(80);
    // 绘制二维码区域
    this.boardContext.fillStyle = "#fff";
    this.boardContext.fillRect(0, drawStart, winW, softHeight(160));
    // 绘制二维码
    drawStart += softHeight(15);
    this.boardContext.drawImage(
      qrcode._el.childNodes[1],
      softHeight(310),
      drawStart,
      softHeight(45),
      softHeight(45)
    );
    // 绘制二维码文字
    drawStart += softHeight(18);
    this.drawText(
      "长按识别二维码",
      { font: softHeight(14) + "px STHeitiSC", color: "#757580" },
      softHeight(203),
      drawStart,
      softHeight(20),
      ""
    );
    drawStart += softHeight(20);
    this.drawText(
      "围观现场精彩视频",
      { font: softHeight(14) + "px STHeitiSC", color: "#757580" },
      softHeight(190),
      drawStart,
      softHeight(20),
      ""
    );
    $("#qrcode").empty();
  },
  drawXtShare: function() {
    visitRecord("live_button", "showpic_share");
    var bgEle = jigsawImgEle.pop(),
      bgHeight = jigsawImgHeight.pop();
    var headEle = jigsawImgEle.pop(),
      headHeight = jigsawImgHeight.pop();
    headHeight = softHeight(22);
    var icon1 = jigsawImgEle.pop(),
      icon1Height = jigsawImgHeight.pop();
    var icon2 = jigsawImgEle.pop(),
      icon2Height = jigsawImgHeight.pop();

    var drawStart = softHeight(30);
    // 背景初始化背景颜色
    this.boardContext.fillStyle = "#F5F5FA";
    this.boardContext.fillRect(0, 0, this.boardWidth, 8000);
    // 绘制顶部背景
    this.boardContext.drawImage(bgEle, 0, 0, this.boardWidth, bgHeight / 0.8);
    // 绘制头像
    drawStart += softHeight(30);
    this.boardContext.drawImage(
      headEle,
      winW * 0.1,
      drawStart,
      headHeight,
      headHeight
    );
    // 绘制用户名
    drawStart += softHeight(16);
    this.drawText(
      showPicShareUser.name,
      { font: softHeight(14) + "px STHeitiSC", color: "#3d3d3d" },
      winW * 0.1 + softHeight(32),
      drawStart,
      softHeight(20),
      ""
    );
    drawStart += softHeight(30);
    // 绘制标题
    $(".container").append(
      '<span id="mlgb" style="font-size: ' +
        softHeight(14) +
        'px; font-weight: bold;">' +
        DETAIL.name +
        "</span>"
    );
    var width = $("#mlgb").width();
    $("#mlgb").remove(); // 算活动名宽度

    var activityName =
      DETAIL.name.length > 8 && width > 112
        ? DETAIL.name.slice(0, 8) + "..."
        : DETAIL.name;
    var drawWidth = DETAIL.name.length > 8 && width > 112 ? 150 : width + 22;

    this.drawText(
      "在",
      { font: softHeight(14) + "px STHeitiSC", color: "#3d3d3d" },
      winW * 0.1,
      drawStart,
      softHeight(20),
      ""
    );
    this.drawText(
      activityName,
      { font: "bold " + softHeight(14) + "px STHeitiSC", color: "#333" },
      winW * 0.1 + softHeight(18),
      drawStart,
      softHeight(20),
      ""
    );
    this.drawText(
      "中秀出了ta拍摄的美图：",
      { font: softHeight(14) + "px STHeitiSC", color: "#333" },
      winW * 0.1 + softHeight(drawWidth),
      drawStart,
      softHeight(20),
      ""
    );
    drawStart += softHeight(30);
    // 绘制修饰icon
    this.boardContext.drawImage(
      icon1,
      winW * 0.1,
      drawStart,
      softHeight(24),
      softHeight(13)
    );
    this.boardContext.drawImage(
      icon2,
      winW * 0.9 - softHeight(35),
      drawStart,
      softHeight(35),
      softHeight(14)
    );
    drawStart += softHeight(40);
    // 绘制文字
    this.drawText(
      showPicShareUser.comment,
      { font: "bold " + softHeight(14) + "px STHeitiSC", color: "#333" },
      winW * 0.1,
      drawStart,
      softHeight(20),
      "",
      "xt"
    );
    drawStart += this.calculateWordHeight(showPicShareUser.comment, 14, 20);
    // 绘制图片
    var targetImg = jigsawImgEle[0];
    this.boardContext.drawImage(
      targetImg,
      winW * 0.1,
      drawStart,
      this.contentWidth,
      jigsawImgHeight[0]
    );
    drawStart += jigsawImgHeight[0];
    drawStart += softHeight(40);
    // 绘制二维码区域
    this.boardContext.fillStyle = "#fff";
    this.boardContext.fillRect(0, drawStart, winW, softHeight(80));
    // 绘制二维码
    drawStart += softHeight(15);
    this.boardContext.drawImage(
      qrcode._el.childNodes[1],
      softHeight(310),
      drawStart,
      softHeight(45),
      softHeight(45)
    );
    // 绘制二维码文字
    drawStart += softHeight(18);
    this.drawText(
      "长按识别二维码",
      { font: softHeight(14) + "px STHeitiSC", color: "#757580" },
      softHeight(203),
      drawStart,
      softHeight(20),
      ""
    );
    drawStart += softHeight(20);
    this.drawText(
      "进来秀秀你的美图吧",
      { font: softHeight(14) + "px STHeitiSC", color: "#757580" },
      softHeight(175),
      drawStart,
      softHeight(20),
      ""
    );
    $("#qrcode").empty();
  },
  makeSameSizeImg: function(targetImg, targetHeight) {
    var can = document.createElement("canvas");
    document.documentElement.appendChild(can);
    can.width = winW * this.ratio;
    can.height = this.maxHeight * this.ratio;
    var canContext = can.getContext("2d");
    canContext.scale(this.ratio, this.ratio);
    canContext.fillStyle = "#fff";
    canContext.fillRect(0, 0, winW, this.maxHeight);
    canContext.drawImage(
      targetImg,
      0,
      (this.maxHeight - targetHeight) / 2,
      this.boardWidth,
      targetHeight
    );
    var url = can.toDataURL("image/png");
    can.parentNode.removeChild(can);
    this.gifImgArr.push(url);
  },
  drawText: function(str, font, initX, initY, lineHeight, type, param) {
    /*
    str:要绘制的字符串
    font: 字体对象 {font: xx, fillStyle: xx}
    initX:绘制字符串起始x坐标
    initY:绘制字符串起始y坐标
    lineHeight:字行高
    type: 长度不确定的文案
    param: 是否极简版
    */
    var lineWidth = 0;
    var canvasWidth =
      param == "jj" ? this.contentWidth - softHeight(130) : this.contentWidth;
    var canvasWidth =
      param == "xt" ? this.contentWidth - softHeight(8) : this.contentWidth;
    var lastSubStrIndex = 0;

    var oldY = initY;

    this.boardContext.font = font.font;
    this.boardContext.fillStyle = font.color;

    for (var i = 0; i < str.length; i++) {
      lineWidth += this.boardContext.measureText(str[i]).width;
      if (lineWidth > canvasWidth) {
        // 减去initX,防止边界出现的问题
        this.boardContext.fillText(
          str.substring(lastSubStrIndex, i),
          initX,
          initY
        );
        initY += lineHeight;
        lineWidth = 0;
        lastSubStrIndex = i;
      }
      if (i == str.length - 1) {
        this.boardContext.fillText(
          str.substring(lastSubStrIndex, i + 1),
          initX,
          initY
        );
      }
    }

    switch (type) {
      case "titleHeight":
        this.posterMap.titleHeight = initY - oldY;
        this.boardHeight += this.posterMap.titleHeight;
        break;
      case "btitleHeight":
        this.posterMap.btitleHeight = initY - oldY + lineHeight;
        this.boardHeight += this.posterMap.btitleHeight;
        break;
      case "bactivityHeight":
        this.posterMap.bactivityHeight = initY - oldY + lineHeight;
        this.boardHeight += this.posterMap.bactivityHeight;
        break;
    }
  },
  calculateWordHeight: function(txt, fontSize, lineHeight) {
    var word = document.createElement("p");
    word.style.width = "80%";
    word.innerHTML = txt;
    word.style.fontSize = softHeight(fontSize) + "px";
    word.style.lineHeight = softHeight(lineHeight) + "px";

    this.wrap.appendChild(word);
    var wordHeight = word.offsetHeight;
    this.wrap.removeChild(word);
    return wordHeight;
  },
  getMaxHeight: function(arr) {
    if (arr instanceof Array && arr.length > 0) {
      return Math.max.apply(null, arr);
    } else {
      return arr;
    }
  }
};
function getPoster() {
  ISBIGMODE = true;
  puzzleHaibaoShow();
}
function getImgsHeight() {
  var jigsawUrl = loadImgUrl.shift();
  if (jigsawUrl) {
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.src = jigsawUrl;
    (img.onload = function() {
      var jigsawHeight = (img.height / img.width) * winW;
      if (JIGSAWTYPE == "poster") {
        jigsawHeight = POSTERTYPE === 0 ? jigsawHeight * 0.8 : jigsawHeight;
        jigsawHeight =
          POSTERTYPE === 1
            ? jigsawHeight * (1 - softHeight(30) / winW)
            : jigsawHeight;
      }
      if (JIGSAWTYPE == "videoShare" || JIGSAWTYPE == "xtShare") {
        jigsawHeight = jigsawHeight * 0.8;
      }
      jigsawImgHeight.push(jigsawHeight);
      jigsawImgEle.push(img);

      getImgsHeight();
    }),
      (img.onerror = function() {
        $(".masking").addClass("none");
        $("#qrcode").empty();
        toast("拼图失败");
      });
  } else {
    Jigsaw.init();
    return;
  }
}
function getImageUrl(base) {
  var realUrl = "";
  $.ajax({
    async: false,
    url: "/base/getUploadToken",
    type: "get",
    dataType: "json",
    success: function(data) {
      var myDate = new Date();
      var timestamp_ =
        (myDate.getMonth() + 1).toString() +
        myDate.getDate().toString() +
        myDate.getHours().toString() +
        myDate.getMinutes().toString() +
        myDate.getSeconds().toString() +
        myDate.getMilliseconds().toString();

      var token = data.uptoken;
      var pic = base;
      var encodeKey = window
        .btoa("plus/user/pic/tmp/" + timestamp_ + ".jpeg")
        .replace(/\//g, "_");
      var url = "https://upload-z0.qiniup.com/putb64/-1/key/" + encodeKey; //非华东空间需要根据注意事项 1 修改上传域名
      var afterUrl = "";
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          afterUrl = JSON.parse(xhr.responseText).key;
        }
      };
      xhr.open("POST", url, false);
      xhr.setRequestHeader("Content-Type", "application/octet-stream");
      xhr.setRequestHeader("Authorization", "UpToken " + token);
      xhr.send(pic);

      $.ajax({
        async: false,
        url: "/base/getUrl",
        type: "post",
        data: { url: afterUrl },
        dataType: "json",
        success: function(data) {
          realUrl = data.url;
        }
      });
    }
  });
  return realUrl + "&imageView2/0/format/jpg/q/85";
}

function diyNineReset() {
  $("#diyNinegridArea .icon-add").removeClass("none");
  $("#diyNinegridSure").addClass("disabled");
  diyNinegridDisabled = false;
  diyNinegrid.resetImage();
}
function diyNineClip() {
  if (!diyNinegridDisabled) {
    return;
  }
  diyNinegridDisabled = false;
  $(".loading--box").removeClass("none");
  diyNinegrid.imageClipper(function(data) {
    $(".ninegrid-box")
      .find(".nine-finish")
      .addClass("none");
    $(".ninegrid-box")
      .find(".icon-add")
      .removeClass("none");
    $(".loading--box").addClass("none");
    diyRender();
  });
}
function diyRender() {
  var wrap = document.querySelector("body");
  var diyCanvas = document.createElement("canvas");
  var targetImg = document.getElementById("Mavatar-render");
  wrap.appendChild(diyCanvas);
  var diyContext = diyCanvas.getContext("2d");
  // var  devicePixelRatio = window.devicePixelRatio || 1,
  // backingStoreRatio = diyContext.webkitBackingStorePixelRatio || diyContext.mozBackingStorePixelRatio || diyContext.msBackingStorePixelRatio || diyContext.oBackingStorePixelRatio || diyContext.backingStorePixelRatio || 1;
  // var ratio = devicePixelRatio / backingStoreRatio;
  // diyCanvas.width = diyCanvas.width * ratio;
  // diyCanvas.height = diyCanvas.height * ratio;
  // diyContext.scale(ratio, ratio);
  targetImg.onload = function() {
    var w = targetImg.width;
    var startX = 0,
      startY = 0,
      step = (w / 3).toFixed(2);
    var clipW = step * 2;
    diyCanvas.width = step;
    diyCanvas.height = step;
    NINEGRIDPICS = [];
    for (var i = 0; i < 9; i++) {
      diyContext.drawImage(
        targetImg,
        startX,
        startY,
        clipW,
        clipW,
        0,
        0,
        step,
        step
      );
      var resultUrl = diyCanvas.toDataURL("image/jpeg", 1);
      NINEGRIDPICS.push(resultUrl);
      diyContext.clearRect(0, 0, step, step);
      startX += clipW;
      if (startX === clipW * 3) {
        startX = 0;
        startY += clipW;
      }
    }
    setNinegrid();
    diyNineReset();
    wrap.removeChild(diyCanvas);
    $(".diyninegrid-wrapper").addClass("none");
  };
}
// 拼图视频
function initDiyVideoMusic() {
  var post = [
    "//q.plusx.cn/wechat/liveplus/image/mp3post1.png",
    "//q.plusx.cn/wechat/liveplus/image/mp3post2.png",
    "//q.plusx.cn/wechat/liveplus/image/mp3post3.png",
    "//q.plusx.cn/wechat/liveplus/image/mp3post4.png",
    "//q.plusx.cn/wechat/liveplus/image/mp3post5.png",
    "//q.plusx.cn/wechat/liveplus/image/mp3post6.png",
    "//q.plusx.cn/wechat/liveplus/image/mp3post7.png"
  ];
  var src = [
    "//q.plusx.cn/wechat/liveplus/music/mp3src1.mp3",
    "//q.plusx.cn/wechat/liveplus/music/mp3src2.mp3",
    "//q.plusx.cn/wechat/liveplus/music/mp3src3.mp3",
    "//q.plusx.cn/wechat/liveplus/music/mp3src4.mp3",
    "//q.plusx.cn/wechat/liveplus/music/mp3src5.mp3",
    "//q.plusx.cn/wechat/liveplus/music/mp3src6.mp3",
    "//q.plusx.cn/wechat/liveplus/music/mp3src7.mp3"
  ];
  var name = ["新年", "时尚", "摇滚", "月光", "海盗", "莫扎特", "赢定"];
  for (var i = 0; i < post.length; i++) {
    var dom =
      '\
    <li class="diyvideo-music__item row-start-center" data-src="' +
      src[i] +
      '">\
      <div class="diyvideo-music__post" style="background-image: url(' +
      post[i] +
      ')"></div>\
      <p class="diyvideo-music__name">' +
      name[i] +
      "</p>\
    </li>";
    $("#diyvideo-ul").append(dom);
  }
  $("#diyMusicPlay").attr("src", src[0]);
  $(".diyvideo-music__item")
    .eq(1)
    .children()
    .addClass("active");
}
function showMusicModal() {
  $("#diyVideoMusicModal").fadeIn();
  var src = $("#diyMusicPlay").attr("src");
  src ? $("#diyMusicPlay")[0].play() : null;
}
function closeMusicModal() {
  $("#diyVideoMusicModal").fadeOut();
  $("#diyMusicPlay")[0].pause();
}
function makeDiyVideo() {
  $("#diyVideoMusicModal").fadeOut();
  $(".masking").removeClass("none");
  $("#diyMusicPlay")[0].pause();
  $.ajax({
    url: "/activity/live/pic2video",
    dataType: "json",
    type: "get",
    data: {
      picList: SELECTEDHASHARR.toString(),
      activityNo: ACTIVITYNO,
      p3Type: MUSICTYPE,
      test: "test"
    },
    success: function(res) {
      if (res.success) {
        $.ajax({
          url: res.result,
          dataType: "json",
          Type: "get",
          success: function(data) {
            drawVideo(data.url, data.cover_img);
            diyVideoCode(data.url);
            $(".masking").addClass("none");
            $("#diyVideoModal").removeClass("none");
            $(".puzzle-cancel").trigger("click");
          },
          error: function() {
            toast("服务器异常");
            $(".masking").removeClass("none");
          }
        });
      } else {
        toast(res.message);
        $(".masking").removeClass("none");
      }
    }
  });
}
function changeDiyMusic() {
  var $this = $(this);
  MUSICTYPE = $this.index();
  $(".diyvideo-music__item")
    .children()
    .removeClass("active");
  $this.children().addClass("active");
  var src = $this.attr("data-src");
  var audioEle = $("#diyMusicPlay")[0];
  src
    ? $("#diyMusicPlay").attr("src", src)
    : $("#diyMusicPlay").attr("src", "");
  src ? audioEle.play() : audioEle.pause();
}
function quitDiyVideoModal() {
  var title = "确定离开吗？",
    mes = "";
  var $deleteImg = $(this).parent();
  var deleteIndex = $deleteImg.index();
  alertComfirm(title, mes, "#confirm-common");
  hideVideo(true);
  $(".alert-sure").on("click", function() {
    hideVideo(false);
    offComfirm();
    $("#diyVideoModal").addClass("none");
    DIYPLAYER.ready(function() {
      DIYPLAYER.pause();
    });
  });
  $(".alert-cancel").on("click", function() {
    hideVideo(false);
    offComfirm();
  });
}
function drawVideo(src, cover) {
  var options = {
    engineOrder: ["html5", "flash"],
    controls: true,
    file: src,
    type: "mp4",
    poster: cover,
    preload: "auto",
    autoplay: false
  };
  DIYPLAYER = new QiniuPlayer("video-diy", options);
  // andriod下
  if (browser.versions.android) {
    $("#video-diy")
      .find("video")
      .addClass("android");
  }
}
function diyVideoCode(url) {
  $.ajax({
    url: "/activity/live/video2code",
    dataType: "json",
    Type: "get",
    data: {
      videoUrl: url,
      test: "test"
    },
    success: function(data) {
      $("#diyVideoDown").attr("data-qr", data.result);
    }
  });
}
// videoShare
function videoShare() {
  var $this = $(this);
  var cover = $this.attr("data-cover");
  videoShareUser.url = $this.attr("data-url");
  JIGSAWTYPE = "videoShare";
  SELECTEDARR = [];
  SELECTEDARR = SELECTEDARR.concat(
    cover,
    "//q.plusx.cn/wechat/liveplus/image/play-icon.png",
    "//q.plusx.cn/wechat/liveplus/image/share-poster-bg.png"
    // 'http://s.plusx.cn/plus/immediate/8831670/201911610637455/playicon.png?imageView2/0/w/1600/h/3000/q/85&sign=c5bfd68d047e0a7c390f5e6d4ebb339c&t=5c4ad895',
    // 'http://s.plusx.cn/plus/immediate/8831670/201911610637455/shareposterbg.png?imageView2/0/w/1600/h/3000/q/85&sign=ad9b0308624eb759c6771b1258e9f89b&t=5c4ad895'
  );
  puzzledObj.count = 1;
  $(".container").off("touchmove");
  getPuzzle();
}
// xtShare
function xtShare() {
  var $this = $(this);
  var head = $this.attr("data-head");
  var first = $this.attr("data-first");
  showPicShareUser.name = $this.attr("data-wxname");
  showPicShareUser.comment = $this.attr("data-comment");
  JIGSAWTYPE = "xtShare";
  SELECTEDARR = [];
  $.ajax({
    url: "/fetchPic",
    dataType: "json",
    type: "get",
    data: { picUrl: head },
    success: function(data) {
      var head_ = data.result.url;
      console.log(head_);
      SELECTEDARR = SELECTEDARR.concat(
        first,
        "//q.plusx.cn/wechat/liveplus/image/showpic-share-icon2.png",
        "//q.plusx.cn/wechat/liveplus/image/showpic-share-icon1.png",
        head_,
        "//q.plusx.cn/wechat/liveplus/image/share-poster-bg.png"
      );
      puzzledObj.count = 1;
      $(".container").off("touchmove");
      getPuzzle();
    }
  });
}
