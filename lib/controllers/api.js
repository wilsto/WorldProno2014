'use strict';

exports.fifaMatchs = function(req, res) {

var groupsMatches = {
             A: { matches:[
                       [{country: 'Brésil', score:''}, {country: 'Croatie', score:''},{date:'12/06',time:'22:00'}],
                       [{country: 'Méxique', score:''}, {country: 'Cameroun', score:''},{date:'13/06',time:'18:00'}],
                       [{country: 'Brésil', score:''}, {country: 'Méxique', score:''},{date:'17/06',time:'21:00'}],
                       [{country: 'Cameroun', score:''}, {country: 'Croatie', score:''},{date:'19/06',time:'00:00'}],
                       [{country: 'Cameroun', score:''}, {country: 'Brésil', score:''},{date:'23/06',time:'22:00'}],
                       [{country: 'Croatie', score:''}, {country: 'Méxique', score:''},{date:'23/06',time:'22:00'}]
                   ],
                   standing: {
                      'Brésil': {total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                      'Cameroun':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                      'Croatie':{total:0, matchNb:0, pour:0, contre:0, win:0,nul:0,lose:0},
                      'Méxique':{total:0, matchNb:0, pour:0, contre:0}
                  }
              },
              B: { matches:[
                  [{country: 'Espagne', score:''}, {country: 'Pays-Bas', score:''},{date:'13/06',time:'21:00'}],
                  [{country: 'Chilie', score:''}, {country: 'Australie', score:''},{date:'14/06',time:'00:00'}],
                  [{country: 'Espagne', score:''}, {country: 'Chilie', score:''},{date:'18/06',time:'18:00'}],
                  [{country: 'Australie', score:''}, {country: 'Pays-Bas', score:''},{date:'18/06',time:'21:00'}],
                  [{country: 'Australie', score:''}, {country: 'Espagne', score:''},{date:'23/06',time:'18:00'}],
                  [{country: 'Pays-Bas', score:''}, {country: 'Chilie', score:''},{date:'23/06',time:'18:00'}]
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

        var secondStageMatches = {
            'roundOf16':{
                A: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false},{date:'28/06',time:'18:00'}],
                B: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false},{date:'28/06',time:'22:00'}],
                C: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false},{date:'29/06',time:'18:00'}],
                D: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false},{date:'29/06',time:'22:00'}],
                E: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false},{date:'30/06',time:'18:00'}],
                F: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false},{date:'30/06',time:'22:00'}],
                G: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false},{date:'01/07',time:'18:00'}],
                H: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false},{date:'01/07',time:'22:00'}]
            },
            'quarterFinals':{
                AB: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false},{date:'04/07',time:'18:00'}],
                CD: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false},{date:'04/07',time:'22:00'}],
                EF: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false},{date:'05/07',time:'18:00'}],
                GH: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false},{date:'05/07',time:'22:00'}]
            },
            'semiFinals':{
                ABCD: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false},{date:'08/07',time:'22:00'}],
                EFGH: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false},{date:'09/07',time:'22:00'}]
            },
            'final3':{
                HGFEDCBA: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false},{date:'12/07',time:'22:00'}]
            },
            'final':{
                ABCDEFGH: [{country: '', score:'', victorByPenalties:true}, {country: '', score:'', victorByPenalties:false},{date:'13/07',time:'22:00'}]
            }
               };

        var NewProno = {};
        NewProno.groupsMatches = groupsMatches;
        NewProno.secondStageMatches = secondStageMatches;

        res.json(NewProno);

};