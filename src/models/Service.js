import { DataTypes } from "sequelize";
import { sequelize } from "../database/sqlConnection.js";

const Service = sequelize.define("Service", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("ensaio", "produto", "pacote"),
    allowNull: false,
    defaultValue: "ensaio",
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  durationMinutes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 60,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

export default Service;
