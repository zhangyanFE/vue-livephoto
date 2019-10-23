import axios from 'axios';

// 输出方法
export default function request(url, data = {}, method = 'post') {
    // 请求的基本配置
    const service = axios.create({
        baseURL: process.env.API_ROOT, // 接口域名地址
        headers: {
            'Content-Type': method.toLowerCase() === 'get' ? 'application/x-www-form-urlencoded;charset=utf-8' : 'multipart/form-data'
        }
    })
    return new Promise((resolve, reject) => {
        const options = {
            url,
            method
        }
        if (method.toLowerCase() === 'get') {
            options.params = data;
        } else {
            options.data = data;
        }
        service(options)
            .then(res => {
                if(res.data.retcode == 200) {
                    // console.log(res);
                    resolve(res.data); 
                }
            })
            .catch(error => {
                reject(error)
                console.error(error);
            })
    })

}