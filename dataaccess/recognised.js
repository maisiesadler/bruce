var datastore = require('./datastore').ds;
var fileName = "recognised.json";

var init = function (basePath) {
    var ds = new datastore(basePath + fileName);

    this.getRecognised = function(what, test){
        var e =  ds.get()[what];
        return e[test];
    };
};


exports.init = init;