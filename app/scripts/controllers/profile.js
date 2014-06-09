'use strict';

angular.module('worldProno2014App')
	.controller('ProfileCtrl', ['$scope', 'Auth', '$http', '$resource',function ($scope, Auth, $http, $resource) {

		var alltags = $resource('/REST/userGroup');

		Ladda.bind( '.ladda-button', { timeout: 2000 } );

		$scope.errors = {};
		$scope.user = Auth.user;
		$scope.userRoles = Auth.userRoles;
		$scope.accessLevels = Auth.accessLevels;

		$scope.loadUser = function() {
			$http.get('/REST/userInfo/' + $scope.user.username).success(function(user) {
				
				$scope.player = user;
				$scope.myname = user.myname;
				$scope.userPaid = user.paid;
				$scope.tags = user.groups;
				$scope.avatarUrl =  user.avatarUrl;

			});
		};
		$scope.loadUser();


		var userPaid =  $resource('/REST/userPaid/' + $scope.user.username);
		$scope.userPaid = userPaid.query().paid;

		$scope.loadTags = function(query) {
			return alltags.query().$promise;
		};

		 $scope.changePhoto = function(){
			bootbox.confirm('Avatar URL:<input type="text" class="form-control" id="avatarUrl" placeholder="http://" name="avatarUrl"></input>', function(result) {
		        if(result) {
		            $scope.avatarUrl = $('#avatarUrl').val();
		            $http.put('/REST/userPhoto/' + $scope.user.username, {avatarUrl : $scope.avatarUrl}).success(function() {
						$scope.loadUser();
					});
		        }
			});
		};

		$scope.changeLien = function(){
			bootbox.confirm('New Username:<input type="text" class="form-control" id="newuser" placeholder="type new username" name="newuser"></input>', function(result) {
		        if(result) {
		            $scope.newuser = $('#newuser').val();
		            $http.put('/REST/userUN/' + $scope.user.username, {username : $scope.newuser}).success(function() {
						$scope.loadUser();
					});
		        }
			});
		};

		$scope.changeMyName = function(){
			bootbox.confirm('New Name:<input type="text" class="form-control" id="myname" placeholder="first name Last Name" name="myname"></input>', function(result) {
		        if(result) {
		            $scope.myname = $('#myname').val();

		            $http.put('/REST/userNC/' + $scope.user.username, {myname : $scope.myname}).success(function() {
						$scope.loadUser();
					});
		        }
			});
		};		

		$scope.changeVIP = function(data){
			var changeData =  (data === $scope.userRoles.user.title) ? $scope.userRoles.vip.title :  $scope.userRoles.user.title;
			bootbox.confirm('Etes-vous sur de vouloir changer en ' + changeData.toUpperCase(), function(result) {
		        if(result) {
		            $http.put('/REST/userRole/' + $scope.user.username, {bitMask:(changeData===$scope.userRoles.user.title) ? 2 : 4, title:changeData}).success(function() {
						$scope.loadUser();
					});
		        }
			});
		};

		/**
		 * [Sauvegarde les données]
		 */
		 $scope.saveGroup = function(){
				$http.put('/REST/userGroup/' + $scope.user.username, $scope.tags).success(function() {
				});
		};

	}]);
