var _ =           require('lodash'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = {
    index: function(req, res) {
        var users = User.findAll();
        _.each(users, function(user) {
            delete user.password;
            delete user.twitter;
            delete user.facebook;
            delete user.google;
            delete user.linkedin;
        });
        res.json(users);
    },

    findAll: function(req, res) {
    // Find all documents in the collection
    User.find({}, function (err, docs) {
        var users = docs;
        res.json(users);
    });
 }
};