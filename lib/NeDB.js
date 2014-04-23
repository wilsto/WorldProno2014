
console.log(" Loading Database ");
console.log("-------------------");

var Datastore = require('nedb');

dbPronos = new Datastore({ filename: 'data/pronos.nedb', autoload: true });
dbPronos.loadDatabase();
console.log("+pronos");