"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `CREATE OR REPLACE FUNCTION update_answer_count() 
      RETURNS trigger LANGUAGE 'plpgsql' 
      AS $$ 
      BEGIN 
        IF NEW."parentId" IS NOT NULL THEN
         UPDATE answers
         SET amount = amount + 1 
         WHERE  "postId" = NEW."parentId";
         IF NOT FOUND THEN
          INSERT INTO answers("postId", "amount") 
          VALUES(NEW."parentId", 1);
        END IF;
      END IF;
      RETURN NEW; 
      END; $$;`
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("DROP FUNCTION update_answer_count");
  },
};
