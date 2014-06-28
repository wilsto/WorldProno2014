'use strict';

var app = angular.module('worldProno2014App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  //'ngRoute',
  'ui.bootstrap',
  'ngTagsInput',
  'infinite-scroll',
  'dangle',
  'ui.router'
])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    var access = routingConfig.accessLevels;

    // Public routes
    $stateProvider
        .state('public', {
            abstract: true,
            template: '<ui-view/>',
            data: {
              access: access.public
            }
        })
        .state('public.home', {
            url: '/',
            templateUrl: 'partials/main',
            controller: 'MainCtrl'
        })
        .state('public.404', {
            url: '/404/',
            templateUrl: 'partials/404'
        })
        .state('public.about', {
            url: '/about/',
            templateUrl: 'partials/about'
        })
        .state('public.rules', {
            url: '/rules/',
            templateUrl: 'partials/rules'
        })
        .state('public.worldcup', {
            url: '/worldcup/Mondial',
            templateUrl: 'partials/worldcup',
            controller: 'worldcupCtrl'
        })    
        .state('public.login', {
            url: '/login/',
            templateUrl: 'partials/login',
            controller: 'LoginCtrl'
        })
        .state('public.register', {
            url: '/signup/',
            templateUrl: 'partials/signup',
            controller: 'RegisterCtrl'
        })
        .state('public.statistic', {
            url: '/statistic/',
            templateUrl: 'partials/statistic',
            controller: 'StatisticCtrl'
        });

    // Regular user routes
    $stateProvider
        .state('user', {
            abstract: true,
            template: '<ui-view/>',
            data: {
                access: access.user
            }
        })
        .state('user.myprono', {
            url: '/worldcup/',
            templateUrl: 'partials/worldcup',
            controller: 'worldcupCtrl'
        })
        .state('user.userprono', {
            url: '/worldcup/:userId',
            templateUrl: 'partials/worldcup',
            controller: 'worldcupCtrl'
        })
        .state('user.team', {
            url: '/team/',
            templateUrl: 'partials/team',
            controller: 'TeamCtrl'
        })          
        .state('user.profile', {
            url: '/profile/',
            templateUrl: 'partials/profile',
            controller: 'ProfileCtrl'
        });

    // Admin routes
    $stateProvider
        .state('admin', {
            abstract: true,
            template: '<ui-view/>',
            data: {
                access: access.admin
            }
        })
        .state('admin.panel', {
            url: '/admin/',
            templateUrl: 'partials/admin',
            controller: 'AdminCtrl'
        });


    $urlRouterProvider.otherwise('/404');

    // FIX for trailing slashes. Gracefully "borrowed" from https://github.com/angular-ui/ui-router/issues/50
    $urlRouterProvider.rule(function($injector, $location) {
        if($location.protocol() === 'file') {
            return;
        }

        var path = $location.path()
        // Note: misnomer. This returns a query object, not a search string
            , search = $location.search()
            , params
            ;

        // check to see if the path already ends in '/'
        if (path[path.length - 1] === '/') {
            return;
        }

        // If there was no search string / query params, return with a `/`
        if (Object.keys(search).length === 0) {
            return path + '/';
        }

        // Otherwise build the search string and return a `/?` prefix
        params = [];
        angular.forEach(search, function(v, k){
            params.push(k + '=' + v);
        });
        return path + '/?' + params.join('&');
    });

    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push(function($q, $location) {
        return {
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    });

}])

.run(['$rootScope', '$state', 'Auth', function ($rootScope, $state, Auth) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        if (!Auth.authorize(toState.data.access)) {
            $rootScope.error = 'Seems like you tried accessing a route you don\'t have access to...';
            event.preventDefault();
            if(fromState.url === '^') {
                if(Auth.isLoggedIn()) {
                    $state.go('public.home');
                } else {
                    $rootScope.error = null;
                    $state.go('public.login');
                }
            }
        }
    });

}]);
