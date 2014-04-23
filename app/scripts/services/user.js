'use strict';

angular.module('worldProno2014App')
  .factory('User', function ($resource) {
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
  .service('userService', function() {
        //Variable privée
        var userData = {
            firstName: 'Will',
            userName: 'Will'
        };
 
        //Getter pour la variable userData
        this.getUserData = function() {
            return userData;
        };

    }
);
