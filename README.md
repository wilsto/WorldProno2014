WorldProno2014
============

Application de pronostics entre amis de la coupe du mondre de Football 2014

### Production
Pour voir l'appli en production:
[Live version](http://worldprono2014.herokuapp.com/)


###Version
0.1

###Technos

WorldProno utilise les technos principalessuivantes pour fonctionner correctement :

BackEnd
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework
* [Passport] - Simple, unobtrusive authentication for Node.js.
* [MongoDB] -  open-source document database, and the leading NoSQL database

FontEnd
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [AngularJS] - Superheroic JavaScript MVW Framework


###Installation au niveau système
A faire une fois par PC
 
* Installer [node.js]
* Installer [MongoDB]
* Installer [Grunt] sur le système (-g) via une fenetre DOS 

```sh
npm install -g grunt-cli
```

* Installer [Bower] sur le système (-g)

```sh
npm install -g bower
```



###Installation des dépendances au niveau de l'application
* Ouvrir une fenetre DOS au niveau du répertoire ou les fichiers ont été téléchargés, on va installer en local (donc pas de -g dans les lignes de commandes) les modules nodejs et dependances.

```sh
npm install
```
Cela va créer un repertoire node_modules et télécharger tous les modules dont nous avons besoin. Cela marche grace au fichier *package.json* 

* Installer en local (donc pas de -g dans les lignes de commandes) les dépendances référencées grace à bower. Cela marche grace au fichier _bower.json_

```sh
bower install
```
Cela va créer un repertoire bower_components au niveau du repertoire app. Si bower pose des questions, il faut les réponses qui contiennent le mot "WorlProno2014"


###Lancement de l'application en mode developpement
après c'est magique, on tape

```sh
grunt serve
```
et ca lance tout
... ou pour les fainéants comme moi, lancer juste le fichier start.cmd.

**Free Software, have fun!**

[john gruber]:http://daringfireball.net/
[node.js]:http://nodejs.org
[Twitter Bootstrap]:http://twitter.github.com/bootstrap/
[jQuery]:http://jquery.com
[express]:http://expressjs.com
[Grunt]:http://gruntjs.com/
[Bower]:http://bower.io/
[AngularJS]:http://gruntjs.com/
[Passport]:http://passportjs.org/
[MongoDB]:http://www.mongodb.org/
