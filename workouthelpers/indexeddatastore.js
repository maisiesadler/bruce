var datastore = require('./datastore').ds;

var getOrAdd = function (obj, key) {
    if (!obj.hasOwnProperty(key))
        obj[key] = {};

    return obj[key];
};

var idxStructure = function (keys, getValueFn) {
    this.idx = function (obj, item) {
        var o = obj;
        keys.forEach(key => {
            var k = item[key];
            o = getOrAdd(o, k);
        });

        //var mk = item[mainKey];
        var v = getValueFn(item);
        Object.getOwnPropertyNames(v).forEach(p => {
            o[p] = v[p];
        });
    };

    this.keys = JSON.parse(JSON.stringify(keys));
};

var indexedDs = function (file, keys, getValueFn) {
    var idx = {};

    var structure = new idxStructure(keys, getValueFn);
    var indexData = function () {
        var data = ds.get();
        data.forEach(function (item) {
            structure.idx(idx, item);
        }, this);

        return idx;
    };
    var ds = new datastore(file, indexData);

    this.add = function (item) {
        structure.idx(idx, item);
        ds.add(item);
    };

    this.get = function (keyObj) {
        var clone = JSON.parse(JSON.stringify(idx));
        structure.keys.forEach(function (key) {
            if (keyObj.hasOwnProperty(key)) {
                var k = keyObj[key];
                clone = clone[k];
                delete keyObj[key];
            } else {
                // var pname = Object.getOwnPropertyNames(keyObj);
                // if (pname === undefined || pname.length > 0)
                //     return ds.get(); //todo: match all keys
            }
        }, this);

        return clone;
    };
};

exports.ds = indexedDs;