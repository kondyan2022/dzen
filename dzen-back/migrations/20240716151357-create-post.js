"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      parentId: {
        type: Sequelize.INTEGER,
        // defaultValue: 0,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      messageText: {
        type: Sequelize.TEXT,
      },
      attachedFile: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.addIndex("posts", ["createdAt"]);
    await queryInterface.addIndex("posts", ["parentId"]);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Posts");
    await queryInterface.removeIndex("posts", ["createdAt"]);
    await queryInterface.removeIndex("posts", ["parentId"]);
  },
};
