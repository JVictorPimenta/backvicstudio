import { Op } from "sequelize";

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
  if (!req?.user) {
    return { id: -1 };
  }

  if (isAdmin(req.user)) {
    return {};
  }

  return { responsibleId: req.user.id };
}

function buildPayload(body, req) {
  const payload = { ...body };

  if (!req?.user || !isAdmin(req.user)) {
    payload.responsibleId = req?.user?.id ?? null;
  }

  return payload;
}

function validateAppointmentSlot(date) {
  const slotDate = new Date(date);
  const day = slotDate.getDay();
  const hours = slotDate.getHours();
  const minutes = slotDate.getMinutes();

  const isWeekday = day >= 1 && day <= 5;
  const isAllowedHour = (hours === 10 || hours === 18) && minutes === 0;

  return {
    valid: isWeekday && isAllowedHour,
    reason: isWeekday && isAllowedHour ? null : 'Apenas dias úteis às 10h ou às 18h, em ponto.',
  };
}

async function checkAppointmentConflict(Appointment, startAt, currentId = null) {
  if (!startAt) {
    return null;
  }

  const where = {
    startAt: new Date(startAt),
    status: { [Op.ne]: 'cancelado' },
  };

  if (currentId) {
    where.id = { [Op.ne]: currentId };
  }

  return Appointment.findOne({ where });
}

async function loadAppointmentModel() {
  const { Appointment } = await import("../models/index.js");
  return Appointment;
}

const appointmentController = {
  create: async (req, res) => {
    try {
      const Appointment = await loadAppointmentModel();
      const slot = validateAppointmentSlot(req.body?.startAt);

      if (!slot.valid) {
        return res.status(400).json({ message: slot.reason });
      }

      const conflict = await checkAppointmentConflict(Appointment, req.body?.startAt);
      if (conflict) {
        return res.status(409).json({ message: 'Este horário já foi escolhido por outro agendamento.' });
      }

      const record = await Appointment.create(buildPayload(req.body, req));
      const created = await Appointment.findByPk(record.id, { include });

      return res.status(201).json(created);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  list: async (req, res) => {
    try {
      const Appointment = await loadAppointmentModel();
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
      const Appointment = await loadAppointmentModel();
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
      const Appointment = await loadAppointmentModel();
      const record = await Appointment.findOne({
        where: {
          id: req.params.id,
          ...getAccessWhere(req),
        },
      });

      if (!record) {
        return res.status(404).json({ message: "Registro nao encontrado" });
      }

      const newStartAt = req.body?.startAt ?? record.startAt;
      const slot = validateAppointmentSlot(newStartAt);

      if (!slot.valid) {
        return res.status(400).json({ message: slot.reason });
      }

      const conflict = await checkAppointmentConflict(Appointment, newStartAt, record.id);
      if (conflict) {
        return res.status(409).json({ message: 'Este horário já foi escolhido por outro agendamento.' });
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
      const Appointment = await loadAppointmentModel();
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

export { isAdmin, getAccessWhere, buildPayload, validateAppointmentSlot };
export default appointmentController;
