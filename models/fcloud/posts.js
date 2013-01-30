"use strict";
var util = require('util');
var Model = require('../model');

function Posts() {
  Model.call(this, 'posts');
}

util.inherits(Posts, Model);

var Posts = new Posts();

Posts.all = function(cb){  
    var filters = {
        'status': '1'
    };
    Posts.select(filters, function (err, rows) {
        if (!err && rows) {
          cb(null, rows);
        } else {
          cb(err || new Error('no user found:'));
        }
      });
};
module.exports = Posts;