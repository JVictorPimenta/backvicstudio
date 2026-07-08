import { Appointment } from "../models/index.js";

const include = [
  { association: "client", attributes: ["id", "name", "phone"] },
  { association: "service", attributes: ["id", "name", "price"] },
  { association: "responsible", attributes: ["id", "name", "role"] },
];

const order = [["startAt", "ASC"]];

function isAdmin(user) {
  return user?.role === "admin";
}

function getAccessWhere(req) {
  if (isAdmin(req.user)) {
    return {};
  }

  return { responsibleId: req.user?.id };
}

function buildPayload(body, req) {
  const payload = { ...body };

  if (!isAdmin(req.user)) {
    payload.responsibleId = req.user?.id;
  }

  return payload;
}

export default {
  create: async (req, res) => {
    try {
      const record = await Appointment.create(buildPayload(req.body, req));
      const created = await Appointment.findByPk(record.id, { include });

      return res.status(201).json(created);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  list: async (req, res) => {
    try {
      const records = await Appointment.findAll({
        where: getAccessWhere(req),
        include,
        order,
      });

      return res.json(records);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const record = await Appointment.findOne({
        where: {
          id: req.params.id,
          ...getAccessWhere(req),
        },
        include,
      });

      if (!record) {
        return res.status(404).json({ message: "Registro nao encontrado" });
      }

      return res.json(record);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const record = await Appointment.findOne({
        where: {
          id: req.params.id,
          ...getAccessWhere(req),
        },
      });

      if (!record) {
        return res.status(404).json({ message: "Registro nao encontrado" });
      }

      await record.update(buildPayload(req.body, req, record));
      const updated = await Appointment.findByPk(record.id, { include });

      return res.json(updated);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const record = await Appointment.findOne({
        where: {
          id: req.params.id,
          ...getAccessWhere(req),
        },
      });

      if (!record) {
        return res.status(404).json({ message: "Registro nao encontrado" });
      }

      await record.destroy();

      return res.json({ message: "Registro removido com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
