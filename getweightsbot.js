var getRecognisedUser = require('./recogniseduser').getRecognisedUser;
var getRecognisedExercise = require('./recognisedexercises').getRecognisedExercise;
var getRecognisedWorkout = require('./recognisedworkout').getRecognisedWorkout;
var getWeightsForWorkout = require('./recognisedworkout').getWeightsForWorkout;
var predicates = require('./predicates').predicates;

var b = function (bot, getMax) {
    var getMsgWithInfo = () => {
        var getweightandperson = bot
            .hear('get my weights for {workoutType}')
            .filter(msg => {
                msg.workoutType = getRecognisedWorkout(msg.workoutType);
                return msg.workoutType !== "";
            })
            .do(msg => {
                msg.who = getRecognisedUser(msg.user.name)
                return msg;
            });

        var askwho = bot
            .hear('get weights for {workoutType}')
            .filter(msg => {
                msg.workoutType = getRecognisedWorkout(msg.workoutType);
                return msg.workoutType !== "";
            })
            .ask("who for?", { predicate: predicates.isRecognisedUser, then: (msg, resp) => { msg.who = getRecognisedUser(resp, msg.user.name); } })
            
        var ask = getweightandperson.merge(askwho)
            .ask("which exercise?", { predicate: predicates.isRecognisedExercise, then: (msg, resp) => (msg.exercise = getRecognisedExercise(resp)) });


        return ask;
    };

    getMsgWithInfo()
        .do(msg => {
            msg.max = getMax(msg.who, msg.exercise);
            msg.workoutPlan = getWeightsForWorkout(msg.workoutType, msg.max);
        })
        .reply(msg => {
            var r = "";
            if (msg.workoutPlan.planType === "pct")
                r = "*I couldn't find a max " + msg.exercise + " for " + msg.who + ", but here are the percentages*\n";
            else{
                r = "*Here are the weights for " + msg.who + "*\n";
                r += "`Current max " + msg.exercise + " is " + msg.max + "`\n";
            }

            msg.workoutPlan.sets.forEach(set => {
                if (set.weight != null)
                    r += set.reps + " x " + set.weight + "kg\n";
                else if (set.weightPct != null)
                    r += set.reps + " x " + set.weightPct + "%\n";
            });

            return r;
        })
        .start();
};


exports.add = b;