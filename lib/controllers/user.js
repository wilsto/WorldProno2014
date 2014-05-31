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
    },


    findUserGroup: function(req, res) {

    // Find all documents in the collection
    User.find({username: req.params.id}, function (err, docs) {
        var users = docs;
    console.log(users[0].groups);
        res.json(users[0].groups);
    });
    },

    findGroup: function(req, res) {
    // Find all documents in the collection
    User.distinct("groups.text", function (err, docs) {
        console.log(err);
        console.log(docs);

        var sortedGroup = [];
        for (var group in docs){
            console.log(group);
            sortedGroup.push({"text": docs[group] });
        }
        res.json(sortedGroup);
    });
    },

    updateGroup: function(req, res) {
    // Find all documents in the collection
        User.update(
            { username: req.params.id },
            { $set: { groups: req.body } }, 
            function(error, result) {
                if (error) {
                    res.send(error);
                } else {
                    res.send(200);
                }
            }
        );
    },

    updatePaiement: function(req, res) {
    // Find all documents in the collection
        User.update(
            { username: req.params.id },
            { $set: { paid: req.body } }, 
            function(error, result) {
                if (error) {
                    res.send(error);
                } else {
                    res.send(200);
                }
            }
        );
    }

};