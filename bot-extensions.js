var Bot = require('rxbot').Bot;
var bot = new Bot('xoxb-242490537844-Y4UztNiC05iKQEGTwgmtlWvS');
var predicates = require('./predicates');
var backup = require('./workouthelpers/backup').backup;

var woBot = function () {
    bot.connect()
        .then(() => {
            bot.say ('#general', 'hi');
        });

    bot.hear("backup data")
        .do(msg => {
            backup();
        })
        .reply('done')
        .start();
8
    return bot;
};

exports.WoBot = woBot;
