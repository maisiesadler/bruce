var predicates = require('./../helpers/predicates').predicates;
var dateformat = require('./../prettyprint/pp_date');
var getRecognised = require('./../recognised/get');
var getRecognisedUser = getRecognised.user;
var getRecognisedExercise = getRecognised.exercise;

var hr = 3600000;
var day = hr * 24;


var woBot = function (bot, addWorkout, getWorkout, getLast) {

    bot
        .hear("log {exercise}")
        .merge(bot.hear("record {exercise}"))
        .filter(msg => {
            msg.exercise = getRecognisedExercise(msg.exercise);
            return msg.exercise !== "";
        })
        .ask("who for?", { predicate: predicates.isRecognisedUser, then: (msg, resp) => { msg.who = getRecognisedUser(resp, msg.user.name); } })
        .ask(m => 'what is it? (kg)', { predicate: predicates.positiveNumber, then: (msg, resp) => (msg.weight = resp) })
        .ask(m => 'reps?', { predicate: predicates.positiveNumber, then: (msg, resp) => (msg.reps = resp) })
        .reply(c => "ok, i will log that " + (c.who === "me" ? "you" : c.who) + " did " + c.reps + " reps " + c.exercise + " at " + c.weight + "kg")
        .do(wo => addWorkout(Date.now(), wo.who, wo.exercise, wo.weight, wo.reps))
        .start();

    bot
        .hear("get {exercise} since")
        .merge(bot.hear("get recorded {exercise}"))
        .filter(msg => {
            if (msg.exercise === "all")
                return true;
            msg.exercise = getRecognisedExercise(msg.exercise);
            return msg.exercise !== "";
        })
        .ask("who for?", { predicate: predicates.isRecognisedUser, then: (msg, resp) => { msg.who = getRecognisedUser(resp, msg.user.name); } })
        .ask(m => 'how many days?', { predicate: predicates.positiveInteger, then: (msg, resp) => (msg.timespan = resp) })
        .do(m => m.wos = getWorkout(m.who, m.exercise, Date.now() - m.timespan * day))
        .reply(m => {
            var reply = "recorded " + m.exercise + " workouts in the last " + m.timespan + " days: " + m.wos.length + ".\n";
            m.wos.forEach(function (element) {
                var formatted = '`' + dateformat.prettyPrintTimeSpan(element.when) + '`';
                if (m.exercise === "all") {
                    formatted += " - " + element.what + ":";
                }
                formatted += " {" + element.impliedOrm + "kg} ";
                formatted += " " + element.howmany + "@" + element.howmuch + "kg\n";
                reply += formatted;
            }, this);

            return reply;
        })
        .start();

    bot
        .hear("get last {exercise}")
        .filter(msg => {
            if (msg.exercise === "all")
                return true;
            msg.exercise = getRecognisedExercise(msg.exercise);
            return msg.exercise !== "";
        })
        .ask("who for?", { predicate: predicates.isRecognisedUser, then: (msg, resp) => { msg.who = getRecognisedUser(resp, msg.user.name); } })
        .do(m => m.last = getLast(m.who, m.exercise))
        .reply(m => {
            var reply = "last recorded " + m.exercise + " workout.\n";

            var formatted = '`' + dateformat.prettyPrintTimeSpan(m.last.when) + '`';
            if (m.exercise === "all") {
                formatted += " - " + m.last.what + ":";
            }
            formatted += " {" + m.last.impliedOrm + "kg} ";
            formatted += " " + m.last.howmany + "@" + m.last.howmuch + "kg\n";
            reply += formatted;

            return reply;
        })
        .start();
};

exports.add = woBot;