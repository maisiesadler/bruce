var datastore = require('./datastore').ds;
// var scheduleFile = "/Users/maisiesadler/nodeapps/workouts/data/schedule.json";

// var ds = new datastore(scheduleFile);

var exercises = [
    "upper", "squats", "", "deadlift", "bench", "lower", ""
];

var weightGroup = [
    "531-5", "531-3", "531-1", "531-R"
];

var hr = 3600000;
var day = hr * 24;

var recordedCheckpoint = {
    date: Date.now(),
    day: 16
};
var createSchedule = function () {
    var schedule = [];

    weightGroup.forEach(w => {
        exercises.forEach(d => {
            schedule.push({
                exercise: d,
                workout: w
            });
        });
    });

   // schedule.forEach(s => console.log(s));

    return schedule;
};

var whatistoday = function () {
    var schedule = createSchedule();
    var timesincecheckpoint = Date.now() - recordedCheckpoint.date;
    var dayssincecheckpoint = parseInt(timesincecheckpoint / day);

    var today = (dayssincecheckpoint + recordedCheckpoint.day - 1) % schedule.length;

    return schedule[today];
};

// var getMax = function (person, exercise) {
//     var pMax = ds.get(m => m.person === person && m.exercise == exercise);
//     if (pMax.length === 0)
//         return null;

//     var max = pMax.sort(function (a, b) {
//         return b.date - a.date;
//     })

//     return max[0].max;
// };

exports.whatistoday = whatistoday;