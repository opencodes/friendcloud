"use strict";
var util = require('util');
var Model = require('./model');

function Profiles() {
  Model.call(this, 'profile_details');
}

util.inherits(Profiles, Model);
var Profile = new Profiles();

function ListDetails() {
	  var table = 'profile_details as pd',
	      joinTable = [{
	      table: 'profile_list as pl',
	      type: 'JOIN',
	      onClause: ['pl.id = pd.profile_id']
	    }];
	  Model.call(this, table, joinTable);
}
util.inherits(ListDetails, Model);

var ListDetails = new ListDetails();
	
	
ListDetails.byId = function(profile_id,cb){  
    var filters = {
        'pd.profile_id': profile_id
    };
    ListDetails.select(filters, function (err, rows) {
        if (!err && rows) {
          cb(null, rows);
        } else {
          cb(err || new Error('no user found:'));
        }
      });
};
module.exports = ListDetails;