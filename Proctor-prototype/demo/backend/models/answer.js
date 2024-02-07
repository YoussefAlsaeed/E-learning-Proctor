const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Answer', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    QuestionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
