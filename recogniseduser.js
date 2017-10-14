var users = {
    maisie: ['@maisie','sadler'],
    marc: ['@stinky', 'jones']
};
var gkef = require('./recognisedentity').getKnownEntityFunction;
var getRecognisedUserInner = gkef(users);

var getRecognisedUser = function(user, me){
    if (user === 'me' && me != null && me !== '')
        return getRecognisedUserInner(me);

    return getRecognisedUserInner(user);
}

exports.getRecognisedUser = getRecognisedUser;