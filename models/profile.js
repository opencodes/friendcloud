"use strict";
var util = require('util');
var Model = require('./model');

function Profiles() {
  Model.call(this, 'profile');
}

util.inherits(Profiles, Model);

var Profile = new Profiles();
Profile.all = function(data,cb){  
    var filters = {
        'token': data.publickkey
    };
      User.select(filters, function (err, rows) {
        if (!err && rows) {
          cb(null, rows);
        } else {
          cb(err || new Error('no user found:'));
        }
      });
};
module.exports = Profile;