"use strict";
var util = require('util');
var Model = require('../model');

function Friends() {
  Model.call(this, 'friend');
}

util.inherits(Friends, Model);

var Friend = new Friends();

Friend.by_profile_id = function(id,cb){  
    var filters = {
        'status': '1'
    };
    var sql = 'pl.id, pl.name, pl.photo  FROM `friend` INNER JOIN profile_list as pl ON pl.id = friend.friend_id'+
    		+' WHERE friend.profile_id = "1";';	
    Friend.select(null,{columns:sql,countRows:true}, function (err, rows) {
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