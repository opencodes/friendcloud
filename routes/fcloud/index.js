"use strict";
var util = require('util');
var fcloud = require('./fcloud');

module.exports = function(app) {
    //User Routes
	app.get('/fcloud/',fcloud.info,fcloud.friendlist,fcloud.profile);
	app.get('/fcloud/posts/',fcloud.info,fcloud.posts);
    app.get('/fcloud/list',fcloud.info,fcloud.list);
    app.get('/fcloud/user/',fcloud.info,fcloud.detail);
    app.get('/fcloud/traceme/',fcloud.fetchinfo,fcloud.traceme);
    app.get('/fcloud/savecontacts',fcloud.savecontacts);
    app.get('/fcloud/saveposition',fcloud.saveposition);
};