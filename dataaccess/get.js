var datastore = require('./datastore').ds;

var baseDir = "/Users/maisiesadler/nodeapps/workouts/data/";

var bottoken = null;
var settings = new datastore(baseDir + "settings.json", () => {
    bottoken = settings.get()["bot-token"];
});


var getbottoken = function (ongotbottoken) {
    if (bottoken === null) {
        return setTimeout(() => {
            return getbottoken(ongotbottoken);
        }, 50);
    } else {
        if (ongotbottoken)
            ongotbottoken(bottoken);
    }
}

exports.getbottoken = getbottoken;