const express = require('express');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
var expressValidator = require("express-validator");
const userRouter = require('./routes/users.js');
// const eventRouter = require('./routes/events.js');
var keys = require('./key');
const app = express();
//Create Connection
mongoose.connect(keys.mongoURI);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

//validator
app.use(
    expressValidator({
        errorFormatter: function(param, msg, value) {
            var namespace = param.split("."),
                root = namespace.shift(),
                formParam = root;

            while (namespace.length) {
                formParam += "[" + namespace.shift() + "]";
            }
            return {
                param: formParam,
                msg: msg,
                value: value
            };
        }
    })
);


app.use('/user', userRouter);
// app.use('/event', profileRouter);

port = process.env.PORT || 8000;
app.listen(port, function() {
    console.log("server started on port :" + port);
});

module.exports = app;