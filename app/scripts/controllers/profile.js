'use strict';

angular.module('worldProno2014App')
	.controller('ProfileCtrl', ['$scope', 'Auth', '$http', '$resource',function ($scope, Auth, $http, $resource) {

		var alltags = $resource('/REST/userGroup');

		Ladda.bind( '.ladda-button', { timeout: 2000 } );

		$scope.errors = {};
		$scope.user = Auth.user;
		$scope.userRoles = Auth.userRoles;
		$scope.accessLevels = Auth.accessLevels;

		var userGroup =  $resource('/REST/userGroups/' + $scope.user.username);
		$scope.tags = userGroup.query();

		$scope.loadTags = function(query) {
			return alltags.query().$promise;
		};

		/**
		 * [Sauvegarde les données]
		 */
		 $scope.saveGroup = function(){
				$http.put('/REST/userGroup/' + $scope.user.username, $scope.tags).success(function() {
				});
		};

	}]);
