const userRepository = require("../../repositories/userRepository");
const responseHelper = require("../../helpers/responseHelper");
const bcrypt = require("bcrypt")
const dictionaryApiUser = require("./../../../dictionary/dictionary")[process.env["lang"] ?? "en"].api.users
const httpCodeDictionary = require("./../../../dictionary/httpStatusCodesDictionary")
const jwtFacade = require('./../../facades/jwtFacade')

module.exports = class userLogic {
    constructor() {
        this.userRepository = new userRepository()
    }

    /**
     * store user
     * @param username
     * @param password
     * @returns {Promise<{code: number, response: {data: {}, meta: {date: number}}}>}
     */
    async store(username, password) {
        try {
            let user = await this.userRepository.get(username)
            if (user != null) throw responseHelper.error({message: dictionaryApiUser.exists}, httpCodeDictionary.BAD_REQUEST)

            let encryptedPassword = await bcrypt.hash(password, +process.env["BCRYPT_HASH"]);
            let newUser = await this.userRepository.insert(username, encryptedPassword)
            return responseHelper.success({
                username: newUser.username,
                message: dictionaryApiUser.createUser
            }, httpCodeDictionary.CREATED)
        } catch (error) {
            throw  error
        }
    }


    /**
     * get credential
     * @param username
     * @param password
     * @returns {Promise<{code: number, response: {data: {}, meta: {date: number}}}>}
     */
    async credential(username, password) {
        try {
            let user = await this.userRepository.get(username)
            if (!user) throw responseHelper.error({message: dictionaryApiUser.userNotFound}, httpCodeDictionary.NOT_FOUND)
            if (!await bcrypt.compare(password, user.password)) throw responseHelper.error({message: dictionaryApiUser.passwordWrong}, httpCodeDictionary.BAD_REQUEST)
            let token = jwtFacade.create(user.id, username)
            return responseHelper.success({
                username: username,
                "x-access-token": token,
                expiretime: process.env["jWT_EXPIRE_TIME"]
            }, httpCodeDictionary.OK)
        } catch (error) {
            throw  error
        }


    }


    /**
     * delete user with id
     * @param id
     * @returns {Promise<void>}
     */
    async delete(id) {
        try {
            let userStatus = await this.userRepository.deleteById(id)
            if (userStatus === 0) throw responseHelper.error({message: dictionaryApiUser.userNotFound}, httpCodeDictionary.BAD_REQUEST)
            return responseHelper.success({
                message: dictionaryApiUser.deleteUser
            }, httpCodeDictionary.CREATED)
        } catch (error) {
            throw error
        }


    }
}