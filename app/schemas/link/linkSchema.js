const { body ,header,query,param} = require('express-validator')
const storeSchema = () => {
    return [
        header("x-access-token").notEmpty().withMessage("token cant be empty"),
        body('longUrl').notEmpty().withMessage("longUrl cant be empty"),
        // body('longUrl').isURL().withMessage("longUrl must be url!"),

    ]
}
const updateSchema = () => {
    return [
        param("id").notEmpty().withMessage("id cant be empty"),
        header("x-access-token").notEmpty().withMessage("token cant be empty"),
    ]
}
const deleteSchema = () => {
    return [
        header("x-access-token").notEmpty().withMessage("token cant be empty"),
        body('id').notEmpty().withMessage("id cant be empty"),
    ]
}

const getAllSchema = () => {
    return [
        header("x-access-token").notEmpty().withMessage("token cant be empty"),
        query('page').notEmpty().withMessage("page cant be empty"),
        query('limit').notEmpty().withMessage("limit cant be empty"),
    ]
}



module.exports ={
    storeSchema,
    deleteSchema,
    updateSchema,
    getAllSchema
}