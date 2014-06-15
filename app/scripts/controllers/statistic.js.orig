'use strict';

angular.module('worldProno2014App')


.filter('offset', function() {
	return function(input, start) {
		start = parseInt(start, 10);
		return input.slice(start);
	};
})

.directive('popOver', function ($compile,limitToFilter) {
		var itemsTemplate = '<table class="table table-responsive table-condensed table-small"><tr><td class="group">Grp</td><td class="group">Equipes</td><td class="group">Pts</td><td class="group">Réel</td><td class="group">Prono</td></tr><tr ng-repeat="item in items | limitTo:currentPage-taille | limitTo:itemsPerPage" ng-class="{success:item.points,warning:item.points ===0}"><td>{{item.group}}</td><td>{{item.countries}}</td><td class="Pts">{{item.points}}</td><td>{{item.scorereel}}</td><td>{{item.score}}</td></tr></table><ul class="pager"><li ng-class="prevPageDisabled()"><a href ng-click="prevPage()">Previous </a></li><li ng-class="nextPageDisabled()"><a href ng-click="nextPage()">Next</a></li></ul>';
		var getTemplate = function (contentType) {
			var template = '';
			switch (contentType) {
				case 'items':
					template = itemsTemplate;
					break;
			}
			return template;
		};
		return {
			restrict: 'A',
			transclude: true,
			template: '<span ng-transclude></span>',
			controller: function($scope, $element){
				$scope.currentPage = 0;
				$scope.itemsPerPage = 5;
				$scope.taille = $scope.items.length;
				$scope.prevPage = function() {
					if ($scope.currentPage > 0) {
						$scope.currentPage--;
					}
				};
				$scope.nextPage = function() {
					if ($scope.currentPage < $scope.pageCount()) {
							$scope.currentPage++;
						}
				};
				$scope.pageCount = function() {
						return Math.ceil($scope.items.length/$scope.itemsPerPage)-1;
					};
				$scope.prevPageDisabled = function() {
					return $scope.currentPage === 0 ? 'disabled' : '';
				};
				$scope.nextPageDisabled = function() {
						return $scope.currentPage === $scope.pageCount() ? 'disabled' : '';
					};
				},
			link: function (scope, element,attrs) {
				var popOverContent;
				if (scope.items) {
					var html = getTemplate('items');
					popOverContent = $compile(html)(scope);
				}
				var options = {
					content: popOverContent,
					placement: 'bottom',
					html: true,
					title: scope.title
				};
				$(element).popover(options);
			},
			scope: {
				items: '=',
				title: '@'
			}
		};
	})

.controller('StatisticCtrl', ['$scope', '$http', 'PronoFactory', 'Auth', '$resource', '$q', '$filter', function ($scope, $http, PronoFactory, Auth, $resource, $q, $filter) {

	$http.get('/REST/userGroup/').success(function(alltags) {
        $scope.alltags =alltags;
    });

	$scope.loadTags = function(query) {
	    var deferred = $q.defer();
	    deferred.resolve($filter('filter')($scope.alltags, query));
	    return deferred.promise;
	};

	var points = { result : 3, score:1, qualif:2, winner:5};

	$scope.user = Auth.user;
	$scope.userRoles = Auth.userRoles;
	$scope.accessLevels = Auth.accessLevels;
	$scope.lstRole = '';

	$scope.realProno = PronoFactory.get({id:'Mondial'},
		function(data) {
			if (data.length > 0) { // recupère les pronos du joueur
				$scope.allPlayers = PronoFactory.query(
					function() {
<<<<<<< HEAD
						
						return $q.all([
							clearPoints(),
							calculatePoints()
						])
						.then(function(results) {
							//Descending Order:
							$scope.allPlayers = _.sortBy($scope.allPlayers, function(num){
								return num.totalpoints * 1;
							});
						});
=======
						clearPoints();
						calculatePoints();

>>>>>>> origin/master
						//supprime le mondial
						$scope.allPlayers = _.rest($scope.allPlayers);

						// $scope.allPlayersArr = _.map($scope.allPlayers, function(value,index) {
						// 	return [value];
						// });

						// attacher les popover
						$('[data-toggle="popover"]').popover();
					});
			}
	});

	$scope.filterRole = function(allPlayers,myfilter) {
			var result = {};

			allPlayers = _.sortBy(allPlayers, function(num){
				return num.totalpoints * -1;
			});			

			//console.log($scope.tags[0].text);
			angular.forEach(allPlayers, function(value, key) {
				var rolePlayer;

				// gère le cas où ADMIN fait parti des VIP
				if(value.userData.role!==undefined) {
					rolePlayer=(value.userData.role.title === 'admin') ? 'vip': value.userData.role.title;
				}

				// filtre suivant le role et le groupe
				if (rolePlayer===myfilter||myfilter==='') {

					//filter group
					if($scope.tags[0]!==undefined) {
						if(_.findWhere(value.userData.groups, {text: $scope.tags[0].text})!==undefined) {
							result[key] = value;
						}
					} else {
							result[key] = value;
					}

				}

			});
			return result;
	};
	/*
		Ajout filtre podium pour les 3 premiers
	 */
	
	$scope.filterRolePodium = function(allPlayers,myfilter) {
			var result = {};
		var nbFilter=0;
			angular.forEach(allPlayers, function(value, key) {
				var rolePlayer;
				if(value.userData.role!==undefined) {
					rolePlayer=(value.userData.role.title === 'admin') ? 'vip': value.userData.role.title ; // gère le cas où ADMIN fait parti des VIP
				}
					if (rolePlayer===myfilter||myfilter==='') {
						nbFilter++;
						if (Math.max(nbFilter,3)===3)
						{
							result[nbFilter] = value;
						}
					}
			});
			return result;
	};

	/**
	 * [Initialise les calculs]
	 */
	 function clearPoints(){
		_.each($scope.allPlayers, function(groupData){
			groupData.points ={};
			groupData.totalpoints = 0;
			groupData.points.tour1 = {total:0,result:0,score:0,details:[]};
			groupData.points.tour2 = {total:0,result:0,score:0,details:[]};
			groupData.points.tour3 = {total:0,result:0,score:0,details:[]};
			groupData.points.qualif =	{total:0,details:[]};
			groupData.points.roundOf16 = {total:0,details:[]};
			groupData.points.quarterFinals =	{total:0,details:[]};
			groupData.points.semiFinals =	{total:0,details:[]};
			groupData.points.Finals =	{total:0,details:[]};
			groupData.points.winner =	{total:0,details:[]};
			$http.get('/REST/userInfo/' + groupData.userData.username).success(function(user) {
				groupData.userData.groups = user.groups;
				groupData.userData.avatarUrl =  user.avatarUrl;
				groupData.userData.pseudo =  user.pseudo;
				groupData.userData.role.title =  user.role.title;
			});

		});
	}


	/**
	 * [Réalise les calculs]
	 */
	 function calculatePoints(){
		_.each($scope.allPlayers, function(dataPlayer, playerNb){	// pour chaque joueur
			var lastUpdate = (dataPlayer.userData.lastUpdateNum !== undefined) ? dataPlayer.userData.lastUpdateNum : 1402603199;
			_.each(dataPlayer.groupsMatches, function(groupsMatches, group){	// pour chaque groupe
				var matchNb = 0;
				_.each(groupsMatches.matches, function(match){	// pour chaque match
					var realMatch = $scope.realProno[0].groupsMatches[group].matches[matchNb];
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

						$scope.allPlayers[playerNb].points[tour].result = 0;
						$scope.allPlayers[playerNb].points[tour].score = 0;
						var MatchTimeStamp = Math.round((new Date("2014-" + realMatch[2].date.split('/')[1] + "-" + realMatch[2].date.split('/')[0] + "T" + realMatch[2].time + ":00").getTime() - 120 * 60 ) /1000 +7);
						if (lastUpdate < MatchTimeStamp) {
						if(realMatch[0].score > realMatch[1].score){
							if(match[0].score > match[1].score){
								$scope.allPlayers[playerNb].points[tour].result = points.result;
								if (realMatch[0].score === match[0].score && realMatch[1].score === match[1].score ){ // si bon score
									$scope.allPlayers[playerNb].points[tour].score = points.score;
								}
							}
						}else if(realMatch[0].score < realMatch[1].score){
							if(match[0].score < match[1].score){
								$scope.allPlayers[playerNb].points[tour].result = points.result;
								if (realMatch[0].score === match[0].score && realMatch[1].score === match[1].score ){ // si bon score
									$scope.allPlayers[playerNb].points[tour].score = points.score;
								}
							}

						}else{
							if(match[0].score === match[1].score){
								$scope.allPlayers[playerNb].points[tour].result = points.result;
								if (realMatch[0].score === match[0].score && realMatch[1].score === match[1].score ){ // si bon score
									$scope.allPlayers[playerNb].points[tour].score = points.score;
								}
							}
						}
						// details
						$scope.allPlayers[playerNb].points[tour].total = $scope.allPlayers[playerNb].points[tour].total + $scope.allPlayers[playerNb].points[tour].result + $scope.allPlayers[playerNb].points[tour].score;
						$scope.allPlayers[playerNb].points[tour].details.push({group:group, countries:realMatch[0].country + ' vs ' + realMatch[1].country,scorereel:realMatch[0].score + ' - ' + realMatch[1].score,score:match[0].score + ' - ' + match[1].score,points:$scope.allPlayers[playerNb].points[tour].result + $scope.allPlayers[playerNb].points[tour].score});
						} else {
							$scope.allPlayers[playerNb].points[tour].total = $scope.allPlayers[playerNb].points[tour].total + $scope.allPlayers[playerNb].points[tour].result + $scope.allPlayers[playerNb].points[tour].score;
							$scope.allPlayers[playerNb].points[tour].details.push({group:group, countries:realMatch[0].country + ' vs ' + realMatch[1].country + ' **KO',scorereel:realMatch[0].score + ' - ' + realMatch[1].score,score:match[0].score + ' - ' + match[1].score,points:$scope.allPlayers[playerNb].points[tour].result + $scope.allPlayers[playerNb].points[tour].score});
						}
					}
					matchNb++;
				});
			});

			// Recalcule du score total par joueur
			$scope.allPlayers[playerNb].totalpoints= $scope.allPlayers[playerNb].points.tour1.total + $scope.allPlayers[playerNb].points.tour2.total + $scope.allPlayers[playerNb].points.tour3.total;

		});
			//Descending Order:
			$scope.allPlayers = _.sortBy($scope.allPlayers, function(num){
				return num.totalpoints * -1;
			});
		
		}
	
}]);
