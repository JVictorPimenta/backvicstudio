import { body } from "express-validator";
import clientController from "../controllers/clientController.js";
import createCrudRouter from "./crudRouterFactory.js";

function validation(required = true) {
  const name = required ? body("name") : body("name").optional({ values: "falsy" });
  const phone = required ? body("phone") : body("phone").optional({ values: "falsy" });

  return [
    name.trim().notEmpty().withMessage("Nome obrigatorio"),
    phone.trim().notEmpty().withMessage("Telefone obrigatorio"),
    body("email").optional({ values: "falsy" }).isEmail().withMessage("Email invalido"),
    body("status").optional().isIn(["lead", "ativo", "arquivado"]).withMessage("Status invalido"),
  ];
}

export default createCrudRouter(clientController, {
  create: validation(true),
  update: validation(false),
});
