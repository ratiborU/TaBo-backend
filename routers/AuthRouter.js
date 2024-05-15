import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import { check } from "express-validator";

const authRouter = new Router();

authRouter.post('/registration', [
  check("email", "Не корректный email").notEmpty(),
  check("password", "Пароль должен быть больше 4 символов").isLength({min: 4})
], AuthController.registration);
authRouter.post('/login', AuthController.login);

export default authRouter; 