import "./config/loadEnv.js";
import express, { json } from "express";
import cors from "cors";
import corsOptions from "./config/cors.js";
import { connect } from "./database/sqlConnection.js";
import ensureDefaultAdmin from "./bootstrap/ensureDefaultAdmin.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import roleMiddleware from "./middlewares/roleMiddleware.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import notFoundMiddleware from "./middlewares/notFoundMiddleware.js";
import authRouter from "./routes/authRouter.js";
import clientRouter from "./routes/clientRouter.js";
import serviceRouter from "./routes/serviceRouter.js";
import appointmentRouter from "./routes/appointmentRouter.js";
import contractRouter from "./routes/contractRouter.js";
import financialEntryRouter from "./routes/financialEntryRouter.js";
import saleRouter from "./routes/saleRouter.js";
import userRouter from "./routes/userRouter.js";
import settingRouter from "./routes/settingRouter.js";
import reportRouter from "./routes/reportRouter.js";
import "./models/index.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors(corsOptions));
app.use(json());

app.get("/", (req, res) => {
  res.json({ message: "API VicStudio ativa" });
});

app.use("/auth", authRouter);
app.use("/clients", authMiddleware, clientRouter);
app.use("/services", authMiddleware, serviceRouter);
app.use("/appointments", authMiddleware, appointmentRouter);
app.use("/contracts", authMiddleware, contractRouter);
app.use("/financial-entries", authMiddleware, financialEntryRouter);
app.use("/sales", authMiddleware, saleRouter);
app.use("/reports", authMiddleware, reportRouter);
app.use("/settings", authMiddleware, roleMiddleware("admin"), settingRouter);
app.use("/users", authMiddleware, roleMiddleware("admin"), userRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

async function startServer() {
  try {
    await connect();
    await ensureDefaultAdmin();

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
}

startServer();
