const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Quiz', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timer: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};