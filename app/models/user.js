
let {sequelize,DataTypes,Model}=require('./../database/database')


class user extends Model {

}
user.init({
    id:{
        type:DataTypes.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true

    },
    username:DataTypes.STRING(100),
    password:DataTypes.STRING(100),
    token:DataTypes.STRING(200),
    createAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,

}, {
    timestamps:false,
    sequelize
});



require("../hooks/user/userHooks")(user)



module.exports =user;