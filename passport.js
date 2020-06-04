const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const { ExtractJWT, ExtractJwt } = require('passport-jwt');
const localStrategy = require('passport-local').Strategy;
const { JwT_SECRET } = require('./configuration.js');
const bcrypt = require('bcryptjs');
const User = require('./models/user');

//JSON WEB TOKEN STRATEGY
passport.use(new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JwT_SECRET
}, async(payload, done) => {

    try {
        User.findOne({ id: payload.sub })
            .then((existingUser) => {
                if (existingUser) {
                    done(null, existingUser);
                }
                //if user does not exist
                else {
                    return done(null, false)
                }
            })

    } catch (error) {
        done(error, false)
    }
}));

//LOCAL STRATEGY

passport.use(new localStrategy({
    usernameField: 'email'
}, async(email, password, done) => {

    //Find the user given the mail
    User.findOne({ email })
        .then((existingUser) => {
            if (existingUser) {
                bcrypt.compare(password, existingUser.password, function(err, isMatch) {
                    if (err) { throw err }

                    if (isMatch) {
                        return done(null, existingUser);
                    } else {
                        return done(null, false);
                    }
                });
            }
            //if user does not exist
            else {
                return done(null, false)
            }
        })
}))