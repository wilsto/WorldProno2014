'use strict';
/*jshint -W069 */ /* JSHint: Surpress {variable} “is better written in dot notation.” */


angular.module('worldProno2014App')
.controller('worldcupCtrl', ['$scope', '$http', '$location', 'PronoFactory', 'Auth', function ($scope, $http, $location, PronoFactory, Auth) {

    Ladda.bind( '.ladda-button', { timeout: 2000 } );

    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;

    $scope.isCollapsed = false;
    $scope.isNamed = true;

    $scope.rate = 0;
    $scope.max = 5;
    $scope.isReadonly = false;

    $scope.initPronos = function() {
        $http.get('/api/fifaMatchs').success(function(fifaMatchs) {
            $scope.fifaMatchs = fifaMatchs;
            $scope.groupsMatches = $scope.fifaMatchs.groupsMatches;
            $scope.secondStageMatches = $scope.fifaMatchs.secondStageMatches;
            $scope.standing = { //Countries that pass the first round
                A: [{country: 'A1', score:'', victorByPenalties:true}, {country: 'A2', score:'', victorByPenalties:false}],
                B: [{country: 'B1', score:'', victorByPenalties:true}, {country: 'B2', score:'', victorByPenalties:false}],
                C: [{country: 'C1', score:'', victorByPenalties:true}, {country: 'C2', score:'', victorByPenalties:false}],
                D: [{country: 'D1', score:'', victorByPenalties:true}, {country: 'D2', score:'', victorByPenalties:false}],
                E: [{country: 'E1', score:'', victorByPenalties:true}, {country: 'E2', score:'', victorByPenalties:false}],
                F: [{country: 'F1', score:'', victorByPenalties:true}, {country: 'F2', score:'', victorByPenalties:false}],
                G: [{country: 'G1', score:'', victorByPenalties:true}, {country: 'G2', score:'', victorByPenalties:false}],
                H: [{country: 'H1', score:'', victorByPenalties:true}, {country: 'H2', score:'', victorByPenalties:false}]
            };
            $scope.real = ($location.path() === '/worldcup/Mondial') ?  'Mondial' : $scope.user.username;    // recupère le nom de l'utilisateur
            $scope.mypronos = PronoFactory.get({id:$scope.real},
            function(data) {
                if (data.length > 0) { // recupère les pronos du joueur
                    $scope.groupsMatches = $scope.mypronos[0].groupsMatches;
                    $scope.secondStageMatches = $scope.mypronos[0].secondStageMatches;
                }
            });
        });
    };

    $scope.initPronos();

    $scope.Named = function () {
        $scope.isNamed = !$scope.isNamed;
    };

    $scope.$watch('groupsMatches.A.matches ', function(){
        calculateStandings();
    }, true);
    $scope.$watch('groupsMatches.B.matches ', function(){
        calculateStandings();
    }, true);
    $scope.$watch('groupsMatches.C.matches ', function(){
        calculateStandings();
    }, true);
    $scope.$watch('groupsMatches.D.matches ', function(){
        calculateStandings();
    }, true);
    $scope.$watch('groupsMatches.E.matches ', function(){
        calculateStandings();
    }, true);
    $scope.$watch('groupsMatches.F.matches ', function(){
        calculateStandings();
    }, true);
    $scope.$watch('groupsMatches.G.matches ', function(){
        calculateStandings();
    }, true);
    $scope.$watch('groupsMatches.H.matches ', function(){
        calculateStandings();
    }, true);

    /**
     * [Initialise les calculs]
     */
     function clearPoints(){
        _.each($scope.groupsMatches, function(groupData){
            _.each(groupData.matches, function(match){
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
     function calculateStandings(){
        clearPoints();
        if($scope.groupsMatches) {
            _.each($scope.groupsMatches, function(groupData){
                _.each(groupData.matches, function(match){
                    if(match[0].score.length === 0 || match[1].score.length === 0 ){
                        groupData.standing[match[0].country].total += 0;
                        groupData.standing[match[1].country].total += 0;
                    }else {
                        groupData.standing[match[0].country].matchNb += 1;
                        groupData.standing[match[1].country].matchNb += 1;

                        groupData.standing[match[0].country].pour += parseInt(match[0].score);
                        groupData.standing[match[1].country].pour += parseInt(match[1].score);
                        groupData.standing[match[0].country].contre += parseInt(match[1].score);
                        groupData.standing[match[1].country].contre += parseInt(match[0].score);
                        
                        if(match[0].score > match[1].score){
                            groupData.standing[match[0].country].total += 3;
                            groupData.standing[match[0].country].win += 1;
                            groupData.standing[match[1].country].lose += 1;
                        }else if(match[0].score < match[1].score){
                            groupData.standing[match[1].country].total += 3;
                            groupData.standing[match[1].country].win += 1;
                            groupData.standing[match[0].country].lose += 1;
                        }else{
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
     function countriesThatPass(){
        _.each($scope.groupsMatches, function(groupData, group){
            var countriesOrderedByPoints = _.sortBy(_.pairs(groupData.standing), function(pair){ return -pair[1].total;});
            if (countriesOrderedByPoints[0][1].matchNb === 3 && countriesOrderedByPoints[1][1].matchNb === 3 && countriesOrderedByPoints[2][1].matchNb === 3  && countriesOrderedByPoints[3][1].matchNb === 3 ) {
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

    $scope.$watch('secondStageMatches.roundOf16', function(){ //Calculate who passes to quarter finals
        var matchHolder = [];
        var concaTitle = '';
        if($scope.groupsMatches) {
            _.each($scope.secondStageMatches.roundOf16, function(match, title){
                if(match[0].score.length === 0 || match[1].score.length === 0 ){
                    matchHolder.push({country: '', score:'', victorByPenalties:true});
                }else {
                    if(match[0].score > match[1].score){
                        matchHolder.push(_.clone(match[0]));
                    }else if(match[0].score < match[1].score){
                        matchHolder.push(_.clone(match[1]));
                    }else{
                        _.each(match, function(country){ country.victorByPenalties ? matchHolder.push(_.clone(country)) : null ;});
                    }
                }
                concaTitle += title;
                if(matchHolder.length === 2){
                    $scope.secondStageMatches.quarterFinals[concaTitle][0]['country'] = matchHolder[0]['country'];
                    $scope.secondStageMatches.quarterFinals[concaTitle][1]['country'] = matchHolder[1]['country'];
                    matchHolder = [];
                    concaTitle = '';
                }

            });
}
}, true);

    $scope.$watch('secondStageMatches.quarterFinals', function(){ //Calculate who passes to quarter finals
        var matchHolder = [];
        var concaTitle = '';
        if($scope.secondStageMatches) {
            _.each($scope.secondStageMatches.quarterFinals, function(match, title){
                if(match[0].score.length === 0 || match[1].score.length === 0 ){
                    matchHolder.push({country: '', score:'', victorByPenalties:true});
                }else {
                    if(match[0].score > match[1].score){
                        matchHolder.push(_.clone(match[0]));
                    }else if(match[0].score < match[1].score){
                        matchHolder.push(_.clone(match[1]));
                    }else{
                        _.each(match, function(country){ country.victorByPenalties ? matchHolder.push(_.clone(country)) : null ;});
                    }
                }
                concaTitle += title;
                if(matchHolder.length === 2){
                    $scope.secondStageMatches.semiFinals[concaTitle][0]['country'] = matchHolder[0]['country'];
                    $scope.secondStageMatches.semiFinals[concaTitle][1]['country'] = matchHolder[1]['country'];
                    matchHolder = [];
                    concaTitle = '';
                }
            });
}
}, true);

    $scope.$watch('secondStageMatches.semiFinals', function(){ //Calculate who passes to quarter finals
        var matchHolder = [];
        var concaTitle = '';
        if($scope.secondStageMatches) {
            _.each($scope.secondStageMatches.semiFinals, function(match, title){
                if(match[0].score.length === 0 || match[1].score.length === 0 ){
                    matchHolder.push({country: '', score:'', victorByPenalties:true});
                }else {
                    if(match[0].score > match[1].score){
                        matchHolder.push(_.clone(match[0]));
                    }else if(match[0].score < match[1].score){
                        matchHolder.push(_.clone(match[1]));
                    }else{
                        _.each(match, function(country){ country.victorByPenalties ? matchHolder.push(_.clone(country)) : null ;});
                    }
                }
                concaTitle += title;
                if(matchHolder.length === 2){

                    $scope.secondStageMatches.final[concaTitle][0]['country'] = matchHolder[0]['country'];
                    $scope.secondStageMatches.final[concaTitle][1]['country'] = matchHolder[1]['country'];
                    matchHolder = [];
                    concaTitle = '';
                }
            });
}
}, true);

$scope.victorByPenalties = function(round, title, winnerIndex){
    _.each($scope.secondStageMatches[round][title], function(country, index){
        country.victorByPenalties = (winnerIndex === index) ? true : false;
    });
    console.log($scope.secondStageMatches[round][title]);
};


    /**
     * [Sauvegarde les données]
     */
     $scope.savePronos = function(){
        $scope.pronosToSave = {};
        $scope.pronosToSave['userData'] = $scope.user;
        $scope.pronosToSave['groupsMatches'] = $scope.groupsMatches;
        $scope.pronosToSave['secondStageMatches'] = $scope.secondStageMatches;
        $http.put('/REST/pronos/' + $scope.user.username, $scope.pronosToSave).success(function() {
        });
    };

}]);
