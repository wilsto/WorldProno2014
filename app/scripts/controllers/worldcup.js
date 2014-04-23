'use strict';
/*jshint -W069 */ /* JSHint: Surpress {variable} “is better written in dot notation.” */

angular.module('worldProno2014App')
.controller('worldcupCtrl', function ($scope, $http, userService, pronoFactory) {

  $scope.isCollapsed = true;
  $scope.isNamed = true;

  $scope.rate = 0;
  $scope.max = 5;
  $scope.isReadonly = false;

$scope.userData = userService.getUserData();
$scope.mypronos = pronoFactory.get({id:$scope.userData.userName});

    $scope.groupsMatches = {
        A: { matches:[
                 [{country: 'Brésil', score:'3'}, {country: 'Croatie', score:'1'},{date:'12/06',time:'22:00'}],
                 [{country: 'Méxique', score:'1'}, {country: 'Cameroun', score:'1'},{date:'13/06',time:'18:00'}],
                 [{country: 'Brésil', score:'3'}, {country: 'Méxique', score:'0'},{date:'17/06',time:'21:00'}],
                 [{country: 'Cameroun', score:'0'}, {country: 'Croatie', score:'0'},{date:'19/06',time:'00:00'}],
                 [{country: 'Cameroun', score:'0'}, {country: 'Brésil', score:'0'},{date:'23/06',time:'22:00'}],
                 [{country: 'Croatie', score:'0'}, {country: 'Méxique', score:'2'},{date:'23/06',time:'22:00'}]
             ],
             standing: {
                'Brésil': {total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                'Cameroun':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                'Croatie':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                'Méxique':{total:0, matchNb:0, pour:0, contre:0}
            }
        },
        B: { matches:[
            [{country: 'Espagne', score:'3'}, {country: 'Pays-Bas', score:'0'},{date:'13/06',time:'21:00'}],
            [{country: 'Chilie', score:'2'}, {country: 'Australie', score:'1'},{date:'14/06',time:'00:00'}],
            [{country: 'Espagne', score:'1'}, {country: 'Chilie', score:'2'},{date:'18/06',time:'18:00'}],
            [{country: 'Australie', score:'3'}, {country: 'Pays-Bas', score:'2'},{date:'18/06',time:'21:00'}],
            [{country: 'Australie', score:'2'}, {country: 'Espagne', score:'1'},{date:'23/06',time:'18:00'}],
            [{country: 'Pays-Bas', score:'2'}, {country: 'Chilie', score:'1'},{date:'23/06',time:'18:00'}]
        ],
            standing: {
                'Espagne': {total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                'Chilie':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                'Australie':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                'Pays-Bas':{total:0, matchNb:0, pour:0, contre:0}
            }
        },
        C: { matches:[
            [{country: 'Colombie', score:''}, {country: 'Grèce', score:''},{date:'14/06',time:'18:00'}],
            [{country: 'Cote d\'Ivoire', score:''}, {country: 'Japon', score:''},{date:'15/06',time:'03:00'}],
            [{country: 'Colombie', score:''}, {country: 'Cote d\'Ivoire', score:''},{date:'19/06',time:'18:00'}],
            [{country: 'Japon', score:''}, {country: 'Grèce', score:''},{date:'20/06',time:'00:00'}],
            [{country: 'Japon', score:''}, {country: 'Colombie', score:''},{date:'24/06',time:'22:00'}],
            [{country: 'Grèce', score:''}, {country: 'Cote d\'Ivoire', score:''},{date:'24/06',time:'22:00'}]
        ],
            standing: {
                'Colombie': {total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                'Cote d\'Ivoire':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                'Japon':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                'Grèce':{total:0, matchNb:0, pour:0, contre:0}
            }
        },
        D: { matches:[
            [{country: 'Uruguay', score:''}, {country: 'Costarica', score:''},{date:'14/06',time:'21:00'}],
            [{country: 'Angleterre', score:''}, {country: 'Italie', score:''},{date:'15/06',time:'00:00'}],
            [{country: 'Uruguay', score:''}, {country: 'Angleterre', score:''},{date:'19/06',time:'21:00'}],
            [{country: 'Italie', score:''}, {country: 'Costarica', score:''},{date:'20/06',time:'18:00'}],
            [{country: 'Italie', score:''}, {country: 'Uruguay', score:''},{date:'24/06',time:'18:00'}],
            [{country: 'Costarica', score:''}, {country: 'Angleterre', score:''},{date:'24/06',time:'18:00'}]
        ],
            standing: {
                'Uruguay': {total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                'Angleterre':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                'Italie':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                'Costarica':{total:0, matchNb:0, pour:0, contre:0}
            }
        },
        E: { matches:[
            [{country: 'Suisse', score:''}, {country: 'Equateur', score:''},{date:'15/06',time:'18:00'}],
            [{country: 'France', score:''}, {country: 'Honduras', score:''},{date:'15/06',time:'21:00'}],
            [{country: 'Suisse', score:''}, {country: 'France', score:''},{date:'20/06',time:'21:00'}],
            [{country: 'Honduras', score:''}, {country: 'Equateur', score:''},{date:'21/06',time:'00:00'}],
            [{country: 'Honduras', score:''}, {country: 'Suisse', score:''},{date:'25/06',time:'22:00'}],
            [{country: 'Equateur', score:''}, {country: 'France', score:''},{date:'25/06',time:'22:00'}]
        ],
            standing: {
                'Suisse': {total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                'France':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                'Honduras':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                'Equateur':{total:0, matchNb:0, pour:0, contre:0}
            }
        },
        F: { matches:[
            [{country: 'Argentine', score:''}, {country: 'Bosnie', score:''},{date:'16/06',time:'00:00'}],
            [{country: 'Iran', score:''}, {country: 'Nigeria', score:''},{date:'16/06',time:'21:00'}],
            [{country: 'Argentine', score:''}, {country: 'Iran', score:''},{date:'21/06',time:'18:00'}],
            [{country: 'Nigeria', score:''}, {country: 'Bosnie', score:''},{date:'22/06',time:'00:00'}],
            [{country: 'Nigeria', score:''}, {country: 'Argentine', score:''},{date:'25/06',time:'18:00'}],
            [{country: 'Bosnie', score:''}, {country: 'Iran', score:''},{date:'25/06',time:'18:00'}]
        ],
            standing: {
                'Argentine': {total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                'Iran':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                'Nigeria':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                'Bosnie':{total:0, matchNb:0, pour:0, contre:0}
            }
        },
        G: { matches:[
            [{country: 'Allemagne', score:''}, {country: 'Portugal', score:''},{date:'16/06',time:'18:00'}],
            [{country: 'Ghana', score:''}, {country: 'Etats-Unis', score:''},{date:'17/06',time:'00:00'}],
            [{country: 'Allemagne', score:''}, {country: 'Ghana', score:''},{date:'21/06',time:'21:00'}],
            [{country: 'Etats-Unis', score:''}, {country: 'Portugal', score:''},{date:'23/06',time:'00:00'}],
            [{country: 'Etats-Unis', score:''}, {country: 'Allemagne', score:''},{date:'26/06',time:'18:00'}],
            [{country: 'Portugal', score:''}, {country: 'Ghana', score:''},{date:'26/06',time:'18:00'}]
        ],
            standing: {
                'Allemagne': {total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                'Ghana':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                'Etats-Unis':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                'Portugal':{total:0, matchNb:0, pour:0, contre:0}
            }
        },
        H: { matches:[
            [{country: 'Belgique', score:''}, {country: 'Algerie', score:''},{date:'17/06',time:'18:00'}],
            [{country: 'Russie', score:''}, {country: 'Corée', score:''},{date:'18/06',time:'00:00'}],
            [{country: 'Belgique', score:''}, {country: 'Russie', score:''},{date:'22/06',time:'18:00'}],
            [{country: 'Corée', score:''}, {country: 'Algerie', score:''},{date:'22/06',time:'21:00'}],
            [{country: 'Corée', score:''}, {country: 'Belgique', score:''},{date:'26/06',time:'22:00'}],
            [{country: 'Algerie', score:''}, {country: 'Russie', score:''},{date:'26/06',time:'22:00'}]
        ],
            standing: {
                'Belgique': {total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                'Russie':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                'Corée':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                'Algerie':{total:0, matchNb:0, pour:0, contre:0}
            }
        }
    };

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

  $scope.secondStageMatches = {
        'roundOf16':{
            A: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
            B: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
            C: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
            D: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
            E: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
            F: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
            G: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
            H: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}]
        },
        'quarterFinals':{
            AB: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
            CD: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
            EF: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
            GH: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}]
        },
        'semiFinals':{
            ABCD: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
            EFGH: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}]
        },
        'final':{
            ABCDEFGH: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}]
        }
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
        $scope.secondStageMatches.roundOf16.A = [_.clone($scope.standing.A[0]), _.clone($scope.standing.B[1])];
        $scope.secondStageMatches.roundOf16.B = [_.clone($scope.standing.C[0]), _.clone($scope.standing.D[1])];
        $scope.secondStageMatches.roundOf16.C = [_.clone($scope.standing.E[0]), _.clone($scope.standing.F[1])];
        $scope.secondStageMatches.roundOf16.D = [_.clone($scope.standing.G[0]), _.clone($scope.standing.H[1])];
        $scope.secondStageMatches.roundOf16.E = [_.clone($scope.standing.B[0]), _.clone($scope.standing.A[1])];
        $scope.secondStageMatches.roundOf16.F = [_.clone($scope.standing.D[0]), _.clone($scope.standing.C[1])];
        $scope.secondStageMatches.roundOf16.G = [_.clone($scope.standing.F[0]), _.clone($scope.standing.E[1])];
        $scope.secondStageMatches.roundOf16.H = [_.clone($scope.standing.H[0]), _.clone($scope.standing.G[1])];
    }

    $scope.$watch('secondStageMatches.roundOf16', function(){ //Calculate who passes to quarter finals
        var matchHolder = [];
        var concaTitle = '';
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
    }, true);

    $scope.$watch('secondStageMatches.quarterFinals', function(){ //Calculate who passes to quarter finals
        var matchHolder = [];
        var concaTitle = '';
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
    }, true);

    $scope.$watch('secondStageMatches.semiFinals', function(){ //Calculate who passes to quarter finals
        var matchHolder = [];
        var concaTitle = '';
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
        $scope.pronosToSave['userData'] = $scope.userData;
        $scope.pronosToSave['groupsMatches'] = $scope.groupsMatches;
        $scope.pronosToSave['secondStageMatches'] = $scope.secondStageMatches;
        $http.post('/REST/pronos', $scope.pronosToSave).success(function() {
        });
    };

});
