import express from "express";
import reportController from "../controllers/reportController.js";

const reportRouter = express.Router();

reportRouter.get("/dashboard", reportController.dashboard);
reportRouter.get("/search", reportController.search);

export default reportRouter;
