import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: process.env.DB_LOGGING === "true" ? console.log : false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

async function connect() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: process.env.DB_SYNC_ALTER === "true" });
    console.log("Conexao com o banco de dados estabelecida!");
  } catch (error) {
    console.error("Erro ao conectar com o banco de dados:", error);
    throw error;
  }
}

export { sequelize, connect };
