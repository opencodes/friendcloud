"use strict";
var util = require('util');
var Model = require('../model');

function Friends() {
  Model.call(this, 'friend');
}

util.inherits(Friends, Model);

var Friend = new Friends();

Friend.all = function(cb){  
    var filters = {
        'status': '1'
    };
    Friend.select(filters, function (err, rows) {
        if (!err && rows) {
          cb(null, rows);
        } else {
          cb(err || new Error('no user found:'));
        }
      });
};
Friend.add = function(data,callback){  
	Friend.insert(data,function(err,result){
	    if(err)
	      util.log('Error saving new friend '+ err);
	    callback(err,result);
	});
};
module.exports = Friend;