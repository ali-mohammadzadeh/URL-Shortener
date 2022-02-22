const redisInstance = require("./../dependencies/redis");

class userInMemoryRepository{

   async getByUserName(userName){

        let data=  await redisInstance.redisInstance.hmGet("users",userName)
       if (data[0]=== null)return null;
       return JSON.parse(data)

    }
}
module.exports =new userInMemoryRepository()