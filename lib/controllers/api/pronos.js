var _ =           require('lodash'),
	mongoose = require('mongoose'),
    Prono = mongoose.model('Prono'),
    Point = mongoose.model('Point'),
    User = mongoose.model('User');

var Q = require('q');

/**
 *  REST 
 */

 exports.pronoTime = function(req, res) {
	// Renvoie la date Serveur
    res.send({date:Math.round(Date.now() / 1000)});
 };

 exports.findAll = function(req, res) {

	// Find all documents in the collection
	Q()
		.then(function(){
			var deferred = Q.defer();

			// Cherche les infos Users
			// -------------------------------------
			Prono.find({}).lean().exec( function (err, all) {
				if (err) deferred.reject(err);
		    	else {
					allPlayers = all;
					deferred.resolve(1);
				}
			});

		    return deferred.promise;
	    })		
	    .then(function(){
			var deferred = Q.defer();

			// Cherche les infos Users
			// -------------------------------------
			User.find({}).lean().exec( function (err, users) {
				if (err) deferred.reject(err);
		    	else {
					allUsers = users;
					deferred.resolve(2);
				}
			});

		    return deferred.promise;
	    })
		.then(function(){
			var deferred3 = Q.defer();
			// Caclules les scores
			// -------------------------------------

			var points = { result : 3, score:1, qualif:2, winner:5};

		 	var realProno = _.findWhere(allPlayers, function(item){
		 		return item.userData.username === 'Mondial'
		 	});

			_.each(allPlayers, function(dataPlayer, playerNb){	// pour chaque joueur


				dataPlayer.points ={};
				dataPlayer.totalpoints = 0;
				dataPlayer.points.tour1 = {total:0,result:0,score:0,details:[]};
				dataPlayer.points.tour2 = {total:0,result:0,score:0,details:[]};
				dataPlayer.points.tour3 = {total:0,result:0,score:0,details:[]};
				dataPlayer.points.qualif =	{total:0,details:[]};
				dataPlayer.points.roundOf16 = {total:0,result:0,score:0,details:[]};
				dataPlayer.points.quarterFinals =	{total:0,result:0,score:0,details:[]};
				dataPlayer.points.semiFinals =	{total:0,result:0,score:0,details:[]};
				dataPlayer.points.Finals =	{total:0,result:0,score:0,details:[]};
				dataPlayer.points.winner =	{total:0,result:0,score:0,details:[]};

				var lastUpdate = (dataPlayer.userData.lastUpdateNum !== undefined) ? dataPlayer.userData.lastUpdateNum : 1402603199;
				_.each(dataPlayer.groupsMatches, function(groupsMatches, group){	// pour chaque groupe
					var matchNb = 0;
					_.each(groupsMatches.matches, function(match){	// pour chaque match

						var realMatch = realProno.groupsMatches[group].matches[matchNb];
						if(realMatch[0].score.length === 0 || realMatch[1].score.length === 0 ){
							//le match n'est pas joué
						}else {

							// details du numéro du tour
							var tour ='';
							switch( matchNb) {
								case 0 :
								case 1 : tour ='tour1'; break;
								case 2 :
								case 3 : tour ='tour2'; break;
								case 4 :
								case 5 : tour ='tour3'; break;
							}

							dataPlayer.points[tour].result = 0;
							dataPlayer.points[tour].score = 0;
							var MatchTimeStamp = Math.round((new Date("2014-" + realMatch[2].date.split('/')[1] + "-" + realMatch[2].date.split('/')[0] + " " + realMatch[2].time + ":00").getTime() - 7200000 ) /1000);
							if (lastUpdate < MatchTimeStamp) {
							if(realMatch[0].score > realMatch[1].score){
								if(match[0].score > match[1].score){
									dataPlayer.points[tour].result = points.result;
									if (realMatch[0].score === match[0].score && realMatch[1].score === match[1].score ){ // si bon score
										dataPlayer.points[tour].score = points.score;
									}
								}
							}else if(realMatch[0].score < realMatch[1].score){
								if(match[0].score < match[1].score){
									dataPlayer.points[tour].result = points.result;
									if (realMatch[0].score === match[0].score && realMatch[1].score === match[1].score ){ // si bon score
										dataPlayer.points[tour].score = points.score;
									}
								}

							}else{
								if(match[0].score === match[1].score){
									dataPlayer.points[tour].result = points.result;
									if (realMatch[0].score === match[0].score && realMatch[1].score === match[1].score ){ // si bon score
										dataPlayer.points[tour].score = points.score;
									}
								}
							}
							// details
							dataPlayer.points[tour].total = dataPlayer.points[tour].total + dataPlayer.points[tour].result + dataPlayer.points[tour].score;
							//dataPlayer.points[tour].details.push({group:group, countries:realMatch[0].country + ' vs ' + realMatch[1].country,scorereel:realMatch[0].score + ' - ' + realMatch[1].score,score:match[0].score + ' - ' + match[1].score,points:dataPlayer.points[tour].result + dataPlayer.points[tour].score});
							} else {
								dataPlayer.points[tour].total = dataPlayer.points[tour].total + dataPlayer.points[tour].result + dataPlayer.points[tour].score;
								//dataPlayer.points[tour].details.push({group:group, countries:realMatch[0].country + ' vs ' + realMatch[1].country + ' **KO',scorereel:realMatch[0].score + ' - ' + realMatch[1].score,score:match[0].score + ' - ' + match[1].score,points:dataPlayer.points[tour].result + dataPlayer.points[tour].score});
							}
						}
						matchNb++;
					});

					// Calcul des qualifiés
					// **************************
					_.each(groupsMatches.sortedStanding, function(standing, standingNb){	// pour chaque groupe
						
						_.each(realProno.groupsMatches[group].sortedStanding, function(realStanding, realStandingNb){	// pour chaque groupe
							//console.log('standingName',standing)
							//console.log('REALstandingName',realStanding)
							if (standing[0] === realStanding[0] && standingNb < 2 && realStandingNb < 2) {
								dataPlayer.points.qualif.total =dataPlayer.points.qualif.total +2;
								dataPlayer.points.qualif.details.push({group:"Qualif 8ème", countries:standing[0],scorereel:"",score:"",points:2});
							}	
							if (standingNb ===0 && realStandingNb === 0) {
								groupOrder = false;
								teamOrder = "";
								if (standing[0] === realStanding[0]) {
									groupOrder = true;
									teamOrder =standing[0];
								}
							}		
							if (standing[0] === realStanding[0] && standingNb ===1 && realStandingNb === 1) {
								if (groupOrder === true) {
									dataPlayer.points.qualif.total =dataPlayer.points.qualif.total +2;
									dataPlayer.points.qualif.details.push({group:"*** Ordre Qualif", countries:teamOrder + " " + standing[0],scorereel:"",score:"",points:2});
								}
							}
						});
					});


				});

				// 8ème de finale
				_.each(dataPlayer.secondStageMatches.roundOf16, function(match, matchNb){	// pour chaque groupe

					// Calcul des qualifiés
					// **************************
					// _.each(realProno.secondStageMatches.roundOf16, function(realMatch, realMatchNb){	// pour chaque groupe
					// 	if (match[0].country === realMatch[0].country || match[0].country === realMatch[1].country) {
					// 		dataPlayer.points.qualif.total =dataPlayer.points.qualif.total +2;
					// 		dataPlayer.points.qualif.details.push({group:"8ème", countries:match[0].country,scorereel:"",score:"",points:2});
					// 	}
					// 	if (match[1].country === realMatch[0].country || match[1].country === realMatch[1].country) {
					// 		dataPlayer.points.qualif.total =dataPlayer.points.qualif.total +2;
					// 		dataPlayer.points.qualif.details.push({group:"8ème", countries:match[1].country,scorereel:"",score:"",points:2});
					// 	}
					// });

					// Calcul des points par match
					// **************************
					var realMatch = realProno.secondStageMatches.roundOf16[matchNb];
					//console.log("match", matchNb+" - "+   match[0].country + " (" + match[0].score +  ") - "+ match[1].country + " (" + match[1].score +  ")");
					//console.log("realMatch",  matchNb+" - "+ realMatch[0].country + " (" + realMatch[0].score +") - "+ realMatch[1].country+ " (" + realMatch[1].score +  ")");

					if(realMatch[0].score.length === 0 || realMatch[1].score.length === 0 ){
						//le match n'est pas joué
					}else {
						var matchTeamOk =  (match[0].country === realMatch[0].country && match[1].country === realMatch[1].country) ? true : false;

						dataPlayer.points.roundOf16.result = 0;
						dataPlayer.points.roundOf16.score = 0;
						var MatchTimeStamp = Math.round((new Date("2014-" + realMatch[2].date.split('/')[1] + "-" + realMatch[2].date.split('/')[0] + " " + realMatch[2].time + ":00").getTime() - 7200000 ) /1000);
						if (lastUpdate < MatchTimeStamp) {
							if(realMatch[0].score > realMatch[1].score && matchTeamOk){
								if(match[0].score > match[1].score){
									dataPlayer.points.roundOf16.result = points.result;
									if (realMatch[0].score === match[0].score && realMatch[1].score === match[1].score ){ // si bon score
										dataPlayer.points.roundOf16.score = points.score;
									}
								}
							}else if(realMatch[0].score < realMatch[1].score  && matchTeamOk){
								if(match[0].score < match[1].score){
									dataPlayer.points.roundOf16.result = points.result;
									if (realMatch[0].score === match[0].score && realMatch[1].score === match[1].score ){ // si bon score
										dataPlayer.points.roundOf16.score = points.score;
									}
								}

							}else{
								if(match[0].score === match[1].score  && matchTeamOk){
									dataPlayer.points.roundOf16.result = points.result;
									if (realMatch[0].score === match[0].score && realMatch[1].score === match[1].score ){ // si bon score
										dataPlayer.points.roundOf16.score = points.score;
									}
								}
							}
							// details
							dataPlayer.points.roundOf16.total = dataPlayer.points.roundOf16.total + dataPlayer.points.roundOf16.result + dataPlayer.points.roundOf16.score;
							//dataPlayer.points.roundOf16.details.push({group:matchNb, countries:realMatch[0].country + ' vs ' + realMatch[1].country,scorereel:realMatch[0].score + ' - ' + realMatch[1].score,score:match[0].score + ' - ' + match[1].score,points:dataPlayer.points.roundOf16.result + dataPlayer.points.roundOf16.score});
						} else {
							dataPlayer.points.roundOf16.total = dataPlayer.points.roundOf16.total + dataPlayer.points.roundOf16.result + dataPlayer.points.roundOf16.score;
							//dataPlayer.points.roundOf16.details.push({group:matchNb, countries:realMatch[0].country + ' vs ' + realMatch[1].country + ' **KO',scorereel:realMatch[0].score + ' - ' + realMatch[1].score,score:match[0].score + ' - ' + match[1].score,points:dataPlayer.points.roundOf16.result + dataPlayer.points.roundOf16.score});
						}
					}
				});	

				// Recalcule du score total par joueur
				dataPlayer.totalpoints= dataPlayer.points.tour1.total + dataPlayer.points.tour2.total + dataPlayer.points.tour3.total + dataPlayer.points.qualif.total + dataPlayer.points.roundOf16.total;

				if (playerNb === allPlayers.length -1 ) {
					deferred3.resolve(3);
				}
			});

		    return deferred3.promise;
	    })
		.then(function(){
			var deferred = Q.defer();

			// Simplifie la réponse
			// -------------------------------------
			_.each(allPlayers, function(dataPlayer, playerNb){	// pour chaque joueur
				delete dataPlayer.groupsMatches;
				delete dataPlayer.secondStageMatches;
			});

			deferred.resolve(4);
		    return deferred.promise;
	    })
		.finally(function(){
			var deferred = Q.defer();
			// Renvoie les données
			// -------------------------------------
	       	res.send(allPlayers);
			deferred.resolve(6);

		    return deferred.promise;
		});
 };
 
 exports.findWinner = function(req, res) {
	// Find all documents in the collection
	Prono.find({}, { 'secondStageMatches.final': 1 } , function (err, docs) {
        res.send(docs);
	});
 };

 exports.findById = function(req, res) {
 	//console.log(' prono: ' + req.params.id);
	Prono.find({"userData.username":req.params.id}, function (err, docs) {
        res.send(docs);
	});
 };

 exports.update = function(req, res) {
 	var reqprono = req.body;
	var id = req.params.id;

	req.body.userData.lastUpdateNum = Math.round(Date.now() / 1000);
	req.body.userData.lastUpdateTxt = Date() ;
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