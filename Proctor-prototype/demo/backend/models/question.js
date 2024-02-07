const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Question', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
