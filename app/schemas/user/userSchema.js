const { body ,header} = require('express-validator')
const storeSchema = () => {
    return [
        header("x-access-token").notEmpty().withMessage("token cant be empty"),
        body('username').isString().withMessage("username must be string"),
        body('username').notEmpty().withMessage("username cant be empty"),
        body('password').isLength({ min: 5 }).withMessage("password must be more than 5 char"),
        body('password').notEmpty().withMessage("password cant be empty"),
    ]
}
const credentialSchema = () => {
    return [

        body('username').isString().withMessage("username must be string"),
        body('username').notEmpty().withMessage("username cant be empty"),
        body('password').isLength({ min: 5 }).withMessage("password must be more than 5 char"),
        body('password').notEmpty().withMessage("password cant be empty"),
    ]
}
const deleteSchema = () => {
    return [

        body('id').notEmpty().withMessage("id cant be empty"),

    ]
}

//jobs.mashhad@alibaba.ir



module.exports ={
    storeSchema,
    credentialSchema,
    deleteSchema
}