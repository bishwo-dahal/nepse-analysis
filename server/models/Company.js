let { DataTypes } = require("sequelize");

module.exports = {
  s_no: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  symbol: {
    type: DataTypes.STRING(30),
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(40),
    allowNull: false,
  },
  sector: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  instrument: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  website: {
    type: DataTypes.STRING,
  },
};
