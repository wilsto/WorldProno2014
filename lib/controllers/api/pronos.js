/**
 *  REST 
 */

 exports.findAll = function(req, res) {
	// Find all documents in the collection
	dbPronos.find({}, function (err, docs) {
        res.send(docs);
	});
 };
 
 exports.findById = function(req, res) {
 	console.log(' prono: ' + req.params.id);

	dbPronos.find({"userData.firstName":req.params.id}, function (err, docs) {
        res.send(docs);
	});
 };

 exports.add = function(req, res) {

 	var prono = req.body;
 	console.log('Adding prono: ' + JSON.stringify(prono));

 	dbPronos.insert(prono, function (err, newDocs) {
 	});

 };


 exports.update = function(req, res) {
 	var prono = req.body;
	var id = req.params.id;
 	console.log('req.id: ',id);
 	dbPronos.update({"userData.firstName": id}, prono, {}, function (err, newDocs) {
 		console.log('Updating Prono '+ id);
 	});

 };