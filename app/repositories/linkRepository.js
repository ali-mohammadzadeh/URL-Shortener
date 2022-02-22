const Link = require("./../models/link")
const { Op } = require("sequelize");
const redisInstance = require("../dependencies/redis");
module.exports =class linkRepository {

    /**
     * insert data to table links
     * @param userId
     * @param longUrl
     * @param shortUrl
     * @returns {Promise<CreateOptions<Attributes<Model>> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<any, TModelAttributes>>}
     */
    async insert(userId,longUrl,shortUrl) {


        return  Link.create({
            userId,
            longUrl,
            shortUrl
        })


    }


    /**
     * find one  data by longUrl and shortUrl
     * @param longUrl
     * @param shortUrl
     * @returns {Promise<Model<any, TModelAttributes> | null>}
     */
    async getByLongUrlANdShortUrl(longUrl,shortUrl) {
        return Link.findOne({where: {
                [Op.or]: [
                    { longUrl: longUrl },
                    { shortUrl: shortUrl }
                ]
            }});
    }

    /**
     * find One by shortUrl
     * @param shortUrl
     * @returns {Promise<*>}
     */
    async getByShortUrl(shortUrl){
        return Link.findOne({where: {shortUrl}});

    }

    /**
     * get all with pagination
     * @param userId
     * @param page
     * @param limit
     * @returns {Promise<{result: Model<any, TModelAttributes>[], pages: number, currentCount: number, count: number, currentPage}>}
     */
    async getAll(userId,page,limit){
        try{
            let offset = 0;
            let data=await Link.findAndCountAll()
            let pages = Math.ceil(data.count / limit);
            offset = limit * (page - 1);
            let listLink=await Link.findAll({
                attributes: ['id', 'longUrl', 'shortUrl'],
                limit: limit,
                offset: offset,
                $sort: { id: 1 }
            })
            return {'result': listLink, 'count': data.count, 'currentCount': listLink.length,'pages': pages,currentPage:page};
        }catch (e) {
            throw  e;
        }


    }

    /**
     * delete data by id
     * @param id
     * @returns {Promise<number>}
     */
    async delete(id){
        return Link.destroy({where: {id}})
    }


    /**
     * update data by id
     * @param id
     * @param data
     * @returns {Promise<[number, Model<any, TModelAttributes>[]]>}
     */
    async update(id,data){
        return Link.update(data, {where: {id}}
        )
    }


    /**
     * get one data by id
     * @param id
     * @returns {Promise<*>}
     */
    async getOneById(id){
        return Link.findOne({where: {id}});
    }

}