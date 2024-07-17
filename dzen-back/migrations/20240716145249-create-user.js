"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      homepage: {
        type: Sequelize.STRING(100),
      },
      avatar: {
        type: Sequelize.STRING(100),
      },
    });
    await queryInterface.addIndex("users", ["username"]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropAllTables();
  },
};
