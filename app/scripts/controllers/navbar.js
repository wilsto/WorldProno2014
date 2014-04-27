'use strict';

angular.module('worldProno2014App')
  .controller('NavbarCtrl2', function ($scope, $location, userService) {
    

    $scope.service = userService;
    $scope.$watch('service.getUserData()', function(userData){
        $scope.userData = userData;    // recupère le nom de l'utilisateur
    }, true);

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.updateUser = function(data) {
      userService.updateUserData({firstName: data,userName: data});
    };


    $scope.reset = function() {
      bootbox.confirm('Etes-vous sur de vouloir ré-initialiser votre pronostic ?', function(result) {
          if(result) {
            $scope.resetPronos();
          }
      });
    };
  });
