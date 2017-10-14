var getRecognisedExercise = require('./recognisedexercises').getRecognisedExercise;
var getRecognisedUser = require('./recogniseduser').getRecognisedUser;

var predicates = {};
predicates.integer = val => {
    return parseFloat(val) === parseInt(val);
};
predicates.number = val => {
    return parseInt(val) > 0 || parseInt(val) < 0 || val == 0;
};
predicates.positiveInteger = val => {
    return parseFloat(val) === parseInt(val) && parseInt(val) > 0;
};
predicates.positiveNumber = val => {
    return parseFloat(val) > 0;
};
predicates.timespan = val => {
    //yesterday
    //two weeks
    //one month
    //week
    //day
    //1d
    //1s

    return parseFloat(val) > 0;
};

predicates.isRecognisedUser = val => {
    if (val === "me")
        return true;

    return getRecognisedUser(val) !== "";
};

predicates.isRecognisedExercise = val => getRecognisedExercise(val) !== "";
predicates.isRecognisedExerciseOrAll = val => {
    if (val === "all") {
        return true;
    }
    val = getRecognisedExercise(val);
    return val !== "";
};
// Bot.predicates.negativeInteger = val => {
//     return parseFloat(val) === parseInt(val) && parseInt(val) < 0;
// };
// Bot.predicates.negativeNumber = val => {
//     return parseFloat(val) < 0;
// };
// Bot.predicates.numberBetween = (from, to, val) => {
//     if (Bot.predicates.number(val)) {
//         return val > from && val < to;
//     }
//     else return false;
// };
// Bot.predicates.greaterThan = (greaterThan, val) => {
//     if (Bot.predicates.number(val)) {
//         return val > greaterThan;
//     }
//     else return false;
// };
// Bot.predicates.lessThan = (lessThan, val) => {
//     if (Bot.predicates.number(val)) {
//         return val < lessThan;
//     }
//     else return false;
// };
// Bot.predicates.fraction = (val) => {
//     var isInteger = Bot.predicates.integer;
//     var parts = val.split('/');
//     if (parts.length !== 2)
//         return false;

//     return isInteger(parts[0]) && isInteger(parts[1]);
// };


exports.predicates = predicates;