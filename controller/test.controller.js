const testModel = require('../model/test.model');
const moment = require('moment');
var testController = {};

testController.addCheckin = function(req,res){
	console.log('checkin called');

	var obj = new testModel();

	obj.employeeid = req.body.employeeid;
	obj.date = new Date,    
	obj.checkin = Date.now()
	

	console.log('---Object Created---');

	obj.save(obj,function(err,result){
		if (err) console.log(err);

		res.send({msg : "RECORD INSERTED"});

		return;
	})

	console.log('checkedin');


}
testController.addCheckout = function(req,res){
	console.log('Checkout called');

	var condition = req.body.employeeid;
	var update = { checkout : Date.now() }
	testModel.findByIdAndUpdate( condition , update , function(err,result){
		if (err) console.log(err);
		res.send(result);
	})
}


testController.findEmployee = function(req,res){
	console.log('Query fiered');
	
	var condition = { employeeid : req.body.employeeid };

	testModel.find( condition , {checkin:1,checkout:1, _id:0}, 
function(err,result){
		if (err) console.log(err);
		// res.send(result);
	},
	testModel.aggregate([
		{	"$match" :{
			"employeeid" : req.body.employeeid
		}
	},
	{   "$project" : {
		"duration":{"$sum" : { "$subtract": ["$checkout", "$checkin"]}},
		"_id" : 1 
	}

}],
function(err,result){
		console.log(result);
		var totalDurationMS = 0;
		for(var i = 0; i < result.length; i++)
			totalDurationMS += result[i].duration;
		totalDuration = (((totalDurationMS / 1000) / 60) / 60);
		console.log("TOTAL DURATION  =  ",totalDurationMS);
		
		var tempTime = moment.duration(totalDurationMS);
		var y = tempTime.hours()+" - " + tempTime.minutes();

		console.log("TOTAL DURATION in HRs  =  ",y);

		if (err) console.log(err);
		res.send({time : y});
		
	})
)}

module.exports = testController;