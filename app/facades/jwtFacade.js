const jwt = require("jsonwebtoken");

module.exports = class jwtFacade{

    /**
     * create token
     * @param userId
     * @param username
     * @returns {*}
     */
    static create(userId,username){
       return  jwt.sign(
            { userId:userId,username},
            process.env["jWT_SECRET"],
            {
                expiresIn:process.env["jWT_EXPIRE_TIME"],
            }
        )
    }


    /**
     * verify token
     * @param token
     * @returns {*}
     */
    static verify(token){
        return jwt.verify(token, process.env["jWT_SECRET"]);
    }

}
