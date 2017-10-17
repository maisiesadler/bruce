var getRecognised = require('./../recognised/get');
var getRecognisedUser = getRecognised.user;
var getRecognisedExercise = getRecognised.exercise;
var getRecognisedWorkout = getRecognised.workout;
var getWeightsForWorkout = getRecognised.getWeightsForWorkout;
var prettyPrintSets = require('./../prettyprint/pp_sets').prettyPrint;

var dataaccess = require('./../dataaccess/get');
var getMax = dataaccess.getMax;
var getTodaysWorkout = dataaccess.getTodaysWorkout;

var initScheduleBot = function (bot) {
    bot
        .hear("whats my workout today")
        .merge(bot.hear("what is my workout today"))
        .merge(bot.hear("get todays workout"))
        .reply(msg => {
            var today = getTodaysWorkout();
            if (today.exercise === "")
                return "It's rest day!";

            if (today.exercise === "upper" || today.exercise === "lower")
                return "It's " + today.exercise + " today!";

            var who = getRecognisedUser(msg.user.name);
            var exercise = getRecognisedExercise(today.exercise);
            var workoutType = getRecognisedWorkout(today.workout);
            var max = getMax(who, exercise);
            var workoutPlan = getWeightsForWorkout(workoutType, max)

            var reply = "Your workout is " + workoutPlan.name + " for exercise " + exercise + "\n";
            reply += prettyPrintSets(workoutPlan.planType, exercise, who, workoutPlan.sets, max);

            return reply;
        })
        .start();
};

exports.init = initScheduleBot;
exports.name = 'schedule';
exports.description = 'find todays workout';