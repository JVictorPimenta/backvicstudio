import { body } from "express-validator";
import contractController from "../controllers/contractController.js";
import createCrudRouter from "./crudRouterFactory.js";

function validation(required = true) {
  const number = required ? body("number") : body("number").optional({ values: "falsy" });
  const title = required ? body("title") : body("title").optional({ values: "falsy" });

  return [
    number.trim().notEmpty().withMessage("Numero obrigatorio"),
    title.trim().notEmpty().withMessage("Titulo obrigatorio"),
    body("value").optional().isFloat({ min: 0 }).withMessage("Valor invalido"),
    body("status")
      .optional()
      .isIn(["rascunho", "enviado", "assinado", "cancelado"])
      .withMessage("Status invalido"),
  ];
}

export default createCrudRouter(contractController, {
  create: validation(true),
  update: validation(false),
});
