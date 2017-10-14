var filepath = "/Users/maisiesadler/Downloads/WOs.csv";
var fs = require('fs');

var loadTestData = function (callback) {
    fs.readFile(filepath, 'utf8', function (err, data) {
        if (!err) {
            var cols = [];
            for (var i = 0; i < 13; i++)
                cols.push([]);
            var pushIntoCols = function (arr) {
                arr.forEach((a, i) => {
                    cols[i].push(a);
                });
            };

            var lines = data.split('\r\n');
            var done = false;
            lines.forEach(line => {
                var cells = line.split(',');
                if (cells[0] === "calculator")
                    done = true;
                if (done)
                    return;
                if (cells.filter(c => c !== "").length === 0)
                    return;

                pushIntoCols(cells);
            });


            var isnumber = function (val) {
                return parseFloat(val) > 0;
            };
            var getWorkout = function (cellText) {
                var s = cellText.split('x');
                if (s.length === 2) {
                    var reps = s[0];
                    var weight = s[1];

                    if (isnumber(reps) && isnumber(weight))
                        return {
                            reps: reps,
                            weight: weight
                        };
                }

                return null;
            };

            var getMsSinceEpoch = function (dateStr) {
                var dm = dateStr.split(',')[0];
                var d = dm.split('/')[0];
                var m = dm.split('/')[1] - 1;
                var t = parseFloat(dateStr.split(',')[1]);
                if (t <= 7)
                    t += 12;
                var date = new Date(2017, m, d, t);
                return date.getTime();
            };

            var colToWorkoutArray = function (idx, who, what, datesArray) {
                var col = cols[idx];
                var wos = [];
                var i = 0;
                col.forEach(b => {
                    var wo = getWorkout(b);
                    if (b === 'Ofi')
                        i++;
                    if (wo !== null) {
                        if (datesArray != null) {
                            var date = getMsSinceEpoch(datesArray[i]);
                            i++;
                            wo.when = date;
                        }
                        wo.who = who;
                        wo.what = what;
                        wos.push(wo);
                    }
                });

                return wos;
            };
            var benchDates = ['9/7,2', '16/7,2', '26/7,6', '6/8,5', '13/8,12', '20/8,4', '3/9,4', '10/9,3', '20/9,6', '4/10,6', '11/10,6'];
            var squatDates = ['11/7,7', '15/7,6', '22/7,6', '5/8,11', '12/8,5', '19/8,10', '5/9,6', '12/9,7', '17/9,11', '1/10,12', '8/10,3'];
            var dlDates = ['13/7,7', '20/7,10', '29/7,10', '12/8,8', '16/8,4', '21/8,6', '7/9,6', '14/9,7', '19/9,6', '3/10,6', '10/10,6'];

            var wos = [];
            wos = wos.concat(colToWorkoutArray(2, "jones", "bench", benchDates));
            wos = wos.concat(colToWorkoutArray(4, "jones", "squat", squatDates));
            wos = wos.concat(colToWorkoutArray(6, "jones", "deadlift", dlDates));
            wos = wos.concat(colToWorkoutArray(8, "sadler", "bench", benchDates));
            wos = wos.concat(colToWorkoutArray(10, "sadler", "squat", squatDates));
            wos = wos.concat(colToWorkoutArray(12, "sadler", "deadlift", dlDates));

            callback(wos);
        } else {
            console.log(err);
        }
    });
};




exports.loadTestData = loadTestData;