"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Answers extends Model {
    static associate(models) {
      Answers.belongsTo(models.Post, {
        foreignKey: "postId",
        as: "post",
      });
      models.Post.hasOne(models.Answers, {
        foreignKey: "id",
        as: "answers_count",
      });
    }
  }
  Answers.init(
    {
      postId: {
        type: DataTypes.INTEGER,
        unique: true,
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
