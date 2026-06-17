import bcrypt from "bcrypt";
import User from "../models/User.js";

function serializeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

const userController = {
  list: async (req, res) => {
    try {
      const users = await User.findAll({ order: [["name", "ASC"]] });
      return res.json(users.map(serializeUser));
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "Usuario nao encontrado" });
      }

      const payload = { ...req.body };

      if (payload.password) {
        payload.password = await bcrypt.hash(payload.password, 10);
      } else {
        delete payload.password;
      }

      await user.update(payload);
      return res.json(serializeUser(user));
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "Usuario nao encontrado" });
      }

      await user.destroy();
      return res.json({ message: "Usuario removido com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

export default userController;
