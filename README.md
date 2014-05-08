WorldProno2014
============

Application de pronostics entre amis de la coupe du mondre de Football 2014

## Production
Pour voir l'appli en production:
[Live version](http://worldprono2014.herokuapp.com/)


Version
----

0.1

Technos
-----------

WorldProno utilise les technos suivantes pour fonctionner correctement :

* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [AngularJS] - duh 
* [jQuery] - duh 

Installation au niveau système
--------------
A faire une fois par PC
 
* Installer [node.js]
* Installer [Grunt] sur le système (-g) via une fenetre DOS 

```sh
npm install -g grunt-cli
```

* Installer [Bower] sur le système (-g)

```sh
npm install -g bower
```

Installation des dépendances au niveau de l'application
--------------
* Ouvrir une fenetre DOS au niveau du répertoire ou les fichiers ont été téléchargé, on va installer en local (donc pas de -g dans les lignes de commandes) les modules nodejs et dependances.

```sh
npm install
```
 cela va créer un repertoire node_modules et télécharger tous les modules dont nous avons besoin. Cela marche grace au fichier *package.json* 

* on va installer en local (donc pas de -g dans les lignes de commandes) les dé&pendances référencées grace à bower. Cela marche grace au fichier _bower.json_

```sh
bower install
```
Cela va créer un repertoire bower_components au niveau du repertoire app. Si bower pose des questions, il faut les réponses qui contiennent le mot "WorlProno2014"


Lancement de l'application en mode developpement
--------------
après c'est magique, on tape

```sh
grunt serve
```
et ca lance tout; ou pour les fainéants comme moi, juste le fichier start.cmd.

**Free Software, have fun!**

[john gruber]:http://daringfireball.net/
[node.js]:http://nodejs.org
[Twitter Bootstrap]:http://twitter.github.com/bootstrap/
[jQuery]:http://jquery.com
[express]:http://expressjs.com
[Grunt]:http://gruntjs.com/
[Bower]:http://bower.io/
[AngularJS]:http://gruntjs.com/


