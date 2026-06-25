import { DataTypes } from "sequelize";
import { sequelize } from "../database/sqlConnection.js";

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("admin", "comercial", "atendimento", "financeiro", "colaborador", "cliente"),
    allowNull: false,
    defaultValue: "cliente",
  },
  status: {
    type: DataTypes.ENUM("ativo", "inativo"),
    allowNull: false,
    defaultValue: "ativo",
  },
});

export default User;
