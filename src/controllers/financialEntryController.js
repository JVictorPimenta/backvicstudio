import createCrudController from "./crudControllerFactory.js";
import { FinancialEntry } from "../models/index.js";

export default createCrudController(FinancialEntry, {
  include: [
    { association: "client", attributes: ["id", "name"] },
    { association: "contract", attributes: ["id", "number", "title"] },
  ],
  order: [["dueDate", "DESC"]],
});
