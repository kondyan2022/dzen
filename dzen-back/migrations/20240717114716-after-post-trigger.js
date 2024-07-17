"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `CREATE OR REPLACE TRIGGER after_post_insert
       AFTER INSERT ON posts
       FOR EACH ROW
       EXECUTE FUNCTION update_answer_count();`
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `DROP TRIGGER IF EXISTS after_post_insert ON posts`
    );
  },
};
