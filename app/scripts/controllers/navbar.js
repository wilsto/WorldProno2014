'use strict';

angular.module('worldProno2014App')
.controller('NavbarCtrl', ['$rootScope', '$scope', '$location', 'Auth', function($rootScope, $scope, $location, Auth) {

    new gnMenu( document.getElementById( 'gn-menu' ) );
    
        $('.gn-menu').find('a').click(function (e) {
             $('.gn-menu-wrapper').removeClass('gn-open-all' );
        });

        $('.gn-icon').click(function (e) {
             $('.gn-menu-wrapper').toggleClass('gn-open-all' );
        });

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

}]);
