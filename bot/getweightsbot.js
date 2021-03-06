var getRecognised = require('./../recognised/get');
var getRecognisedUser = getRecognised.user;
var getRecognisedExercise = getRecognised.exercise;
var getRecognisedWorkout = getRecognised.workout;
var getWeightsForWorkout = getRecognised.getWeightsForWorkout;

var dataaccess = require('./../dataaccess/get');
var getMax = dataaccess.getMax;

var predicates = require('./../helpers/predicates').predicates;
var prettyPrintSets = require('./../prettyprint/pp_sets').prettyPrint;

var b = function (bot) {
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


exports.init = b;
exports.name = 'weights';
exports.description = 'get weights for known workouts';