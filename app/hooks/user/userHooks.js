const redisInstance = require("../../dependencies/redis");
module.exports = async (userHooks) => {


    /**
     * after create user, user should be save in redis
     */
    userHooks.addHook('afterCreate', async (user) => {
        redisInstance.redisInstance.HSET('users', user.username, JSON.stringify(user))
            .then(()=>console.table({status:"success","message":"user created to redis and database",username:user.username}))
    });

    /**
     * after delete user
     */
    userHooks.addHook('afterDestroy', async (user) => {
        redisInstance.redisInstance.HDEL('users', user.username)
            .then(()=>console.table({status:"success","message":"user deleted from redis and database",username:user.username}))

    });

    return;

}

