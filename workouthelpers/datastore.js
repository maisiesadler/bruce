var fs = require('fs');

var dataStore = function (filepath, onload) {
    var cache = [];

    fs.readFile(filepath, 'utf8', function (err, data) {
        if (!err) {
            cache = JSON.parse(data);
            if (onload)
                onload();
        } else {
            console.log(err);
        }
    });

    this.add = function (data) {
        cache.push(data);
        save();
    };

    this.get = function (conditionFn) {
        var clone = JSON.parse(JSON.stringify(cache));
        if (conditionFn && typeof conditionFn === "function")
            clone = clone.filter(m => conditionFn(m));

        return clone;
    };

    this.getAt = function (idx) {
        var item = cache[idx];
        var clone = JSON.parse(JSON.stringify(item));
        return clone;
    };

    var save = function () {
        var m = JSON.stringify(cache, null, 2);
        fs.writeFile(filepath, m, function (err) {
            if (err) {
                console.log(err);
            }
        });
    };
};

exports.ds = dataStore;