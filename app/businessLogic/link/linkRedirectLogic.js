const linkRepository = require("../../repositories/linkRepository");
const responseHelper = require("../../helpers/responseHelper");
const dictionaryApiLinks = require("./../../../dictionary/dictionary")[process.env["lang"] ?? "en"].api.links;
const httpCodeDictionary = require("./../../../dictionary/httpStatusCodesDictionary")
class linkRedirectLogic {
    constructor() {
        this.linkRepository = new linkRepository()
    }

    /**
     * return longUrl
     * @param shortUrl
     * @returns {Promise<*>}
     */
    async redirect(shortUrl) {
        try{
            let url=await this.linkRepository.getByShortUrl(shortUrl)
            if (url === null)  throw responseHelper.error({message:dictionaryApiLinks.notFound},httpCodeDictionary.NOT_FOUND)
            return url.longUrl;
        }catch (e){
            throw e
        }

    }

}

module.exports = new linkRedirectLogic();