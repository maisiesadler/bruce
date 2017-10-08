// var getNamedParam = function(text){
//     let regex = /\${([a-zA-Z]+)}/;
//     let o = text.match(regex);

//     return o;
// };

// var getNamedParams = function(text){
//     var matches = [];
//     var match = getNamedParam(text);
//     while(match != null){
//         text = text.replace(match[0], "(.*)");
//         matches.push(match[1]);

//         match = getNamedParam(text);
//     }

//     return {
//         text: text,
//         matches: matches
//     };
// };

// var setParametersOnObject = function(obj, replacedOriginal, stringMatchResult){
//     if (stringMatchResult == null)
//         return obj;
//     for (var i = stringMatchResult.length - 1; i > 0; i--) {
//         var currentMatch = stringMatchResult[i];
//         obj[replacedOriginal.matches[i-1]] = currentMatch;
//         console.log("param name: " + replacedOriginal.matches[i-1]);
//         console.log("match: " + currentMatch);
//     }

//     return obj;
// };


// let text = 'ihkjl  ${test} ${re}';
// var stringToMatch = 'ihkjl  firstthing anotherthing';

// var regexAndNamedParams = getNamedParams(text);
// let matches = stringToMatch.match(regexAndNamedParams.text);

// var newObject = setParametersOnObject({}, regexAndNamedParams, matches);