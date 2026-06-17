import express from "express";
import { body } from "express-validator";
import authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";

const authRouter = express.Router();

const loginValidation = [
  body("email").isEmail().withMessage("Email invalido"),
  body("password").notEmpty().withMessage("Senha obrigatoria"),
];

const registerValidation = [
  body("name").trim().notEmpty().withMessage("Nome obrigatorio"),
  body("email").isEmail().withMessage("Email invalido"),
  body("password").isLength({ min: 6 }).withMessage("Senha deve ter pelo menos 6 caracteres"),
  body("role")
    .optional()
    .isIn(["admin", "comercial", "atendimento", "financeiro", "colaborador"])
    .withMessage("Perfil invalido"),
];

authRouter.post("/login", loginValidation, validationMiddleware, authController.login);
authRouter.get("/me", authMiddleware, authController.me);
authRouter.post(
  "/register",
  authMiddleware,
  roleMiddleware("admin"),
  registerValidation,
  validationMiddleware,
  authController.register
);

export default authRouter;
