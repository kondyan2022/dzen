"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.sequelize.query(
    //   "CREATE OR REPLACE FUNCTION create_post_after_insert() RETURNS TRIGGER LANGUAGE 'plpgsql' AS $$ BEGIN UPDATE posts SET answer_count = answer_count + 1 WHERE id=post_id; end; $$;"
    // );
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.sequelize.query(
    //   "DROP FUNCTION create_post_after_insert"
    // );
  },
};
