'use strict';

angular.module('worldProno2014App')
  .factory('User', function ($resource, $http) {
    return $resource('/api/users/:id', {
      id: '@id'
    }, { //parameters default
      update: {
        method: 'PUT',
        params: {}
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  })
  .service('userService', function($http) {

                var userData = {
                    isLogged: false,
                    userName: 'Player2'
                };


        this.getUserData = function() {
            return userData;
        };

        this.updateUserData = function(data) {
            userData = data;
        };

        this.isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);
            }
        };
    }
);
