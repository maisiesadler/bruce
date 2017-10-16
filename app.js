//var loadTestData = require('./readtestdata.js').loadTestData;


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

var dataaccess = require('./dataaccess/get');

var bt = dataaccess.getbottoken(bottoken => {
    var bot = connectbot(bottoken);

    getweights(bot);
    includelog(bot);
    includemaxes(bot);
    scheduler(bot);
});