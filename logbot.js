var predicates = require('./predicates').predicates;
var dateformat = require('./dateformat');
var getRecognisedExercise = require('./recognisedexercises').getRecognisedExercise;
var getRecognisedUser = require('./recogniseduser').getRecognisedUser;

var hr = 3600000;
var day = hr * 24;


var woBot = function (bot, addWorkout, getWorkout) {

    bot
        .hear("log {exercise}")
        .filter(predicates.isRecognisedExercise)
        .ask("who for?", { predicate: predicates.isRecognisedUser, then: (msg, resp) => { msg.who = getRecognisedUser(resp, msg.user.name); } })
        .ask(m => 'what is it? (kg)', { predicate: predicates.positiveNumber, then: (msg, resp) => (msg.weight = resp) })
        .ask(m => 'reps?', { predicate: predicates.positiveNumber, then: (msg, resp) => (msg.reps = resp) })
        .reply(c => "ok, i will log that you did " + c.reps + " reps " + c.exercise + " at " + c.weight + "kg")
        .do(wo => addWorkout(Date.now(), wo.who, wo.exercise, wo.weight, wo.reps))
        .start();

    bot
        .hear("get {exercise} since")
        .filter(m => predicates.getRecognisedExercise(m.exercise))
        .ask("who for?", { predicate: predicates.isRecognisedUser, then: (msg, resp) => { msg.who = getRecognisedUser(resp, msg.user.name); } })
        .ask(m => 'how many days?', { predicate: predicates.positiveInteger, then: (msg, resp) => (msg.timespan = resp) })
        .do(m => m.wos = getWorkout(m.user.name, m.exercise, Date.now() - m.timespan * day))
        .reply(m => {
            var reply = "you have " + m.wos.length + " to show\n";
            m.wos.forEach(function (element) {
                var formatted = '`' + dateformat.prettyPrintTimeSpan(element.when) + '`';
                if (m.exercise === "all") {
                    formatted += " - " + element.what + ":";
                }
                formatted += " {" + element.impliedOrm + "} ";
                formatted += " " + element.howmany + "@" + element.howmuch + "kg\n";
                reply += formatted;
            }, this);

            return reply;
        })
        .start();
};

exports.add = woBot;