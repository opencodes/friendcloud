"use strict";
var util = require('util');
var Profile = require('../../models/profile');

var fclouds = {
		info : function(req,res,next){
			console.log(req.query);
			if(req.query.publickey){
				next();
			}else{
				res.json({'error':'Unauthorized Access'});
			}
		},
		list : function(req,res){
			var filters = {
					'token':req.query.publickey
			};
			var profiles = {};
			Profile.select(filters,function(err,result){
				
				if(!err && res){
					res.json(result);
				}else{
					res.json({'error':'No result'});
				}
			});
			
		}
};
module.exports = fclouds;
