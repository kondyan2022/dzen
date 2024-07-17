"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.sequelize.query(
    //   "CREATE OR REPLACE TRIGGER post_inc_anwser_count LANGUAGE plpgsql AS $$ BEGIN UPDATE posts SET answer_count = answer_count + 1 WHERE id=post_id; end; $$;"
    // );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
