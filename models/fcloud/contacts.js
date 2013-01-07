"use strict";
var util = require('util');
var Model = require('../model');

function Contacts() {
  Model.call(this, 'contact_list');
}

util.inherits(Contacts, Model);

var Contact = new Contacts();

Contact.all = function(cb){  
    var filters = {
        'status': '1'
    };
    Contact.select(filters, function (err, rows) {
        if (!err && rows) {
          cb(null, rows);
        } else {
          cb(err || new Error('no user found:'));
        }
      });
};
module.exports = Contact;