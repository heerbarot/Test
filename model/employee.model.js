var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = new Schema({

	name: String,
	lastname: String,
	address: String,
	email: String,
	contact: Number,
	username: String,
	password: String,
	work : {type: Schema.ObjectId 	, ref : "testModel"}
})

var employeeModel = mongoose.model('employeeModel',employeeSchema);

module.exports = employeeModel;