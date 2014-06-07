'use strict';

angular.module('worldProno2014App')
.controller('NavbarCtrl', ['$rootScope', '$scope', '$location', 'Auth', '$http', function($rootScope, $scope, $location, Auth, $http) {

    new gnMenu( document.getElementById( 'gn-menu' ) );
    
        $('.gn-menu').find('a').click(function (e) {
             $('.gn-menu-wrapper').removeClass('gn-open-all' );
        });

        $('.gn-icon-menu').click(function (e) {
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


    $scope.newPost = function() {
        bootbox.confirm('Titre:<input type="text" class="form-control" id="postTitle"></input><br/>Image:<input type="text" placeholder="http://" class="form-control" id="postImage"></input><br/>Texte:<textarea  rows="5" class="form-control" id="postText"></textarea><br/>', function(result) {
            if(result) {
                $http.post('/REST/posts/', {postTitle:$('#postTitle').val(), postImage:$('#postImage').val(),postText:$('#postText').val()}).success(function() {

                });
          }
      });
    };



}]);
