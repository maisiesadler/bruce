var datastore = require('./datastore').ds;
var initRecognised = require('./recognised').init;

var baseDir = "/Users/maisiesadler/nodeapps/workouts/data/";

var bottoken = null;
var settings = new datastore(baseDir + "settings.json", () => {
    bottoken = settings.get()["bot-token"];
});

var recognised = new initRecognised(baseDir);
setTimeout(() => {
    var s = recognised.getRecognised("user", "mais");

}, 1000);


var getbottoken = function (ongotbottoken) {
    if (bottoken === null) {
        return setTimeout(() => {
            return getbottoken(ongotbottoken);
        }, 50);
    } else {
        if (ongotbottoken)
            ongotbottoken(bottoken);
    }
};

var maxhistory = require('./maxhistory');
var logworkout = require('./logworkout');
var schedule = require('./schedule');
var dataaccess = require('./get');

exports.getbottoken = getbottoken;
exports.getMax = maxhistory.getMax;
exports.addMax = maxhistory.addMax;

exports.getRecorded = logworkout.get;
exports.record = logworkout.add;
exports.getLastRecorded = logworkout.last;

exports.getTodaysWorkout = schedule.whatistoday;
