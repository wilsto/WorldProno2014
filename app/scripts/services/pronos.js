'use strict';

angular.module('worldProno2014App')
  .factory('pronoFactory', ['$resource',
    function($resource){
      return $resource('/REST/pronos/:id', {id:'@id'},  {'get': { method: 'GET', isArray: true }});
    }]
  );

