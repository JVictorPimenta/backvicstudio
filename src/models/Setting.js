import { DataTypes } from "sequelize";
import { sequelize } from "../database/sqlConnection.js";

const Setting = sequelize.define("Setting", {
  studioName: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Luz & Sombra",
  },
  document: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  defaultContractText: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

export default Setting;
