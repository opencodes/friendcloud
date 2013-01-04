"use strict";
var util = require('util');
var Profile = require('../../models/profile');
var ProfileDetails = require('../../models/profiledetail');
var Friend = require('../../models/fcloud/friend');
var Notification = require('../../models/fcloud/notification');
var Group = require('../../models/fcloud/group');

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
			Profile.all(function(err,result){
				//console.log(result);
				if(!err && result){
					profiles.items = result;
					res.header('Content-Type', 'application/json');
					res.header('Charset', 'utf-8') ;
					res.send(req.query.callback + '('+JSON.stringify(profiles)+');');  
				}else{
					console.log(err);
					res.json({'error':'No result'});
				}
			});
			
		},
		detail : function(req,res){
			var profileid = req.query.profile_id;
			var profiles = {};
			ProfileDetails.byId(profileid,function(err,result){
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
		},
		traceme : function(req,res){
			var trace_friend_id = req.query.friend_id;
			var user_id = 1;
			var data = {'profile_id':1,'friend_id':trace_friend_id};
			Friend.add(data,function(err,result){
				if(!err && res){
					var notification = [{'user_id':user_id,'msg':'Request sent to user '+trace_friend_id,'type':'1'},
					                    {'user_id':trace_friend_id,'msg':'Invitation from  user'+user_id,'type':'1'}];
					Notification.add(notification,function(err,result){
						if(!err && res){
						res.header('Content-Type', 'application/json');
						res.header('Charset', 'utf-8') ;
						res.send(req.query.callback + '({"status":"1"});');
						}else{
							console.log(err);
							res.json({'error':'No result'});
						}
					});
					
				}else{
					console.log(err);
					res.json({'error':'No result'});
				}
			});
		}
};
module.exports = fclouds;
