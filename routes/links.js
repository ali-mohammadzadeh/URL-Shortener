var express = require('express');
var router = express.Router();
const auth = require("./../app/middlewares/authMiddlewar");
const linkController = require("../app/controllers/link/linkController");
const linkSchema=require('./../app/schemas/link/linkSchema')
const validatorHelper=require('./../app/helpers/validatorHelper')

/* GET home page. */
router.get('/',linkSchema.getAllSchema(),validatorHelper.validate, auth,function(req, res, next) {

    linkController.get(req,res)
});

router.post('/',linkSchema.storeSchema(),validatorHelper.validate, auth,function(req, res, next) {

    linkController.store(req,res)
});

router.delete('/',linkSchema.deleteSchema(),validatorHelper.validate, auth,function(req, res, next) {

    linkController.delete(req,res)
});

router.put('/:id',linkSchema.updateSchema(),validatorHelper.validate, auth,function(req, res, next) {

    linkController.update(req,res)
});

module.exports = router;


