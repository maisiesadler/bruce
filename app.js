var loadTestData = require('./readtestdata.js').loadTestData;
var maxhistory = require('./workouthelpers/maxhistory');
var logworkout = require('./workouthelpers/logworkout');


// loadTestData(data => {
//     data.forEach(function(element) {
//         var who = element.who === 'jones' ? '@stinky' : '@maisie';
//         logworkout.add(element.when, who, element.what, element.weight, element.reps);
//     }, this);
// });


var connectbot = require('./bot-extensions').WoBot;
var includemaxes = require('./maxbot').add;
var includelog = require('./logbot').add;

var bot = connectbot();
includemaxes(bot, maxhistory.addMax, maxhistory.getMax);
includelog(bot, logworkout.add, logworkout.get);
