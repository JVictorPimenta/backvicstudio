import createCrudController from "./crudControllerFactory.js";
import { Service } from "../models/index.js";

export default createCrudController(Service, {
  order: [["name", "ASC"]],
});
