var express = require('express');
var router = express.Router();
const userSchema=require('./../app/schemas/user/userSchema')
const validatorHelper=require('./../app/helpers/validatorHelper')

let userController=require('../app/controllers/user/userController')

router.post('/',userSchema.storeSchema(), validatorHelper.validate, function(req, res, next) {
    userController.store(req,res)
});

router.delete('/',userSchema.deleteSchema(), validatorHelper.validate, function(req, res, next) {
    userController.delete(req,res)
});

router.post('/credentials',userSchema.credentialSchema(), validatorHelper.validate, function(req, res, next) {
    userController.credential(req,res)
});


module.exports = router;


