//var loadTestData = require('./readtestdata.js').loadTestData;
var maxhistory = require('./workouthelpers/maxhistory');
var logworkout = require('./workouthelpers/logworkout');

var connectbot = require('./bot-extensions').WoBot;
var includemaxes = require('./maxbot').add;
var includelog = require('./logbot').add;

var bot = connectbot();
includemaxes(bot, maxhistory.addMax, maxhistory.getMax);
includelog(bot, logworkout.add, logworkout.get);
