var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  content: String
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;