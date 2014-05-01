'use strict';
angular.module('worldProno2014App', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'ui.router'
]).config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  '$httpProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    var access = routingConfig.accessLevels;
    // Public routes
    $stateProvider.state('public', {
      abstract: true,
      template: '<ui-view/>',
      data: { access: access.public }
    }).state('public.home', {
      url: '/',
      templateUrl: 'partials/main',
      controller: 'MainCtrl'
    }).state('public.404', {
      url: '/404/',
      templateUrl: 'partials/404'
    }).state('public.about', {
      url: '/about/',
      templateUrl: 'partials/about'
    }).state('public.worldcup', {
      url: '/worldcup/Mondial',
      templateUrl: 'partials/worldcup',
      controller: 'worldcupCtrl'
    }).state('public.login', {
      url: '/login/',
      templateUrl: 'partials/login',
      controller: 'LoginCtrl'
    }).state('public.register', {
      url: '/signup/',
      templateUrl: 'partials/signup',
      controller: 'RegisterCtrl'
    });
    // Regular user routes
    $stateProvider.state('user', {
      abstract: true,
      template: '<ui-view/>',
      data: { access: access.user }
    }).state('user.myprono', {
      url: '/worldcup/',
      templateUrl: 'partials/worldcup',
      controller: 'worldcupCtrl'
    }).state('user.statistic', {
      url: '/statistic/',
      templateUrl: 'partials/statistic',
      controller: 'StatisticCtrl'
    });
    // Admin routes
    $stateProvider.state('admin', {
      abstract: true,
      template: '<ui-view/>',
      data: { access: access.admin }
    });
    $urlRouterProvider.otherwise('/404');
    // FIX for trailing slashes. Gracefully "borrowed" from https://github.com/angular-ui/ui-router/issues/50
    $urlRouterProvider.rule(function ($injector, $location) {
      if ($location.protocol() === 'file') {
        return;
      }
      var path = $location.path(), search = $location.search(), params;
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
      angular.forEach(search, function (v, k) {
        params.push(k + '=' + v);
      });
      return path + '/?' + params.join('&');
    });
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push(function ($q, $location) {
      return {
        'responseError': function (response) {
          if (response.status === 401 || response.status === 403) {
            $location.path('/login');
          }
          return $q.reject(response);
        }
      };
    });
  }
]).run([
  '$rootScope',
  '$state',
  'Auth',
  function ($rootScope, $state, Auth) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      if (!Auth.authorize(toState.data.access)) {
        $rootScope.error = 'Seems like you tried accessing a route you don\'t have access to...';
        event.preventDefault();
        console.log('toState.data.access', toState.data.access);
        console.log('fromState.url', fromState.url);
        if (fromState.url === '^') {
          if (Auth.isLoggedIn()) {
            $state.go('user.home');
          } else {
            $rootScope.error = null;
            $state.go('public.login');
          }
        }
      }
    });
  }
]);
'use strict';
angular.module('worldProno2014App').controller('MainCtrl', [
  '$scope',
  '$http',
  function ($scope, $http) {
  }
]);
'use strict';
/*jshint -W069 */
/* JSHint: Surpress {variable} “is better written in dot notation.” */
angular.module('worldProno2014App').controller('worldcupCtrl', [
  '$scope',
  '$http',
  '$location',
  'PronoFactory',
  'Auth',
  function ($scope, $http, $location, PronoFactory, Auth) {
    Ladda.bind('.ladda-button', { timeout: 2000 });
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;
    $scope.isCollapsed = false;
    $scope.isNamed = true;
    $scope.rate = 0;
    $scope.max = 5;
    $scope.isReadonly = false;
    $scope.initPronos = function () {
      $http.get('/api/fifaMatchs').success(function (fifaMatchs) {
        $scope.fifaMatchs = fifaMatchs;
        $scope.groupsMatches = $scope.fifaMatchs.groupsMatches;
        $scope.secondStageMatches = $scope.fifaMatchs.secondStageMatches;
        $scope.standing = {
          A: [
            {
              country: 'A1',
              score: '',
              victorByPenalties: true
            },
            {
              country: 'A2',
              score: '',
              victorByPenalties: false
            }
          ],
          B: [
            {
              country: 'B1',
              score: '',
              victorByPenalties: true
            },
            {
              country: 'B2',
              score: '',
              victorByPenalties: false
            }
          ],
          C: [
            {
              country: 'C1',
              score: '',
              victorByPenalties: true
            },
            {
              country: 'C2',
              score: '',
              victorByPenalties: false
            }
          ],
          D: [
            {
              country: 'D1',
              score: '',
              victorByPenalties: true
            },
            {
              country: 'D2',
              score: '',
              victorByPenalties: false
            }
          ],
          E: [
            {
              country: 'E1',
              score: '',
              victorByPenalties: true
            },
            {
              country: 'E2',
              score: '',
              victorByPenalties: false
            }
          ],
          F: [
            {
              country: 'F1',
              score: '',
              victorByPenalties: true
            },
            {
              country: 'F2',
              score: '',
              victorByPenalties: false
            }
          ],
          G: [
            {
              country: 'G1',
              score: '',
              victorByPenalties: true
            },
            {
              country: 'G2',
              score: '',
              victorByPenalties: false
            }
          ],
          H: [
            {
              country: 'H1',
              score: '',
              victorByPenalties: true
            },
            {
              country: 'H2',
              score: '',
              victorByPenalties: false
            }
          ]
        };
        $scope.username = $location.path() === '/worldcup/Mondial' ? 'Mondial' : $scope.user.username;
        // recupère le nom de l'utilisateur
        $scope.mypronos = PronoFactory.get({ id: $scope.username }, function (data) {
          if (data.length > 0) {
            // recupère les pronos du joueur
            $scope.groupsMatches = $scope.mypronos[0].groupsMatches;
            $scope.secondStageMatches = $scope.mypronos[0].secondStageMatches;
          }
        });
      });
    };
    $scope.initPronos();
    $scope.$watch('groupsMatches.A.matches ', function () {
      calculateStandings();
    }, true);
    $scope.$watch('groupsMatches.B.matches ', function () {
      calculateStandings();
    }, true);
    $scope.$watch('groupsMatches.C.matches ', function () {
      calculateStandings();
    }, true);
    $scope.$watch('groupsMatches.D.matches ', function () {
      calculateStandings();
    }, true);
    $scope.$watch('groupsMatches.E.matches ', function () {
      calculateStandings();
    }, true);
    $scope.$watch('groupsMatches.F.matches ', function () {
      calculateStandings();
    }, true);
    $scope.$watch('groupsMatches.G.matches ', function () {
      calculateStandings();
    }, true);
    $scope.$watch('groupsMatches.H.matches ', function () {
      calculateStandings();
    }, true);
    /**
     * [Initialise les calculs]
     */
    function clearPoints() {
      _.each($scope.groupsMatches, function (groupData) {
        _.each(groupData.matches, function (match) {
          groupData.standing[match[0].country].total = 0;
          groupData.standing[match[1].country].total = 0;
          groupData.standing[match[0].country].matchNb = 0;
          groupData.standing[match[1].country].matchNb = 0;
          groupData.standing[match[0].country].win = 0;
          groupData.standing[match[1].country].win = 0;
          groupData.standing[match[0].country].nul = 0;
          groupData.standing[match[1].country].nul = 0;
          groupData.standing[match[0].country].lose = 0;
          groupData.standing[match[1].country].lose = 0;
          groupData.standing[match[0].country].pour = 0;
          groupData.standing[match[1].country].pour = 0;
          groupData.standing[match[0].country].contre = 0;
          groupData.standing[match[1].country].contre = 0;
        });
      });
    }
    /**
     * [calcul du nombre de points par groupe]
     */
    function calculateStandings() {
      clearPoints();
      if ($scope.groupsMatches) {
        _.each($scope.groupsMatches, function (groupData) {
          _.each(groupData.matches, function (match) {
            if (match[0].score.length === 0 || match[1].score.length === 0) {
              groupData.standing[match[0].country].total += 0;
              groupData.standing[match[1].country].total += 0;
            } else {
              groupData.standing[match[0].country].matchNb += 1;
              groupData.standing[match[1].country].matchNb += 1;
              groupData.standing[match[0].country].pour += parseInt(match[0].score);
              groupData.standing[match[1].country].pour += parseInt(match[1].score);
              groupData.standing[match[0].country].contre += parseInt(match[1].score);
              groupData.standing[match[1].country].contre += parseInt(match[0].score);
              if (match[0].score > match[1].score) {
                groupData.standing[match[0].country].total += 3;
                groupData.standing[match[0].country].win += 1;
                groupData.standing[match[1].country].lose += 1;
              } else if (match[0].score < match[1].score) {
                groupData.standing[match[1].country].total += 3;
                groupData.standing[match[1].country].win += 1;
                groupData.standing[match[0].country].lose += 1;
              } else {
                groupData.standing[match[0].country].total += 1;
                groupData.standing[match[1].country].total += 1;
                groupData.standing[match[0].country].nul += 1;
                groupData.standing[match[1].country].nul += 1;
              }
            }
          });
        });
        countriesThatPass();
      }
    }
    /**
     * [Calcule les pays qui passent les groupes]
     */
    function countriesThatPass() {
      _.each($scope.groupsMatches, function (groupData, group) {
        var countriesOrderedByPoints = _.sortBy(_.pairs(groupData.standing), function (pair) {
            return -pair[1].total;
          });
        if (countriesOrderedByPoints[0][1].matchNb === 3 && countriesOrderedByPoints[1][1].matchNb === 3 && countriesOrderedByPoints[2][1].matchNb === 3 && countriesOrderedByPoints[3][1].matchNb === 3) {
          $scope.standing[group][0]['country'] = countriesOrderedByPoints[0][0];
          $scope.standing[group][1]['country'] = countriesOrderedByPoints[1][0];
        }
      });
      $scope.secondStageMatches.roundOf16.A[0].country = $scope.standing.A[0].country;
      $scope.secondStageMatches.roundOf16.A[1].country = $scope.standing.B[1].country;
      $scope.secondStageMatches.roundOf16.B[0].country = $scope.standing.C[0].country;
      $scope.secondStageMatches.roundOf16.B[1].country = $scope.standing.D[1].country;
      $scope.secondStageMatches.roundOf16.C[0].country = $scope.standing.E[0].country;
      $scope.secondStageMatches.roundOf16.C[1].country = $scope.standing.F[1].country;
      $scope.secondStageMatches.roundOf16.D[0].country = $scope.standing.G[0].country;
      $scope.secondStageMatches.roundOf16.D[1].country = $scope.standing.H[1].country;
      $scope.secondStageMatches.roundOf16.E[0].country = $scope.standing.B[0].country;
      $scope.secondStageMatches.roundOf16.E[1].country = $scope.standing.A[1].country;
      $scope.secondStageMatches.roundOf16.F[0].country = $scope.standing.D[0].country;
      $scope.secondStageMatches.roundOf16.F[1].country = $scope.standing.C[1].country;
      $scope.secondStageMatches.roundOf16.G[0].country = $scope.standing.F[0].country;
      $scope.secondStageMatches.roundOf16.G[1].country = $scope.standing.E[1].country;
      $scope.secondStageMatches.roundOf16.H[0].country = $scope.standing.H[0].country;
      $scope.secondStageMatches.roundOf16.H[1].country = $scope.standing.G[1].country;
    }
    $scope.$watch('secondStageMatches.roundOf16', function () {
      //Calculate who passes to quarter finals
      var matchHolder = [];
      var concaTitle = '';
      if ($scope.groupsMatches) {
        _.each($scope.secondStageMatches.roundOf16, function (match, title) {
          if (match[0].score.length === 0 || match[1].score.length === 0) {
            matchHolder.push({
              country: '',
              score: '',
              victorByPenalties: true
            });
          } else {
            if (match[0].score > match[1].score) {
              matchHolder.push(_.clone(match[0]));
            } else if (match[0].score < match[1].score) {
              matchHolder.push(_.clone(match[1]));
            } else {
              _.each(match, function (country) {
                country.victorByPenalties ? matchHolder.push(_.clone(country)) : null;
              });
            }
          }
          concaTitle += title;
          if (matchHolder.length === 2) {
            $scope.secondStageMatches.quarterFinals[concaTitle][0]['country'] = matchHolder[0]['country'];
            $scope.secondStageMatches.quarterFinals[concaTitle][1]['country'] = matchHolder[1]['country'];
            matchHolder = [];
            concaTitle = '';
          }
        });
      }
    }, true);
    $scope.$watch('secondStageMatches.quarterFinals', function () {
      //Calculate who passes to quarter finals
      var matchHolder = [];
      var concaTitle = '';
      if ($scope.secondStageMatches) {
        _.each($scope.secondStageMatches.quarterFinals, function (match, title) {
          if (match[0].score.length === 0 || match[1].score.length === 0) {
            matchHolder.push({
              country: '',
              score: '',
              victorByPenalties: true
            });
          } else {
            if (match[0].score > match[1].score) {
              matchHolder.push(_.clone(match[0]));
            } else if (match[0].score < match[1].score) {
              matchHolder.push(_.clone(match[1]));
            } else {
              _.each(match, function (country) {
                country.victorByPenalties ? matchHolder.push(_.clone(country)) : null;
              });
            }
          }
          concaTitle += title;
          if (matchHolder.length === 2) {
            $scope.secondStageMatches.semiFinals[concaTitle][0]['country'] = matchHolder[0]['country'];
            $scope.secondStageMatches.semiFinals[concaTitle][1]['country'] = matchHolder[1]['country'];
            matchHolder = [];
            concaTitle = '';
          }
        });
      }
    }, true);
    $scope.$watch('secondStageMatches.semiFinals', function () {
      //Calculate who passes to quarter finals
      var matchHolder = [];
      var concaTitle = '';
      if ($scope.secondStageMatches) {
        _.each($scope.secondStageMatches.semiFinals, function (match, title) {
          if (match[0].score.length === 0 || match[1].score.length === 0) {
            matchHolder.push({
              country: '',
              score: '',
              victorByPenalties: true
            });
          } else {
            if (match[0].score > match[1].score) {
              matchHolder.push(_.clone(match[0]));
            } else if (match[0].score < match[1].score) {
              matchHolder.push(_.clone(match[1]));
            } else {
              _.each(match, function (country) {
                country.victorByPenalties ? matchHolder.push(_.clone(country)) : null;
              });
            }
          }
          concaTitle += title;
          if (matchHolder.length === 2) {
            $scope.secondStageMatches.final[concaTitle][0]['country'] = matchHolder[0]['country'];
            $scope.secondStageMatches.final[concaTitle][1]['country'] = matchHolder[1]['country'];
            matchHolder = [];
            concaTitle = '';
          }
        });
      }
    }, true);
    $scope.victorByPenalties = function (round, title, winnerIndex) {
      _.each($scope.secondStageMatches[round][title], function (country, index) {
        country.victorByPenalties = winnerIndex === index ? true : false;
      });
      console.log($scope.secondStageMatches[round][title]);
    };
    /**
     * [Sauvegarde les données]
     */
    $scope.savePronos = function () {
      $scope.pronosToSave = {};
      $scope.pronosToSave['userData'] = $scope.userData;
      $scope.pronosToSave['groupsMatches'] = $scope.groupsMatches;
      $scope.pronosToSave['secondStageMatches'] = $scope.secondStageMatches;
      $http.put('/REST/pronos/' + $scope.userData.userName, $scope.pronosToSave).success(function () {
      });
    };
  }
]);
'use strict';
'use strict';
angular.module('worldProno2014App').controller('profileCtrl', [
  '$scope',
  'User',
  'Auth',
  function ($scope, User, Auth) {
    $scope.errors = {};
  }
]);
'use strict';
angular.module('worldProno2014App').controller('SignupCtrl', [
  '$scope',
  '$location',
  'Auth',
  function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};
    $scope.register = function (form) {
      $scope.submitted = true;
      if (form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        }).then(function () {
          // Account created, redirect to home
          $location.path('/');
        }).catch(function (err) {
          err = err.data;
          $scope.errors = {};
          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function (error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };
  }
]);
'use strict';
angular.module('worldProno2014App').controller('SettingsCtrl', [
  '$scope',
  'User',
  'Auth',
  function ($scope, User, Auth) {
    $scope.errors = {};
    $scope.changePassword = function (form) {
      $scope.submitted = true;
      if (form.$valid) {
        Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword).then(function () {
          $scope.message = 'Password successfully changed.';
        }).catch(function () {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
        });
      }
    };
  }
]);
'use strict';
angular.module('worldProno2014App').directive('popOver', [
  '$compile',
  function ($compile) {
    var itemsTemplate = '<table  class="table table-responsive table-condensed table-small"><tr><td class="group">Grp</td><td class="group">Equipes</td><td class="group">Pts</td><td class="group">R\xe9el</td><td class="group">Prono</td></tr><tr ng-repeat="item in items" ng-class="{success:item.points,warning:item.points ===0}"><td>{{item.group}}</td><td>{{item.countries}}</td><td class="Pts">{{item.points}}</td><td>{{item.scorereel}}</td><td>{{item.score}}</td></tr></table>';
    var getTemplate = function (contentType) {
      var template = '';
      switch (contentType) {
      case 'items':
        template = itemsTemplate;
        break;
      }
      return template;
    };
    return {
      restrict: 'A',
      transclude: true,
      template: '<span ng-transclude></span>',
      link: function (scope, element) {
        var popOverContent;
        if (scope.items) {
          var html = getTemplate('items');
          popOverContent = $compile(html)(scope);
        }
        var options = {
            content: popOverContent,
            placement: 'right',
            html: true,
            title: scope.title
          };
        $(element).popover(options);
      },
      scope: {
        items: '=',
        title: '@'
      }
    };
  }
]).controller('StatisticCtrl', [
  '$scope',
  '$http',
  'PronoFactory',
  function ($scope, $http, PronoFactory) {
    var points = {
        result: 3,
        score: 1,
        qualif: 2,
        winner: 5
      };
    $scope.realProno = PronoFactory.get({ id: 'Mondial' }, function (data) {
      if (data.length > 0) {
        // recupère les pronos du joueur
        $scope.allPlayers = PronoFactory.query(function () {
          clearPoints();
          calculatePoints();
          //Descending Order:
          $scope.allPlayers = _.sortBy($scope.allPlayers, function (num) {
            return num.totalpoints * -1;
          });
          // attacher les popover
          $('[data-toggle="popover"]').popover();
        });
      }
    });
    /**
	 * [Initialise les calculs]
	 */
    function clearPoints() {
      _.each($scope.allPlayers, function (groupData) {
        groupData.points = {};
        groupData.totalpoints = 0;
        groupData.points.tour1 = {
          total: 0,
          result: 0,
          score: 0,
          details: []
        };
        groupData.points.tour2 = {
          total: 0,
          result: 0,
          score: 0,
          details: []
        };
        groupData.points.tour3 = {
          total: 0,
          result: 0,
          score: 0,
          details: []
        };
        groupData.points.qualif = {
          total: 0,
          details: []
        };
        groupData.points.roundOf16 = {
          total: 0,
          details: []
        };
        groupData.points.quarterFinals = {
          total: 0,
          details: []
        };
        groupData.points.semiFinals = {
          total: 0,
          details: []
        };
        groupData.points.Finals = {
          total: 0,
          details: []
        };
        groupData.points.winner = {
          total: 0,
          details: []
        };
      });
    }
    /**
	 * [Réalise les calculs]
	 */
    function calculatePoints() {
      _.each($scope.allPlayers, function (dataPlayer, playerNb) {
        // pour chaque joueur
        _.each(dataPlayer.groupsMatches, function (groupsMatches, group) {
          // pour chaque groupe
          var matchNb = 0;
          _.each(groupsMatches.matches, function (match) {
            // pour chaque match
            var realMatch = $scope.realProno[0].groupsMatches[group].matches[matchNb];
            if (realMatch[0].score.length === 0 || realMatch[1].score.length === 0) {
            } else {
              // details du numéro du tour
              var tour = '';
              switch (matchNb) {
              case 0:
              case 1:
                tour = 'tour1';
                break;
              case 2:
              case 3:
                tour = 'tour2';
                break;
              case 4:
              case 5:
                tour = 'tour3';
                break;
              }
              $scope.allPlayers[playerNb].points[tour].result = 0;
              $scope.allPlayers[playerNb].points[tour].score = 0;
              if (realMatch[0].score > realMatch[1].score) {
                if (match[0].score > match[1].score) {
                  $scope.allPlayers[playerNb].points[tour].result = points.result;
                  if (realMatch[0].score === match[0].score && realMatch[1].score === match[1].score) {
                    // si bon score
                    $scope.allPlayers[playerNb].points[tour].score = points.score;
                  }
                }
              } else if (realMatch[0].score < realMatch[1].score) {
                if (match[0].score < match[1].score) {
                  $scope.allPlayers[playerNb].points[tour].result = points.result;
                  if (realMatch[0].score === match[0].score && realMatch[1].score === match[1].score) {
                    // si bon score
                    $scope.allPlayers[playerNb].points[tour].score = points.score;
                  }
                }
              } else {
                if (match[0].score === match[1].score) {
                  $scope.allPlayers[playerNb].points[tour].result = points.result;
                  if (realMatch[0].score === match[0].score && realMatch[1].score === match[1].score) {
                    // si bon score
                    $scope.allPlayers[playerNb].points[tour].score = points.score;
                  }
                }
              }
              // details
              $scope.allPlayers[playerNb].points[tour].total = $scope.allPlayers[playerNb].points[tour].total + $scope.allPlayers[playerNb].points[tour].result + $scope.allPlayers[playerNb].points[tour].score;
              $scope.allPlayers[playerNb].points[tour].details.push({
                group: group,
                countries: realMatch[0].country + ' vs ' + realMatch[1].country,
                scorereel: realMatch[0].score + ' - ' + realMatch[1].score,
                score: match[0].score + ' - ' + match[1].score,
                points: $scope.allPlayers[playerNb].points[tour].result + $scope.allPlayers[playerNb].points[tour].score
              });
            }
            matchNb++;
          });
        });
        // Recalcule du score total par joueur
        $scope.allPlayers[playerNb].totalpoints = $scope.allPlayers[playerNb].points.tour1.total + $scope.allPlayers[playerNb].points.tour2.total + $scope.allPlayers[playerNb].points.tour3.total;
      });
    }
  }
]);
'use strict';
angular.module('worldProno2014App').factory('PronoFactory', [
  '$resource',
  function ($resource) {
    var Prono = $resource('/REST/pronos/:id', { id: '@id' }, {
        'get': {
          method: 'GET',
          isArray: true
        }
      });
    return Prono;
  }
]);
'use strict';
/*jshint bitwise: false*/
(function (exports) {
  var config = {
      roles: [
        'public',
        'user',
        'admin'
      ],
      accessLevels: {
        'public': '*',
        'anon': ['public'],
        'user': [
          'user',
          'admin'
        ],
        'admin': ['admin']
      }
    };
  /*
        Method to build a distinct bit mask for each role
        It starts off with '1' and shifts the bit to the left for each element in the
        roles array parameter
     */
  function buildRoles(roles) {
    var bitMask = '01';
    var userRoles = {};
    for (var role in roles) {
      var intCode = parseInt(bitMask, 2);
      userRoles[roles[role]] = {
        bitMask: intCode,
        title: roles[role]
      };
      bitMask = (intCode << 1).toString(2);
    }
    return userRoles;
  }
  /*
    This method builds access level bit masks based on the accessLevelDeclaration parameter which must
    contain an array for each access level containing the allowed user roles.
     */
  function buildAccessLevels(accessLevelDeclarations, userRoles) {
    var accessLevels = {};
    var resultBitMask;
    var role;
    for (var level in accessLevelDeclarations) {
      if (typeof accessLevelDeclarations[level] === 'string') {
        if (accessLevelDeclarations[level] === '*') {
          resultBitMask = '';
          for (role in userRoles) {
            resultBitMask += '1';
          }
          //accessLevels[level] = parseInt(resultBitMask, 2);
          accessLevels[level] = { bitMask: parseInt(resultBitMask, 2) };
        } else {
          console.log('Access Control Error: Could not parse \'' + accessLevelDeclarations[level] + '\' as access definition for level \'' + level + '\'');
        }
      } else {
        resultBitMask = 0;
        for (role in accessLevelDeclarations[level]) {
          if (userRoles.hasOwnProperty(accessLevelDeclarations[level][role])) {
            resultBitMask = resultBitMask | userRoles[accessLevelDeclarations[level][role]].bitMask;
          } else {
            console.log('Access Control Error: Could not find role \'' + accessLevelDeclarations[level][role] + '\' in registered roles while building access for \'' + level + '\'');
          }
        }
        accessLevels[level] = { bitMask: resultBitMask };
      }
    }
    return accessLevels;
  }
  exports.userRoles = buildRoles(config.roles);
  exports.accessLevels = buildAccessLevels(config.accessLevels, exports.userRoles);
}(typeof exports === 'undefined' ? this.routingConfig = {} : exports));
'use strict';
/*jshint bitwise: false*/
angular.module('worldProno2014App').factory('Auth', [
  '$http',
  '$cookieStore',
  function ($http, $cookieStore) {
    var accessLevels = routingConfig.accessLevels, userRoles = routingConfig.userRoles, currentUser = $cookieStore.get('user') || {
        username: '',
        role: userRoles.public
      };
    $cookieStore.remove('user');
    function changeUser(user) {
      angular.extend(currentUser, user);
    }
    return {
      authorize: function (accessLevel, role) {
        if (role === undefined) {
          role = currentUser.role;
        }
        return accessLevel.bitMask & role.bitMask;
      },
      isLoggedIn: function (user) {
        //if(user === undefined) {
        user = currentUser;
        //}
        return user.role.title === userRoles.user.title || user.role.title === userRoles.admin.title;
      },
      register: function (user, success, error) {
        $http.post('/register', user).success(function (res) {
          changeUser(res);
          success();
        }).error(error);
      },
      login: function (user, success, error) {
        $http.post('/login', user).success(function (user) {
          changeUser(user);
          success(user);
        }).error(error);
      },
      logout: function (success, error) {
        $http.post('/logout').success(function () {
          changeUser({
            username: '',
            role: userRoles.public
          });
          success();
        }).error(error);
      },
      accessLevels: accessLevels,
      userRoles: userRoles,
      user: currentUser
    };
  }
]);
angular.module('worldProno2014App').factory('Users', [
  '$http',
  function ($http) {
    return {
      getAll: function (success, error) {
        $http.get('/users').success(success).error(error);
      }
    };
  }
]);
'use strict';
/* Controllers */
angular.module('worldProno2014App').controller('NavbarCtrl', [
  '$rootScope',
  '$scope',
  '$location',
  'Auth',
  function ($rootScope, $scope, $location, Auth) {
    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;
    $scope.logout = function () {
      Auth.logout(function () {
        $location.path('/login');
      }, function () {
        $rootScope.error = 'Failed to logout';
      });
    };
    $scope.isLoggedIn = function () {
      Auth.isLoggedIn(function () {
      }, function () {
        $rootScope.error = 'Failed to logout';
      });
    };
  }
]);
angular.module('worldProno2014App').controller('LoginCtrl', [
  '$rootScope',
  '$scope',
  '$location',
  '$window',
  'Auth',
  function ($rootScope, $scope, $location, $window, Auth) {
    $scope.rememberme = true;
    $scope.login = function () {
      Auth.login({
        username: $scope.username,
        password: $scope.password,
        rememberme: $scope.rememberme
      }, function () {
        $location.path('/');
      }, function () {
        $rootScope.error = 'Failed to login';
      });
    };
    $scope.loginOauth = function (provider) {
      $window.location.href = '/auth/' + provider;
    };
  }
]);
angular.module('worldProno2014App').controller('RegisterCtrl', [
  '$rootScope',
  '$scope',
  '$location',
  'Auth',
  function ($rootScope, $scope, $location, Auth) {
    $scope.role = Auth.userRoles.user;
    $scope.userRoles = Auth.userRoles;
    $scope.register = function () {
      Auth.register({
        username: $scope.username,
        password: $scope.password,
        role: $scope.role
      }, function () {
        $location.path('/');
      }, function (err) {
        $rootScope.error = err;
      });
    };
  }
]);
angular.module('worldProno2014App').controller('AdminCtrl', [
  '$rootScope',
  '$scope',
  'Users',
  'Auth',
  function ($rootScope, $scope, Users, Auth) {
    $scope.loading = true;
    $scope.userRoles = Auth.userRoles;
    Users.getAll(function (res) {
      $scope.users = res;
      $scope.loading = false;
    }, function () {
      $rootScope.error = 'Failed to fetch users.';
      $scope.loading = false;
    });
  }
]);
'use strict';
angular.module('worldProno2014App').directive('accessLevel', [
  'Auth',
  function (Auth) {
    return {
      restrict: 'A',
      link: function ($scope, element, attrs) {
        var prevDisp = element.css('display'), userRole, accessLevel;
        $scope.user = Auth.user;
        $scope.$watch('user', function (user) {
          if (user.role) {
            userRole = user.role;
          }
          updateCSS();
        }, true);
        attrs.$observe('accessLevel', function (al) {
          if (al) {
            accessLevel = $scope.$eval(al);
          }
          updateCSS();
        });
        function updateCSS() {
          if (userRole && accessLevel) {
            if (!Auth.authorize(accessLevel, userRole)) {
              element.css('display', 'none');
            } else {
              element.css('display', prevDisp);
            }
          }
        }
      }
    };
  }
]);
angular.module('worldProno2014App').directive('activeNav', [
  '$location',
  function ($location) {
    function normalizeUrl(url) {
      if (url[url.length - 1] !== '/') {
        url = url + '/';
      }
      return url;
    }
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        var anchor = element[0];
        if (element[0].tagName.toUpperCase() !== 'A') {
          anchor = element.find('a')[0];
        }
        var path = anchor.href;
        scope.location = $location;
        scope.$watch('location.absUrl()', function (newPath) {
          path = normalizeUrl(path);
          newPath = normalizeUrl(newPath);
          if (path === newPath || attrs.activeNav === 'nestedTop' && newPath.indexOf(path) === 0) {
            element.addClass('active');
          } else {
            element.removeClass('active');
          }
        });
      }
    };
  }
]);