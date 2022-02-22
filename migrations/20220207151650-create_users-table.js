'use strict';

const Sequelize = require("sequelize");
const {DataTypes} = require("../app/database/database");
module.exports = {
  async up (queryInterface, Sequelize) {

  return   queryInterface.createTable("users",{
      id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true

      },
      username:Sequelize.STRING(100),
      password:Sequelize.STRING(100),
      token:DataTypes.STRING(200),
      createAt:Sequelize.DATE,
      updatedAt:Sequelize.DATE,


    })
  },

  async down (queryInterface, Sequelize) {
    return  queryInterface.dropTable("users")
  }
};
