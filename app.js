var dateFormat = require('./dateformat.js');
var maxhistory = require('./workouthelpers/maxhistory');
var logworkout = require('./workouthelpers/logworkout');

//var file = "/Users/maisiesadler/nodeapps/workouts/maisie.wos.json";


var Rx = require('rxjs');
//var http = require('http');
var connectbot = require('./bot-extensions').WoBot;
var includemaxes = require('./maxbot').add;
var includelog = require('./logbot').add;


// var data = {
//     storeId: 10151,
//     partNumber: 7366077,
//     checkStore: true//,
//     //qasSearchTerm: "Al1"
// };
// const options = {
//     hostname: 'www.argos.co.uk',
//     path: '/webapp/wcs/stores/servlet/ArgosCheckPostalCode',
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Referer': 'http://www.argos.co.uk/product/7479232',
//         'Accept': '*/*',
//         'Origin': 'http://www.argos.co.uk',
//         'Content-Length': Buffer.byteLength(data)
//     }
// };

// var post_req = http.request(options
//     , res => {
//         res.setEncoding('utf8');
//         res.on('data', function (chunk) {
//             console.log('Response: ' + chunk);
//         });
//     }
// );

// post_req.write(JSON.stringify(data));
// post_req.end();


// var getWorkoutString = function (workoutJson, lineBreak) {
//     lineBreak = lineBreak || "\n";
//     var workoutString = "";
//     workoutJson.forEach(function (element) {
//         workoutString += element.type + lineBreak;
//         workoutString += dateFormat.getDateToString(element).date + lineBreak;
//         workoutString += "  " + element.exercise + lineBreak;
//         workoutString += "  " + element.reps + "x" + element.weight + lineBreak + lineBreak;
//     }, this);

//     return workoutString;
// };

var known = {
    squat: ["squats"]
};

var bot = connectbot();
includemaxes(bot, maxhistory.addMax, maxhistory.getMax);
includelog(bot, logworkout.add, logworkout.get);
