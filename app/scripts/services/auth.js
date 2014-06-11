'use strict';
/*jshint bitwise: false*/

angular.module('worldProno2014App')
.factory('Auth', ['$http', '$rootScope', '$cookieStore',  'User', function($http, $rootScope, $cookieStore, User ){

    var accessLevels = routingConfig.accessLevels
        , userRoles = routingConfig.userRoles
        , currentUser = $cookieStore.get('user') || { username: '', role: userRoles.public };

    $cookieStore.remove('user');

    function changeUser(user) {
        angular.extend(currentUser, user);
    }

    return {
        authorize: function(accessLevel, role) {
            if(role === undefined) {
                role = currentUser.role;
            }
            return accessLevel.bitMask & role.bitMask;
        },
        isLoggedIn: function(user) {
            //if(user === undefined) {
                user = currentUser;
            //}
            return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
        },
        register: function(user, success, error) {
            $http.post('/register', user).success(function(res) {
                changeUser(res);
                 success();
            }).error(error);
        },
      /**
       * Create a new user
       * 
       * @param  {Object}   user     - user info
       * @param  {Function} callback - optional
       * @return {Promise}            
       */
      createUser: function(user, callback) {
        var cb = callback || angular.noop;

        return User.save(user,
          function(user) {
            $rootScope.currentUser = user;
            changeUser(user);
            return cb(user);
          },
          function(err) {
            return cb(err);
          }).$promise;
      },

        login: function(user, success, error) {
            $http.post('/login', user)
                .success(function(user){
                    changeUser(user);
                    success(user);
                })
                .error(error);
        },
        logout: function(success, error) {
            $http.post('/logout')
                .success(function(){
                    changeUser({
                        username: '',
                        role: userRoles.public
                    });
                    success();
                })
                .error(error);
        },
        accessLevels: accessLevels,
        userRoles: userRoles,
        user: currentUser
    };
}]);