import { DataTypes } from "sequelize";
import { sequelize } from "../database/sqlConnection.js";

const Sale = sequelize.define("Sale", {
  itemName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("orcamento", "vendido", "cancelado"),
    allowNull: false,
    defaultValue: "orcamento",
  },
  soldAt: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
});

export default Sale;
