"use strict";
var util = require('util');
var Model = require('../model');

function Positions() {
  Model.call(this, 'location_stack');
}

util.inherits(Positions, Model);

var Position = new Positions();

Position.all = function(cb){  
    var filters = {
        'status': '1'
    };
    Position.select(filters, function (err, rows) {
        if (!err && rows) {
          cb(null, rows);
        } else {
          cb(err || new Error('no user found:'));
        }
      });
};
module.exports = Position;