"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.bulkInsert("users", [
      {
        username: "John Doe",
        email: "example@example.com",
      },
      {
        username: "Tim Brawn",
        email: "example1@example.com",
      },
      {
        username: "Jack Daniels",
        email: "example2@example.com",
      },
      {
        username: "Jack Sparrow",
        email: "example3@example.com",
      },
      {
        username: "Bill Gates",
        email: "example4@example.com",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
