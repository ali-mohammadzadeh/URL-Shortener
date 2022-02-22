require('dotenv').config()
var express = require('express');
var logger = require('morgan');
var linkRouter = require('./routes/links');
var userRouter = require('./routes/users');
var mainRouter = require('./routes/main');
var responseHelper = require('./app/helpers/responseHelper');
var app = express();

//init default user
require('./app/database/redis').then(require("./app/bootstrap"))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/links', linkRouter);
app.use('/users', userRouter);
app.use('/', mainRouter);

// error handler
app.use(function(err, req, res, next) {
    let resData=responseHelper.error({"message":"connection refused!"},500)
    res.status(resData.code).send(resData.response)
});


const PORT = 3333;
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});
module.exports = app;
