import { DataTypes } from "sequelize";
import { sequelize } from "../database/sqlConnection.js";

const Appointment = sequelize.define("Appointment", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shootType: {
    type: DataTypes.ENUM("casamento", "gestante"),
    allowNull: false,
    defaultValue: "casamento",
  },
  startAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("solicitado", "confirmado", "realizado", "cancelado"),
    allowNull: false,
    defaultValue: "solicitado",
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

export default Appointment;
