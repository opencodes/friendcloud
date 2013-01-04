"use strict";
var util = require('util');
var fcloud = require('./fcloud');

module.exports = function(app) {
    //User Routes
    app.get('/fcloud/',fcloud.info,fcloud.list);
    app.get('/fcloud/user/',fcloud.detail);
    app.get('/fcloud/traceme/',fcloud.traceme);
};