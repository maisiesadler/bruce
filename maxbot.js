var predicates = require('./predicates').predicates;
var getRecognisedExercise = require('./recognisedexercises').getRecognisedExercise;
var getRecognisedUser = require('./recogniseduser').getRecognisedUser;

var woBot = function (bot, setMax, getMax) {
    var getExerciseForAction = function (action) {
        var hearWith = bot
            .hear(action + " {exercise} max")
            .merge(bot.hear(action + " max {exercise}"))
            .filter(msg => {
                msg.exercise = getRecognisedExercise(msg.exercise);
                return msg.exercise !== "";
            })
        var hearWithout = bot
            .hear(action + " max")
            .ask("what's the exercise?", { predicate: predicates.isRecognisedExercise, then: (msg, resp) => (msg.exercise = getRecognisedExercise(resp)) })
        return hearWith
            .merge(hearWithout)
    };

    var getExerciseWithUser = function (action) {
        return getExerciseForAction(action)
            .ask("who for?", { predicate: predicates.isRecognisedUser, then: (msg, resp) => { msg.who = getRecognisedUser(resp, msg.user.name); } });
    };

    getExerciseWithUser("update")
        .ask("what weight?", { predicate: predicates.positiveNumber, then: (msg, resp) => (msg.weight = resp) })
        .reply(m => m.weight + "kg for " + m.exercise + " isn't bad")
        .do(m => {
            setMax(m.who, m.exercise, m.weight);
        })
        .reply('done')
        .start();

    getExerciseWithUser("get")
        .do(m => {
            m.max = getMax(m.who, m.exercise)
        })
        .reply(m => {
            if (m.max == null)
                return "no max recorded!";
            return "max for " + m.who + " - " + m.exercise + " " + m.max + "kg";
        })
        .start();
};

exports.add = woBot;