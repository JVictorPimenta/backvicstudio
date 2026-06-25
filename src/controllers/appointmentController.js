import { Appointment } from "../models/index.js";

const include = [
  { association: "client", attributes: ["id", "name", "phone"] },
  { association: "service", attributes: ["id", "name", "price"] },
  { association: "responsible", attributes: ["id", "name", "role"] },
  { association: "user", attributes: ["id", "name", "email", "role"] },
];

const order = [["startAt", "ASC"]];

function canAccessAppointment(user, appointment) {
  if (!user) {
    return false;
  }

  if (user.role === "admin") {
    return true;
  }

  return appointment?.userId === user.id;
}

const appointmentController = {
  create: async (req, res) => {
    try {
      const payload = {
        ...req.body,
        userId: req.user?.id,
        status: req.body.status || "solicitado",
      };

      const record = await Appointment.create(payload);
      const created = await Appointment.findByPk(record.id, { include });

      return res.status(201).json(created);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  list: async (req, res) => {
    try {
      const where = req.user?.role === "admin" ? {} : { userId: req.user?.id };
      const records = await Appointment.findAll({ where, include, order });

      return res.json(records);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const record = await Appointment.findByPk(req.params.id, { include });

      if (!record) {
        return res.status(404).json({ message: "Registro nao encontrado" });
      }

      if (!canAccessAppointment(req.user, record)) {
        return res.status(403).json({ message: "Acesso negado" });
      }

      return res.json(record);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const record = await Appointment.findByPk(req.params.id);

      if (!record) {
        return res.status(404).json({ message: "Registro nao encontrado" });
      }

      if (!canAccessAppointment(req.user, record)) {
        return res.status(403).json({ message: "Acesso negado" });
      }

      const payload = { ...req.body };
      if (req.user?.role !== "admin") {
        payload.userId = req.user.id;
      }

      await record.update(payload);
      const updated = await Appointment.findByPk(record.id, { include });

      return res.json(updated);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const record = await Appointment.findByPk(req.params.id);

      if (!record) {
        return res.status(404).json({ message: "Registro nao encontrado" });
      }

      if (!canAccessAppointment(req.user, record)) {
        return res.status(403).json({ message: "Acesso negado" });
      }

      await record.destroy();
      return res.json({ message: "Registro removido com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default appointmentController;
