const express = require('express');
const router = require('express-promise-router')();
const User = require('../models/user');
const Event = require('../models/event');
const passport = require('passport');

function checkRole(roleID) {
    if (roleID == 2) {
        return true;
    } else {
        return false;
    }
}
router.post('/create', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    var eventName = req.body.eventName;
    var info = req.body.info;
    var type = req.body.type;
    var venue = req.body.venue;
    var status = 0;
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

router.post('/event-list', passport.authenticate('jwt', { session: false }), function(req, res, next) {

    Event.find({ userId: req.user._id }, function(err, event) {
        if (err) throw err;
        res.status(200).json({
            status: true,
            data: event,
        });
    });


});
// Admin Actions
router.post('/admin-action', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    if (checkRole(req.user.roleID)) {
        var eventId = req.body.eventId;
        var statusType = req.body.statusType;
        var update = {
            status: statusType,
        }
        Event.findByIdAndUpdate(eventId, update, function(err, event) {
            if (err) throw err;
            res.status(200).json({
                status: true,
            });

        });
    } else {
        res.status(401).json({
            status: false,
            message: 'Unauthorized',
        });
    }
});

router.post('/admin-event-list', passport.authenticate('jwt', { session: false }), function(req, res, next) {
    if (checkRole(req.user.roleID)) {
        Event.find().exec(function(err, events) {
            if (err) throw err;
            res.status(200).json({
                status: true,
                data: events,
            });
        });
    } else {
        res.status(401).json({
            status: false,
            message: 'Unauthorized',
        });
    }
});

module.exports = router;