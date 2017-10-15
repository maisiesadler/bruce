var assert = require('assert');
var gkef = require('./entity').getKnownEntityFunction;

var empty = gkef({});
assert(empty("testing") === "");

var valid_main = gkef({
    findme:[]
});
assert(valid_main("findme") === "findme");

var valid_synonym = gkef({
    findsyn:['synonym']
});
assert(valid_synonym("synonym") === "findsyn");

var incorrectParameter_undefined = gkef();
assert(incorrectParameter_undefined === undefined);

var incorrectParameter_string = gkef("testing");
assert(incorrectParameter_string === undefined);

var incorrectParameter_number = gkef(1);
assert(incorrectParameter_number === undefined);

var incorrectParameter_array = gkef([1,2,3]);
assert(incorrectParameter_array === undefined);


console.log('recognised entity tests passing');