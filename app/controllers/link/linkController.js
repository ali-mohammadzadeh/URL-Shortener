const linkLogic = require("./../../businessLogic/link/linkLogic")
class linkController{

    /**
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async get(req,res){
        let {page,limit}=req.query;
        try{
            let logic=new linkLogic(req.user);
            let responseLink=await logic.getAll(+page,+limit);
            res.status(responseLink.code).send(responseLink.response)
            return
        }catch (e){
            res.status(e.code).send(e.response)
        }
    }

    /**
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async store(req,res){
        let {longUrl,shortUrl}=req.body;
        try{
            let logic=new linkLogic(req.user);
            let responseLink=await logic.store(longUrl,shortUrl);
            res.status(responseLink.code).send(responseLink.response)
            return
        }catch (e){
            console.log(e)
            res.status(e.code?e.code:500).send(e.response?e.response:{})
        }

    }

    /**
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async delete(req,res){
        let {id}=req.body;
        try{
            let logic=new linkLogic(req.user);
            let responseLink=await logic.delete(id);
            res.status(responseLink.code).send(responseLink.response)
            return
        }catch (e){
            res.status(e.code).send(e.response)
        }

    }

    /**
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async update(req,res){
        let {longUrl,shortUrl}=req.body;
        let {id}=req.params;
        try{
            let logic=new linkLogic(req.user);
            let responseLink=await logic.update(id,longUrl,shortUrl);
            res.status(responseLink.code).send(responseLink.response)
            return
        }catch (e){
            res.status(e.code).send(e.response)
        }

    }

}
module.exports = new linkController();