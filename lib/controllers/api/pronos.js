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
	dbPronos.find({"userData.username":req.params.id}, function (err, docs) {
        res.send(docs);
	});
 };

 exports.add = function(req, res) {

 	var prono = req.body;
 	console.log('Adding prono: ' + JSON.stringify(prono));

 	dbPronos.insert(prono, function (err, newDocs) {
 		 		res.send(200);
 	});

 };

 exports.update = function(req, res) {
 	var prono = req.body;
	var id = req.params.id;
 	console.log('req.id: ',id);


 	dbPronos.find({"userData.username":id}, function (err, docs) {
 		console.log(docs.length);
 		if (docs.length > 0) {
		 	dbPronos.update({"userData.username": id}, prono, {}, function (err, newDocs) {
		 		console.log('Updating Prono '+ id);
		 		res.send(200);
		 	});
 		} else {
		 	dbPronos.insert(prono, function (err, newDocs) {
		 		console.log('Inserting Prono '+ id);
			 	res.send(200);
		 	});
 		}
	});


 };