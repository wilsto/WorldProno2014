'use strict';

angular.module('worldProno2014App')
	.controller('TeamCtrl', ['$scope', 'Auth', '$http', '$resource', '$filter', function ($scope, Auth, $http, $resource, $filter) {

		Ladda.bind( '.ladda-button', { timeout: 2000 } );

		$http.get('/REST/userGroup/').success(function(alltags) {
	        $scope.alltags =alltags;
	    });

		$scope.errors = {};
		/*$scope.user = Auth.user;*/
		$scope.userRoles = Auth.userRoles;

$scope.searchText="*";
	$scope.loadUser = function() {

		$http.get('/users').success(function (data) {
				$scope.users = data;
				$scope.loading = false;
		});
	};
	$scope.loadUser();


		$http.get('/REST/userGroup/').success(function(alltags) {
	        $scope.alltags =alltags;
	    });

	$scope.FilterGrp = function(group) {
		$scope.searchText=group.text;

	};	


}]);
