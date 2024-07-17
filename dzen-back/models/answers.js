"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Answers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Answers.belongsTo(models.Post);
    }
  }
  Answers.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        unique: true,
        references: {
          model: Post,
          key: "id",
        },
      },
      amount: DataTypes.INTEGER,
    },
    {
      sequelize,
      timestamps: false,
      modelName: "Answers",
      tableName: "answers",
    }
  );
  return Answers;
};
