var predicates = require('./predicates').predicates;
var dateformat = require('./dateformat');
var getRecognisedExercise = require('./recognisedexercises').getRecognisedExercise;

var hr = 3600000;
var day = hr * 24;


var woBot = function (bot, addWorkout, getWorkout) {

    bot
        .hear("log {exercise}")
        .filter(msg => {
            msg.exercise = getRecognisedExercise(msg.exercise);
            return msg.exercise !== "";
        })
        .ask(m => 'what is it? (kg)', { predicate: predicates.positiveNumber, then: (msg, resp) => (msg.weight = resp) })
        .ask(m => 'reps?', { predicate: predicates.positiveNumber, then: (msg, resp) => (msg.reps = resp) })
        .reply(c => "ok, i will log that you did " + c.reps + " reps " + c.exercise + " at " + c.weight + "kg")
        .do(wo => addWorkout(Date.now(), wo.user.name, wo.exercise, wo.weight, wo.reps))
        .start();

    bot
        .hear("get {exercise} since")
        .filter(msg => {
            if (msg.exercise === "all") {
                return true;
            }
            msg.exercise = getRecognisedExercise(msg.exercise);
            return msg.exercise !== "";
        })
        .ask(m => 'how many days?', { predicate: predicates.positiveInteger, then: (msg, resp) => (msg.timespan = resp) })
        .do(m => m.wos = getWorkout(m.user.name, m.exercise, Date.now() - m.timespan * day))
        .reply(m => {
            var reply = "you have " + m.wos.length + " to show\n";
            m.wos.forEach(function (element) {
                var formatted = '`' + dateformat.prettyPrintTimeSpan(element.when) + '`';
                if (m.exercise === "all") {
                    formatted += " - " + element.what + ":";
                }
                formatted += " " + element.howmany + "@" + element.howmuch + "kg\n";
                reply += formatted;
            }, this);

            return reply;
        })
        .start();
};

exports.add = woBot;