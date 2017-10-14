var dateFormat = require('./dateformat.js');
var maxhistory = require('./workouthelpers/maxhistory');
var logworkout = require('./workouthelpers/logworkout');


var Rx = require('rxjs');
//var http = require('http');
var connectbot = require('./bot-extensions').WoBot;
var includemaxes = require('./maxbot').add;
var includelog = require('./logbot').add;

var known = {
    squat: ["squats"]
};

var bot = connectbot();
includemaxes(bot, maxhistory.addMax, maxhistory.getMax);
includelog(bot, logworkout.add, logworkout.get);
