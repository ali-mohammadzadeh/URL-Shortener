const userLogic = require("./../../businessLogic/user/userLogic")

class userController {

    constructor() {
        this.userLogic = new userLogic()
    }

    /**
     * store user
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async store(req, res) {
        let {username, password} = req.body;
        try {

            let response = await this.userLogic.store(username, password)
            res.status(response.code).send(response.response)
        } catch (error) {

            res.status(error.code).send(error.response)
        }
    }

    /**
     * get credentials
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async credential(req,res){
        let {username, password} = req.body;
        try {
            let response = await this.userLogic.credential(username, password)
            res.status(response.code).send(response.response)
        } catch (error) {
            console.log(error)
            res.status(error.code).send(error.response)
        }
    }

    /**
     * delete user
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async delete(req, res) {
        let {id} = req.body;
        try {

            let response = await this.userLogic.delete(id)
            res.status(response.code).send(response.response)
        } catch (error) {

            res.status(error.code).send(error.response)
        }
    }

}


module.exports = new userController();