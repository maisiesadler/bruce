var workouts = {
    fto1: ['oneweek', '1w', '531-1'],
    fto3: ['threeweek', '3w', '531-3'],
    fto5: ['fiveweek', '5w', '531-5'],
    ftoR: ['restweek', 'Rw', '531-R'],
};

var plan = {
    fto1: [
        { reps: 5, weightPct: 75 },
        { reps: 3, weightPct: 85 },
        { reps: 1, weightPct: 95 },
    ],
    fto3: [
        { reps: 3, weightPct: 70 },
        { reps: 3, weightPct: 80 },
        { reps: 3, weightPct: 90 },
    ],
    fto5: [
        { reps: 5, weightPct: 65 },
        { reps: 5, weightPct: 75 },
        { reps: 5, weightPct: 85 },
    ],
    ftoR: [
        { reps: 5, weightPct: 40 },
        { reps: 5, weightPct: 50 },
        { reps: 5, weightPct: 60 },
    ]
};

var name = {
    fto1: 'fivethreeone-1',
    fto3: 'fivethreeone-3',
    fto5: 'fivethreeone-5',
    ftoR: 'fivethreeone-rest',
};

var gkef = require('./entity').getKnownEntityFunction;
var getRecognisedWorkout = gkef(workouts);

var getWeightsForWorkout = function (recognisedWo, exerciseMax) {
    var p = plan[recognisedWo];

    if (p == null)
        return [];

    var workoutPlan = {
        name: name[recognisedWo]
    };

    if (exerciseMax == null) {
        workoutPlan.planType = "pct";
        workoutPlan.sets = p;
    } else {
        workoutPlan.planType = "weights";
        workoutPlan.sets = p.map(pl => {
            var w = (exerciseMax * pl.weightPct / 100).toFixed(1);
            return {
                reps: pl.reps,
                weight: w
            };
        });
    }

    return workoutPlan;
};

exports.getRecognisedWorkout = getRecognisedWorkout;
exports.getWeightsForWorkout = getWeightsForWorkout;