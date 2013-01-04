"use strict";
var util = require('util');
var Model = require('../model');

function Profiles() {
  Model.call(this, 'profile_list');
}

util.inherits(Profiles, Model);

var Profile = new Profiles();

Profile.all = function(cb){  
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
module.exports = Profile;