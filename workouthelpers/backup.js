var fs = require('fs');
var dir = "/Users/maisiesadler/nodeapps/workouts/data/";

var writeToFile = function (filePath) {
    return (err, data) => {
        fs.writeFile(filePath, data);
    };
};

var toTwoDig = function (s, extraChar) {
    if (extraChar == null)
        extraChar = "0";
    s = s.toString();
    if (s.length === 1)
        return extraChar + s;

    return s;
};

var backupdatafolder = function () {
    var d = new Date();
    var newFolderName = d.getFullYear().toString()
        + toTwoDig(d.getMonth() + 1)
        + toTwoDig(d.getDate())
        + "-"
        + toTwoDig(d.getHours())
        + toTwoDig(d.getMinutes());

    var newDir = dir + 'history/' + newFolderName + "/";
    fs.mkdirSync(newDir);
    fs.readdir(dir, function (err, items) {
        for (var i = 0; i < items.length; i++) {
            var item = items[i];

            if (item === "history")
                continue;

            fs.readFile(dir + item, writeToFile(newDir + item));
        }
    });
};

exports.backup = backupdatafolder;