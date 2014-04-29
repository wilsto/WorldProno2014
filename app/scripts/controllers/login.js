'use strict';

angular.module('worldProno2014App')
  .controller('LoginCtrl', function ($scope, $http, $window, $location, userService) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function() {
      $scope.submitted = true;
      $http
        .post('/signin', $scope.user)
        .success(function (data, status, headers, config) {
            // succefull login
            userService.updateUserData({isLogged:true, userName: data.name});

        })
        .error(function (data, status, headers, config) {
          // Erase the token if the user fails to log in
          delete $window.sessionStorage.token;
          userService.updateUserData({isLogged:false, userName: ''});

          // Handle login errors here
          $scope.errors.other = 'Erreur: Nom du joueur ou  mot de passe invalide';
        });
      };
  });