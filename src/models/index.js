import User from "./User.js";
import Client from "./Client.js";
import Service from "./Service.js";
import Appointment from "./Appointment.js";
import Contract from "./Contract.js";
import FinancialEntry from "./FinancialEntry.js";
import Sale from "./Sale.js";
import Setting from "./Setting.js";

Client.hasMany(Appointment, { foreignKey: "clientId", as: "appointments" });
Appointment.belongsTo(Client, { foreignKey: "clientId", as: "client" });

Service.hasMany(Appointment, { foreignKey: "serviceId", as: "appointments" });
Appointment.belongsTo(Service, { foreignKey: "serviceId", as: "service" });

User.hasMany(Appointment, { foreignKey: "responsibleId", as: "appointments" });
Appointment.belongsTo(User, { foreignKey: "responsibleId", as: "responsible" });

Client.hasMany(Contract, { foreignKey: "clientId", as: "contracts" });
Contract.belongsTo(Client, { foreignKey: "clientId", as: "client" });

Appointment.hasMany(Contract, { foreignKey: "appointmentId", as: "contracts" });
Contract.belongsTo(Appointment, { foreignKey: "appointmentId", as: "appointment" });

Client.hasMany(FinancialEntry, { foreignKey: "clientId", as: "financialEntries" });
FinancialEntry.belongsTo(Client, { foreignKey: "clientId", as: "client" });

Contract.hasMany(FinancialEntry, { foreignKey: "contractId", as: "financialEntries" });
FinancialEntry.belongsTo(Contract, { foreignKey: "contractId", as: "contract" });

Client.hasMany(Sale, { foreignKey: "clientId", as: "sales" });
Sale.belongsTo(Client, { foreignKey: "clientId", as: "client" });

Service.hasMany(Sale, { foreignKey: "serviceId", as: "sales" });
Sale.belongsTo(Service, { foreignKey: "serviceId", as: "service" });

export {
  User,
  Client,
  Service,
  Appointment,
  Contract,
  FinancialEntry,
  Sale,
  Setting,
};
