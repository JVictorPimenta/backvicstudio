import { DataTypes } from "sequelize";
import { sequelize } from "../database/sqlConnection.js";

const Client = sequelize.define("Client", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  document: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  source: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("lead", "ativo", "arquivado"),
    allowNull: false,
    defaultValue: "lead",
  },
});

export default Client;
