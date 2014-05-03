'use strict';

angular.module('worldProno2014App')
  .controller('ProfileCtrl', ['$scope', 'Auth', function ($scope, Auth) {
    $scope.errors = {};
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;

  }]);
