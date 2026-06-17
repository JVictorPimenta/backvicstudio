import express from "express";
import settingController from "../controllers/settingController.js";

const settingRouter = express.Router();

settingRouter.get("/", settingController.get);
settingRouter.patch("/", settingController.update);

export default settingRouter;
