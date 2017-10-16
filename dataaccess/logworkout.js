var indexedDs = require('./indexeddatastore').ds;
var file = "/Users/maisiesadler/nodeapps/workouts/data/workouts.json";
var addOrm = require('./../helpers/impliedorm').addOrm;

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

var getWorkouts = function (who, what) {
    var search = {
        who: who,
        what: what
    };
    if (what === "all")
        delete search["what"];
    var matches = workoutDataStore.get(search, "when");

    if (matches == null)
        return [];

    var all = [];
    Object.getOwnPropertyNames(matches).forEach(date => {
        if (date === '__level')
            return;
        var location = matches[date].location;
        var o = workoutDataStore.getAt(location);
        all.push(o);
    });
    all = all.sort(function (a, b) { return a.when - b.when });

    return all;
}

var getWorkoutsSince = function (who, what, when) {
    return getWorkouts(who, what).filter(wo => wo.when > when);
};

var getLastWorkout = function (who, what) {
    var all = getWorkouts(who, what);

    return all[all.length - 1];
};



exports.add = addWorkout;
exports.get = getWorkoutsSince;
exports.last = getLastWorkout;