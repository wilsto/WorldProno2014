'use strict';

var express = require('express')
 	, http =        require('http')
 	, passport = require('passport')
    , path =        require('path')
    , User =        require('./lib/models/User.js');
/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./lib/config/config');

//  Configuration neDB
require('./lib/neDb.js');

require('./lib/config/passport')(passport); // pass passport for configuration

var app = express();
app.use(express.cookieParser()); // read cookies (needed for auth)
app.use(express.bodyParser()); // get information from html forms
app.use(express.cookieSession(
    {
        secret: process.env.COOKIE_SECRET || "Superdupersecret"
    }));

// required for passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

passport.use(User.localStrategy);
User.loadUsers();
//passport.use(User.twitterStrategy());  // Comment out this line if you don't want to enable login via Twitter
//passport.use(User.facebookStrategy()); // Comment out this line if you don't want to enable login via Facebook
//passport.use(User.googleStrategy());   // Comment out this line if you don't want to enable login via Google
//passport.use(User.linkedInStrategy()); // Comment out this line if you don't want to enable login via LinkedIn

passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

// Express settings
require('./lib/config/express')(app);

// Routing
require('./lib/routes')(app);

// Start server
app.listen(config.port, function () {
  console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;