'use strict';

angular.module('worldProno2014App')
.controller('AdminCtrl', ['$scope', '$http', 'Auth', '$resource', function($scope, $http, Auth, $resource) {

	Ladda.bind( '.ladda-button', { timeout: 2000 } );

	$scope.loading = true;
	$scope.userRoles = Auth.userRoles;


	$scope.loadUser = function() {

		$http.get('/users').success(function (data) {
				$scope.users = data;
				$scope.loading = false;
		});
	};

$scope.loadUser();

	$scope.togglePaid = function(user) {
		bootbox.confirm('Etes-vous sur de changer le paiement de ' + user.username + '?', function(result) {
			if(result) {
				$http.put('/REST/userPaid/' + user.username, {paid:!user.paid}).success(function() {
					$scope.loadUser();
				});	
			}
		});
	};

	$scope.deleteUser = function(user) {
		bootbox.confirm('Etes-vous sur de supprimer cet utilisateur ' + user.username + '?', function(result) {
			if(result) {
				$http.Delete('/REST/user/' + user.username).success(function() {
					$scope.loadUser();
				});
			}
		});
	};

/*	var userPaid =  $resource('/REST/userPaid/' + $scope.username);
	$scope.userPaid = userPaid.query().paid;
*/




}]);