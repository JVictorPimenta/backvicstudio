import { DataTypes } from "sequelize";
import { sequelize } from "../database/sqlConnection.js";

const Contract = sequelize.define("Contract", {
  number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  signedAt: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("rascunho", "enviado", "assinado", "cancelado"),
    allowNull: false,
    defaultValue: "rascunho",
  },
});

export default Contract;
