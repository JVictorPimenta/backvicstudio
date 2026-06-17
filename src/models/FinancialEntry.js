import { DataTypes } from "sequelize";
import { sequelize } from "../database/sqlConnection.js";

const FinancialEntry = sequelize.define("FinancialEntry", {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM("receita", "despesa"),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  paidAt: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("pendente", "pago", "cancelado"),
    allowNull: false,
    defaultValue: "pendente",
  },
});

export default FinancialEntry;
