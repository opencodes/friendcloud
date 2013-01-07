"use strict";
var util = require('util');
var Profile = require('../../models/profile');
var ProfileDetails = require('../../models/profiledetail');
var Friend = require('../../models/fcloud/friend');
var Notification = require('../../models/fcloud/notification');
var Group = require('../../models/fcloud/group');
var Contacts = require('../../models/fcloud/contacts');
var Position = require('../../models/fcloud/position');

var fclouds = {
		info : function(req,res,next){
			console.log(req.query);
			if(req.query.publickey){
				var filters = {'public_key':req.query.publickey};
				Profile.select(filters,function(err,result){
					if(!err && res){
						if(result.length !==1){
							fclouds.registerdevice(req,res,next);
						}else {
							req.profile = {profile:result[0]};
							next();
						}
						
					}else{
						console.log(err);
						res.json({'error':'Unauthorized Access'});
					}
				});
				
			}else{
				res.json({'error':'Unauthorized Access'});
			}
		},
		profile : function(req,res){
			var profile = req.profile;
			res.header('Content-Type', 'application/json');
			res.header('Charset', 'utf-8') ;
			res.send(req.query.callback + '('+JSON.stringify(profile)+');');  
		},
		registerdevice :function(req,res,next){
			var data = {
					'public_key':req.query.publickey,
					'name':'Unknown'
					};
			Profile.insert(data,function(err,result){
				if(!err && result){					
					next();
				}else{
					res.json({'error':'Unauthorized Access'});
				}
			});
		},
		savecontacts : function(req,res){
			var contacts = JSON.parse(req.query.contacts);
			var data = [];
			for(var i in contacts){
				var temp = {};
				var contact = contacts[i];
				temp = {'displayName':contact.displayName,'public_key':req.query.publickey,'phone_home':'',
						'phone_work':'','phone_mobile':'','email_home':'','email_work':''};
				for(var j in contact.phoneNumbers){
					var contactno = contact.phoneNumbers[j];
					if(contactno['type'] =='home'){
						temp['phone_home'] = contactno['value'];
					}
					if(contactno['type'] =='work'){
						temp['phone_work'] = contactno['value'];
					}
					if(contactno['type'] =='mobile'){
						temp['phone_mobile'] = contactno['value'];
					}					
				}
				for(var k in contact.emails){
					var emails = contact.emails[k];
					if(emails['type'] =='home'){
						temp['email_home'] = emails['value'];
					}
					if(emails['type'] =='work'){
						temp['email_work'] = emails['value'];
					}					
				}
				data.push(temp);
			}
			Contacts.insert(data,function(err,result){
				if(!err && result){
					res.header('Content-Type', 'application/json');
					res.header('Charset', 'utf-8') ;
					res.send(req.query.callback + '('+JSON.stringify(result)+');');
				}else{
					console.log(err);
					res.json(req.query.callback + '('+'{"error":"No result"}'+');');
				}
			});
			
		},
		saveposition: function(req,res){
			var position = JSON.parse(req.query.position);
			var data = {
				  'latitude':position.coords.latitude,      
		          'longitude': position.coords.longitude,       
		          'altitude': position.coords.altitude,    
		          'accuracy': position.coords.accuracy,    
		          'altitudeAccuracy': position.coords.altitudeAccuracy,
		          'heading' : position.coords.heading,    
		          'speed'   : position.coords.speed,        
		          'timestamp':position.timestamp,
		          'public_key':req.query.publickey
		          };
					
			Position.insert(data,function(err,result){
				if(!err && result){
					res.header('Content-Type', 'application/json');
					res.header('Charset', 'utf-8') ;
					res.send(req.query.callback + '('+JSON.stringify(result)+');');
				}else{
					console.log(err);
					res.json(req.query.callback + '('+'{"error":"No result"}'+');');
				}
			});	
			
		},
		list : function(req,res){
			console.log(req.query);
			var filters = {
					'status':'1',
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
					res.json(req.query.callback + '('+'{"error":"No result"}'+');');
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
					res.json(req.query.callback + '('+'{"error":"No result"}'+');');
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
							res.json(req.query.callback + '('+'{"error":"No result"}'+');');
						}
					});
					
				}else{
					console.log(err);
					res.json(req.query.callback + '('+'{"error":"No result"}'+');');
				}
			});
		}
};
module.exports = fclouds;
