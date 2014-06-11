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

	$scope.toggleRole = function(user) {
		bootbox.confirm('Je change le role de <b>'+user.username+'</b> en:<select id="newrole" class="form-control"><option>admin</option><option>user</option><option>vip</option></select>', function(result) {
			if(result) {
				var myRole= $('#newrole').val();
				console.log(myRole);
				$http.put('/REST/userRole/' + user.username, {bitMask:(myRole===$scope.userRoles.user.title) ? 2 : 4, title:myRole}).success(function() {
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

}]);