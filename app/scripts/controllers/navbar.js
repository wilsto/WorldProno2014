'use strict';

angular.module('worldProno2014App')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Accueil',
      'link': '/'
    },{
      'title': 'Coupe du monde',
      'link': '/worldcup'
    },{
      'title': 'Pronostics',
      'link': '/pronostic'
    },{
      'title': 'Statistiques',
      'link': '/statitic'
    }
    ];
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
