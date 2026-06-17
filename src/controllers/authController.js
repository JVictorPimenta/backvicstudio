import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

function serializeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  };
}

const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(409).json({ message: "Email ja cadastrado" });
      }

      const user = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10),
        role: role || "colaborador",
      });

      return res.status(201).json(serializeUser(user));
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user || user.status !== "ativo") {
        return res.status(401).json({ message: "Credenciais invalidas" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ message: "Credenciais invalidas" });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || "vicstudio-dev",
        { expiresIn: "8h" }
      );

      return res.json({ token, user: serializeUser(user) });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  me: async (req, res) => {
    return res.json(serializeUser(req.user));
  },
};

export default authController;
