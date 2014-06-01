'use strict';

angular.module('worldProno2014App')
.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

	$http.get('/REST/posts').success(function (data) {
			$scope.posts = data;
			console.log($scope.posts);
	});

    $scope.editPost = function(post) {
        bootbox.confirm('Titre:<input type="text" value="'+ post.postTitle +'" class="form-control" id="postTitle"></input><br/>Image:<input type="text" value="'+ post.postImage +'" placeholder="http://" class="form-control" id="postImage"></input><br/>Texte:<textarea rows="5" class="form-control" id="postText">'+ post.postText +'</textarea><br/>', function(result) {
            if(result) {
                $http.put('/REST/posts/'+ post._id, {postTitle:$('#postTitle').val(), postImage:$('#postImage').val(),postText:$('#postText').val()}).success(function() {

                });
          }
      });
    };

    $scope.deletePost = function(post) {
        bootbox.confirm('Etes vous sur de vouloir supprimer ce post ?', function(result) {
            if(result) {
                $http.delete('/REST/posts/'+ post._id).success(function() {

                });
          }
      });
    };

}]);
