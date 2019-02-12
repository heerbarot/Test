var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var posts = require('../model/post.model');

/* GET home page. */
router.get('/', function(req, res, next) {
  posts.find(function (err, result) {
    if (err) return next(err);
    res.json(result);
  });
});

module.exports = router;