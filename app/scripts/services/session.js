'use strict';

angular.module('worldProno2014App')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
