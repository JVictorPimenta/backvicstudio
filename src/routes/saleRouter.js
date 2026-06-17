import { body } from "express-validator";
import saleController from "../controllers/saleController.js";
import createCrudRouter from "./crudRouterFactory.js";

function validation(required = true) {
  const itemName = required ? body("itemName") : body("itemName").optional({ values: "falsy" });
  const unitPrice = required ? body("unitPrice") : body("unitPrice").optional({ values: "falsy" });

  return [
    itemName.trim().notEmpty().withMessage("Item obrigatorio"),
    body("quantity").optional().isInt({ min: 1 }).withMessage("Quantidade invalida"),
    unitPrice.isFloat({ min: 0 }).withMessage("Valor invalido"),
    body("status").optional().isIn(["orcamento", "vendido", "cancelado"]).withMessage("Status invalido"),
  ];
}

export default createCrudRouter(saleController, {
  create: validation(true),
  update: validation(false),
});
