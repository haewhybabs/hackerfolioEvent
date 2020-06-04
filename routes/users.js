const express = require('express');
const router = require('express-promise-router')();
const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JwT_SECRET } = require('../configuration');
const passport = require('passport');
const passportConf = require('../passport');
const User = require('../models/user');

signToken = userId => {
    return JWT.sign({
        iss: 'hackerfolioevent',
        sub: userId,
        iat: new Date().getTime(), //current time
        exp: new Date().setDate(new Date().getDate() + 1) //Current time + 1 day ahead
    }, JwT_SECRET);
}

function makeRandom(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


router.post('/registration', (req, res, next) => {

    var fullName = req.body.fullName;
    var email = req.body.email;
    var password = req.body.password;
    var password_confirmation = req.body.password_confirmation;
    var phoneNumber = req.body.phoneNumber;
    var roleID = 1;

    //Form Validation
    req.checkBody("fullName", "Name field is required").notEmpty();
    req.checkBody("phoneNumber", "Phone Number field is required").notEmpty();
    req.checkBody("email", "Email field is not valid").isEmail();
    req.checkBody("password", "Password field is required").notEmpty();
    req.checkBody("password_confirmation", "Password do not match").equals(req.body.password);


    //Check for errors
    var errors = req.validationErrors();
    if (errors) {
        res.status(422).json({
            message: "Please fill all the fields",
            status: false,
            errors: errors,

        });

    } else {

        User.findOne({ email: req.body.email })
            .then((existingUser) => {
                if (existingUser) {
                    res.status(422).json({
                        status: false,
                        errors: [{
                            param: "email",
                            msg: "email is already existing"
                        }]

                    });
                } else {

                    newUser = new User({
                        fullName,
                        email,
                        password,
                        phoneNumber,
                        roleID
                    });



                    User.createUser(newUser, function(err, user) {
                        if (err) throw err;
                        console.log(user);
                        newUser.id = user._id;
                        const token = signToken(user._id)
                        res.status(200).json({
                            status: true,
                            token,
                            data: newUser,
                        });
                    });
                }
            })
    }

});

// router.post('/login', passport.authenticate('local', { session: false }), function(req, res, next) {
//     if (!req.user) {
//         console.log('No')
//     }
//     const user = req.user;
//     const token = signToken(user[0].id)

//     res.status(200).json({
//         status: true,
//         token,
//         data: user[0],
//     });
// });






module.exports = router;