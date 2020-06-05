const express = require('express');
const router = require('express-promise-router')();
const User = require('../models/user');
const Event = require('../models/event');
const passport = require('passport');
router.post('/create', passport.authenticate('jwt', { session: false }), function(req, res, next) {

    var eventName = req.body.eventName;
    var info = req.body.info;
    var type = req.body.type;
    var venue = req.body.venue;
    var status = 1;
    var userId = req.user._id;
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const createdAt = date + ' ' + time;

    var roleID = 1;

    //Form Validation
    req.checkBody("info", "Name field is required").notEmpty();
    req.checkBody("eventName", "Phone Number field is required").notEmpty();
    req.checkBody("venue", "Email field is not valid").notEmpty();
    req.checkBody("type", "Password field is required").notEmpty();

    //Check for errors
    var errors = req.validationErrors();
    if (errors) {
        res.status(422).json({
            message: "Please fill all the fields",
            status: false,
            errors: errors,

        });

    } else {
        var newEvent = new Event({
            userId,
            eventName,
            info,
            venue,
            type,
            createdAt,
            status
        });
        newEvent.save(function(err) {
            if (err) {
                throw err;
            }
            res.status(200).json({
                status: true,
                data: newEvent,
            });
        });






    }

});
module.exports = router;