var predicates = require('./../helpers/predicates').predicates;
var getRecognised = require('./../recognised/get');
var getRecognisedUser = getRecognised.user;
var getRecognisedExercise = getRecognised.exercise;

var dataaccess = require('./../dataaccess/get');
var getMax = dataaccess.getMax;
var setMax = dataaccess.setMax;

var woBot = function (bot) {
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

    bot
        .hear("what('|)s {percentage}(%| percent) of my {exercise} max")
        .filter(msg => {
            msg.exercise = getRecognisedExercise(msg.exercise);
            return msg.exercise !== "";
        })
        .filter(msg => {
            return predicates.positiveNumber(msg.percentage);
        })
        .do(m => {
            m.who = getRecognisedUser("me", m.user.name);
            m.max = getMax(m.who, m.exercise);
            m.answer = (m.percentage * m.max / 100).toFixed(1);
        })
        .reply(m => {
            if (m.max == null)
                return "no max recorded!";

            var reply = "max for " + m.who + " - " + m.exercise + " " + m.max + "kg\n";
            reply += "so " + m.percentage + "% of that is " + m.answer + "kg";

            return reply;
        })
        .start();

};

exports.init = woBot;
exports.name = 'max';
exports.description = 'find and update max weight for an exercise';