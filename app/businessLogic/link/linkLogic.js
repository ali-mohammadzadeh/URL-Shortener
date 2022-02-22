const linkRepository = require("../../repositories/linkRepository");
const responseHelper = require("../../helpers/responseHelper");
const dictionaryApiLinks = require("./../../../dictionary/dictionary")[process.env["lang"] ?? "en"].api.links;
const httpCodeDictionary = require("./../../../dictionary/httpStatusCodesDictionary")
const shortid = require('shortid')
module.exports = class linkLogic {


    constructor(user) {
        this.linkRepository = new linkRepository()
        this.user = user
    }



    /**
     * return all links with pagination
     * @param page
     * @param limit
     * @returns {Promise<{code: number, response: {data: {}, meta: {date: number}}}>}
     */
    async getAll(page, limit) {

        try{
            let data = await this.linkRepository.getAll(this.user.userId, page, limit)
            return responseHelper.success(data, httpCodeDictionary.OK)
        }catch (e){
            throw e;
        }

    }


    /**
     * store link
     * @param longUrl
     * @param shortUrl
     * @returns {Promise<{code: number, response: {data: {}, meta: {date: number}}}>}
     */
    async store(longUrl, shortUrl = null) {
        try {

            if (!shortUrl) shortUrl = shortid.generate()
            let oldLink = await this.linkRepository.getByLongUrlANdShortUrl(longUrl, shortUrl)
            if (oldLink)    throw responseHelper.error({message: dictionaryApiLinks.exists}, httpCodeDictionary.BAD_REQUEST)
            await this.linkRepository.insert(this.user.userId, longUrl, shortUrl)
            return responseHelper.success({message: dictionaryApiLinks.create,informations:{
                longUrl,
                    shortUrl
                }}, httpCodeDictionary.CREATED)
        } catch (e) {
            throw  e
        }

    }


    /**
     * delete link
     * @param id
     * @returns {Promise<{code: number, response: {data: {}, meta: {date: number}}}>}
     */
    async delete(id) {
        try {
            let oldLink = await this.linkRepository.delete(id)
            if (oldLink <= 0) throw responseHelper.error({message: dictionaryApiLinks.notFound}, httpCodeDictionary.NOT_FOUND)
            return responseHelper.success({message: dictionaryApiLinks.delete}, httpCodeDictionary.OK)

        } catch (e) {
            throw  e
        }
    }


    /**
     * update link
     * @param id
     * @param longUrl
     * @param shortUrl
     * @returns {Promise<{code: number, response: {data: {}, meta: {date: number}}}>}
     */
    async update(id, longUrl = null, shortUrl = null) {
        let data = {}
        try {
            if (!shortUrl && !longUrl)throw responseHelper.error({"message":"You must enter a shortUrl or longUrl"},httpCodeDictionary.BAD_REQUEST)
            if (shortUrl) data.shortUrl = shortUrl;
            if (longUrl) data.longUrl = longUrl;
           let link=await this.linkRepository.getOneById(id)
           if (!link)  throw responseHelper.error({message: dictionaryApiLinks.notFound}, httpCodeDictionary.NOT_FOUND)
            await this.linkRepository.update(+id, data)
            return responseHelper.success({message: dictionaryApiLinks.update}, httpCodeDictionary.OK)

        } catch (e) {
            throw e
        }

    }

}