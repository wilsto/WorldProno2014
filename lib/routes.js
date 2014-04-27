'use strict';

var api = require('./controllers/api'),
    index = require('./controllers');
var passport = require('passport');

// route middleware to make sure
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    console.log(req.isAuthenticated());
    return next();
  }

  // if they aren't redirect them to the home page
  res.redirect('/');
}

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.get('/api/awesomeThings', api.awesomeThings);
  
    // Server API Routes
  app.get('/api/fifaMatchs', api.fifaMatchs);
  
  var pronos = require('./controllers/api/pronos');
  app.get('/REST/pronos', pronos.findAll);
  app.get('/REST/pronos/:id', pronos.findById);
  app.post('/REST/pronos', pronos.add);
  app.put('/REST/pronos/:id', pronos.update);

  // All undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });
  
  //==================================================================
  // route to test if the user is logged in or not
  app.get('/loggedin', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
  });

  // route to log in
  app.post('/signin', passport.authenticate('local-signin'), function(req, res) {
    res.send(req.user);
  });

  // route to log out
  app.post('/logout', function(req, res){
    req.logOut();
    res.send(200);
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

// =====================================
  // PROFILE SECTION =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/isLoggedIn', isLoggedIn, function(req, res) {
    res.send({
      user : req.user, // get the user out of session and pass to template
      cookies : req.cookies // get the user out of session and pass to template
    });
  });
  //==================================================================


  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/modals/*', index.partials);
  app.get('/*', index.index);

};

