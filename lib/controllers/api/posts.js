var _ =           require('lodash'),
	mongoose = require('mongoose'),
    Post = mongoose.model('Post');

/**
 *  REST 
 */

 exports.findAll = function(req, res) {
	// Find all documents in the collection
	Post.find({}, function (err, docs) {
        res.send(docs);
	});
 };
 
 exports.findById = function(req, res) {
 	console.log('_id: ' + req.params.id);
	Post.find({"_id":req.params.id}, function (err, docs) {
        res.send(docs);
	});
 };

 exports.update = function(req, res) {
 	var reqPost = req.body;
	var id = req.params.id;

 	Post.find({"_id":id}).remove(function() {
		var newPost = new Post(reqPost, false);
		newPost.save(function(err) {
			res.send(200);
		});
	});

 };

 exports.delete = function(req, res) {
	var id = req.params.id;
 	Post.find({"_id":id}).remove(function() {
	});

 };