'use strict';

angular.module('worldProno2014App')
.controller('statisticCtrl', function ($scope, $http, userService, PronoFactory) {

	$scope.realProno = PronoFactory.get({id:'Mondial'},
    function(data) {
		console.log('realProno', data);
        if (data.length > 0) { // recupère les pronos du joueur
            $scope.groupsMatches = data[0].groupsMatches;
            $scope.secondStageMatches = data[0].secondStageMatches;
        }
    });

    $scope.allPlayers = PronoFactory.query(
    function(data) {
		console.log('allPlayers', data);
    });

});
