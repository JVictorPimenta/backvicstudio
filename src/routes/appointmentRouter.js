import { body } from "express-validator";
import appointmentController from "../controllers/appointmentController.js";
import createCrudRouter from "./crudRouterFactory.js";

function validation(required = true) {
  const title = required ? body("title") : body("title").optional({ values: "falsy" });
  const startAt = required ? body("startAt") : body("startAt").optional({ values: "falsy" });
  const endAt = required ? body("endAt") : body("endAt").optional({ values: "falsy" });

  return [
    title.trim().notEmpty().withMessage("Titulo obrigatorio"),
    startAt.isISO8601().withMessage("Inicio invalido"),
    endAt.isISO8601().withMessage("Fim invalido"),
    body("clientId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("Cliente invalido"),
    body("serviceId").optional({ values: "falsy" }).isInt({ min: 1 }).withMessage("Servico invalido"),
    body("responsibleId")
      .optional({ values: "falsy" })
      .isInt({ min: 1 })
      .withMessage("Responsavel invalido"),
    body("status")
      .optional()
      .isIn(["solicitado", "confirmado", "realizado", "cancelado"])
      .withMessage("Status invalido"),
  ];
}

export default createCrudRouter(appointmentController, {
  create: validation(true),
  update: validation(false),
});
