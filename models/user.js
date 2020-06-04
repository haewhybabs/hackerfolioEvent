var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var keys = require('../key');
mongoose.connect(keys.mongoURI);
var db = mongoose.connection;


//User Schema

var UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        index: true,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    roleID: {
        type: Number,
        required: true
    }
});
var User = module.exports = mongoose.model('User', UserSchema, 'users');

module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}