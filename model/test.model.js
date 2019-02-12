var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var testSchema = new Schema({
	employeeid : String,
	date: Date,
	checkin:  Date,
	checkout:  Date
})

var testModel = mongoose.model('testModel',testSchema);

module.exports = testModel;
