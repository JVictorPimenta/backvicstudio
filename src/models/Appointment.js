import { DataTypes } from "sequelize";
import { sequelize } from "../database/sqlConnection.js";

const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shootType: {
      type: DataTypes.ENUM("casamento", "gestante"),
      allowNull: false,
      defaultValue: "casamento",
      field: "shoot_type",
    },
    startAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "start_at",
    },
    endAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "end_at",
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
    clientId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "client_id",
    },
    serviceId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "service_id",
    },
    responsibleId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: "responsible_id",
    },
  },
  {
    tableName: "appointments",
    underscored: true, // resolve createdAt/updatedAt automaticamente também
  }
);

export default Appointment;