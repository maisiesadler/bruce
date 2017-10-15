//var loadTestData = require('./readtestdata.js').loadTestData;
var maxhistory = require('./dataaccess/maxhistory');
var logworkout = require('./dataaccess/logworkout');
var schedule = require('./dataaccess/schedule');

// loadTestData(data => {
//     data.forEach(function(element) {
//         var who = element.who === 'jones' ? '@stinky' : '@maisie';
//         logworkout.add(element.when, who, element.what, element.weight, element.reps);
//     }, this);
// });


var connectbot = require('./bot-extensions').WoBot;
var includemaxes = require('./bot/maxbot').add;
var includelog = require('./bot/logbot').add;
var getweights = require('./bot/getweightsbot').add;
var scheduler = require('./bot/schedulebot').init;

var bot = connectbot();
includemaxes(bot, maxhistory.addMax, maxhistory.getMax);
includelog(bot, logworkout.add, logworkout.get, logworkout.last);
getweights(bot, maxhistory.getMax);
scheduler(bot, schedule.whatistoday, maxhistory.getMax);