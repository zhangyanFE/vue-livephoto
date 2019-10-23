const isMobile = /mobile/i.test(window.navigator.userAgent);

const utils = {
  /**
   *  分析时间字符串
   * @param { Number } second
   * @return { String } 00:00 || 00:00:00
   *
   */
  secondToTime: second => {
    const add0 = num => (num < 10 ? `0${num}` : `${num}`);
    const hour = Math.floor(second / 3600);
    const min = Math.floor((second - hour * 3600) / 60);
    const sec = Math.floor(second - hour * 3600 - min * 60);

    return (hour > 0 ? [hour, min, sec] : [min, sec]).map(add0).join(":");
  },
  /**
   * 优化控制播放进度
   * 视频播放器优化获取元素的视图位置
   * 获取绑定客户端矩形
   * @param { String } ele
   * @return { String } ''
   */
  getBoundingClientRectViewLeft(ele) {
    const scrollTop =
      window.scrollY ||
      window.pageYOffset ||
      document.body.scrollTop +
        ((document.documentElement && document.documentElement.scrollTop) || 0);
    if (ele.getBoundingClientRect) {
      if (typeof this.getBoundingClientRectViewLeft.offset !== "number") {
        let temp = document.createElement("div");
        temp.style.cssText = "position: absolute; top: 0; left: 0;";
        document.body.appendChild(temp);
        this.getBoundingClientRectViewLeft.offset =
          -temp.getBoundingClientRect().top - scrollTop;
        document.body.removeChild(temp);
        temp = null;
      }
      const rect = ele.getBoundingClientRect();
      const offset = this.getBoundingClientRectViewLeft.offset;

      return rect.left + offset;
    } else {
      // 对于不支持 getBoundingClientRect 做相应的处理
      this.getEleViewLeft(ele);
    }
  },
  /**
   * 控制拖拽播放进度
   * 获取元素的视图位置
   * @param { String } ele
   * @return { String } ''
   *
   */
  getEleViewLeft: ele => {
    let actuaLeft = ele.offsetLeft;
    let current = ele.offsetParent;
    const eleScrollLeft =
      document.body.scrollLeft + document.documentElement.scrollLeft;
    if (
      document.fullscreenElement !== null &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      while (current !== null) {
        actuaLeft += current.offsetLeft;
        current = current.offsetParent;
      }
    } else {
      while (current !== null && current !== ele) {
        actuaLeft += current.offsetLeft;
        current = current.offsetParent;
      }
    }
    console.log(actuaLeft - eleScrollLeft);
    return actuaLeft - eleScrollLeft;
  },
  /**
   *  获取滚动的位置
   *
   * @returns
   */
  getScrollPosition() {
    return {
      left:
        window.pageXOffset ||
        document.body.scrollTop ||
        document.documentElement.scrollTop ||
        0,
      top:
        window.pageYOffset ||
        document.body.scrollTop ||
        document.documentElement.scrollTop ||
        0
    };
  },
  /**
   * 设置滚动的位置
   *
   * @param {*} { left = 0, top = 0 }
   */
  setScrollPosition({ left = 0, top = 0 }) {
    window.scrollTo(left, top);
  },
  /**
   * 获取元素top、left值
   *
   * @param { String } element
   */
  cumulativeOffset: element => {
    let top = 0,
      left = 0;
    do {
      top += element.offsetTop || 0;
      left += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);

    return {
      top: top,
      left: left
    };
  },
  isMobile: isMobile,
  eventMap: {
    dragStart: isMobile ? "touchstart" : "mousedown",
    dragMove: isMobile ? "touchmove" : "mousemove",
    dragEnd: isMobile ? "touchend" : "mouseup"
  },
  storage: {
    setStorage: (key, val) => {
      localStorage.setItem(key, val);
    },
    getStorage: key => {
      localStorage.getItem(key);
    }
  }
};

export default utils;
