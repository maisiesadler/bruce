var predicates = require('./predicates');
var dateformat = require('./dateformat');

var hr = 3600000;
var day = hr * 24;

var woBot = function (bot, addWorkout, getWorkout) {
    bot
        .hear("log {exercise}")
        .ask(m => 'what is it? (kg)', { predicate: predicates.positiveNumber, then: (msg, resp) => (msg.weight = resp) })
        .ask(m => 'reps?', { predicate: predicates.positiveNumber, then: (msg, resp) => (msg.reps = resp) })
       // .ask(m => 'sets?', { predicate: predicates.positiveNumber, then: (msg, resp) => (msg.sets = resp) })
        .reply(c => "ok, i will log that you did " + c.reps + " reps " + c.exercise + " at " + c.weight + "kg")
        .do(wo => addWorkout(Date.now(), wo.user.name, wo.exercise, wo.weight, wo.reps))
        .start();

    bot
    .hear("get {exercise} since")
        .ask(m => 'how many days?', { predicate: predicates.positiveInteger, then: (msg, resp) => (msg.timespan = resp) })
        .do(m => m.wos = getWorkout(m.user.name, m.exercise, Date.now() - m.timespan * day))
        .reply(m => {
            var reply = "you have " + m.wos.length + " to show\n";
            m.wos.forEach(function(element) {
                reply += dateformat.prettyPrintTimeSpan(element.when) + ": " + element.howmany + "@" + element.howmuch + "kg\n";
            }, this);

            return reply;
        })
        .start();
};

exports.add = woBot;