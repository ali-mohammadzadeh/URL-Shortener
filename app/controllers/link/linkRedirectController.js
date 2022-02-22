const linkRedirectLogic = require("../../businessLogic/link/linkRedirectLogic")
class linkRedirectController{


    constructor() {
        this.logic=linkRedirectLogic;
    }

    /**
     * redirect to longUrl
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async redirect(req,res){
     let {shortUrl}=req.params;
     try{
         let longUrl=await  this.logic.redirect(shortUrl)
         return res.redirect(longUrl)
     }catch (e){
         res.status(e.code).send(e.response)
     }

    }
}
module.exports = new linkRedirectController();