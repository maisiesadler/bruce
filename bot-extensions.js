var Bot = require('rxbot').Bot;
var bot = new Bot('xoxb-242490537844-Y4UztNiC05iKQEGTwgmtlWvS');
var predicates = require('./predicates');

var woBot = function () {
    bot.connect()
        .then(() => {
            bot.say ('#general', 'hi');
        });

    return bot;
};

exports.WoBot = woBot;
