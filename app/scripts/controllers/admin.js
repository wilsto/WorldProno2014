'use strict';

angular.module('worldProno2014App')
.controller('AdminCtrl',
['$rootScope', '$scope', 'Users', 'Auth', function($rootScope, $scope, Users, Auth) {
    $scope.loading = true;
    $scope.userRoles = Auth.userRoles;

    Users.getAll(function(res) {
        $scope.users = res;
        $scope.loading = false;
    }, function() {
        $rootScope.error = 'Failed to fetch users.';
        $scope.loading = false;
    });

}]);