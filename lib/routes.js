'use strict';

var api = require('./controllers/api'),
    index = require('./controllers');

var _ =           require('lodash')
    , path =      require('path')
    , passport =  require('passport')
    , AuthCtrl =  require('./controllers/auth')
    , UserCtrl =  require('./controllers/user')
    , User =      require('./models/User.js')
    , userRoles = require('./routingConfig').userRoles
    , accessLevels = require('./routingConfig').accessLevels;

  var pronos = require('./controllers/api/pronos');
  var posts = require('./controllers/api/posts');
  var teamposts = require('./controllers/api/teamposts');  
  var point = require('./controllers/api/points');  

var routes = [

    // Views
    {
        path: '/partials/*',
        httpMethod: 'GET',
        middleware: [function (req, res) {
            var requestedView = path.join('./', req.url);
            res.render(requestedView);
        }]
    },


    // Api REST
    {
        path: '/REST/pronoTime',
        httpMethod: 'GET',
        middleware: [pronos.pronoTime]
    },
    {
        path: '/REST/pronos',
        httpMethod: 'GET',
        middleware: [pronos.findAll]
    },
    {
        path: '/REST/pronos/winner',
        httpMethod: 'GET',
        middleware: [pronos.findWinner]
    },
    {
        path: '/REST/pronos/:id',
        httpMethod: 'GET',
        middleware: [pronos.findById]
    },
    {
        path: '/REST/pronos',
        httpMethod: 'POST',
        middleware: [pronos.update],
        accessLevel: accessLevels.user
    },
    {
        path: '/REST/pronos/:id',
        httpMethod: 'PUT',
        middleware: [pronos.update],
        accessLevel: accessLevels.user
    },
    {
        path: '/REST/posts',
        httpMethod: 'GET',
        middleware: [posts.findAll]
    },
    {
        path: '/REST/posts/',
        httpMethod: 'POST',
        middleware: [posts.update],
        accessLevel: accessLevels.admin
    },
    {
        path: '/REST/posts/:id',
        httpMethod: 'PUT',
        middleware: [posts.update],
        accessLevel: accessLevels.admin
    },
    {
        path: '/REST/posts/:id',
        httpMethod: 'DELETE',
        middleware: [posts.delete],
        accessLevel: accessLevels.admin
    },
    {
        path: '/REST/teamposts',
        httpMethod: 'GET',
        middleware: [teamposts.findAll]
    },
    {
        path: '/REST/teamposts/',
        httpMethod: 'POST',
        middleware: [teamposts.update],
        accessLevel: accessLevels.user
    },
    {
        path: '/REST/teamposts/:id',
        httpMethod: 'PUT',
        middleware: [teamposts.update],
        accessLevel: accessLevels.user
    },
    {
        path: '/REST/teamposts/:id',
        httpMethod: 'DELETE',
        middleware: [teamposts.delete],
        accessLevel: accessLevels.user
    },

    {
        path: '/api/fifaMatchs',
        httpMethod: 'GET',
        middleware: [api.fifaMatchs]
    },
    {
        path: '/REST/pointsDetails/:name/:tour',
        httpMethod: 'GET',
        middleware: [point.findByName]
    },
    // OAUTH
    {
        path: '/auth/twitter',
        httpMethod: 'GET',
        middleware: [passport.authenticate('twitter')]
    },
    {
        path: '/auth/twitter/callback',
        httpMethod: 'GET',
        middleware: [passport.authenticate('twitter', {
            successRedirect: '/',
            failureRedirect: '/login'
        })]
    },
    {
        path: '/auth/facebook',
        httpMethod: 'GET',
        middleware: [passport.authenticate('facebook')]
    },
    {
        path: '/auth/facebook/callback',
        httpMethod: 'GET',
        middleware: [passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/login'
        })]
    },
    {
        path: '/auth/google',
        httpMethod: 'GET',
        middleware: [passport.authenticate('google')]
    },
    {
        path: '/auth/google/return',
        httpMethod: 'GET',
        middleware: [passport.authenticate('google', {
            successRedirect: '/',
            failureRedirect: '/login'
        })]
    },
    {
        path: '/auth/linkedin',
        httpMethod: 'GET',
        middleware: [passport.authenticate('linkedin')]
    },
    {
        path: '/auth/linkedin/callback',
        httpMethod: 'GET',
        middleware: [passport.authenticate('linkedin', {
            successRedirect: '/',
            failureRedirect: '/login'
        })]
    },

    // Local Auth
    {
        path: '/register',
        httpMethod: 'POST',
        middleware: [AuthCtrl.register]
    },
    {
        path: '/login',
        httpMethod: 'POST',
        middleware: [AuthCtrl.login]
    },
    {
        path: '/logout',
        httpMethod: 'POST',
        middleware: [AuthCtrl.logout]
    },

    // User resource
    {
        path: '/users',
        httpMethod: 'GET',
        middleware: [UserCtrl.findAll]
    },
    {
        path: '/REST/user/:id',
        httpMethod: 'DELETE',
        middleware: [UserCtrl.deleteUser],
        accessLevel: accessLevels.admin
    },
    {
        path: '/REST/userInfo/:id',
        httpMethod: 'GET',
        middleware: [UserCtrl.findUser]
    },
    {
        path: '/REST/userPaid/:id',
        httpMethod: 'PUT',
        middleware: [UserCtrl.updatePaiement],
        accessLevel: accessLevels.admin
    },
    {
        path: '/REST/userPhoto/:id',
        httpMethod: 'PUT',
        middleware: [UserCtrl.updatePhoto],
        accessLevel: accessLevels.user
    },
    {
        path: '/REST/userContact/:id',
        httpMethod: 'PUT',
        middleware: [UserCtrl.updateContact],
        accessLevel: accessLevels.user
    },
    {
        path: '/REST/userNC/:id',
        httpMethod: 'PUT',
        middleware: [UserCtrl.updateName],
        accessLevel: accessLevels.user
    },        
    {
        path: '/REST/userRole/:id',
        httpMethod: 'PUT',
        middleware: [UserCtrl.updateRole],
        accessLevel: accessLevels.user
    },
    {
        path: '/REST/userPseudo/:id',
        httpMethod: 'PUT',
        middleware: [UserCtrl.updatePseudo],
        accessLevel: accessLevels.user
    },    
    {
        path: '/REST/userGroup',
        httpMethod: 'GET',
        middleware: [UserCtrl.findGroup]
    },
    {
        path: '/REST/userGroups/:id',
        httpMethod: 'GET',
        middleware: [UserCtrl.findUserGroup]
    },
    {
        path: '/REST/userGroup/:id',
        httpMethod: 'PUT',
        middleware: [UserCtrl.updateGroup],
        accessLevel: accessLevels.user
    },

    // All other get requests should be handled by AngularJS's client-side routing system
    {
        path: '/*',
        httpMethod: 'GET',
        middleware: [function(req, res) {
            var role = userRoles.public, username = '';
            if(req.user) {
                role = req.user.role;
                username = req.user.username;
            }
            res.cookie('user', JSON.stringify({
                'username': username,
                'role': role
            }));
            res.render('index');
        }]
    }
];

module.exports = function(app) {

    _.each(routes, function(route) {
        route.middleware.unshift(ensureAuthorized);
        var args = _.flatten([route.path, route.middleware]);

        switch(route.httpMethod.toUpperCase()) {
            case 'GET':
                app.get.apply(app, args);
                break;
            case 'POST':
                app.post.apply(app, args);
                break;
            case 'PUT':
                app.put.apply(app, args);
                break;
            case 'DELETE':
                app.delete.apply(app, args);
                break;
            default:
                throw new Error('Invalid HTTP method specified for route ' + route.path);
        }
    });

    function ensureAuthorized(req, res, next) {
        var role;
        if(!req.user) role = userRoles.public;
        else          role = req.user.role;

        var accessLevel = _.findWhere(routes, { path: req.route.path }).accessLevel || accessLevels.public;
        
        if(!(accessLevel.bitMask && role.bitMask)) return res.send(403);
        return next();
    }

};
