import { Op } from "sequelize";
import {
  Appointment,
  Client,
  Contract,
  FinancialEntry,
  Sale,
  Service,
  User,
} from "../models/index.js";

function toNumber(value) {
  return Number(value || 0);
}

const reportController = {
  dashboard: async (req, res) => {
    try {
      const [
        clients,
        appointments,
        contracts,
        entries,
        sales,
        services,
        users,
      ] = await Promise.all([
        Client.findAll(),
        Appointment.findAll({
          include: [
            { association: "client", attributes: ["id", "name"] },
            { association: "service", attributes: ["id", "name"] },
          ],
          order: [["startAt", "ASC"]],
        }),
        Contract.findAll(),
        FinancialEntry.findAll(),
        Sale.findAll(),
        Service.findAll(),
        User.findAll({ attributes: ["id", "name", "role", "status"] }),
      ]);

      const revenue = entries
        .filter((entry) => entry.type === "receita" && entry.status === "pago")
        .reduce((sum, entry) => sum + toNumber(entry.amount), 0);
      const expenses = entries
        .filter((entry) => entry.type === "despesa" && entry.status === "pago")
        .reduce((sum, entry) => sum + toNumber(entry.amount), 0);
      const pendingRevenue = entries
        .filter((entry) => entry.type === "receita" && entry.status === "pendente")
        .reduce((sum, entry) => sum + toNumber(entry.amount), 0);

      return res.json({
        totals: {
          clients: clients.length,
          activeClients: clients.filter((client) => client.status === "ativo").length,
          appointments: appointments.length,
          confirmedAppointments: appointments.filter(
            (appointment) => appointment.status === "confirmado"
          ).length,
          contracts: contracts.length,
          signedContracts: contracts.filter((contract) => contract.status === "assinado").length,
          services: services.length,
          users: users.length,
          sales: sales.length,
        },
        financial: {
          revenue,
          expenses,
          pendingRevenue,
          balance: revenue - expenses,
        },
        agenda: appointments.slice(0, 8),
        contractsByStatus: contracts.reduce((accumulator, contract) => {
          accumulator[contract.status] = (accumulator[contract.status] || 0) + 1;
          return accumulator;
        }, {}),
        salesByStatus: sales.reduce((accumulator, sale) => {
          accumulator[sale.status] = (accumulator[sale.status] || 0) + 1;
          return accumulator;
        }, {}),
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  search: async (req, res) => {
    try {
      const term = `%${req.query.q || ""}%`;

      const [clients, services, contracts] = await Promise.all([
        Client.findAll({ where: { name: { [Op.like]: term } }, limit: 10 }),
        Service.findAll({ where: { name: { [Op.like]: term } }, limit: 10 }),
        Contract.findAll({ where: { title: { [Op.like]: term } }, limit: 10 }),
      ]);

      return res.json({ clients, services, contracts });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default reportController;
