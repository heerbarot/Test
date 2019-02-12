var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var userSchema = Schema({
  name: String,
  age: Number,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});


var User = mongoose.model('User', userSchema);
userSchema.plugin(deepPopulate);

module.exports = User;