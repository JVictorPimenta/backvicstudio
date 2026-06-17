function createCrudController(Model, options = {}) {
  const include = options.include || [];
  const order = options.order || [["id", "DESC"]];
  const buildPayload = options.buildPayload || ((body) => body);

  return {
    create: async (req, res) => {
      try {
        const record = await Model.create(buildPayload(req.body, req));
        const created = await Model.findByPk(record.id, { include });

        return res.status(201).json(created);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    },

    list: async (req, res) => {
      try {
        const where = options.buildWhere ? options.buildWhere(req) : {};
        const records = await Model.findAll({ where, include, order });

        return res.json(records);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    },

    getById: async (req, res) => {
      try {
        const record = await Model.findByPk(req.params.id, { include });

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
        const record = await Model.findByPk(req.params.id);

        if (!record) {
          return res.status(404).json({ message: "Registro nao encontrado" });
        }

        await record.update(buildPayload(req.body, req, record));
        const updated = await Model.findByPk(record.id, { include });

        return res.json(updated);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    },

    delete: async (req, res) => {
      try {
        const record = await Model.findByPk(req.params.id);

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
}

export default createCrudController;
