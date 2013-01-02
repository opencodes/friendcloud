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
					'token':0
			};
			var profiles = {};
			Profile.select(filters,function(err,result){
				
				if(!err && res){
					profiles.items = result;
					res.header('Content-Type', 'application/json');
					res.header('Charset', 'utf-8') ;
					res.send(req.query.callback + '('+JSON.stringify(profiles)+');');  
				}else{
					console.log(err);
					res.json({'error':'No result'});
				}
			});
			
		}
};
module.exports = fclouds;
