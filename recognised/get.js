var getRecognisedUser = require('./user').getRecognisedUser;
var getRecognisedExercise = require('./exercises').getRecognisedExercise;
var getRecognisedWorkout = require('./workout').getRecognisedWorkout;
var getWeightsForWorkout = require('./workout').getWeightsForWorkout;



exports.user = getRecognisedUser;
exports.exercise = getRecognisedExercise;
exports.workout = getRecognisedWorkout;
exports.getWeightsForWorkout = getWeightsForWorkout;