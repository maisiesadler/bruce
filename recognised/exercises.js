var exercises = {
    squat: ['squats', 's'],
    bench: ['b'],
    deadlift: ['dl'],
    overheadpress: ['ohp']
};
var gkef = require('./entity').getKnownEntityFunction;
var getRecognisedExercise = gkef(exercises);

exports.getRecognisedExercise = getRecognisedExercise;