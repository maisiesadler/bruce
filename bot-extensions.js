var Bot = require('rxbot').Bot;
var dym = require("rxbot/ts/dym/dym.plugin").dym;

var predicates = require('./helpers/predicates');
var backup = require('./dataaccess/backup').backup;

var woBot = function (bottoken) {
    var bot = new Bot(bottoken);
    bot.register(dym);
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
