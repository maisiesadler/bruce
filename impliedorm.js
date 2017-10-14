var getOrm = function (reps, weight) {
    var orm = weight * Math.pow(reps, 0.1);
    return orm.toFixed(1);
};

var addOrm = function (obj) {
    var weight = obj.howmuch;
    var reps = obj.howmany;
    var orm = weight * Math.pow(reps, 0.1);
    obj.impliedOrm = orm.toFixed(1);
};

exports.addOrm = addOrm;