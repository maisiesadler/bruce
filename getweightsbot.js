var getRecognisedUser = require('./recogniseduser').getRecognisedUser;
var getRecognisedExercise = require('./recognisedexercises').getRecognisedExercise;
var getRecognisedWorkout = require('./recognisedworkout').getRecognisedWorkout;
var getWeightsForWorkout = require('./recognisedworkout').getWeightsForWorkout;
var predicates = require('./predicates').predicates;
var prettyPrintSets = require('./prettyprint/pp_sets').prettyPrint;

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
            var r = prettyPrintSets(msg.workoutPlan.planType, msg.exercise, msg.who, msg.workoutPlan.sets, msg.max);

            return r;
        })
        .start();
};


exports.add = b;