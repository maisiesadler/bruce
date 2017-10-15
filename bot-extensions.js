var Bot = require('rxbot').Bot;
var bot = new Bot('xoxb-242490537844-SSdkyyG2VDlSWER9FqCfDvin');
var dym = require("rxbot/ts/dym/dym.plugin").dym;

var predicates = require('./predicates');
var backup = require('./workouthelpers/backup').backup;


bot.register(dym);

var woBot = function () {
    bot.connect()
        .then(() => {
            bot.say('#general', 'hi');
        });

    bot.hear("backup data")
        .do(msg => {
            backup();
        })
        .reply('done')
        .start();

    return bot;
};

exports.WoBot = woBot;
