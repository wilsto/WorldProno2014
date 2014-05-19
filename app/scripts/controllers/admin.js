'use strict';

angular.module('worldProno2014App')
.controller('AdminCtrl', ['$scope', '$http', 'Auth', function($scope, $http, Auth) {
    $scope.loading = true;
    $scope.userRoles = Auth.userRoles;

    $http.get('/users').success(function (data) {
        $scope.users = data;
        $scope.loading = false;
	});

}]);