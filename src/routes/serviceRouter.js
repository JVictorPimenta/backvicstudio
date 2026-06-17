import { body } from "express-validator";
import serviceController from "../controllers/serviceController.js";
import createCrudRouter from "./crudRouterFactory.js";

function validation(required = true) {
  const name = required ? body("name") : body("name").optional({ values: "falsy" });

  return [
    name.trim().notEmpty().withMessage("Nome obrigatorio"),
    body("type").optional().isIn(["ensaio", "produto", "pacote"]).withMessage("Tipo invalido"),
    body("durationMinutes").optional().isInt({ min: 0 }).withMessage("Duracao invalida"),
    body("price").optional().isFloat({ min: 0 }).withMessage("Preco invalido"),
  ];
}

export default createCrudRouter(serviceController, {
  create: validation(true),
  update: validation(false),
});
