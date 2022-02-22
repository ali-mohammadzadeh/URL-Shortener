'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return   queryInterface.createTable("links",{
      id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey:true

      },
      userId:Sequelize.INTEGER(11),
      longUrl: Sequelize.STRING(100),
      shortUrl: Sequelize.STRING(100),
      createAt:Sequelize.DATE,
      updatedAt:Sequelize.DATE,

    })
  },

  async down (queryInterface, Sequelize) {
   return queryInterface.dropTable('links')
  }
};
