"use strict";
var util = require('util');
var Model = require('../model');

function Notifications() {
  Model.call(this, 'notification');
}

util.inherits(Notifications, Model);

var Notification = new Notifications();

Notification.all = function(cb){  
    var filters = {
        'status': '1'
    };
    Profile.select(filters, function (err, rows) {
        if (!err && rows) {
          cb(null, rows);
        } else {
          cb(err || new Error('no user found:'));
        }
      });
};
Notification.add = function(data,callback){  
	Notification.insert(data,function(err,result){
	    if(err)
	      util.log('Error saving new notification '+ err);
	    callback(err,result);
	});
};
module.exports = Notification;