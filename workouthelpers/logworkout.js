var indexedDs = require('./indexeddatastore').ds;
var file = "/Users/maisiesadler/nodeapps/workouts/workouts.json";

var ds = new indexedDs(file, ['who', 'what', 'when'], item => {
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

    ds.add(wo);
};

var getWorkoutsSince = function (who, what, when) {
    //var matches = ds.get(e => e.who === who && e.what === what && e.when > when);
    var matches = ds.get({
        who: who,
        what: what
    });

    var inRange = [];
    Object.getOwnPropertyNames(matches).forEach(date => {
        if(date > when){
           var o = matches[date];
           o.when = date;
           inRange.push(o);
        }
    });
    
    return inRange;
};

exports.add = addWorkout;
exports.get = getWorkoutsSince;