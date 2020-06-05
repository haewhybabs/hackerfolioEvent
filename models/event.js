var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var keys = require('../key');
mongoose.connect(keys.mongoURI);
var db = mongoose.connection;


//Event Schema

var EventSchema = mongoose.Schema({
    eventName: {
        type: String,
        index: true,
        required: true

    },
    userId: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },


});
var Event = module.exports = mongoose.model('Event', EventSchema, 'events');