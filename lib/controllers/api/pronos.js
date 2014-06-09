var _ =           require('lodash'),
	mongoose = require('mongoose'),
    Prono = mongoose.model('Prono');

/**
 *  REST 
 */

 exports.findAll = function(req, res) {
	// Find all documents in the collection
	Prono.find({}, function (err, docs) {
        res.send(docs);
	});
 };
 
 exports.findWinner = function(req, res) {
	// Find all documents in the collection
	Prono.find({}, { 'secondStageMatches.final': 1 } , function (err, docs) {
        res.send(docs);
	});
 };

 exports.findById = function(req, res) {
 	console.log(' prono: ' + req.params.id);
	Prono.find({"userData.username":req.params.id}, function (err, docs) {
        res.send(docs);
	});
 };

 exports.update = function(req, res) {
 	var reqprono = req.body;
	var id = req.params.id;

	if (req.user.username === id) { // vérifie que le joueur qui met à jour est bien le proprietaire
	 	Prono.find({"userData.username":id}).remove(function() {
			var newProno = new Prono(reqprono, false);
			newProno.save(function(err) {
				res.send(200);
				console.log("Prono mis à jour pour " + id + " -- " + req.user.username);
			});
		});
	}

 };