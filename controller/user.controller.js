var User = require('../model/user.model');
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

 //User.plugin(deepPopulate);
var user = {};


user.addUser = function(req,res){

	var object = new User();
	
	object.name = req.body.name;
	object.age = req.body.age;

	object.save(object,function(err,result){
		if (err) console.log(err);
		console.log('Record inserted');
	})
}

user.findUser = function(req,res){
	User
	.find({})
	.populate('posts')
	.exec(function(err, users) {
	    if(err) 
	    	console.log(err);
	    else 
	    	console.log(users);
	    
	  	res.send(users);
	  }) 
}


module.exports = user;
