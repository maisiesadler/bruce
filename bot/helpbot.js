var fs = require('fs');

var helpbot = function (bot) {
    var registered = {};

    bot
        .hear('help')
        .reply(msg => {
            var registeredHelp = Object.getOwnPropertyNames(registered);
            if (registeredHelp.length === 0)
                return "I've got nothing";

            var r = 'try these: \n';
            registeredHelp.forEach(h => {
                var o = registered[h];
                r += '`' + h + ': ' + o.description + '`\n'
            });

            return r;
        })
        .start();

    this.register = function (location, name, description) {
        registered[name] = {
            location: location,
            description: description
        };

        bot.hear('help ' + name)
            .reply(msg => {
                var helpfile = location + '.help.md'
                if (fs.existsSync(helpfile))
                    return fs.readFileSync();
                else 
                    return "no help available for `" + name + "`";
            })
            .start();
    };

    return this;
};

exports.init = helpbot;