'use strict';

angular.module('worldProno2014App')
	.controller('TeamCtrl', ['$scope', 'Auth', '$http', '$resource', '$filter', function ($scope, Auth, $http, $resource, $filter) {

		Ladda.bind( '.ladda-button', { timeout: 2000 } );

		$http.get('/REST/userGroup/').success(function(alltags) {
			alltags.sort(compare);
	        $scope.alltags =alltags;
	    });

        function compare(a,b) {
			if (a.text < b.text)
		    	return -1;
		  	if (a.text > b.text)
		    	return 1;
		  	return 0;
		}
		
    	$scope.errors = {};
		$scope.userRoles = Auth.userRoles;
		$scope.searchText="*";
		$scope.loadUser = function() {
			$scope.myuser = Auth.user;
			$http.get('/users').success(function (data) {
				$scope.users = data;
				$scope.loading = false;
			});
		};
		$scope.loadUser();
	
		$scope.montre=false;
		$scope.LoadmyUser = function() {
			$http.get('/REST/userInfo/' + $scope.myuser.username).success(function(user) {
				$scope.myname = user.myname;
				$scope.mypseudo = user.pseudo;
				$scope.mytags = user.groups;
				$scope.myavatarUrl =  user.avatarUrl;
			});
		};
		$scope.LoadmyUser();

		$scope.loadPost=function(){
			$http.get('/REST/teamposts').success(function (data) {
				$scope.nbpost=data.length;
				$scope.teamposts = data;
				/*NbMessTeam(data);*/
			});	
		}
		$scope.loadPost();

		$scope.postMess = function(myuser,user) {
			bootbox.confirm('Team:<input type="text" id="postTeam" class="form-control" value="'+$scope.searchText+'" disabled></input><br/>From :<input type="text" id="postFrom" disabled class="form-control" value="'+myuser.username+'"></input><br/>To :<input type="text" id="postTo" disabled class="form-control" value="'+ user +'"></input><br/>Titre:<input type="text" value="" class="form-control" id="postTitle"></input><br/>Texte:<textarea rows="5" class="form-control" id="postText"></textarea><br/>', function(result) {
				if(result) {
					$http.post('/REST/teamposts/', {postTeam:$('#postTeam').val(),postFrom:$('#postFrom').val(),postTo:$('#postTo').val(),postTitle:$('#postTitle').val(), postImage:$('#postImage').val(),postText:$('#postText').val()}).success(function() {
						$scope.loadPost();
					});
				}
			});
		};     

 		$scope.editPost = function(post) {
        	bootbox.confirm('Team:<input type="text" id="postTeam" class="form-control" value="'+post.postTeam+'" disabled></input><br/>From :<input type="text" id="postFrom" disabled class="form-control" value="'+post.postFrom+'"></input><br/>To :<input type="text" id="postTo" disabled class="form-control" value="'+ post.postTo +'"></input><br/>Titre:<input type="text" class="form-control" id="postTitle" value="'+ post.postTitle +'"></input><br/>Texte:<textarea rows="5" class="form-control" id="postText">'+ post.postText +'</textarea><br/>', function(result) {
	            if(result) {
	                $http.put('/REST/teamposts/'+ post._id, {postTeam:$('#postTeam').val(),postFrom:$('#postFrom').val(),postTo:$('#postTo').val(),postTitle:$('#postTitle').val(), postImage:$('#postImage').val(),postText:$('#postText').val()}).success(function() {
	                	$scope.loadPost();
	                });
	          	}
      		});
    	};

   	 	$scope.deletePost = function(post) {
        	bootbox.confirm('Etes vous sur de vouloir supprimer ce post ?', function(result) {
            	if(result) {
					$http({
       					method: 'DELETE', 
       					url: '/REST/teamposts/' + post._id
    				}).success(function() {

						$scope.loadPost();
					});
          		}
      		});
    	};

  
		$scope.FilterGrp = function(group) {
			$scope.searchText=group.text;
			$scope.montre=false;
		};	


		$scope.showjoueur = function() {
			$scope.montre=!$scope.montre;
		};	


		$scope.checkGroup = function(group) {
			var test = false;
			angular.forEach($scope.mytags, function(value, key) {
				if(value.text===group){
					test= true;
				};
			});
		  return test; 
		};
	

	$scope.filterMess = function(allMess,myTeam,myUser) {
			var result = {};
			var i=0;
			$scope.nbpost=i;
			//console.log($scope.tags[0].text);
			angular.forEach(allMess, function(value, key) {
				
				if (value.postTeam===myTeam||(myTeam=='*'&&value.postTeam==''))
				{
					if(value.postFrom===myUser.username||value.postTo===myUser.username||value.postTo===myTeam)
					{
						result[key] = value;
						i++;
						$scope.nbpost=i;
					}
				}
			});

			return result;
	};

	/*function NbMessTeam (allPost) {
		
		_.each($scope.teamposts, function(teampost){
			
				$scope.nbGroup[teampost.postTeam].tpnb=$scope.nbGroup[teampost.postTeam].tpnb+1;
							
			});
			
	};*/

}]);
