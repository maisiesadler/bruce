var datastore = require('./datastore').ds;

var getOrAdd = function (obj, key) {
    if (!obj.hasOwnProperty(key))
        obj[key] = {};

    return obj[key];
};

var idxStructure = function (keys) {
    this.idx = function (obj, location, item) {
        var o = obj;
        keys.forEach(key => {
            var k = item[key];
            o.__level = key;
            o = getOrAdd(o, k);
        });

        o["location"] = location;
    };

    this.keys = JSON.parse(JSON.stringify(keys));
};

var fileLocation = 0;

var indexedDs = function (file, keys) {
    var idx = {};

    var structure = new idxStructure(keys);
    var indexData = function () {
        var data = ds.get();
        data.forEach(function (item, i) {
            structure.idx(idx, fileLocation, item);
            fileLocation++;
        }, this);

        return idx;
    };
    var ds = new datastore(file, indexData);

    this.add = function (item) {
        structure.idx(idx, fileLocation, item);
        fileLocation++;
        ds.add(item);
    };

    this.get = function (keyObj, level) {
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

        while (clone != null && clone.length === undefined &&
            level && clone.__level !== level && clone.__level !== "location") {
            var o = {};
            Object.getOwnPropertyNames(clone).forEach(p => {
                if (p === "__level")
                    return;
                var wo = clone[p];
                Object.getOwnPropertyNames(wo).forEach(w => {
                    o[w] = wo[w];
                })
            });

            clone = o;
        }

        return clone;
    };

    this.getAt = function (index) {
        return ds.getAt(index);
    };
};

exports.ds = indexedDs;