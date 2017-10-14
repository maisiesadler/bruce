var exercises = {
    squat: ['squats', 's'],
    bench: ['b'],
    deadlift: ['dl']
};
var knownExerciseMap = {};
(function () {
    Object.getOwnPropertyNames(exercises).forEach(exercise => {
        if (knownExerciseMap.hasOwnProperty(exercise))
            throw new Error('Already registered exercise ' + exercise + ' as ' + knownExerciseMap[exercise]);
        knownExerciseMap[exercise] = exercise;

        var synonymArr = exercises[exercise];
        synonymArr.forEach(syn => {
            if (syn === "")
                return;

            if (knownExerciseMap.hasOwnProperty(syn))
                throw new Error('Already registered synonym ' + syn + ' for ' + knownExerciseMap[syn]);

            knownExerciseMap[syn] = exercise;
        })
    });
})();

var getRecognisedExercise = function (input) {
    if (knownExerciseMap.hasOwnProperty(input)) {
        return knownExerciseMap[input];
    }

    return "";
};

exports.getRecognisedExercise = getRecognisedExercise;