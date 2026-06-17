import jwt from "jsonwebtoken";
import User from "../models/User.js";

async function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token nao informado" });
    }

    const token = header.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "vicstudio-dev");
    const user = await User.findByPk(decoded.id);

    if (!user || user.status !== "ativo") {
      return res.status(401).json({ message: "Usuario nao autorizado" });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token invalido" });
  }
}

export default authMiddleware;
