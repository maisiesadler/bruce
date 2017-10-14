var indexedDs = require('./indexeddatastore').ds;
var file = "/Users/maisiesadler/nodeapps/workouts/data/workouts.json";
var addOrm = require('./../impliedorm').addOrm;

var workoutDataStore = new indexedDs(file, ['who', 'what', 'when'], item => {
    return {
        howmuch: item.howmuch,
        howmany: item.howmany
    };
});

var addWorkout = function (when, who, what, howmuch, howmany) {
    var wo = {
        when: when,
        who: who,
        what: what,
        howmuch: howmuch,
        howmany: howmany
    };

    addOrm(wo);

    workoutDataStore.add(wo);
};

var getWorkoutsSince = function (who, what, when) {
    var search = {
        who: who,
        what: what
    };
    if (what === "all")
        delete search["what"];
    var matches = workoutDataStore.get(search, "when");

    if (matches == null)
        return [];
    var inRange = [];
    Object.getOwnPropertyNames(matches).forEach(date => {
        if (date > when) {
            var location = matches[date].location;
            var o = workoutDataStore.getAt(location);
            inRange.push(o);
        }
    });
    inRange = inRange.sort(function(a, b){return a.when-b.when});

    return inRange;
};

exports.add = addWorkout;
exports.get = getWorkoutsSince;