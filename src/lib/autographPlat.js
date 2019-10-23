import MD5 from 'js-md5';

//加密盐
var salt = 'Cx2LBrnRAqRsJOhrMMieBu07jvJu3a91';

var saltHT = 'TuXInMLidHlhI4iwy3GmYmr8CmcNTXQu';

/*** 对象按键排序*/
function objKeySort(obj) {
    var newkey = Object.keys(obj).sort();
    //创建一个新的对象，用于存放排好序的键值对
    var newObj = {};
    for (var i = 0; i < newkey.length; i++) {
        newObj[newkey[i]] = obj[newkey[i]];
    }
    return newObj;
}

/*** 签名算法*/
export default function genSign(data,isHT='access_token') {
    // console.log(isHT)
    var str = '';
    if (!data || !salt) {
        return str;
    }
    var map = objKeySort(data);
    map[isHT] = 'MARexyHggm5YDfbc3fCbqnXTziXSYFbL';
    for (var i in map) {
        str += i + '=' + map[i] + '&';
    }
    //移除尾部&
    str = str.substr(0, str.length - 1);
    return MD5(str);
}
