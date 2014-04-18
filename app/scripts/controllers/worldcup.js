'use strict';
/*jshint -W069 */ /* JSHint: Surpress {variable} “is better written in dot notation.” */

angular.module('worldProno2014App')
.controller('worldcupCtrl', function ($scope, $http) {

    $scope.groupsMatches = {
        A: { matches:[
                 [{country: 'Brésil', score:''}, {country: 'Croatie', score:''},{date:'12/06',time:'18:00'}],
                 [{country: 'Méxique', score:''}, {country: 'Cameroun', score:''},{date:'12/06',time:'18:00'}],
                 [{country: 'Brésil', score:''}, {country: 'Méxique', score:''},{date:'12/06',time:'18:00'}],
                 [{country: 'Cameroun', score:''}, {country: 'Croatie', score:''},{date:'12/06',time:'18:00'}],
                 [{country: 'Cameroun', score:''}, {country: 'Brésil', score:''},{date:'12/06',time:'18:00'}],
                 [{country: 'Croatie', score:''}, {country: 'Méxique', score:''},{date:'12/06',time:'18:00'}]
             ],
             standing: {
                 'Brésil': 0,
                 'Méxique':0,
                 'Cameroun':0,
                 'Croatie':0
             }
        },
        B: { matches:[
            [{country: 'Espagne', score:''}, {country: 'Pays-Bas', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Chilie', score:''}, {country: 'Australie', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Espagne', score:''}, {country: 'Chilie', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Australie', score:''}, {country: 'Pays-Bas', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Australie', score:''}, {country: 'Espagne', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Pays-Bas', score:''}, {country: 'Chilie', score:''},{date:'12/06',time:'18:00'}]
        ],
            standing: {
                'Espagne': 0,
                'Chilie':0,
                'Australie':0,
                'Pays-Bas':0
            }
        },
        C: { matches:[
            [{country: 'Colombie', score:''}, {country: 'Grèce', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Cote d\'Ivoire', score:''}, {country: 'Japon', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Colombie', score:''}, {country: 'Cote d\'Ivoire', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Japon', score:''}, {country: 'Grèce', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Japon', score:''}, {country: 'Colombie', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Grèce', score:''}, {country: 'Cote d\'Ivoire', score:''},{date:'12/06',time:'18:00'}]
        ],
            standing: {
                'Colombie': 0,
                'Cote d\'Ivoire':0,
                'Japon':0,
                'Grèce':0
            }
        },
        D: { matches:[
            [{country: 'Uruguay', score:''}, {country: 'Costarica', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Angleterre', score:''}, {country: 'Italie', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Uruguay', score:''}, {country: 'Angleterre', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Italie', score:''}, {country: 'Costarica', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Italie', score:''}, {country: 'Uruguay', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Costarica', score:''}, {country: 'Angleterre', score:''},{date:'12/06',time:'18:00'}]
        ],
            standing: {
                'Uruguay': 0,
                'Angleterre':0,
                'Italie':0,
                'Costarica':0
            }
        },
        E: { matches:[
            [{country: 'Suisse', score:''}, {country: 'Equateur', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'France', score:''}, {country: 'Honduras', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Suisse', score:''}, {country: 'France', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Honduras', score:''}, {country: 'Equateur', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Honduras', score:''}, {country: 'Suisse', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Equateur', score:''}, {country: 'France', score:''},{date:'12/06',time:'18:00'}]
        ],
            standing: {
                'Suisse': 0,
                'France':0,
                'Honduras':0,
                'Equateur':0
            }
        },
        F: { matches:[
            [{country: 'Argentine', score:''}, {country: 'Bosnie', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Iran', score:''}, {country: 'Nigeria', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Argentine', score:''}, {country: 'Iran', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Nigeria', score:''}, {country: 'Bosnie', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Nigeria', score:''}, {country: 'Argentine', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Bosnie', score:''}, {country: 'Iran', score:''},{date:'12/06',time:'18:00'}]
        ],
            standing: {
                'Argentine': 0,
                'Iran':0,
                'Nigeria':0,
                'Bosnie':0
            }
        },
        G: { matches:[
            [{country: 'Allemagne', score:''}, {country: 'Portugal', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Ghana', score:''}, {country: 'Etats-Unis', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Allemagne', score:''}, {country: 'Ghana', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Etats-Unis', score:''}, {country: 'Portugal', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Etats-Unis', score:''}, {country: 'Allemagne', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Portugal', score:''}, {country: 'Ghana', score:''},{date:'12/06',time:'18:00'}]
        ],
            standing: {
                'Allemagne': 0,
                'Ghana':0,
                'Etats-Unis':0,
                'Portugal':0
            }
        },
        H: { matches:[
            [{country: 'Belgique', score:''}, {country: 'Algerie', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Russie', score:''}, {country: 'Corée', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Belgique', score:''}, {country: 'Russie', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Corée', score:''}, {country: 'Algerie', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Corée', score:''}, {country: 'Belgique', score:''},{date:'12/06',time:'18:00'}],
            [{country: 'Algerie', score:''}, {country: 'Russie', score:''},{date:'12/06',time:'18:00'}]
        ],
            standing: {
                'Belgique': 0,
                'Russie':0,
                'Corée':0,
                'Algerie':0
            }
        }
    };

    $scope.$watch('groupsMatches.A.matches ', function(newVal){
        calculateStandings();
    }, true);
    $scope.$watch('groupsMatches.B.matches ', function(newVal){
        calculateStandings();
    }, true);
    $scope.$watch('groupsMatches.C.matches ', function(newVal){
        calculateStandings();
    }, true);
    $scope.$watch('groupsMatches.D.matches ', function(newVal){
        calculateStandings();
    }, true);
    $scope.$watch('groupsMatches.E.matches ', function(newVal){
        calculateStandings();
    }, true);
    $scope.$watch('groupsMatches.F.matches ', function(newVal){
        calculateStandings();
    }, true);
    $scope.$watch('groupsMatches.G.matches ', function(newVal){
        calculateStandings();
    }, true);
    $scope.$watch('groupsMatches.H.matches ', function(newVal){
        calculateStandings();
    }, true);

    function calculateStandings(){
        clearPoints();
        _.each($scope.groupsMatches, function(groupData, group){
            _.each(groupData.matches, function(match){
                if(match[0].score > match[1].score){
                    groupData.standing[match[0].country] += 3;
                }else if(match[0].score < match[1].score){
                    groupData.standing[match[1].country] += 3;
                }else{
                    groupData.standing[match[0].country] += 1;
                    groupData.standing[match[1].country] += 1;
                }
            });
        });
        countriesThatPass();
    }

    function clearPoints(){
        _.each($scope.groupsMatches, function(groupData, group){
            _.each(groupData.matches, function(match){
                groupData.standing[match[0].country] = 0;
                groupData.standing[match[1].country] = 0;
            });
        });
    }

    function countriesThatPass(){
        _.each($scope.groupsMatches, function(groupData, group){
            var countriesOrderedByPoints = _.sortBy(_.pairs(groupData.standing), function(pair){ return -pair[1];});
            $scope.standing[group][0]['country'] = countriesOrderedByPoints[0][0];
            $scope.standing[group][1]['country'] = countriesOrderedByPoints[1][0];
        })
        $scope.secondStageMatches.roundOf16.A = [_.clone($scope.standing.A[0]), _.clone($scope.standing.B[1])];
        $scope.secondStageMatches.roundOf16.B = [_.clone($scope.standing.C[0]), _.clone($scope.standing.D[1])];
        $scope.secondStageMatches.roundOf16.C = [_.clone($scope.standing.E[0]), _.clone($scope.standing.F[1])];
        $scope.secondStageMatches.roundOf16.D = [_.clone($scope.standing.G[0]), _.clone($scope.standing.H[1])];
        $scope.secondStageMatches.roundOf16.E = [_.clone($scope.standing.B[0]), _.clone($scope.standing.A[1])];
        $scope.secondStageMatches.roundOf16.F = [_.clone($scope.standing.D[0]), _.clone($scope.standing.C[1])];
        $scope.secondStageMatches.roundOf16.G = [_.clone($scope.standing.F[0]), _.clone($scope.standing.E[1])];
        $scope.secondStageMatches.roundOf16.H = [_.clone($scope.standing.H[0]), _.clone($scope.standing.G[1])];
    }

    $scope.standing = { //Countries that pass the first round
        A: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
        B: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
        C: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
        D: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
        E: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
        F: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
        G: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
        H: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}]
    };

    $scope.$watch('secondStageMatches.roundOf16', function(newVal){ //Calculate who passes to quarter finals
        var matchHolder = [];
        var concaTitle = '';
        _.each($scope.secondStageMatches.roundOf16, function(match, title){
            if(match[0].score > match[1].score){
                matchHolder.push(_.clone(match[0]));
            }else if(match[0].score < match[1].score){
                matchHolder.push(_.clone(match[1]));
            }else{
                _.each(match, function(country){ country.victorByPenalties ? matchHolder.push(_.clone(country)) : null });
            }

            concaTitle += title;
            if(matchHolder.length === 2){
                $scope.secondStageMatches.quarterFinals[concaTitle][0]['country'] = matchHolder[0]['country'];
                $scope.secondStageMatches.quarterFinals[concaTitle][1]['country'] = matchHolder[1]['country'];
                matchHolder = [];
                concaTitle = '';
            }
        })
    }, true);

    $scope.$watch('secondStageMatches.quarterFinals', function(){ //Calculate who passes to quarter finals
        var matchHolder = [];
        var concaTitle = '';
        _.each($scope.secondStageMatches.quarterFinals, function(match, title){
            if(match[0].score > match[1].score){
                matchHolder.push(_.clone(match[0]));
            }else if(match[0].score < match[1].score){
                matchHolder.push(_.clone(match[1]));
            }else{
                _.each(match, function(country){ country.victorByPenalties ? matchHolder.push(_.clone(country)) : null });
            }
            concaTitle += title;
            if(matchHolder.length === 2){
                $scope.secondStageMatches.semiFinals[concaTitle][0]['country'] = matchHolder[0]['country'];
                $scope.secondStageMatches.semiFinals[concaTitle][1]['country'] = matchHolder[1]['country'];
                matchHolder = [];
                concaTitle = '';
            }
        })
    }, true);

    $scope.$watch('secondStageMatches.semiFinals', function(){ //Calculate who passes to quarter finals
        var matchHolder = [];
        var concaTitle = '';
        _.each($scope.secondStageMatches.semiFinals, function(match, title){
            if(match[0].score > match[1].score){
                matchHolder.push(_.clone(match[0]));
            }else if(match[0].score < match[1].score){
                matchHolder.push(_.clone(match[1]));
            }else{
                _.each(match, function(country){ country.victorByPenalties ? matchHolder.push(_.clone(country)) : null });
            }
            concaTitle += title;
            if(matchHolder.length === 2){

                $scope.secondStageMatches.final[concaTitle][0]['country'] = matchHolder[0]['country'];
                $scope.secondStageMatches.final[concaTitle][1]['country'] = matchHolder[1]['country'];
                matchHolder = [];
                concaTitle = '';
            }
        })
    }, true);


    $scope.victorByPenalties = function(round, title, winnerIndex){
        _.each($scope.secondStageMatches[round][title], function(country, index){
            country.victorByPenalties = (winnerIndex == index) ? true : false;
        })
        console.log($scope.secondStageMatches[round][title]);
    }


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
            AB: [{country: 'Brésil', score:'', victorByPenalties:true}, {country: 'Méxique', score:'', victorByPenalties:false}],
            CD: [{country: 'Brésil', score:'', victorByPenalties:true}, {country: 'Méxique', score:'', victorByPenalties:false}],
            EF: [{country: 'Brésil', score:'', victorByPenalties:true}, {country: 'Méxique', score:'', victorByPenalties:false}],
            GH: [{country: 'Brésil', score:'', victorByPenalties:true}, {country: 'Méxique', score:'', victorByPenalties:false}]
        },
        'semiFinals':{
            ABCD: [{country: 'Brésil', score:'', victorByPenalties:true}, {country: 'Méxique', score:'', victorByPenalties:false}],
            EFGH: [{country: 'Brésil', score:'', victorByPenalties:true}, {country: 'Méxique', score:'', victorByPenalties:false}]
        },
        'final':{
            ABCDEFGH: [{country: 'Brésil', score:'', victorByPenalties:true}, {country: 'Méxique', score:'', victorByPenalties:false}]
        }
    };


});
