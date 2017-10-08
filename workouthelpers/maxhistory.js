var datastore = require('./datastore').ds;
var maxesFile = "/Users/maisiesadler/nodeapps/workouts/maxes.json";

var ds = new datastore(maxesFile);


var addMax = function (person, exercise, newMax) {
    var mx = {
        person: person,
        exercise: exercise,
        max: newMax,
        date: Date.now()
    };

    ds.add(mx);
};
var getMax = function (person, exercise) {
    var pMax = ds.get(m => m.person === person && m.exercise == exercise);
    if (pMax.length === 0)
        return null;

    var max = pMax.sort(function (a, b) {
        return b.date - a.date;
    })

    return max[0].max;
};


exports.addMax = addMax;
exports.getMax = getMax;