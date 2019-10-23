import { sendSpm } from "@/lib/util";

export const recommendListWebLog = (params) => {
    const { domEle, logId, defaultReferpage, eleArr } = params;
    // 精彩推荐展现埋点上报
    const windowH =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight; // 浏览器高度兼容写法
    for (let i = 0; i < domEle.length; i++) {
        const curItem = domEle[i];
        const pos = curItem.getBoundingClientRect();
        const videoId = curItem.getAttribute("videoid");
        const obj_ = {
            top: pos.top,
            bottom: pos.bottom,
            left: pos.left,
            right: pos.right
        };
        if (
            obj_.top >= 0 &&
            obj_.top < windowH &&
            obj_.bottom >= 0 &&
            obj_.bottom <= windowH
        ) {
            let isIn = eleArr.indexOf(i);
            if (isIn == -1) {
                sendSpm({
                    spmID: "10026",
                    type: 1,
                    eventName: "videoshow",
                    data: {
                        videoid: videoId,
                        logid: logId,
                        referpage: defaultReferpage,
                        pos: parseInt(i + 1)
                    }
                });
            }
            eleArr.push(i);
        }
    }
}