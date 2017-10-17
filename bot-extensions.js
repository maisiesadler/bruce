var Bot = require('rxbot').Bot;
var dym = require("rxbot/ts/dym/dym.plugin").dym;

var predicates = require('./helpers/predicates');
var backup = require('./dataaccess/backup').backup;

var helpbot = require('./bot/helpbot').init;


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

    var hb = helpbot(bot);
    //hb.register('./bot/logbot', 'log', 'test');

    bot.register = location => {
        var plugin = require(location);
        plugin.init(bot);

        hb.register(location, plugin.name, plugin.description);
    };

    return bot;
};

exports.WoBot = woBot;
