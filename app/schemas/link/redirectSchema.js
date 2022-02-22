const {param} = require('express-validator')
const redirectSchema = () => {
    return [
        param("shortUrl").notEmpty().withMessage("shortUrl cant be empty"),

    ]
}

//jobs.mashhad@alibaba.ir



module.exports ={
    redirectSchema,

}