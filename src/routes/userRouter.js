import express from "express";
import { body, param } from "express-validator";
import userController from "../controllers/userController.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";

const userRouter = express.Router();
const idValidation = [param("id").isInt({ min: 1 }).withMessage("Id invalido")];

const updateValidation = [
  body("name").optional().trim().notEmpty().withMessage("Nome invalido"),
  body("email").optional().isEmail().withMessage("Email invalido"),
  body("password")
    .optional({ values: "falsy" })
    .isLength({ min: 6 })
    .withMessage("Senha deve ter pelo menos 6 caracteres"),
  body("role")
    .optional()
    .isIn(["admin", "comercial", "atendimento", "financeiro", "colaborador"])
    .withMessage("Perfil invalido"),
  body("status").optional().isIn(["ativo", "inativo"]).withMessage("Status invalido"),
];

userRouter.get("/", userController.list);
userRouter.patch("/:id", idValidation, updateValidation, validationMiddleware, userController.update);
userRouter.delete("/:id", idValidation, validationMiddleware, userController.delete);

export default userRouter;
