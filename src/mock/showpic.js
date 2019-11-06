var showPicBase64Arr = []; // base64
var showPicPreviewArr = [];
var showPicPubCount = 0; // ios传七牛
var showPicCount = 9;
var successCount = 0; // android传微信

$(showpicInit);
function showpicInit() {
  $(".container").on("click", ".xt-button__1", chooseShowPic);
  $("#showPicModal").on("click", "#showPicPub", pubShowPicReady);
  $("#showPicModal").on("click", "#showPicUploadBox", chooseShowPic);
  $("#showPicModal").on("click", ".showpic-delitem", delShowPic);
  $("#showPicModal").on("click", ".showpic-preupload", showSwiperSimple2);

  $("#showPicModal").on("click", "#showPicReturn", backShowPic);
  // $('.xt-tip').click(function() {$(this).remove();})
  $(".showPic").on("click", ".xt-item__click", showSwiperSimple1);
  $(".showPic").on("click", ".discuss-item__open", openArticle);
}

function chooseShowPic() {
  visitRecord("live_button", "showpic_click");
  wxGetInfo("showpic");
  $("#showPicModal").removeClass("none");
  $(".xt-tip").remove();
  wx.chooseImage({
    count: showPicCount,
    sizeType: ["original", "compressed"],
    success: function(res) {
      var ids = res.localIds;
      showPicCount -= ids.length;
      if (showPicCount === 0) {
        $(".showpic-upload").addClass("none");
      }
      getChooseImgData(ids);
    }
  });
}
function getChooseImgData(ids) {
  if (browser.versions.android) {
    for (var i = 0; i < ids.length; i++) {
      (function() {
        uploadToWx(ids, i);
      })(i);
    }
  } else {
    for (var i = 0; i < ids.length; i++) {
      wx.getLocalImgData({
        localId: ids[i], // 图片的localID
        sizeType: ["original", "compressed"],
        success: function(res) {
          var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
          if (localData.indexOf("data:image") != 0) {
            localData = "data:image/jpeg;base64," + localData;
          }
          localData = localData
            .replace(/\r|\n/g, "")
            .replace("data:image/jgp", "data:image/jpeg");
          showPicBase64Arr.push(localData.slice(23));
          showPicPreviewArr.push(localData);
          renderShowPic(localData);
        },
        error: function() {
          alert("error");
        }
      });
    }
  }
}
function renderShowPic(base) {
  var item =
    '<div class="showpic-preupload showpic-upitem" style="background-image: url(' +
    base +
    ')">\
                <span class="showpic-delitem row-all-center"><i class="iconfont icon-guanbi"></i></span>\
              </div>';
  $(".showpic-upload").before(item);
}
function delShowPic(e) {
  e.stopPropagation();
  var $that = $(this),
    $index = $that.parent().index();
  alertComfirm("确认删除这张照片吗？", "", "#confirm-common");
  $(".alert-sure").on("click", function() {
    $that.parent().remove();
    showPicBase64Arr.splice($index, 1);
    showPicPreviewArr.splice($index, 1);
    offComfirm();
    showPicCount++;
    if (showPicCount > 0) {
      $(".showpic-upload").removeClass("none");
    }
  });
  $(".alert-cancel").on("click", offComfirm);
}
function pubShowPicReady() {
  var len = showPicBase64Arr.length;
  if (!len) {
    toast("请选择图片后发布");
    return;
  }
  $(".loading--box").removeClass("none");

  if (browser.versions.android) {
    pubShowPic(showPicBase64Arr);
  } else {
    for (var i = 0; i < len; i++) {
      (function() {
        var base64Item = showPicBase64Arr[i];
        upShowPicToQiniu(base64Item, i, len);
      })(i);
    }
  }
}
function upShowPicToQiniu(base, index, len) {
  var realUrl = "";
  var myDate = new Date();
  var timestamp_ =
    (myDate.getMonth() + 1).toString() +
    myDate.getDate().toString() +
    myDate.getHours().toString() +
    myDate.getMinutes().toString() +
    myDate.getSeconds().toString() +
    myDate.getMilliseconds().toString();
  var token = TOKEN;
  var pic = base;
  var encodeKey = window
    .btoa("plus/user/pics/tmp/" + timestamp_ + ".jpeg")
    .replace(/\//g, "_");
  var url = "https://upload-z0.qiniup.com/putb64/-1/key/" + encodeKey; //非华东空间需要根据注意事项 1 修改上传域名
  var afterUrl = "";
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      afterUrl = JSON.parse(xhr.responseText).key;
      showPicBase64Arr.splice(index, 1, afterUrl);
      showPicPubCount++;
      if (showPicPubCount === len) {
        showPicPubCount = 0;
        for (var j = 0; j < len; j++) {
          (function() {
            var keyItem = showPicBase64Arr[j];
            getShowPicUrl(keyItem, j);
          })(j);
        }
      }
    }
  };
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/octet-stream");
  xhr.setRequestHeader("Authorization", "UpToken " + token);
  xhr.send(pic);
}
function getShowPicUrl(url, index) {
  $.ajax({
    url: "/base/getUrl",
    type: "post",
    data: { url: url },
    dataType: "json",
    success: function(data) {
      realUrl = data.url + "&imageView2/0/format/jpg/q/85";
      showPicBase64Arr.splice(index, 1, realUrl);
      showPicPubCount++;
      if (showPicPubCount === showPicBase64Arr.length) {
        pubShowPic(showPicBase64Arr);
      }
    }
  });
}
function pubShowPic(arr) {
  var comment = replaceReturn($("#showPicContent").val());
  $.ajax({
    url: "/activity/live/comment/add",
    type: "get",
    data: {
      comment: comment,
      activityNo: ACTIVITYNO,
      type: 1,
      pics: arr.toString()
    },
    dataType: "json",
    success: function(data) {
      if (data.success) {
        toast('提交成功！<br>待审核后显示<br>可先前往"我的"中查看');
        setTimeout(emptyShowPic, 500);
      } else {
        toast("服务器错误");
      }
      $(".loading--box").addClass("none");
    },
    error: function() {
      toast("输入的文字过长");
      $(".loading--box").addClass("none");
    }
  });
}
function backShowPic() {
  alertComfirm(
    "返回后此页内容将不会被保存， <br>是否确认离开？",
    "",
    "#confirm-common"
  );
  $(".alert-sure").on("click", function() {
    offComfirm();
    emptyShowPic();
  });
  $(".alert-cancel").on("click", offComfirm);
}
function emptyShowPic() {
  $("#showPicContent").val("");
  $(".showpic-preupload").remove();
  $("#showPicModal").addClass("none");
  showPicBase64Arr = [];
  showPicPreviewArr = [];
  showPicPubCount = 0;
  successCount = 0;
  showPicCount = 9;
}
function showSwiperSimple1() {
  var $this = $(this),
    $index = $this.index();
  var arr = $this.attr("data-arr").split(",");
  swiperSimple(arr, $index);
}
function showSwiperSimple2() {
  var $this = $(this),
    $index = $this.index();
  swiperSimple(showPicPreviewArr, $index);
}
function openArticle() {
  var $this = $(this),
    pre = $this.prev(),
    isPreHide = pre.hasClass("hide");
  if (isPreHide) {
    pre.removeClass("hide");
    LANGUAGE ? $this.html("Show Less") : $this.html("收起");
  } else {
    pre.addClass("hide");
    LANGUAGE ? $this.html("Show More") : $this.html("全文");
  }
}
function uploadToWx(ids, i) {
  $(".loading--box").removeClass("none");
  wx.uploadImage({
    localId: ids[i], // 需要上传的图片的本地ID，由chooseImage接口获得
    isShowProgressTips: 0, // 默认为1，显示进度提示
    success: function(res) {
      successCount++;
      var serverId = res.serverId; // 返回图片的服务器端ID
      ids.splice(i, 1, serverId); // ids作为serverId数组
      if (successCount === ids.length) {
        successCount = 0;
        $.ajax({
          url: "/getimgfromwx",
          dataType: "json",
          type: "get",
          data: {
            mediaId: ids.toString(),
            qiniuPrefix: "plus/user/pics/tmp/"
          },
          success: function(data) {
            if (data.success) {
              var pics = data.result.pics;
              showPicBase64Arr = showPicBase64Arr.concat(pics);
              showPicPreviewArr = showPicPreviewArr.concat(pics);
              for (var m = 0; m < pics.length; m++) {
                renderShowPic(pics[m]);
              }
            } else {
              toast("服务器异常");
            }
            $(".loading--box").addClass("none");
          },
          error: function() {
            alert("error");
          }
        });
      }
    }
  });
}
