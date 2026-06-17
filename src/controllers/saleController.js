import createCrudController from "./crudControllerFactory.js";
import { Sale } from "../models/index.js";

export default createCrudController(Sale, {
  include: [
    { association: "client", attributes: ["id", "name", "phone"] },
    { association: "service", attributes: ["id", "name", "type"] },
  ],
  buildPayload(body) {
    const quantity = Number(body.quantity || 1);
    const unitPrice = Number(body.unitPrice || 0);

    return {
      ...body,
      quantity,
      unitPrice,
      total: Number((quantity * unitPrice).toFixed(2)),
    };
  },
});
