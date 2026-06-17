import { body } from "express-validator";
import financialEntryController from "../controllers/financialEntryController.js";
import createCrudRouter from "./crudRouterFactory.js";

function validation(required = true) {
  const description = required ? body("description") : body("description").optional({ values: "falsy" });
  const type = required ? body("type") : body("type").optional({ values: "falsy" });
  const category = required ? body("category") : body("category").optional({ values: "falsy" });
  const amount = required ? body("amount") : body("amount").optional({ values: "falsy" });
  const dueDate = required ? body("dueDate") : body("dueDate").optional({ values: "falsy" });

  return [
    description.trim().notEmpty().withMessage("Descricao obrigatoria"),
    type.isIn(["receita", "despesa"]).withMessage("Tipo invalido"),
    category.trim().notEmpty().withMessage("Categoria obrigatoria"),
    amount.isFloat({ min: 0 }).withMessage("Valor invalido"),
    dueDate.isISO8601().withMessage("Vencimento invalido"),
    body("status").optional().isIn(["pendente", "pago", "cancelado"]).withMessage("Status invalido"),
  ];
}

export default createCrudRouter(financialEntryController, {
  create: validation(true),
  update: validation(false),
});
