import bcrypt from "bcrypt";
import User from "../models/User.js";

async function ensureDefaultAdmin() {
  const email = process.env.ADMIN_EMAIL || "admin@gmail.com";
  const password = process.env.ADMIN_PASSWORD || "12345678";

  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      name: "Administrador Luz & Sombra",
      email,
      password: await bcrypt.hash(password, 10),
      role: "admin",
      status: "ativo",
    },
  });

  if (created) {
    console.log(`Administrador padrao criado: ${user.email}`);
  }
}

export default ensureDefaultAdmin;
