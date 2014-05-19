'use strict';

angular.module('worldProno2014App')
.directive('accessLevel', ['Auth', function(Auth) {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
            var prevDisp = element.css('display')
                , userRole
                , accessLevel;

            $scope.user = Auth.user;
            $scope.$watch('user', function(user) {
                if(user.role) {
                    userRole = user.role;
                }
                updateCSS();
            }, true);

            attrs.$observe('accessLevel', function(al) {
                if(al) {
                    accessLevel = $scope.$eval(al);
                }
                updateCSS();
            });

            function updateCSS() {
                if(userRole && accessLevel) {
                    if(!Auth.authorize(accessLevel, userRole)){
                        element.css('display', 'none');
                    }
                    else {
                        element.css('display', prevDisp);
                    }
                }
            }
        }
    };
}]);

angular.module('worldProno2014App')
.directive('ngRaty',['Auth', function(Auth) {
  return{
    restrict: 'A',
    scope: {
      ngRaty: '=',
      ngModel: '=',
      mouseOver: '&',
      mouseOut: '&'
    },
    link: function ($scope, $element, $attrs) {
      function safeApply(fn) {
        var phase = $scope.$root.$$phase;
        if(phase === '$apply' || phase === '$digest') {
          if(fn && (typeof(fn) === 'function')) {
            fn();
          }
        } else {
          $scope.$apply(fn);
        }
      }

      var rating  = $scope.ngModel;
      var raty    = {
        score: parseFloat(rating, 10),
        click: function(stars, evt){
          evt.stopPropagation();
          if(!stars) { stars = 0;}
          safeApply(function(){
            $scope.ngModel = parseFloat(stars);
          });
        },
        mouseover: function(stars, evt) {
          if(!$scope.mouseOver) {return;}
          safeApply(function(){
            $scope.mouseOver({stars: stars, e: evt});
          });
        },
        mouseout: function(stars, evt) {
          if(!$scope.mouseOut) {return;}
          safeApply(function(){
            $scope.mouseOut({stars: stars, e: evt});
          });
        }
      };
      var options = angular.extend(raty, $scope.ngRaty || {});
      $element.raty(options);

      // Set view to score if model changes
      $scope.$watch('ngModel', function(newValue, oldValue){
        $element.raty('score', $scope.ngModel);
      });

      function destroy(){
        $element.raty('destroy');
      }
      $element.bind('$destroy', destroy);
    }
  };
}]);


angular.module('worldProno2014App')
.directive('activeNav', ['$location', function($location) {

    function normalizeUrl(url) {
        if(url[url.length - 1] !== '/') {
            url = url + '/';
        }
        return url;
    }
    
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var anchor = element[0];
            if(element[0].tagName.toUpperCase() !== 'A'){
                anchor = element.find('a')[0];
            }
            var path = anchor.href;

            scope.location = $location;
            scope.$watch('location.absUrl()', function(newPath) {
                path = normalizeUrl(path);
                newPath = normalizeUrl(newPath);

                if(path === newPath ||
                    (attrs.activeNav === 'nestedTop' && newPath.indexOf(path) === 0)) {
                    element.addClass('active');
                } else {
                    element.removeClass('active');
                }
            });
        }

    };


}]);