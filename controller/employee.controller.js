const employeeModel = require('../model/employee.model'); 
var moment = require('moment');


var employeeController = {};

employeeController.addEmployee = function(req,res){
	console.log('Add employee called');

	var obj = new employeeModel();

	obj.name  = req.body.name;
	obj.lastname  = req.body.lastname;
	obj.address  = req.body.address;
	obj.email  = req.body.email;
	obj.contact  = req.body.contact;
	obj.username = req.body.username;
	obj.password = req.body.password;

	console.log('+++++Object created');
	console.log(moment().format("MMMM Do YYYY"));
	obj.save(obj,function(err,result){
		if (err) console.log(err);

		res.send({msg:"RECORD INSERTED"});

		return;
	})
}

employeeController.findEmployee = function(req,res){
	console.log('FIND EMPLOYEE');

	employeeModel.find({},function(err,result){
		if (err) console.log(err);
			res.send(result);
	});
}
employeeController.populate = function(req,res){
	employeeModel.find().populate().exec(function(err,result){
		if (err) console.log(err);
		res.send(result);
	})
}
employeeController.update = function(req,res){
	var condition = { name : req.body.name };
	var update = {

		name  : req.body.name,
		lastname  : req.body.lastname,
		address  : req.body.address,
		email  : req.body.email,
		contact  : req.body.contact,

	}
	employeeModel.findOneAndUpdate(condition,
		update,
		function(err,updatedEmployee){
			if (err) {
				console.log(err);
				return;
			}
			res.send(updatedEmployee);
	})
}
employeeController.delete = function(req,res){
	var condition = { _id : req.body.employeeid }
	employeeModel.findByIdAndDelete( condition , function(err,result){
		if (err) {
			console.log(err);
		}
		res.send( {msg : 'Deleted Successfully'} );
	})
}
employeeController.login = function(req,res){
	var condition = {
		username: req.body.username,
		password: req.body.password
	}
	employeeModel.findOne(condition,{password : 0,_v : 0},function(err,loggedin){
		if (err) {
			console.log(err);
			res.send({msg:'Could\'nt login.'})
		}
		console.log(loggedin);
		res.send({loggedin});

	})
}

module.exports = employeeController;