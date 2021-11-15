const { DataTypes } = require("sequelize");

module.exports = {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    primaryKey: true,
  },
};
