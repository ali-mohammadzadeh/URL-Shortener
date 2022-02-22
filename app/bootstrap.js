
const UserLogic=require("./businessLogic/user/userLogic")

/**
 * create user when project loaded
 * @returns {Promise<void>}
 */
module.exports = async ()=>{
    let user=new UserLogic();
    if (process.env["DEFAULTS_USER_USERNAME"]){
        user.store(process.env["DEFAULTS_USER_USERNAME"],process.env["DEFAULTS_USER_PASSWORD"])
            .then(logMessage)
            .catch(logMessage)
    }

    return ;
}
function logMessage(response){
    console.table(
        {
            information:{
                username:process.env["DEFAULTS_USER_USERNAME"],
                pass:process.env["DEFAULTS_USER_PASSWORD"],
                message:response.response.data.message,
                type:"defaultUser"
            }

        }
    )
}