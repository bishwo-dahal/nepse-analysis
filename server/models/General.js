const { DataTypes } = require("sequelize");
module.exports = {
  s_no: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: "companies",
      key: "symbol",
    },
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  stock_confidence: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  open: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
  high: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
  low: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
  close: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
  vwap: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
  vol: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
  prev_close: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
  turnover: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
  trans: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
  stock_range: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
  range_percent: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
  diff_percent: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
  vwap_percent: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
  a120_days: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
  a180_days: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
  a52_weeks_high: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
  a52_weeks_low: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
};
