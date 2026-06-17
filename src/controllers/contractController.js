import createCrudController from "./crudControllerFactory.js";
import { Contract } from "../models/index.js";

export default createCrudController(Contract, {
  include: [
    { association: "client", attributes: ["id", "name", "phone", "email"] },
    { association: "appointment", attributes: ["id", "title", "startAt", "status"] },
  ],
  order: [["id", "DESC"]],
});
