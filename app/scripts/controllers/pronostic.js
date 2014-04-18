'use strict';

angular.module('worldProno2014App')
.controller('pronosticCtrl', function ($scope, $http) {


	$http.get('/api/fifaGroupStage').success(function(fifaGroupStage) {
		$scope.fifaGroupStage = fifaGroupStage;
		$scope.groupBy( $scope.fifaGroupStage, 'Groupe' );
	});


	// I sort the given collection on the given property.
	function sortOn( collection, name ) {

		collection.sort(
			function( a, b ) {

				if ( a[ name ] <= b[ name ] ) {

					return( -1 );

				}

				return( 1 );

			}
			);

	}


	// -- Define Scope Methods. ----------------- //


	// I group the items list on the given property.
	$scope.groupBy = function( collection, attribute ) {

		// First, reset the groups.
		$scope.groups = [];

		// Now, sort the collection of item on the
		// grouping-property. This just makes it easier
		// to split the collection.
		sortOn(collection, attribute );

		// I determine which group we are currently in.
		var groupValue = '_INVALID_GROUP_VALUE_';

		// As we loop over each item, add it to the
		// current group - we'll create a NEW group every
		// time we come across a new attribute value.
		for ( var i = 0 ; i < collection.length ; i++ ) {

			var item = collection[ i ];

			// Should we create a new group?
			if ( item[ attribute ] !== groupValue ) {

				var group = {
					label: item[ attribute ],
					items: []
				};

				groupValue = group.label;
				$scope.groups.push( group );

			}

			// Add the item to the currently active
			// grouping. Not in $scope so ignorejslint
			/* jshint ignore:start */
			group.items.push( item );
			/* jshint ignore:end */
		}

	};
});
