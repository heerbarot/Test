var mongoose = require('mongoose')
require('mongoose-moment')(mongoose);
var Schema = mongoose.Schema;
var moment = require('moment');
var timeSchema = new Schema({
	employeeid : String,
	date: Date,
	checkin:  Date,
	checkout:  Date,
	person : [{type: Schema.Types.ObjectId , ref:'employeeModel'}]
})

var timeModel = mongoose.model('timeModel',timeSchema);

module.exports = timeModel;
