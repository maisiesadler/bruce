var loadTestData = require('./readtestdata.js').loadTestData;
var maxhistory = require('./workouthelpers/maxhistory');
var logworkout = require('./workouthelpers/logworkout');
var schedule = require('./workouthelpers/schedule');


// loadTestData(data => {
//     data.forEach(function(element) {
//         var who = element.who === 'jones' ? '@stinky' : '@maisie';
//         logworkout.add(element.when, who, element.what, element.weight, element.reps);
//     }, this);
// });


var connectbot = require('./bot-extensions').WoBot;
var includemaxes = require('./ts/max/maxbot').add;
var includelog = require('./ts/log/logbot').add;
var getweights = require('./getweightsbot').add;
var scheduler = require('./schedulebot').init;

var bot = connectbot();
includemaxes(bot, maxhistory.addMax, maxhistory.getMax);
includelog(bot, logworkout.add, logworkout.get, logworkout.last);
getweights(bot, maxhistory.getMax);
scheduler(bot, schedule.whatistoday, maxhistory.getMax);