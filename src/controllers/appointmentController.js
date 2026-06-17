import createCrudController from "./crudControllerFactory.js";
import { Appointment } from "../models/index.js";

export default createCrudController(Appointment, {
  include: [
    { association: "client", attributes: ["id", "name", "phone"] },
    { association: "service", attributes: ["id", "name", "price"] },
    { association: "responsible", attributes: ["id", "name", "role"] },
  ],
  order: [["startAt", "ASC"]],
});
