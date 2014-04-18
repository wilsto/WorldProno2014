'use strict';

angular.module('worldProno2014App')
.controller('MainCtrl', function ($scope, $http) {

	$http.get('/api/awesomeThings').success(function(awesomeThings) {
		$scope.awesomeThings = awesomeThings;
	});

});
