import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "vicstudio",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    port: Number(process.env.DB_PORT) || 3306,
  logging: process.env.DB_LOGGING === "true" ? console.log : false,

  },
);

async function connect() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Conexao com o banco de dados estabelecida!");
  } catch (error) {
    console.error("Erro ao conectar com o banco de dados:", error);
    throw error;
  }
}

export { sequelize, connect };