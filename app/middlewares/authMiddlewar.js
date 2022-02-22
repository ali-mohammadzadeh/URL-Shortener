const responseHelper = require("../../app/helpers/responseHelper");
const jwtFacade = require("./../facades/jwtFacade")
const dictionaryApiUser = require("./../../dictionary/dictionary")[process.env["lang"] ?? "en"].api.users;
const httpCodeDictionary = require("./../../dictionary/httpStatusCodesDictionary")


const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        let response = responseHelper.error({
            message: dictionaryApiUser.requireToken
        }, httpCodeDictionary.FORBIDDEN)
        return res.status(response.code).send(response.response);
    }
    try {
        const decoded = jwtFacade.verify(token);
        req.user = decoded;
    } catch (err) {

        let response = responseHelper.error({
            message: dictionaryApiUser.invalidToken
        }, httpCodeDictionary.UNAUTHORIZED)
        return res.status(response.code).send(response.response);
    }
    return next();
};


module.exports = verifyToken;