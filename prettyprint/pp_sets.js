var prettyPrint = function (planType, exercise, who, sets, max) {
    var r = "";
    if (planType === "pct")
        r = "*I couldn't find a max " + exercise + " for " + who + ", but here are the percentages*\n";
    else {
        r = "*Here are the weights for " + who + "*\n";
        r += "`Current max " + exercise + " is " + max + "`\n";
    }

    sets.forEach(set => {
        if (set.weight != null)
            r += set.reps + " x " + set.weight + "kg\n";
        else if (set.weightPct != null)
            r += set.reps + " x " + set.weightPct + "%\n";
    });

    return r;
};

exports.prettyPrint = prettyPrint;