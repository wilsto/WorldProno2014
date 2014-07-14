var _ =           require('lodash'),
	mongoose = require('mongoose'),
    Point = mongoose.model('Point');

/**
 *  REST 
 */

 exports.findAll = function(req, res) {
	// Find all documents in the collection
	Point.find({}, function (err, docs) {
        res.send(docs);
	});
 };
 
 exports.findByName = function(req, res) {
	Point.find({"name":req.params.name}).lean().exec( function (err, docs) {
		console.log(req.params.tour);
        res.send(docs[0].points[req.params.tour].details);
	});
 };

 exports.update = function(req, res) {
 	var reqPoint = req.body;
	var id = req.params.id;

 	Point.find({"_id":id}).remove(function() {
		var newPoint = new Point(reqPoint, false);
		newPoint.save(function(err) {
			res.send(200);
		});
	});

 };

 exports.delete = function(req, res) {
	var id = req.params.id;
 	Point.find({"_id":id}).remove(function() {
	});

 };