'use strict';

angular.module('worldProno2014App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/worldcup', {
        templateUrl: 'partials/worldcup',
        controller: 'worldcupCtrl'
      })
      .when('/pronostic', {
        templateUrl: 'partials/pronostic',
        controller: 'pronosticCtrl'
      })
      .when('/statistic', {
        templateUrl: 'partials/statistic',
        controller: 'statisticCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
  });