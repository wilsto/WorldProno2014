'use strict';

/* Controllers */

angular.module('worldProno2014App')
.controller('NavbarCtrl', ['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;

    $scope.logout = function() {
        Auth.logout(function() {
            $location.path('/login');
        }, function() {
            $rootScope.error = 'Failed to logout';
        });
    };

    $scope.isLoggedIn = function() {
        Auth.isLoggedIn(function() {

        }, function() {
            $rootScope.error = 'Failed to logout';
        });
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.reset = function() {
      bootbox.confirm('Etes-vous sur de vouloir ré-initialiser votre pronostic ?', function(result) {
          if(result) {
            $scope.resetPronos();
          }
      });
    };

}]);

angular.module('worldProno2014App')
.controller('LoginCtrl',
['$rootScope', '$scope', '$location', '$window', 'Auth', function($rootScope, $scope, $location, $window, Auth) {

    $scope.rememberme = true;
    $scope.login = function() {
        Auth.login({
                username: $scope.username,
                password: $scope.password,
                rememberme: $scope.rememberme
            },
            function() {
                $location.path('/');
            },
            function() {
                $rootScope.error = 'Failed to login';
            });
    };

    $scope.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
    };
}]);


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

