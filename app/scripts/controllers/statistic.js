'use strict';

angular.module('worldProno2014App')


.filter('offset', function() {
	return function(input, start) {
		start = parseInt(start, 10);
		return input.slice(start);
	};
})

.controller('StatisticCtrl', ['$scope', '$http', 'PronoFactory', 'Auth', '$resource', '$q', '$filter', function ($scope, $http, PronoFactory, Auth, $resource, $q, $filter) {

	$http.get('/REST/userGroup/').success(function(alltags) {
        $scope.alltags =alltags;
    });
 	$scope.items = [];
	$scope.totalDisplayed = 20;

	$scope.loadMore = function () {
	  $scope.totalDisplayed += 20;  
	};

	$scope.popover = {
	  "title": "Please Wait",
	  "content": "Chargement en cours"
	};

	$scope.loadItems = function ($event, user, tour) {
		$scope.popover = {
			"title": "Please Wait",
			"content": "Chargement en cours"
		};
	  	$http.get('/REST/pointsDetails/' + user + '/' + tour).success(function(allDetails) {
	        $scope.itemsDetails =allDetails;
			$scope.popover.title = "Détails " + tour;
			var popOverContent = '<table class="table table-responsive table-condensed table-small"><tr><td class="group">Grp</td><td class="group">Equipes</td><td class="group">Pts</td><td class="group">Réel</td><td class="group">Prono</td></tr>';
			_.each($scope.itemsDetails, function(item){
				var trClass;
				if (item.points === 0) {trClass = 'warning'} else {trClass ='success'};
				popOverContent += '<tr class="'+trClass+'"><td>' + item.group + '</td><td>' + item.countries + '</td><td class="Pts">' + item.points + '</td><td>' + item.scorereel + '</td><td>' + item.score + '</td></tr>'})
			popOverContent += '</table>';
			$scope.popover.content = popOverContent;
	    });
	};

	$scope.loadTags = function(query) {
	    var deferred = $q.defer();
	    deferred.resolve($filter('filter')($scope.alltags, query));
	    return deferred.promise;
	};

	$scope.user = Auth.user;
	$scope.userRoles = Auth.userRoles;
	$scope.accessLevels = Auth.accessLevels;
	$scope.lstRole = '';

	$scope.realProno = PronoFactory.get({id:'Mondial'},
		function(data) {
			if (data.length > 0) { // recupère les pronos du joueur

				$http.get('/REST/pronos/').success(function(allpronos) {
						$scope.allPlayers = allpronos;
						$scope.predicate = 'totalpoints';
						$scope.reverse=true;

						clearPoints();

						// attacher les popover
						$('[data-toggle="popover"]').popover();
			    });
			}
	});

	$scope.filterRole = function(allPlayers,myfilter) {
			var result = {};
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
			var array = $.map(result, function(value, index) {
			    return [value];
			});
			return array;
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
			$http.get('/users').success(function(users) {
				_.each($scope.allPlayers, function(player){
					var userInfo = _.findWhere(users, {username : player.userData.username});
					if (userInfo !== undefined) {
						player.userData.groups = userInfo.groups;
						player.userData.avatarUrl =  userInfo.avatarUrl;
						player.userData.pseudo =  userInfo.pseudo;
						player.userData.role.title =  userInfo.role.title;
					}
				});
			});
	}

}]);
