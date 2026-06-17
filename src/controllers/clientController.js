import createCrudController from "./crudControllerFactory.js";
import { Client } from "../models/index.js";

export default createCrudController(Client, {
  order: [["name", "ASC"]],
});
