var mapYyMmDdToDate = function (arrayWithStringDates) {
    return arrayWithStringDates.map(function (workout) {
        var yy = workout.date.substring(0, 2);
        var mm = workout.date.substring(2, 4);
        var dd = workout.date.substring(4, 6);

        workout.date = new Date("20" + yy, mm, dd);
        return workout;
    });
};

var getDateToString = function (objectWithDate) {
    objectWithDate.date = objectWithDate.date.toDateString();
    return objectWithDate;
};

var prettyPrintTimeSpan = function(timespan){
    if(typeof timespan === "string")
        timespan = parseInt(timespan);
    var date = new Date(timespan);
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var hr = date.getHours();

    if (hr < 12)
        hr = hr + "AM";
    else 
        hr = (hr - 12) + "PM";

    return dd + "/" + mm + " " + hr;
};

exports.mapYyMmDdToDate = mapYyMmDdToDate;
exports.getDateToString = getDateToString;
exports.prettyPrintTimeSpan = prettyPrintTimeSpan;
