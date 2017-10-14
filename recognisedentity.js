var getKnownEntityFunction = function (knownEntities) {
    var knownEntityMap = {};
    (function () {
        Object.getOwnPropertyNames(knownEntities).forEach(ety => {
            if (knownEntityMap.hasOwnProperty(ety))
                throw new Error('Already registered entity ' + ety + ' as ' + knownEntityMap[ety]);
            knownEntityMap[ety] = ety;

            var synonymArr = knownEntities[ety];
            synonymArr.forEach(syn => {
                if (syn === "")
                    return;

                if (knownEntityMap.hasOwnProperty(syn))
                    throw new Error('Already registered synonym ' + syn + ' for ' + knownEntityMap[syn]);

                knownEntityMap[syn] = ety;
            })
        });
    })();

    return function (input) {
        if (knownEntityMap.hasOwnProperty(input)) {
            return knownEntityMap[input];
        }

        return "";
    };
}

exports.getKnownEntityFunction = getKnownEntityFunction;