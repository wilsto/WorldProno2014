
console.log(" Loading Database ");
console.log("-------------------");

var Datastore = require('nedb');

dbUsers = new Datastore({ filename: 'data/users.nedb', autoload: true });
dbUsers.loadDatabase();
dbUsers.persistence.setAutocompactionInterval(300000);
console.log("+users");

dbPronos = new Datastore({ filename: 'data/pronos.nedb', autoload: true });
dbPronos.loadDatabase();
dbPronos.persistence.setAutocompactionInterval(300000);
console.log("+pronos");