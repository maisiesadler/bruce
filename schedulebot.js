var getRecognisedUser = require('./recogniseduser').getRecognisedUser;
var getRecognisedExercise = require('./recognisedexercises').getRecognisedExercise;
var getRecognisedWorkout = require('./recognisedworkout').getRecognisedWorkout;
var getWeightsForWorkout = require('./recognisedworkout').getWeightsForWorkout;

var initScheduleBot = function (bot, getTodaysWorkout, getMax) {
    bot
        .hear("whats my workout today")
        .reply(msg => {
            var today = getTodaysWorkout();
            var who = getRecognisedUser(msg.user.name);
            var exercise = getRecognisedExercise(today.exercise);
            var workoutType = getRecognisedWorkout(today.workout);
            var max = getMax(who, exercise);
            var workoutPlan = getWeightsForWorkout(workoutType, max);
            var prettyPrintSets = require('./prettyprint/pp_sets').prettyPrint;

            var reply = "Your workout is " + workoutPlan.name + " for exercise " + exercise + "\n";
            reply += prettyPrintSets(workoutPlan.planType, exercise, who, workoutPlan.sets, max);

            return reply;
        })
        .start();
};

exports.init = initScheduleBot;