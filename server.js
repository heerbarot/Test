const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');
const app = express();
const timeController = require('./controller/time.controller');
const employeeController = require('./controller/employee.controller');
const testController = require('./controller/test.controller');
const userController = require('./controller/user.controller');
const postController = require('./controller/post.controller');



mongoose.connect('mongodb://localhost/attendance');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true }))
app.use(cors());

//app.use('/api', apiRouter);


app.listen(3000,function(){
	console.log('Listening on 3000');
})




app.post('/employee',employeeController.addEmployee);
app.get('/employee/find',employeeController.findEmployee);
app.post('/employee/update',employeeController.update);
app.post('/employee/delete',employeeController.delete);
app.post('/employee/login',employeeController.login);


app.post('/checkin',timeController.addCheckin);
app.post('/checkout',timeController.addCheckout);
app.post('/test/checkin',testController.addCheckin);
app.post('/test/checkout',testController.addCheckout);
app.post('/test/time',testController.findEmployee);

app.post('/user',userController.addUser);
app.post('/post/add',postController.addPost);
app.get('/user',userController.findUser);
app.get('/posts',postController.findPost);