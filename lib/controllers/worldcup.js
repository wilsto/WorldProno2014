'use strict';

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
  res.json([
    {
      name : 'HTML5 Boilerplate',
      info : 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
      href : 'http://html5boilerplate.com/',
      awesomeness: 10
    }, {
      name : 'AngularJS',
      info : 'AngularJS is a toolset for building the framework most suited to your application development.',
      href : 'http://html5boilerplate.com/',
      awesomeness: 10
    }, {
      name : 'Karma',
      info : 'Spectacular Test Runner for JavaScript.',
      href : 'http://karma-runner.github.io/0.12/index.html',
      awesomeness: 10
    }, {
      name : 'NodeJS',
      info : 'Node.js is a platform built on Chrome\'s JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.',
      href : 'http://nodejs.org/',
      awesomeness: 10
    }, {
      name : 'MongoDB',
      info : 'MongoDB (from "humongous") is an open-source document database, and the leading NoSQL database.',
      href : 'https://www.mongodb.org/',
      awesomeness: 10
    }
  ]);
};

exports.fifaGroupStage = function(req, res) {
var request = require('request');
var cheerio = require('cheerio');

var url = "http://fr.fifa.com/worldcup/matches/index.html";

  request({
            "uri": url
        }, function(err, resp, body){
      var $ = cheerio.load(body);
      
      var strContent = [];
          $('table').find('tr').each(function(index,item){
           if(index>0)
           {
              var tds = $(item).find('td');
              if ($(tds.eq(0)).text().trim()) {
                strContent.push ({
                  'Groupe':$(item).parent().parent().find('caption').text(),
                  'Number':$(tds.eq(0)).text().trim(),
                  'Date': $(tds.eq(1)).text().trim(),
                  'Ville':$(tds.eq(2)).text().trim(),
                  'Pays1': $(tds.eq(4)).text().trim().replace('Bosnie-et-Herzégovine','Bosnie').replace('République de Corée','Corée'),
                  'Pays1href': $(tds.eq(3)).find('a').attr("href") ,
                  'Pays1flag': $(tds.eq(3)).find('span').attr("class") ,
                  'Pays2': $(tds.eq(6)).text().trim().replace('Bosnie-et-Herzégovine','Bosnie').replace('République de Corée','Corée'),
                  'Pays2href': $(tds.eq(7)).find('a').attr("href") ,
                  'Pays2flag': $(tds.eq(7)).find('span').attr("class") 
                });
              }
           }
           });
       
           res.send(strContent);
    }); 
};