'use strict';

angular.module('worldProno2014App')
  .factory('PronoFactory', ['$resource',
    function($resource){
      var Prono = $resource('/REST/pronos/:id', {id:'@id'},  {'get': { method: 'GET' , isArray: true}});
      return Prono;
    }]
  );

