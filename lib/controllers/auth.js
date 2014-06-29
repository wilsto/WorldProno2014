var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport');

module.exports = {
    register: function(req, res, next) {
        var newUser = new User(req.body);
        newUser.provider = 'local';
        newUser.save(function(err) {
            if (err) return res.json(400, err);
            req.logIn(newUser, function(err) {
                if (err) return next(err);
                return res.json(200, { "role": newUser.role, "username": newUser.username });
            });
        });
    },
    
    login: function (req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        var error = err || info;
        if (error) return res.json(401, error);

        req.logIn(user, function(err) {
          
          if (err) return res.send(err);
          res.json(req.user.userInfo);
        });
      })(req, res, next);
    },

    logout: function(req, res) {
        req.logout();
        res.send(200);
    }
};