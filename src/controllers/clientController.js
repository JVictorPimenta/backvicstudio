import bcrypt from "bcrypt";

function generateTemporaryPassword(payload) {
  const email = payload?.email?.trim();
  if (email) {
    return email;
  }

  const fallbackName = (payload?.name || "cliente").toLowerCase().replace(/\s+/g, "").slice(0, 6);
  return `${fallbackName}@1234`;
}

function buildClientRegistrationData(payload) {
  const clientData = {
    name: payload.name,
    email: payload.email || null,
    phone: payload.phone,
    document: payload.document || null,
    source: payload.source || null,
    notes: payload.notes || null,
    status: payload.status || "lead",
  };

  const temporaryPassword = generateTemporaryPassword(payload);
  const userData = {
    name: payload.name,
    email: payload.email || `${payload.phone || "cliente"}@cliente.local`,
    password: bcrypt.hashSync(temporaryPassword, 10),
    role: "colaborador",
    status: "ativo",
  };

  return { clientData, userData, temporaryPassword };
}

async function loadModels() {
  const { Client, User } = await import("../models/index.js");
  return { Client, User };
}

const clientController = {
  create: async (req, res) => {
    try {
      const { Client, User } = await loadModels();
      const { clientData, userData, temporaryPassword } = buildClientRegistrationData(req.body);
      const existingUser = await User.findOne({ where: { email: userData.email } });

      if (existingUser) {
        return res.status(409).json({ message: "Email ja cadastrado para outro usuario" });
      }

      const client = await Client.create(clientData);
      await User.create(userData);

      return res.status(201).json({
        client,
        temporaryPassword,
        message: "Cliente cadastrado e usuario criado para login",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  list: async (req, res) => {
    try {
      const { Client } = await loadModels();
      const records = await Client.findAll({ order: [["name", "ASC"]] });
      return res.json(records);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { Client } = await loadModels();
      const record = await Client.findByPk(req.params.id);

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
      const { Client } = await loadModels();
      const record = await Client.findByPk(req.params.id);

      if (!record) {
        return res.status(404).json({ message: "Registro nao encontrado" });
      }

      await record.update(req.body);
      return res.json(record);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { Client } = await loadModels();
      const record = await Client.findByPk(req.params.id);

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

export { buildClientRegistrationData };
export default clientController;
