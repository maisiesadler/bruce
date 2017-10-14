var predicates = require('./predicates');
var getRecognisedExercise = require('./recognisedexercises').getRecognisedExercise;

var woBot = function (bot, setMax, getMax) {
    var getExerciseForAction = function (action) {
        var hearWith = bot
            .hear(action + " {exercise} max");
        var hearWithout = bot
            .hear(action + " max")
            .ask("what's the exercise?", { predicate: resp => getRecognisedExercise(resp) !== "", then: (msg, resp) => (msg.exercise = getRecognisedExercise(resp)) })
        return hearWith
            .merge(hearWithout)
    };

    getExerciseForAction("update")
        .ask("what weight?", { predicate: predicates.positiveNumber, then: (msg, resp) => (msg.weight = resp) })
        .reply(m => m.weight + "kg for " + m.exercise + " isn't bad")
        .do(m => {
            setMax(m.user.name, m.exercise, m.weight);
        })
        .reply('done')
        .start();

    getExerciseForAction("get")
        .do(m => {
            m.max = getMax(m.user.name, m.exercise)
        })
        .reply(m => {
            if (m.max == null)
                return "no max recorded!";
            return "your max " + m.exercise + " is " + m.max + "kg";
        })
        .start();
};

exports.add = woBot;