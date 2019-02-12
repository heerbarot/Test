const timeModel = require('../model/time.model');
var moment = require('moment');

var timeController = {};

timeController.addCheckin = function(req,res){
	console.log('checkin called');

	var obj = new timeModel();

	obj.employeeid = req.body.employeeid;
	obj.name = req.body.name;
	obj.date = new Date,    
	obj.checkin = Date.now()
	

	console.log('---Object Created---');

	obj.save(obj,function(err,result){
		if (err) console.log(err);

		res.send("RECORD INSERTED");

		return;
	})

	console.log('checkedin');


}
timeController.addCheckout = function(req,res){
	console.log('Checkout called');

	var condition = req.body.employeeid;
	var update = { checkout : Date.now() }
	timeModel.findByIdAndUpdate( condition , update , function(err,result){
		if (err) console.log(err);
		res.send(result);
	})
}

timeController.findEmployee = function(req,res){
	console.log('Query fiered');
	
	var condition = { employeeid : req.body.employeeid };

	timeModel.find( condition , {checkin:1,checkout:1, _id:0}, function(err,result){
		if (err) console.log(err);
		res.send(result);
	},
	timeModel.aggregate([
    {
        "$project": {
            "duration": { "$subtract": [ "$checkout", "$checkin" ] }
        }

    }
	],function(err,result){
		if (err) console.log(err)
			console.log(JSON.stringify( result, undefined, 2 ));
	})
)}
module.exports = timeController;