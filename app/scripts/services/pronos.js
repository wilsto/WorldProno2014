'use strict';

angular.module('worldProno2014App')
  .factory('pronoFactory', ['$resource',
    function($resource){
      return $resource('/REST/pronos/:id', {id:'@id'},  {'get': { method: 'GET', isArray: true }});


// $scope.groupsMatches = {
// -        A: { matches:[
// -                 [{country: 'Brésil', score:'3'}, {country: 'Croatie', score:'1'},{date:'12/06',time:'22:00'}],
// -                 [{country: 'Méxique', score:'1'}, {country: 'Cameroun', score:'1'},{date:'13/06',time:'18:00'}],
// -                 [{country: 'Brésil', score:'3'}, {country: 'Méxique', score:'0'},{date:'17/06',time:'21:00'}],
// -                 [{country: 'Cameroun', score:'0'}, {country: 'Croatie', score:'0'},{date:'19/06',time:'00:00'}],
// -                 [{country: 'Cameroun', score:'0'}, {country: 'Brésil', score:'0'},{date:'23/06',time:'22:00'}],
// -                 [{country: 'Croatie', score:'0'}, {country: 'Méxique', score:'2'},{date:'23/06',time:'22:00'}]
// -             ],
// -             standing: {
// -                'Brésil': {total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
// -                'Cameroun':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
// -                'Croatie':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
// -                'Méxique':{total:0, matchNb:0, pour:0, contre:0}
// -            }
// -        },
// -        B: { matches:[
// -            [{country: 'Espagne', score:'3'}, {country: 'Pays-Bas', score:'0'},{date:'13/06',time:'21:00'}],
// -            [{country: 'Chilie', score:'2'}, {country: 'Australie', score:'1'},{date:'14/06',time:'00:00'}],
// -            [{country: 'Espagne', score:'1'}, {country: 'Chilie', score:'2'},{date:'18/06',time:'18:00'}],
// -            [{country: 'Australie', score:'3'}, {country: 'Pays-Bas', score:'2'},{date:'18/06',time:'21:00'}],
// -            [{country: 'Australie', score:'2'}, {country: 'Espagne', score:'1'},{date:'23/06',time:'18:00'}],
// -            [{country: 'Pays-Bas', score:'2'}, {country: 'Chilie', score:'1'},{date:'23/06',time:'18:00'}]
// -        ],
// -            standing: {
// -                'Espagne': {total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
// -                'Chilie':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
// -                'Australie':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
// -                'Pays-Bas':{total:0, matchNb:0, pour:0, contre:0}
// -            }
// -        },
// -        C: { matches:[
// -            [{country: 'Colombie', score:''}, {country: 'Grèce', score:''},{date:'14/06',time:'18:00'}],
// -            [{country: 'Cote d\'Ivoire', score:''}, {country: 'Japon', score:''},{date:'15/06',time:'03:00'}],
// -            [{country: 'Colombie', score:''}, {country: 'Cote d\'Ivoire', score:''},{date:'19/06',time:'18:00'}],
// -            [{country: 'Japon', score:''}, {country: 'Grèce', score:''},{date:'20/06',time:'00:00'}],
// -            [{country: 'Japon', score:''}, {country: 'Colombie', score:''},{date:'24/06',time:'22:00'}],
// -            [{country: 'Grèce', score:''}, {country: 'Cote d\'Ivoire', score:''},{date:'24/06',time:'22:00'}]
// -        ],
// -            standing: {
// -                'Colombie': {total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
// -                'Cote d\'Ivoire':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
// -                'Japon':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
// -                'Grèce':{total:0, matchNb:0, pour:0, contre:0}
// -            }
// -        },
// -        D: { matches:[
// -            [{country: 'Uruguay', score:''}, {country: 'Costarica', score:''},{date:'14/06',time:'21:00'}],
// -            [{country: 'Angleterre', score:''}, {country: 'Italie', score:''},{date:'15/06',time:'00:00'}],
// -            [{country: 'Uruguay', score:''}, {country: 'Angleterre', score:''},{date:'19/06',time:'21:00'}],
// -            [{country: 'Italie', score:''}, {country: 'Costarica', score:''},{date:'20/06',time:'18:00'}],
// -            [{country: 'Italie', score:''}, {country: 'Uruguay', score:''},{date:'24/06',time:'18:00'}],
// -            [{country: 'Costarica', score:''}, {country: 'Angleterre', score:''},{date:'24/06',time:'18:00'}]
// -        ],
// -            standing: {
// -                'Uruguay': {total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
// -                'Angleterre':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
// -                'Italie':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
// -                'Costarica':{total:0, matchNb:0, pour:0, contre:0}
// -            }
// -        },
// -        E: { matches:[
// -            [{country: 'Suisse', score:''}, {country: 'Equateur', score:''},{date:'15/06',time:'18:00'}],
// -            [{country: 'France', score:''}, {country: 'Honduras', score:''},{date:'15/06',time:'21:00'}],
// -            [{country: 'Suisse', score:''}, {country: 'France', score:''},{date:'20/06',time:'21:00'}],
// -            [{country: 'Honduras', score:''}, {country: 'Equateur', score:''},{date:'21/06',time:'00:00'}],
// -            [{country: 'Honduras', score:''}, {country: 'Suisse', score:''},{date:'25/06',time:'22:00'}],
// -            [{country: 'Equateur', score:''}, {country: 'France', score:''},{date:'25/06',time:'22:00'}]
// -        ],
// -            standing: {
// -                'Suisse': {total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
// -                'France':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
// -                'Honduras':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
// -                'Equateur':{total:0, matchNb:0, pour:0, contre:0}
// -            }
// -        },
// -        F: { matches:[
// -            [{country: 'Argentine', score:''}, {country: 'Bosnie', score:''},{date:'16/06',time:'00:00'}],
// -            [{country: 'Iran', score:''}, {country: 'Nigeria', score:''},{date:'16/06',time:'21:00'}],
// -            [{country: 'Argentine', score:''}, {country: 'Iran', score:''},{date:'21/06',time:'18:00'}],
// -            [{country: 'Nigeria', score:''}, {country: 'Bosnie', score:''},{date:'22/06',time:'00:00'}],
// -            [{country: 'Nigeria', score:''}, {country: 'Argentine', score:''},{date:'25/06',time:'18:00'}],
// -            [{country: 'Bosnie', score:''}, {country: 'Iran', score:''},{date:'25/06',time:'18:00'}]
// -        ],
// -            standing: {
// -                'Argentine': {total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
// -                'Iran':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
// -                'Nigeria':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
// -                'Bosnie':{total:0, matchNb:0, pour:0, contre:0}
// -            }
// -        },
// -        G: { matches:[
// -            [{country: 'Allemagne', score:''}, {country: 'Portugal', score:''},{date:'16/06',time:'18:00'}],
// -            [{country: 'Ghana', score:''}, {country: 'Etats-Unis', score:''},{date:'17/06',time:'00:00'}],
// -            [{country: 'Allemagne', score:''}, {country: 'Ghana', score:''},{date:'21/06',time:'21:00'}],
// -            [{country: 'Etats-Unis', score:''}, {country: 'Portugal', score:''},{date:'23/06',time:'00:00'}],
// -            [{country: 'Etats-Unis', score:''}, {country: 'Allemagne', score:''},{date:'26/06',time:'18:00'}],
// -            [{country: 'Portugal', score:''}, {country: 'Ghana', score:''},{date:'26/06',time:'18:00'}]
// -        ],
// -            standing: {
// -                'Allemagne': {total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
// -                'Ghana':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
// -                'Etats-Unis':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
// -                'Portugal':{total:0, matchNb:0, pour:0, contre:0}
// -            }
// -        },
// -        H: { matches:[
// -            [{country: 'Belgique', score:''}, {country: 'Algerie', score:''},{date:'17/06',time:'18:00'}],
// -            [{country: 'Russie', score:''}, {country: 'Corée', score:''},{date:'18/06',time:'00:00'}],
// -            [{country: 'Belgique', score:''}, {country: 'Russie', score:''},{date:'22/06',time:'18:00'}],
// -            [{country: 'Corée', score:''}, {country: 'Algerie', score:''},{date:'22/06',time:'21:00'}],
// -            [{country: 'Corée', score:''}, {country: 'Belgique', score:''},{date:'26/06',time:'22:00'}],
// -            [{country: 'Algerie', score:''}, {country: 'Russie', score:''},{date:'26/06',time:'22:00'}]
// -        ],
// -            standing: {
// -                'Belgique': {total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
// -                'Russie':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
// -                'Corée':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
// -                'Algerie':{total:0, matchNb:0, pour:0, contre:0}
// -            }
// -    };


// -  $scope.secondStageMatches = {
// -        'roundOf16':{
// -            A: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
// -            B: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
// -            C: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
// -            D: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
// -            E: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
// -            F: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
// -            G: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
// -            H: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}]
// -        },
// -        'quarterFinals':{
// -            AB: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
// -            CD: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
// -            EF: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
// -            GH: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}]
// -        },
// -        'semiFinals':{
// -            ABCD: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}],
// -            EFGH: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}]
// -        },
// -        'final':{
// -            ABCDEFGH: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false}]
// -        }
// -    };

    }]
  );

