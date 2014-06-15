'use strict';
/*jshint -W069 */ /* JSHint: Surpress {variable} “is better written in dot notation.” */


angular.module('worldProno2014App')
.controller('worldcupCtrl', ['$scope', '$http', '$location', 'PronoFactory', 'Auth', '$stateParams', function ($scope, $http, $location, PronoFactory, Auth, $stateParams ) {

    Ladda.bind( '.ladda-button', { timeout: 2000 } );

    $scope.user = Auth.user;
    $scope.userRoles = Auth.userRoles;
    $scope.accessLevels = Auth.accessLevels;

    $scope.isCollapsed = false;
    $scope.isNamed = true;

    $scope.playerCompletePct = 0;

    $scope.rate = 0;
    $scope.max = 5;
    $scope.isReadonly = false;

    $http.get('/REST/pronoTime/').success(function(data) {
        $scope.now = data.date;
        console.log( $scope.now );
    });

    $scope.loadUser = function(username) {
        $http.get('/REST/userInfo/' + username).success(function(user) {
            $scope.player = user;
            $scope.userPaid = user.paid;
            $scope.pseudo = (user.pseudo) ? user.pseudo : $scope.real;
            $scope.myname=user.myname;
            $scope.tags = user.groups;
            $scope.avatarUrl =  user.avatarUrl;

        });
    };

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
            $scope.real = ($stateParams.userId) ?  $stateParams.userId : $scope.user.username;    // recupère le nom de l'utilisateur
            if ($location.path() === '/worldcup/Mondial') { $scope.real = 'Mondial' ;}    // recupère le nom de l'utilisateur
            $scope.loadUser($scope.real);
            $scope.mypronos = PronoFactory.get({id:$scope.real}, function(data) {
                if (data.length > 0) { // recupère les pronos du joueur
                    $scope.groupsMatches = $scope.mypronos[0].groupsMatches;
                    $scope.secondStageMatches = $scope.mypronos[0].secondStageMatches;
                }
            });
        });
    };

    $scope.initPronos();

    $scope.mobilecheck = function () {
        var check = false;
        (function (a) {
           if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {check = true;}
       })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };

    $scope.reset = function() {
      bootbox.confirm('Etes-vous sur de vouloir ré-initialiser votre pronostic ?', function(result) {
          if(result) {
                if ($scope.now > 1402596000) {
                     bootbox.confirm('Attention des matchs ont déjà commencés ou sont déjà finis, ils seront exclus et non comptabilisés dans votre classement.<br/> Etes vous sur de vouloir continuer ? ', function(result) {
                          if(result) {
                            $scope.groupsMatches = $scope.fifaMatchs.groupsMatches;
                            $scope.secondStageMatches = $scope.fifaMatchs.secondStageMatches;
                            $scope.savePronos();
                        }
                    });
                }
            }
      });
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
                //Descending Order:
                groupData.sortedStanding = sortStandingFifa2014Rules(groupData.standing);

            });
            countriesThatPass();
            playerComplete();

        }
    }
    /**
     * [sortStandingFifa2014Rules description]
     * @param  {[type]} arr [description]
     * @return {[type]}     [description]
     *  PHASE DE GROUPE
* Il s'agit du même format que celui utilisé depuis 1998. Les trente-deux équipes sont réparties en huit groupes de quatre. Chacune affronte les trois autres de son groupe. À l'issue des trois journées, les deux meilleures équipes de chaque groupe, soit seize au total, se qualifient pour les huitièmes de finale, où les premiers ont l'avantage théorique d'affronter des deuxièmes.
* Chaque équipe reçoit trois points pour une victoire et un pour un match nul. La FIFA a déterminé que le départage se fait comme suit (il s'agit du même règlement pour tous les groupes de qualification et de phase finale) :
* A- le plus grand nombre de points obtenus dans tous les matches du groupe ;
* B- la différence de buts dans tous les matches du groupe ;
* C- le plus grand nombre de buts marqués dans tous les matches du groupe ;
* D- le plus grand nombre de points obtenus dans les matches de groupe entre les équipes à égalité ;
* E- la différence de buts particulière dans les matches de groupe entre les équipes à égalité ;
* F- le plus grand nombre de buts marqués dans les matches de groupe entre les équipes à égalité ;
     */
    function sortStandingFifa2014Rules(arr){
        // Setup Arrays
        var sortedKeys = [];
        var newArr = [];

        // Separate keys and sort them
        for (var country in arr){
            sortedKeys.push([country, arr[country]]);
        }
       sortedKeys.sort(function(a, b) {
            // A- le plus grand nombre de points obtenus dans tous les matches du groupe ;
            if(a[1].total !== b[1].total) {
                return b[1].total - a[1].total;
            }
            // B- la différence de buts dans tous les matches du groupe ; 
            else if((b[1].pour - b[1].contre ) !== (a[1].pour - a[1].contre)) {
                return (b[1].pour - b[1].contre )- (a[1].pour - a[1].contre) ;
            }
            // C- le plus grand nombre de buts marqués dans tous les matches du groupe ;
            else if(b[1].pour  !== a[1].pour) {
                return b[1].pour - a[1].pour ;
            }
            // D- le plus grand nombre de points obtenus dans les matches de groupe entre les équipes à égalité ;
           else if(a[1].total===b[1].total&&(b[1].pour - b[1].contre ) === (a[1].pour - a[1].contre) && b[1].pour  === a[1].pour){
               var diffScore = 0;
               _.each($scope.groupsMatches, function(groupData){
                  _.each(groupData.matches, function(match){
                       if (match[0].country===a[0] && match[1].country===b[0]  && match[0].score.length > 0 ) {
                           if (match[0].score !== match[1].score) {
                               diffScore = parseInt(match[1].score)-parseInt(match[0].score);
                            }
                       }
                   });
               });
               return diffScore;
           }
        });

        return sortedKeys;
    }

    /**
     * [Calcule le pourcentage d'avancement]
     */
     function playerComplete(){
        $scope.playerCompletePct = 0;
        if($scope.groupsMatches) {
            _.each($scope.groupsMatches, function(groupData){
                _.each(groupData.matches, function(match){
                    if(match[0].score.length > 0 && match[1].score.length > 0 ){
                        $scope.playerCompletePct = $scope.playerCompletePct + (1/64*100);
                    }
                })
            })
            _.each($scope.secondStageMatches.roundOf16,  function(match){
                    if(match[0].score.length > 0 && match[1].score.length > 0 ){
                        $scope.playerCompletePct = $scope.playerCompletePct + (1/64*100);
                    }
            })
            _.each($scope.secondStageMatches.quarterFinals, function(match){
                    if(match[0].score.length > 0 && match[1].score.length > 0 ){
                        $scope.playerCompletePct = $scope.playerCompletePct + (1/64*100);
                    }
            })
            _.each($scope.secondStageMatches.semiFinals, function(match){
                    if(match[0].score.length > 0 && match[1].score.length > 0 ){
                        $scope.playerCompletePct = $scope.playerCompletePct + (1/64*100);
                    }
            })
            _.each($scope.secondStageMatches.final3, function(match){
                    if(match[0].score.length > 0 && match[1].score.length > 0 ){
                        $scope.playerCompletePct = $scope.playerCompletePct + (1/64*100);
                    }
            })
            _.each($scope.secondStageMatches.final, function(match){
                    if(match[0].score.length > 0 && match[1].score.length > 0 ){
                        $scope.playerCompletePct = $scope.playerCompletePct + (1/64*100);
                    }
            })
            $scope.playerCompletePct = parseInt($scope.playerCompletePct);
        } 
    }

    /**
     * [Calcule les pays qui passent les groupes]
     */
     function countriesThatPass(){
        _.each($scope.groupsMatches, function(groupData, group){
            var countriesOrderedByPoints = sortStandingFifa2014Rules(groupData.standing);
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
                    matchHolder.push({country: '', score:'', victorByPenalties:false});
                }else {
                    if(match[0].score > match[1].score || (match[0].score === match[1].score && match[0].penalties > match[1].penalties )){
                        matchHolder.push(_.clone(match[0]));
                    }else if(match[0].score < match[1].score || (match[0].score === match[1].score && match[0].penalties < match[1].penalties )){
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
                    matchHolder.push({country: '', score:'', victorByPenalties:false});
                }else {
                    if(match[0].score > match[1].score || (match[0].score === match[1].score && match[0].penalties > match[1].penalties )){
                        matchHolder.push(_.clone(match[0]));
                    }else if(match[0].score < match[1].score || (match[0].score === match[1].score && match[0].penalties < match[1].penalties )){
                        matchHolder.push(_.clone(match[1]));
                    }else{
                        //_.each(match, function(country){ country.victorByPenalties ? matchHolder.push(_.clone(country)) : null ;});
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
        var matchHolder3 = [];
        var concaTitle = '';
        var concaTitle3 = '';
        if($scope.secondStageMatches) {
            _.each($scope.secondStageMatches.semiFinals, function(match, title){
                if(match[0].score.length === 0 || match[1].score.length === 0 ){
                    matchHolder.push({country: '', score:'', victorByPenalties:false});
                    matchHolder3.push({country: '', score:'', victorByPenalties:false});
                }else {
                    if(match[0].score > match[1].score || (match[0].score === match[1].score && match[0].penalties > match[1].penalties )){
                        matchHolder.push(_.clone(match[0]));
                        matchHolder3.push(_.clone(match[1]));
                    }else if(match[0].score < match[1].score || (match[0].score === match[1].score && match[0].penalties < match[1].penalties )){
                        matchHolder.push(_.clone(match[1]));
                        matchHolder3.push(_.clone(match[0]));
                    }else{
                        _.each(match, function(country){ country.victorByPenalties ? matchHolder.push(_.clone(country)) : null ;});
                        _.each(match, function(country){ country.victorByPenalties ? null : matchHolder3.push(_.clone(country)) ;});
                    }
                }
                concaTitle += title;
                concaTitle3 = concaTitle.split('').reverse().join('');
                if(matchHolder.length === 2){

                    $scope.secondStageMatches.final[concaTitle][0]['country'] = matchHolder[0]['country'];
                    $scope.secondStageMatches.final[concaTitle][1]['country'] = matchHolder[1]['country'];

                    $scope.secondStageMatches.final3[concaTitle3][0]['country'] = matchHolder3[0]['country'];
                    $scope.secondStageMatches.final3[concaTitle3][1]['country'] = matchHolder3[1]['country'];

                    matchHolder = [];
                    matchHolder3 = [];
                    concaTitle = '';
                    concaTitle3 = '';
                }
            });
}
}, true);

  $scope.$watch('secondStageMatches.final', function(){ //Calculate who is champion

        if($scope.secondStageMatches) {
            _.each($scope.secondStageMatches.final, function(match, title){
                if(match[0].score.length === 0 || match[1].score.length === 0 ){
                    $scope.worldChampion = '';
                }else {
                    if(match[0].score > match[1].score || (match[0].score === match[1].score && match[0].penalties > match[1].penalties )){
                        $scope.worldChampion = match[0].country;
                    }else if(match[0].score < match[1].score || (match[0].score === match[1].score && match[0].penalties < match[1].penalties )){
                        $scope.worldChampion = match[1].country;
                    }else{
                        _.each(match, function(country){ country.victorByPenalties ? $scope.worldChampion = match[0].country : null ;});
                        _.each(match, function(country){ country.victorByPenalties ? null : $scope.worldChampion = match[1].country ;});
                    }
                }
            });
        }
}, true);



$scope.victorByPenalties = function(round, title, winnerIndex){
    _.each($scope.secondStageMatches[round][title], function(country, index){
        country.victorByPenalties = (winnerIndex === index) ? true : false;
    });
};


    /**
     * [Sauvegarde les données]
     */
     $scope.savePronos = function(){
        if ($scope.now > 1402596000) {
             bootbox.confirm('Attention des matchs ont déjà commencés ou sont déjà finis, ils seront exclus et non comptabilisés de votre classement si vous enregistez à nouveau.<br/><br/><span style="color:red"><b> Nous vous déconseillons de le faire, etes vous sur de vouloir continuer ? Si vous répondez "OK", votre choix est irrémédiable.</b></span>', function(result) {
                  if(result) {
                    $scope.pronosToSave = {};
                    $scope.pronosToSave['userData'] = $scope.user;
                    $scope.pronosToSave['groupsMatches'] = $scope.groupsMatches;
                    $scope.pronosToSave['secondStageMatches'] = $scope.secondStageMatches;
                    $http.put('/REST/pronos/' + $scope.user.username, $scope.pronosToSave).success(function() {
                    });
                }
            });
        }
    };

}]);
