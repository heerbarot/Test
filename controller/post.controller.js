var Post = require('../model/post.model');
var User = require('../model/user.model');
var postController = {};

postController.addPost = function(req,res){

	var obj = new Post();
	obj.user = "5c41c10088254228c6326ca9";
	obj.title = req.body.title;
	obj.content = req.body.content;
	// console.log("Post to be saved : ",obj);
	obj.save(obj,function(err,result){
		if (err) console.log(err);
		// The post has been added.
		// So inform the user that the post was added.
		// Therefore the user.posts[] must be pushed with the new post ID.
		console.log("posts inserted ",result);
		console.log("Updating User with postid = ",result._id);
		
		User.find({_id: obj.user},function(err,user){
			if(err) {
				console.error(err);
				res.status(500).send(err);
			} 
			if(user.length < 1) {
				console.log("No users found.");
				res.status(404).send()
			}

			user = user[0];
			console.log("User to be updated : ", user);
			user.posts.push(result._id);

			//user.save(function(err,updatedUser){
			//	console.log("User updated successfully.",updatedUser)
				res.send(result);
			//});
		});

	});
}

postController.findPost = function(req,res){
	
	Post
	.find({})
//	.populate('user')
	.exec(function(err,result){
		if (err) console.log(err);
		res.send(err || result);
	});

}

module.exports = postController;