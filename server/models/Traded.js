const { DataTypes } = require("sequelize");

module.exports = {
  s_no: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    unique: true,
  },
  companies: {
    type: DataTypes.INTEGER(6),
    allowNull: false,
  },
  volume: {
    type: DataTypes.DECIMAL(13, 2),
    allowNull: false,
  },
  turnover: {
    type: DataTypes.DECIMAL(13, 2),
    allowNull: false,
  },
};
