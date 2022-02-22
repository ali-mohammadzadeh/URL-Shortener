const User = require("./../models/user")
const userInMemoryRepository = require("./../repositories/userInMemoryRepository")

module.exports =class userRepository {

    inMemory=userInMemoryRepository

    /**
     * inert data
     * @param username
     * @param password
     * @returns {Promise<CreateOptions<Attributes<Model>> extends ({returning: false} | {ignoreDuplicates: true}) ? void : Model<any, TModelAttributes>>}
     */
    async insert(username, password) {
        return User.create({
            username: username,
            password: password
        },{
            individualHooks: true,
        })
    }

    /**
     * get One data By username
     * @param username
     * @returns {Promise<*>}
     */
    //todo : this name is wrong . must be change to getByUserName!
    async get(username) {
        try{
            let cacheData=await this.inMemory.getByUserName(username)
            if (cacheData?.username)     return  cacheData
            return User.findOne({where: {username: username}});
        }catch (error){
          throw error
        }

    }


    async deleteById(id){
        return User.destroy({where: {id}, individualHooks: true,});
    }
}