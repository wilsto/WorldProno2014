'use strict';

angular.module('worldProno2014App')
	.controller('ProfileCtrl', ['$scope', 'Auth', '$http', '$resource', '$q', '$filter', function ($scope, Auth, $http, $resource, $q, $filter) {

		Ladda.bind( '.ladda-button', { timeout: 2000 } );

		$scope.errors = {};
		$scope.user = Auth.user;
		$scope.userRoles = Auth.userRoles;
		$scope.accessLevels = Auth.accessLevels;

		$scope.loadUser = function() {
			$http.get('/REST/userInfo/' + $scope.user.username).success(function(user) {
				
				$scope.player = user;
				$scope.myname = user.myname;
				$scope.pseudo = (user.pseudo) ? user.pseudo : $scope.user.username;
				$scope.mycontact = user.mycontact;
				$scope.userPaid = user.paid;
				$scope.tags = user.groups;
				$scope.avatarUrl =  user.avatarUrl;

			});
		};
		$scope.loadUser();


		var userPaid =  $resource('/REST/userPaid/' + $scope.user.username);
		$scope.userPaid = userPaid.query().paid;

		$http.get('/REST/userGroup/').success(function(alltags) {
	        $scope.alltags =alltags;
	    });

		$scope.loadTags = function(query) {
		    var deferred = $q.defer();
		    deferred.resolve($filter('filter')($scope.alltags, query));
		    return deferred.promise;
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
			bootbox.confirm('Je connais:<div class="radio"><input type="radio" id="w" name="myContact" value="Willy"><label for="w"> Willy</label></input><br><input type="radio" id="c" name="myContact" value="Cédric"><label for="myContact"> Cédric</label><br><input type="radio" id="aw" name="myContact" value="aw"><label for="aw"> un ami de Willy</label><br><input type="radio" id="mylink" name="myContact" value="ac"><label for="myContact"> un ami de Cédric</label><br><input type="text" class="form-control" id="ami" placeholder="Saisir ami" name="ami"></input></div>', function(result) {
		        if(result) {
		        	var contactRad= $('input:radio[name=myContact]:checked').val()
		            $scope.myContact = (contactRad==='aw')?$('#ami').val()+" (ami de Willy)":(contactRad==='ac')?$('#ami').val()+" (ami de Cédric)":contactRad;
		           	$http.put('/REST/userContact/' + $scope.user.username, {mycontact : $scope.myContact}).success(function() {
						$scope.loadUser();
					});
		        }
			});
		};

		$scope.changeMyName = function(){
			bootbox.confirm('Mon nom réel:<input type="text" class="form-control" id="myname" placeholder="Prénom nom" name="myname"></input>', function(result) {
		        if(result) {
		            $scope.myname = $('#myname').val();

		            $http.put('/REST/userNC/' + $scope.user.username, {myname : $scope.myname}).success(function() {
						$scope.loadUser();
					});
		        }
			});
		};	
		$scope.changeMyPseudo = function(){
			bootbox.confirm('Mon nouveau pseudo:<input type="text" class="form-control" id="mypseudo" placeholder="pseudo" name="mypseudo"></input>', function(result) {
		        if(result) {
		            $scope.mypseudo = $('#mypseudo').val();
		            $http.put('/REST/userPseudo/' + $scope.user.username, {pseudo : $scope.mypseudo}).success(function() {
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
