'use strict';

// angular.module('worldProno2014App')
//   .controller('SignupCtrl', ['$scope','$location',  'Auth', function ($scope, Auth, $location) {
//     $scope.user = {};
//     $scope.errors = {};

//     $scope.register = function(form) {
//       $scope.submitted = true;
  
//       if(form.$valid) {
//         Auth.createUser({
//           name: $scope.user.name,
//           email: $scope.user.email,
//           password: $scope.user.password
//         })
//         .then( function() {
//           // Account created, redirect to home
//           $location.path('/');
//         })
//         .catch( function(err) {
//           err = err.data;
//           $scope.errors = {};

//           // Update validity of form fields that match the mongoose errors
//           angular.forEach(err.errors, function(error, field) {
//             form[field].$setValidity('mongoose', false);
//             $scope.errors[field] = error.message;
//           });
//         });
//       }
//     };
//   }]);

angular.module('worldProno2014App')
.controller('RegisterCtrl',
['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {
    $scope.role = Auth.userRoles.user;
    $scope.userRoles = Auth.userRoles;

    $scope.register = function() {
        Auth.register({
                username: $scope.username,
                email: $scope.email,
                password: $scope.password,
                role: $scope.role
            },
            function() {
                $location.path('/');
            },
            function(err) {
                $rootScope.error = err;
            });
    };
}]);