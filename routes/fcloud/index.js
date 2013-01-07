"use strict";
var util = require('util');
var fcloud = require('./fcloud');

module.exports = function(app) {
    //User Routes
	app.get('/fcloud/',fcloud.info,fcloud.profile);
    app.get('/fcloud/list',fcloud.info,fcloud.list);
    app.get('/fcloud/user/',fcloud.info,fcloud.detail);
    app.get('/fcloud/traceme/',fcloud.traceme);
    app.get('/fcloud/savecontacts',fcloud.savecontacts);
    app.get('/fcloud/saveposition',fcloud.saveposition);
};