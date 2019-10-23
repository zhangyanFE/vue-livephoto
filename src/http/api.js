import request from "@/lib/request";
import Autograph from "@/lib/autographPlat";
import { getUdid, getUid, getUrlParams, platForm, getCookie } from "@/lib/util";

const protocol = `${window.location.protocol}`;
const requestUrl = `${protocol}//comm.yladm.com`;

// 通用播放页接口域名
let openapisUrl = "";
// 如果是早上好页面使用openapis.qianpailive.cn域名
if (getUrlParams("requestRefer") == 1) {
  openapisUrl = `${protocol}//openapis.qianpailive.cn`;
} else if (
  window.location.origin === "https://sv.1lan.tv" ||
  window.location.origin === "http://sv.1lan.tv" ||
  window.location.origin === "https://h5.1lan.tv" ||
  window.location.origin === "http://h5.1lan.tv"
) {
  openapisUrl = `${protocol}//openapis.1lan.tv`;
} else {
  openapisUrl = `${protocol}//openapis.yladm.com`;
}

// 小视频列表接口 ugcfeed
const openUgcFeedUrl = `${protocol}//openapiv2.yladm.com`;

// 极光早上好接口 openapis.qianpailive.cn
const morningRequestUrl = `${protocol}//openapis.qianpailive.cn/partner/jpush`;

function getUrlUdid() {
  return getUrlParams("udid") !== "" ? getUrlParams("udid") : getUdid();
}

const API = {
  jpushApi(data) {
    let req = data;
    const timestamp = new Date() * 1;
    const { content, app_key } = data;
    req.app_key = app_key;
    req.client_id = getUrlUdid();
    req.content = content;

    return request(`https://morning.jpush.cn/h5/morning`, req, "post");
  },
  videoListApi(data) {
    let req = data;
    const timestamp = new Date() * 1;
    const { access_key } = data;
    let signData = {
      access_key,
      timestamp,
      udid: getUrlUdid(),
      x_yl_h5: timestamp
    };
    let getsign = Autograph(signData);
    req.sign = getsign;
    req.timestamp = timestamp;
    req.x_yl_h5 = timestamp;
    req.platform = "h5";
    req.prid = "13";
    req.udid = getUrlUdid();

    return request(`${openUgcFeedUrl}/plat/ugcfeed`, req, "get");
  },
  zhuanjiListApi(data) {
    let req = data;
    const timestamp = new Date() * 1;
    const { access_key } = data;
    let signData = {
      access_key,
      timestamp,
      udid: getUrlUdid(),
      x_yl_h5: timestamp
    };
    let getsign = Autograph(signData);
    req.sign = getsign;
    req.timestamp = timestamp;
    req.udid = getUrlUdid();
    req.x_yl_h5 = timestamp;
    return request(
      `${protocol}//openapis.qianpailive.cn/partner/jpush/topic`,
      req,
      "get"
    );
  },
  recommendListApi(data) {
    let req = data;
    const timestamp = new Date() * 1;
    const { access_key, page, size, block_id, day, edition = "" } = data;
    let signData = {
      access_key,
      block_id,
      timestamp,
      udid: getUrlUdid(),
      size,
      page,
      day,
      x_yl_h5: timestamp,
      appkey: "yilan",
      pkg_name: "yilan.com"
    };
    let getsign = Autograph(signData);
    req.sign = getsign;
    req.timestamp = timestamp;
    req.udid = getUrlUdid();
    req.appkey = "yilan";
    req.pkg_name = "yilan.com";
    req.x_yl_h5 = timestamp;
    req.day = day;
    req.edition = edition;
    return request(`${morningRequestUrl}/blockvideo`, req, "get");
  },
  morningListApi(data) {
    let req = data;
    const timestamp = new Date() * 1;
    const { access_key, day, edition = "" } = data;
    let signData = {
      access_key,
      timestamp,
      day,
      x_yl_h5: timestamp,
      udid: getUrlUdid(),
      appkey: "yilan",
      pkg_name: "yilan.com"
    };
    let getsign = Autograph(signData);
    req.sign = getsign;
    req.timestamp = timestamp;
    req.udid = getUrlUdid();
    req.appkey = "yilan";
    req.pkg_name = "yilan.com";
    req.x_yl_h5 = timestamp;
    req.day = day;
    req.edition = edition;
    return request(`${morningRequestUrl}/homerecommend`, req, "get");
  },
  homeWeatherApi(data) {
    let req = data;
    const timestamp = new Date() * 1;
    const { access_key, day, location } = data;
    let signData = {
      access_key,
      timestamp,
      day,
      udid: getUrlUdid(),
      appkey: "yilan",
      pkg_name: "yilan.com",
      location
    };
    let getsign = Autograph(signData);
    req.sign = getsign;
    req.timestamp = timestamp;
    req.udid = getUrlUdid();
    req.appkey = "yilan";
    req.pkg_name = "yilan.com";
    req.x_yl_h5 = timestamp;
    req.day = day;
    req.location = location;
    return request(`${morningRequestUrl}/homeweather`, req, "get");
  },
  playVideoApi(data) {
    let req = data;
    const timestamp = new Date() * 1;
    const { access_key, id } = data;
    let signData = {
      access_key,
      id,
      timestamp,
      udid: getUrlUdid(),
      uid: getUid()
    };
    let getsign = Autograph(signData);
    req.sign = getsign;
    req.timestamp = timestamp;
    req.udid = getUrlUdid();
    req.uid = getUid();
    getUrlParams("requestRefer") == 1 ? (req.os = platForm()) : "";
    return request(`${openapisUrl}/plat/play`, req, "get");
  },
  prePlayVideoApi(data) {
    let req = data;
    const timestamp = new Date() * 1;
    const { access_key, id } = data;
    let signData = {
      access_key,
      id,
      timestamp,
      udid: getUdid(),
      uid: getUid()
    };
    let getsign = Autograph(signData);
    req.sign = getsign;
    req.timestamp = timestamp;
    req.udid = getUdid();
    req.uid = getUid();
    return request(`${openapisUrl}/plat/preplay`, req, "get");
  },
  getUgcVideoApi(data) {
    let req = data;
    const timestamp = new Date() * 1;
    const { access_key, id } = data;
    let signData = {
      access_key,
      id,
      timestamp,
      udid: getUdid(),
      uid: getUid(),
      platform: "h5",
      x_yl_h5: timestamp,
      prid: "13"
    };
    let getsign = Autograph(signData);
    req.sign = getsign;
    req.access_key = signData.access_key;
    req.platform = "h5";
    req.timestamp = timestamp;
    req.x_yl_h5 = req.timestamp;
    req.udid = signData.udid;
    req.uid = signData.uid;
    req.prid = "13"; // 标识
    return request(`${openapisUrl}/plat/ugcvideos`, req, "get");
  },
  getList(data) {
    let req = data;
    let timestamp = new Date() * 1;
    let { access_key, page, size, day } = data;

    let signData = {
      access_key,
      timestamp,
      x_yl_h5: timestamp,
      udid: getUdid(),
      appkey: getUrlParams("appkey"),
      pkg_name: getUrlParams("pkg_name"),
      page,
      size,
    };
    let getsign = Autograph(signData);
    req.sign = getsign;
    req.access_key = access_key;
    req.timestamp = timestamp;
    req.x_yl_h5 = timestamp;
    req.udid = signData.udid;
    // req.uid = signData.uid;
    req.page = page;
    req.size = size;
    req.day = day;
    req.appkey = signData.appkey;
    req.pkg_name = signData.pkg_name;
    return request(`${morningRequestUrl}/appvideos`, req, "get");
  },
  //小视频详情页中请求列表
  getUgcFeedApi(data) {
    let req = data;
    const timestamp = new Date() * 1;
    const { access_key, id } = data;
    let signData = {
      access_key,
      id,
      timestamp,
      udid: getUdid(),
      uid: getUid(),
      platform: "h5",
      x_yl_h5: timestamp,
      prid: "13"
    };
    let getsign = Autograph(signData);
    req.sign = getsign;
    req.access_key = signData.access_key;
    req.platform = "h5";
    req.timestamp = timestamp;
    req.x_yl_h5 = req.timestamp;
    req.udid = signData.udid;
    req.uid = signData.uid;
    req.prid = "13"; // 标识
    return request(`${openapisUrl}/plat/ugcfeed`, req, "get");
  },
  //测试环境小视频详情页中请求列表
  getAlphaUgcFeedApi(data) {
    let req = data;
    const timestamp = new Date() * 1;
    const { access_key, id, pg, sz, cate_id } = data;
    let signData = {
      access_key,
      id,
      pg,
      sz,
      cate_id,
      timestamp,
      udid: getUdid(),
      uid: getUid(),
      platform: "h5",
      x_yl_h5: timestamp,
      prid: "13"
    };
    let getsign = Autograph(signData);
    req.sign = getsign;
    req.access_key = signData.access_key;
    req.platform = "h5";
    req.id = data.id;
    req.timestamp = timestamp;
    req.x_yl_h5 = req.timestamp;
    req.udid = signData.udid;
    req.uid = signData.uid;
    req.prid = "13"; // 标识
    return request(`${openapisUrl}/plat/ugccatevideo`, req, "get");
  }
};

export default API;
