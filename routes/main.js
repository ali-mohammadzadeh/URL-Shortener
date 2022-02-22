var express = require('express');
var router = express.Router();
const linkRedirectController = require("../app/controllers/link/linkRedirectController");
const redirectSchema = require("../app/schemas/link/redirectSchema");
const validatorHelper=require('./../app/helpers/validatorHelper')


router.get('/:shortUrl',redirectSchema.redirectSchema(),validatorHelper.validate,function(req, res, next) {
    linkRedirectController.redirect(req,res)
});


module.exports = router;
