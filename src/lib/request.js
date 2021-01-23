import axios from "axios";
import qs from "qs";
import isPlainObject from "lodash/isPlainObject";

const http = axios.create({
  baseURL: process.env.VUE_APP_HOST,
  timeout: 1000 * 180,
  headers: {'content-type': 'application/x-www-form-urlencoded'}
  // withCredentials: true
});

/**
 * 请求拦截
 */
http.interceptors.request.use(
  config => {
    // 默认参数
    var defaults = {};
    // 防止缓存，GET请求默认带_t参数
    if (config.method === "get") {
      config.params = {
        ...config.params,
        ...{ _t: new Date().getTime() }
      };
    }
    if (isPlainObject(config.params)) {
      config.params = {
        ...defaults,
        ...config.params
      };
    }
    if (isPlainObject(config.data)) {
      config.data = {
        ...defaults,
        ...config.data
      };
      if (
        /^application\/x-www-form-urlencoded/.test(
          config.headers["content-type"]
        )
      ) {
        config.data = qs.stringify(config.data);
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截
 */
http.interceptors.response.use(
  response => {
    if (response.data.code === "401" || response.data.code === "10001") {
      return Promise.reject(response.data.message);
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
export default http;
