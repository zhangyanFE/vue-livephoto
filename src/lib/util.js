import Url from "@/lib/url";
const search = new Url();

export function isWeixin() {
  let ua = navigator.userAgent;
  return /micromessenger/.test(ua);
}

export function isAndroid() {
  let ua = navigator.userAgent;
  return ua.indexOf("Android") > -1 || ua.indexOf("Adr") > -1;
}

export function isiOS() {
  let ua = navigator.userAgent;
  return !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

export function curClient() {
  let ios = isiOS();
  let android = isAndroid();
  if (ios) {
    return "iPhone";
  } else if (android) {
    return "Android";
  } else {
    return "PC";
  }
}
export function isthaniOS11() {
  var _userAgent = window.navigator.userAgent;
  var _agent = _userAgent.toLowerCase();
  var _isiOSVersion;
  if (_agent.indexOf("like mac os x") > 0) {
    var regStr_saf = /os [\d._]*/gi;
    var _verinfo = _agent.match(regStr_saf);
    _isiOSVersion = (_verinfo + "")
      .replace(/[^0-9|_.]/gi, "")
      .replace(/_/gi, ".");
  }
  var _version_str = _isiOSVersion + "";
  if (_version_str != "undefined" && _version_str.length > 0) {
    _isiOSVersion = _isiOSVersion.substring(0, 2);
    return parseInt(_isiOSVersion);
  }
}

export function getCookie(name) {
  let arr;
  let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  arr = document.cookie.match(reg);

  if (arr) {
    return arr[2];
  } else {
    return null;
  }
}

export const getUid = function() {
  let uid = getAddressKey("uid") || "";
  uid = uid.split("/")[0];
  if (!uid) {
    uid = getAddressKey("c_uid");
    if (!uid) {
      uid = getAddressKey("suid");
      if (!uid) {
        let uidcook = getCookie("yl_uid");
        if (!uidcook) {
          uid = "";
        } else {
          uid = uidcook;
        }
      }
    }
  }
  uid = uid.substring(0, 64);
  setCookie("yl_uid", uid);
  return uid;
};

export const getUdid = function() {
  let udid = getAddressKey("udid") || "";
  udid = udid.split("/")[0];
  if (!udid) {
    udid = getAddressKey("c_udid");
    if (!udid) {
      udid = getAddressKey("sudid");
      if (!udid) {
        let udidcook = getCookie("yl_udid");
        if (!udidcook) {
          udid = generateSession(40);
        } else {
          udid = udidcook;
        }
      }
    }
  }
  setCookie("yl_udid", udid);
  return udid;
};
export const getPrid = function() {
  let prid = getAddressKey("prid") || "";
  prid = prid.split("/")[0];
  if (!prid) {
    prid = getAddressKey("sprid");
    if (!prid) {
      let pridcook = getCookie("yl_prid");
      if (!pridcook) {
        prid = "";
      } else {
        prid = pridcook;
      }
    }
  }
  setCookie("yl_prid", prid);
  return parseInt(prid);
};

export const getDeviceData = function() {
  let DeviceData = {};
  DeviceData.imei = getAddressKey("imei")
    ? getAddressKey("imei")
    : getAddressKey("simei")
    ? getAddressKey("simei")
    : getAddressKey("c_imeimd5")
    ? getAddressKey("c_imeimd5")
    : "";
  DeviceData.imeimd5 = getAddressKey("imeimd5")
    ? getAddressKey("imeimd5")
    : getAddressKey("simeimd5")
    ? getAddressKey("simeimd5")
    : getAddressKey("c_imeimd5")
    ? getAddressKey("c_imeimd5")
    : "";
  DeviceData.mac = (getAddressKey("mac")
    ? getAddressKey("mac")
    : getAddressKey("smac")
    ? getAddressKey("smac")
    : getAddressKey("c_mac")
    ? getAddressKey("c_mac")
    : ""
  ).toUpperCase();

  if (DeviceData.mac && DeviceData.mac.indexOf(":") == -1) {
    DeviceData.mac = str_to_mac(DeviceData.mac);
  }
  DeviceData.adid = getAddressKey("adid")
    ? getAddressKey("adid")
    : getAddressKey("sadid")
    ? getAddressKey("sadid")
    : getAddressKey("c_adid")
    ? getAddressKey("c_adid")
    : "";
  DeviceData.idfa = getAddressKey("idfa")
    ? getAddressKey("idfa")
    : getAddressKey("sidfa")
    ? getAddressKey("sidfa")
    : getAddressKey("c_idfa")
    ? getAddressKey("c_idfa")
    : "";
  return DeviceData;
};

function str_to_mac(mac) {
  return (
    mac.substring(0, 2) +
    ":" +
    mac.substring(2, 4) +
    ":" +
    mac.substring(4, 6) +
    ":" +
    mac.substring(6, 8) +
    ":" +
    mac.substring(8, 10) +
    ":" +
    mac.substring(10, 12)
  );
}

export const getMessageData = function() {
  let MessageData = {};
  // 设备品牌
  MessageData.brand = getAddressKey("brand")
    ? getAddressKey("brand")
    : getAddressKey("sbrand")
    ? getAddressKey("sbrand")
    : "";
  // 设备型号
  MessageData.model = getAddressKey("model")
    ? getAddressKey("model")
    : getAddressKey("smodel")
    ? getAddressKey("smodel")
    : "";
  // 网络环境 int 1-WIFI，2-5G以上，3-2G，4-3G，5-4G，0-未知
  MessageData.nt = getAddressKey("nt")
    ? getAddressKey("nt")
    : getAddressKey("snt")
    ? getAddressKey("snt")
    : "";
  // 运营商 int 运营商 70120-移动，70121-电信，70123-联通，0—其他
  MessageData.telecom = getAddressKey("telecom")
    ? getAddressKey("telecom")
    : getAddressKey("stelecom")
    ? getAddressKey("stelecom")
    : "";
  // 操作系统版本，如7.0
  MessageData.os_ver = getAddressKey("os_ver")
    ? getAddressKey("os_ver")
    : getAddressKey("sos_ver")
    ? getAddressKey("sos_ver")
    : "";
  //app版本
  MessageData.ver = getAddressKey("ver")
    ? getAddressKey("ver")
    : getAddressKey("sver")
    ? getAddressKey("sver")
    : "";
  //app包名
  MessageData.pkg_name = getAddressKey("pkg_name")
    ? getAddressKey("pkg_name")
    : getAddressKey("spkg_name")
    ? getAddressKey("spkg_name")
    : "";
  //屏幕分辨率宽度，单位像素
  MessageData.w = getAddressKey("w")
    ? getAddressKey("w")
    : getAddressKey("sw")
    ? getAddressKey("sw")
    : "";
  //屏幕分辨率高度，单位像素
  MessageData.h = getAddressKey("h")
    ? getAddressKey("h")
    : getAddressKey("sh")
    ? getAddressKey("sh")
    : "";
  return MessageData;
};
export const getDeviceTwoData = function() {
  let DeviceTwoData = {};
  DeviceTwoData.bs = getAddressKey("bs")
    ? getAddressKey("bs")
    : getAddressKey("c_bs")
    ? getAddressKey("c_bs")
    : "";
  DeviceTwoData.nw = getAddressKey("nw")
    ? getAddressKey("nw")
    : getAddressKey("c_nw")
    ? getAddressKey("c_nw")
    : "";
  DeviceTwoData.cityid = getAddressKey("cityid")
    ? getAddressKey("cityid")
    : getAddressKey("c_cityid")
    ? getAddressKey("c_cityid")
    : "";
  DeviceTwoData.strategy = getAddressKey("strategy")
    ? getAddressKey("strategy")
    : getAddressKey("c_strategy")
    ? getAddressKey("c_strategy")
    : "";
  DeviceTwoData.category = getAddressKey("category")
    ? getAddressKey("category")
    : getAddressKey("c_category")
    ? getAddressKey("c_category")
    : "";
  DeviceTwoData.s = getAddressKey("s")
    ? getAddressKey("s")
    : getAddressKey("c_s")
    ? getAddressKey("c_s")
    : "";
  DeviceTwoData.columns_id = getAddressKey("columns_id")
    ? getAddressKey("columns_id")
    : getAddressKey("c_columns_id")
    ? getAddressKey("c_columns_id")
    : "";
  DeviceTwoData.v = getAddressKey("v")
    ? getAddressKey("v")
    : getAddressKey("c_v")
    ? getAddressKey("c_v")
    : "";
  DeviceTwoData.stats_referer = getAddressKey("stats_referer")
    ? getAddressKey("stats_referer")
    : getAddressKey("c_stats_referer")
    ? getAddressKey("c_stats_referer")
    : "";
  return DeviceTwoData;
};
export const getAddressKey = function(key) {
  //获取地址栏参数
  var qsobj = query(window.location.href);
  if (qsobj) {
    return qsobj[key] || null;
  } else {
    return null;
  }
};

export const query = function(url) {
  //获取地址栏参数对象集合
  var _url = url ? url : this.url;
  if (_url.indexOf("?") != -1) {
    var qsobj = {};
    var thisqs = _url.split("?")[1];
    if (thisqs) {
      thisqs = thisqs.replace(/#/g, "");
      var pairs = thisqs.split("&");
      for (var i = 0; i < pairs.length; i++) {
        // var pair = pairs[i].split('=');
        // qsobj[pair[0]] = pair[1];
        var num = pairs[i].indexOf("=");
        qsobj[pairs[i].substring(0, num)] = pairs[i].substr(num + 1);
      }
    }
    return qsobj;
  } else {
    return null;
  }
};
export function setCookie(cName, value) {
  let Days = 300;
  let exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie =
    cName + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

export function getSid() {
  let SESSIONID = getCookie("SESSIONID");
  if (SESSIONID) {
    return SESSIONID;
  } else {
    let SESSIONID = generateSession(22);
    setCookie("SESSIONID", SESSIONID);
    return SESSIONID;
  }
}

export function generateSession(n) {
  var words = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];
  var nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  var chars = nums.concat(words).concat(
    words.map(function(s) {
      return s.toLowerCase();
    })
  );
  var res = "";
  for (var i = 0; i < n; i++) {
    var id = Math.ceil(Math.random() * 61);
    res += chars[id];
  }
  return res;
}

export function jsonp(params) {
  var callbackName = params.jsonp; //创建script标签并加入到页面中
  window[callbackName] = function(json) {
    head.removeChild(script);
    clearTimeout(script.timer);
    window[callbackName] = null;
    params.success && params.success(json);
  };
  var head = document.getElementsByTagName("head")[0];

  if (params.jsonpKey) {
    params.data[params.jsonpKey] = callbackName;
  } else {
    params.data["cb"] = callbackName;
  }
  var data = formatParams(params.data);
  var script = document.createElement("script");
  head.appendChild(script); //创建jsonp回调函数
  script.onerror = function() {
    head.removeChild(script);
    clearTimeout(script.timer);
    window[callbackName] = null;
    params.error &&
      params.error({
        message: "jsonp加载错误"
      });
  };
  script.onload = script.onreadystatechange = function(e) {
    // console.log(e)
  };
  if (params.url.indexOf("?") != -1) {
    script.src = params.url;
  } else {
    script.src = params.url + "?" + data;
  }
  //为了得知此次请求是否成功，设置超时处理
  if (params.time) {
    script.timer = setTimeout(function() {
      window[callbackName] = null;
      head.removeChild(script);
      params.error &&
        params.error({
          message: "超时"
        });
    }, params.time);
  }
}

export function sendScript(params) {
  var head = document.getElementsByTagName("head")[0];
  var script = document.createElement("script");
  head.appendChild(script); //创建jsonp回调函数
  console.log(params);
  script.src = params.url;
}
export function sendImgspm(params) {
  var _ele = document.createElement("IMG");
  var _src = params.url;
  if (_src.length >= 1900) {
    throw "SPM:URL excess max length!";
  }
  _ele.src = _src;
  _ele.style.display = "none";
  $$("body")[0].appendChild(_ele);
  _ele.onload = function() {
    $$("body")[0].removeChild(_ele);
  };
  _ele.onerror = function() {
    $$("body")[0].removeChild(_ele);
  };
}

function $$(SelectName) {
  return document.querySelectorAll(SelectName);
}

function formatParams(data) {
  var arr = [];
  for (var name in data) {
    arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
  } // 添加一个随机数，防止缓存
  // arr.push('v=' + Math.floor(Math.random() * 10000 + 500));
  return arr.join("&");
}

export function decrypt(data) {
  // AES 秘钥
  var AesKey = "1234123412ABCDEF";

  // 加密选项
  var CBCOptions = {
    iv: CryptoJS.enc.Utf8.parse(AesKey),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  };
  var key = CryptoJS.enc.Utf8.parse(AesKey);
  var decrypt = CryptoJS.AES.decrypt(data, key, CBCOptions);
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
//时间格式化 00:00
export function timestampToDateTimeFull(value) {
  var theTime = parseInt(value); // 秒
  var theTime1 = 0; // 分
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    if (theTime1 > 60) {
      theTime1 = parseInt(theTime1 % 60);
    }
  }
  var result = "" + parseInt(theTime) + "";
  if (result < 10) {
    result = "0" + parseInt(theTime) + "";
  }
  if (theTime1 > 0) {
    if (theTime1 < 10) {
      result = "0" + parseInt(theTime1) + ":" + result;
    } else {
      result = "" + parseInt(theTime1) + ":" + result;
    }
  } else {
    result = "0" + parseInt(theTime1) + ":" + result;
  }

  return result;
}
//数组去重
export function distinctArr(arr) {
  var i,
    obj = {},
    result = [],
    len = arr.length;
  for (i = 0; i < len; i++) {
    if (!obj[arr[i]]) {
      //如果能查找到，证明数组元素重复了
      obj[arr[i]] = 1;
      result.push(arr[i]);
    }
  }
  return result;
}

// 数字过万转换万单位
export function conversionUnit(num) {
  return num > 10000 ? Math.floor(num / 100) / 100 + "w" : num;
}

// 极光埋点上报
export function jpushWebLog(params) {
  window.YLSPM_JPUSH.RecordEvent({
    ...params
  });
}

// 埋点上报
export function sendSpm(params) {
  const { spmID, type, videoid = "", eventName = "", data } = params;
  window.YLSPM &&
    window.YLSPM.RecordEvent(
      spmID,
      {
        type,
        videoid,
        prid: getPrid() || "5", // 默认值：5
        ...data
      },
      eventName
    );
  // console.log(spmID, {
  //     type,
  //     videoid,
  //     prid: getPrid(),
  //     ...data
  // }, eventName)
}

// 封装截取地址栏参数
export function getUrlParams(params) {
  return (search.get(params) && search.get(params).split("/")[0]) || "";
}

// 封装JSBridge
export function sendJsBridge(event, data) {
  if (curClient() == "iPhone") {
    if (window.webkit) {
      window.webkit.messageHandlers[event] &&
        window.webkit.messageHandlers[event].postMessage(JSON.parse(data));
    }
  }
  if (curClient() == "Android") {
    if (window.YlJsBridge) {
      window.YlJsBridge[event] && window.YlJsBridge[event](data);
    }
  }
}

// 判断安卓还是ios
export function platForm() {
  if (curClient() == "iPhone") {
    return "iOS";
  } else if (curClient() == "Android") {
    return "Android";
  } else {
    return "PC";
  }
}

// NODE 环境变量
export function envVariable() {
  if (process.env.NODE_ENV == "development") {
    return `https://openpre.yladm.com`;
  } else {
    return `https://h5.yladm.com`;
  }
}
//将对象格式化为字符串拼接在url
export function addQueryString(params) {
  let paramsData = "";
  for (var Key in params) {
    paramsData += "&" + Key + "=" + params[Key];
  }
  return paramsData;
}
