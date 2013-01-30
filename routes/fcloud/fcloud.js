"use strict";
var util = require('util');
var Profile = require('../../models/profile');
var ProfileDetails = require('../../models/profiledetail');
var Friend = require('../../models/fcloud/friend');
var Notification = require('../../models/fcloud/notification');
var Group = require('../../models/fcloud/group');
var Contacts = require('../../models/fcloud/contacts');
var Position = require('../../models/fcloud/position');
var Posts = require('../../models/fcloud/posts');

var fclouds = {
		/**
		 * Load user information 
		 * @param req
		 * @param res
		 * @param next
		 */
		info : function(req,res,next){
			if(req.query.publickey){
				var filters = {'public_key':req.query.publickey};
				Profile.select(filters,function(err,result){
					if(!err && res){
						if(result.length !==1){
							fclouds.registerdevice(req,res,next);
						}else {
							req.profile = result[0];
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
		friendlist : function(req,res,next){
			if(req.profile.id){
				var profile_id = req.profile.id;
				Friend.by_profile_id(profile_id,function(err,result){
					if(!err && result){
							req.profile.friends = result;
							next();				
						
					}else{
						console.log(err);
						res.json({'error':'Unauthorized Access'});
					}
				});
			}
		},
		/**
		 * Fetching user profile
		 * @param req
		 * @param res
		 */
		profile : function(req,res){
			var profile = req.profile;
			console.log(profile);
			res.header('Content-Type', 'application/json');
			res.header('Charset', 'utf-8') ;
			res.send(req.query.callback + '('+JSON.stringify(profile)+');');  
		},
		/**
		 * Register Device
		 * @param req
		 * @param res
		 * @param next
		 */
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
		/**
		 * Save Contacts
		 * @param req
		 * @param res
		 */
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
		/**
		 * Save Position
		 * @param req
		 * @param res
		 */
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
		/**
		 * List friends
		 * @param req
		 * @param res
		 */
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
		/**
		 * Fetch Profile Details
		 * @param req
		 * @param res
		 */
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
		/**
		 * Fetch profile info
		 * @param req
		 * @param res
		 * @param next
		 */
		fetchinfo : function(req,res,next){
			var trace_friend_id = req.query.friend_id;
			var profile_id = req.query.profile_id;
			var ids = [profile_id,trace_friend_id];
			ProfileDetails.byId(ids,function(err,result){
				if(!err && res){
						
					for(var k in result){
						if(result[k].id == profile_id){
							req.profile = result[k];
						}
						if(result[k].id == trace_friend_id){
							req.friend = result[k];
						}
					}
				}else{
					console.log(err);
				}
				next();
			});
		},
		/**
		 * Trace Me
		 * @param req
		 * @param res
		 */
		traceme : function(req,res){
			console.log(req.profiles);
			var friend = req.friend;
			var profile = req.profile;
			var data = {'profile_id':profile.id,'friend_id':friend.id};
			Friend.add(data,function(err,result){
				if(!err && res){
					var notification = [{'user_id':profile.id,'msg':'Request sent to  '+friend.name,'type':'1'},
					                    {'user_id':friend.id,'msg':profile.name+' wants to be friends with you on Traceme ','type':'1'}];
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
		},
		posts : function(req,res){
			console.log(req.query);
			var filters = {
					'status':'1',
			};
			var posts = {};
			Posts.all(function(err,result){
				//console.log(result);
				if(!err && result){
					posts.items = result;
					res.header('Content-Type', 'application/json');
					res.header('Charset', 'utf-8') ;
					res.send(req.query.callback + '('+JSON.stringify(posts)+');');  
				}else{
					console.log(err);
					res.json(req.query.callback + '('+'{"error":"No result"}'+');');
				}
			});
		}
		
};
module.exports = fclouds;
