exports.bundleUrl = function (self) {
    var bundleUrl = self.$getConfig().bundleUrl;
    return bundleUrl;
};
//判断系统，安卓返回'android'，ios返回'iOS',h5返回'web'
exports.androidOrIos = function (self) {
    return self.$getConfig().env.platform;
};
//获取图片完整路径前缀
exports.getImageUrl = function (self) {
    var androidOrIos = this.androidOrIos(self);
    var bundleUrl = this.bundleUrl(self);
    var isHttp = bundleUrl.indexOf('http://') >= 0;
    var imageUrl;
    if (isHttp) {
        var i = bundleUrl.indexOf('/dist/');
        if (androidOrIos == "android") {
           imageUrl = bundleUrl.slice(0, i) + '/images/'; 
        } else if (androidOrIos == "iOS") {
           imageUrl = bundleUrl.slice(0, i) + '/images.bundle/'; 
        }
    } else {
        if (androidOrIos == "android") {
            imageUrl = 'assets:';
        } else if (androidOrIos == "iOS") {
            var i = bundleUrl.indexOf('XDPT.app');
            //vue语法中读取图片资源放在.bundle文件中
            //不然会出现The requested URL was not found on this server.
            imageUrl = bundleUrl.slice(0, i + 8) + '/images.bundle/';
        }
    }
    return imageUrl;
}

//对象类型判断，下面深，浅拷贝用
exports.util = (function () {
    var class2type = {};
    ["Null", "Undefined", "Number", "Boolean", "String", "Object", "Function", "Array", "RegExp", "Date"].forEach(function (item) {
        class2type["[object " + item + "]"] = item.toLowerCase();
    })

    function isType(obj, type) {
        return getType(obj) === type;
    }

    function getType(obj) {
        return class2type[Object.prototype.toString.call(obj)] || "object";
    }

    return {
        isType: isType,
        getType: getType
    }
})();
//对象深，浅拷贝
exports.copy = function (obj, deep) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }
    var i, target = this.util.isType(obj, "array") ? [] : {}, value, valueType;
    for (i in obj) {
        value = obj[i];
        valueType = this.util.getType(value);
        if (deep && (valueType === "array" || valueType === "object")) {
            target[i] = this.copy(value);
        } else {
            target[i] = value;
        }
    }
    return target;
}