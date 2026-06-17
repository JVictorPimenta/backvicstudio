import express from "express";
import { param } from "express-validator";
import validationMiddleware from "../middlewares/validationMiddleware.js";

function createCrudRouter(controller, validations = {}) {
  const router = express.Router();
  const idValidation = [param("id").isInt({ min: 1 }).withMessage("Id invalido")];

  router.get("/", controller.list);
  router.post("/", validations.create || [], validationMiddleware, controller.create);
  router.get("/:id", idValidation, validationMiddleware, controller.getById);
  router.patch(
    "/:id",
    idValidation,
    validations.update || [],
    validationMiddleware,
    controller.update
  );
  router.delete("/:id", idValidation, validationMiddleware, controller.delete);

  return router;
}

export default createCrudRouter;
