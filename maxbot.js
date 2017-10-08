var predicates = require('./predicates');

var woBot = function (bot, setMax, getMax) {
    //bot.say ('#general', 'hi');
    var getExerciseForAction = function (action) {
        var hearWith = bot
            .hear(action + " {exercise} max")
        // .do(m => m.exercise = m.params[0]);
        var hearWithout = bot
            .hear(action + " max")
            .ask("what's the exercise?", { predicate: resp => resp != null, then: (msg, resp) => (msg.exercise = resp) })
        return hearWith
            .merge(hearWithout)
    };

    getExerciseForAction("update")
        .ask("what weight?", { predicate: predicates.positiveNumber, then: (msg, resp) => (msg.weight = resp) })
        .reply(m => m.weight + "kg for " + m.exercise + " isn't bad")
        .do(m => {
            setMax('maisie', m.exercise, m.weight);
        })
        .reply('done')
        .start();

    getExerciseForAction("get")
        .do(m => {
            m.max = getMax("maisie", m.exercise)
        })
        .reply(m => {
            if (m.max == null)
                return "no max recorded!";
            return "your max " + m.exercise + " is " + m.max + "kg";
        })
        .start();
};

exports.add = woBot;