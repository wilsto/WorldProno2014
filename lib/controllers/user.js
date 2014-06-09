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
        _.each(users, function(user) {
            user.hashedPassword ='';
            user.salt='';
        });
        res.json(users);
    });
    },


    findUserGroup: function(req, res) {

    // Find all documents in the collection
    User.find({username: req.params.id}, function (err, docs) {
        var users = docs;
        res.json(users[0].groups);
    });
    },

    findUser: function(req, res) {

    // Find all documents in the collection
    User.find({username: req.params.id}, function (err, docs) {
        var users = docs;
        _.each(users, function(user) {
            user.hashedPassword ='';
            user.salt='';
            res.json(user);
        });

    });
    },

    deleteUser: function(req, res) {
    User.find({username: req.params.id}).remove(function() {
        res.send(200);
    });
    },

    findGroup: function(req, res) {
    // Find all documents in the collection
    User.distinct("groups.text", function (err, docs) {
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
            { $set: {paid: req.body.paid }}, 
            function(error, result) {
                if (error) {
                    res.send(error);
                } else {
                    res.send(200);
                }
            }
        );
    },

    updateContact: function(req, res) {
    // Find all documents in the collection
        User.update(
            { username: req.params.id },
            { $set: {mycontact: req.body.mycontact}}, 
            function(error, result) {
                if (error) {
                    res.send(error);
                } else {
                    res.send(200);
                }
            }
        );
    },
    updateName: function(req, res) {
    // Find all documents in the collection
        User.update(
            { username: req.params.id },
            { $set: {myname: req.body.myname}}, 
            function(error, result) {
                if (error) {
                    res.send(error);
                } else {
                    res.send(200);
                }
            }
        );
    },    

    updatePhoto: function(req, res) {
    // Find all documents in the collection
        console.log(req.body);
        User.update(
            { username: req.params.id },
            { $set: { avatarUrl: req.body.avatarUrl } }, 
            function(error, result) {
                if (error) {
                    res.send(error);
                } else {
                    res.send(200);
                }
            }
        );
    },

    updateRole: function(req, res) {
    // Find all documents in the collection
        console.log(req.body);
        User.update(
            { username: req.params.id },
            { $set: { role: req.body } }, 
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