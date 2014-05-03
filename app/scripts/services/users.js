'use strict';
/*jshint bitwise: false*/

angular.module('worldProno2014App')
.factory('Users', function($http) {
    return {
        getAll: function(success, error) {
            $http.get('/users').success(success).error(error);
        }
    };
});