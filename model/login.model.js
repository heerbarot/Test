var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var loginSchema = new Schema({
	username : String,
	password : String
});

var loginModel = mongoose.model('loginModel',loginSchema);

module.exports = loginModel;
