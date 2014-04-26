'use strict';

angular.module('worldProno2014App')
  .controller('LoginCtrl', function ($scope, $http, $window, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;
    
    $http
      .post('/signin', $scope.user)
      .success(function (data, status, headers, config) {
        $window.sessionStorage.token = data.token;
        $scope.message =  data.name;
      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        delete $window.sessionStorage.token;

        // Handle login errors here
        $scope.errors.other = 'Erreur: Nom du joueur ou  mot de passe invalide';
      });
    };
  });