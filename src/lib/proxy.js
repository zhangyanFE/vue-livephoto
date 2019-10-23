var Flower = function () {}
var xiaoming = {
    sendFlower: function (target) {
        var flower = new Flower();
        target.receiveFlower(flower);
    }
}

var A = {
    receiveFlower: function (flower) {
        console.log('收到花' + flower)
    }
}

xiaoming.sendFlower(A);


var Flower2 = function () {}
var xiaoming2 = {
    sendFlower: function (target) {
        var flower = new Flower2();
        target.receiveFlower(flower);
    }
}

var B = {
    receiveFlower: function (flower) {
        A2.receiveFlower(flower);
    }
}

var A2 = {
    receiveFlower: function (flower) {
        console.log('收到花' + flower)
    }
}

xiaoming2.sendFlower(B)



var Flower3 = function () {}
var xiaoming3 = {
    sendFlower: function (target) {
        var flower = new Flower3();
        target.receiveFlower(flower);
    }
}

var B3 = {
    receiveFlower: function (flower) {
        A3.listenGoodMood(function () { // 监听 A的心情
            A3.receiveFlower(flower);
        })
    }
}

var A3 = {
    receiveFlower: function (flower) {
        console.log('收到花' + flower);
    },
    listenGoodMood: function (fn) {
        setTimeout(() => {  // 假设3秒之后A的心情变好
            fn();
        }, 3000)
    }
}

xiaoming3.sendFlower(B3)