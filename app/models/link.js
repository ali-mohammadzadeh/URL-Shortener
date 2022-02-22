
let {sequelize,DataTypes}=require('./../database/database')




module.exports = sequelize.define("link",{
    id:{
        type:DataTypes.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true

    },
    userId:DataTypes.INTEGER(11),
    longUrl: DataTypes.STRING(100),
    shortUrl: DataTypes.STRING(100),
    createAt:DataTypes.DATE,
    updatedAt:DataTypes.DATE,

},{
    timestamps:false
})