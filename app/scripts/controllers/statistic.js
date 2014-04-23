'use strict';

angular.module('worldProno2014App')
.controller('statisticCtrl', function ($scope, $http) {

	$http.get('/api/awesomeThings').success(function(awesomeThings) {
		$scope.awesomeThings = awesomeThings;
	});

});
